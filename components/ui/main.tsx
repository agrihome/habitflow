export default function MainContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-1 flex-col gap-4 p-5 pt-2 w-full overflow-auto">{children}</div>;
}
