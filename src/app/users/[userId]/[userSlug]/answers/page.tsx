import Pagination from "@/components/Pagination";
import { MarkdownPreview } from "@/components/RTE";
import { answerCollection, db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import slugify from "@/utils/slugify";
import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";

const Page = async ({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ userId: string; userSlug: string }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  const pageNumber = searchParams.page || "1";

  const queries = [
    Query.equal("authorId", params.userId),
    Query.orderDesc("$createdAt"),
    Query.offset((+pageNumber - 1) * 25),
    Query.limit(25),
  ];

  const answers = await databases.listDocuments(db, answerCollection, queries);

  const answersWithQuestions = await Promise.all(
    answers.documents.map(async (ans) => {
      try {
        const response = await databases.listDocuments(db, questionCollection, [
          Query.equal("$id", ans.questionId),
          Query.select(["title"]),
          Query.limit(1),
        ]);
        if (response.documents.length === 0) return null;
        const question = response.documents[0];
        return { ...ans, question };
      } catch (error) {
        console.error(`Orphaned answer detected for answerId ${ans.$id}:`, error);
        return null;
      }
    }),
  );

  answers.documents = answersWithQuestions.filter(Boolean) as any;

  return (
    <div className="px-4">
      <div className="mb-4">
        <p>{answers.total} answers</p>
      </div>
      <div className="mb-4 max-w-3xl space-y-6">
        {answers.documents.map((ans) => (
          <div key={ans.$id}>
            <div className="max-h-40 overflow-auto">
              <MarkdownPreview
                source={ans.content}
                className="rounded-lg p-4"
              />
            </div>
            <Link
              href={`/questions/${ans.questionId}/${slugify(ans.question.title)}`}
              className="mt-3 inline-block shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
            >
              Question
            </Link>
          </div>
        ))}
      </div>
      <Pagination total={answers.total} limit={25} />
    </div>
  );
};

export default Page;
