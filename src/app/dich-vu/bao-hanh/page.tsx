import type { Metadata } from "next";
import { WarrantyPage } from "@/components/pages/WarrantyPage";

export const metadata: Metadata = { title: "Bảo hành & hỗ trợ" };

export default function WarrantyRoute() {
  return <WarrantyPage />;
}
