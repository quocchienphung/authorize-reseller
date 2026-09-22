import { routes, siteConfig, stores } from "@/config/site";

/**
 * JSON-LD for the reseller (a physical watch store) and its website, so
 * Google can show the name, address, hours and social profiles for brand
 * searches like "Lê Nhi Luxury" or "lenhiluxury.com".
 */
export function StructuredData() {
  const store = stores[0];
  const reseller = siteConfig.reseller;
  const telephone = siteConfig.contact.hotline.label.replaceAll(" ", "");
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: reseller.displayName,
        alternateName: [reseller.name, "lenhiluxury", "lenhiluxury.com"],
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        telephone,
        sameAs: siteConfig.social.map((item) => item.href),
        brand: { "@type": "Brand", name: siteConfig.name, url: "https://alexanderferros.com" },
      },
      {
        "@type": "Store",
        "@id": `${siteConfig.url}/#store`,
        name: reseller.displayName,
        description: siteConfig.description,
        url: `${siteConfig.url}${routes.store(store.slug)}`,
        image: `${siteConfig.url}/opengraph-image.jpg`,
        telephone,
        hasMap: store.mapUrl,
        parentOrganization: { "@id": `${siteConfig.url}/#organization` },
        address: {
          "@type": "PostalAddress",
          streetAddress: store.address,
          addressLocality: store.district,
          addressRegion: store.city,
          addressCountry: "VN",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "09:00",
          closes: "21:00",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: reseller.displayName,
        alternateName: "lenhiluxury.com",
        url: siteConfig.url,
        inLanguage: "vi",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
