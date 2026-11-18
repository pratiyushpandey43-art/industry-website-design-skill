import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { ArrowRight } from "@/components/icons";
import type { Media } from "@/lib/catalog";

const AUTOPLAY_DELAY = 4500;
const EMBLA_DURATION = 36;
const IMAGE_SIZES = "(max-width: 1023px) calc(100vw - 2.5rem), 50vw";

function responsiveSources(src: string) {
  const base = src.replace(/\.(jpg|webp)$/i, "");

  return {
    fallbackSrcSet: `${base}-1600.webp 1600w, ${base}-2400.webp 2400w`,
    webpSrcSet: `${base}-1600.webp 1600w, ${base}-2400.webp 2400w`,
  };
}

export function SofaHeroCarousel({ images, label }: { images: readonly Media[]; label: string }) {
  const [viewportRef, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: EMBLA_DURATION,
    loop: true,
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inViewRef = useRef(false);
  const hiddenRef = useRef(typeof document !== "undefined" ? document.hidden : false);
  const interactingRef = useRef(false);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const canAutoplay = useCallback(
    () =>
      Boolean(
        api && !reducedMotion && inViewRef.current && !hiddenRef.current && !interactingRef.current,
      ),
    [api, reducedMotion],
  );

  const scheduleAutoplay = useCallback(() => {
    clearAutoplay();
    if (!canAutoplay() || !api) return;

    autoplayRef.current = setTimeout(() => {
      if (!canAutoplay()) return;
      api.scrollNext(reducedMotion);
      scheduleAutoplay();
    }, AUTOPLAY_DELAY);
  }, [api, canAutoplay, clearAutoplay, reducedMotion]);

  const pauseInteraction = useCallback(() => {
    interactingRef.current = true;
    clearAutoplay();
  }, [clearAutoplay]);

  const resumeIfIdle = useCallback(() => {
    if (hoveredRef.current || focusedRef.current) return;
    interactingRef.current = false;
    scheduleAutoplay();
  }, [scheduleAutoplay]);

  useEffect(() => {
    if (!api) return;

    const updateSelected = () => setSelectedIndex(api.selectedScrollSnap());
    const updateSnaps = () => {
      setScrollSnaps(api.scrollSnapList());
      updateSelected();
    };

    updateSnaps();
    api.on("select", updateSelected);
    api.on("reInit", updateSnaps);

    return () => {
      api.off("select", updateSelected);
      api.off("reInit", updateSnaps);
    };
  }, [api]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(mediaQuery.matches);

    updateReducedMotion();
    mediaQuery.addEventListener?.("change", updateReducedMotion);
    return () => mediaQuery.removeEventListener?.("change", updateReducedMotion);
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      inViewRef.current = true;
      scheduleAutoplay();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        if (inViewRef.current) scheduleAutoplay();
        else clearAutoplay();
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [clearAutoplay, scheduleAutoplay]);

  useEffect(() => {
    const onVisibilityChange = () => {
      hiddenRef.current = document.hidden;
      if (document.hidden) clearAutoplay();
      else scheduleAutoplay();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [clearAutoplay, scheduleAutoplay]);

  useEffect(() => {
    scheduleAutoplay();
    return clearAutoplay;
  }, [clearAutoplay, scheduleAutoplay]);

  if (images.length === 0) return null;

  const scrollTo = (index: number) => {
    api?.scrollTo(index, reducedMotion);
  };

  return (
    <div
      ref={rootRef}
      className="relative min-w-0 rounded-[4px] focus:outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} photo carousel`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          pauseInteraction();
          api?.scrollPrev(reducedMotion);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          pauseInteraction();
          api?.scrollNext(reducedMotion);
        }
      }}
      onMouseEnter={() => {
        hoveredRef.current = true;
        pauseInteraction();
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        resumeIfIdle();
      }}
      onFocusCapture={() => {
        focusedRef.current = true;
        pauseInteraction();
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          focusedRef.current = false;
          resumeIfIdle();
        }
      }}
      onPointerDownCapture={pauseInteraction}
      onPointerUpCapture={resumeIfIdle}
    >
      <div ref={viewportRef} className="overflow-hidden rounded-[4px]">
        <div className="flex touch-pan-y will-change-transform">
          {images.map((image, index) => {
            const sources = responsiveSources(image.src);

            return (
              <div
                key={image.src}
                className="relative min-w-0 shrink-0 grow-0 basis-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${images.length}`}
              >
                <picture>
                  <source type="image/webp" srcSet={sources.webpSrcSet} sizes={IMAGE_SIZES} />
                  <img
                    src={image.src}
                    srcSet={sources.fallbackSrcSet}
                    sizes={IMAGE_SIZES}
                    alt={image.alt}
                    width={5712}
                    height={4284}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "low"}
                    draggable={false}
                    className="block aspect-[4/3] h-auto w-full select-none object-cover"
                  />
                </picture>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          pauseInteraction();
          api?.scrollPrev(reducedMotion);
        }}
        aria-label="Previous photo"
        className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-ink/70 text-white backdrop-blur-sm transition hover:bg-ink focus-visible:bg-ink sm:left-4"
      >
        <ArrowRight className="h-4 w-4 -rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => {
          pauseInteraction();
          api?.scrollNext(reducedMotion);
        }}
        aria-label="Next photo"
        className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-ink/70 text-white backdrop-blur-sm transition hover:bg-ink focus-visible:bg-ink sm:right-4"
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      <div
        className="absolute right-0 bottom-3 left-0 flex justify-center gap-2 sm:bottom-4"
        aria-label="Choose carousel photo"
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              pauseInteraction();
              scrollTo(index);
            }}
            aria-label={`Show photo ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            className={`h-2.5 w-2.5 rounded-full border transition ${
              selectedIndex === index
                ? "border-white bg-white"
                : "border-white/70 bg-ink/35 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

