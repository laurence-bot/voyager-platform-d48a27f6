import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { continents } from "@/data/destinations";

const TITLE = "Voyage sur mesure | La Voyagerie — Long-courrier d'auteur";
const DESC =
  "Découvrez nos destinations long-courrier sur mesure : Afrique, Asie, Amériques, Océanie, Europe. Voyages d'auteur conçus avec passion par La Voyagerie.";

export const Route = createFileRoute("/voyage-sur-mesure/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/voyage-sur-mesure" }],
  }),
  component: AllDestinations,
});

function AllDestinations() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-40 pb-16 md:pt-48 md:pb-24 paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">
            ✦ Parcourir le monde
          </p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tight max-w-[18ch]">
            Voyage <em className="italic text-clay">sur mesure.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            La Voyagerie est votre agence de voyage sur-mesure où la passion pour
            l'exploration et l'expertise se rencontrent pour créer des séjours
            uniques adaptés à vos envies.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {continents.map((c) => (
            <Link
              key={c.slug}
              to="/voyage-sur-mesure/$continent"
              params={{ continent: c.slug }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.hero}
                  alt={`Voyage ${c.name}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
                <div className="absolute bottom-6 left-6 text-cream">
                  <h2 className="font-display text-4xl md:text-5xl">{c.name}</h2>
                  <p className="text-[10px] uppercase tracking-[0.3em] mt-2 opacity-80">
                    {c.pays.length} destinations
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
