import { AutoplayVideo } from "@/components/media/AutoplayVideo";
import { VideoWall, type WallFilm } from "@/components/media/VideoWall";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { LineLink } from "@/components/ui/LineLink";
import { routes } from "@/config/site";

const hero = {
  headline: "Đồng hồ Alexander Ferros chính hãng tại LENHI Luxury",
  primary: "ALEXANDER FERROS",
  secondary: "Swiss Brand Timepieces",
  description:
    "Trước khi đến tay khách hàng, mỗi chiếc Alexander Ferros đều trải qua quy trình kiểm định nghiêm ngặt bởi các chuyên gia tại Viện Đồng Hồ Trường Omega.",
  cta: { label: "Khám phá bộ sưu tập", href: routes.collections },
  // Opening dial close-up (first 3.15s) of the official film; the full cut is kept outside the repo.
  video: "/alexander-ferros/videos/official-film-intro.mp4",
  poster: "/alexander-ferros/videos/official-film-intro-poster.jpg",
} as const;

const craft = {
  primary: "NGHỆ THUẬT",
  secondary: "chế tác hiếm có",
  description: "Kế thừa truyền thống Geneva, chúng tôi gìn giữ những kỹ thuật thủ công quý giá nhất.",
  cta: { label: "Xem tất cả sản phẩm", href: routes.catalogue },
} as const;

/** Four portrait atelier films, left → right. */
const craftFilms: readonly WallFilm[] = [1, 2, 3, 4].map((n) => ({
  src: `/alexander-ferros/videos/atelier-${n}.mp4`,
  poster: `/alexander-ferros/videos/atelier-${n}-poster.jpg`,
  label: `Xưởng chế tác Alexander Ferros – phim ${n}`,
}));

/**
 * Homepage opener: a full-viewport film hero, then the atelier video wall
 * (four uncropped portrait films with the copy set to the right on desktop).
 */
export function HeroStack() {
  return (
    <div>
      {/* LCP candidate: the hero poster. Rendered as a real <link> so it is in the first HTML bytes, not applied after hydration. */}
      <link rel="preload" as="image" href={hero.poster} fetchPriority="high" />
      <section className="relative h-svh min-h-[640px] md:min-h-[720px]" aria-label={hero.primary}>
        <div className="absolute inset-0 overflow-hidden">
          <AutoplayVideo src={hero.video} poster={hero.poster} label={`${hero.primary} ${hero.secondary}`} showControl={false} />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgb(0_0_0/0.54)_0%,rgb(0_0_0/0.2)_38%,rgb(0_0_0/0.05)_72%),linear-gradient(0deg,rgb(0_0_0/0.3),transparent_45%)]"
          aria-hidden="true"
        />
        <div className="rail-left relative z-[2] flex h-full max-w-[calc(var(--rail)+460px)] flex-col justify-center pt-(--header-height) text-paper" data-reveal>
          {/* The page's single H1: a real, visible line in the eyebrow register; the wordmark below stays the visual lead. */}
          <h1 className="type-eyebrow m-0 mb-5 text-paper/80 md:whitespace-nowrap">{hero.headline}</h1>
          <SectionHeading as="p" primary={hero.primary} secondary={hero.secondary} />
          <p className="mt-10 max-w-[414px] text-[17px] leading-[1.35] font-light">{hero.description}</p>
          <LineLink href={hero.cta.href} className="mt-7">
            {hero.cta.label}
          </LineLink>
        </div>
      </section>

      <section className="relative" aria-label={craft.primary}>
        <VideoWall films={craftFilms} />
        {/* Shade only where the copy sits: the foot of the rail on mobile, the right side on desktop. Never intercepts swipes. */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,rgb(0_0_0/0.78)_0%,rgb(0_0_0/0.5)_42%,transparent_78%)] md:bg-[linear-gradient(270deg,rgb(0_0_0/0.6)_0%,rgb(0_0_0/0.24)_38%,rgb(0_0_0/0.05)_72%),linear-gradient(0deg,rgb(0_0_0/0.3),transparent_45%)]"
          aria-hidden="true"
        />
        <div
          className="rail pointer-events-none absolute inset-0 z-[2] flex flex-col justify-end pb-16 text-paper md:items-end md:justify-center md:pb-0"
          data-reveal
        >
          <div className="flex max-w-[460px] flex-col">
            <SectionHeading as="h2" primary={craft.primary} secondary={craft.secondary} />
            <p className="mt-10 max-w-[414px] text-[17px] leading-[1.35] font-light">{craft.description}</p>
            <LineLink href={craft.cta.href} className="pointer-events-auto mt-7">
              {craft.cta.label}
            </LineLink>
          </div>
        </div>
      </section>
    </div>
  );
}
