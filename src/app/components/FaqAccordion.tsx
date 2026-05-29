"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the gamified reputation system work?",
      a: "DevOverflow rewards users for active knowledge-sharing. Upvotes on questions and answers yield XP points. Earning XP ranks up your developer level, unlocks custom animated badges ('Bug Hunter', 'Markdown Master'), and increases your position on the leaderboards."
    },
    {
      q: "What is the AI Code Companion?",
      a: "Our AI Companion evaluates the algorithmic complexity of submitted code blocks. It highlights potential bugs, predicts Big O notation, and suggests O(N) loop replacements instantly using visual components."
    },
    {
      q: "What benefits does Appwrite bring as the backend?",
      a: "Appwrite hosts our core telemetry, user authentication, buckets, databases, and documents. It ensures secure JWT generation, fast indexing of developer questions, and low latency page loading."
    },
    {
      q: "How can I trigger the command palette?",
      a: "Press `⌘ + K` on macOS or `Ctrl + K` on Windows/Linux anywhere on DevOverflow to trigger the command palette. It supports live question searching, tag indexing, profile navigation, and system commands."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;
        return (
          <div 
            key={index}
            className="rounded-xl border border-white/10 bg-slate-950/40 overflow-hidden"
          >
            <button 
              type="button"
              onClick={() => setOpenFaq(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-200 hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              <span className="text-sm md:text-base">{faq.q}</span>
              <IconChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-white/5"
                >
                  <div className="p-5 text-sm text-gray-400 leading-relaxed bg-black/40 text-left">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
