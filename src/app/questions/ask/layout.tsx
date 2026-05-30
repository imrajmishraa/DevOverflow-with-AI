import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ask a Question - DevOverflow",
  description: "Craft a well-structured technical question and share it with the DevOverflow developer ecosystem.",
};

export default function AskQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
