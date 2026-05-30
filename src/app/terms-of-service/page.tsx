import React from "react";
import Link from "next/link";
import { IconScale, IconArrowLeft, IconBook, IconUsers, IconGavel, IconAlertTriangle } from "@tabler/icons-react";

export const metadata = {
  title: "Terms of Service - DevOverflow",
  description: "Terms and conditions governing the use of the DevOverflow community developer platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden pb-20 pt-36 relative">
      {/* Background radial glowing effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-indigo-400 mb-8 transition-colors group cursor-pointer"
        >
          <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Landing</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
              <IconScale className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-400">Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-sm font-mono text-gray-500 mt-2">Last Updated: May 30, 2026</p>
        </div>

        {/* Content Body */}
        <div className="space-y-12">
          {/* Introduction Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconBook className="w-5 h-5 text-indigo-400" />
              1. Acceptance of Terms
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-mono">
              Welcome to DevOverflow ("we," "our," or "us"). By accessing or using our developer-centric questions, answers, and gamified community platforms, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          {/* Code of Conduct */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconUsers className="w-5 h-5 text-purple-400" />
              2. User Content & Code of Conduct
            </h2>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-mono">
              <p>
                DevOverflow is built for high-fidelity technical collaboration. When you write questions, answers, comments, or utilize our AI Simulator:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You retain ownership of the technical code snippets, articles, or documentation you submit.</li>
                <li>You grant DevOverflow a worldwide, royalty-free license to host, parse, cache, and distribute your content.</li>
                <li>You agree not to upload spam, malicious code, plagiarism, or content containing severe toxicity.</li>
              </ul>
            </div>
          </div>

          {/* Gamification & Moderation */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-pink-500" />
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconGavel className="w-5 h-5 text-pink-400" />
              3. Telemetry, Moderation, & Gamification
            </h2>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-mono">
              <p>
                Our platform incorporates reputation telemetry, active AI moderator systems, and community voting engines:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Reputation Sync:</strong> Your user reputation scores can increase or decrease dynamically based on community upvotes/downvotes or moderation actions.</li>
                <li><strong>AI Guardrails:</strong> Our NLP engines automatically screen questions and answers for duplicate topics and toxicity. Suboptimal threads may be auto-locked or flagged.</li>
                <li><strong>Abuse Prevention:</strong> Artificially inflating reputation, vote brigading, or bypassing guardrails may result in immediate suspension.</li>
              </ul>
            </div>
          </div>

          {/* Limitations of Liability */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500" />
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconAlertTriangle className="w-5 h-5 text-yellow-500" />
              4. Disclaimer & Limitations
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-mono">
              All code blocks, architectural suggestions, and platform configurations shared on DevOverflow are provided "as-is" without warranty. Developers implement tips, modules, or configurations posted by community members at their own risk. We are not liable for system outages, data loss, or server faults.
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-16 text-center border-t border-white/5 pt-8 text-xs font-mono text-gray-600 space-x-4">
          <Link href="/privacy-policy" className="hover:text-indigo-400">Privacy Policy</Link>
          <span>·</span>
          <span>© 2026 DevOverflow. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
