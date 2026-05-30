import React from "react";

export default function QuestionDetailsLoading() {
  return (
    <div className="container mx-auto px-4 pb-20 pt-36 max-w-7xl space-y-8 select-none">
      {/* 1. Page Header Skeletons */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3 w-2/3">
          <div className="h-8 w-full rounded-xl bg-white/10 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-4 w-28 rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-20 rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-24 rounded bg-white/5 animate-pulse" />
          </div>
        </div>
        <div className="h-10 w-36 rounded-full bg-white/5 animate-pulse shrink-0 ml-auto" />
      </div>

      <hr className="border-white/10" />

      {/* 2. Three-column Content layout Skeletons */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT: Vote Column Skeleton */}
        <div className="flex shrink-0 flex-row lg:flex-col items-center gap-4 w-full lg:w-14 justify-center lg:justify-start">
          <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
          <div className="w-6 h-6 rounded bg-white/5 animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
          <div className="hidden lg:block h-px w-full bg-white/10" />
          <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
        </div>

        {/* MIDDLE: Markdown Content & Comments Skeleton */}
        <div className="flex-1 w-full space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-md space-y-6">
            {/* Markdown Text Skeletons */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
              <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
              <div className="h-4 w-4/5 rounded bg-white/5 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-white/5 animate-pulse" />
            </div>

            {/* Optional Image Attachment Skeleton */}
            <div className="h-48 w-full sm:w-2/3 rounded-lg bg-white/5 animate-pulse border border-white/10" />

            {/* Tags Line Skeletons */}
            <div className="flex gap-2 pt-4">
              <div className="h-5 w-16 rounded-full bg-white/5 animate-pulse" />
              <div className="h-5 w-16 rounded-full bg-white/5 animate-pulse" />
              <div className="h-5 w-16 rounded-full bg-white/5 animate-pulse" />
            </div>

            {/* Author Block Skeleton */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
                  <div className="h-3.5 w-12 rounded bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Comments Panel Skeleton */}
          <div className="space-y-3 rounded-xl border border-white/5 p-4 bg-slate-950/20">
            <div className="h-4 w-24 rounded bg-white/5 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-white/5 animate-pulse" />
          </div>
        </div>

        {/* RIGHT: AI Code Companion Sidebar Skeleton */}
        <div className="w-full lg:w-80 shrink-0 rounded-2xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse" />
            <div className="h-4 w-36 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
            <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
            <div className="h-3 w-4/5 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="h-24 w-full rounded-xl bg-white/5 animate-pulse" />
        </div>

      </div>
    </div>
  );
}
