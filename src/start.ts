import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Security headers applied to every response (no visual or functional change).
// CSP allows the real external resources: Google Fonts, showroom imagery and
// MP4s from the Vercel media origin, the Google Maps embed iframe, and inline
// JSON-LD structured data. ws:/wss: are included so Vite HMR stays functional
// in dev without weakening the production policy.
// NOTE: next() returns the outgoing response object — mutate its headers in
// place and return the SAME object. Reconstructing a new Response(result.body,
// ...) drops the rendered body stream and returns an empty page.
const securityHeadersMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next();
  const headers = (result as unknown as Response).headers;
  if (headers && typeof headers.set === "function") {
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    );
    headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "img-src 'self' https: data: blob:",
        "media-src 'self' https:",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "script-src 'self' 'unsafe-inline'",
        "frame-src https://maps.google.com https://www.google.com",
        "connect-src 'self' ws: wss:",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
      ].join("; "),
    );
  }
  return result;
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, securityHeadersMiddleware, csrfMiddleware],
}));
