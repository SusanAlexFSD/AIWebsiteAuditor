import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "@/components/Layout/Providers";
import AppHeader from "@/components/Layout/AppHeader";
import AppFooter from "@/components/Layout/AppFooter";
import PageContainer from "@/components/Layout/PageContainer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Website Auditor",
  description:
    "AI-powered website audits with SEO, accessibility, technical analysis and intelligent recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">

        <Providers>

          <AppHeader />

          <PageContainer className="flex-1">
            {children}
          </PageContainer>

          <AppFooter />

        </Providers>

      </body>
    </html>
  );
}