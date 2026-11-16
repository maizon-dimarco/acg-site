import type { MetadataRoute } from "next";
import { practices } from "@/content/practices";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://acg-site-virid.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    ...practices.map((p) => ({ url: `${base}/${p.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${base}/work`, lastModified: now, priority: 0.6 },
  ];
}
