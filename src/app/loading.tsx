import React from "react";
import { IconLoader2, IconSparkles } from "@tabler/icons-react";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4 relative overflow-hidden select-none">
      {/* Dynamic background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Spinner & Icons */}
      <div className="relative">
        <IconLoader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <IconSparkles className="w-4 h-4 text-purple-400 animate-bounce" />
        </div>
      </div>

      {/* Developer Subtext */}
      <div className="space-y-1 text-center relative z-10">
        <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-indigo-400">Loading DevOverflow</h2>
        <p className="text-[11px] font-mono text-gray-500">Establishing secure Appwrite connections & caching caches...</p>
      </div>
    </div>
  );
}
