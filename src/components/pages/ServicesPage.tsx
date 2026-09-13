import Image from "next/image";
import Link from "next/link";
import { BrandStory, brandChapters } from "@/components/home/BrandStory";
import { PageShell } from "@/components/layout/PageShell";
import { AutoplayVideo } from "@/components/media/AutoplayVideo";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { LineLink } from "@/components/ui/LineLink";
import { routes } from "@/config/site";
import { mensProducts, products, womensProducts } from "@/lib/products";

const services = [
  { title: "Tìm đồng hồ", copy: `Duyệt và lọc toàn bộ ${products.length} phiên bản để tìm mẫu phù hợp.`, href: routes.catalogue, image: mensProducts[0].image },
  { title: "Đặt lịch tư vấn", copy: "Chọn thời gian để trải nghiệm sản phẩm trực tiếp cùng chuyên viên.", href: routes.appointment, image: womensProducts[0].image },
  { title: "Bảo hành", copy: "Thông tin kiểm định, bảo hành và hỗ trợ kỹ thuật cho sản phẩm.", href: routes.warranty, image: mensProducts[Math.floor(mensProducts.length / 2)].image },
  { title: "Showroom", copy: "Tìm địa chỉ showroom và thông tin liên hệ chính thức.", href: routes.stores, image: womensProducts[Math.floor(womensProducts.length / 2)].image },
] as const;

export function ServicesPage() {
  return (
    <PageShell>
      <section className="relative h-[70svh] min-h-[520px]" aria-label="Dịch vụ chính hãng">
        <div className="absolute inset-0 overflow-hidden">
          <AutoplayVideo src="/alexander-ferros/videos/atelier.mp4" label="Dịch vụ Alexander Ferros" showControl={false} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.65),rgb(0_0_0/0.15)_60%)]" aria-hidden="true" />
        <div className="rail relative z-[1] flex h-full flex-col justify-end pb-16" data-reveal>
          <SectionHeading as="h1" primary="DỊCH VỤ" secondary="chính hãng" />
          <p className="type-body mt-6 max-w-lg text-paper/85">Hỗ trợ sản phẩm trước, trong và sau khi mua.</p>
        </div>
      </section>

      <section className="rail py-24 md:py-28" aria-label="Dịch vụ dành cho bạn">
        <SectionHeading primary="DỊCH VỤ" secondary="dành cho bạn" className="mb-14" />
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <article key={service.href} className="group/service flex flex-col" data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}>
              <Link href={service.href} className="relative block aspect-[4/5] overflow-hidden bg-linen" aria-label={service.title}>
                <Image src={service.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" quality={90} className="object-contain p-[12%] transition-transform duration-700 ease-out-soft group-hover/service:scale-[1.06]" />
              </Link>
              <h2 className="mt-6 text-xl font-light uppercase tracking-[0.04em]">{service.title}</h2>
              <p className="type-body mt-3 text-paper/70">{service.copy}</p>
              <LineLink href={service.href} className="mt-5">
                Xem chi tiết
              </LineLink>
            </article>
          ))}
        </div>
      </section>

      <BrandStory chapter={brandChapters.quality} reverse />
    </PageShell>
  );
}
