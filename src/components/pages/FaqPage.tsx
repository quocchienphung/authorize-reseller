import { PageIntro } from "@/components/layout/PageIntro";
import { PageShell } from "@/components/layout/PageShell";
import { storeAddress, stores } from "@/config/site";

const faqs = [
  ["Làm thế nào để chọn đúng sản phẩm?", "Bạn có thể lọc theo đồng hồ nam, nữ, tìm bằng mã sản phẩm hoặc đặt lịch để được tư vấn trực tiếp tại showroom."],
  ["Sản phẩm có được bảo hành không?", "Có. Mọi sản phẩm được bảo hành chính hãng theo chính sách của Alexander Ferros, kèm chứng nhận kiểm định từ Trường Omega."],
  ["Tôi có thể xem sản phẩm trực tiếp ở đâu?", `Bạn có thể trải nghiệm tại showroom ${storeAddress(stores[0])}.`],
  ["Giá trên website có theo từng phiên bản không?", "Có. Mỗi mã sản phẩm có tên gọi và mức giá riêng, được cập nhật theo catalog chính thức."],
  ["Đồng hồ sử dụng bộ máy gì?", "Bộ sưu tập sử dụng máy cơ Miyota (8215, 9015, 9120) hoặc máy pin Miyota / VJ series của Nhật Bản, tùy từng phiên bản."],
] as const;

export function FaqPage() {
  return (
    <PageShell solidHeader>
      <PageIntro eyebrow="Dịch vụ" primary="CÂU HỎI" secondary="thường gặp" description="Thông tin nhanh về sản phẩm, giá, showroom và bảo hành." />
      <section className="rail pb-28" aria-label="Danh sách câu hỏi">
        <div className="max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map(([question, answer], index) => (
            <details key={question} className="group/faq" data-reveal style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-light [&::-webkit-details-marker]:hidden">
                {question}
                <span aria-hidden="true" className="relative size-4 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform group-open/faq:after:scale-y-0" />
              </summary>
              <p className="type-body m-0 max-w-2xl pb-6 text-fg/70">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
