"use client";

import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { MagicCard } from "@/components/ui/magic-card";
import { motion, AnimatePresence } from "motion/react";
import { 
  IconLayoutDashboard, 
  IconFlame, 
  IconServer, 
  IconUsers, 
  IconReportMedical, 
  IconCircleCheck, 
  IconSparkles, 
  IconClock,
  IconKeyboard,
  IconX
} from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "@/store/Toast";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState<"analytics" | "moderation">("analytics");
  const [reports, setReports] = React.useState([
    { id: 1, type: "Question", title: "How to exit Vim?", reason: "Duplicate post", status: "pending", author: "johndoe" },
    { id: 2, type: "Answer", title: "Re: Exit Vim", reason: "Spam content", status: "pending", author: "spammer12" },
    { id: 3, type: "Comment", title: "You don't exit Vim.", reason: "Unprofessional tone", status: "resolved", author: "senior_dev" }
  ]);

  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [showShortcutHelp, setShowShortcutHelp] = React.useState(false);

  const resolveReport = (id: number) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r))
    );
  };

  // Keyboard Navigation Handlers
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if user is typing in inputs or textareas
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === "a") {
        setActiveTab("analytics");
        setSelectedIndex(null);
      } else if (key === "m") {
        setActiveTab("moderation");
        if (reports.length > 0) {
          setSelectedIndex(0);
        }
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
        setShowShortcutHelp(false);
      } else if (e.key === "?" || key === "h") {
        e.preventDefault();
        setShowShortcutHelp((prev) => !prev);
      }

      // Moderation specific keys
      if (activeTab === "moderation" && reports.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev === null ? 0 : Math.min(reports.length - 1, prev + 1)));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev === null ? 0 : Math.max(0, prev - 1)));
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (selectedIndex !== null) {
            const report = reports[selectedIndex];
            if (report && report.status !== "resolved") {
              resolveReport(report.id);
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, reports, selectedIndex]);

  // Modern SVG mock charts data
  const chartData = [20, 45, 28, 80, 55, 95, 85]; // 7 days analytics

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden pb-20 pt-32 relative">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent flex items-center gap-2">
              <IconLayoutDashboard className="w-8 h-8 text-indigo-400" />
              DevOverflow Dashboard
            </h1>
            <p className="text-sm text-gray-500 font-mono">Platform analytics, telemetry logging, and AI moderator systems.</p>
          </div>

          {/* Controls: Shortcuts Guide & Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => setShowShortcutHelp(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer"
              title="Keyboard Shortcuts Guide"
            >
              <IconKeyboard className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Press [?]</span>
            </button>

            {user && (
              <Link
                href={`/users/${user.$id}/${slugify(user.name)}/votes`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer"
                title="View My Votes"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>My Votes</span>
              </Link>
            )}

            <div className="flex gap-1 bg-white/5 border border-white/10 p-1 rounded-lg">
              <button 
                onClick={() => {
                  setActiveTab("analytics");
                  setSelectedIndex(null);
                }}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "analytics" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Analytics [A]
              </button>
              <button 
                onClick={() => {
                  setActiveTab("moderation");
                  if (reports.length > 0) setSelectedIndex(0);
                }}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "moderation" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                AI Moderation [M] ({reports.filter((r) => r.status === "pending").length})
              </button>
            </div>
          </div>
        </div>

        {/* Global Statistics Counters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <MagicCard className="p-6 cursor-pointer flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase text-gray-500 font-bold tracking-widest font-mono">Server Load</span>
              <IconServer className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white font-mono flex items-baseline">
                <NumberTicker value={12} />
                <span className="text-emerald-400 text-sm ml-1">% (Normal)</span>
              </p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">Appwrite CPU Health</p>
            </div>
          </MagicCard>

          <MagicCard className="p-6 cursor-pointer flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase text-gray-500 font-bold tracking-widest font-mono">Daily Traffic</span>
              <IconFlame className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white font-mono">
                <NumberTicker value={49281} />
              </p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">Active User Requests</p>
            </div>
          </MagicCard>

          <MagicCard className="p-6 cursor-pointer flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase text-gray-500 font-bold tracking-widest font-mono">AI Companion Taps</span>
              <IconSparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white font-mono">
                <NumberTicker value={94012} />
              </p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">Optimizations Generated</p>
            </div>
          </MagicCard>

          <MagicCard className="p-6 cursor-pointer flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase text-gray-500 font-bold tracking-widest font-mono">Report Tickets</span>
              <IconReportMedical className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white font-mono">
                <NumberTicker value={reports.filter((r) => r.status === "pending").length} />
              </p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">Pending AI Moderations</p>
            </div>
          </MagicCard>
        </div>

        {/* Dynamic Display sections */}
        {activeTab === "analytics" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* SVG Charts Card */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono mb-6">Weekly Developer Activity</h3>
                
                {/* SVG Graph */}
                <div className="relative w-full h-[220px] p-4 border border-white/5 bg-black/40 rounded-xl flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 700 200">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="700" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                    <line x1="0" y1="100" x2="700" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                    <line x1="0" y1="150" x2="700" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                    {/* Area fill */}
                    <path 
                      d="M 50 160 Q 150 110, 250 144 T 450 40 T 650 30 L 650 200 L 50 200 Z" 
                      fill="url(#chart-grad)"
                    />

                    {/* Glowing Line Path */}
                    <path 
                      d="M 50 160 Q 150 110, 250 144 T 450 40 T 650 30" 
                      fill="none" 
                      stroke="#6366f1" 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                    />

                    {/* Data Points circles */}
                    <circle cx="50" cy="160" r="4.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                    <circle cx="150" cy="110" r="4.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                    <circle cx="250" cy="144" r="4.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                    <circle cx="350" cy="92" r="4.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                    <circle cx="450" cy="40" r="4.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                    <circle cx="550" cy="50" r="4.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                    <circle cx="650" cy="30" r="4.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-4">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Platform Telemetry logs */}
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl relative overflow-hidden flex flex-col">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono mb-4">Telemetry Logs</h3>
              
              <div className="flex-1 w-full rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-[10px] text-gray-500 space-y-3 leading-normal select-none max-h-[220px] overflow-y-auto">
                <p className="flex items-center gap-1.5"><IconClock className="w-3.5 h-3.5 text-gray-600" /> [19:02:49] GET /api/vote ➔ <span className="text-emerald-400">200 OK</span></p>
                <p className="flex items-center gap-1.5"><IconClock className="w-3.5 h-3.5 text-gray-600" /> [19:04:12] POST /api/answer ➔ <span className="text-emerald-400">201 Created</span></p>
                <p className="flex items-center gap-1.5"><IconClock className="w-3.5 h-3.5 text-gray-600" /> [19:12:01] AI engine scanned duplicates ➔ <span className="text-indigo-400">Resolved O(N)</span></p>
                <p className="flex items-center gap-1.5"><IconClock className="w-3.5 h-3.5 text-gray-600" /> [19:18:22] Reputation rewards synchronizing...</p>
                <p className="flex items-center gap-1.5"><IconClock className="w-3.5 h-3.5 text-gray-600" /> [19:24:50] Telemetry verified by node-appwrite SDK</p>
              </div>
            </div>

          </div>
        ) : (
          /* MODERATION CARD TABS */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left 2 Columns: Platform Moderation Queue */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl relative overflow-hidden space-y-4">
              {/* Power User Toolbar Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border border-indigo-500/20 bg-indigo-500/5 rounded-xl p-3 px-4 text-xs text-gray-300 font-mono">
                <span className="flex items-center gap-1.5">
                  <IconKeyboard className="w-4 h-4 text-indigo-400" />
                  <span><strong>Power User Active:</strong> Use <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white">↑</kbd> <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white">↓</kbd> arrows.</span>
                </span>
                <span>Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white">Enter</kbd> to resolve flag.</span>
              </div>

              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
                <IconReportMedical className="w-5 h-5 text-red-400" />
                Platform Moderation Queue
              </h3>

              <div className="space-y-4">
                {reports.map((report, index) => {
                  const isSelected = selectedIndex === index;
                  return (
                    <div 
                      key={report.id}
                      className={`flex flex-col md:flex-row justify-between items-start md:items-center rounded-xl border p-4 shadow-lg transition-all duration-200 cursor-pointer ${
                        report.status === "resolved" 
                          ? "border-emerald-500/10 bg-emerald-500/5 opacity-55" 
                          : isSelected
                          ? "border-indigo-500 ring-2 ring-indigo-500 bg-white/[0.04] scale-[1.01] shadow-[0_0_25px_rgba(99,102,241,0.25)]"
                          : "border-white/5 bg-black/40 hover:bg-white/[0.02]"
                      }`}
                      onClick={() => report.status !== "resolved" && setSelectedIndex(index)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            report.type === "Question" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          }`}>
                            {report.type}
                          </span>
                          <h4 className="font-bold text-sm text-white">{report.title}</h4>
                        </div>
                        <p className="text-xs text-gray-400">
                          Report Reason: <strong className="text-gray-300 font-medium font-mono">{report.reason}</strong> · Flagged Author: <span className="underline">@{report.author}</span>
                        </p>
                      </div>

                      <div className="mt-3 md:mt-0 shrink-0 flex items-center gap-3">
                        {report.status === "resolved" ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono font-bold">
                            <IconCircleCheck className="w-4 h-4" /> Resolved by AI Moderator
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <span className="text-[10px] font-mono text-indigo-400 font-bold hidden sm:inline">
                                Press [ENTER]
                              </span>
                            )}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                resolveReport(report.id);
                              }}
                              className="h-8 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs px-4 cursor-pointer shadow-lg shadow-indigo-500/25 transition-all"
                            >
                              Dismiss Flag
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 1 Column: Simulated AI Guardrails Tuning */}
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200 font-mono flex items-center gap-1.5">
                  <IconSparkles className="w-4 h-4 text-indigo-400" />
                  AI Guardrails Tuning
                </h3>
                <p className="text-[10px] text-gray-500 font-mono">Fine-tune simulated NLP moderator constraints in real-time.</p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Toxicity slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">Toxicity Threshold</span>
                    <span className="text-indigo-400 font-bold">85%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="99" 
                    defaultValue="85" 
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Spam sensitivity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">Spam Filter Weights</span>
                    <span className="text-indigo-400 font-bold">90%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="99" 
                    defaultValue="90" 
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Auto-tagging weight */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">Auto-Tagging Weight</span>
                    <span className="text-indigo-400 font-bold">70%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="99" 
                    defaultValue="70" 
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2 border-t border-white/5 font-mono text-[10px] text-gray-400">
                  <div className="flex items-center justify-between">
                    <span>Auto-Lock Suboptimal Threads</span>
                    <div className="w-8 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/40 p-0.5 flex justify-end cursor-pointer">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Scan Duplicate Questions</span>
                    <div className="w-8 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/40 p-0.5 flex justify-end cursor-pointer">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      toast("AI Guardrails synchronized successfully!", "success");
                    }}
                    className="w-full h-9 rounded-xl border border-white/10 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-indigo-500/25"
                  >
                    Synchronize Weights
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Keyboard Shortcuts Help Guide Overlay Modal */}
      <AnimatePresence>
        {showShortcutHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-6 md:p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <button 
                onClick={() => setShowShortcutHelp(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-all cursor-pointer"
              >
                <IconX className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <IconKeyboard className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white tracking-tight">Power User Hotkeys</h3>
                </div>

                <p className="text-xs text-gray-400 font-mono">Enhance moderation speed and analytics navigation using keyboard commands.</p>

                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-gray-400">Switch to Analytics Engine</span>
                    <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">A</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-gray-400">Switch to AI Moderation</span>
                    <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">M</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-gray-400">Toggle Shortcuts Menu</span>
                    <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">?</kbd> or <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">H</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-gray-400">Navigate Tickets (Moderation Queue)</span>
                    <span className="flex gap-1">
                      <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">↑</kbd>
                      <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">↓</kbd>
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-gray-400">Resolve/Dismiss Flag</span>
                    <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">Enter</kbd> or <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">Space</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-gray-400">Close Guide or Clear Selection</span>
                    <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">ESC</kbd>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setShowShortcutHelp(false)}
                    className="w-full h-10 rounded-xl border border-white/20 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Got it, close menu
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
