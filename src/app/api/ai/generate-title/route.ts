import { NextResponse } from "next/server";
import { generateAITitle } from "@/utils/gemini";

export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Missing or invalid description parameter." }, { status: 400 });
    }

    const title = await generateAITitle(description);
    return NextResponse.json({ title });
  } catch (error: any) {
    console.error("AI Title API error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
