import type { Metadata } from "next";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = pageMetadata({
  title: "Đặt lịch trải nghiệm đồng hồ Alexander Ferros",
  description: "Đặt lịch trải nghiệm trực tiếp đồng hồ Alexander Ferros tại showroom LENHI Luxury, TP Hồ Chí Minh. Tư vấn chọn mẫu, thử size và xem sản phẩm thực tế.",
  path: routes.appointment,
});

export default function AppointmentRoute() {
  return <ContactPage appointment />;
}
