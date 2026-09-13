/**
 * Single source of truth for brand identity, contact details and navigation.
 * Components import from here instead of hard-coding copy.
 */

export const siteConfig = {
  name: "Alexander Ferros",
  tagline: "Đồng hồ chính hãng",
  description: "Khám phá bộ sưu tập đồng hồ Alexander Ferros chính hãng dành cho nam và nữ.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "vi",
  contact: {
    hotline: { label: "1900 3222", href: "tel:19003222" },
    whatsapp: { label: "0813 880 666", href: "tel:0813880666" },
    email: { label: "sales@alexanderferros.com", href: "mailto:sales@alexanderferros.com" },
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/alexander.ferros" },
    { label: "TikTok", href: "https://www.tiktok.com/@alexander.ferros" },
    { label: "YouTube", href: "https://www.youtube.com/@AlexanderFerros" },
    { label: "Facebook", href: "https://www.facebook.com/alexanderferrosofficial" },
  ],
} as const;

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
      { label: `Hotline ${siteConfig.contact.hotline.label}`, href: siteConfig.contact.hotline.href },
      { label: siteConfig.contact.email.label, href: siteConfig.contact.email.href },
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
};

export const stores: readonly Store[] = [
  {
    slug: "le-thanh-tong",
    name: "Showroom 6A Lê Thánh Tông",
    address: "6A Lê Thánh Tông",
    district: "Hoàn Kiếm",
    city: "Hà Nội",
    hours: "09:00 – 21:00, Thứ Hai – Chủ Nhật",
  },
  {
    slug: "kim-ma",
    name: "Showroom 247 Kim Mã",
    address: "247 Kim Mã",
    district: "Ba Đình",
    city: "Hà Nội",
    hours: "09:00 – 21:00, Thứ Hai – Chủ Nhật",
  },
];

export function getStore(slug: string) {
  return stores.find((store) => store.slug === slug);
}
