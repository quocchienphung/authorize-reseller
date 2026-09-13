import { PageShell } from "@/components/layout/PageShell";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./ContactForm";

type ContactPageProps = {
  /** Appointment variant adds a preferred-date field and different copy. */
  appointment?: boolean;
};

export function ContactPage({ appointment = false }: ContactPageProps) {
  return (
    <PageShell solidHeader>
      <section className="rail grid gap-14 pt-16 pb-28 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24 lg:pt-24" aria-label={appointment ? "Đặt lịch" : "Liên hệ"}>
        <div className="flex flex-col" data-reveal>
          <Eyebrow>{siteConfig.name}</Eyebrow>
          <SectionHeading
            as="h1"
            primary={appointment ? "ĐẶT LỊCH" : "LIÊN HỆ"}
            secondary={appointment ? "trải nghiệm" : "với chúng tôi"}
            className="mt-5"
          />
          <p className="type-body mt-6 text-paper/75">
            {appointment
              ? "Chọn thời gian phù hợp để được tư vấn trực tiếp tại showroom."
              : "Gửi câu hỏi về sản phẩm, bảo hành hoặc hệ thống đại lý."}
          </p>
          <div className="mt-10 flex flex-col gap-3 text-base font-light">
            <a href={siteConfig.contact.hotline.href} className="hover:opacity-60">
              Hotline {siteConfig.contact.hotline.label}
            </a>
            <a href={siteConfig.contact.whatsapp.href} className="hover:opacity-60">
              WhatsApp {siteConfig.contact.whatsapp.label}
            </a>
            <a href={siteConfig.contact.email.href} className="hover:opacity-60">
              {siteConfig.contact.email.label}
            </a>
          </div>
        </div>
        <div data-reveal="fade">
          <ContactForm appointment={appointment} />
        </div>
      </section>
    </PageShell>
  );
}
