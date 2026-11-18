import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportVibeError } from "../lib/vibe-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { BackToTop } from "@/components/back-to-top";
import { PageTransition } from "@/components/page-transition";
import { JsonLd } from "@/components/ui";
import { BRAND_LOGO_SRC } from "@/components/logo";
import { categoryLinks, site } from "@/lib/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  "@id": `${site.url}/#business`,
  name: site.name,
  description:
    "Home improvement and liquidation outlet in Riverdale, Georgia offering new and unused furniture and home-improvement merchandise.",
  url: site.url,
  logo: `${site.url}/hi-liquidation-logo.png`,
  telephone: "+1-404-890-8688",
  image: "https://hi-liquidation-website-development.vercel.app/media/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Product categories",
    itemListElement: categoryLinks.map((category) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: category.label,
        url: `${site.url}${category.href}`,
      },
    })),
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#business` },
  inLanguage: "en-US",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-canvas px-4 py-20">
      <div className="max-w-md text-center">
        <p className="eyebrow">404 Error</p>
        <h1 className="type-h2 mt-4 text-ink">Page not found</h1>
        <p className="mt-3 text-sm text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportVibeError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-canvas px-4 py-20">
      <div className="max-w-md text-center">
        <h1 className="type-h3 text-ink">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-primary"
          >
            Try again
          </button>
          <Link to="/" className="btn btn-outline">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#111111" },
      { title: "HI Liquidation Home Outlet | Riverdale, GA" },
      { name: "description", content: site.description },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Favicon — the HI Liquidation brand logo (modern WebP, with PNG fallback
      // for browsers that don't support WebP favicons).
      { rel: "icon", type: "image/webp", href: BRAND_LOGO_SRC },
      {
        rel: "icon",
        href: "https://hi-liquidation-website-development.vercel.app/favicon-32x32.png",
      },
      { rel: "apple-touch-icon", href: BRAND_LOGO_SRC },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-canvas font-sans text-body antialiased">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only rounded-sm bg-ink px-4 py-3 text-[0.8125rem] font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
        <BackToTop />
        <JsonLd data={[localBusinessSchema, websiteSchema]} />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </QueryClientProvider>
  );
}
