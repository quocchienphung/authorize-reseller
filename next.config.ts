import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_BUILD_STANDALONE === "true" ? "standalone" : undefined,
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    root: process.cwd(),
  },
  redirects() {
    return [
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
};

export default nextConfig;
