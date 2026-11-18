import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Phone } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { CtaBand, FlagNote, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions | HI Liquidation Home Outlet" },
      {
        name: "description",
        content:
          "Call or visit Hi Liquidation Home Outlet at 7490 Old National Hwy Ste 1300, Riverdale, GA 30296. Check product availability before you visit.",
      },
      { property: "og:title", content: "Contact & Directions | HI Liquidation Home Outlet" },
      {
        property: "og:description",
        content:
          "Call or visit Hi Liquidation Home Outlet at 7490 Old National Hwy Ste 1300, Riverdale, GA 30296. Check product availability before you visit.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
    mainEntity: {
      "@type": "HomeGoodsStore",
      name: site.name,
      telephone: "+1-404-890-8688",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.countryCode,
      },
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <PageHero
        eyebrow="Contact"
        title="Visit the Riverdale showroom"
        copy="Looking for a specific item? Give us a call during business hours before visiting to check availability. Our inventory changes frequently, and popular items may sell out quickly."
        image={{
          src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
          alt: "Wide view of cabinet displays inside the Hi Liquidation Riverdale showroom",
        }}
        priority
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        actions={
          <>
            <a href={`tel:${site.phone.tel}`} className="btn btn-primary">
              <Phone />
              Call Now
            </a>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-invert"
            >
              <MapPin />
              Get Directions
            </a>
          </>
        }
        badges={["Call ahead for availability", "Riverdale, GA", "No online checkout"]}
      />

      <section aria-labelledby="contact-details-heading" className="py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Showroom details</p>
            <h2 id="contact-details-heading" className="type-h2 mt-4">
              One call before you visit
            </h2>
            <div className="mt-7 divide-y divide-line border-y border-line">
              <div className="py-5">
                <p className="rule-label">Address</p>
                <address className="mt-2 text-[1.125rem] leading-relaxed font-semibold text-ink not-italic">
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                  <br />
                  {site.address.country}
                </address>
                <p className="mt-3 text-[0.75rem] leading-relaxed text-muted">
                  Call ahead for current store hours.
                </p>
              </div>
              <div className="py-5">
                <p className="rule-label">Phone</p>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="mt-2 inline-flex items-center gap-2.5 font-display text-[1.5rem] font-extrabold text-ink transition hover:text-accent"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  {site.phone.display}
                </a>
              </div>
              <div className="py-5">
                <p className="rule-label">Actions</p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <a href={`tel:${site.phone.tel}`} className="btn btn-primary">
                    <Phone />
                    Call Now
                  </a>
                  <a
                    href={site.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    <MapPin />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            <FlagNote>
              Looking for a specific item? Give us a call during business hours before visiting to
              check availability. Our inventory changes frequently, and popular items may sell out
              quickly.
            </FlagNote>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <div
              id="directions"
              className="overflow-hidden rounded-[4px] border border-line bg-white shadow-card"
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <iframe
                  title="Map showing Hi Liquidation Home Outlet at 7490 Old National Hwy Ste 1300, Riverdale, GA 30296"
                  src={site.mapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4">
                <p className="text-[0.8125rem] text-muted">{site.address.full}</p>
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow"
                >
                  Open in maps <ArrowUpRight />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="contact-categories-heading"
        className="border-y border-line bg-white py-14 lg:py-16"
      >
        <div className="container-x">
          <SectionHeading
            id="contact-categories-heading"
            eyebrow="Shop before you arrive"
            title="Browse a category, then call to confirm"
            copy="Use the product pages as a guide to the showroom; they do not promise live inventory."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <li key={category.slug}>
                <Reveal delay={index * 40}>
                  <a
                    href={category.href}
                    className="group flex h-full items-center justify-between gap-3 rounded-[4px] border border-line bg-canvas p-5 transition hover:border-ink hover:bg-white"
                  >
                    <span>
                      <span className="block font-display text-[1rem] font-bold text-ink">
                        {category.fullLabel}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-muted">
                        {category.subcategories.length
                          ? `${category.subcategories.length} subcategor${category.subcategories.length === 1 ? "y" : "ies"}`
                          : "Combined gallery"}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 flex-none text-accent transition group-hover:translate-x-0.5" />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="social-heading" className="py-14 lg:py-16">
        <div className="container-x flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Follow us</p>
            <h2 id="social-heading" className="type-h2 mt-4">
              See more from the showroom
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Instagram <ArrowUpRight />
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              TikTok <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title="Find something you love? Check availability before you visit."
        copy="Call the showroom, then use the map to plan your Riverdale visit."
        primary={{ label: "Call Now", href: `tel:${site.phone.tel}` }}
        secondary={{ label: "Get Directions", href: "/contact#directions" }}
      />
    </>
  );
}
