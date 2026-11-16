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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://acg-site-virid.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "American Change & Grow",
    title: "American Change & Grow — Turnaround & Restructuring",
    description: "A senior-led turnaround and restructuring firm for middle-market companies and their lenders.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  robots: { index: true, follow: true },
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
