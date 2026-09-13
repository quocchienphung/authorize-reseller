import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { PillLink } from "@/components/ui/PillLink";
import { routes } from "@/config/site";

export default function NotFound() {
  return (
    <PageShell solidHeader>
      <section className="rail flex min-h-[60svh] flex-col justify-center py-24">
        <SectionHeading as="h1" primary="KHÔNG TÌM THẤY" secondary="trang bạn cần" />
        <p className="type-body mt-6 max-w-md text-fg/75">Liên kết có thể đã thay đổi. Hãy quay lại bộ sưu tập để tiếp tục khám phá.</p>
        <div className="mt-10">
          <PillLink href={routes.collections}>Về bộ sưu tập</PillLink>
        </div>
      </section>
    </PageShell>
  );
}
