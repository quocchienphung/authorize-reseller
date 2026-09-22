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
    // Baseline security headers (HSTS is added by Vercel on custom domains). No CSP: inline theme bootstrap + fonts would need nonces.
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    // Preview / branch deployments on Vercel: block indexing at the HTTP level (robots.txt covers the rest).
    const preview = process.env.VERCEL_ENV && !isProductionDeploy ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : [];
    return [{ source: "/:path*", headers: [...security, ...preview] }];
  },
};

export default nextConfig;
