import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "@/components/icons";
import { CategoryCard } from "@/components/category-card";
import { HeroVideo } from "@/components/hero-video";
import { ProductCategoryMarquee } from "@/components/product-category-marquee";
import { Reveal } from "@/components/reveal";
import { ScrollTimeline } from "@/components/scroll-timeline";
import { CtaBand, FaqList, SectionHeading } from "@/components/ui";
import { categories } from "@/lib/catalog";
import { categoryLinks, homeValuePoints, site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HI Liquidation Home Outlet | Riverdale, GA" },
      {
        name: "description",
        content:
          "Discover new, unused furniture and home-improvement products at liquidation prices. Visit our Riverdale showroom at 7490 Old National Hwy Ste 1300.",
      },
      { property: "og:title", content: "HI Liquidation Home Outlet | Riverdale, GA" },
      {
        property: "og:description",
        content:
          "Discover new, unused furniture and home-improvement products at liquidation prices. Visit our Riverdale showroom at 7490 Old National Hwy Ste 1300.",
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
  component: IndexPage,
});

const homeFaqs = [
  {
    q: "What is HI Liquidation Home Outlet?",
    a: "Hi Liquidation is a liquidation store offering new and unused furniture and home-improvement products. A significant portion of the inventory comes from customer returns from retailers such as Home Depot, Wayfair, Amazon, and more.",
  },
  {
    q: "Can I confirm a particular item before visiting?",
    a: "Yes. Inventory moves quickly, so call 404-890-8688 during business hours to ask about a product, color, model, or category before visiting.",
  },
  {
    q: "Are the gallery photos live inventory?",
    a: "No. Photos show the types of merchandise and genuine showroom displays. They may not represent current availability.",
  },
  {
    q: "What is the fastest way to reach the showroom?",
    a: "Call HI Liquidation Home Outlet at 404-890-8688 to ask about current inventory, product availability, or visiting the showroom.",
  },
];

const audiences = [
  {
    index: "01",
    title: "Homeowners",
    copy: "Compare new and unused home-improvement merchandise in person, then call ahead for the current selection.",
  },
  {
    index: "02",
    title: "DIY shoppers",
    copy: "Bring your measurements and room photos while you browse finishes, materials, and practical home goods.",
  },
  {
    index: "03",
    title: "Furniture shoppers",
    copy: "Walk the showroom to see scale, condition, and the pieces available when you visit.",
  },
  {
    index: "04",
    title: "Property owners",
    copy: "Browse categories for home updates and turnovers with one Riverdale showroom stop.",
  },
];

const steps = [
  {
    eyebrow: "Browse the categories",
    title: "Explore Our Products",
    copy: "Browse the eight product categories and open the gallery sections that match what you are looking for.",
    link: { label: "Explore Products", href: "/products" },
    image: {
      src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-cabinets.webp",
      alt: "Cabinet displays inside the HI Liquidation showroom",
    },
  },
  {
    eyebrow: "Visit the showroom",
    title: "See the Materials in Person",
    copy: "Compare finishes, colors, scale, and condition in the Riverdale showroom. Gallery photos may not reflect current availability.",
    link: { label: "Get Directions", href: site.directionsUrl, external: true },
    image: {
      src: "https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp",
      alt: "Wide view of cabinet displays inside the Riverdale showroom",
    },
  },
  {
    eyebrow: "Call before you travel",
    title: "Call to Check Availability",
    copy: "Looking for a particular product, color, or size? Call our showroom during business hours to confirm availability before visiting.",
    link: { label: "Call Now", href: `tel:${site.phone.tel}` },
    aside: {
      label: "Call before you visit.",
      value: site.phone.display,
      tel: `tel:${site.phone.tel}`,
    },
  },
];

function IndexPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate flex min-h-0 items-start overflow-hidden bg-ink lg:min-h-[680px] lg:items-end"
      >
        <HeroVideo
          src="https://hi-liquidation-website-development.vercel.app/media/showroom-hero-montage.mp4"
          poster="https://hi-liquidation-website-development.vercel.app/media/showroom-montage-poster.webp"
          label="HI Liquidation showroom montage"
        />
        <div className="container-x relative z-10 w-full pt-[calc(56.25vw+1.5rem)] pb-[calc(7rem+env(safe-area-inset-bottom))] lg:pt-32 lg:pb-16">
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-invert">
              HI Liquidation Home Outlet <span aria-hidden="true">·</span> Riverdale, GA
            </p>
            <h1 id="hero-heading" className="type-hero mt-5 max-w-xl text-white sm:max-w-3xl">
              BIG FINDS. BETTER PRICES. BEAUTIFUL LIVING.
            </h1>
            <p className="type-lead mt-5 max-w-[32rem] text-white/80">
              Discover incredible deals on furniture, appliances, lighting, doors, and everyday home
              essentials. At HI Liquidation, making your home look and feel better doesn't have to
              cost more.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a className="btn btn-primary" href="/products">
                Explore All Products <ArrowRight className="icon-arrow" />
              </a>
              <a href={`tel:${site.phone.tel}`} className="btn btn-outline-invert">
                <Phone />
                Call to Check Availability
              </a>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="link-arrow mt-1 text-white hover:text-white/70 sm:mt-0 sm:ml-1"
              >
                <MapPin className="h-4 w-4 text-accent" />
                Get Directions
              </a>
            </div>
          </div>
          <div className="mt-12 border-t border-white/20 pt-4">
            <ProductCategoryMarquee categories={categoryLinks} />
          </div>
        </div>
      </section>

      {/* Showroom Highlights Marquee Bar */}
      <section aria-label="Showroom highlights" className="border-b border-line bg-white">
        <div className="container-x">
          <div className="showroom-marquee">
            <div className="showroom-marquee__viewport">
              <div className="showroom-marquee__track">
                <ul className="showroom-marquee__group">
                  {homeValuePoints.map((item) => (
                    <li
                      key={item.label}
                      className="showroom-marquee__item bg-white py-5 pr-4 sm:py-6"
                    >
                      <p className="flex items-start gap-3">
                        <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-none bg-accent" />
                        <span>
                          <span className="block font-display text-[0.9375rem] font-bold text-ink">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[0.8125rem] text-muted">
                            {item.detail}
                          </span>
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
                <ul className="showroom-marquee__group" aria-hidden="true">
                  {homeValuePoints.map((item) => (
                    <li
                      key={`${item.label}-dup`}
                      className="showroom-marquee__item bg-white py-5 pr-4 sm:py-6"
                    >
                      <p className="flex items-start gap-3">
                        <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-none bg-accent" />
                        <span>
                          <span className="block font-display text-[0.9375rem] font-bold text-ink">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[0.8125rem] text-muted">
                            {item.detail}
                          </span>
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" aria-labelledby="categories-heading" className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="categories-heading"
              eyebrow="Shop the showroom"
              title="More Than Just Furniture. More Savings for Your Home."
              copy="HI Liquidition is a liquidation store for people who want quality products without paying full retail."
            >
              <p className="type-lead mt-4 text-muted">
                We carry far more than furniture. Under one roof you'll find sofas and bedroom sets
                next to flooring, kitchen cabinets, bathroom vanities, shower doors, and other
                home-improvement and renovation materials. Whether you're furnishing a room or
                renovating a whole house, you can get what you need in one trip, at prices well
                below typical retail.
              </p>
            </SectionHeading>
            <a href="/products" className="link-arrow flex-none">
              View all products <ArrowUpRight />
            </a>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 50}>
                <CategoryCard
                  category={category}
                  priority={index < 4}
                  className="h-full"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Riverdale Showroom Section */}
      <section
        aria-labelledby="showroom-heading"
        className="border-y border-line bg-ink py-16 text-white lg:py-24"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow eyebrow-invert">The Riverdale showroom</p>
            <p
              id="showroom-heading"
              className="mt-4 font-display text-[1.375rem] font-extrabold leading-snug text-white sm:text-2xl"
            >
              We are not a secondhand or used-goods store. Everything we sell is new and unused.
            </p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/75">
              Much of our inventory comes from customer returns and overstock from major retailers
              such as Home Depot, Wayfair, Amazon, and more. Products arrive boxed, and our team
              inspects each item to check its condition before it goes on sale. That's how we pass
              real savings on to you without cutting corners on quality.
            </p>
            <div className="mt-8 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-white/60 uppercase">
                  Visit
                </p>
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-[0.9375rem] text-white/80 transition hover:text-white"
                >
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </a>
              </div>
              <div>
                <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-white/60 uppercase">
                  Call
                </p>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="mt-2 block font-display text-[1.125rem] font-bold text-white transition hover:text-accent"
                >
                  {site.phone.display}
                </a>
                <p className="mt-1 text-[0.75rem] text-white/55">
                  Call ahead for current store hours and availability.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-invert"
              >
                Get Directions <ArrowUpRight />
              </a>
              <a href="/contact" className="btn btn-outline-invert">
                Contact Us
              </a>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={100}>
            <div className="overflow-hidden rounded-[4px] border border-white/15 bg-ink-deep">
              <div className="relative aspect-[4/3] w-full">
                <img
                  src="https://hi-liquidation-website-development.vercel.app/media/showroom-wide-view.webp"
                  alt="Wide view of cabinet displays inside the HI Liquidation Riverdale showroom"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-[0.6875rem] font-bold tracking-[0.16em] uppercase">
                  <span className="rounded-sm bg-white/10 px-2.5 py-1 text-white backdrop-blur-sm">
                    Actual showroom photography
                  </span>
                  <a href="/gallery" className="link-arrow text-white hover:text-accent">
                    Gallery <ArrowUpRight />
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[0.75rem] text-white/55">
              Photos are provided to show the types of merchandise and showroom displays; current
              availability changes quickly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Built For How You Shop Section */}
      <section aria-labelledby="shopping-heading" className="py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                id="shopping-heading"
                eyebrow="Built for how you shop"
                title="See It Before You Buy It"
                copy="Buying boxed furniture online means guessing. So we assemble selected items ourselves and set them out in our showroom. You can sit on it, open it, and check the size and finish in person."
              />
              <div className="mt-8 rounded-[4px] border border-line bg-white p-6 shadow-card">
                <p className="rule-label">Already know what you want?</p>
                <p className="mt-2 text-[0.9375rem] text-muted">
                  Call the showroom during business hours to check the current availability of a
                  product, color, size, or model.
                </p>
                <a href={`tel:${site.phone.tel}`} className="btn btn-outline mt-5">
                  <Phone />
                  Call Now
                </a>
              </div>
            </Reveal>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-7">
              {audiences.map((aud, index) => (
                <Reveal key={aud.title} delay={index * 60} className="bg-white">
                  <div className="h-full p-6 sm:p-8">
                    <p className="font-mono text-[0.6875rem] text-accent">{aud.index}</p>
                    <h3 className="mt-3 font-display text-[1.125rem] font-bold text-ink">
                      {aud.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{aud.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your Home Upgrade Journey (Scroll Timeline) */}
      <section
        aria-labelledby="journey-heading"
        className="border-t border-line bg-canvas py-16 lg:py-24"
      >
        <div className="container-x">
          <ScrollTimeline />
        </div>
      </section>

      {/* Next Step CTA Band */}
      <CtaBand
        title="YOUR DREAM HOME DOESN'T NEED A DREAM BUDGET."
        copy="Discover exceptional home finds across our collections. Make every purchase count without stretching your budget."
        primary={{ label: "Call Now", href: `tel:${site.phone.tel}` }}
        secondary={{ label: "Get Directions", href: "/contact#directions" }}
      />

      {/* Home FAQ & Showroom Details Section */}
      <section
        aria-labelledby="home-faq-heading"
        className="border-t border-line bg-white py-16 lg:py-24"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <FaqList heading="Questions before you visit" eyebrow="Home FAQ" faqs={homeFaqs} />
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-[4px] border border-line bg-canvas p-6 sm:p-8">
              <p className="rule-label">Showroom details</p>
              <address className="mt-3 text-[1rem] leading-relaxed font-semibold text-ink not-italic">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </address>
              <a
                href={`tel:${site.phone.tel}`}
                className="mt-4 flex items-center gap-2 font-display text-[1.25rem] font-extrabold text-ink transition hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                {site.phone.display}
              </a>
              <div className="mt-6 grid gap-2">
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-dark w-full"
                >
                  Get Directions <ArrowUpRight />
                </a>
                <a href="/products" className="btn btn-outline w-full">
                  Explore Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
