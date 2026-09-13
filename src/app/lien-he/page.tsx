import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = { title: "Liên hệ" };

export default function ContactRoute() {
  return <ContactPage />;
}
