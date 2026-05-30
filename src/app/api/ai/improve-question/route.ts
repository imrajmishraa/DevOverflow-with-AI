import { NextResponse } from "next/server";
import { improveAIQuestion } from "@/utils/gemini";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ error: "Missing title or content parameters." }, { status: 400 });
    }

    const improvedContent = await improveAIQuestion(title, content);
    return NextResponse.json({ improvedContent });
  } catch (error: any) {
    console.error("AI Improve API error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
