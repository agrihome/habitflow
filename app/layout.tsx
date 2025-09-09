"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthInitializer from "@/components/auth/authInitializer";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header></Header>
              <AuthInitializer>{children}</AuthInitializer>
            </SidebarInset>
          </SidebarProvider>
        </Provider>
      </body>
    </html>
  );
}
