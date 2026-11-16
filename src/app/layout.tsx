import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight, Newsreader } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://8x-life-faraz.vercel.app"),
  title: "8x | Life at 8x — The Human Company",
  description:
    "250k+ humans across 50+ countries, orchestrated by a lean, high-agency core team. See how we build 8x Social, LinkedIn, Hiring, and Sales—and whether you belong here.",
  openGraph: {
    title: "8x | Life at 8x — The Human Company",
    description:
      "Make the right builders want to work at 8x, and give the wrong people a clear reason to self-select out.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcf7f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${newsreader.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#fcf7f0] font-sans text-[#1c2121] selection:bg-[#2350FF] selection:text-[#fcf7f0]">
        {children}
      </body>
    </html>
  );
}
