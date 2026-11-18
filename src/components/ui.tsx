import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Phone } from "@/components/icons";
import { site } from "@/lib/site";
import type { Media } from "@/lib/catalog";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  invert = false,
  align = "left",
  id,
  children,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  invert?: boolean;
  align?: "left" | "center";
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      {eyebrow ? (
        <p
          className={`eyebrow ${invert ? "eyebrow-invert" : ""} ${align === "center" ? "justify-center" : ""}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={`type-h2 mt-4 ${invert ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {copy ? (
        <p className={`type-lead mt-5 ${invert ? "text-white/70" : "text-muted"}`}>{copy}</p>
      ) : null}
      {children}
    </div>
  );
}

export function Breadcrumbs({
  items,
  invert = true,
}: {
  items: { label: string; href?: string }[];
  invert?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase ${
          invert ? "text-white/60" : "text-muted"
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className={`transition ${invert ? "hover:text-white" : "hover:text-ink"}`}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={invert ? "text-white" : "text-ink"}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  breadcrumbs,
  actions,
  badges,
  media,
  priority = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: Media;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  badges?: string[];
  media?: ReactNode;
  priority?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {!media ? (
        <>
          <img
            src={image.src}
            alt={image.alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/40"
            aria-hidden="true"
          />
        </>
      ) : null}
      <div className="relative container-x py-16 sm:py-20 lg:py-24">
        <div className={media ? "grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14" : ""}>
          <div className={media ? "min-w-0 lg:col-span-5" : "max-w-3xl"}>
            {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
            <p className="eyebrow eyebrow-invert">{eyebrow}</p>
            <h1 className="type-hero mt-4 text-white">{title}</h1>
            <p className="type-lead mt-5 max-w-2xl text-white/80">{copy}</p>
            {actions ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
            ) : null}
            {badges ? (
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5 text-[0.6875rem] font-semibold tracking-[0.14em] text-white/60 uppercase">
                {badges.map((badge) => (
                  <li key={badge}>{badge}</li>
                ))}
              </ul>
            ) : null}
          </div>
          {media ? <div className="min-w-0 lg:col-span-7">{media}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  copy,
  primary = { label: "Call Now", href: `tel:${site.phone.tel}` },
  secondary,
  tertiary,
}: {
  title: string;
  copy: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href?: string; phone?: boolean };
  tertiary?: { label: string; href: string };
}) {
  return (
    <section className="bg-canvas py-16 lg:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[4px] bg-ink px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          />
          <div aria-hidden="true" className="absolute top-0 left-0 h-full w-1.5 bg-accent" />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow eyebrow-invert">Next step</p>
              <h2 className="type-h2 mt-4 max-w-xl text-white">{title}</h2>
              <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">{copy}</p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                {primary.href.startsWith("/") ? (
                  <a href={primary.href} className="btn btn-primary">
                    {primary.label}
                    <ArrowRight className="icon-arrow" />
                  </a>
                ) : (
                  <a
                    href={primary.href}
                    target={primary.href.startsWith("http") ? "_blank" : undefined}
                    rel={primary.href.startsWith("http") ? "noreferrer" : undefined}
                    className="btn btn-primary"
                  >
                    {primary.label}
                    <ArrowUpRight />
                  </a>
                )}
                {secondary ? (
                  secondary.phone || !secondary.href ? (
                    <a href={`tel:${site.phone.tel}`} className="btn btn-outline-invert">
                      <Phone />
                      {secondary.label}
                    </a>
                  ) : secondary.href.startsWith("/") ? (
                    <a href={secondary.href} className="btn btn-outline-invert">
                      {secondary.label}
                    </a>
                  ) : (
                    <a
                      href={secondary.href}
                      target={secondary.href.startsWith("http") ? "_blank" : undefined}
                      rel={secondary.href.startsWith("http") ? "noreferrer" : undefined}
                      className="btn btn-outline-invert"
                    >
                      {secondary.label}
                    </a>
                  )
                ) : null}
                {tertiary ? (
                  <a href={tertiary.href} className="link-arrow text-white hover:text-white/70">
                    {tertiary.label}
                    <ArrowUpRight />
                  </a>
                ) : null}
              </div>
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-white/65 lg:text-right">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode} ·{" "}
                <a
                  href={`tel:${site.phone.tel}`}
                  className="text-white/80 underline underline-offset-2 hover:text-white"
                >
                  {site.phone.display}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqList({
  faqs,
  heading = "Common questions",
  eyebrow = "FAQ",
}: {
  faqs: { q: string; a: string }[];
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="type-h2 mt-4">{heading}</h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-1">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[1.0625rem] font-bold text-ink marker:content-none hover:text-accent sm:text-[1.125rem]">
              <span>{faq.q}</span>
              <span
                aria-hidden="true"
                className="relative grid h-7 w-7 flex-none place-items-center rounded-full border border-line transition group-open:border-accent group-open:bg-accent"
              >
                <span className="absolute h-[1.5px] w-3 bg-ink transition group-open:bg-white" />
                <span className="absolute h-3 w-[1.5px] bg-ink transition group-open:rotate-90 group-open:bg-white" />
              </span>
            </summary>
            <div className="max-w-2xl pb-5 text-[0.9375rem] leading-relaxed text-muted">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function DetailList({ items }: { items: { title: string; copy: string }[] }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <li key={item.title} className="grid gap-2 py-5 sm:grid-cols-12 sm:gap-6">
          <span className="font-mono text-[0.6875rem] text-accent sm:col-span-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-[1.0625rem] font-bold text-ink sm:col-span-4">
            {item.title}
          </h3>
          <p className="text-[0.9375rem] leading-relaxed text-muted sm:col-span-7">{item.copy}</p>
        </li>
      ))}
    </ol>
  );
}

export function FlagNote({ children }: { children: ReactNode }) {
  return (
    <p className="flag-note">
      <span aria-hidden="true" className="mt-1 inline-block h-1.5 w-1.5 flex-none bg-accent" />
      <span>{children}</span>
    </p>
  );
}
