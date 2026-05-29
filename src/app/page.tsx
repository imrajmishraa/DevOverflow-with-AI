import React from "react";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";
import AiPlayground from "./components/AiPlayground";
import FaqAccordion from "./components/FaqAccordion";
import { NumberTicker } from "@/components/ui/number-ticker";
import { MagicCard } from "@/components/ui/magic-card";
import { 
  IconSparkles, 
  IconShieldLock, 
  IconDevices, 
  IconArrowRight, 
  IconFlame
} from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* 1. HERO SECTION & SCREEN PARALLAX */}
      <HeroSection />

      {/* 2. WHY DEV_OVERFLOW & METRICS SECTION */}
      <div className="container mx-auto px-4 py-24 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase font-mono px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            Built for modern creators
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-4 bg-linear-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Why DevOverflow?
          </h2>
          <p className="text-gray-400 mt-3 text-lg">
            Say goodbye to outdated forum styles. DevOverflow integrates modular components, 
            instant reputation, and integrated AI companions to boost developer output.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <MagicCard className="p-8 cursor-pointer flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <IconSparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Integrated AI Optimizations</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Explain syntax errors, benchmark algorithms, and summarize threads instantly using our simulated developer companion.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
          </MagicCard>

          <MagicCard className="p-8 cursor-pointer flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <IconShieldLock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gamified Developer Reputation</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Unlock specialized active streaks, level tiers, contribution heatmaps, and customizable badges on your modern profile.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.25),rgba(255,255,255,0))]" />
          </MagicCard>

          <MagicCard className="p-8 cursor-pointer flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6">
                <IconDevices className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Linear/Vercel Aesthetic</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Enjoy keyboard command palettes (CMD+K), glowing border beams, fluid state transitions, and clean minimal dark spaces.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(236,72,153,0.25),rgba(255,255,255,0))]" />
          </MagicCard>
        </div>

        {/* Global Statistics Counters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center select-none bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-white flex justify-center items-center font-mono">
              <NumberTicker value={128490} />
              <span className="text-indigo-400 text-2xl ml-1">+</span>
            </p>
            <p className="text-xs uppercase text-gray-500 font-bold tracking-widest font-mono">Developer Users</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0">
            <p className="text-3xl font-extrabold text-white flex justify-center items-center font-mono">
              <NumberTicker value={49281} />
              <span className="text-purple-400 text-2xl ml-1">+</span>
            </p>
            <p className="text-xs uppercase text-gray-500 font-bold tracking-widest font-mono">Questions Solved</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0">
            <p className="text-3xl font-extrabold text-white flex justify-center items-center font-mono">
              <NumberTicker value={183049} />
              <span className="text-pink-400 text-2xl ml-1">+</span>
            </p>
            <p className="text-xs uppercase text-gray-500 font-bold tracking-widest font-mono">Answers Verified</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0">
            <p className="text-3xl font-extrabold text-white flex justify-center items-center font-mono">
              <NumberTicker value={9491200} />
            </p>
            <p className="text-xs uppercase text-gray-500 font-bold tracking-widest font-mono">Reputation Earned</p>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE AI ASSISTANT PLAYGROUND PREVIEW */}
      <div className="container mx-auto px-4 py-16">
        <AiPlayground />
      </div>

      {/* 4. MAIN FEED & LEADERS SPLIT */}
      <div className="container mx-auto px-4 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Latest Questions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent flex items-center gap-2">
                <IconFlame className="w-7 h-7 text-orange-500" />
                Latest Q&A
              </h2>
              <Link href="/questions" className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1">
                <span>View all questions</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <LatestQuestions />
          </div>

          {/* Top Contributors */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
                Developer Leaderboard
              </h2>
            </div>
            <TopContributers />
          </div>

        </div>
      </div>

      {/* 5. POPULAR TAGS CLOUD */}
      <div className="container mx-auto px-4 py-12 border-t border-white/10 text-center">
        <h3 className="text-xs font-bold tracking-widest text-indigo-400 uppercase font-mono mb-6">Trending Technologies</h3>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {["nextjs", "typescript", "appwrite", "react19", "tailwindcss", "rust", "docker", "postgresql", "fastapi", "aws", "github", "nodejs"].map((tag) => (
            <Link 
              key={tag}
              href={`/questions?tag=${tag}`}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 hover:bg-white/10 hover:border-indigo-500 hover:text-indigo-400 transition-all duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 6. IMMERSIVE ACCORDION FAQ */}
      <div className="container mx-auto px-4 py-24 border-t border-white/10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-2">Everything you need to know about the DevOverflow platform.</p>
        </div>

        <FaqAccordion />
      </div>
    </div>
  );
}
