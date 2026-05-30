import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Telemetry Dashboard - DevOverflow",
  description: "Monitor platform metrics, simulated CPU load, and real-time AI moderator activities on the DevOverflow developer community.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
