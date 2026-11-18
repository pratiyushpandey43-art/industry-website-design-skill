import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Restrained route transition: a short fade/translate on each new page.
 * It never delays navigation, intercepts clicks, or blocks scrolling,
 * and CSS disables the animation for reduced-motion users.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
