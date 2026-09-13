import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = { title: "Dịch vụ" };

export default function ServicesRoute() {
  return <ServicesPage />;
}
