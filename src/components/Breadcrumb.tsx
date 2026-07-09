import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export type Crumb =
  | { label: string; to: "/"; params?: never }
  | { label: string; to: "/voyage-sur-mesure" }
  | { label: string; to: "/voyage-sur-mesure/$continent"; params: { continent: string } }
  | {
      label: string;
      to: "/voyage-sur-mesure/$continent/$pays";
      params: { continent: string; pays: string };
    }
  | { label: string; current: true };

type Props = {
  items: Crumb[];
  /** Apparait uniquement après scroll (au-dessous du hero). */
  sticky?: boolean;
};

/**
 * Fil d'Ariane fin et persistant, affiché sous le header.
 * Réutilisable sur toutes les pages destinations / itinéraires.
 */
export function Breadcrumb({ items, sticky = true }: Props) {
  const [show, setShow] = useState(!sticky);

  useEffect(() => {
    if (!sticky) return;
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sticky]);

  return (
    <div
      className={`fixed top-[68px] md:top-[76px] inset-x-0 z-40 bg-cream/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      aria-label="Fil d'Ariane"
    >
      <nav className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-5 md:px-12 py-2.5 flex gap-2 items-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground overflow-x-auto whitespace-nowrap">
        {items.map((c, i) => {
          const sep = i > 0 && <span className="text-clay/50">/</span>;
          if ("current" in c) {
            return (
              <span key={i} className="contents">
                {sep}
                <span className="text-clay" aria-current="page">
                  {c.label}
                </span>
              </span>
            );
          }
          // Type-safe Link rendering
          if (c.to === "/") {
            return (
              <span key={i} className="contents">
                {sep}
                <Link to="/" className="hover:text-ink transition">
                  {c.label}
                </Link>
              </span>
            );
          }
          if (c.to === "/voyage-sur-mesure") {
            return (
              <span key={i} className="contents">
                {sep}
                <Link to="/voyage-sur-mesure" className="hover:text-ink transition">
                  {c.label}
                </Link>
              </span>
            );
          }
          if (c.to === "/voyage-sur-mesure/$continent") {
            return (
              <span key={i} className="contents">
                {sep}
                <Link
                  to="/voyage-sur-mesure/$continent"
                  params={c.params}
                  className="hover:text-ink transition"
                >
                  {c.label}
                </Link>
              </span>
            );
          }
          return (
            <span key={i} className="contents">
              {sep}
              <Link
                to="/voyage-sur-mesure/$continent/$pays"
                params={c.params}
                className="hover:text-ink transition"
              >
                {c.label}
              </Link>
            </span>
          );
        })}
      </nav>
    </div>
  );
}
