/**
 * One place for everything search engines read: absolute URLs, per-route
 * metadata builders and JSON-LD graphs. Pages call these instead of
 * assembling titles, canonicals or schema by hand, so the production origin
 * (`siteConfig.url`) and the reseller brand are never hard-coded twice.
 */
import type { Metadata } from "next";
import { routes, siteConfig, type Store } from "@/config/site";
import { categoryLabel, familyDisplayName, familyReference, getSpecification, parsePrice, type Product } from "@/lib/product-helpers";
import { products } from "@/lib/products";

export const BRAND = siteConfig.reseller.brand;
export const WATCH_BRAND = siteConfig.name;
/** Shared social preview (1200×630); pages with their own imagery override it. */
export const DEFAULT_OG_IMAGE = { url: "/og/lenhiluxury.jpg", width: 1200, height: 630, alt: `${BRAND} – đại lý phân phối chính hãng đồng hồ ${WATCH_BRAND}` };

/** Absolute production URL for a site path ("/" → origin without a trailing slash). */
export function absoluteUrl(path: string) {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const STORE_ID = `${siteConfig.url}/#store`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

type PageMetadataInput = {
  /** Title without the "| LENHI Luxury" suffix; the root template adds it. */
  title: string;
  description: string;
  /** Site path used for the canonical and Open Graph URL. */
  path: string;
  /** Site-relative image; omitted → DEFAULT_OG_IMAGE. */
  image?: { url: string; alt: string; width?: number; height?: number };
  noindex?: boolean;
};

/** Metadata for a static route: unique title + description, self-canonical, OG/Twitter mirrors. */
export function pageMetadata({ title, description, path, image, noindex }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${BRAND}`,
      description,
      url: path,
      images: [image ?? DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BRAND}`,
      description,
      images: [(image ?? DEFAULT_OG_IMAGE).url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

/** Spec lookups shared by the summary sentence, meta description and schema. */
export function productFacts(product: Product) {
  return {
    movement: getSpecification(product, /Bộ máy/i),
    strap: getSpecification(product, /Chất liệu dây/i),
    glass: getSpecification(product, /mặt kính/i),
    size: getSpecification(product, /Kích thước/i),
    waterResistance: getSpecification(product, /chống nước/i),
    gender: getSpecification(product, /Giới tính/i),
    dialShape: getSpecification(product, /Hình dạng/i),
    origin: getSpecification(product, /Xuất xứ/i),
  };
}

/** "Alexander Ferros 2241S-06" — the model name search queries use. */
export function productModelName(product: Product) {
  return `${WATCH_BRAND} ${product.sku}`;
}

/**
 * One factual sentence unique to this reference, built only from its own
 * specifications: category, case size, movement, glass, strap, water
 * resistance. Shown on the page and reused as the meta description lead.
 */
export function productSummary(product: Product, { compact = false } = {}) {
  const facts = productFacts(product);
  const parts = [
    facts.size ? `${product.category.toLowerCase()} ${facts.size}` : product.category.toLowerCase(),
    facts.movement ? `máy ${facts.movement}` : undefined,
    facts.glass ? facts.glass.toLowerCase() : undefined,
    // The strap line can run long ("dây kim loại hoặc dây da"); the meta description drops it first.
    facts.strap && !compact ? facts.strap.toLowerCase() : undefined,
    facts.waterResistance ? `chống nước ${facts.waterResistance}` : undefined,
  ].filter((part): part is string => Boolean(part));
  return `${productModelName(product)} — ${parts.join(", ")}.`;
}

/** Google shows ~155–160 characters; keep the strap only when it fits. */
const META_DESCRIPTION_MAX = 160;

export function productMetadata(product: Product): Metadata {
  const model = productModelName(product);
  // Opens with the reference (what people search) followed by facts the title does not carry.
  const compose = (compact: boolean, cta: string) => {
    const facts = productSummary(product, { compact }).replace(`${model} — `, "");
    return `${model}: ${facts} Giá ${product.price}. Chính hãng, ${cta}`;
  };
  // Longest variant that fits: with strap → without strap → shortest call to action.
  const description =
    [compose(false, `xem tại showroom ${BRAND}.`), compose(true, `xem tại showroom ${BRAND}.`), compose(true, `tại ${BRAND}.`)].find(
      (candidate) => candidate.length <= META_DESCRIPTION_MAX,
    ) ?? compose(true, `tại ${BRAND}.`);
  return pageMetadata({
    // "Đồng hồ" leads every query for the brand; the catalogue name itself is "Đồng Hồ Alexander Ferros <ref>".
    title: `Đồng hồ ${model} chính hãng`,
    description,
    path: routes.product(product.slug),
    // No width/height: the renders come in several sizes (1000², 2000², 3375²…); crawlers read the file.
    image: { url: product.image, alt: product.name },
  });
}

/** Product + Offer schema from catalogue values only (no ratings, stock or discounts are invented). */
export function productJsonLd(product: Product) {
  const facts = productFacts(product);
  const url = absoluteUrl(routes.product(product.slug));
  const additionalProperty = product.specifications.map(([name, value]) => ({ "@type": "PropertyValue", name, value }));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: productModelName(product),
    alternateName: product.sku.includes("/") ? [product.name, `${WATCH_BRAND} ${product.sku.replaceAll("/", "-")}`] : product.name,
    sku: product.sku,
    mpn: product.sku,
    brand: { "@type": "Brand", name: WATCH_BRAND },
    category: product.category,
    description: `${productSummary(product)} ${product.description}`,
    image: [product.image, ...product.images].map((src) => absoluteUrl(src)),
    url,
    ...(facts.gender ? { audience: { "@type": "PeopleAudience", suggestedGender: facts.gender === "Nam" ? "male" : "female" } } : {}),
    ...(facts.strap ? { material: facts.strap } : {}),
    additionalProperty,
    isRelatedTo: { "@type": "ProductGroup", name: familyDisplayName(product.familySlug), url: absoluteUrl(routes.family(product.familySlug)) },
    offers: {
      "@type": "Offer",
      url,
      price: parsePrice(product.price),
      priceCurrency: "VND",
      availability: siteConfig.commerce.availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORGANIZATION_ID },
      ...offerPolicies(),
    },
  };
}

/** Return / shipping terms only once the owner has declared them in siteConfig.commerce. */
function offerPolicies() {
  const { returnPolicy, shipping } = siteConfig.commerce;
  const quantitative = (min: number, max: number) => ({ "@type": "QuantitativeValue", minValue: min, maxValue: max, unitCode: "DAY" });
  return {
    ...(returnPolicy
      ? {
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "VN",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: returnPolicy.merchantReturnDays,
            returnMethod: "https://schema.org/ReturnInStore",
            returnFees: returnPolicy.returnFees,
          },
        }
      : {}),
    ...(shipping
      ? {
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: { "@type": "MonetaryAmount", value: shipping.rate, currency: "VND" },
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "VN" },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: quantitative(...shipping.handlingDays),
              transitTime: quantitative(...shipping.transitDays),
            },
          },
        }
      : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export function categoryMetadata(category: "nam" | "nu", count: number): Metadata {
  const isMens = category === "nam";
  return pageMetadata({
    title: `Đồng hồ ${category === "nam" ? "nam" : "nữ"} ${WATCH_BRAND} chính hãng`,
    description: isMens
      ? `${count} mẫu đồng hồ ${WATCH_BRAND} nam chính hãng tại ${BRAND}: máy automatic và quartz Miyota, kính sapphire, vỏ thép 316L. Xem giá từng phiên bản.`
      : `${count} mẫu đồng hồ ${WATCH_BRAND} nữ chính hãng tại ${BRAND}: thiết kế thanh lịch, kính sapphire, máy Nhật Bản bền bỉ. Xem giá từng phiên bản.`,
    path: isMens ? routes.mens : routes.womens,
    image: {
      url: isMens ? "/alexander-ferros/covers/mens-listing-desktop.webp" : "/alexander-ferros/covers/womens-desktop.webp",
      alt: `Đồng hồ ${categoryLabel[category].toLowerCase()} ${WATCH_BRAND}`,
      width: 1600,
      height: 900,
    },
  });
}

export function familyMetadata(familySlug: string, familyProducts: readonly Product[]): Metadata {
  const reference = familyReference(familySlug);
  const lead = familyProducts[0];
  const skuList = familyProducts.map((product) => product.sku);
  const facts = productFacts(lead);
  const detail = [facts.size, facts.movement ? `máy ${facts.movement}` : undefined, facts.glass].filter(Boolean).join(", ");
  // List as many references as fit in the snippet (4 → 3 → 2), then the shared facts.
  const compose = (shown: number) => {
    const skus = skuList.length > shown ? `${skuList.slice(0, shown).join(", ")}…` : skuList.join(", ");
    return `Dòng ${WATCH_BRAND} ${reference} (${lead.category.toLowerCase()}) với ${familyProducts.length} phiên bản: ${skus}. ${detail ? `${detail}. ` : ""}Giá từng mã tại ${BRAND}.`;
  };
  const description = [4, 3, 2].map(compose).find((candidate) => candidate.length <= META_DESCRIPTION_MAX) ?? compose(2);
  return pageMetadata({
    title: `Đồng hồ ${WATCH_BRAND} ${reference} chính hãng`,
    description,
    path: routes.family(familySlug),
    image: { url: lead.image, alt: lead.name },
  });
}

/** ItemList of the products a collection page shows, so Google reads the listing as a set. */
export function productListJsonLd(name: string, path: string, items: readonly Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: productModelName(product),
      url: absoluteUrl(routes.product(product.slug)),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Site-wide entities                                                  */
/* ------------------------------------------------------------------ */

export function breadcrumbJsonLd(trail: readonly { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  };
}

export function faqJsonLd(faqs: readonly (readonly [string, string])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** "Lê Nhi Luxury" → "Le Nhi Luxury": the spelling people type without diacritics. */
function asciiName(name: string) {
  return name.normalize("NFD").replace(/\p{M}/gu, "").replace("đ", "d").replace("Đ", "D");
}

/** "0382 669 211" → "+84382669211": schema.org expects the international form. */
function internationalPhone(label: string) {
  return `+84${label.replaceAll(" ", "").replace(/^0/, "")}`;
}

/** Organization + physical Store + WebSite, from siteConfig only. */
export function organizationJsonLd(store: Store) {
  const telephone = internationalPhone(siteConfig.contact.hotline.label);
  const reseller = siteConfig.reseller;
  const prices = products.map((product) => parsePrice(product.price)).filter((price) => price > 0);
  const vnd = new Intl.NumberFormat("vi-VN");
  const priceRange = prices.length ? `${vnd.format(Math.min(...prices))} – ${vnd.format(Math.max(...prices))} ₫` : undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: BRAND,
        alternateName: [reseller.displayName, asciiName(reseller.displayName), "lenhiluxury", "lenhiluxury.com"],
        url: siteConfig.url,
        logo: absoluteUrl("/icon.svg"),
        telephone,
        contactPoint: {
          "@type": "ContactPoint",
          telephone,
          contactType: "customer service",
          areaServed: "VN",
          availableLanguage: "vi",
        },
        sameAs: siteConfig.social.map((item) => item.href),
        brand: { "@type": "Brand", name: WATCH_BRAND, url: "https://alexanderferros.com" },
      },
      {
        "@type": "Store",
        "@id": STORE_ID,
        name: BRAND,
        alternateName: reseller.displayName,
        description: siteConfig.description,
        url: absoluteUrl(routes.store(store.slug)),
        image: absoluteUrl(DEFAULT_OG_IMAGE.url),
        telephone,
        priceRange,
        hasMap: store.mapUrl,
        geo: { "@type": "GeoCoordinates", latitude: store.geo.latitude, longitude: store.geo.longitude },
        parentOrganization: { "@id": ORGANIZATION_ID },
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
        "@id": WEBSITE_ID,
        name: BRAND,
        alternateName: [reseller.displayName, "lenhiluxury.com"],
        url: siteConfig.url,
        inLanguage: "vi",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Knowledge articles                                                  */
/* ------------------------------------------------------------------ */

export function articleJsonLd(article: { slug: string; title: string; excerpt: string; publishedAt: string; updatedAt?: string }) {
  const url = absoluteUrl(routes.article(article.slug));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: url,
    inLanguage: "vi",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}
