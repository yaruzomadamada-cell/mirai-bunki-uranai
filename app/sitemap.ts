import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/fortune-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();
  const staticRoutes = [
    "/",
    "/fortune",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/commercial-law",
    "/contact",
    "/success",
    "/cancel",
  ];
  const seoRoutes = Object.keys(seoPages).map((slug) => `/pages/${slug}`);

  return [...staticRoutes, ...seoRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
