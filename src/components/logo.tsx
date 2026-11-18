import { Link } from "@tanstack/react-router";

export const BRAND_LOGO_SRC =
  "https://vibe.filesafe.space/1794507625066072152/assets/7016d48f-db80-4b06-b701-3548cb3689ca.webp";

/**
 * Authentic HI Liquidation circular badge logo directly from the live Vercel site.
 * Displays the circular red/black emblem with the house icon & "HI Liquidation Home Outlet".
 */
export function Logo({
  size = "md",
  onNavigate,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const sizeClass =
    size === "sm"
      ? "h-12 w-12 sm:h-[52px] sm:w-[52px] lg:h-16 lg:w-16"
      : size === "lg"
        ? "h-20 w-20 sm:h-24 sm:w-24"
        : "h-14 w-14 sm:h-16 sm:w-16";

  return (
    <Link
      to="/"
      onClick={onNavigate}
      aria-label="HI Liquidation Home Outlet — home"
      className={`group inline-flex items-center rounded-sm focus-visible:outline-offset-4 ${className}`}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt="HI Liquidation Home Outlet logo"
        width={64}
        height={64}
        loading="eager"
        decoding="async"
        className={`rounded-full object-contain ${sizeClass} transition-transform duration-200 group-hover:scale-105`}
      />
    </Link>
  );
}
