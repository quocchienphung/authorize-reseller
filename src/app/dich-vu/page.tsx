import type { Metadata } from "next";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = pageMetadata({
  title: "Dịch vụ chính hãng Alexander Ferros",
  description: "Dịch vụ chính hãng tại LENHI Luxury: bảo hành Alexander Ferros, kiểm định tại Trường Omega, hỗ trợ kỹ thuật, câu hỏi thường gặp và đặt lịch trải nghiệm.",
  path: routes.services,
});

export default function ServicesRoute() {
  return <ServicesPage />;
}
