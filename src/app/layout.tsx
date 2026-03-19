import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Child Injury Claims - No Win No Fee Compensation UK",
  description: "Expert child injury claims help across the UK. No win no fee compensation claims for injured children. Free assessment, 98% success rate.",
  keywords: ["child injury claims", "child compensation", "injury claims UK", "no win no fee", "child accident claim"],
  authors: [{ name: "Child Injury Claims" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Child Injury Claims - No Win No Fee Compensation UK",
    description: "Expert child injury claims help across the UK. No win no fee, free assessment.",
    url: "https://childinjuryclaims.co.uk",
    siteName: "Child Injury Claims",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Child Injury Claims - No Win No Fee Compensation UK",
    description: "Expert child injury claims help across the UK. No win no fee, free assessment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
