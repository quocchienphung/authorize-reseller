import type { Metadata } from "next";
import { CollectionsLanding } from "@/components/collections/CollectionsLanding";

export const metadata: Metadata = {
  title: "Bộ sưu tập",
  description: "Khám phá các bộ sưu tập đồng hồ nam và nữ Alexander Ferros.",
};

export default function CollectionsPage() {
  return <CollectionsLanding />;
}
