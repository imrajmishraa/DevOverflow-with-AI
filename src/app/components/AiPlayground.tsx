"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  IconSparkles, 
  IconArrowRight, 
  IconCode,
  IconCpu
} from "@tabler/icons-react";

export default function AiPlayground() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationStep, setOptimizationStep] = useState(0);

  const handleRefactor = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    setOptimizationStep(1);

    setTimeout(() => {
      setOptimizationStep(2);
    }, 1500);

    setTimeout(() => {
      setOptimizationStep(3);
      setIsOptimizing(false);
    }, 3200);
  };

  const initialCode = `// Messy O(N^2) code to find duplicates
function findDuplicates(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !result.includes(arr[i])) {
        result.push(arr[i]);
      }
    }
  }
  return result;
}`;

  const optimizedCode = `// Optimized O(N) using Set & hashmap
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  return Array.from(duplicates);
}`;

  return (
    <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-center justify-between shadow-2xl relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left panel: code editor description */}
      <div className="w-full lg:w-2/5 space-y-6 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
          <IconCpu className="w-4 h-4" />
          <span>AI Code Companion Playground</span>
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-white">
          Optimize Code Instantly
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm">
          Test drive our visual AI Code Companion. Click the refactoring trigger to see DevOverflow analyze time complexity, remove redundancies, and rewrite O(N²) nested loops into O(N) hash mappings.
        </p>
        <button 
          onClick={handleRefactor}
          disabled={isOptimizing}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-500 px-6 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-600 disabled:bg-indigo-800 disabled:text-gray-400 cursor-pointer gap-2"
        >
          <span>{isOptimizing ? "Optimizing..." : "Refactor with AI"}</span>
          <IconArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right panel: code terminal simulator */}
      <div className="w-full lg:w-3/5 rounded-xl border border-white/10 bg-black/60 p-4 shadow-xl backdrop-blur-md relative font-mono select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <div className="flex items-center gap-1.5">
            <IconCode className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-400">findDuplicates.js</span>
          </div>
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
        </div>

        {/* Simulated interactive steps */}
        <div className="text-xs leading-relaxed overflow-x-auto min-h-[220px]">
          <AnimatePresence mode="wait">
            {optimizationStep === 0 && (
              <motion.pre 
                key="initial"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-gray-400 text-left"
              >
                {initialCode}
              </motion.pre>
            )}

            {optimizationStep === 1 && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-3"
              >
                <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <p className="text-indigo-400 animate-pulse text-sm">DevOverflow AI analyzing Big O complexity...</p>
              </motion.div>
            )}

            {optimizationStep === 2 && (
              <motion.div 
                key="analysis"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="space-y-2 py-4 text-left"
              >
                <p className="text-orange-400 font-bold">⚠️ Suboptimal Performance Detected</p>
                <p className="text-gray-400">Time Complexity: <span className="text-red-400">O(N²)</span> due to nested loops.</p>
                <p className="text-gray-400">Space Complexity: <span className="text-emerald-400">O(N)</span> for duplicate array.</p>
                <p className="text-indigo-400 animate-pulse">Rewriting algorithms into Set-based O(N) mapping...</p>
              </motion.div>
            )}

            {optimizationStep === 3 && (
              <motion.div 
                key="optimized"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-4 text-left"
              >
                <pre className="text-emerald-400 font-medium">
                  {optimizedCode}
                </pre>
                <div className="border border-emerald-500/20 bg-emerald-500/10 rounded-lg p-3 text-emerald-400 text-[11px] leading-normal flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span>✓ Big O Refactored from O(N²) to O(N). Execution speed increased by 83%!</span>
                  <button 
                    type="button"
                    onClick={() => setOptimizationStep(0)} 
                    className="underline font-bold px-2 py-0.5 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                  >
                    Reset
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
