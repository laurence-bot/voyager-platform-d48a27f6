import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { continents } from "@/data/destinations";

/**
 * Fil d'Ariane automatique, déduit de l'URL.
 * Apparaît sur toutes les pages sauf l'accueil, après scroll (>250px).
 */

const STATIC_LABELS: Record<string, string> = {
  "voyage-sur-mesure": "Voyage sur mesure",
  experiences: "Expériences",
  "blog-agence-voyage": "Blog",
  "a-propos-de-nous": "L'agence",
  "demande-de-devis": "Devis",
  "prise-de-rendez-vous": "Rendez-vous",
  "mentions-legales": "Mentions légales",
  "politiques-de-confidentialite": "Confidentialité",
  contact: "Contact",
  espace: "Espace voyageur",
  "agence-cassis": "Agence de Cassis",
  agence: "Agence",
};

function prettify(slug: string) {
  if (STATIC_LABELS[slug]) return STATIC_LABELS[slug];
  // Continent ?
  const c = continents.find((x) => x.slug === slug);
  if (c) return c.name;
  // Pays ?
  for (const cont of continents) {
    const p = cont.pays.find((x) => x.slug === slug);
    if (p) return p.name;
  }
  // Itinéraire ou autre slug : capitaliser
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AutoBreadcrumb() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 250);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/" || pathname === "") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: prettify(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
    current: i === segments.length - 1,
  }));

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else if (crumbs.length > 1) {
      router.navigate({ to: crumbs[crumbs.length - 2].href });
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <div
      className={`fixed top-[68px] md:top-[76px] inset-x-0 z-40 bg-cream/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      aria-label="Fil d'Ariane"
    >
      <nav className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-5 md:px-12 py-2.5 flex gap-2 items-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground overflow-x-auto whitespace-nowrap">
        <button
          type="button"
          onClick={goBack}
          aria-label="Retour à la page précédente"
          className="flex items-center justify-center h-7 w-7 -ml-1 mr-1 rounded-full border border-border text-clay hover:text-ink hover:border-ink hover:bg-sand/40 transition shrink-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
        <Link to="/" className="hover:text-ink transition">
          Accueil
        </Link>
        {crumbs.map((c, i) => (
          <span key={i} className="contents">
            <span className="text-clay/50">/</span>
            {c.current ? (
              <span className="text-ink font-semibold" aria-current="page">
                {c.label}
              </span>
            ) : (
              <a href={c.href} className="text-clay hover:text-ink transition">
                {c.label}
              </a>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
