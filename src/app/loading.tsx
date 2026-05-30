import React from "react";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4 relative overflow-hidden select-none">
      {/* Dynamic background glows */}
      <div className="absolute top-1/4 left-1/4 w-75 h-75 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-75 h-75 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Uiverse Hole Loading Animation */}
      <div className="relative flex items-center justify-center w-32 h-32">
        <div className="hole">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}
