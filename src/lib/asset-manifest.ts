export type Asset = {
  src: string;
  alt: string;
  caption?: string;
};

const V = "https://hi-liquidation-website-development.vercel.app/media";

const showroomHero: Asset = {
  src: `${V}/showroom-wide-view.webp`,
  alt: "Wide view of cabinet displays inside the HI Liquidation Riverdale showroom",
  caption: "Actual showroom floor",
};

const showroomCabinets: Asset = {
  src: `${V}/showroom-wide-cabinets.webp`,
  alt: "Cabinet displays inside the HI Liquidation showroom",
  caption: "Cabinet displays",
};

const showroomVanity: Asset = {
  src: `${V}/showroom-wide-view.webp`,
  alt: "Bathroom vanity display inside the HI Liquidation showroom",
  caption: "Vanity display",
};

const showroomFinishes: Asset = {
  src: `${V}/showroom-wide-cabinets.webp`,
  alt: "Finish and material samples inside the HI Liquidation showroom",
  caption: "Finish samples",
};

function floor(n: number): Asset {
  return {
    src: `${V}/client/flooring-0${n}.webp`,
    alt: `Flooring sample ${n} on display at HI Liquidation`,
    caption: "Flooring sample",
  };
}

function door(n: number): Asset {
  return {
    src: `${V}/client/doors-0${n}.webp`,
    alt: `Door display ${n} at HI Liquidation`,
    caption: "Door display",
  };
}

function appliance(n: number): Asset {
  return {
    src: `${V}/client/appliances-0${n}.webp`,
    alt: `Appliance display ${n} at HI Liquidation`,
    caption: "Appliance display",
  };
}

function vanity(n: number): Asset {
  return {
    src: `${V}/client/bathroom-vanities-0${n}.webp`,
    alt: `Bathroom vanity display ${n} at HI Liquidation`,
    caption: "Bathroom vanity display",
  };
}

function kitchenCabinet(n: number): Asset {
  return {
    src: `${V}/client/kitchen-cabinets-0${n}.webp`,
    alt: `Kitchen cabinet display ${n} at HI Liquidation`,
    caption: "Kitchen cabinet display",
  };
}

function other(n: number): Asset {
  return {
    src: `${V}/client/others-0${n}.webp`,
    alt: `Bathroom and kitchen accessory ${n} at HI Liquidation`,
    caption: "Bathroom and kitchen display",
  };
}

const localFurniturePhotoDescriptions = {
  sofa: [
    "rows of wrapped white, pink, blue, and neutral sofas across the showroom floor",
    "rows of wrapped blue, white, and cream sofas in the showroom",
    "a wide showroom view of sofas in white, cream, gray, and dark upholstery",
    "a wide showroom view of wrapped sofas in neutral and muted colors",
    "a wide showroom view of assorted wrapped sofas and ottomans",
  ],
  chair: [
    "rows of white upholstered chairs and bar stools",
    "white upholstered chairs with wood-tone and black-frame seating",
    "tufted neutral upholstered seating beside other showroom chairs",
    "a wide showroom view of assorted chairs and recliners",
    "assorted upholstered accent chairs and recliners on the showroom floor",
    "a wide showroom view of rows of chairs in varied colors and materials",
    "rows of assorted accent chairs and recliners",
  ],
  "dresser-cabinet": [
    "white, black, and wood-tone dressers and cabinets across the showroom floor",
    "a row of light wood, white, and dark storage pieces",
    "mixed wood-tone dressers, cabinets, and storage tables",
    "a row of neutral dressers and cabinets in the showroom",
    "white cabinet displays beside dark storage pieces in a showroom aisle",
    "white shelving and tall dark cabinetry in the showroom",
    "tall dark and light cabinets lining a showroom aisle",
  ],
  bed: [
    "exposed wooden bed frames, a gray upholstered bed, and black metal frames",
    "mixed black metal and wood bed frames with mattresses in the showroom",
    "white and dark metal bed frames with upholstered headboards",
    "assorted bed frames and mattresses, including white and black metal beds",
  ],
  mattress: [
    "wrapped mattress cartons and boxed inventory in the showroom",
    "a mattress surface with handwritten size labels",
    "wrapped mattress cartons stacked in the showroom",
    "a mattress close-up with handwritten size labels",
    "boxed mattress inventory stacked in the showroom",
    "a mattress close-up with handwritten size labels",
    "a wrapped mattress carton among showroom inventory",
    "assorted boxed mattresses in the showroom",
    "stacked mattress cartons with visible product packaging",
    "boxed mattresses arranged in a warehouse aisle",
    "wrapped white mattresses displayed on the showroom floor",
    "a pallet of boxed mattresses with packaging labels",
    "a mattress close-up with handwritten size labels",
  ],
  "patio-furniture": [
    "black mesh patio chairs arranged on the showroom floor",
    "an outdoor dining table and chair set",
    "colorful patio umbrellas displayed overhead",
    "a black mesh lounge chair in a patio furniture display",
    "neutral outdoor sofas and tables",
    "mixed patio tables, chairs, and lounge furniture",
    "patio furniture displays with umbrellas and tables",
    "a wicker outdoor seating set with cushions",
    "blue-cushioned wicker patio chairs and a table",
    "a vertical display of patio umbrellas and outdoor items",
    "neutral outdoor lounge furniture in the showroom",
    "rows of wicker and metal patio chairs",
    "patio umbrellas and outdoor displays across the showroom",
    "a hanging outdoor chair beside patio umbrellas",
  ],
  "dining-table": [
    "black rectangular and marble-top dining tables with chairs in the showroom",
    "a black oval dining table with white woven chairs",
    "a round white dining table with wrapped chairs",
    "a black oval dining table with white woven chairs on display",
    "a round light wood dining table with a gold pedestal base",
    "rows of black, gray, and wood-tone dining tables in the showroom",
    "a black rectangular dining table on casters in the showroom",
  ],
  "pet-furniture": [
    "white and taupe enclosed pet houses with a matching pet bed and tables in the showroom",
    "a black pet cage beside elevated pet beds, stairs, and outdoor-style tables in the showroom",
  ],
} as const;

function localFurniturePhoto(
  kind:
    | "sofa"
    | "chair"
    | "dresser-cabinet"
    | "bed"
    | "mattress"
    | "patio-furniture"
    | "dining-table"
    | "pet-furniture",
  n: number,
): Asset {
  const label =
    kind === "sofa"
      ? "sofa"
      : kind === "chair"
        ? "chair"
        : kind === "dresser-cabinet"
          ? "dresser and cabinet"
          : kind === "bed"
            ? "bed"
            : kind === "mattress"
              ? "mattress"
              : kind === "patio-furniture"
                ? "patio furniture"
                : kind === "dining-table"
                  ? "dining table"
                  : "pet furniture";
  const folder =
    kind === "sofa"
      ? "sofa"
      : kind === "chair"
        ? "chairs"
        : kind === "dresser-cabinet"
          ? "dressers-cabinets"
          : kind === "bed"
            ? "beds"
            : kind === "mattress"
              ? "mattresses"
              : kind === "patio-furniture"
                ? "patio-furniture"
                : kind === "dining-table"
                  ? "dining-tables"
                  : "pet-furniture";
  const fileStem =
    kind === "dresser-cabinet"
      ? "dresser-cabinet"
      : kind === "patio-furniture"
        ? "patio-furniture"
        : kind === "dining-table"
          ? "dining-table"
          : kind === "pet-furniture"
            ? "pet-furniture"
            : label;
  const description = localFurniturePhotoDescriptions[kind][n - 1];
  return {
    src: `/assets/${folder}/${fileStem}-${String(n).padStart(2, "0")}.jpg`,
    alt: `Authentic ${label} showroom photograph showing ${description} at HI Liquidation Home Outlet`,
    caption: `${label[0].toUpperCase()}${label.slice(1)} showroom photograph`,
  };
}

export const assetManifest = {
  showroom: {
    hero: showroomHero,
    cabinets: showroomCabinets,
    vanity: showroomVanity,
    finishes: showroomFinishes,
  },
  flooring: [
    floor(1),
    floor(2),
    floor(3),
    floor(4),
    floor(5),
    floor(6),
    floor(7),
    floor(8),
    floor(9),
    floor(10),
    floor(11),
    floor(12),
    floor(13),
    floor(14),
  ],
  doors: [door(1), door(2), door(3), door(4), door(5), door(6), door(7)],
  appliances: [appliance(1), appliance(2), appliance(3), appliance(4), appliance(5)],
  bathroomVanities: [vanity(1), vanity(2), vanity(3), vanity(4), vanity(5)],
  kitchenCabinets: [
    kitchenCabinet(1),
    kitchenCabinet(2),
    kitchenCabinet(3),
    kitchenCabinet(4),
    kitchenCabinet(5),
    kitchenCabinet(6),
    kitchenCabinet(7),
    kitchenCabinet(8),
    kitchenCabinet(9),
    kitchenCabinet(10),
    kitchenCabinet(11),
  ],
  bathroomKitchenOthers: [other(1), other(2), other(3), other(4), other(5), other(6)],
  sofa: [
    localFurniturePhoto("sofa", 1),
    localFurniturePhoto("sofa", 2),
    localFurniturePhoto("sofa", 3),
    localFurniturePhoto("sofa", 4),
    localFurniturePhoto("sofa", 5),
  ],
  chairs: [
    localFurniturePhoto("chair", 1),
    localFurniturePhoto("chair", 2),
    localFurniturePhoto("chair", 3),
    localFurniturePhoto("chair", 4),
    localFurniturePhoto("chair", 5),
    localFurniturePhoto("chair", 6),
    localFurniturePhoto("chair", 7),
  ],
  dresserCabinets: [
    localFurniturePhoto("dresser-cabinet", 1),
    localFurniturePhoto("dresser-cabinet", 2),
    localFurniturePhoto("dresser-cabinet", 3),
    localFurniturePhoto("dresser-cabinet", 4),
    localFurniturePhoto("dresser-cabinet", 5),
    localFurniturePhoto("dresser-cabinet", 6),
    localFurniturePhoto("dresser-cabinet", 7),
  ],
  beds: [
    localFurniturePhoto("bed", 1),
    localFurniturePhoto("bed", 2),
    localFurniturePhoto("bed", 3),
    localFurniturePhoto("bed", 4),
  ],
  mattresses: [
    localFurniturePhoto("mattress", 1),
    localFurniturePhoto("mattress", 2),
    localFurniturePhoto("mattress", 3),
    localFurniturePhoto("mattress", 4),
    localFurniturePhoto("mattress", 5),
    localFurniturePhoto("mattress", 6),
    localFurniturePhoto("mattress", 7),
    localFurniturePhoto("mattress", 8),
    localFurniturePhoto("mattress", 9),
    localFurniturePhoto("mattress", 10),
    localFurniturePhoto("mattress", 11),
    localFurniturePhoto("mattress", 12),
    localFurniturePhoto("mattress", 13),
  ],
  patioFurniture: [
    localFurniturePhoto("patio-furniture", 1),
    localFurniturePhoto("patio-furniture", 2),
    localFurniturePhoto("patio-furniture", 3),
    localFurniturePhoto("patio-furniture", 4),
    localFurniturePhoto("patio-furniture", 5),
    localFurniturePhoto("patio-furniture", 6),
    localFurniturePhoto("patio-furniture", 7),
    localFurniturePhoto("patio-furniture", 8),
    localFurniturePhoto("patio-furniture", 9),
    localFurniturePhoto("patio-furniture", 10),
    localFurniturePhoto("patio-furniture", 11),
    localFurniturePhoto("patio-furniture", 12),
    localFurniturePhoto("patio-furniture", 13),
    localFurniturePhoto("patio-furniture", 14),
  ],
  diningTables: [
    localFurniturePhoto("dining-table", 1),
    localFurniturePhoto("dining-table", 2),
    localFurniturePhoto("dining-table", 3),
    localFurniturePhoto("dining-table", 4),
    localFurniturePhoto("dining-table", 5),
    localFurniturePhoto("dining-table", 6),
    localFurniturePhoto("dining-table", 7),
  ],
  petFurniture: [localFurniturePhoto("pet-furniture", 1), localFurniturePhoto("pet-furniture", 2)],
} as const;
