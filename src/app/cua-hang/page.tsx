import type { Metadata } from "next";
import { StoresPage } from "@/components/pages/StoresPage";

export const metadata: Metadata = { title: "Hệ thống showroom" };

export default function StoresRoute() {
  return <StoresPage />;
}
