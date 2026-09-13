import Image from "next/image";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { PillLink } from "@/components/ui/PillLink";
import { routes } from "@/config/site";

const commitments = [
  { index: "01", title: "Kiểm định", copy: "100% sản phẩm trải qua quy trình kiểm tra và căn chỉnh tại Việt Nam bởi đội ngũ chuyên gia Trường Omega." },
  { index: "02", title: "Bảo hành", copy: "Bảo hành chính hãng toàn cầu, kèm chứng nhận và thẻ bảo hành chính thức — hỗ trợ cả lỗi do người dùng." },
  { index: "03", title: "Hỗ trợ", copy: "Hỗ trợ kỹ thuật toàn quốc qua hotline 1900 3222 và hệ thống showroom, đại lý ủy quyền." },
] as const;

export function WarrantyPage() {
  return (
    <PageShell solidHeader>
      <PageIntro
        eyebrow="Dịch vụ Alexander Ferros"
        primary="BẢO HÀNH"
        secondary="& hỗ trợ"
        description="Mỗi sản phẩm được kiểm tra và căn chỉnh trước khi đến tay khách hàng."
      />

      <section className="rail grid gap-10 pb-24 md:grid-cols-2 md:items-center md:gap-16" aria-label="Cam kết chất lượng">
        <div className="relative aspect-[4/3] overflow-hidden" data-reveal="media">
          <Image src="/alexander-ferros/editorial/quality-control.webp" alt="Kiểm định đồng hồ tại Trường Omega" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <ol className="m-0 grid list-none gap-10 p-0">
          {commitments.map((item, index) => (
            <li key={item.index} className="grid grid-cols-[48px_1fr] gap-4" data-reveal style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}>
              <span className="font-serif text-3xl italic text-fg/50">{item.index}</span>
              <div>
                <h2 className="m-0 text-xl font-light uppercase tracking-[0.04em]">{item.title}</h2>
                <p className="type-body mt-3 text-fg/70">{item.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rail border-t border-line py-24" aria-label="Cần hỗ trợ">
        <div className="grid gap-10 md:grid-cols-2 md:items-end" data-reveal>
          <SectionHeading primary="CẦN" secondary="hỗ trợ?" />
          <div className="flex flex-col items-start gap-6">
            <p className="type-body m-0 max-w-md text-fg/75">Đội ngũ chăm sóc khách hàng sẵn sàng tiếp nhận thông tin sản phẩm của bạn.</p>
            <PillLink href={routes.contact}>Liên hệ ngay</PillLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
