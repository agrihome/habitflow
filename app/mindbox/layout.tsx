"use client";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-1 flex-col gap-4 p-5 pt-0">{children}</div>;
}
