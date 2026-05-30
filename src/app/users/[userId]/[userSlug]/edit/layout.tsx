import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Profile - DevOverflow",
  description: "Customize your developer bio, update your portfolio links, and configure your active tech stack tags on DevOverflow.",
};

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
