import { createFileRoute, Link, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ParallaxBand } from "@/components/ParallaxBand";
import { ItinerairesSection } from "@/components/ItinerairesSection";
import { AppointmentDialog } from "@/components/AppointmentDialog";

import { getPays, type Continent, type Pays } from "@/data/destinations";

export const Route = createFileRoute("/voyage-sur-mesure/$continent/$pays")({
  loader: ({ params }): { continent: Continent; pays: Pays } => {
    const data = getPays(params.continent, params.pays);
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    const p = loaderData?.pays;
    const c = loaderData?.continent;
    if (!p || !c) {
      return {
        meta: [
          { title: "Voyage sur mesure | La Voyagerie" },
          { name: "description", content: "Voyage long-courrier sur mesure par La Voyagerie." },
        ],
      };
    }
    const TITLE =
      p.detailed?.metaTitle ??
      `Voyage sur mesure ${p.name} | Agence ${p.name} — La Voyagerie`;
    const DESC =
      p.detailed?.metaDescription ??
      `Agence de voyage sur mesure ${p.name} : itinéraire ${p.name} d'auteur, conçu par nos experts. ${p.intro.slice(0, 100)}...`;
    const url = `https://lavoyagerie.fr/voyage-sur-mesure/${c.slug}/${p.slug}`;

    const scripts: Array<{ type: string; children: string }> = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: `Voyage sur mesure ${p.name}`,
          description: p.detailed?.longIntro?.[0] ?? p.intro,
          image: p.img,
          touristType: p.tagline,
          provider: {
            "@type": "TravelAgency",
            name: "La Voyagerie",
            url: "https://lavoyagerie.fr",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lavoyagerie.fr" },
            { "@type": "ListItem", position: 2, name: c.name, item: `https://lavoyagerie.fr/voyage-sur-mesure/${c.slug}` },
            { "@type": "ListItem", position: 3, name: p.name, item: url },
          ],
        }),
      },
    ];

    if (p.detailed?.faq && p.detailed.faq.length > 0) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: p.detailed.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      });
    }

    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        {
          name: "keywords",
          content: `voyage sur mesure ${p.name}, agence de voyage ${p.name}, itinéraire ${p.name}, safari ${p.name}, voyage ${p.name}, ${c.name}`,
        },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:image", content: p.img },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESC },
        { name: "twitter:image", content: p.img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: PaysPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <Link to="/" className="font-display text-3xl">
        Retour à l'accueil
      </Link>
    </div>
  ),
});

function PaysPage() {
  const { continent, pays } = Route.useLoaderData();
  const d = pays.detailed;
  const matches = useMatches();
  // Si une route enfant (itinéraire) est matchée, on rend uniquement l'Outlet.
  const hasChildRoute = matches.some((m) =>
    m.routeId.includes("$pays/$itineraire"),
  );
  if (hasChildRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader overlay />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-screen overflow-hidden">
        <img
          src={pays.img}
          alt={`Voyage sur mesure ${pays.name} — paysages, safaris et itinéraires d'auteur par La Voyagerie`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: pays.heroObjectPosition ?? "center 42%" }}
        />
        {/* Overlay allégé pour laisser respirer le paysage */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/65" />
        <div className="grain absolute inset-0" />
        <div
          className="relative h-full mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-5 flex flex-col justify-end pb-12 md:pb-16 lg:pb-12 xl:pb-18 text-cream md:px-[48px]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
        >
          <nav className="text-[11px] uppercase tracking-[0.3em] mb-6 lg:mb-5 opacity-90 flex gap-3 items-center flex-wrap">
            <Link to="/" className="hover:opacity-100">
              Accueil
            </Link>
            <span>/</span>
            <Link
              to="/voyage-sur-mesure"
              className="hover:opacity-100"
            >
              Voyage sur mesure
            </Link>
            <span>/</span>
            <Link
              to="/voyage-sur-mesure/$continent"
              params={{ continent: continent.slug }}
              className="hover:opacity-100"
            >
              {continent.name}
            </Link>
            <span>/</span>
            <span aria-current="page" className="text-cream font-semibold">{pays.name}</span>
          </nav>
          <h1
            className="font-display leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 7.2vw, 5.4rem)" }}
          >
            <span className="block">Voyage sur mesure</span>
            <em className="italic text-ochre block mt-1">{pays.name}.</em>
          </h1>
          {d?.metaDescription && (
              <p className="mt-5 lg:mt-6 max-w-[34rem] text-base md:text-lg lg:text-[1.05rem] xl:text-[1.15rem] opacity-95 leading-relaxed text-balance">
                {pays.intro}
              <span className="block mt-3 font-display italic text-ochre">Imaginons votre voyage.</span>
              <span className="block mt-2 text-cream/90">Un voyage qui ne ressemble à aucun autre.</span>
            </p>
          )}
          {/* Badge maison — formulation éditoriale */}
          <p className="mt-6 lg:mt-7 inline-flex items-center gap-3 self-start text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/95 border border-cream/30 rounded-full px-5 py-2.5 backdrop-blur-sm bg-ink/15">
            <span className="w-1 h-1 rounded-full bg-ochre" />
            Carnet de voyage d'auteur · Itinéraires dessinés à la main
          </p>
        </div>
        {/* Scroll indicator animé — masqué sur desktop pour éviter chevauchement avec le badge */}
        <div className="absolute bottom-6 right-6 md:right-10 flex flex-col items-center gap-2 text-cream/70 pointer-events-none hidden lg:flex">
          <span className="text-[9px] uppercase tracking-[0.3em]">Découvrir</span>
          <span className="block w-px h-10 bg-cream/50 animate-scroll-indicator origin-top" />
        </div>
      </section>

      {/* INTRO ÉDITORIALE — LA DESTINATION */}
      <section className="relative py-10 md:py-10 lg:py-12 bg-cream overflow-hidden">
        <div className="relative mx-auto max-w-[1080px] lg:max-w-[1180px] xl:max-w-[1260px] px-6 md:px-10 lg:px-14 xl:px-12">
          {d?.longIntro ? (
            <div className="grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-14 items-start">
              <div className="md:col-span-7 space-y-6">
                {/* Label de section — discret */}
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-clay/70" />
                  <p className="text-[10px] uppercase tracking-[0.35em] text-clay/80">
                    I — La destination
                  </p>
                </div>

                <h2 className="font-display text-3xl md:text-[2rem] lg:text-[2.25rem] leading-[1.1] tracking-tight text-foreground/95">
                  Circuit <em className="italic text-clay font-normal">{pays.name} sur mesure</em>{" "}
                  <span className="text-foreground/70">— l'art du voyage d'auteur en {continent.name}.</span>
                </h2>

                {d.longIntro.map((para: string, i: number) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-display text-base md:text-lg leading-[1.55] text-foreground/90"
                        : "text-[15px] md:text-base leading-[1.85] text-foreground/75"
                    }
                  >
                    {i === 0 && <span className="font-display italic text-clay text-3xl md:text-4xl float-left mr-3 mt-1 leading-[0.85]">{para.charAt(0)}</span>}
                    {i === 0 ? para.slice(1) : para}
                  </p>
                ))}
              </div>

              {/* Aside éditoriale : photo + carte "En bref" */}
              <aside className="md:col-span-5 space-y-6 self-start">
                {d.parallaxBands?.afterIntro && (
                  <figure className="relative overflow-hidden rounded-sm group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={d.parallaxBands.afterIntro}
                        alt={`Paysage emblématique de ${pays.name} — voyage sur mesure La Voyagerie`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <figcaption className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-ink/85 to-transparent">
                      <p className="font-display italic text-cream text-lg leading-tight" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.45)" }}>
                        {pays.name}, en lumière douce
                      </p>
                    </figcaption>
                  </figure>
                )}

                <div className="bg-background border border-clay/20 rounded-sm p-7 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.15)]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-5">
                    Le voyage en bref
                  </p>
                  <dl className="space-y-5 text-sm">
                    <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                      <dt className="text-foreground/55 uppercase tracking-wider text-[10px] shrink-0 max-w-[7rem]">Durée idéale</dt>
                      <dd className="font-display text-base md:text-lg text-foreground text-right leading-snug max-w-[14rem] text-balance break-words">{pays.duration}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                      <dt className="text-foreground/55 uppercase tracking-wider text-[10px] shrink-0 max-w-[7rem]">Meilleure saison</dt>
                      <dd className="font-display text-base md:text-lg text-foreground text-right leading-snug max-w-[14rem] text-balance break-words">{pays.bestSeason}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                      <dt className="text-foreground/55 uppercase tracking-wider text-[10px] shrink-0 max-w-[7rem]">Budget</dt>
                      <dd className="font-display text-base md:text-lg text-foreground text-right leading-snug max-w-[14rem] text-balance break-words">{pays.budget}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-foreground/55 uppercase tracking-wider text-[10px] shrink-0 max-w-[7rem]">Sur-mesure</dt>
                      <dd className="font-display text-base md:text-lg text-foreground text-right leading-snug max-w-[14rem] text-balance break-words">100&nbsp;% à votre rythme</dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          ) : (
            <p className="font-display text-2xl md:text-3xl leading-[1.4] text-foreground max-w-3xl">
              {pays.intro}
            </p>
          )}
        </div>
      </section>

      {/* NOS ITINÉRAIRES — remontés en priorité (juste après l'intro) */}
      {d?.itineraires && d.itineraires.length > 0 && (
        <div id="itineraires" className="scroll-mt-24">
          <ItinerairesSection
            itineraires={d.itineraires}
            paysName={pays.name}
            paysSlug={pays.slug}
            continentSlug={continent.slug}
            withMap={pays.slug === "namibie"}
          />
        </div>
      )}

      {/* CITATION ÉDITORIALE — bandeau compact avec visuel */}
      {d?.pullQuote && (
        <section className="bg-ink text-cream">
          <div className="grid md:grid-cols-5 items-stretch">
            {/* Visuel collé à gauche (2/5) */}
            {pays.img && (
              <div className="md:col-span-2 relative min-h-[200px] md:min-h-[280px]">
                <img
                  src={pays.img}
                  alt={`Paysages de ${pays.name} — voyage sur mesure La Voyagerie`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: "center 45%" }}
                />
                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-ink/70" />
              </div>
            )}
            {/* Citation (3/5) */}
            <figure className="md:col-span-3 px-6 md:px-12 lg:px-16 py-8 md:py-10 flex flex-col justify-center">
              <span className="font-display italic text-ochre text-3xl leading-none mb-3 select-none">
                “
              </span>
              <blockquote className="font-display text-base md:text-lg lg:text-xl leading-[1.5] text-cream max-w-2xl">
                <em className="not-italic">{d.pullQuote.text}</em>
              </blockquote>
              {d.pullQuote.author && (
                <figcaption className="mt-5 text-[10px] uppercase tracking-[0.3em] text-ochre/90">
                  — {d.pullQuote.author}
                </figcaption>
              )}
            </figure>
          </div>
        </section>
      )}

      {/* (ParallaxBand après-intro retiré : la photo est maintenant intégrée à l'aside éditoriale du I) */}

      {d?.whyVisit ? (
        <section className="py-10 md:py-12 bg-cream border-y border-border">
          <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-clay/70" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-clay/80">
                II — Pourquoi {pays.name === "Malawi" ? "Le" : /^(l'|[aeiouyhAEIOUYH])/.test(pays.name) ? "L'" : "La"} {pays.name}
              </p>
            </div>
              <h2 className="font-display text-3xl md:text-[2rem] lg:text-[2.25rem] leading-[1.1] tracking-tight mb-10 max-w-5xl text-balance">
              Neuf raisons <em className="italic text-clay font-normal">d'aimer {
                pays.name === "Malawi" ? `le ${pays.name}` :
                /^[aeiouyhAEIOUYH]/.test(pays.name) ? `l'${pays.name}` : `la ${pays.name}`
              }</em>.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {d.whyVisit.map((w: { title: string; text: string; img?: string }, i: number) => (
                <article
                  key={w.title}
                  className="group bg-background rounded-sm overflow-hidden border border-border hover:border-clay/50 hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18)] transition-all duration-500"
                >
                  {w.img && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={w.img}
                        alt={`${w.title} en ${pays.name} — voyage sur mesure La Voyagerie`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                      />
                      <span className="absolute top-4 left-4 bg-cream/95 backdrop-blur-sm px-3 py-1.5 font-display italic text-clay text-sm leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <div className="p-7">
                    <h3 className="font-display text-2xl mb-3 leading-tight group-hover:text-clay transition">
                      {w.title}
                    </h3>
                    <p className="text-[15px] text-foreground/75 leading-relaxed">{w.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-10 md:py-12 lg:py-14 bg-cream border-y border-border">
          <div className="mx-auto max-w-[1120px] lg:max-w-[1240px] xl:max-w-[1360px] px-6 md:px-10 lg:px-14 xl:px-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-6">
              II — Pourquoi {pays.name}
            </p>
            <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-12">
              Les temps forts <em className="italic text-clay">de votre itinéraire.</em>
            </h2>
            <ul className="grid md:grid-cols-2 gap-x-12 gap-y-2">
              {pays.highlights.map((h: string, i: number) => (
                <li key={h} className="py-5 border-b border-border flex gap-6 items-baseline">
                  <span className="font-display italic text-clay text-2xl shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base md:text-lg text-foreground leading-snug">{h}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* QUAND PARTIR — uniquement si detailed */}
      {d?.whenToGo && (
        <section className="py-10 md:py-10">
          <div className="mx-auto max-w-[1120px] lg:max-w-[1240px] xl:max-w-[1360px] px-6 md:px-10 lg:px-14 xl:px-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-clay/70" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-clay/80">
                III — Quand partir
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-[2rem] lg:text-[2.25rem] leading-[1.1] tracking-tight mb-6 max-w-5xl">
              Quand partir <em className="italic text-clay font-normal">en {pays.name} ?</em> Saisons & climat pour votre safari.
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-3xl mb-8">
              {d.whenToGo.summary}
            </p>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
              {d.whenToGo.months.map((m: import("@/data/destinations").MonthClimat) => {
                const colors: Record<typeof m.recommandation, string> = {
                  ideal: "bg-ochre text-ink",
                  bonne: "bg-ochre/40 text-ink",
                  moyenne: "bg-clay/20 text-foreground",
                  deconseille: "bg-muted text-muted-foreground",
                };
                return (
                  <div
                    key={m.month}
                    className={`${colors[m.recommandation]} aspect-square flex flex-col items-center justify-center text-center p-2 rounded-sm`}
                    title={m.note}
                  >
                    <p className="font-display text-lg leading-none">{m.month}</p>
                    {m.note && (
                      <p className="text-[9px] uppercase tracking-wider mt-1 opacity-80 leading-tight hidden md:block">
                        {m.note.split(",")[0]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-xs uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-ochre inline-block" /> Idéal
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-ochre/40 inline-block" /> Bonne saison
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-clay/20 inline-block" /> Moyenne
              </span>
            </div>
          </div>
        </section>
      )}

      {/* PARALLAX BAND — entre III (Quand partir) et IV (Itinéraires) — Etosha */}
      {d?.parallaxBands?.afterWhenToGo && (
        <ParallaxBand
          src={d.parallaxBands.afterWhenToGo}
          alt={`Paysages emblématiques de ${pays.name}`}
          height="35vh"
        />
      )}

      {/* ITINÉRAIRES — déplacés après la section "Nos adresses" (cf. plus bas) */}
      {!d?.itineraires && (
        <section className="py-10 md:py-12 lg:py-14 bg-cream border-y border-border">
          <div className="mx-auto max-w-[1120px] lg:max-w-[1240px] xl:max-w-[1360px] px-6 md:px-10 lg:px-14 xl:px-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-6">
              III — Nos itinéraires suggérés
            </p>
            <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-16 max-w-5xl">
              Programmes <em className="italic text-clay">100 % personnalisables.</em>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { titre: `${pays.name} — l'essentiel`, dur: pays.duration.split(" à ")[0] + " jours", niv: "Confort" },
                { titre: `${pays.name} — découverte approfondie`, dur: pays.duration, niv: "Aventure douce" },
                { titre: `${pays.name} — sur-mesure intégral`, dur: "Selon vos envies", niv: "Premium" },
              ].map((it) => (
                <article
                  key={it.titre}
                  className="border border-border rounded-2xl p-8 hover:border-clay transition group bg-background"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">{it.niv}</p>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-clay transition">
                    {it.titre}
                  </h3>
                  <p className="text-sm text-muted-foreground">Durée : {it.dur}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Itinéraire à composer ensemble selon votre rythme, votre budget et vos envies.
                  </p>
                  <Link
                    to="/demande-de-devis"
                    className="mt-6 inline-flex text-[10px] uppercase tracking-[0.3em] text-ink border-b border-ink hover:text-clay hover:border-clay transition pb-1"
                  >
                    Construire ce voyage →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* (Section "Régions à explorer" supprimée — faisait doublon avec II "Pourquoi") */}

      {/* NOS ADRESSES — exemples de lodges */}
      {d?.lodges && d.lodges.length > 0 && (
        <section id="hebergements" className="py-10 md:py-12 lg:py-14 bg-background scroll-mt-24">
          <div className="mx-auto max-w-[1120px] lg:max-w-[1240px] xl:max-w-[1360px] px-6 md:px-10 lg:px-14 xl:px-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-16 bg-clay" />
              <p className="text-[11px] uppercase tracking-[0.4em] text-clay font-medium">
                IV — Nos adresses
              </p>
              <span className="h-px flex-1 bg-clay/20" />
            </div>
            <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
              <div className="md:col-span-8">
                <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[1.05]">
                  Nos lodges en {pays.name}, <em className="italic text-clay">murmurés.</em>
                </h2>
                <p className="mt-5 text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl text-balance">
                  Une sélection d'adresses inspirantes en {pays.name}, choisies pour leur emplacement, leur atmosphère et leur cohérence avec nos itinéraires. Votre sélection finale sera composée à la main, selon votre rythme, la saison et le niveau de confort souhaité.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Link
                  to="/demande-de-devis"
                  className="inline-flex items-center gap-2 bg-clay text-cream px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-ink transition"
                >
                  Composer mon voyage <span>→</span>
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {d.lodges.map((lodge: import("@/data/destinations").Lodge) => (
                <article
                  key={lodge.name}
                  className="group bg-cream/40 border border-border/60 rounded-sm overflow-hidden hover:shadow-[0_8px_28px_-14px_rgba(0,0,0,0.2)] hover:border-clay/40 transition-all duration-500 flex flex-col"
                >
                  {lodge.img && (
                    <div className="relative aspect-video overflow-hidden bg-cream">
                      <img
                        src={lodge.img}
                        alt={`${lodge.name} — ${lodge.region}, ${pays.name}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                      />
                      <span className="absolute top-3 left-3 bg-cream/95 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-ink rounded-sm">
                        {lodge.region}
                      </span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl md:text-2xl mb-3 leading-tight text-ink text-balance break-words">
                      {lodge.name}
                    </h3>
                    <p className="text-sm text-foreground/75 leading-relaxed mb-4 flex-1 break-words text-pretty">
                      {lodge.description}
                    </p>
                    {lodge.highlights && (
                      <ul className="flex flex-wrap gap-1.5 mb-4">
                        {lodge.highlights.slice(0, 3).map((h: string) => (
                          <li
                            key={h}
                            className="text-[10px] text-foreground/70 bg-background border border-border/60 px-2.5 py-1 rounded-full"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    {lodge.website && (
                      <a
                        href={lodge.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-clay hover:text-ochre transition self-start"
                      >
                        Site officiel <span>→</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 p-6 md:p-8 bg-cream border border-border rounded-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <p className="font-display text-xl md:text-2xl leading-snug">
                Une de ces adresses vous fait rêver ? Construisons ensemble votre itinéraire.
              </p>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to="/demande-de-devis"
                  className="inline-flex items-center gap-2 bg-clay text-cream px-6 py-3 text-[10px] uppercase tracking-[0.25em] rounded-full hover:bg-ink transition"
                >
                  Personnaliser mon voyage
                </Link>
                <Link
                  to="/demande-de-devis"
                  className="inline-flex items-center gap-2 border border-ink text-ink px-6 py-3 text-[10px] uppercase tracking-[0.25em] rounded-full hover:bg-ink hover:text-cream transition"
                >
                  Échanger avec un expert
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NOS ITINÉRAIRES — déplacés en haut (cf. juste après l'intro éditoriale) */}

      {/* PARALLAX BAND — avant Infos pratiques */}
      {d?.parallaxBands?.afterRegions && (
        <ParallaxBand src={d.parallaxBands.afterRegions} alt={`Côtes et paysages de ${pays.name}`} />
      )}

      {/* INFOS PRATIQUES */}
      <section className="relative py-10 md:py-12 lg:py-16 bg-cream border-y border-border overflow-hidden">
        {/* Filigrane décoratif */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 left-[-4%] font-display italic text-[16rem] md:text-[22rem] leading-none text-clay/[0.04] select-none"
        >
          Carnet
        </div>

        <div className="relative mx-auto max-w-[1120px] lg:max-w-[1240px] xl:max-w-[1360px] px-6 md:px-10 lg:px-14 xl:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-16 bg-clay" />
            <p className="text-[11px] uppercase tracking-[0.4em] text-clay font-medium">
              {d ? "V" : "IV"} — Le carnet pratique
            </p>
            <span className="h-px flex-1 bg-clay/20" />
          </div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-14 mb-14 items-end">
            <div className="md:col-span-8">
              <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[1.05]">
                Préparer votre voyage <em className="italic text-clay">en {pays.name}</em> — guide pratique.
              </h2>
                <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl text-balance">
                 Visa, vaccins, monnaie, vols, langue, sécurité et rythme du voyage — tout ce qu'il faut savoir avant un voyage sur mesure en {pays.name}, vérifié et mis à jour avec nos partenaires sur place. Un seul interlocuteur, du devis au retour.
              </p>
            </div>
            <div className="md:col-span-4 text-sm text-foreground/60 italic font-display md:text-right">
              Mis à jour {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </div>
          </div>

          {d?.practical ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                ["01", "Visa & formalités", d.practical.visa],
                ["02", "Santé & vaccins", d.practical.health],
                ["03", "Monnaie & paiement", d.practical.money],
                ["04", "Vols & accès", d.practical.flights],
                ["05", "Décalage horaire", d.practical.timezone],
                ["06", "Langue", d.practical.language],
                ["07", "Sécurité & conduite", d.practical.safety],
                ["08", "Bons à savoir", d.practical.tips],
              ].map(([num, label, value]) => (
                <article
                  key={label}
                  className="group bg-background border border-border rounded-sm p-7 hover:border-clay/50 hover:shadow-[0_8px_28px_-14px_rgba(0,0,0,0.18)] transition-all duration-500"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-display italic text-clay text-2xl leading-none">{num}</span>
                    <span className="h-px flex-1 bg-clay/20" />
                  </div>
                  <h3 className="font-display text-xl mb-3 leading-tight group-hover:text-clay transition">
                    {label}
                  </h3>
                  <p className="text-[14px] text-foreground/75 leading-relaxed">{value}</p>
                </article>
              ))}
            </div>
          ) : (
            <dl className="grid md:grid-cols-3 gap-10">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">
                  Meilleure saison
                </dt>
                <dd className="font-display text-xl">
                  {pays.bestSeason ?? "Toute l'année selon les régions"}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">
                  Visa & formalités
                </dt>
                <dd className="font-display text-xl">{pays.visa ?? "Selon nationalité"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">
                  Budget indicatif
                </dt>
                <dd className="font-display text-xl">{pays.budget ?? "Sur devis"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">
                  Durée recommandée
                </dt>
                <dd className="font-display text-xl">{pays.duration}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">Continent</dt>
                <dd className="font-display text-xl">{continent.name}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">
                  Style de voyage
                </dt>
                <dd className="font-display text-xl">{pays.tagline}</dd>
              </div>
            </dl>
          )}
        </div>
      </section>

      {/* FAQ */}
      {d?.faq && (
        <section className="py-10 md:py-12 lg:py-14">
          <div className="mx-auto max-w-[1100px] px-6 md:px-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-6">
              VI — Questions fréquentes
            </p>
            <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-12 max-w-5xl">
              Voyage sur mesure en {pays.name} : <em className="italic text-clay">questions fréquentes.</em>
            </h2>
            <div className="divide-y divide-border border-y border-border">
              {d.faq.map((f: import("@/data/destinations").FaqItem) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex justify-between items-start cursor-pointer list-none gap-6">
                    <h3 className="font-display text-xl md:text-2xl group-hover:text-clay transition">
                      {f.q}
                    </h3>
                    <span className="text-clay text-2xl shrink-0 group-open:rotate-45 transition">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-base text-foreground/85 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-12 md:py-14 lg:py-16 bg-ink text-cream text-center overflow-hidden">
        {d?.ctaBackground && (
          <>
            <img
              src={d.ctaBackground}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90" />
          </>
        )}
        <div className="relative mx-auto max-w-[1100px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ochre mb-6">
            Et si on imaginait votre {pays.name} ?
          </p>
          <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[0.95]">
            Et si on dessinait, ensemble, votre <em className="italic text-ochre">{pays.name}.</em>
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-base md:text-lg opacity-80 leading-relaxed">
            Le silence du désert à l'aube. Le souffle d'un éléphant, tout près. Une nuit sous la Voie lactée. Un seul interlocuteur, des lodges choisis à la main, des guides francophones — du premier échange au retour.<br />
            <span className="text-ochre font-display italic">Une réponse soignée, pensée pour vous.</span>
          </p>
          <p className="mt-6 max-w-xl mx-auto font-display italic text-ochre text-lg md:text-xl leading-snug">
            Imaginez-vous déjà face aux dunes, au lever du jour.
          </p>
          <Link
            to="/demande-de-devis"
            className="mt-12 inline-flex items-center bg-cream text-ink px-12 py-6 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay hover:text-cream transition"
          >
            Échanger avec un expert {pays.name} →
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-cream/70">
            Devis personnalisé sous 48&nbsp;h · sans engagement
          </p>

          <div className="mt-8 flex flex-col items-center gap-2">
            <AppointmentDialog destinationName={pays.name} />
            <p className="text-[12px] text-cream/60 italic max-w-md leading-relaxed">
              Choisissez un créneau pour échanger directement avec un expert de la destination.
            </p>
          </div>
        </div>
      </section>

      {/* AUTRES PAYS DU CONTINENT — défilement horizontal de cartes photo */}
      <section className="py-12 bg-cream border-t border-border">
        <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-8">
            Autres destinations en {continent.name}
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-12 md:px-12 snap-x snap-mandatory scrollbar-thin">
            {continent.pays
              .filter((other: import("@/data/destinations").Pays) => other.slug !== pays.slug)
              .map((other: import("@/data/destinations").Pays) => (
                <Link
                  key={other.slug}
                  to="/voyage-sur-mesure/$continent/$pays"
                  params={{ continent: continent.slug, pays: other.slug }}
                  className="group relative shrink-0 w-[180px] h-[240px] overflow-hidden rounded-sm snap-start"
                >
                  <img
                    src={other.img}
                    alt={`Voyage sur mesure ${other.name}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-ochre/90 mb-1">
                      {other.tagline}
                    </p>
                    <h3 className="font-display text-xl text-cream leading-tight" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                      {other.name}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
