import { NextResponse } from "next/server";
import { generateQuestionEmbedding, calculateCosineSimilarity } from "@/utils/gemini";
import { databases } from "@/models/server/config";
import { db, questionCollection, answerCollection } from "@/models/name";
import { Query } from "node-appwrite";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    if (!title) {
      return NextResponse.json({ duplicates: [] });
    }

    const draftText = `${title} ${content || ""}`.trim();
    const draftEmbedding = await generateQuestionEmbedding(draftText);

    // Fetch existing questions
    const existing = await databases.listDocuments(db, questionCollection, [
      Query.limit(100)
    ]);

    const duplicates = await Promise.all(
      existing.documents.map(async (ques: any) => {
        const quesText = `${ques.title} ${ques.content || ""}`.trim();
        const quesEmbedding = await generateQuestionEmbedding(quesText);
        const similarity = calculateCosineSimilarity(draftEmbedding, quesEmbedding);

        // Fetch answer metrics for this question
        const answers = await databases.listDocuments(db, answerCollection, [
          Query.equal("questionId", ques.$id)
        ]);

        const hasAccepted = answers.documents.some((ans: any) => ans.accepted === true || ans.voteStatus === "accepted");

        return {
          id: ques.$id,
          title: ques.title,
          similarity: Math.round(similarity * 100),
          totalAnswers: answers.total,
          hasAcceptedAnswer: hasAccepted,
        };
      })
    );

    // Filter duplicates with a similarity threshold of 70% and sort desc
    const matches = duplicates
      .filter((item) => item.similarity >= 70)
      .sort((a, b) => b.similarity - a.similarity);

    return NextResponse.json({ duplicates: matches });
  } catch (error: any) {
    console.error("AI Check Duplicates API error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
