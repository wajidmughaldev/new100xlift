import type { Metadata } from "next";
import { Sora, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "100XLift | Digital Marketing Landing Page",
  description:
    "100XLift helps businesses grow with high-converting landing pages, digital strategy, and marketing systems built for speed.",
  keywords: [
    "100XLift",
    "digital marketing",
    "landing page",
    "SEO friendly website",
    "business growth",
  ],
  openGraph: {
    title: "100XLift | Digital Marketing Landing Page",
    description:
      "Fast, SEO-friendly landing page for a digital growth agency focused on conversions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "scroll-smooth", "antialiased", sora.variable, spaceGrotesk.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
