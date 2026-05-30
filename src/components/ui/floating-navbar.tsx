"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/Auth";
import { useThemeStore } from "@/store/Theme";
import { toast } from "@/store/Toast";
import { avatars } from "@/models/client/config";
import slugify from "@/utils/slugify";
import { IconSearch, IconLogout, IconColorSwatch } from "@tabler/icons-react";

export const FloatingNav = ({
  navItems,
  className,
  onOpenCommandPalette,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  onOpenCommandPalette?: () => void;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true); // Default to visible on mount
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuthStore();
  const { theme, setTheme, initializeTheme } = useThemeStore();

  // Initialize theme class on client load
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      setIsScrolled(current > 20);

      const previous = scrollY.getPrevious() ?? 0;
      const diff = current - previous;

      // Do not hide if the user is hovering over the navbar
      if (isHovered) {
        setVisible(true);
        return;
      }

      if (current < 30) {
        setVisible(true); // Keep header visible at the very top of the page
      } else {
        if (diff < -15) {
          setVisible(true); // Show on scroll up with scroll-delta threshold
        } else if (diff > 15) {
          setVisible(false); // Hide on scroll down with scroll-delta threshold
        }
      }
    }
  });

  // Keep it visible if hovered
  useEffect(() => {
    if (isHovered) {
      setVisible(true);
    }
  }, [isHovered]);

  const toggleTheme = () => {
    const themes: ("indigo" | "amber" | "green" | "slate")[] = ["indigo", "amber", "green", "slate"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    
    // Trigger premium visual toast feedback
    toast(`Accent theme toggled to ${nextTheme.toUpperCase()}`, "success");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -150,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "w-full fixed top-4 inset-x-0 mx-auto z-[5000] transition-all duration-300 px-4 md:px-0",
          isScrolled ? "max-w-3xl" : "max-w-6xl",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={cn(
            "w-full flex items-center justify-between select-none transition-all duration-300",
            isScrolled 
              ? "rounded-2xl border border-white/15 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md px-4 py-2 h-[56px]" 
              : "rounded-none border-transparent bg-transparent shadow-none px-6 py-4 h-[72px]"
          )}
        >
          
          {/* Left: Glowing Logo */}
          <a href="/" className="flex items-center gap-2 px-2 shrink-0">
            <span className={cn(
              "font-extrabold tracking-widest bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-sans transition-all duration-300",
              isScrolled ? "text-sm sm:text-base" : "text-base sm:text-lg"
            )}>
              DevOverflow
            </span>
          </a>

          {/* Center: Navigation Links (hidden on mobile, visible on desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className="relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-tight text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <span>{navItem.name}</span>
              </a>
            ))}
          </div>

          {/* Right: Actions section */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Search trigger button */}
            <button 
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] text-neutral-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer font-mono"
              title="Open Command Palette"
            >
              <IconSearch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-bold">⌘K</span>
            </button>

            {/* Futuristic Theme Switcher */}
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] text-neutral-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer group font-mono"
              title="Toggle Accent Theme"
            >
              <IconColorSwatch className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="hidden sm:inline uppercase font-bold tracking-wider">{theme}</span>
            </button>

            {/* Divider */}
            <div className="h-5 w-px bg-white/10 hidden sm:block" />

            {/* User Profile / Auth Action */}
            {user ? (
              <div className="flex items-center gap-2">
                <a 
                  href={`/users/${user.$id}/${slugify(user.name)}`}
                  className="block shrink-0"
                  title="Go to profile"
                >
                  <picture>
                    <img
                      src={user.prefs?.profileImage || avatars.getInitials(user.name, 32, 32)}
                      alt={user.name}
                      className="w-7 h-7 rounded-full border border-indigo-500/40 object-cover hover:border-indigo-400 transition-all duration-200"
                    />
                  </picture>
                </a>
                <button 
                  onClick={() => logout()}
                  className="relative flex items-center justify-center p-1.5 rounded-full border border-red-500/25 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                  title="Logout"
                >
                  <IconLogout className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="h-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-[11px] rounded-full px-4 border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06)] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
              >
                <span>Join Developer Hub</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
