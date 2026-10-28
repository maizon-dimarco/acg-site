import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

// One typeface for the whole site, the same family as the logo. Variable axes: optical size,
// weight, SOFT (corner softness) and WONK (the quirkier italic forms used in display sizes).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "American Change & Grow — Turnaround & Restructuring",
    template: "%s — American Change & Grow",
  },
  description:
    "A senior-led turnaround and restructuring firm. Turnaround, refinancing and M&A, value creation, interim leadership and operational AI for middle-market companies and their lenders.",
  icons: { icon: "/brand/acg-favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#16293B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>{children}</body>
    </html>
  );
}
