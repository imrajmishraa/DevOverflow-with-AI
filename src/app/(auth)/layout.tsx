"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "motion/react";
import { IconTerminal, IconCircleDot, IconSparkles } from "@tabler/icons-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useAuthStore();
  const router = useRouter();
  const [terminalLine, setTerminalLine] = React.useState(0);

  React.useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  // Animate mock terminal logs
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTerminalLine((prev) => (prev < 5 ? prev + 1 : 5));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  if (session) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row bg-black text-white font-sans mt-10 overflow-hidden">
      {/* LEFT PANEL: Clean Glassmorphic Auth Form */}
      <div className="relative flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen p-8 z-20">
        <BackgroundBeams />

        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/4 w-75 h-75 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Dynamic Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-8 shadow-2xl shadow-indigo-500/5 backdrop-blur-xl"
        >
          {/* Neon gradient line top */}
          <div className="relative w-full">{children}</div>
        </motion.div>
      </div>

      {/* RIGHT PANEL: Interactive Developer Visual Showcase (hidden on mobile) */}
      <div className="relative hidden md:flex flex-col justify-center items-center w-1/2 min-h-screen bg-slate-950 border-l border-white/10 p-12 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Interactive Visual Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <IconTerminal className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-semibold font-mono text-gray-300">
                system@devoverflow:~$
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/40" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <span className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>
          </div>

          {/* Console Output logs with progressive typing effect */}
          <div className="space-y-3 font-mono text-xs text-gray-400 select-none">
            {terminalLine >= 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-indigo-400">➜</span> Initializing
                DevOverflow Environment...
              </motion.p>
            )}
            {terminalLine >= 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-400 font-bold">[OK]</span>{" "}
                Connection to Appwrite Database Established
              </motion.p>
            )}
            {terminalLine >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-400 font-bold">[OK]</span> Session
                Authenticator Loaded (JSON Web Token ready)
              </motion.p>
            )}
            {terminalLine >= 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-purple-400">⚡</span> Synchronizing active
                developer telemetry...
              </motion.p>
            )}
            {terminalLine >= 4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-300 border border-white/10 bg-white/5 rounded-lg p-3 my-2 leading-relaxed"
              >
                <span className="text-orange-400 font-bold block mb-1 flex items-center gap-1">
                  <IconSparkles className="w-4 h-4" /> Global Platform Telemetry
                </span>
                Active Developers Online:{" "}
                <span className="text-emerald-400">12,492</span>
                <br />
                Reputation Earned Today:{" "}
                <span className="text-purple-400">+49,201 XP</span>
                <br />
                Duplicate Questions Blocked:{" "}
                <span className="text-red-400">381 (AI moderating)</span>
              </motion.p>
            )}
            {terminalLine >= 5 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-indigo-400 animate-pulse"
              >
                <IconCircleDot className="w-3.5 h-3.5" />
                <span>
                  Console Listening for user verification credentials...
                </span>
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Feature Teasers */}
        <div className="mt-8 max-w-lg w-full flex flex-col gap-4 text-sm text-gray-400 select-none">
          <div className="flex gap-3">
            <span className="text-indigo-400 font-bold">01.</span>
            <p>
              <strong>Ask and Earn:</strong> Gain reputation, rank up, and
              unlock prestigious animated profile badges.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-purple-400 font-bold">02.</span>
            <p>
              <strong>AI Assistant:</strong> Receive instant code analysis,
              complexity breakdown, and bug detections right inside answers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
