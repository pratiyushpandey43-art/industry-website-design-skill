import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "@/components/icons";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Genuine Showroom Photography | HI Liquidation Home Outlet" },
      {
        name: "description",
        content:
          "Browse genuine HI Liquidation Home Outlet showroom photography by category. Photos show the types of merchandise carried and may not reflect current availability.",
      },
      { property: "og:title", content: "Gallery | Genuine Showroom Photography" },
      {
        property: "og:description",
        content:
          "Browse genuine HI Liquidation Home Outlet showroom photography by category. Photos show the types of merchandise carried and may not reflect current availability.",
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
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="See the showroom before you visit"
        copy="Browse genuine store photography by the eight main categories. Product photos and displays are representative; inventory moves quickly, so call before traveling for a specific item."
        image={{
          src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
          alt: "Wide view of cabinet displays inside the HI Liquidation Riverdale showroom",
        }}
        priority
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
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
        badges={[
          "Eight main category filters",
          "Genuine showroom photography",
          "Inventory changes quickly",
        ]}
      />

      <section aria-labelledby="gallery-nav-heading" className="py-14 lg:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="gallery-nav-heading"
              eyebrow="Two-level navigation"
              title="Main category → subcategory"
              copy="The gallery uses exactly two conceptual levels. Product models, colors, and variations stay inside the page content rather than becoming new navigation levels."
            />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 45}>
                <div className="h-full rounded-[4px] border border-line bg-white p-5">
                  <a href={category.href} className="group flex items-center justify-between gap-3">
                    <span>
                      <span className="block font-display text-[1.0625rem] font-bold text-ink">
                        {category.fullLabel}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-muted">
                        {category.subcategories.length
                          ? `${category.subcategories.length} approved subcategor${category.subcategories.length === 1 ? "y" : "ies"}`
                          : "Combined gallery"}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition group-hover:translate-x-0.5" />
                  </a>
                  {category.subcategories.length > 0 && (
                    <ul className="mt-4 border-t border-line pt-3">
                      {category.subcategories
                        .filter((subcategory) => subcategory.href !== category.href)
                        .map((subcategory) => (
                          <li key={subcategory.href}>
                            <a
                              href={subcategory.href}
                              className="flex min-h-[32px] items-center justify-between text-[0.8125rem] text-muted hover:text-ink"
                            >
                              {subcategory.label}
                              <ArrowRight className="h-3.5 w-3.5 text-accent" />
                            </a>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gallery-grid-heading"
        className="border-y border-line bg-white py-14 lg:py-20"
      >
        <div className="container-x">
          <SectionHeading
            id="gallery-grid-heading"
            eyebrow="Photo collection"
            title="Browse the genuine images"
            copy="Use the filters to focus on the categories with supplied photography. Missing category assets are documented in the project audit rather than replaced with unrelated stock images."
          />
          <div className="mt-8">
            <GalleryGrid />
          </div>
        </div>
      </section>

      <CtaBand
        title="Looking for something specific?"
        copy="Call 404-890-8688 during business hours to check availability before you visit."
        primary={{ label: "Call Now", href: `tel:${site.phone.tel}` }}
        secondary={{ label: "Get Directions", href: "/contact#directions" }}
      />
    </>
  );
}
