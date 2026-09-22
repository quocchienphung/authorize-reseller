import { routes, siteConfig, storeAddress, stores } from "@/config/site";
import { articleRoute, articles } from "@/lib/articles";
import { familyDisplayName } from "@/lib/product-helpers";
import { mensProducts, productFamilies, womensProducts } from "@/lib/products";
import { absoluteUrl, BRAND, WATCH_BRAND } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt — a short, factual map of the site for AI assistants that read
 * it (Google states it neither helps nor hurts Search; kept because it costs
 * nothing and other systems may use it). Generated from the same data as
 * the pages, so it never drifts from what visitors see.
 */
export function GET() {
  const store = stores[0];
  const { certificate } = siteConfig.reseller;
  const lines = [
    `# ${BRAND}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${BRAND} (${siteConfig.reseller.displayName}) là đại lý phân phối chính hãng đồng hồ ${WATCH_BRAND} tại Việt Nam, được ${certificate.issuer} — ${certificate.issuerRole} — chứng nhận đến ${certificate.validUntil}. Showroom: ${storeAddress(store)} (${store.hours}). Hotline: ${siteConfig.contact.hotline.label}.`,
    "",
    "## Bộ sưu tập",
    "",
    `- [Đồng hồ nam](${absoluteUrl(routes.mens)}): ${mensProducts.length} phiên bản ${WATCH_BRAND} nam`,
    `- [Đồng hồ nữ](${absoluteUrl(routes.womens)}): ${womensProducts.length} phiên bản ${WATCH_BRAND} nữ`,
    `- [Tất cả sản phẩm](${absoluteUrl(routes.catalogue)}): toàn bộ catalog với giá niêm yết`,
    `- [Bảng giá](${absoluteUrl(routes.pricing)}): giá theo từng mã sản phẩm`,
    "",
    "## Dòng sản phẩm",
    "",
    ...productFamilies.map((family) => `- [${familyDisplayName(family)}](${absoluteUrl(routes.family(family))})`),
    "",
    "## Dịch vụ & liên hệ",
    "",
    `- [Bảo hành & hỗ trợ](${absoluteUrl(routes.warranty)}): kiểm định tại Trường Omega, thẻ bảo hành chính hãng`,
    `- [Câu hỏi thường gặp](${absoluteUrl(routes.faq)})`,
    `- [Showroom](${absoluteUrl(routes.store(store.slug))}): ${storeAddress(store)}`,
    `- [Đặt lịch trải nghiệm](${absoluteUrl(routes.appointment)})`,
    `- [Liên hệ](${absoluteUrl(routes.contact)})`,
    ...(articles.length
      ? ["", "## Kiến thức", "", ...articles.map((article) => `- [${article.title}](${absoluteUrl(articleRoute(article))}): ${article.excerpt}`)]
      : []),
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
