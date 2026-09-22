import type { NextConfig } from "next";

const PRODUCTION_HOST = "lenhiluxury.com";
/** Hosts that must never be indexed as copies of the site: the Vercel alias and the www variant. */
const MIRROR_HOSTS = ["lenhiluxury.vercel.app", `www.${PRODUCTION_HOST}`];
const isProductionDeploy = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  output: process.env.NEXT_BUILD_STANDALONE === "true" ? "standalone" : undefined,
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: process.cwd(),
  },
  redirects() {
    return [
      // Mirrors → canonical host, permanent, path preserved.
      ...MIRROR_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `https://${PRODUCTION_HOST}/:path*`,
        permanent: true,
      })),
      // Legacy alexanderferros.com paths.
      { source: "/watch-collection", destination: "/san-pham", permanent: true },
      { source: "/collections", destination: "/bo-suu-tap", permanent: true },
      { source: "/watch/our-latest", destination: "/san-pham-moi", permanent: true },
      { source: "/watch/2026-novelties", destination: "/san-pham-moi", permanent: true },
      { source: "/stores", destination: "/cua-hang", permanent: true },
      { source: "/services", destination: "/dich-vu", permanent: true },
      { source: "/services/faq", destination: "/dich-vu/faq", permanent: true },
      { source: "/form/contact-us", destination: "/lien-he", permanent: true },
      { source: "/form/appointment", destination: "/dat-lich", permanent: true },
      { source: "/pricing", destination: "/bang-gia", permanent: true },
    ];
  },
  headers() {
    // Preview / branch deployments on Vercel: block indexing at the HTTP level (robots.txt covers the rest).
    if (process.env.VERCEL_ENV && !isProductionDeploy) {
      return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
    }
    return [];
  },
};

export default nextConfig;
