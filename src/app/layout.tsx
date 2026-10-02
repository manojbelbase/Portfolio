import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manoj Belbase | Frontend Developer",
  description: "Frontend Developer building modern web experiences with React, Next.js, and clean UI systems.",
  metadataBase: new URL("https://manojbelbase.com.np"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Manoj Belbase | Frontend Developer",
    description: "Frontend Developer building modern web experiences with React, Next.js, and clean UI systems.",
    url: "https://manojbelbase.com.np",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#0b0b0b] text-white">{children}</body>
    </html>
  );
}
