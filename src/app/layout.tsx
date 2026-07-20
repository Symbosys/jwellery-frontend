import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Suspense } from "react";
// @ts-ignore: Allow importing global CSS without type declarations
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Aura Fine Jewellery | Premium Gold & Diamonds",
  description: "Discover exquisite gold, diamond, and solitaire jewellery crafted to perfection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Suspense fallback={<div className="min-h-screen bg-[#111111] flex items-center justify-center text-xs uppercase tracking-widest text-[#FFF] animate-pulse">Loading Aura Fine Jewellery...</div>}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
