"use client";
import RTE from "@/components/RTE";
import { Meteors } from "@/components/ui/meteors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import { cn } from "@/lib/utils";
import slugify from "@/utils/slugify";
import { IconX, IconSparkles, IconAlertTriangle } from "@tabler/icons-react";
import { Models, ID } from "appwrite";
import { useRouter } from "next/navigation";
import React from "react";
import { databases, storage } from "@/models/client/config";
import {
  db,
  questionAttachmentBucket,
  questionCollection,
} from "@/models/name";
import confetti from "canvas-confetti";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { toast } from "@/store/Toast";
import { revalidateQuestionCache } from "@/app/actions";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col space-y-2 overflow-hidden rounded-xl border border-white/20 bg-slate-950 p-4",
        className,
      )}
    >
      <Meteors number={30} />
      {children}
    </div>
  );
};

/**
 * ******************************************************************************
 * ![INFO]: for buttons, refer to https://ui.aceternity.com/components/tailwindcss-buttons
 * ******************************************************************************
 */
const QuestionForm = ({ question }: { question?: any }) => {
  const { user } = useAuthStore();
  const [tag, setTag] = React.useState("");
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    title: String(question?.title || ""),
    content: String(question?.content || ""),
    authorId: user?.$id,
    tags: new Set((question?.tags || []) as string[]),
    attachment: null as File | null,
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // DevOverflow Assistant AI-assisted community feature states
  const [isGeneratingTitle, setIsGeneratingTitle] = React.useState(false);
  const [aiSuggestedTitle, setAiSuggestedTitle] = React.useState("");
  const [isImprovingQuestion, setIsImprovingQuestion] = React.useState(false);
  const [improvedPreview, setImprovedPreview] = React.useState("");
  const [duplicates, setDuplicates] = React.useState<any[]>([]);
  const [experts, setExperts] = React.useState<any[]>([]);

  // AI Title Generation Handler
  const handleGenerateTitle = async () => {
    if (!formData.content) {
      toast("Please write some details first to help AI understand your problem.", "info");
      return;
    }
    setIsGeneratingTitle(true);
    try {
      const res = await fetch("/api/ai/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: formData.content }),
      });
      const data = await res.json();
      if (data.title) {
        setAiSuggestedTitle(data.title);
        toast("Assistant generated a title suggestion!", "success");
      } else {
        toast("No title could be generated.", "error");
      }
    } catch (e) {
      console.error(e);
      toast("Failed to connect to assistant.", "error");
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  // AI Question Improvement Handler
  const handleImproveQuestion = async () => {
    if (!formData.title || !formData.content) {
      toast("Please provide both a title and draft details to improve.", "info");
      return;
    }
    setIsImprovingQuestion(true);
    try {
      const res = await fetch("/api/ai/improve-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title, content: formData.content }),
      });
      const data = await res.json();
      if (data.improvedContent) {
        setImprovedPreview(data.improvedContent);
        toast("Assistant formatted your question details!", "success");
      } else {
        toast("No improvements suggested.", "error");
      }
    } catch (e) {
      console.error(e);
      toast("Failed to connect to assistant.", "error");
    } finally {
      setIsImprovingQuestion(false);
    }
  };

  // Real-time duplicate question detector (Feature 3)
  React.useEffect(() => {
    if (!formData.title) {
      setDuplicates([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/ai/check-duplicates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: formData.title, content: formData.content }),
        });
        const data = await res.json();
        if (data.duplicates) {
          setDuplicates(data.duplicates);
        }
      } catch (e) {
        console.error("Failed to check duplicate questions:", e);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [formData.title, formData.content]);

  // Real-time tag-based expert recommendation (Feature 4)
  React.useEffect(() => {
    const activeTags = Array.from(formData.tags);
    if (activeTags.length === 0) {
      setExperts([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/ai/expert-discovery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tags: activeTags }),
        });
        const data = await res.json();
        if (data.experts) {
          setExperts(data.experts);
        }
      } catch (e) {
        console.error("Failed to discover experts:", e);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [formData.tags]);

  const loadConfetti = (timeInMS = 3000) => {
    const end = Date.now() + timeInMS; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const create = async () => {
    if (!formData.attachment) throw new Error("Please upload an image");

    // Upload attachment directly to Cloudinary!
    toast("Uploading image to Cloudinary...", "info");
    const cloudinaryUrl = await uploadToCloudinary(formData.attachment, true);

    const response = await databases.createDocument(
      db,
      questionCollection,
      ID.unique(),
      {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        tags: Array.from(formData.tags),
        attachmentId: cloudinaryUrl, // Save Cloudinary URL
      },
    );

    loadConfetti();
    toast("Question successfully published!", "success");

    return response;
  };

  const update = async () => {
    if (!question) throw new Error("Please provide a question");

    const attachmentId = await (async () => {
      if (!formData.attachment) return question?.attachmentId as string;

      // Delete Appwrite old attachment if present
      if (question.attachmentId && !question.attachmentId.startsWith("http")) {
        try {
          await storage.deleteFile(questionAttachmentBucket, question.attachmentId);
        } catch (e) {
          console.error("Failed to delete Appwrite file:", e);
        }
      }

      // Upload new attachment directly to Cloudinary!
      toast("Uploading new image to Cloudinary...", "info");
      const cloudinaryUrl = await uploadToCloudinary(formData.attachment, true);
      return cloudinaryUrl;
    })();

    const response = await databases.updateDocument(
      db,
      questionCollection,
      question.$id,
      {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        tags: Array.from(formData.tags),
        attachmentId: attachmentId,
      },
    );

    return response;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // didn't check for attachment because it's optional in updating
    if (!formData.title || !formData.content || !formData.authorId) {
      setError(() => "Please fill out all fields");
      return;
    }

    setLoading(() => true);
    setError(() => "");

    try {
      const response = question ? await update() : await create();
      await revalidateQuestionCache(response.$id);

      router.push(`/questions/${response.$id}/${slugify(formData.title)}`);
    } catch (error: any) {
      setError(() => error.message);
    }

    setLoading(() => false);
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      {error && (
        <LabelInputContainer>
          <div className="text-center">
            <span className="text-red-500">{error}</span>
          </div>
        </LabelInputContainer>
      )}
      <LabelInputContainer>
        <Label htmlFor="title">
          Title Address
          <br />
          <small>
            Be specific and imagine you&apos;re asking a question to another
            person.
          </small>
        </Label>
        <div className="flex flex-col gap-2">
          <Input
            id="title"
            name="title"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleGenerateTitle}
              disabled={isGeneratingTitle || !formData.content}
              className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-150"
              title="Generate technical SO title from details"
            >
              <IconSparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingTitle ? "Generating suggestion..." : "✨ DevOverflow Assistant: Generate Title"}</span>
            </button>
          </div>
          {aiSuggestedTitle && (
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-3 text-xs flex flex-col gap-2 select-none">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-400">Assistant Title Suggestion</span>
              <p className="font-bold text-white font-mono leading-relaxed">"{aiSuggestedTitle}"</p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, title: aiSuggestedTitle }));
                    setAiSuggestedTitle("");
                  }}
                  className="px-3 h-7 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[10px] cursor-pointer shadow-md shadow-indigo-500/20"
                >
                  Apply Title
                </button>
                <button
                  type="button"
                  onClick={() => setAiSuggestedTitle("")}
                  className="px-3 h-7 rounded border border-white/10 hover:bg-white/5 text-gray-400 text-[10px] cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      </LabelInputContainer>
      <LabelInputContainer>
        <Label htmlFor="content">
          What are the details of your problem?
          <br />
          <small>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </small>
        </Label>
        <RTE
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value || "" }))
          }
        />
        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={handleImproveQuestion}
            disabled={isImprovingQuestion || !formData.title || !formData.content}
            className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-150"
            title="Improve layout, grammar, and markdown formatting"
          >
            <IconSparkles className="w-3.5 h-3.5" />
            <span>{isImprovingQuestion ? "Analyzing draft layouts..." : "✨ DevOverflow Assistant: Improve Question"}</span>
          </button>
        </div>
        {improvedPreview && (
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 md:p-5 backdrop-blur-md space-y-4 select-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-indigo-400">✨ DevOverflow Assistant: Compare Layouts</span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Ready to Merge</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <p className="text-gray-500 uppercase font-bold text-[10px]">Original Draft</p>
                <div className="rounded-lg border border-white/5 bg-black/40 p-3 max-h-[140px] overflow-y-auto text-gray-400 line-clamp-3">
                  {formData.content.replace(/<\/?[^>]+(>|$)/g, "")}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 uppercase font-bold text-[10px]">Improved Markdown</p>
                <div className="rounded-lg border border-indigo-500/20 bg-black/60 p-3 max-h-[140px] overflow-y-auto text-indigo-300">
                  {improvedPreview}
                </div>
              </div>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, content: improvedPreview }));
                  setImprovedPreview("");
                  toast("Draft merged successfully!", "success");
                }}
                className="px-4 h-8 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs cursor-pointer shadow-lg shadow-indigo-500/25"
              >
                Accept Changes
              </button>
              <button
                type="button"
                onClick={() => setImprovedPreview("")}
                className="px-4 h-8 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 font-bold text-xs cursor-pointer"
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </LabelInputContainer>

      {/* Duplicate Question Detection Alert (Feature 3) */}
      {duplicates.length > 0 && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 backdrop-blur-md space-y-4 select-none">
          <div className="flex items-center gap-2 border-b border-red-500/10 pb-2">
            <IconAlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">⚠ Similar Questions Found</h3>
          </div>
          <p className="text-xs text-gray-400 leading-normal">
            To prevent duplicate questions and encourage knowledge reuse, please check if these resolve your issue before posting:
          </p>
          <div className="space-y-3">
            {duplicates.map((dup: any) => (
              <div
                key={dup.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-xl border border-white/5 bg-black/40 p-4 hover:border-red-500/30 transition-colors gap-2 text-xs"
              >
                <div className="space-y-1">
                  <a
                    href={`/questions/${dup.id}/${slugify(dup.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-orange-500 hover:text-orange-600 hover:underline line-clamp-1"
                  >
                    {dup.title}
                  </a>
                  <div className="flex gap-3 text-[10px] text-gray-500 font-mono">
                    <span>Similarity: <strong className="text-red-400 font-bold">{dup.similarity}%</strong></span>
                    <span>Answers: <strong className="text-white font-bold">{dup.totalAnswers}</strong></span>
                  </div>
                </div>
                {dup.hasAcceptedAnswer && (
                  <span className="shrink-0 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 animate-pulse">
                    ✓ RESOLVED
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <LabelInputContainer>
        <Label htmlFor="image">
          Image
          <br />
          <small>
            Add image to your question to make it more clear and easier to
            understand.
          </small>
        </Label>
        <Input
          id="image"
          name="image"
          accept="image/*"
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            setFormData((prev) => ({
              ...prev,
              attachment: files[0],
            }));
          }}
        />
      </LabelInputContainer>
      <LabelInputContainer>
        <Label htmlFor="tag">
          Tags
          <br />
          <small>
            Add tags to describe what your question is about. Start typing to
            see suggestions.
          </small>
        </Label>
        <div className="flex w-full gap-4">
          <div className="w-full">
            <Input
              id="tag"
              name="tag"
              placeholder="e.g. (java c objective-c)"
              type="text"
              value={tag}
              onChange={(e) => setTag(() => e.target.value)}
            />
          </div>
          <button
            className="relative shrink-0 rounded-full border border-slate-600 bg-slate-700 px-8 py-2 text-sm text-white transition duration-200 hover:shadow-2xl hover:shadow-white/10"
            type="button"
            onClick={() => {
              if (tag.length === 0) return;
              setFormData((prev) => ({
                ...prev,
                tags: new Set([...Array.from(prev.tags), tag]),
              }));
              setTag(() => "");
            }}
          >
            <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-linear-to-r from-transparent via-teal-500 to-transparent shadow-2xl" />
            <span className="relative z-20">Add</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from(formData.tags).map((tag, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="group relative inline-block rounded-full bg-slate-800 p-px text-xs font-semibold leading-6 text-white no-underline shadow-2xl shadow-zinc-900">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-linear(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10">
                  <span>{tag}</span>
                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        tags: new Set(
                          Array.from(prev.tags).filter((t) => t !== tag),
                        ),
                      }));
                    }}
                    type="button"
                  >
                    <IconX size={12} />
                  </button>
                </div>
                <span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </div>
            </div>
          ))}
        </div>
      </LabelInputContainer>

      {/* AI Expert Discovery Recommendations (Feature 4) */}
      {experts.length > 0 && (
        <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-5 backdrop-blur-md space-y-4 select-none">
          <div className="flex items-center gap-2 border-b border-teal-500/10 pb-2">
            <IconSparkles className="w-5 h-5 text-teal-400 shrink-0" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">🔥 Recommended Experts</h3>
          </div>
          <p className="text-xs text-gray-400 leading-normal">
            DevOverflow Assistant matched the most qualified developer experts for your active tags:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {experts.map((exp: any) => (
              <div
                key={exp.id}
                className="rounded-xl border border-white/5 bg-black/45 p-4 flex items-center gap-3.5 hover:border-teal-500/30 transition-all duration-200"
              >
                <picture className="shrink-0 w-8 h-8 rounded-full border border-teal-500/20 overflow-hidden bg-slate-900">
                  <img src={exp.avatar} alt={exp.name} className="w-full h-full object-cover" />
                </picture>
                <div className="block leading-tight text-[11px] font-mono overflow-hidden">
                  <p className="font-bold text-white truncate" title={exp.name}>{exp.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 font-bold">Rep: {exp.reputation}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {exp.expertiseTags.slice(0, 2).map((t: string) => (
                      <span key={t} className="text-[8px] px-1 rounded bg-white/5 border border-white/10 text-gray-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        type="submit"
        disabled={loading}
      >
        {question ? "Update" : "Publish"}
      </button>
    </form>
  );
};

export default QuestionForm;
