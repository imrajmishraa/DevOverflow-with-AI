import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login - DevOverflow",
  description: "Sign in to your DevOverflow account to share code, ask technical questions, and grow your developer reputation.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
