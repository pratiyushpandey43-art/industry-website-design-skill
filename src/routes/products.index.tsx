import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "@/components/icons";
import { CategoryCard } from "@/components/category-card";
import { Reveal } from "@/components/reveal";
import { CtaBand, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products & Categories | HI Liquidation Home Outlet" },
      {
        name: "description",
        content:
          "Explore eight product categories at HI Liquidation Home Outlet in Riverdale, GA. Browse genuine showroom photography and call ahead for availability.",
      },
      { property: "og:title", content: "Products & Categories | HI Liquidation Home Outlet" },
      {
        property: "og:description",
        content:
          "Explore eight product categories at HI Liquidation Home Outlet in Riverdale, GA. Browse genuine showroom photography and call ahead for availability.",
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
  component: ProductsPage,
});

function ProductsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HI Liquidation Home Outlet product categories",
    numberOfItems: categories.length,
    itemListElement: categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.fullLabel,
      url: `${site.url}${category.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Products"
        title="Browse the showroom by category"
        copy="Hi Liquidation is a liquidation store for new and unused furniture and home-improvement merchandise. Explore the eight categories, then call ahead to confirm current availability."
        image={{
          src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
          alt: "Actual showroom floor with cabinet displays at HI Liquidation",
        }}
        priority
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
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
        badges={["Eight main categories", "No online checkout", "Call ahead for availability"]}
      />

      <section aria-labelledby="category-list-heading" className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="category-list-heading"
              eyebrow="Category guide"
              title="Eight categories, one Riverdale showroom"
              copy="Use the category pages to browse the current photo collections and the approved subcategory structure. Photos are representative and inventory changes quickly."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 45}>
                <CategoryCard
                  category={category}
                  priority={index < 2}
                  className="h-full"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="visit-heading"
        className="border-y border-line bg-white py-16 lg:py-20"
      >
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Before you visit</p>
            <h2 id="visit-heading" className="type-h2 mt-4">
              Gallery photos show the types of merchandise, not guaranteed current stock.
            </h2>
            <p className="type-lead mt-5 max-w-2xl">
              A significant portion of the inventory comes from customer returns from retailers such
              as Home Depot, Wayfair, Amazon, and more. The team checks merchandise condition, but
              selection moves quickly. Call the showroom when a particular item matters.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="rounded-[4px] border border-line bg-canvas p-6">
              <p className="rule-label">Call the showroom</p>
              <a
                href={`tel:${site.phone.tel}`}
                className="mt-3 flex items-center gap-2 font-display text-[1.35rem] font-extrabold text-ink hover:text-accent"
              >
                <Phone className="h-5 w-5 text-accent" />
                {site.phone.display}
              </a>
              <div className="mt-5 grid gap-2">
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-dark w-full"
                >
                  Get Directions <ArrowUpRight />
                </a>
                <a href="/gallery" className="btn btn-outline w-full">
                  Browse Gallery <ArrowRight />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Find something you love? Check availability before you visit."
        copy="Call during business hours to confirm a particular product, color, size, or model."
        primary={{ label: "Call Now", href: `tel:${site.phone.tel}` }}
        secondary={{ label: "Get Directions", href: "/contact#directions" }}
      />
    </>
  );
}
