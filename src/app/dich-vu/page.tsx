import type { Metadata } from "next";
import { ServicesOverview } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = { title: "Dịch vụ" };

export default function ServicesPage() {
  return <ServicesOverview />;
}
