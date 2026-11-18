import { useCallback, useEffect, useRef, useState } from "react";
import { Close, ChevronRight } from "@/components/icons";
import { galleryFilters, galleryItems, type GalleryFilter, type GalleryItem } from "@/lib/catalog";

export function GalleryGrid({
  initialFilter = "All",
  items: providedItems,
}: {
  initialFilter?: GalleryFilter;
  items?: GalleryItem[];
}) {
  const [filter, setFilter] = useState<GalleryFilter>(initialFilter);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const sourceItems = providedItems ?? galleryItems;
  const filterOptions = providedItems ? (["All"] as GalleryFilter[]) : galleryFilters;
  const items = filter === "All" ? sourceItems : sourceItems.filter((item) => item.tag === filter);
  const activeItem = openIndex === null ? null : items[openIndex];

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        setOpenIndex((current) => (current === null ? 0 : (current + 1) % items.length));
      } else if (event.key === "ArrowLeft") {
        setOpenIndex((current) =>
          current === null ? 0 : (current - 1 + items.length) % items.length,
        );
      } else if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]');
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (first && event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (last && !event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, items.length, close]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
          role="group"
          aria-label="Filter gallery by category"
        >
          {filterOptions.map((option) => {
            const active = filter === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(option);
                  setOpenIndex(null);
                }}
                className={`min-h-[40px] whitespace-nowrap rounded-sm border px-3.5 text-[0.6875rem] font-bold tracking-[0.12em] uppercase transition ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-charcoal hover:border-ink hover:text-ink"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="rule-label whitespace-nowrap">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li
            key={`${item.src}-${index}`}
            className={
              item.orientation !== "portrait" && index % 5 === 0
                ? "sm:col-span-2 lg:col-span-2"
                : ""
            }
          >
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setOpenIndex(index);
              }}
              className="group relative block w-full overflow-hidden rounded-[4px] bg-ink text-left shadow-card focus-visible:outline-offset-4"
              aria-label={`View larger: ${item.caption}`}
            >
              <div
                className={`media-zoom relative ${
                  item.orientation === "portrait"
                    ? "aspect-[3/4]"
                    : index % 5 === 0
                      ? "aspect-[16/10]"
                      : "aspect-[4/3]"
                }`}
              >
                {item.kind === "video" ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    muted
                    playsInline
                    preload="none"
                    aria-label={item.alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    decoding="async"
                    loading="lazy"
                    className="object-cover"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition group-hover:opacity-95"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <div>
                    <p className="text-[0.5625rem] font-bold tracking-[0.18em] text-white/70 uppercase">
                      {item.tag}
                    </p>
                    <p className="mt-1 font-display text-[0.9375rem] font-bold text-white">
                      {item.caption}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-white/40 text-white transition group-hover:border-accent group-hover:bg-accent">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {activeItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery ${activeItem.kind === "video" ? "video" : "image"}: ${activeItem.caption}`}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between gap-4 text-white">
            <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase">
              {activeItem.tag} · {(openIndex ?? 0) + 1} / {items.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="grid h-11 w-11 place-items-center rounded-sm border border-white/30 text-white transition hover:border-white hover:bg-white/10"
            >
              <Close />
              <span className="sr-only">Close gallery image</span>
            </button>
          </div>
          <div className="relative mt-4 flex-1">
            {activeItem.kind === "video" ? (
              <video
                key={activeItem.src}
                src={activeItem.src}
                poster={activeItem.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={activeItem.alt}
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                decoding="async"
                className="object-contain"
              />
            )}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 text-white">
            <p className="max-w-xl text-[0.875rem] text-white/70">{activeItem.caption}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setOpenIndex((current) =>
                    current === null ? 0 : (current - 1 + items.length) % items.length,
                  )
                }
                className="grid h-11 w-11 place-items-center rounded-sm border border-white/30 text-white transition hover:border-white hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                <span className="sr-only">Previous image</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setOpenIndex((current) => (current === null ? 0 : (current + 1) % items.length))
                }
                className="grid h-11 w-11 place-items-center rounded-sm border border-white/30 text-white transition hover:border-white hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
