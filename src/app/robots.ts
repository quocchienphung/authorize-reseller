import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Production: crawl everything public. Preview deployments (VERCEL_ENV !==
 * "production") are closed to all crawlers so a *.vercel.app copy can never
 * compete with lenhiluxury.com; next.config.ts adds X-Robots-Tag there too.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/_next/", "/api/"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
