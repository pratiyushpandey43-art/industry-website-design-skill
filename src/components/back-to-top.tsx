import { useEffect, useState } from "react";
import { ArrowUp } from "@/components/icons";

/**
 * Floating back-to-top button. Appears after the user scrolls down and
 * fades out near the top. Respects reduced-motion via CSS transitions.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink shadow-card transition-all duration-300 hover:border-ink hover:bg-canvas lg:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
