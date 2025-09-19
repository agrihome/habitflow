function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="p-5">{children}</main>;
}

export default Layout;
