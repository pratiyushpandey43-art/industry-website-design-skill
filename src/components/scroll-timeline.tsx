import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, MapPin, Phone } from "@/components/icons";
import { site } from "@/lib/site";

const steps = [
  {
    number: "01",
    eyebrow: "Browse the categories",
    title: "Explore Our Products",
    copy: "Browse the eight product categories and open the gallery sections that match what you are looking for.",
    image: {
      src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-cabinets.webp",
      alt: "Cabinet displays inside the HI Liquidation showroom",
    },
    action: { label: "Explore Products", href: "/products", external: false },
  },
  {
    number: "02",
    eyebrow: "Visit the showroom",
    title: "See the Materials in Person",
    copy: "Compare finishes, colors, scale, and condition in the Riverdale showroom. Gallery photos may not reflect current availability.",
    image: {
      src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
      alt: "Wide view of cabinet displays inside the Riverdale showroom",
    },
    action: { label: "Get Directions", href: site.directionsUrl, external: true },
  },
  {
    number: "03",
    eyebrow: "Call before you travel",
    title: "Call to Check Availability",
    copy: "Looking for a particular product, color, or size? Call our showroom during business hours to confirm availability before visiting.",
    image: null,
    action: { label: "Call Now", href: `tel:${site.phone.tel}`, external: true },
  },
] as const;

export function ScrollTimeline() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const element = stepsRef.current;
      if (!element || motionQuery.matches) return;
      const rect = element.getBoundingClientRect();
      setProgress(
        Math.min(1, Math.max(0, (window.innerHeight * 0.52 - rect.top) / Math.max(rect.height, 1))),
      );
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  const activeIndex = reducedMotion
    ? steps.length - 1
    : Math.min(steps.length - 1, Math.floor(progress * steps.length));
  return (
    <section aria-labelledby="journey-heading" className="timeline-shell mt-12">
      <div className="mb-10">
        <p className="eyebrow">Your Home Upgrade Journey</p>
        <h2 id="journey-heading" className="type-h3 mt-4">
          From exploring products to checking what is available, keep the next step simple.
        </h2>
      </div>
      <div
        ref={stepsRef}
        className={`timeline-steps ${reducedMotion ? "timeline-reduced" : ""}`}
        style={
          { "--timeline-progress": `${reducedMotion ? 100 : progress * 100}%` } as CSSProperties
        }
      >
        <div className="timeline-rail" aria-hidden="true">
          <span className="timeline-rail-progress" />
        </div>
        {steps.map((step, index) => {
          const active = index === activeIndex;
          const past = index < activeIndex;
          return (
            <article
              key={step.number}
              className={`timeline-step ${active ? "is-active" : ""} ${past ? "is-past" : ""}`}
            >
              <div
                className={`timeline-step__copy ${index % 2 === 1 ? "timeline-step__copy--right" : ""}`}
              >
                <p className="font-mono text-[0.6875rem] font-bold tracking-[0.16em] text-accent">
                  {step.eyebrow}
                </p>
                <h3 className="type-h3 mt-2">{step.title}</h3>
                <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
                  {step.copy}
                </p>
                {step.action.external ? (
                  <a
                    href={step.action.href}
                    target={step.action.href.startsWith("http") ? "_blank" : undefined}
                    rel={step.action.href.startsWith("http") ? "noreferrer" : undefined}
                    className="btn btn-outline mt-5"
                  >
                    {step.action.href.startsWith("tel:") ? <Phone /> : <MapPin />}
                    {step.action.label}
                  </a>
                ) : (
                  <a href={step.action.href} className="btn btn-dark mt-5">
                    {step.action.label}
                    <ArrowRight className="icon-arrow" />
                  </a>
                )}
              </div>
              <div className="timeline-step__marker" aria-hidden="true">
                <span>{step.number}</span>
              </div>
              <div
                className={`timeline-step__media ${index % 2 === 1 ? "timeline-step__media--left" : ""}`}
              >
                {step.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-ink">
                    <img
                      src={step.image.src}
                      alt={step.image.alt}
                      decoding="async"
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] flex-col justify-end rounded-[4px] bg-canvas p-6">
                    <Phone className="h-8 w-8 text-accent" />
                    <p className="mt-5 font-display text-[1.25rem] font-bold text-ink">
                      Call before you visit.
                    </p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                      {site.phone.display}
                    </p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
