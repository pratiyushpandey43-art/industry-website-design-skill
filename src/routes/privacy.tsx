import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Notice | ${site.name}` },
      {
        name: "description",
        content: `A concise privacy notice for the ${site.name} website.`,
      },
      { property: "og:title", content: `Privacy Notice | ${site.name}` },
      {
        property: "og:description",
        content: `A concise privacy notice for the ${site.name} website.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Privacy</p>
        <h1 className="type-hero mt-4">Privacy notice</h1>
        <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-muted">
          <p>
            This website is a product showcase for {site.name}. It does not offer online checkout,
            customer accounts, or live inventory tracking.
          </p>
          <p>
            If you call the showroom or follow a link to a social platform or map provider, those
            services may process information under their own policies.
          </p>
          <p>
            For questions about this website or your visit, contact the showroom at{" "}
            <a
              href={`tel:${site.phone.tel}`}
              className="font-semibold text-ink underline decoration-accent underline-offset-2"
            >
              {site.phone.display}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
