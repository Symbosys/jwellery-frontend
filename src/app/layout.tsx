import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
// @ts-ignore: Allow importing global CSS without type declarations
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Aura Jewels | Luxury & Fine Jewellery",
  description: "Discover our premium collection of certified gold, diamond, and luxury jewellery. Handcrafted elegance for every special occasion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Suspense fallback={<div className="min-h-screen bg-[#111111] flex items-center justify-center text-xs uppercase tracking-widest text-[#FFF] animate-pulse">Loading Aura Jewels...</div>}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
