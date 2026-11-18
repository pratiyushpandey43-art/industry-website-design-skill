import { useEffect, useRef, useState } from "react";
import { useRouterState, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import {
  ArrowRight,
  ChevronDown,
  Close,
  Instagram,
  MapPin,
  Menu,
  Phone,
  TikTok,
} from "@/components/icons";
import { categoryLinks, primaryNav, site } from "@/lib/site";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function TopStrip() {
  return (
    <aside aria-label="Store contact bar" className="hidden bg-ink text-white lg:block">
      <div className="container-x flex h-9 items-center justify-between gap-6 text-[0.6875rem] font-medium tracking-[0.14em] uppercase">
        <p className="text-white/70">Home improvement outlet · Riverdale, Georgia</p>
        <div className="flex items-center gap-6">
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white/80 transition hover:text-white"
          >
            <MapPin className="h-3.5 w-3.5" /> {site.address.line1}, {site.address.city},{" "}
            {site.address.region}
          </a>
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/80"
          >
            <Phone className="h-3.5 w-3.5" /> {site.phone.display}
          </a>
          <span className="flex items-center gap-1.5">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="HI Liquidation on Instagram"
              className="grid h-8 w-8 place-items-center rounded-sm text-white/80 transition hover:text-accent"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="HI Liquidation on TikTok"
              className="grid h-8 w-8 place-items-center rounded-sm text-white/80 transition hover:text-accent"
            >
              <TikTok className="h-[18px] w-[18px]" />
            </a>
          </span>
        </div>
      </div>
    </aside>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const productsWrapRef = useRef<HTMLDivElement>(null);
  const productsToggleRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (productsOpen) {
          setProductsOpen(false);
          productsToggleRef.current?.focus();
        } else if (mobileOpen) {
          setMobileOpen(false);
        }
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (productsOpen && !productsWrapRef.current?.contains(event.target as Node))
        setProductsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen, productsOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileCloseRef.current?.focus();
    const panel = mobilePanelRef.current;
    function onTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (first && event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (last && !event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onTab);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onTab);
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
  };

  return (
    <>
      <TopStrip />
      <header
        className={`sticky top-0 z-50 border-b bg-white transition-shadow ${scrolled ? "border-line shadow-[0_10px_30px_-24px_rgba(17,17,17,0.5)]" : "border-line/80"}`}
      >
        <div className="container-x relative">
          <div
            className={`relative flex w-full items-center justify-between gap-4 transition-all lg:grid lg:grid-cols-[1fr_auto_1fr] ${scrolled ? "h-[64px]" : "h-[72px]"}`}
          >
            <Logo size="sm" />
            <nav aria-label="Primary" className="hidden items-center justify-center lg:flex">
              <ul className="flex items-center gap-x-3 xl:gap-x-5">
                {primaryNav.map((item) => {
                  const active = isRouteActive(pathname, item.href);
                  if (item.href !== "/products") {
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className="nav-link"
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={item.href}>
                      <div
                        ref={productsWrapRef}
                        className="relative flex items-center gap-0.5"
                        onMouseEnter={() => setProductsOpen(true)}
                        onMouseLeave={() => setProductsOpen(false)}
                      >
                        <a
                          href="/products"
                          aria-current={active ? "page" : undefined}
                          className="nav-link"
                        >
                          Category
                        </a>
                        <button
                          ref={productsToggleRef}
                          type="button"
                          aria-expanded={productsOpen}
                          aria-controls="products-menu"
                          aria-label={
                            productsOpen ? "Hide product categories" : "Show product categories"
                          }
                          onClick={() => setProductsOpen((value) => !value)}
                          className="grid h-8 w-6 place-items-center rounded-sm text-charcoal transition hover:text-accent"
                        >
                          <ChevronDown
                            className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          id="products-menu"
                          hidden={!productsOpen}
                          className="absolute top-full left-0 z-50 w-[min(34rem,calc(100vw-3rem))] border border-line bg-white p-2 shadow-[0_30px_60px_-30px_rgba(17,17,17,0.45)]"
                        >
                          <p className="px-3 pt-2 pb-2 text-[0.625rem] font-bold tracking-[0.2em] text-muted uppercase">
                            Shop by category
                          </p>
                          <ul className="grid sm:grid-cols-2">
                            {categoryLinks.map((category) => (
                              <li key={category.href}>
                                <a
                                  href={category.href}
                                  onClick={() => setProductsOpen(false)}
                                  className="group flex items-start justify-between gap-3 rounded-sm px-3 py-2.5 transition hover:bg-canvas focus-visible:bg-canvas"
                                >
                                  <span>
                                    <span className="block font-display text-[0.9375rem] font-bold text-ink">
                                      {category.label}
                                    </span>
                                    <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted">
                                      {category.description}
                                    </span>
                                  </span>
                                  <ArrowRight className="mt-1 h-4 w-4 flex-none text-accent opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                                </a>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-2 border-t border-line pt-2">
                            <a
                              href="/products"
                              onClick={() => setProductsOpen(false)}
                              className="flex items-center justify-between px-3 py-2.5 text-[0.75rem] font-bold tracking-[0.12em] text-accent uppercase"
                            >
                              View all products <ArrowRight />
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="absolute top-1/2 right-0 z-10 flex -translate-y-1/2 items-center gap-2 sm:gap-3 lg:right-[clamp(1.25rem,4vw,2.5rem)]">
            <a
              href={`tel:${site.phone.tel}`}
              className="hidden items-center gap-2 text-[0.8125rem] font-bold text-ink transition hover:text-accent 2xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-accent" />
              {site.phone.display}
            </a>
            <a
              href={`tel:${site.phone.tel}`}
              aria-label={`Call ${site.name} at ${site.phone.display}`}
              className="grid h-11 w-11 place-items-center rounded-sm border border-line text-ink transition hover:border-ink hover:bg-canvas lg:hidden"
            >
              <Phone />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-sm border border-line text-ink transition hover:border-ink hover:bg-canvas lg:hidden"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          ref={mobilePanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] flex flex-col bg-ink text-white lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-line-dark px-5 py-3.5">
            <Logo invert size="sm" onNavigate={closeMobile} />
            <button
              ref={mobileCloseRef}
              type="button"
              onClick={closeMobile}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-sm border border-white/25 text-white transition hover:border-white hover:bg-white/10"
            >
              <Close />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
            <p className="text-[0.625rem] font-bold tracking-[0.24em] text-white/60 uppercase">
              Menu
            </p>
            <nav aria-label="Mobile primary" className="mt-2">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {primaryNav.map((item, index) => {
                  const active = isRouteActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      {item.href === "/products" ? (
                        <>
                          <div className="flex min-h-[52px] items-center justify-between gap-4 py-3">
                            <a
                              href="/products"
                              onClick={closeMobile}
                              className={`flex items-baseline gap-3 ${active ? "text-white" : "text-white/80"}`}
                            >
                              <span className="font-mono text-[0.625rem] text-white/55">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={`font-display text-[1.0625rem] ${active ? "font-extrabold" : "font-semibold"}`}
                              >
                                Category
                              </span>
                            </a>
                            <button
                              type="button"
                              aria-expanded={mobileProductsOpen}
                              aria-controls="mobile-products"
                              aria-label="Expand product categories"
                              onClick={() => setMobileProductsOpen((value) => !value)}
                              className="grid h-10 w-10 place-items-center rounded-sm border border-white/20"
                            >
                              <ChevronDown
                                className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                          </div>
                          <ul
                            id="mobile-products"
                            hidden={!mobileProductsOpen}
                            className="mb-3 ml-8 border-l border-white/15 pl-4"
                          >
                            {categoryLinks.map((category) => (
                              <li key={category.href}>
                                <a
                                  href={category.href}
                                  onClick={closeMobile}
                                  className="flex min-h-[42px] items-center text-[0.9375rem] text-white/75 hover:text-white"
                                >
                                  {category.label}
                                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-accent" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          onClick={closeMobile}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-h-[52px] items-center justify-between gap-4 py-3 ${active ? "text-white" : "text-white/80 hover:text-white"}`}
                        >
                          <span className="flex items-baseline gap-3">
                            <span className="font-mono text-[0.625rem] text-white/55">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`font-display text-[1.0625rem] ${active ? "font-extrabold" : "font-semibold"}`}
                            >
                              {item.label}
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 text-white/55" />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-6 grid gap-2">
              <a href={`tel:${site.phone.tel}`} className="btn btn-primary w-full">
                <Phone />
                Call Now
              </a>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-invert w-full"
              >
                <MapPin />
                Get Directions
              </a>
            </div>
            <div className="mt-7 border-t border-white/10 pt-5 text-[0.8125rem] text-white/65">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 transition hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </span>
              </a>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="HI Liquidation on Instagram"
                className="grid h-11 w-11 place-items-center rounded-sm border border-white/20 text-white transition hover:border-white hover:bg-white/10"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="HI Liquidation on TikTok"
                className="grid h-11 w-11 place-items-center rounded-sm border border-white/20 text-white transition hover:border-white hover:bg-white/10"
              >
                <TikTok className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
