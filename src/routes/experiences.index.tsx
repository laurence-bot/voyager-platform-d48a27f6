import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { experiences } from "@/data/experiences";

const TITLE = "Expériences de voyage sur mesure | La Voyagerie";
const DESC =
  "Safari, voyage de noces, voyage en famille, voyage sportif — découvrez nos expériences de voyage sur mesure conçues par La Voyagerie, agence de voyage long-courrier à Cassis.";

export const Route = createFileRoute("/experiences/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "expérience voyage, safari sur mesure, voyage de noces, voyage en famille, voyage sportif, agence voyage Cassis" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://lavoyagerie.fr/experiences" },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/experiences" }],
  }),
  component: ExperiencesIndex,
});

function ExperiencesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-40 pb-16 md:pt-48 md:pb-24 paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">✦ Expériences signature</p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tight max-w-[18ch]">
            Voyager <em className="italic text-clay">autrement.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Quatre manières d'aborder le voyage, quatre univers que nous savons composer
            avec exigence et passion. Chaque expérience peut s'écrire dans plusieurs destinations.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12 grid md:grid-cols-2 gap-8">
          {experiences.map((e) => (
            <Link
              key={e.slug}
              to="/experiences/$experience"
              params={{ experience: e.slug }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={e.img}
                  alt={`${e.name} — La Voyagerie`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
                <div className="absolute bottom-6 left-6 text-cream">
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-3 opacity-80">{e.tagline}</p>
                  <h2 className="font-display text-4xl md:text-5xl">{e.name}</h2>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md">{e.intro.slice(0, 140)}…</p>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
