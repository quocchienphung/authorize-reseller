/**
 * Single source of truth for brand identity, contact details and navigation.
 * Components import from here instead of hard-coding copy.
 */

export const siteConfig = {
  name: "Alexander Ferros",
  tagline: "Đồng hồ chính hãng",
  /** Wordmark shown under the emblem on the opening splash screen. */
  splashWordmark: "Authorize Reseller",
  description: "Khám phá bộ sưu tập đồng hồ Alexander Ferros chính hãng dành cho nam và nữ.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "vi",
  contact: {
    hotline: { label: "0382 669 211", href: "tel:0382669211" },
    zalo: { label: "Zalo", href: "https://zalo.me/0382669211" },
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/lenhiluxury" },
    { label: "TikTok", href: "https://www.tiktok.com/@lenhiiiiiiiii" },
    { label: "Facebook", href: "https://www.facebook.com/share/1C7PwahaGD/" },
  ],
} as const;

/** localStorage key holding the visitor's explicit light / dark choice. */
export const THEME_STORAGE_KEY = "af-theme";

export const routes = {
  home: "/",
  collections: "/bo-suu-tap",
  mens: "/bo-suu-tap/nam",
  womens: "/bo-suu-tap/nu",
  family: (familySlug: string) => `/bo-suu-tap/${familySlug}`,
  catalogue: "/san-pham",
  product: (slug: string) => `/san-pham/${slug}`,
  latest: "/san-pham-moi",
  pricing: "/bang-gia",
  services: "/dich-vu",
  warranty: "/dich-vu/bao-hanh",
  faq: "/dich-vu/faq",
  appointment: "/dat-lich",
  stores: "/cua-hang",
  store: (slug: string) => `/cua-hang/${slug}`,
  contact: "/lien-he",
} as const;

export type NavLink = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; links: readonly NavLink[] };

export const navigation: readonly NavGroup[] = [
  {
    label: "Bộ sưu tập",
    links: [
      { label: "Bộ sưu tập", href: routes.collections },
      { label: "Tất cả sản phẩm", href: routes.catalogue },
      { label: "Sản phẩm mới", href: routes.latest },
      { label: "Đồng hồ nam", href: routes.mens },
      { label: "Đồng hồ nữ", href: routes.womens },
      { label: "Bảng giá", href: routes.pricing },
    ],
  },
  {
    label: "Dịch vụ",
    links: [
      { label: "Tất cả dịch vụ", href: routes.services },
      { label: "Bảo hành & hỗ trợ", href: routes.warranty },
      { label: "Câu hỏi thường gặp", href: routes.faq },
      { label: "Đặt lịch trải nghiệm", href: routes.appointment },
      { label: "Hệ thống showroom", href: routes.stores },
    ],
  },
  {
    label: "Liên hệ",
    links: [
      { label: "Liên hệ chúng tôi", href: routes.contact },
      { label: siteConfig.contact.hotline.label, href: siteConfig.contact.hotline.href },
      { label: siteConfig.contact.zalo.label, href: siteConfig.contact.zalo.href, external: true },
      { label: "Instagram", href: siteConfig.social[0].href, external: true },
    ],
  },
];

export type Store = {
  slug: string;
  name: string;
  address: string;
  district: string;
  city: string;
  hours: string;
  /** Google Maps place page, opened in a new tab for directions. */
  mapUrl: string;
};

export const stores: readonly Store[] = [
  {
    slug: "van-tien-dung",
    name: "Showroom 1247 Văn Tiến Dũng",
    address: "1247 Văn Tiến Dũng",
    district: "Bình Hưng",
    city: "Hồ Chí Minh",
    hours: "09:00 – 21:00, Thứ Hai – Chủ Nhật",
    mapUrl:
      "https://www.google.com/maps/place/L%C3%AA+Nhi+Luxury/@10.7100719,106.6531793,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f00373c54df:0x92acb7b3c42a02f!8m2!3d10.7100719!4d106.6557542!16s%2Fg%2F11nq_1vtdc?entry=ttu",
  },
];

/** Full postal address for the store, as printed on the site. */
export function storeAddress(store: Store) {
  return `${store.address}, ${store.district}, ${store.city}`;
}

export function getStore(slug: string) {
  return stores.find((store) => store.slug === slug);
}
