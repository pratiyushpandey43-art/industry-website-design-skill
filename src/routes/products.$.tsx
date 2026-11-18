import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Phone } from "@/components/icons";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { SofaHeroCarousel } from "@/components/sofa-hero-carousel";
import { CtaBand, FlagNote, PageHero, SectionHeading } from "@/components/ui";
import { categories, categoryByPath } from "@/lib/catalog";
import { site } from "@/lib/site";

export const Route = createFileRoute("/products/$")({
  head: ({ params }) => {
    const splat = params._splat ?? "";
    const rawPath = `/products/${splat}`;
    const entry = categoryByPath.get(rawPath);
    const category =
      entry?.category ??
      categories.find((cat) => cat.slug === splat.split("/")[0]) ??
      categories[0]!;
    const subcategory = entry?.subcategory;

    const title = subcategory
      ? `${subcategory.label} | ${category.fullLabel} | HI Liquidation Home Outlet`
      : `${category.fullLabel} | HI Liquidation Home Outlet`;
    const description = subcategory
      ? `${subcategory.description} Visit HI Liquidation Home Outlet in Riverdale, GA or call ahead.`
      : category.metaDescription;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: category.heroImage.src },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DynamicProductPage,
});

function DynamicProductPage() {
  const { _splat } = Route.useParams();
  const splat = _splat ?? "";
  const currentPath = `/products/${splat}`;
  const entry = categoryByPath.get(currentPath);

  // Fallback to top-level category matching
  const topSlug = splat.split("/")[0];
  const category =
    entry?.category ?? categories.find((cat) => cat.slug === topSlug) ?? categories[0]!;
  const subcategory = entry?.subcategory;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(subcategory
      ? [{ label: category.fullLabel, href: category.href }, { label: subcategory.label }]
      : [{ label: category.fullLabel }]),
  ];

  const galleryItems = subcategory
    ? subcategory.images.map((img) => ({
        ...img,
        tag: category.fullLabel as Exclude<import("@/lib/catalog").GalleryFilter, "All">,
        caption: img.caption ?? `${subcategory.label} display`,
      }))
    : category.gallery.map((img) => ({
        ...img,
        tag: category.fullLabel as Exclude<import("@/lib/catalog").GalleryFilter, "All">,
        caption: img.caption ?? `${category.fullLabel} display`,
      }));
  const heroImages = subcategory?.heroImages;

  return (
    <>
      <PageHero
        eyebrow={`HI Liquidation · ${category.fullLabel}`}
        title={subcategory ? subcategory.label : category.h1}
        copy={subcategory ? subcategory.description : category.heroCopy}
        image={category.heroImage}
        priority
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <a href={`tel:${site.phone.tel}`} className="btn btn-primary">
              <Phone />
              Call to Check Availability
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
        media={
          heroImages?.length ? (
            <SofaHeroCarousel
              images={heroImages}
              label={subcategory?.label ?? category.fullLabel}
            />
          ) : undefined
        }
        badges={["Riverdale, GA showroom", "No online checkout", "Call ahead for availability"]}
      />

      {/* Subcategory Navigation pills if category has subcategories */}
      {category.subcategories.length > 0 && !subcategory && (
        <section aria-label="Subcategories" className="border-b border-line bg-white py-6">
          <div className="container-x">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase mr-2">
                Subcategories:
              </span>
              {category.subcategories.map((sub) => (
                <a
                  key={sub.slug}
                  href={sub.href}
                  className="rounded-sm border border-line bg-canvas px-3.5 py-1.5 text-[0.8125rem] font-bold text-ink transition hover:border-ink hover:bg-white"
                >
                  {sub.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {category.subcategories.length > 0 && subcategory && (
        <section
          aria-label="Furniture subcategories"
          className="border-b border-line bg-white py-4"
        >
          <div className="container-x">
            <div className="furniture-subcategory-scroll flex items-center gap-2 overflow-x-auto">
              <span className="mr-2 flex-none text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                Subcategories:
              </span>
              {category.subcategories.map((sub) => {
                const isActive = sub.slug === subcategory.slug;
                return (
                  <a
                    key={sub.slug}
                    href={sub.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex-none rounded-sm border px-3.5 py-1.5 text-[0.8125rem] font-bold whitespace-nowrap transition ${
                      isActive
                        ? "border-ink bg-white text-ink"
                        : "border-line bg-canvas text-ink hover:border-ink hover:bg-white"
                    }`}
                  >
                    {sub.label}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Main Overview & Details */}
      <section aria-labelledby="category-overview" className="py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{subcategory ? subcategory.label : "Category overview"}</p>
            <h2 id="category-overview" className="type-h2 mt-4">
              {subcategory ? subcategory.label : category.overviewTitle}
            </h2>
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              {category.overviewCopy.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {category.notice && (
              <div className="mt-8">
                <FlagNote>{category.notice}</FlagNote>
              </div>
            )}

            {subcategory?.notice && (
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                {subcategory.notice}
              </p>
            )}

            {category.assetGap && !subcategory && (
              <div className="mt-4 rounded-[4px] border border-amber-300 bg-amber-50/70 p-4 text-[0.875rem] text-amber-900">
                <p className="font-semibold">Photography notice</p>
                <p className="mt-1">{category.assetGap}</p>
              </div>
            )}
          </Reveal>

          <Reveal className="lg:col-span-5" delay={100}>
            <div className="rounded-[4px] border border-line bg-white p-6 shadow-card sm:p-8">
              <p className="rule-label">Important points</p>
              <ul className="mt-6 divide-y divide-line">
                {category.overviewPoints.map((pt) => (
                  <li key={pt.title} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-display text-[0.9375rem] font-bold text-ink">{pt.title}</p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{pt.copy}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-line pt-6">
                <a href={`tel:${site.phone.tel}`} className="btn btn-primary w-full">
                  <Phone />
                  Call to Check Availability
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specific Shower Doors Model Table if shower-doors subcategory */}
      {subcategory?.models && subcategory.models.length > 0 && (
        <section aria-labelledby="models-heading" className="border-y border-line bg-white py-16">
          <div className="container-x">
            <SectionHeading
              id="models-heading"
              eyebrow="Confirmed model references"
              title="Shower door models for call-ahead checks"
              copy="Use these model references when calling the showroom. Photos and warranties vary by supplier."
            />
            <div className="mt-8 overflow-x-auto border border-line">
              <table className="w-full min-w-[640px] text-left text-[0.875rem]">
                <thead className="border-b border-line bg-canvas text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                  <tr>
                    <th className="p-4">Model</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4">Warranty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-white">
                  {subcategory.models.map((m) => (
                    <tr key={m.model}>
                      <td className="p-4 font-mono font-bold text-ink">{m.model}</td>
                      <td className="p-4 text-muted">{m.source}</td>
                      <td className="p-4 text-muted">{m.availability}</td>
                      <td className="p-4 text-muted">{m.warranty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Photos for this category if images exist */}
      {galleryItems.length > 0 && (
        <section
          aria-labelledby="gallery-heading"
          className="border-y border-line bg-white py-16 lg:py-20"
        >
          <div className="container-x">
            <SectionHeading
              id="gallery-heading"
              eyebrow="Showroom photo archive"
              title={category.galleryTitle}
              copy="Genuine photographs from the showroom floor. Inventory changes quickly, so call ahead to check current selection."
            />
            <div className="mt-8">
              <GalleryGrid items={galleryItems} />
            </div>
          </div>
        </section>
      )}

      {/* Related Categories Navigation */}
      <section aria-labelledby="other-categories" className="py-16">
        <div className="container-x">
          <SectionHeading
            id="other-categories"
            eyebrow="Explore more"
            title="Other showroom categories"
            copy="Hi Liquidation carries eight main liquidation categories in Riverdale, GA."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories
              .filter((c) => c.slug !== category.slug)
              .slice(0, 4)
              .map((other) => (
                <a
                  key={other.slug}
                  href={other.href}
                  className="group flex items-center justify-between gap-3 rounded-[4px] border border-line bg-white p-5 transition hover:border-ink hover:shadow-card"
                >
                  <div>
                    <span className="block font-display text-[1rem] font-bold text-ink">
                      {other.fullLabel}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-muted line-clamp-1">
                      {other.description}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 flex-none text-accent transition group-hover:translate-x-0.5" />
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaBand
        title={category.ctaTitle}
        copy={category.ctaCopy}
        primary={{ label: "Call Now", href: `tel:${site.phone.tel}` }}
        secondary={{ label: "Get Directions", href: "/contact#directions" }}
      />
    </>
  );
}
