import { AutoplayVideo } from "@/components/media/AutoplayVideo";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { LineLink } from "@/components/ui/LineLink";
import { routes } from "@/config/site";

const heroes = [
  {
    primary: "ALEXANDER FERROS",
    secondary: "Swiss Brand Timepieces",
    description:
      "Trước khi đến tay khách hàng, mỗi chiếc Alexander Ferros đều trải qua quy trình kiểm định nghiêm ngặt bởi các chuyên gia tại Viện Đồng Hồ Trường Omega.",
    cta: { label: "Khám phá bộ sưu tập", href: routes.collections },
    video: "/alexander-ferros/videos/official-film.mp4",
  },
  {
    primary: "NGHỆ THUẬT",
    secondary: "chế tác hiếm có",
    description: "Kế thừa truyền thống Geneva, chúng tôi gìn giữ những kỹ thuật thủ công quý giá nhất.",
    cta: { label: "Xem tất cả sản phẩm", href: routes.catalogue },
    video: "/alexander-ferros/videos/atelier.mp4",
  },
] as const;

/** Two stacked full-viewport film heroes, as on the Audemars Piguet homepage. */
export function HeroStack() {
  return (
    <div>
      {heroes.map((hero, index) => (
        <section key={hero.video} className="relative h-svh min-h-[640px] md:min-h-[720px]" aria-label={hero.primary}>
          <div className="absolute inset-0 overflow-hidden">
            <AutoplayVideo src={hero.video} label={`${hero.primary} ${hero.secondary}`} />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgb(0_0_0/0.54)_0%,rgb(0_0_0/0.2)_38%,rgb(0_0_0/0.05)_72%),linear-gradient(0deg,rgb(0_0_0/0.3),transparent_45%)]"
            aria-hidden="true"
          />
          <div className="rail-left relative z-[2] flex h-full max-w-[calc(var(--rail)+460px)] flex-col justify-center pt-(--header-height)" data-reveal>
            <SectionHeading as={index === 0 ? "h1" : "h2"} primary={hero.primary} secondary={hero.secondary} />
            <p className="mt-10 max-w-[414px] text-[17px] leading-[1.35] font-light">{hero.description}</p>
            <LineLink href={hero.cta.href} className="mt-7">
              {hero.cta.label}
            </LineLink>
          </div>
        </section>
      ))}
    </div>
  );
}
