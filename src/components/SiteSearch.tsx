import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { continents } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { articles } from "@/data/blog";

type Result = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  to: string;
  params?: Record<string, string>;
  haystack: string;
};

function buildIndex(): Result[] {
  const items: Result[] = [];

  for (const c of continents) {
    items.push({
      id: `c-${c.slug}`,
      title: c.name,
      subtitle: "Continent",
      category: "Destinations",
      to: "/voyage-sur-mesure/$continent",
      params: { continent: c.slug },
      haystack: `${c.name} ${c.intro}`.toLowerCase(),
    });
    for (const p of c.pays) {
      items.push({
        id: `p-${c.slug}-${p.slug}`,
        title: p.name,
        subtitle: `${c.name} · ${p.tagline}`,
        category: "Pays",
        to: "/voyage-sur-mesure/$continent/$pays",
        params: { continent: c.slug, pays: p.slug },
        haystack: `${p.name} ${p.tagline} ${p.intro} ${(p.highlights || []).join(" ")}`.toLowerCase(),
      });
      const itineraires = p.detailed?.itineraires || [];
      for (const it of itineraires) {
        items.push({
          id: `i-${p.slug}-${it.slug}`,
          title: it.title,
          subtitle: `Itinéraire · ${p.name} · ${it.duration}`,
          category: "Itinéraires",
          to: "/voyage-sur-mesure/$continent/$pays/$itineraire",
          params: { continent: c.slug, pays: p.slug, itineraire: it.slug },
          haystack: `${it.title} ${it.pitch} ${p.name}`.toLowerCase(),
        });
      }
    }
  }

  for (const e of experiences) {
    items.push({
      id: `e-${e.slug}`,
      title: e.name,
      subtitle: e.tagline,
      category: "Expériences",
      to: "/experiences/$experience",
      params: { experience: e.slug },
      haystack: `${e.name} ${e.tagline} ${e.intro} ${e.destinations.join(" ")}`.toLowerCase(),
    });
  }

  for (const a of articles) {
    items.push({
      id: `a-${a.slug}`,
      title: a.title,
      subtitle: `Journal · ${a.category}`,
      category: "Journal",
      to: "/blog-agence-voyage/$slug",
      params: { slug: a.slug },
      haystack: `${a.title} ${a.excerpt} ${a.category}`.toLowerCase(),
    });
  }

  const pages: Array<Omit<Result, "haystack"> & { keywords: string }> = [
    { id: "pg-devis", title: "Demande de devis", subtitle: "Construire votre voyage sur mesure", category: "Pages", to: "/demande-de-devis", keywords: "devis voyage sur mesure contact" },
    { id: "pg-rdv", title: "Prendre rendez-vous", subtitle: "Échanger avec Laurence", category: "Pages", to: "/prise-de-rendez-vous", keywords: "rendez-vous appel agence" },
    { id: "pg-agence", title: "L'agence", subtitle: "À propos de La Voyagerie", category: "Pages", to: "/a-propos-de-nous", keywords: "agence laurence cassis à propos" },
    { id: "pg-blog", title: "Le journal", subtitle: "Carnets et inspirations", category: "Pages", to: "/blog-agence-voyage", keywords: "blog journal carnet" },
    { id: "pg-experiences", title: "Expériences", subtitle: "Toutes les expériences de voyage", category: "Pages", to: "/experiences", keywords: "expériences safari trek" },
    { id: "pg-espace", title: "Espace voyageur", subtitle: "Suivre vos demandes", category: "Pages", to: "/espace", keywords: "espace client compte connexion" },
  ];
  for (const p of pages) {
    items.push({ ...p, haystack: `${p.title} ${p.subtitle} ${p.keywords}`.toLowerCase() });
  }

  return items;
}

export function SiteSearch({ variant = "header" }: { variant?: "header" | "mobile" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const index = useMemo(() => buildIndex(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Result[];
    const tokens = q.split(/\s+/).filter(Boolean);
    const scored = index
      .map((r) => {
        let score = 0;
        for (const t of tokens) {
          if (!r.haystack.includes(t)) return { r, score: -1 };
          if (r.title.toLowerCase().includes(t)) score += 5;
          if (r.subtitle.toLowerCase().includes(t)) score += 2;
          score += 1;
        }
        return { r, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.r);
    return scored;
  }, [query, index]);

  const grouped = useMemo(() => {
    const map = new Map<string, Result[]>();
    for (const r of results) {
      if (!map.has(r.category)) map.set(r.category, []);
      map.get(r.category)!.push(r);
    }
    return Array.from(map.entries());
  }, [results]);

  const go = (r: Result) => {
    setOpen(false);
    setQuery("");
    navigate({ to: r.to, params: r.params as never });
  };

  const triggerClass =
    variant === "mobile"
      ? "flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-ink"
      : "p-2 hover:text-clay transition";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClass}
        aria-label="Rechercher sur le site"
      >
        <Search className="w-4 h-4" />
        {variant === "mobile" && <span>Rechercher</span>}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-sm flex items-start justify-center px-4 pt-[12vh]"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-cream rounded-2xl border border-border shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-clay shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une destination, une expérience, un article…"
                className="flex-1 bg-transparent outline-none text-base text-ink placeholder:text-muted-foreground"
              />
              <kbd className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                Esc
              </kbd>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="sm:hidden text-muted-foreground"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {!query.trim() && (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                  Tapez le nom d'un pays, d'une expérience ou d'un thème…
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {["Namibie", "Gorilles", "Safari", "Japon", "Patagonie"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-[11px] uppercase tracking-[0.2em] border border-border rounded-full px-3 py-1 hover:bg-ink hover:text-cream transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Aucun résultat pour « {query} ».
                </div>
              )}

              {grouped.map(([cat, items]) => (
                <div key={cat} className="py-2">
                  <div className="px-5 pt-2 pb-1 text-[10px] uppercase tracking-[0.3em] text-clay">
                    {cat}
                  </div>
                  <ul>
                    {items.map((r) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          onClick={() => go(r)}
                          className="w-full text-left px-5 py-3 hover:bg-ochre/10 transition flex flex-col gap-0.5"
                        >
                          <span className="font-display text-base text-ink">{r.title}</span>
                          <span className="text-xs text-muted-foreground">{r.subtitle}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
