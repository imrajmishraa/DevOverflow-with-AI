import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register - DevOverflow",
  description: "Create an account on DevOverflow and join the premium next-generation developer ecosystem.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
