"use client";

import React from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
  IconBrandGithub, 
  IconBrandTwitter, 
  IconBrandDiscord, 
  IconShieldLock, 
  IconExternalLink,
  IconFlame,
  IconCompass,
  IconCircleCheck
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="relative block overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-md py-16 text-neutral-300">
      
      {/* Background Animated Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mask-[radial-gradient(ellipse_at_center,white_30%,transparent_90%)]">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={4}
          repeatDelay={1}
          className="h-full w-full"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="font-black text-xl tracking-widest text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 hover:opacity-80 transition-all duration-300">
                  DEV//OVERFLOW
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400 max-w-sm">
                Where developers overflow with knowledge. A premium next-generation developer ecosystem designed to ask questions, optimize code with AI, and grow your reputational score.
              </p>
            </div>
            
            {/* Social & Community Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full border border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300"
                title="GitHub"
              >
                <IconBrandGithub className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full border border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:border-sky-500/40 hover:bg-sky-500/10 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-300"
                title="Twitter / X"
              >
                <IconBrandTwitter className="w-4 h-4" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full border border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300"
                title="Discord"
              >
                <IconBrandDiscord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-100 flex items-center gap-1.5">
              <IconCompass className="w-3.5 h-3.5 text-indigo-400" />
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/questions" className="text-neutral-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Ask & Answer
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-neutral-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Moderator Controls
                </Link>
              </li>
              <li>
                <Link href="/questions/ask" className="text-neutral-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  New Post
                </Link>
              </li>
              <li>
                <span className="text-neutral-500 flex items-center gap-1 cursor-not-allowed">
                  Reputation Tags <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">SOON</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: AI Companion */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-100 flex items-center gap-1.5">
              <IconFlame className="w-3.5 h-3.5 text-amber-400" />
              Intelligence
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-neutral-400 flex items-center gap-1 cursor-default">
                  ToxModerator <span className="text-[10px] bg-green-500/20 text-green-400 px-1 py-0.2 rounded font-mono">Active</span>
                </span>
              </li>
              <li>
                <span className="text-neutral-400 flex items-center gap-1 cursor-default">
                  AI Code Companion <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1 py-0.2 rounded font-mono">Online</span>
                </span>
              </li>
              <li>
                <a 
                  href="https://cloudinary.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-neutral-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  Cloudinary Uploads <IconExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & System */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-100 flex items-center gap-1.5">
              <IconShieldLock className="w-3.5 h-3.5 text-emerald-400" />
              Security & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-neutral-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-neutral-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-neutral-400 flex items-center gap-1 cursor-default">
                  AES-256 Storage
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <hr className="my-10 border-white/5" />

        {/* Bottom Bar: Copyright & Service Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-500">
            &copy; {new Date().getFullYear()} DevOverflow. Built with Shadcn/ui & Magic UI.
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
            
            <div className="text-xs font-mono text-neutral-500 flex items-center gap-1">
              <span>Appwrite Database</span>
              <IconCircleCheck className="w-3.5 h-3.5 text-green-400 inline" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
