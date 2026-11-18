import { createFileRoute } from "@tanstack/react-router";
import { allRoutePaths, site } from "@/lib/site";

/**
 * Dynamic XML sitemap served at /sitemap.xml.
 *
 * URLs are derived from the single source of truth in src/lib/site.ts
 * (`allRoutePaths`, which is built from the catalog route model) so the
 * sitemap stays synchronized with the actual route tree. Paths are
 * de-duplicated (the Flooring category and its single subcategory share
 * the same href) and rendered as absolute HTTPS URLs against the
 * canonical production domain from `site.url`.
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const base = site.url.replace(/\/+$/, "");
        const paths = Array.from(new Set(allRoutePaths));
        const urls = paths
          .map((path) => `  <url>\n    <loc>${escapeXml(`${base}${path}`)}</loc>\n  </url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
