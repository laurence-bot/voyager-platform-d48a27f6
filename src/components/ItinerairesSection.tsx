import { Link } from "@tanstack/react-router";
import type { Itineraire } from "@/data/destinations";

type Props = {
  itineraires: Itineraire[];
  paysName: string;
  paysSlug: string;
  continentSlug: string;
  /** Conservé pour compatibilité d'API — non utilisé désormais */
  withMap?: boolean;
};

const shortLabel = (it: Itineraire): string => {
  const t = it.title.toLowerCase();
  if (t.includes("essentiel")) return "Essentielle";
  if (t.includes("aventure")) return "Aventure";
  if (t.includes("icône") || t.includes("icone")) return "Icônes";
  if (t.includes("nord") || t.includes("kaoko")) return "Grand Nord";
  if (t.includes("premium") || t.includes("photo") || t.includes("fly")) return "Expédition";
  return it.level;
};

export function ItinerairesSection({ itineraires, paysName, paysSlug, continentSlug }: Props) {
  return (
    <section className="py-12 md:py-14 bg-cream border-y border-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-5">
          IV — Nos itinéraires suggérés
        </p>
        <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-10 max-w-3xl">
          Programmes <em className="italic text-clay">100 % personnalisables.</em>
        </h2>

        {/* 3 CARTES CÔTE À CÔTE → renvoient vers la page détaillée */}
        <div className="grid md:grid-cols-3 gap-5">
          {itineraires.map((it, idx) => (
            <article
              key={it.slug}
              className="relative bg-[#FDFAF6] rounded-sm flex flex-col shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all"
            >
              {/* Photo de couverture */}
              <div className="relative w-full h-[280px] overflow-hidden rounded-t-sm">
                {it.coverImg ? (
                  <img
                    src={it.coverImg}
                    alt={`${it.title} — ${paysName}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-clay/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/85" />
                <span className="absolute top-4 left-4 bg-ink/70 backdrop-blur-sm text-cream text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-sm">
                  {it.level}
                </span>
                <h3
                  className="absolute bottom-5 left-5 right-5 font-display italic text-cream text-3xl md:text-4xl leading-tight"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
                >
                  {shortLabel(it)} {paysName}
                </h3>
              </div>

              {/* Bloc texte */}
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">
                  Itinéraire {String(idx + 1).padStart(2, "0")}
                </p>
                <h4 className="font-display text-xl md:text-2xl leading-tight mb-3">
                  {it.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-1">{it.duration}</p>
                {it.priceFrom && (
                  <p className="text-base font-display text-ink mb-4">{it.priceFrom}</p>
                )}
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 line-clamp-3">
                  {it.pitch}
                </p>
                <Link
                  to="/voyage-sur-mesure/$continent/$pays/$itineraire"
                  params={{
                    continent: continentSlug,
                    pays: paysSlug,
                    itineraire: it.slug,
                  }}
                  className="mt-auto text-left text-[11px] uppercase tracking-[0.3em] text-clay hover:text-ink transition pb-1 border-b border-clay self-start"
                >
                  Découvrir le programme →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
