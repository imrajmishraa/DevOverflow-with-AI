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
  const { user, logout } = useAuthStore();
  const { theme, setTheme, initializeTheme } = useThemeStore();

  // Initialize theme class on client load
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
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
          duration: 0.25,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] items-center justify-center transition-shadow duration-300",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-white/80 px-1.5 sm:px-3 py-1 sm:py-1.5 shadow-lg shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-black/50">
          
          {/* logo / app initials */}
          <a href="/" className="px-1.5 sm:px-2 font-black text-xs sm:text-sm tracking-widest text-indigo-400">
            D//O
          </a>

          {/* Divider */}
          <div className="h-4 w-px bg-neutral-200 dark:bg-white/10" />

          {/* Nav items container */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block">{navItem.name}</span>
              </a>
            ))}
          </div>

          {/* Search trigger button */}
          <button 
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 text-xs text-neutral-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            title="Open Command Palette"
          >
            <IconSearch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono text-[10px]">⌘K</span>
          </button>

          {/* Futuristic Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 text-xs text-neutral-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer group"
            title="Toggle Accent Theme"
          >
            <IconColorSwatch className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
            <span className="hidden sm:inline font-mono text-[9px] uppercase font-bold tracking-wider">{theme}</span>
          </button>

          {/* Divider */}
          <div className="h-5 w-px bg-neutral-200 dark:bg-white/10" />

          {/* User Profile / Auth Action */}
          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-2 px-0.5 sm:px-1">
              <a 
                href={`/users/${user.$id}/${slugify(user.name)}`}
                className="block"
                title="Go to profile"
              >
                <picture>
                  <img
                    src={user.prefs?.profileImage || avatars.getInitials(user.name, 32, 32)}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-indigo-500/40 object-cover hover:border-indigo-400 transition-all duration-200"
                  />
                </picture>
              </a>
              <button 
                onClick={() => logout()}
                className="relative flex items-center justify-center p-1.5 sm:p-2 rounded-full border border-red-500/20 bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                title="Logout"
              >
                <IconLogout className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="relative rounded-full bg-neutral-900 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-white/20"
            >
              <span>Login</span>
            </a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
