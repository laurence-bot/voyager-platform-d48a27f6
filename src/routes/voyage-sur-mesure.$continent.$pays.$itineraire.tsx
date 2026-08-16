import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NamibiaMap } from "@/components/NamibiaMap";
import elephantsFondu from "@/assets/destinations/namibie/elephants-fondu.jpg";

import { getPays, type Continent, type Pays } from "@/data/destinations";

const PHONE = "04 83 43 29 49";

export const Route = createFileRoute("/voyage-sur-mesure/$continent/$pays/$itineraire")({
  loader: ({ params }) => {
    const data = getPays(params.continent, params.pays);
    if (!data) throw notFound();
    const it = data.pays.detailed?.itineraires.find((i) => i.slug === params.itineraire);
    if (!it) throw notFound();
    return { continent: data.continent, pays: data.pays, itineraire: it };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Itinéraire | La Voyagerie" }] };
    const { pays, continent, itineraire } = loaderData;
    const durMatch = itineraire.duration.match(/(\d+)\s*jours?/i);
    const dureeStr = durMatch ? `${durMatch[1]} jours` : itineraire.duration;
    const TITLE = `Circuit ${pays.name} ${dureeStr} | ${itineraire.title} | La Voyagerie`;
    const DESC = `${itineraire.title} : circuit ${pays.name} ${dureeStr} sur mesure — Sossusvlei, Etosha, Damaraland. Lodges sélectionnés, guides francophones. Demandez votre devis personnalisé.`.slice(0, 160);
    const url = `https://lavoyagerie.fr/voyage-sur-mesure/${continent.slug}/${pays.slug}/${itineraire.slug}`;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:image", content: itineraire.heroImg ?? itineraire.coverImg ?? pays.img },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESC },
        { name: "twitter:image", content: itineraire.heroImg ?? itineraire.coverImg ?? pays.img },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ItinerairePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center paper">
      <Link to="/" className="font-display text-3xl">Retour à l'accueil</Link>
    </div>
  ),
});

const SECTIONS = [
  { id: "sejour", label: "Séjour" },
  { id: "itineraire", label: "Itinéraire" },
  { id: "inclus", label: "Inclus / Exclus" },
] as const;

/**
 * Construit un alt SEO normalisé pour les vignettes des étapes :
 *   alt="[activité] [lieu] [pays] jour [N]"
 * - activité = titre de l'étape (raccourci, nettoyé)
 * - lieu = région
 * - pays = nom du pays
 * - N = numéro extrait de step.day (ex: "Jour 4")
 */
function buildStepAlt(step: { day: string; title: string; region?: string }, paysName: string): string {
  const dayNum = step.day.match(/\d+/)?.[0] ?? "";
  // Activité = première partie du titre, avant un éventuel " — " ou " : " ou " /"
  const activite = step.title
    .split(/[—:/]/)[0]
    .trim()
    .replace(/\.$/, "");
  const lieu = step.region?.trim() ?? "";
  const parts = [activite, lieu, paysName].filter(Boolean).join(" ");
  return `${parts} jour ${dayNum}`.replace(/\s+/g, " ").trim();
}

function ItinerairePage() {
  const { continent, pays, itineraire } = Route.useLoaderData();
  const [activeSection, setActiveSection] = useState<string>("sejour");
  const [activeStep, setActiveStep] = useState(0);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapCollapsed, setMapCollapsed] = useState(false);
  const [ctaDismissed, setCtaDismissed] = useState(false);

  // Détection section active au scroll
  useEffect(() => {
    const handler = () => {
      const scroll = window.scrollY + 200;
      let current = "sejour";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scroll) current = s.id;
      }
      setActiveSection(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Extraire la durée chiffrée pour la carte prix
  const durationMatch = itineraire.duration.match(/(\d+)\s*jours?\s*\/\s*(\d+)\s*nuits?/i);
  const days = durationMatch?.[1] ?? itineraire.duration;
  const nights = durationMatch?.[2];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader overlay />

      {/* HERO — utilise heroImg en priorité (image plein écran dédiée), puis coverImg en fallback */}
      <section className="relative h-[80svh] min-h-[560px] overflow-hidden">
        {(itineraire.heroImg ?? itineraire.coverImg) && (
          <img
            src={itineraire.heroImg ?? itineraire.coverImg}
            alt={`${itineraire.title} — ${pays.name}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/20 to-ink/70" />
        <div className="grain absolute inset-0" />

        <div className="relative h-full mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12 flex flex-col justify-end pb-20 text-cream"
             style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}>
          <nav className="text-[11px] uppercase tracking-[0.3em] mb-8 opacity-90 flex gap-3 items-center flex-wrap">
            <Link to="/" className="hover:opacity-100">Accueil</Link>
            <span>/</span>
            <Link to="/voyage-sur-mesure/$continent" params={{ continent: continent.slug }} className="hover:opacity-100">
              {continent.name}
            </Link>
            <span>/</span>
            <Link to="/voyage-sur-mesure/$continent/$pays" params={{ continent: continent.slug, pays: pays.slug }} className="text-cream font-semibold hover:opacity-100">
              {pays.name}
            </Link>
            <span>/</span>
            <span className="font-medium" style={{ color: "oklch(0.62 0.16 55)" }}>{itineraire.title}</span>
          </nav>

          <div>
            <span className="inline-block bg-ink/55 backdrop-blur-sm text-cream text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-sm mb-6">
              {itineraire.level} · {pays.name}
            </span>
            <h1 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[0.95] tracking-tight max-w-4xl">
              {itineraire.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg opacity-95 leading-relaxed line-clamp-3">
              {itineraire.pitch}
            </p>

            {/* Bandeau prix horizontal — discret, en bas, ne masque pas la photo */}
            <div
              className="mt-8 inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-full border border-cream/20 pl-6 pr-2 py-2"
              style={{
                background: "rgba(20, 14, 10, 0.35)",
                backdropFilter: "blur(10px) saturate(115%)",
                WebkitBackdropFilter: "blur(10px) saturate(115%)",
              }}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[9px] uppercase tracking-[0.28em] text-ochre/90">À partir de</span>
                <span className="font-display text-xl md:text-2xl text-cream leading-none">
                  {itineraire.priceFrom?.match(/[\d\s]+€/)?.[0]?.trim() ?? "Sur devis"}
                </span>
                <span className="text-[10px] text-cream/65">/ pers.</span>
              </div>
              <span className="hidden md:inline text-cream/25">·</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-cream/70">
                {days}j{nights ? ` / ${nights}n` : ""}
              </span>
              <span className="hidden md:inline text-cream/25">·</span>
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="text-[11px] text-cream/80 hover:text-ochre transition"
              >
                {PHONE}
              </a>
              <Link
                to="/demande-de-devis"
                className="group inline-flex items-center gap-2 bg-cream/90 text-ink px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] rounded-full hover:bg-cream transition-all"
              >
                Personnaliser
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY NAV */}
      <nav className="sticky top-[88px] md:top-[96px] z-30 bg-[#FDFAF6] border-b border-border shadow-sm">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 flex gap-2 md:gap-8 overflow-x-auto">
          {SECTIONS.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`shrink-0 py-5 text-[11px] uppercase tracking-[0.3em] border-b-2 transition ${
                  isActive
                    ? "text-clay border-clay"
                    : "text-muted-foreground border-transparent hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* SÉJOUR */}
      <section id="sejour" className="py-10 md:py-12">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">I — Le séjour</p>
          <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-6">
            {itineraire.level} <em className="italic text-gold-gradient">en {pays.name}.</em>
          </h2>
          <p className="font-display text-xl md:text-2xl leading-[1.4] text-foreground mb-8">
            {itineraire.pitch}
          </p>
          <dl className="grid md:grid-cols-3 gap-8 pt-8 border-t border-border">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-2">Durée</dt>
              <dd className="font-display text-2xl">{itineraire.duration}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-2">Niveau</dt>
              <dd className="font-display text-2xl">{itineraire.level}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-clay mb-2">À partir de</dt>
              <dd className="font-display text-2xl">{itineraire.priceFrom ?? "Sur devis"}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link
              to="/demande-de-devis"
              className="inline-flex items-center gap-2 bg-clay text-cream px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-ink transition"
            >
              Personnaliser ce voyage <span>→</span>
            </Link>
            <Link
              to="/demande-de-devis"
              className="inline-flex items-center gap-2 border border-ink/80 text-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-ink hover:text-cream transition"
            >
              Réserver votre voyage
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="text-[11px] uppercase tracking-[0.25em] text-clay hover:text-ochre transition"
            >
              ou nous appeler · {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ITINÉRAIRE */}
      <section id="itineraire" className="py-10 md:py-12 bg-cream border-y border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">II — Itinéraire</p>
          <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-10">
            Programme <em className="italic text-gold-gradient">jour par jour.</em>
          </h2>

          <div className={`grid md:grid-cols-12 gap-6 lg:gap-8`}>
            {/* Colonne carte — rétractable */}
            <div className={mapCollapsed ? "md:col-span-1" : "md:col-span-5 lg:col-span-5"}>
              {/* Sticky : carte centrée dans la fenêtre visible, sous la nav sticky */}
              <div className="md:sticky md:top-[5.75rem] md:h-[calc(100svh-7.5rem)] md:flex md:flex-col md:justify-center">
                {pays.slug === "namibie" ? (
                  mapCollapsed ? (
                    <button
                      type="button"
                      onClick={() => setMapCollapsed(false)}
                      className="hidden md:flex items-center justify-center h-full w-full border border-clay/40 rounded-sm bg-cream/50 hover:bg-clay hover:text-cream transition group"
                      aria-label="Afficher la carte"
                    >
                      <span className="rotate-90 md:rotate-0 [writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] text-clay group-hover:text-cream flex items-center gap-2">
                        <span aria-hidden="true">▸</span> Afficher la carte
                      </span>
                    </button>
                  ) : (
                  <div className="h-full md:flex md:flex-col md:justify-center">
                    <div className="md:flex-1 md:min-h-0 md:flex md:items-center md:justify-center [&_svg]:md:max-h-[calc(100svh-15rem)] [&_svg]:md:w-auto [&_svg]:md:max-w-full">
                    <NamibiaMap
                      steps={itineraire.steps}
                      activeIndex={activeStep}
                      onStepClick={(i) => {
                        setActiveStep(i);
                        const el = document.getElementById(`step-${i}`);
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top, behavior: "smooth" });
                        }
                      }}
                    />
                    </div>
                    <div className="mt-2 flex justify-end gap-2 shrink-0 md:pb-1">
                      <button
                        type="button"
                        onClick={() => setMapCollapsed(true)}
                        className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-clay border border-clay/60 hover:bg-clay hover:text-cream transition px-4 py-2 rounded-full"
                        aria-label="Réduire la carte"
                      >
                        <span aria-hidden="true">◂</span> Réduire
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapOpen(true)}
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-clay border border-clay/60 hover:bg-clay hover:text-cream transition px-4 py-2 rounded-full"
                        aria-label="Agrandir la carte de l'itinéraire"
                      >
                        <span aria-hidden="true">🔍</span> Agrandir
                      </button>
                    </div>
                  </div>
                  )
                ) : (
                  <div className="aspect-square bg-cream/60 border border-border flex items-center justify-center text-muted-foreground text-sm">
                    Carte à venir
                  </div>
                )}
              </div>
            </div>
            {/* Colonne liste des jours — s'élargit quand la carte est repliée */}
            <div className={mapCollapsed ? "md:col-span-11" : "md:col-span-7 lg:col-span-7"}>
              <div className="border-t border-border">
                {itineraire.steps.map((step: import("@/data/destinations").DayStep, sIdx: number) => {
                  const altText = buildStepAlt(step, pays.name);
                  return (
                  <details
                    key={step.day + step.title}
                    id={`step-${sIdx}`}
                    className="group border-b border-border scroll-mt-24"
                    open={activeStep === sIdx}
                    onToggle={(e) => {
                      if ((e.target as HTMLDetailsElement).open) setActiveStep(sIdx);
                    }}
                  >
                    <summary className={`flex items-center gap-4 py-4 cursor-pointer list-none px-2 transition ${
                      activeStep === sIdx ? "bg-ochre/10" : "hover:bg-cream/40"
                    }`}>
                      {step.img ? (
                        <img
                          src={step.img}
                          alt={altText}
                          loading="lazy"
                          className="h-[110px] w-[160px] object-cover rounded-sm shrink-0 border border-border"
                          style={{ aspectRatio: "3 / 2" }}
                        />
                      ) : (
                        <div className="h-[110px] w-[160px] bg-cream/60 border border-border rounded-sm shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-1">
                          {step.day}
                          {step.region && <span className="text-muted-foreground"> · {step.region}</span>}
                        </p>
                        <h4 className="font-display text-lg md:text-xl leading-tight mb-2">{step.title}</h4>
                        <span
                          className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-clay border border-clay/60 px-3 py-1 rounded-full group-hover:bg-clay/5 transition"
                          aria-hidden="true"
                        >
                          <span className="group-open:hidden">Voir le détail ▾</span>
                          <span className="hidden group-open:inline">Masquer ▴</span>
                        </span>
                      </div>
                    </summary>
                    <div className="px-2 pb-6 pt-2">
                      {step.img && (
                        <div className="mb-5 overflow-hidden rounded-sm border border-border">
                          <img
                            src={step.img}
                            alt={altText}
                            loading="lazy"
                            className="w-full h-56 md:h-72 object-cover"
                          />
                        </div>
                      )}
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </details>
                  );
                })}
              </div>

              {/* CTA in-section — barre compacte sticky en bas de colonne (desktop) */}
              {!ctaDismissed && (
                <div className="mt-8 md:sticky md:bottom-4 md:z-10 relative bg-background/98 backdrop-blur border border-border rounded-full shadow-[0_6px_24px_rgba(0,0,0,0.10)] pl-5 pr-3 py-2 flex items-center gap-3">
                  <p className="hidden sm:block font-display text-sm md:text-[15px] leading-tight text-ink whitespace-nowrap">
                    Cet itinéraire vous inspire&nbsp;?
                  </p>
                  <span className="hidden md:inline-block h-4 w-px bg-border shrink-0" />
                  <div className="flex items-center gap-2 ml-auto shrink-0">
                    <Link
                      to="/demande-de-devis"
                      className="inline-flex items-center gap-1.5 bg-clay text-cream px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-ink transition"
                    >
                      Personnaliser <span aria-hidden="true">→</span>
                    </Link>
                    <Link
                      to="/demande-de-devis"
                      className="hidden sm:inline-flex items-center border border-ink/70 text-ink px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-ink hover:text-cream transition"
                    >
                      Réserver
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCtaDismissed(true)}
                    aria-label="Masquer ce bloc"
                    className="ml-1 inline-flex items-center justify-center h-7 w-7 rounded-full text-muted-foreground hover:text-ink hover:bg-cream transition shrink-0"
                  >
                    <span className="text-base leading-none" aria-hidden="true">×</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CTA mobile fixe en bas d'écran — avec croix de fermeture */}
          {!ctaDismissed && (
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border p-3 pr-12 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
              <button
                type="button"
                onClick={() => setCtaDismissed(true)}
                aria-label="Masquer ce bloc"
                className="absolute top-1/2 -translate-y-1/2 right-2 inline-flex items-center justify-center h-8 w-8 rounded-full text-muted-foreground hover:text-ink hover:bg-cream transition"
              >
                <span className="text-xl leading-none" aria-hidden="true">×</span>
              </button>
              <Link
                to="/demande-de-devis"
                className="flex items-center justify-center gap-2 w-full bg-clay text-cream px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-ink transition"
              >
                Cet itinéraire vous inspire ? Personnaliser →
              </Link>
            </div>
          )}

          {/* Modale plein écran — carte agrandie */}
          {mapOpen && pays.slug === "namibie" && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Carte de l'itinéraire en plein écran"
              className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
              onClick={() => setMapOpen(false)}
            >
              <div
                className="relative bg-cream rounded-sm w-full max-w-[1400px] max-h-[95vh] overflow-auto p-6 md:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setMapOpen(false)}
                  className="absolute top-3 right-3 z-10 inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-cream hover:bg-clay transition text-lg"
                  aria-label="Fermer la carte"
                >
                  ×
                </button>
                <NamibiaMap
                  steps={itineraire.steps}
                  activeIndex={activeStep}
                  onStepClick={(i) => {
                    setActiveStep(i);
                    setMapOpen(false);
                    const el = document.getElementById(`step-${i}`);
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* INCLUS / EXCLUS */}
      <section id="inclus" className="py-10 md:py-12 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">III — Inclus / Exclus</p>
          <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl mb-10">
            Ce que comprend <em className="italic text-gold-gradient">votre voyage.</em>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-clay mb-5">Le prix comprend</h3>
              <ul className="space-y-3 text-base text-foreground/85">
                {[
                  "Tous les hébergements en chambre double",
                  "Les transferts privés et la location véhicule 4×4",
                  "Les guides francophones lors des excursions clés",
                  "L'assistance 24/7 de notre partenaire local",
                  "Le roadbook personnalisé et la documentation",
                ].map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-clay">✓</span><span>{x}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-clay mb-5">Le prix ne comprend pas</h3>
              <ul className="space-y-3 text-base text-foreground/85">
                {[
                  "Les vols internationaux (sur demande)",
                  "Les boissons et repas non mentionnés",
                  "Les pourboires aux guides et staff",
                  "L'assurance voyage (recommandée)",
                  "Les dépenses personnelles",
                ].map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-muted-foreground">×</span><span>{x}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-sm text-foreground/70 italic max-w-2xl">
            Pour découvrir nos adresses et lodges en {pays.name},
            {" "}
            <Link
              to="/voyage-sur-mesure/$continent/$pays"
              params={{ continent: continent.slug, pays: pays.slug }}
              hash="adresses"
              className="text-clay underline hover:text-ochre transition"
            >
              voir la sélection complète sur la page {pays.name}
            </Link>.
          </p>
        </div>
      </section>

      {/* BANDE ÉLÉPHANTS — fondue dans le crème (Namibie uniquement) */}
      {pays.slug === "namibie" && (
        <section
          className="relative bg-cream overflow-hidden"
          aria-hidden="true"
        >
          <div className="w-full overflow-hidden" style={{ maxHeight: "62vh" }}>
            <img
              src={elephantsFondu}
              alt="Troupeau d'éléphants en file indienne dans le désert namibien"
              loading="lazy"
              width={1920}
              height={1080}
              className="w-full h-auto block"
              style={{ transform: "translateY(-18%)" }}
            />
          </div>
          {/* Fondu haut : masque cream plus discret pour laisser voir le sable */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-cream via-cream/70 to-transparent" />
          {/* Fondu bas : transition vers section suivante */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream via-cream/70 to-transparent" />
          {/* Fondus latéraux discrets */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-cream/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-cream/60 to-transparent" />
        </section>
      )}

      {/* AUTRES ITINÉRAIRES — proposition des autres circuits du même pays */}
      {(() => {
        const others = pays.detailed?.itineraires.filter((i: import("@/data/destinations").Itineraire) => i.slug !== itineraire.slug) ?? [];
        if (others.length === 0) return null;
        return (
          <section className="py-10 md:py-14 bg-cream border-y border-border">
            <div className="mx-auto max-w-[1400px] px-6 md:px-12">
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">
                IV — Autres itinéraires
              </p>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl leading-tight max-w-3xl">
                  Découvrez nos autres <em className="italic text-gold-gradient">circuits {pays.name}.</em>
                </h2>
                <Link
                  to="/voyage-sur-mesure/$continent/$pays"
                  params={{ continent: continent.slug, pays: pays.slug }}
                  hash="itineraires"
                  className="text-[11px] uppercase tracking-[0.3em] text-clay border-b border-clay hover:text-ink hover:border-ink transition pb-1 self-start"
                >
                  Voir tous les itinéraires {pays.name} →
                </Link>
              </div>

              <div className={`grid gap-5 ${others.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {others.map((it: import("@/data/destinations").Itineraire, idx: number) => (
                  <Link
                    key={it.slug}
                    to="/voyage-sur-mesure/$continent/$pays/$itineraire"
                    params={{ continent: continent.slug, pays: pays.slug, itineraire: it.slug }}
                    className="group block bg-background rounded-sm overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.12)] transition-all"
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden paper">
                      {it.coverImg ? (
                        <img
                          src={it.coverImg}
                          alt={`${it.title} — ${pays.name}`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-clay/30" />
                      )}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent" />
                      <span className="absolute top-3 left-3 bg-ink/65 backdrop-blur-sm text-cream text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-sm">
                        {it.level}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4 text-cream" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-cream/80 mb-1">
                          Itinéraire {String(idx + 1).padStart(2, "0")}
                        </p>
                        <h3 className="font-display italic text-2xl leading-tight">
                          {it.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <p className="text-sm text-muted-foreground">{it.duration}</p>
                        {it.priceFrom && (
                          <p className="text-sm font-display text-ink">
                            {it.priceFrom.match(/[\d\s]+€/)?.[0]?.trim() ?? it.priceFrom}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-foreground/75 leading-relaxed line-clamp-2 mb-4">
                        {it.pitch}
                      </p>
                      <span className="inline-flex text-[10px] uppercase tracking-[0.3em] text-clay border-b border-clay group-hover:text-ink group-hover:border-ink transition pb-0.5">
                        Découvrir le programme →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* CTA FINAL */}
      <section className="py-12 md:py-14 bg-ink text-cream text-center">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ochre mb-4">
            Prêt à partir ?
          </p>
          <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl leading-[1] mb-6">
            Personnaliser <em className="italic text-ochre">{itineraire.title.split("—")[0].trim()}.</em>
          </h2>
          <p className="max-w-xl mx-auto text-base opacity-80 leading-relaxed mb-8">
            Voyage conçu à la main, pour vous seuls. Devis détaillé, 100 % sur-mesure.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/demande-de-devis"
              className="inline-flex items-center bg-cream text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-ochre transition"
            >
              Demander un devis →
            </Link>
            <Link
              to="/demande-de-devis"
              className="inline-flex items-center border border-cream/40 text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-cream hover:text-ink transition"
            >
              Réserver
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
