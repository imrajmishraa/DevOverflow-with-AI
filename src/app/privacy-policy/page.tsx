import React from "react";
import Link from "next/link";
import { IconShieldLock, IconArrowLeft, IconEye, IconCloud, IconDatabase, IconLock } from "@tabler/icons-react";

export const metadata = {
  title: "Privacy Policy - DevOverflow",
  description: "Privacy policy detailing data collection, storage, Cloudinary uploads, and Appwrite databases on DevOverflow.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden pb-20 pt-36 relative">
      {/* Background radial glowing effects */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-purple-400 mb-8 transition-colors group cursor-pointer"
        >
          <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Landing</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center">
              <IconShieldLock className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-purple-400">Security & Consent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-gray-500 mt-2">Last Updated: May 30, 2026</p>
        </div>

        {/* Content Body */}
        <div className="space-y-12">
          {/* Section 1: Overview */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconEye className="w-5 h-5 text-purple-400" />
              1. What Information We Collect
            </h2>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-mono">
              <p>
                We collect information directly from you to deliver a premium community dashboard:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account Credentials:</strong> Standard user details (names, email addresses, profiles, preferences) securely managed by Appwrite Auth.</li>
                <li><strong>Developer Telemetry:</strong> Contributions, votes, answers, reputation levels, and active tech stacks that power your interactive public user profile.</li>
                <li><strong>Analytics logs:</strong> Browser requests, IP locations, and simulated moderator tickets to maintain platform health.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Cloudinary Direct Uploads */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconCloud className="w-5 h-5 text-blue-400" />
              2. Cloudinary Unsigned Image Uploads
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-mono">
              To maximize upload speed and reduce latency, our platform supports secure direct uploads from your browser to Cloudinary. Any code attachments or profile images are sent directly from your client connection to our Cloudinary instances using unsigned presets. The resolved secure URL is saved on our database.
            </p>
          </div>

          {/* Section 3: Appwrite Databases */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconDatabase className="w-5 h-5 text-indigo-400" />
              3. Secure Storage under Appwrite Databases
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-mono">
              All question bodies, answer records, and voting states are stored in isolated databases hosted on Appwrite cloud instances. Access key permissions, collection structures, and security rules are audited regularly to keep personal and operational data fully protected.
            </p>
          </div>

          {/* Section 4: Data Rights */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconLock className="w-5 h-5 text-emerald-400" />
              4. Data Control & Rights
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-mono">
              As a developer on DevOverflow, you hold complete control over your contributions. You can edit or delete your posted questions, answers, and profile preferences at any time. When a question or profile is deleted, all referenced documents and Cloudinary assets are deleted cleanly.
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-16 text-center border-t border-white/5 pt-8 text-xs font-mono text-gray-600 space-x-4">
          <Link href="/terms-of-service" className="hover:text-purple-400">Terms of Service</Link>
          <span>·</span>
          <span>© 2026 DevOverflow. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
