import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PointsProvider } from "@/context/PointsContext";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar"; // <-- Added Navbar import

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Added metadata for the project
export const metadata: Metadata = {
  title: 'Antigravity IDE | Socratic AI Tutor',
  description: 'Master your exams with AI-generated flashcards and Socratic doubt solving.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", figtree.variable, "dark")}
    >
      {/* Added flex classes to body to ensure the layout stretches to full screen */}
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
        <ThemeProvider>
          <PointsProvider>
            {/* The Auth-Aware Navbar sits at the top of the app */}
            <Navbar />

            {/* Main content wrapper pushes footer down if you add one later */}
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </PointsProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}