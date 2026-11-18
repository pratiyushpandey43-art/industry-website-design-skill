import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/icons";
import type { NavItem } from "@/lib/site";

type ProductPreview = {
  src: string;
  alt: string;
  reveal: "shimmer" | "wipe" | "panels" | "cabinet" | "soft";
};

const productPreviews: Record<string, ProductPreview> = {
  "/products/shower": {
    src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
    alt: "Actual cabinet showroom view at HI Liquidation",
    reveal: "shimmer",
  },
  "/products/flooring": {
    src: "https://hi-liquidation-website-development.vercel.app/media/client/flooring-01.webp",
    alt: "Flooring sample display at HI Liquidation",
    reveal: "wipe",
  },
  "/products/bathroom-kitchen": {
    src: "https://hi-liquidation-website-development.vercel.app/media/client/kitchen-cabinets-01.webp",
    alt: "Kitchen cabinet display at HI Liquidation",
    reveal: "panels",
  },
  "/products/lights-fans": {
    src: "https://hi-liquidation-website-development.vercel.app/media/client/appliances-03.webp",
    alt: "Fan and appliance display at HI Liquidation",
    reveal: "cabinet",
  },
  "/products/furniture": {
    src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
    alt: "Actual showroom floor at HI Liquidation",
    reveal: "soft",
  },
  "/products/doors": {
    src: "https://hi-liquidation-website-development.vercel.app/media/client/doors-05.webp",
    alt: "Door displays at HI Liquidation",
    reveal: "shimmer",
  },
  "/products/appliances": {
    src: "https://hi-liquidation-website-development.vercel.app/media/client/appliances-01.webp",
    alt: "Appliance display at HI Liquidation",
    reveal: "wipe",
  },
  "/products/home-essentials": {
    src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
    alt: "Actual showroom floor at HI Liquidation",
    reveal: "soft",
  },
};

const PREVIEW_MAX_WIDTH = 352;

type ProductCategoryMarqueeProps = {
  categories: NavItem[];
};

export function ProductCategoryMarquee({ categories }: ProductCategoryMarqueeProps) {
  const marqueeRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [previewHref, setPreviewHref] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewLeft, setPreviewLeft] = useState(0);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.05)),
      { threshold: [0, 0.05, 0.6] },
    );

    observer.observe(marquee);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updatePreviewPosition = () => {
      const marquee = marqueeRef.current;
      const anchor = anchorRef.current;
      if (!marquee || !anchor || !previewHref) return;

      const marqueeRect = marquee.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();
      const previewWidth = previewRef.current?.offsetWidth ?? PREVIEW_MAX_WIDTH;
      const maxLeft = Math.max(0, marqueeRect.width - previewWidth);
      const preferredLeft =
        anchorRect.left - marqueeRect.left + anchorRect.width / 2 - previewWidth / 2;
      const safeLeft = Math.min(maxLeft, marqueeRect.width * 0.42);

      setPreviewLeft(Math.max(safeLeft, Math.min(maxLeft, preferredLeft)));
    };

    updatePreviewPosition();
    window.addEventListener("resize", updatePreviewPosition);
    return () => window.removeEventListener("resize", updatePreviewPosition);
  }, [previewHref, previewVisible]);

  function showPreview(href: string, anchor: HTMLElement) {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    anchorRef.current = anchor;
    setActiveHref(href);
    setPreviewHref(href);
    setPreviewVisible(true);
  }

  function hidePreview() {
    setActiveHref(null);
    setPreviewVisible(false);

    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = window.setTimeout(() => {
      setPreviewHref(null);
      hideTimeoutRef.current = null;
    }, 550);
  }

  const activePreview = previewHref ? productPreviews[previewHref] : null;
  const marqueeClassName = [
    "category-marquee",
    activeHref ? "category-marquee--has-active" : "",
    !isInView ? "category-marquee--out-of-view" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav ref={marqueeRef} aria-label="Product categories" className={marqueeClassName}>
      <div
        ref={previewRef}
        className={`category-marquee__preview ${previewVisible ? "is-visible" : ""}`}
        style={{ left: `${previewLeft}px` }}
        aria-hidden="true"
      >
        {activePreview ? (
          <div
            key={previewHref}
            className={`category-marquee__preview-frame category-marquee__preview-frame--${activePreview.reveal}`}
          >
            <img
              src={activePreview.src}
              alt={activePreview.alt}
              className="category-marquee__preview-image"
            />
          </div>
        ) : null}
      </div>

      <div className="category-marquee__viewport">
        <div className="category-marquee__track">
          {[false, true].map((isDuplicate) => (
            <ul
              key={isDuplicate ? "duplicate" : "primary"}
              className="category-marquee__group"
              aria-hidden={isDuplicate || undefined}
            >
              {categories.map((category, index) => {
                const isActive = activeHref === category.href;

                return (
                  <li
                    key={`${isDuplicate ? "duplicate-" : ""}${category.href}`}
                    className="category-marquee__item"
                  >
                    <a
                      href={category.href}
                      tabIndex={isDuplicate ? -1 : undefined}
                      className={`category-marquee__link ${isActive ? "is-active" : ""}`}
                      onMouseEnter={(event) => showPreview(category.href, event.currentTarget)}
                      onMouseLeave={hidePreview}
                      onFocus={(event) => showPreview(category.href, event.currentTarget)}
                      onBlur={hidePreview}
                    >
                      <span className="category-marquee__number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="category-marquee__name">
                        {category.shortLabel ?? category.label}
                      </span>
                      <ArrowUpRight className="category-marquee__arrow" />
                      <span className="category-marquee__divider" aria-hidden="true">
                        ◆
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </nav>
  );
}
