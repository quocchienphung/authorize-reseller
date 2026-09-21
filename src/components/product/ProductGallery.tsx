"use client";

import Image from "next/image";
import { useReducer } from "react";
import { cn } from "@/lib/utils";

type GalleryState = {
  active: number;
  /** Frame currently visible; lags behind `active` until that frame has loaded. */
  shown: number;
  mounted: number[];
  loaded: number[];
};

type GalleryAction = { type: "select"; index: number } | { type: "loaded"; index: number };

const initialState: GalleryState = { active: 0, shown: 0, mounted: [0], loaded: [0] };

function withIndex(list: number[], index: number) {
  return list.includes(index) ? list : [...list, index];
}

function reduce(state: GalleryState, action: GalleryAction): GalleryState {
  if (action.type === "select") {
    return {
      ...state,
      active: action.index,
      mounted: withIndex(state.mounted, action.index),
      shown: state.loaded.includes(action.index) ? action.index : state.shown,
    };
  }
  return {
    ...state,
    loaded: withIndex(state.loaded, action.index),
    shown: state.active === action.index ? action.index : state.shown,
  };
}

type ProductGalleryProps = {
  /** Hero product shot (transparent render), always the first frame. */
  hero: string;
  /** Official photography for the same variant. */
  photos: string[];
  name: string;
};

/**
 * Hero image plus a thumbnail strip. Frames mount on first selection and
 * crossfade once loaded, so unselected photography is never downloaded.
 * On desktop the wrapper dissolves (`lg:contents`) so the strip sits in its
 * own grid row and the product copy stays centred on the hero image alone.
 */
export function ProductGallery({ hero, photos, name }: ProductGalleryProps) {
  const frames = [
    { src: hero, alt: name, isHero: true },
    ...photos.map((src, index) => ({
      src,
      alt: `${name} – ảnh thực tế ${index + 1}/${photos.length}`,
      isHero: false,
    })),
  ];
  const [{ active, shown, mounted }, dispatch] = useReducer(reduce, initialState);

  return (
    <div className="flex min-w-0 flex-col gap-4 lg:contents">
      <div
        className="relative aspect-square overflow-hidden border border-line bg-tile lg:col-start-2 lg:row-start-1 lg:aspect-[5/4]"
        data-reveal="media"
      >
        {frames.map((frame, index) =>
          mounted.includes(index) ? (
            <Image
              key={`${index}-${frame.src}`}
              src={frame.src}
              alt={frame.alt}
              fill
              priority={index === 0}
              quality={90}
              sizes="(min-width: 1024px) 60vw, 100vw"
              onLoad={() => dispatch({ type: "loaded", index })}
              className={cn(
                "object-contain transition-opacity duration-200 ease-out motion-reduce:transition-none",
                frame.isHero && "p-[8%]",
                shown === index ? "opacity-100" : "opacity-0",
              )}
            />
          ) : null,
        )}
      </div>

      {frames.length > 1 ? (
        <div
          role="group"
          aria-label="Thư viện ảnh sản phẩm"
          className="scrollbar-none flex min-w-0 snap-x snap-proximity gap-3 overflow-x-auto lg:col-start-2 lg:row-start-2"
          data-reveal="fade"
        >
          {frames.map((frame, index) => (
            <button
              key={`${index}-${frame.src}`}
              type="button"
              onClick={() => dispatch({ type: "select", index })}
              aria-label={`Xem ảnh ${index + 1}/${frames.length}`}
              aria-current={active === index ? "true" : undefined}
              className={cn(
                "relative aspect-square w-24 shrink-0 snap-start overflow-hidden rounded-lg border bg-tile transition-colors md:w-[136px]",
                active === index ? "border-bronze/60" : "border-line hover:border-fg/40",
              )}
            >
              <Image
                src={frame.src}
                alt=""
                fill
                quality={75}
                sizes="(min-width: 768px) 136px, 96px"
                className={frame.isHero ? "object-contain p-[12%]" : "object-cover"}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
