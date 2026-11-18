import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { CtaBand, FlagNote, PageHero, SectionHeading } from "@/components/ui";
import { categories } from "@/lib/catalog";
import { assetManifest } from "@/lib/asset-manifest";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Hi Liquidation Home Outlet | Riverdale, GA" },
      {
        name: "description",
        content:
          "Learn how Hi Liquidation Home Outlet offers new and unused furniture and home-improvement products at liquidation prices in Riverdale, GA.",
      },
      { property: "og:title", content: "About Hi Liquidation Home Outlet" },
      {
        property: "og:description",
        content:
          "Learn how Hi Liquidation Home Outlet offers new and unused furniture and home-improvement products at liquidation prices in Riverdale, GA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: assetManifest.showroom.hero.src },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A liquidation store built around seeing products in person"
        copy="Hi Liquidation Home Outlet offers new, unused furniture and home-improvement merchandise at liquidation prices from its Riverdale showroom."
        image={assetManifest.showroom.hero}
        priority
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        actions={
          <>
            <a href="/products" className="btn btn-primary">
              Explore Products <ArrowRight />
            </a>
            <a href={`tel:${site.phone.tel}`} className="btn btn-outline-invert">
              <Phone />
              Call Now
            </a>
          </>
        }
        badges={["New & unused merchandise", "Riverdale, Georgia", "Call ahead for availability"]}
      />

      <section aria-labelledby="about-offer-heading" className="py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">What Hi Liquidation is</p>
            <h2 id="about-offer-heading" className="type-h2 mt-4">
              More than just furniture. More savings for your home.
            </h2>
            <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                We offer new, unused products at liquidation prices. Our inventory includes customer
                returns from major retailers such as Home Depot, Wayfair, Amazon, and more.
              </p>
              <p>
                Our team carefully inspects each item to check its condition. Products arrive boxed,
                and we assemble selected items ourselves for showroom display so customers can see
                what they are buying.
              </p>
              <p>
                The selection includes furniture and home-improvement products. Because inventory
                moves quickly, the website is a product showcase—not a live stock list or an online
                checkout.
              </p>
            </div>
            <FlagNote>
              Retailer names describe common merchandise sources and do not imply partnerships or
              endorsements.
            </FlagNote>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="grid gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-ink">
                <img
                  src={assetManifest.showroom.cabinets.src}
                  alt={assetManifest.showroom.cabinets.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-square overflow-hidden rounded-[4px] bg-ink">
                  <img
                    src={assetManifest.showroom.vanity.src}
                    alt={assetManifest.showroom.vanity.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-[4px] bg-ink">
                  <img
                    src={assetManifest.showroom.finishes.src}
                    alt={assetManifest.showroom.finishes.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="different-heading"
        className="border-y border-line bg-white py-16 lg:py-20"
      >
        <div className="container-x">
          <SectionHeading
            id="different-heading"
            eyebrow="What makes the store different"
            title="Inspect, compare, and ask before you visit"
            copy="The showroom gives you a place to see real merchandise, compare finishes, and ask about the current selection without pretending the online gallery is live inventory."
          />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
            {[
              {
                title: "New and unused",
                copy: "Merchandise arrives from returns and other liquidation sources; the team checks condition.",
              },
              {
                title: "Liquidation pricing",
                copy: "The store model is built around changing selection and outlet value, not fixed catalog promises.",
              },
              {
                title: "Showroom display",
                copy: "Selected boxed products are assembled for display so shoppers can see what they are considering.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 70} className="bg-white">
                <div className="h-full p-6">
                  <p className="font-mono text-[0.6875rem] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-[1.0625rem] font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-categories-heading" className="py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="about-categories-heading"
              eyebrow="Eight main categories"
              title="Shop by what you are looking for"
              copy="Every category links to the same two-level structure used in the Products and Gallery sections."
            />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={category.href}
                className="group flex items-center justify-between gap-3 rounded-[4px] border border-line bg-white p-5 transition hover:border-ink hover:shadow-card"
              >
                <span>
                  <span className="block font-display text-[1rem] font-bold text-ink">
                    {category.fullLabel}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] text-muted">
                    {category.description}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 flex-none text-accent transition group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink py-14 text-white lg:py-18">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-invert">Visit the showroom</p>
            <h2 className="type-h2 mt-4 text-white">
              See what is here, then call about what you need.
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-white/70">
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
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
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to browse?"
        copy="Explore the categories or call the Riverdale showroom to check current availability."
        primary={{ label: "Explore Products", href: "/products" }}
        secondary={{ label: "Call Now", href: `tel:${site.phone.tel}` }}
      />
    </>
  );
}
