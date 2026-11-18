import { categories as catalogCategories } from "@/lib/catalog";

export const site = {
  name: "HI Liquidation Home Outlet",
  shortName: "HI Liquidation",
  legalName: "HI Liquidation Home Outlet",
  category: "Home improvement and liquidation outlet",
  url:
    (typeof process !== "undefined" && process.env
      ? process.env["NEXT_PUBLIC_SITE_URL"]
      : undefined) ?? "https://www.hiliquidationhomeoutlet.com",
  description:
    "HI Liquidation Home Outlet is a Riverdale, GA liquidation store offering new and unused furniture and home-improvement merchandise. Browse the showroom, call ahead, and visit in person.",
  phone: { display: "404-890-8688", international: "+1 (404) 890-8688", tel: "+14048908688" },
  address: {
    line1: "7490 Old National Hwy Ste 1300",
    city: "Riverdale",
    region: "GA",
    postalCode: "30296",
    country: "United States",
    countryCode: "US",
    full: "7490 Old National Hwy Ste 1300, Riverdale, GA 30296",
  },
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=7490%20Old%20National%20Hwy%20Ste%201300%2C%20Riverdale%2C%20GA%2030296",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=7490%20Old%20National%20Hwy%20Ste%201300%2C%20Riverdale%2C%20GA%2030296&z=15&output=embed",
  social: {
    instagram: "https://www.instagram.com/hiliquidation/",
    tiktok: "https://www.tiktok.com/@hi.liquidation",
  },
  geo: { areaServed: "Riverdale, Georgia", region: "South Atlanta metro, Georgia" },
  confirmNotes: {
    hours: "Call ahead for current store hours.",
    photos: "Client-provided showroom photography is integrated in the designated sections.",
    inventory:
      "Inventory changes frequently; gallery images may not represent current availability.",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  shortLabel?: string;
  description?: string;
};

export const categoryLinks: NavItem[] = catalogCategories.map((category) => ({
  label: category.fullLabel,
  href: category.href,
  description: category.description,
}));

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  shop: [{ label: "Products", href: "/products" }, ...categoryLinks],
  company: [
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
};

export const allRoutePaths = [
  "/",
  "/products",
  "/gallery",
  "/about",
  "/contact",
  "/privacy",
  ...catalogCategories.flatMap((category) => [
    category.href,
    ...category.subcategories.map((subcategory) => subcategory.href),
  ]),
] as const;

export const audiences = [
  {
    title: "Homeowners",
    copy: "Compare new and unused home-improvement merchandise in person, then call ahead for the current selection.",
  },
  {
    title: "DIY shoppers",
    copy: "Bring your measurements and room photos while you browse finishes, materials, and practical home goods.",
  },
  {
    title: "Furniture shoppers",
    copy: "Walk the showroom to see scale, condition, and the pieces available when you visit.",
  },
  {
    title: "Property owners",
    copy: "Browse categories for home updates and turnovers with one Riverdale showroom stop.",
  },
];

export const homeValuePoints = [
  { label: "New & unused merchandise", detail: "Furniture and home-improvement goods" },
  { label: "Liquidation value", detail: "Customer returns and overstock" },
  { label: "Riverdale showroom", detail: "7490 Old National Hwy, Ste 1300" },
  { label: "Call ahead", detail: "Inventory moves quickly" },
];
