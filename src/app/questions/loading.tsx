import React from "react";

export default function QuestionsLoading() {
  return (
    <div className="container mx-auto px-4 pb-20 pt-36 max-w-4xl space-y-8 select-none">
      {/* 1. Header Skeleton */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="h-9 w-48 rounded-xl bg-white/5 animate-pulse" />
        <div className="h-10 w-36 rounded-full bg-white/5 animate-pulse" />
      </div>

      {/* 2. Search Bar Skeleton */}
      <div className="h-12 w-full rounded-xl bg-white/5 animate-pulse" />

      {/* 3. Questions Count Sub-text Skeleton */}
      <div className="h-4 w-32 rounded-lg bg-white/5 animate-pulse" />

      {/* 4. Pulsating Question Cards List (5 items) */}
      <div className="space-y-6 max-w-3xl">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="relative flex flex-col sm:flex-row gap-6 rounded-xl border border-white/5 bg-slate-950/40 p-5 backdrop-blur-md"
          >
            {/* Left Column: Stats Skeleton */}
            <div className="flex sm:flex-col gap-2 shrink-0 sm:w-16 items-start sm:items-end text-sm">
              <div className="h-4 w-12 rounded bg-white/5 animate-pulse" />
              <div className="h-4 w-16 rounded bg-white/5 animate-pulse" />
            </div>

            {/* Right Column: Title and Metadata Skeletons */}
            <div className="w-full space-y-4">
              {/* Title Bar */}
              <div className="space-y-2">
                <div className="h-6 w-3/4 rounded-lg bg-white/10 animate-pulse" />
                <div className="h-4 w-1/2 rounded-lg bg-white/5 animate-pulse sm:hidden" />
              </div>

              {/* Tags & Author info line */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="h-5 w-16 rounded-full bg-white/5 animate-pulse" />
                <div className="h-5 w-12 rounded-full bg-white/5 animate-pulse" />
                <div className="h-5 w-20 rounded-full bg-white/5 animate-pulse" />

                {/* Right Author Badge skeleton */}
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-white/10 animate-pulse" />
                  <div className="h-4 w-16 rounded bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
