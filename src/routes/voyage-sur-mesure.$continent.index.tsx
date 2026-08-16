import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { continents, getContinent, type Continent } from "@/data/destinations";

export const Route = createFileRoute("/voyage-sur-mesure/$continent/")({
  loader: ({ params }): { continent: Continent } => {
    const c = getContinent(params.continent);
    if (!c) throw notFound();
    return { continent: c };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.continent;
    const name = c?.name ?? "Voyage sur mesure";
    const TITLE = `Voyage sur mesure ${name} | La Voyagerie`;
    const DESC = c?.intro ?? "Voyages long-courrier sur mesure par La Voyagerie.";
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        ...(c ? [{ property: "og:image", content: c.hero }] : []),
      ],
      links: c
        ? [{ rel: "canonical", href: `https://lavoyagerie.fr/voyage-sur-mesure/${c.slug}` }]
        : [],
    };
  },
  component: ContinentPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center paper">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-4">Destination introuvable</p>
        <Link to="/" className="font-display text-3xl">Retour à l'accueil</Link>
      </div>
    </div>
  ),
});

function ContinentPage() {
  const { continent } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader overlay />

      <section className="relative h-[70svh] min-h-[480px] overflow-hidden">
        <img src={continent.hero} alt={`Voyage ${continent.name}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/80" />
        <div className="grain absolute inset-0" />
        <div className="relative h-full mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12 flex flex-col justify-end pb-16 text-cream">
          <p className="text-[11px] uppercase tracking-[0.3em] mb-6 opacity-80">Voyage sur mesure</p>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight">
            <em className="italic text-ochre">{continent.name}.</em>
          </h1>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <p className="font-display text-2xl md:text-3xl leading-[1.4] text-foreground">
            {continent.intro}
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">Pays</p>
          <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl mb-16">
            Nos destinations en <em className="italic text-gold-gradient">{continent.name}.</em>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {continent.pays.map((p: import("@/data/destinations").Pays) => (
              <Link
                key={p.slug}
                to="/voyage-sur-mesure/$continent/$pays"
                params={{ continent: continent.slug, pays: p.slug }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={`Voyage ${p.name}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-clay">{p.tagline}</p>
                <h3 className="font-display text-3xl mt-2 group-hover:text-clay transition">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream border-t border-border">
        <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">Parcourir le monde</p>
          <div className="flex flex-wrap gap-4">
            {continents.map((c) => (
              <Link
                key={c.slug}
                to="/voyage-sur-mesure/$continent"
                params={{ continent: c.slug }}
                className="font-display text-2xl md:text-4xl italic hover:text-clay transition"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
