import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getExperience, type Experience } from "@/data/experiences";

export const Route = createFileRoute("/experiences/$experience")({
  loader: ({ params }): { experience: Experience } => {
    const e = getExperience(params.experience);
    if (!e) throw notFound();
    return { experience: e };
  },
  head: ({ loaderData }) => {
    const e = loaderData?.experience;
    if (!e) return { meta: [{ title: "Expérience | La Voyagerie" }] };
    const TITLE = `${e.name} sur mesure | La Voyagerie`;
    const DESC = `${e.name} : ${e.tagline}. ${e.intro.slice(0, 120)}...`;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        { name: "keywords", content: `${e.name.toLowerCase()} sur mesure, ${e.name.toLowerCase()} agence, voyage ${e.name.toLowerCase()}` },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:image", content: e.img },
        { property: "og:url", content: `https://lavoyagerie.fr/experiences/${e.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://lavoyagerie.fr/experiences/${e.slug}` }],
    };
  },
  component: ExperiencePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <Link to="/" className="font-display text-3xl">Retour à l'accueil</Link>
    </div>
  ),
});

function ExperiencePage() {
  const { experience: e } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader overlay />

      <section className="relative h-[75svh] min-h-[480px] overflow-hidden">
        <img src={e.img} alt={`${e.name} sur mesure — La Voyagerie`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/80" />
        <div className="grain absolute inset-0" />
        <div className="relative h-full mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12 flex flex-col justify-end pb-16 text-cream">
          <Link to="/experiences" className="text-[11px] uppercase tracking-[0.3em] mb-6 opacity-80 hover:opacity-100">
            ← Toutes les expériences
          </Link>
          <p className="text-[11px] uppercase tracking-[0.3em] mb-6 opacity-80">{e.tagline}</p>
          <h1 className="font-display text-5xl md:text-9xl leading-[0.9] tracking-tight">
            <em className="italic text-ochre">{e.name}.</em>
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-6">I — L'esprit</p>
          <p className="font-display text-2xl md:text-3xl leading-[1.4]">{e.intro}</p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-cream border-y border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-6">II — Pour qui ?</p>
          <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-12">
            Une expérience pensée <em className="italic text-clay">pour vous.</em>
          </h2>
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-2">
            {e.pourQui.map((p: string, i: number) => (
              <li key={p} className="py-5 border-b border-border flex gap-6 items-baseline">
                <span className="font-display italic text-clay text-2xl shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base md:text-lg leading-snug">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-6">III — Itinéraires d'inspiration</p>
          <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-12 max-w-3xl">
            Trois exemples <em className="italic text-clay">à personnaliser.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {e.exemples.map((ex: { titre: string; desc: string; duree: string }) => (
              <article key={ex.titre} className="border border-border rounded-2xl p-8 hover:border-clay transition group bg-cream">
                <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">{ex.duree}</p>
                <h3 className="font-display text-2xl mb-4 group-hover:text-clay transition">{ex.titre}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ex.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-6">IV — Destinations</p>
          <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-12 max-w-3xl">
            Où vivre votre <em className="italic text-clay">{e.name.toLowerCase()}</em> ?
          </h2>
          <div className="flex flex-wrap gap-3">
            {e.destinations.map((d: string) => (
              <span key={d} className="font-display text-2xl md:text-3xl italic text-clay border border-clay/40 rounded-full px-6 py-2">
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-ink text-cream text-center">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[0.95]">
            Composons votre <em className="italic text-ochre">{e.name.toLowerCase()}.</em>
          </h2>
          <Link
            to="/demande-de-devis"
            className="mt-12 inline-flex items-center bg-cream text-ink px-12 py-6 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay hover:text-cream transition"
          >
            Demander un devis →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
