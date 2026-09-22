import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";

type CoverPictureProps = {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  /** Above-the-fold covers: eager + fetchpriority=high so the LCP image starts first. */
  priority?: boolean;
  className?: string;
};

const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Art-directed full-bleed cover: one `<picture>` that lets the browser pick
 * the portrait or landscape file, so a phone never downloads the desktop
 * image (and vice versa) the way two CSS-toggled `<Image>`s would. Sizing and
 * optimisation still come from next/image via `getImageProps`.
 */
export function CoverPicture({ desktopSrc, mobileSrc, alt, priority = false, className }: CoverPictureProps) {
  const common = { alt, fill: true, sizes: "100vw", quality: 90, preload: priority, fetchPriority: priority ? "high" : undefined } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktopSrc });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: mobileSrc });

  return (
    <picture>
      <source media={DESKTOP_QUERY} srcSet={desktopSrcSet} sizes="100vw" />
      <img {...img} srcSet={mobileSrcSet} alt={alt} className={cn("object-cover", className)} />
    </picture>
  );
}
