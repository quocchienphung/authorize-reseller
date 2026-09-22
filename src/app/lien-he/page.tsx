import type { Metadata } from "next";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = pageMetadata({
  title: "Liên hệ đại lý Alexander Ferros chính hãng",
  description: "Liên hệ LENHI Luxury — đại lý phân phối chính hãng Alexander Ferros: hotline 0382 669 211, Zalo, showroom 1247 Văn Tiến Dũng, TP Hồ Chí Minh.",
  path: routes.contact,
});

export default function ContactRoute() {
  return <ContactPage />;
}
