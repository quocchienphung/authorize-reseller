import type { Metadata } from "next";
import { FaqPage, faqs } from "@/components/pages/FaqPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Câu hỏi thường gặp về đồng hồ Alexander Ferros",
  description: "Giải đáp nhanh về đồng hồ Alexander Ferros tại LENHI Luxury: cách chọn mẫu, bảo hành chính hãng, bộ máy Miyota, giá theo từng phiên bản và showroom trải nghiệm.",
  path: routes.faq,
});

export default function FaqRoute() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <FaqPage />
    </>
  );
}
