"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconWorldQuestion, IconLayoutDashboard } from "@tabler/icons-react";
import { useAuthStore } from "@/store/Auth";
import CommandPalette from "@/components/CommandPalette";

export default function Header() {
  const { user } = useAuthStore();
  const [isPaletteOpen, setIsPaletteOpen] = React.useState(false);

  // Global keydown listener for CMD+K / CTRL+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Questions",
      link: "/questions",
      icon: (
        <IconWorldQuestion className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: (
        <IconLayoutDashboard className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    }
  ];

  return (
    <div className="relative w-full">
      <FloatingNav 
        navItems={navItems} 
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
      />
      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
      />
    </div>
  );
}
