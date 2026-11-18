import { assetManifest, type Asset } from "@/lib/asset-manifest";

export type Media = Asset;

export type ShowerDoorModel = {
  model: string;
  source: string;
  availability: string;
  warranty: string;
  price: string;
  photoNote: string;
};

export type Subcategory = {
  slug: string;
  label: string;
  href: string;
  description: string;
  images: readonly Media[];
  heroImages?: readonly Media[];
  notice?: string | undefined;
  models?: readonly ShowerDoorModel[] | undefined;
  productNote?: string | undefined;
};

export type Finding = {
  title: string;
  copy: string;
  bullets: string[];
  image: Media;
};

export type Category = {
  slug: string;
  href: string;
  navLabel: string;
  fullLabel: string;
  index: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroCopy: string;
  heroImage: Media;
  overviewTitle: string;
  overviewCopy: string[];
  overviewPoints: { title: string; copy: string }[];
  findingsTitle: string;
  findingsIntro: string;
  findings: Finding[];
  galleryTitle: string;
  gallery: readonly Media[];
  planning: { title: string; copy: string }[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string; copy: string }[];
  ctaTitle: string;
  ctaCopy: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  subcategories: readonly Subcategory[];
  notice?: string | undefined;
  assetGap?: string | undefined;
};

const mapsDirections = "/contact#directions";
const callNow = "tel:+14048908688";
const inventoryNote =
  "Inventory changes frequently and gallery images may not represent current availability. Call ahead before visiting.";

const showerDoorModels: readonly ShowerDoorModel[] = [
  {
    model: "DS01",
    source: "Supplied from New York",
    availability: "Call to confirm availability. Out-of-state ordering may take longer.",
    warranty: "No warranty published until confirmed by the client.",
    price: "Price not confirmed",
    photoNote:
      "Official supplier and matching in-store model photography not supplied in the current archive.",
  },
  {
    model: "DS08",
    source: "Supplied from New York",
    availability: "Call to confirm availability. Out-of-state ordering may take longer.",
    warranty: "No warranty published until confirmed by the client.",
    price: "Price not confirmed",
    photoNote:
      "Official supplier and matching in-store model photography not supplied in the current archive.",
  },
  {
    model: "SS04",
    source: "Supplied locally",
    availability:
      "Pickup may generally be possible about one day after ordering, subject to availability.",
    warranty: "10-year warranty on glass; 1-year warranty on parts.",
    price: "Price not confirmed",
    photoNote:
      "Official supplier and matching in-store model photography not supplied in the current archive.",
  },
  {
    model: "SS14",
    source: "Supplied locally",
    availability:
      "Pickup may generally be possible about one day after ordering, subject to availability.",
    warranty: "10-year warranty on glass; 1-year warranty on parts.",
    price: "Price not confirmed",
    photoNote:
      "Official supplier and matching in-store model photography not supplied in the current archive.",
  },
  {
    model: "DS10",
    source: "Supplied locally",
    availability:
      "Pickup may generally be possible about one day after ordering, subject to availability.",
    warranty: "10-year warranty on glass; 1-year warranty on parts.",
    price: "Price not confirmed",
    photoNote:
      "Official supplier and matching in-store model photography not supplied in the current archive.",
  },
];

const showerSubcategories: readonly Subcategory[] = [
  {
    slug: "shower-doors",
    label: "Shower Doors",
    href: "/products/shower/shower-doors",
    description: "Five confirmed model references are listed for call-ahead availability checks.",
    images: [],
    models: showerDoorModels,
    productNote:
      "Do not treat model references as live inventory. Call the showroom before visiting.",
  },
  {
    slug: "shower-walls",
    label: "Shower Walls",
    href: "/products/shower/shower-walls",
    description: "PVC shower wall panels shown as one complete three-piece set.",
    images: [],
    productNote:
      "One 96 × 60 panel plus two 96 × 30 panels. Sold only as one complete set. Four colors are available to confirm by phone.",
    notice:
      "Locally sourced; pickup is generally available the day after payment, subject to availability. Warranty not confirmed.",
  },
  {
    slug: "shower-bases",
    label: "Shower Bases",
    href: "/products/shower/shower-bases",
    description: "One 60 × 30 shower base configuration with three drain variations.",
    images: [],
    productNote:
      "Center Drain, Left Drain, and Right Drain are product variations, not additional categories. Brand and pricing details are not yet confirmed.",
  },
];

const furnitureSubcategories: readonly Subcategory[] = [
  "Sofa",
  "Chairs",
  "Dressers & Cabinets",
  "Beds",
  "Mattresses",
  "Patio Furniture",
  "Dining Tables",
  "Pet Furniture",
]
  .map((label) => {
    const slug = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return {
      slug,
      label,
      href: `/products/furniture/${slug}`,
      description: `Curated ${label.toLowerCase()} gallery for the current showroom selection.`,
      images: [],
    };
  })
  .map((subcategory) =>
    subcategory.slug === "sofa"
      ? {
          ...subcategory,
          heroImages: assetManifest.sofa,
          notice:
            "Explore photographs of sofa styles featured in our showroom. Inventory changes frequently, so please call to confirm current availability.",
        }
      : subcategory.slug === "chairs"
        ? { ...subcategory, heroImages: assetManifest.chairs }
        : subcategory.slug === "dressers-cabinets"
          ? { ...subcategory, heroImages: assetManifest.dresserCabinets }
          : subcategory.slug === "beds"
            ? { ...subcategory, heroImages: assetManifest.beds }
            : subcategory.slug === "mattresses"
              ? { ...subcategory, heroImages: assetManifest.mattresses }
              : subcategory.slug === "patio-furniture"
                ? { ...subcategory, heroImages: assetManifest.patioFurniture }
                : subcategory.slug === "dining-tables"
                  ? { ...subcategory, heroImages: assetManifest.diningTables }
                  : subcategory.slug === "pet-furniture"
                    ? { ...subcategory, heroImages: assetManifest.petFurniture }
                    : subcategory,
  );

function makeCategory(input: {
  slug: string;
  label: string;
  description: string;
  heroImage: Media;
  images: readonly Media[];
  subcategories?: readonly Subcategory[];
  notice?: string | undefined;
  assetGap?: string | undefined;
  overviewTitle: string;
  overviewCopy: string[];
  overviewPoints: { title: string; copy: string }[];
}): Category {
  const subcategories = input.subcategories ?? [];
  const findings = subcategories.map((subcategory) => ({
    title: subcategory.label,
    copy: subcategory.description,
    bullets: [
      inventoryNote,
      "Call ahead for the current selection",
      "Visit the showroom to inspect merchandise in person",
    ],
    image: subcategory.images[0] ?? input.heroImage,
  }));
  return {
    slug: input.slug,
    href: `/products/${input.slug}`,
    navLabel: input.label,
    fullLabel: input.label,
    index: "",
    description: input.description,
    metaTitle: `${input.label} | HI Liquidation Home Outlet`,
    metaDescription: `${input.description} Visit HI Liquidation Home Outlet in Riverdale, GA or call to confirm current availability.`,
    eyebrow: `HI Liquidation · ${input.label}`,
    h1: input.label,
    heroCopy: input.description,
    heroImage: input.heroImage,
    overviewTitle: input.overviewTitle,
    overviewCopy: input.overviewCopy,
    overviewPoints: input.overviewPoints,
    findingsTitle: subcategories.length ? `Browse ${input.label}` : `${input.label} gallery`,
    findingsIntro: input.notice ?? inventoryNote,
    findings,
    galleryTitle: `${input.label} in the showroom`,
    gallery: input.images,
    planning: [
      {
        title: "Call before you visit",
        copy: "Inventory moves quickly. Use the store number to confirm a particular item, color, or model before traveling.",
      },
      {
        title: "See it in person",
        copy: "Gallery photos show the types of merchandise carried and may not represent current availability.",
      },
    ],
    faqs: [
      {
        q: `Is ${input.label.toLowerCase()} always in stock?`,
        a: "No. Selection changes as merchandise arrives and sells. Call the showroom before visiting to check a particular item.",
      },
      {
        q: "Can I buy online?",
        a: "This is a product-showcase website. It does not provide online checkout, live stock counts, or customer accounts.",
      },
    ],
    related: [
      {
        label: "Browse all products",
        href: "/products",
        copy: "See all eight main categories.",
      },
      {
        label: "Visit the gallery",
        href: "/gallery",
        copy: "Review genuine showroom photography.",
      },
    ],
    ctaTitle: "Find something you love? Check availability before you visit.",
    ctaCopy: "Call the Riverdale showroom to confirm current selection before making the trip.",
    ctaPrimary: { label: "Call Now", href: callNow },
    ctaSecondary: { label: "Get Directions", href: mapsDirections },
    subcategories,
    notice: input.notice,
    assetGap: input.assetGap,
  };
}

export const categories: Category[] = [
  makeCategory({
    slug: "shower",
    label: "Shower",
    description:
      "Browse shower doors, shower walls, and shower bases, then call to confirm specific models or variations.",
    heroImage: assetManifest.showroom.hero,
    images: [],
    subcategories: showerSubcategories,
    assetGap:
      "No client-supplied shower product photos were included in the current archives. Model photography and confirmed shower-base details are awaiting client or supplier assets.",
    overviewTitle: "Call ahead for shower selections",
    overviewCopy: [
      "The Shower category brings the available product structure into one place without presenting unconfirmed inventory as guaranteed stock.",
      "Shower door models, shower wall set details, and shower-base variations are listed only where the brief provides confirmed information.",
    ],
    overviewPoints: [
      {
        title: "Five shower door references",
        copy: "DS01, DS08, SS04, SS14, and DS10 are the only model references shown.",
      },
      {
        title: "Walls sold as a set",
        copy: "The PVC wall option is one complete three-piece set, not separate panels.",
      },
      {
        title: "Bases have drain variations",
        copy: "Center, left, and right drain options stay within the Shower Bases page.",
      },
    ],
  }),
  makeCategory({
    slug: "flooring",
    label: "Flooring",
    description:
      "See genuine flooring samples and showroom stacks. Colors, labels, and selection can change quickly.",
    heroImage: assetManifest.flooring[0]!,
    images: assetManifest.flooring,
    subcategories: [
      {
        slug: "flooring",
        label: "Flooring",
        href: "/products/flooring",
        description: "One flooring gallery with real sample and boxed-flooring photography.",
        images: assetManifest.flooring,
      },
    ],
    notice:
      "Our flooring selection and availability may change as inventory moves quickly. If you have a specific color or style in mind, please call us ahead of your visit to confirm availability.",
    overviewTitle: "Flooring samples, photographed in the store",
    overviewCopy: [
      "The supplied flooring archive captures real samples, boxes, labels, and showroom stacks. Use the gallery to get oriented, then call before visiting for a specific color or style.",
      inventoryNote,
    ],
    overviewPoints: [
      {
        title: "Real sample boards",
        copy: "Photos show the textures and tones visible in the supplied store archive.",
      },
      {
        title: "Labels can change",
        copy: "Visible labels are not treated as a published catalog or price list.",
      },
      {
        title: "Call before traveling",
        copy: "Selection changes as flooring arrives and sells.",
      },
    ],
  }),
  makeCategory({
    slug: "bathroom-kitchen",
    label: "Bathroom & Kitchen",
    description:
      "Curated galleries for bathroom vanities, kitchen cabinets, and other bathroom or kitchen pieces.",
    heroImage: assetManifest.kitchenCabinets[0]!,
    images: [
      ...assetManifest.bathroomVanities,
      ...assetManifest.kitchenCabinets,
      ...assetManifest.bathroomKitchenOthers,
    ],
    subcategories: [
      {
        slug: "bathroom-vanities",
        label: "Bathroom Vanities",
        href: "/products/bathroom-kitchen/bathroom-vanities",
        description: "Vanity displays and finishes photographed on the showroom floor.",
        images: assetManifest.bathroomVanities,
      },
      {
        slug: "kitchen-cabinets",
        label: "Kitchen Cabinets",
        href: "/products/bathroom-kitchen/kitchen-cabinets",
        description: "Cabinet runs, doors, boxes, and finishes photographed in store.",
        images: assetManifest.kitchenCabinets,
      },
      {
        slug: "others",
        label: "Others",
        href: "/products/bathroom-kitchen/others",
        description: "Vanity tops, mirrors, sinks, faucets, and other relevant pieces.",
        images: assetManifest.bathroomKitchenOthers,
      },
    ],
    notice: inventoryNote,
    overviewTitle: "See the displays, then confirm what is available",
    overviewCopy: [
      "The supplied Bathroom & Kitchen archive is separated into Bathroom Vanities, Kitchen Cabinets, and Others so vanity, cabinet, and miscellaneous pieces are not mixed merely to fill a grid.",
      "Individual colors, sizes, brands, and prices are not published unless confirmed by the client.",
    ],
    overviewPoints: [
      {
        title: "Curated photo grids",
        copy: "The galleries are organized by the three approved subcategories.",
      },
      {
        title: "Real showroom photography",
        copy: "Images come from the supplied store archive.",
      },
      {
        title: "Inventory changes",
        copy: "Call ahead to confirm current selection.",
      },
    ],
  }),
  makeCategory({
    slug: "lights-fans",
    label: "Lights & Fans",
    description:
      "A combined category for lighting and fan products when suitable merchandise is available in the showroom.",
    heroImage: assetManifest.appliances[2]!,
    images: [assetManifest.appliances[2]!, assetManifest.appliances[3]!],
    notice: inventoryNote,
    assetGap:
      "No dedicated Lights & Fans archive was supplied. The page uses genuine fan-display photos from the Appliances archive while lighting photography is awaiting confirmation.",
    overviewTitle: "A combined category with limited supplied photography",
    overviewCopy: [
      "The current archive includes genuine portable fan and air-treatment displays that can help identify the type of merchandise to ask about. No separate lighting set was supplied.",
      "Call the showroom to confirm what is currently available.",
    ],
    overviewPoints: [
      {
        title: "One combined gallery",
        copy: "Lights and fans are not split into additional navigation levels.",
      },
      {
        title: "Fan imagery is genuine",
        copy: "The supplied appliance archive includes visible fan displays.",
      },
      {
        title: "Lighting assets pending",
        copy: "No dedicated lighting photographs were found in the supplied archives.",
      },
    ],
  }),
  makeCategory({
    slug: "furniture",
    label: "Furniture",
    description:
      "Curated showroom sections for sofas, chairs, beds, dining, patio, storage, mattresses, and pet furniture.",
    heroImage: assetManifest.showroom.hero,
    images: [],
    subcategories: furnitureSubcategories,
    notice:
      "Our furniture selection changes daily as new items arrive and others sell quickly. Photos are provided to showcase the types of furniture we carry and may not reflect current availability. Please visit our store or call us during business hours to check what's currently available.",
    overviewTitle: "Furniture is a showroom category, not live inventory",
    overviewCopy: [
      "Furniture remains one of the eight main categories, with the requested eight subcategories available as clear navigation. No unrelated stock photography is used to represent furniture inventory.",
      "Call or visit the showroom to see the current selection.",
    ],
    overviewPoints: [
      {
        title: "Eight sections",
        copy: "Sofa, Chairs, Dressers & Cabinets, Beds, Mattresses, Patio Furniture, Dining Tables, and Pet Furniture.",
      },
      {
        title: "Selection changes daily",
        copy: "The gallery and availability disclaimer are intentionally prominent.",
      },
      {
        title: "See pieces in person",
        copy: "The showroom is the source of truth for current selection.",
      },
    ],
  }),
  makeCategory({
    slug: "doors",
    label: "Doors",
    description:
      "Browse genuine door photographs from the supplied showroom archive in one organized gallery.",
    heroImage: assetManifest.doors[4]!,
    images: assetManifest.doors,
    notice: inventoryNote,
    overviewTitle: "Real doors on the showroom floor",
    overviewCopy: [
      "The supplied Doors archive shows doors, boxed pieces, and displays in the warehouse. It is organized as one gallery without adding unsupported door-type navigation.",
      "Descriptions stay grounded in what is visibly shown; current models and availability should be confirmed by phone.",
    ],
    overviewPoints: [
      {
        title: "One doors gallery",
        copy: "Interior, exterior, storm, bifold, closet, and security descriptions are not separate navigation levels.",
      },
      {
        title: "Store photography",
        copy: "The gallery uses the supplied door archive.",
      },
      {
        title: "Call before visiting",
        copy: "Selection is not guaranteed by the photographs.",
      },
    ],
  }),
  makeCategory({
    slug: "appliances",
    label: "Appliances",
    description:
      "Browse genuine appliance-display photography, including small household and air-treatment merchandise when present.",
    heroImage: assetManifest.appliances[0]!,
    images: assetManifest.appliances,
    notice: inventoryNote,
    overviewTitle: "Appliances, kept separate from Home Essentials",
    overviewCopy: [
      "The supplied Appliances archive shows real showroom displays of small household and air-treatment products. It is presented as one gallery rather than individual product pages or inventory counts.",
      "Product identity, condition, and current availability should be confirmed directly with the showroom.",
    ],
    overviewPoints: [
      {
        title: "One combined gallery",
        copy: "No permanent appliance subcategories or item pages are published.",
      },
      {
        title: "Real display photos",
        copy: "The gallery uses the supplied Appliances archive.",
      },
      {
        title: "No live stock promises",
        copy: "Call ahead for a particular product.",
      },
    ],
  }),
  makeCategory({
    slug: "home-essentials",
    label: "Home Essentials",
    description:
      "A combined category for storage, seasonal, outdoor, tools, shelving, ladders, and related home utility merchandise.",
    heroImage: assetManifest.showroom.hero,
    images: [],
    notice: inventoryNote,
    assetGap:
      "No dedicated Home Essentials photography was included in the current archives. Matching images are awaiting client assets.",
    overviewTitle: "Miscellaneous home and utility finds",
    overviewCopy: [
      "Home Essentials is kept separate from Appliances for miscellaneous home and utility products that do not fit elsewhere. No unrelated photographs are used to suggest current stock.",
      "Call or visit the showroom to ask what has arrived recently.",
    ],
    overviewPoints: [
      {
        title: "One combined category",
        copy: "Storage, seasonal, outdoor, tools, shelving, ladders, and related goods remain gallery content, not navigation levels.",
      },
      {
        title: "No fabricated inventory",
        copy: "Product names, prices, and counts are not inferred from the category label.",
      },
      {
        title: "Call ahead",
        copy: "The selection changes as merchandise moves.",
      },
    ],
  }),
].map((category, index) => ({ ...category, index: String(index + 1).padStart(2, "0") }));

export function getCategory(slug: string): Category {
  const aliases: Record<string, string> = {
    "shower-doors": "shower",
    "vinyl-flooring": "flooring",
    "shower-walls-panels": "shower",
    "kitchen-cabinets": "bathroom-kitchen",
  };
  const category = categories.find((item) => item.slug === (aliases[slug] ?? slug));
  if (!category) throw new Error(`Unknown category: ${slug}`);
  return category;
}

export const categoryByPath = new Map<string, { category: Category; subcategory?: Subcategory }>(
  categories.flatMap((category) => [
    [category.href, { category }] as const,
    ...category.subcategories.map(
      (subcategory) => [subcategory.href, { category, subcategory }] as const,
    ),
  ]),
);

export type GalleryFilter = "All" | Category["fullLabel"];
export const galleryFilters: GalleryFilter[] = [
  "All",
  ...categories.map((category) => category.fullLabel as GalleryFilter),
];

export type GalleryItem = Media & {
  tag: Exclude<GalleryFilter, "All">;
  caption: string;
  kind?: "image" | "video";
  poster?: string;
  orientation?: "portrait" | "landscape";
};

export const galleryItems: GalleryItem[] = [
  ...assetManifest.flooring.map((item) => ({
    ...item,
    tag: "Flooring" as const,
    caption: item.caption ?? "Flooring sample",
  })),
  ...assetManifest.bathroomVanities.map((item) => ({
    ...item,
    tag: "Bathroom & Kitchen" as const,
    caption: "Bathroom vanity display",
  })),
  ...assetManifest.kitchenCabinets.map((item) => ({
    ...item,
    tag: "Bathroom & Kitchen" as const,
    caption: "Kitchen cabinet display",
  })),
  ...assetManifest.bathroomKitchenOthers.map((item) => ({
    ...item,
    tag: "Bathroom & Kitchen" as const,
    caption: "Bathroom and kitchen display",
  })),
  ...assetManifest.doors.map((item) => ({
    ...item,
    tag: "Doors" as const,
    caption: "Door display",
  })),
  ...assetManifest.appliances.map((item) => ({
    ...item,
    tag: "Appliances" as const,
    caption: "Appliance display",
  })),
  {
    ...assetManifest.showroom.cabinets,
    tag: "Bathroom & Kitchen" as const,
    caption: "Actual cabinet showroom display",
  },
  {
    ...assetManifest.showroom.vanity,
    tag: "Bathroom & Kitchen" as const,
    caption: "Actual bathroom vanity display",
  },
];
