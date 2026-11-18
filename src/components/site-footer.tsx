import { Logo } from "@/components/logo";
import { ArrowUpRight, Instagram, MapPin, Phone, TikTok } from "@/components/icons";
import { categoryLinks, footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="mb-4">
              <Logo size="lg" invert />
            </div>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-white/65">
              {site.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
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

          <div className="lg:col-span-3">
            <p className="text-[0.625rem] font-bold tracking-[0.2em] text-white/55 uppercase">
              Shop
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.shop.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.9375rem] text-white/75 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[0.625rem] font-bold tracking-[0.2em] text-white/55 uppercase">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.9375rem] text-white/75 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[0.625rem] font-bold tracking-[0.2em] text-white/55 uppercase">
              Visit
            </p>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-white/75 transition hover:text-white"
            >
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" />
              <span>
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </a>
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-4 flex items-center gap-2 font-display text-[1.125rem] font-bold text-white transition hover:text-accent"
            >
              <Phone className="h-4 w-4 text-accent" />
              {site.phone.display}
            </a>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-invert mt-5 w-full"
            >
              Get Directions <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.8125rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-white/45">
            Inventory changes frequently; gallery images may not represent current availability.
          </p>
        </div>
      </div>
    </footer>
  );
}
