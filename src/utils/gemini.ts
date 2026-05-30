import { GoogleGenerativeAI } from "@google/generative-ai";
import Bottleneck from "bottleneck";
import { unstable_cache } from "next/cache";
import { createHash } from "crypto";

class GeminiService {
  keys: string[] = [];
  currentKeyIndex: number = 0;
  modelName: string;
  limiter: Bottleneck;

  constructor() {
    this.modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";

    // Bottleneck logic: Only allow 2 requests per second
    this.limiter = new Bottleneck({
      minTime: 500, // 500ms between requests (2 req/s)
      maxConcurrent: 2,
    });

    this.initializeKeys();
  }

  initializeKeys() {
    // Load explicitly numbered keys from .env
    const possibleKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_1,
      process.env.GEMINI_API_KEY_2,
      process.env.GEMINI_API_KEY_3,
    ];

    // Filter out undefined or empty values, or default placeholder strings
    this.keys = possibleKeys.filter(
      (key): key is string => !!(key && key.trim() !== "" && !key.toLowerCase().includes("your"))
    );

    if (this.keys.length === 0) {
      console.warn("⚠️ No valid Gemini API keys found. Gemini Assistant will fall back to local simulator mode.");
    } else {
      console.log(`✅ Gemini Service initialized with ${this.keys.length} API key(s).`);
    }
  }

  getCurrentKey() {
    return this.keys[this.currentKeyIndex];
  }

  rotateKey() {
    if (this.keys.length <= 1) return;
    
    console.warn(
      `🔄 Rotating API Key... (Index ${this.currentKeyIndex} exhausted)`
    );
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
    console.warn(`✅ Switched to Key Index ${this.currentKeyIndex}`);
  }

  async executeWithRotation<T>(operation: (genAI: GoogleGenerativeAI) => Promise<T>): Promise<T> {
    if (this.keys.length === 0) {
      throw new Error("No Gemini API keys configured.");
    }

    const MAX_RETRIES = this.keys.length; // Try at most the number of keys we have
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
      try {
        // Instantiate the client with the CURRENT key
        const genAI = new GoogleGenerativeAI(this.getCurrentKey());

        // Wrap the passed operation in Bottleneck limiter
        return await this.limiter.schedule(async () => {
          return await operation(genAI);
        });
      } catch (error: any) {
        // Check if error is related to quota or rate limit (429)
        const isQuotaError =
          error.message?.includes("429") ||
          error.message?.includes("Too Many Requests") ||
          error.message?.includes("quota") ||
          error.message?.includes("QuotaExceeded");

        if (isQuotaError && this.keys.length > 1) {
          console.error(`Gemini API Error (429/Quota) for key index ${this.currentKeyIndex}: ${error.message}`);
          this.rotateKey();
          attempts++;
        } else {
          // If it's a structural error (e.g., bad format prompt) or we only have 1 key, throw
          throw error;
        }
      }
    }

    throw new Error(
      "All Gemini API keys are currently exhausted or experiencing rate limits."
    );
  }
}

export const geminiService = new GeminiService();

/**
 * Generates a clean hash of string to use as an alphanumeric cache key.
 */
export function getHash(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

/**
 * AI Title Generation (Feature 1)
 * Generates a concise, technical Stack Overflow-style title from description.
 */
export async function generateAITitle(description: string): Promise<string> {
  if (geminiService.keys.length > 0) {
    try {
      return await geminiService.executeWithRotation(async (genAI) => {
        const model = genAI.getGenerativeModel({ model: geminiService.modelName });
        const prompt = `You are the DevOverflow Assistant, an SEO and technical copywriting expert. 
Given the following developer question description, generate a single, highly professional, searchable Stack Overflow-style question title.
- The title must be concise (maximum 15 words).
- It must be extremely developer-friendly and optimized for SEO.
- Do NOT answer the question.
- Output ONLY the single raw title string, no quotes, no conversational filler, no markdown.

Description:
"${description}"`;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
      });
    } catch (e: any) {
      console.error("Gemini Title Generation Error, falling back to simulator:", e.message);
    }
  }

  // Simulator Fallback
  const lower = description.toLowerCase();
  if (lower.includes("react") && lower.includes("state") && lower.includes("api")) {
    return "Why is React state not updating after an asynchronous API request?";
  }
  if (lower.includes("nextjs") || lower.includes("next.js") || lower.includes("api")) {
    return "How to handle request routing errors in Next.js API endpoints?";
  }
  if (lower.includes("eslint") || lower.includes("leak") || lower.includes("listeners")) {
    return "Fixing EventEmitter MaxListenersExceededWarning memory leak in Node.js";
  }
  if (lower.includes("python") && (lower.includes("ai") || lower.includes("llm"))) {
    return "Why has Python become the default programming language for AI and LLMs?";
  }
  if (lower.includes("html") && lower.includes("link")) {
    return "Which HTML tag is used to create a hyperlink connecting to another webpage?";
  }

  // Generic clean-up title builder
  const words = description.split(/\s+/).slice(0, 8).join(" ");
  return `How to properly resolve issues regarding: "${words}..."?`;
}

/**
 * AI Question Improvement (Feature 2)
 * Fixes grammar, layout, and formatting without altering intent or answering the question.
 */
export async function improveAIQuestion(title: string, content: string): Promise<string> {
  if (geminiService.keys.length > 0) {
    try {
      return await geminiService.executeWithRotation(async (genAI) => {
        const model = genAI.getGenerativeModel({ model: geminiService.modelName });
        const prompt = `You are the DevOverflow Assistant. Your goal is to improve the quality of a developer's draft question.
- Fix any grammar, punctuation, and readability errors.
- Improve formatting by applying clean Markdown, dividing sections with bold headers (e.g. "### Context", "### Expected Behavior", "### Code Example"), and organizing code blocks correctly.
- Do NOT answer the question.
- Do NOT add fictional details, fake library versions, or modify technical meaning.
- Output ONLY the improved Markdown content. Do not add wrappers, introduction sentences, or conversational filler.

Title: "${title}"
Draft Content:
"${content}"`;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
      });
    } catch (e: any) {
      console.error("Gemini Question Improvement Error, falling back to simulator:", e.message);
    }
  }

  // Simulator Fallback
  let cleanContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // strip HTML
  if (cleanContent.length < 15) {
    cleanContent = `I am attempting to write code for "${title}", but I am encountering runtime issues and lack of documentation context.`;
  }

  return `### Context
I am facing a technical hurdle when implementing the following workflow: **"${title}"**.

### Steps & Behavior
1. Set up the local project environment.
2. Triggered the active code block.
3. Observed unexpected output/errors.

### Draft Details
${cleanContent}

### Code Reference
\`\`\`javascript
// AI formatted code companion mock template
const handleWorkflowResult = async (dataPayload) => {
  try {
    console.log("Analyzing local data:", dataPayload);
    // TODO: Squashing related code bugs here
  } catch (error) {
    console.error("Unhandled process exception:", error);
  }
};
\`\`\`

> [!NOTE]
> *This question's layout was formatted and improved for readability by **DevOverflow Assistant**.*`;
}

/**
 * AI Embedding Generation (Feature 3)
 * Calls Gemini text-embedding-004 or computes a mathematically stable text-seeded embedding.
 * Uses unstable_cache to cache embeddings for 30 days, drastically reducing API quota consumption.
 */
export async function generateQuestionEmbedding(text: string): Promise<number[]> {
  const textHash = getHash(text);
  
  return unstable_cache(
    async () => {
      if (geminiService.keys.length > 0) {
        try {
          return await geminiService.executeWithRotation(async (genAI) => {
            const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
            const result = await model.embedContent(text);
            if (result.embedding && result.embedding.values) {
              return result.embedding.values;
            }
            throw new Error("No embedding values returned from Gemini API");
          });
        } catch (e: any) {
          console.error("Gemini Embedding Generation Error, falling back to simulator:", e.message);
        }
      }

      // Simulator Fallback: Generate a 768-dimension unit-length vector seeded by text hashing
      const dimensions = 768;
      const embedding = new Array(dimensions).fill(0);
      
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      let magnitude = 0;
      for (let d = 0; d < dimensions; d++) {
        const val = Math.sin(hash + d) * Math.cos(hash - d);
        embedding[d] = val;
        magnitude += val * val;
      }

      // Normalize to unit length (so that dot product directly equals cosine similarity!)
      magnitude = Math.sqrt(magnitude);
      for (let d = 0; d < dimensions; d++) {
        embedding[d] /= magnitude || 1;
      }

      return embedding;
    },
    [`embedding-${textHash}`],
    {
      revalidate: 86400 * 30, // 30 days cache duration
      tags: ["embeddings"],
    }
  )();
}

/**
 * Computes Cosine Similarity between two unit-length vectors.
 */
export function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dotProduct / denominator;
}
