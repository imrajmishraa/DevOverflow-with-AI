"use client";

import QuestionForm from "@/components/QuestionForm";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function AskQuestionPage() {
  const { user, hydrated } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (hydrated && !user) {
      router.push("/login");
    }
  }, [user, hydrated, router]);

  if (!hydrated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="block pb-20 pt-32">
      <div className="container mx-auto px-4">
        <h1 className="mb-10 mt-4 text-3xl font-bold">Ask a public question</h1>

        <div className="flex flex-wrap md:flex-row-reverse">
          <div className="w-full md:w-1/3">
            {/* Sidebar with instructions */}
            <div className="mb-6 rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md md:ml-6">
              <h2 className="mb-4 text-xl font-semibold text-orange-500">Writing a good question</h2>
              <p className="mb-4 text-sm text-gray-300">
                You’re ready to ask a programming-related question and this form will help guide you through the process.
              </p>
              <h3 className="mb-2 font-medium text-white">Steps</h3>
              <ul className="list-inside list-decimal space-y-2 text-sm text-gray-400">
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>Add a descriptive image showing the error or behavior.</li>
                <li>Add tags to help others find your question.</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <QuestionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
