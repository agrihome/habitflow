"use client";
import MainContainer from "@/components/ui/main";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainContainer>{children}</MainContainer>;
}
