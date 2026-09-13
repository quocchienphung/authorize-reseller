import type { Metadata } from "next";
import { ContactPage } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = { title: "Đặt lịch trải nghiệm" };

export default function AppointmentPage() {
  return <ContactPage appointment />;
}
