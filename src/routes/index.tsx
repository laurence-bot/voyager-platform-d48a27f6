import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/assets/hero-voyage.jpg";
import kyotoImg from "@/assets/dest-kyoto.jpg";
import namibieImg from "@/assets/dest-namibie.jpg";
import perouImg from "@/assets/dest-perou.jpg";
import mongolieImg from "@/assets/dest-mongolie.jpg";
import philippinesImg from "@/assets/dest-philippines.jpg";
import ougandaImg from "@/assets/dest-ouganda.jpg";
import zimbabweImg from "@/assets/dest-zimbabwe.jpg";
import canadaImg from "@/assets/dest-canada.jpg";
import bresilImg from "@/assets/dest-bresil.jpg";
import polynesieImg from "@/assets/dest-polynesie.jpg";
import laurencePortrait from "@/assets/laurence-portrait.jpg";
import laurenceVideoAsset from "@/assets/laurence-avatar.mp4.asset.json";

const TITLE = "La Voyagerie — Agence de voyage sur mesure long-courrier · Cassis";
const DESC =
  "La Voyagerie, agence de voyage sur mesure à Cassis. Voyages long-courrier d'auteur : Japon, Philippines, Ouganda, Zimbabwe, Canada, Brésil, Polynésie. Devis personnalisé sous 3 jours.";

const FAQ_ITEMS = [
  {
    q: "Comment se déroule la création d'un devis sur mesure ?",
    a: "Tout commence par un échange — téléphone, visio ou rendez-vous à Cassis. Nous écoutons vos envies, votre rythme, vos contraintes. Sous trois jours, vous recevez un premier devis personnalisé, que nous affinons ensemble jusqu'à l'itinéraire qui vous ressemble.",
  },
  {
    q: "Combien coûte un voyage sur mesure avec La Voyagerie ?",
    a: "Un voyage long-courrier signé La Voyagerie débute généralement autour de 4 500 € par personne, vols, hébergements de charme, guides francophones et activités exclusives compris. Le budget s'adapte à la durée, à la destination et au niveau de confort souhaité — toujours sans intermédiaire ni marge cachée.",
  },
  {
    q: "Pour qui sont vos voyages ?",
    a: "Pour les voyageurs curieux, en couple, en famille ou entre amis, qui préfèrent l'authenticité aux sentiers balisés. Nos itinéraires conviennent aussi bien à une première grande aventure qu'à des voyageurs expérimentés en quête de rencontres rares.",
  },
  {
    q: "Sous quel délai répondez-vous à une demande ?",
    a: "Toute demande de devis reçoit une première réponse personnalisée sous trois jours ouvrés. Pendant le voyage, notre équipe reste joignable 24/7 pour toute question ou imprévu.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "agence de voyage sur mesure, voyage long-courrier, agence voyage Cassis, voyage Japon, voyage Philippines, voyage Ouganda gorilles, voyage Zimbabwe, voyage Canada, voyage Brésil, voyage Polynésie, voyage authentique, voyage haut de gamme" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://lavoyagerie.fr/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_JSONLD),
      },
    ],
  }),
  component: Index,
});

const phares = [
  {
    n: "01",
    name: "Japon",
    region: "Asie · Honshū & Kansai",
    tagline: "Culture",
    img: kyotoImg,
    note: "Temples au lever du jour, ryokans centenaires, artisans de Kanazawa et nuits sur le Mont Kōya.",
    continent: "asie" as const,
    pays: "japon" as const,
  },
  {
    n: "02",
    name: "Philippines",
    region: "Asie · 7 000 îles",
    tagline: "Îles",
    img: philippinesImg,
    note: "Lagons d'El Nido, rizières de Banaue, plongée à Apo Reef — l'archipel comme une mosaïque vivante.",
    continent: "asie" as const,
    pays: "philippines" as const,
  },
  {
    n: "03",
    name: "Ouganda",
    region: "Afrique · Bwindi",
    tagline: "Rencontre",
    img: ougandaImg,
    note: "Le trek aux gorilles de Bwindi — l'une des rencontres les plus bouleversantes que l'on puisse vivre.",
    continent: "afrique" as const,
    pays: "ouganda" as const,
  },
  {
    n: "04",
    name: "Zimbabwe",
    region: "Afrique australe",
    tagline: "Safari",
    img: zimbabweImg,
    note: "Chutes Victoria, Mana Pools, éléphants de Hwange — l'Afrique authentique des grands espaces.",
    continent: "afrique" as const,
    pays: "zimbabwe" as const,
  },
  {
    n: "05",
    name: "Namibie",
    region: "Afrique australe · Désert",
    tagline: "Désert",
    img: namibieImg,
    note: "Sossusvlei, Skeleton Coast, Damaraland, Etosha — un pays minéral où chaque kilomètre raconte une histoire.",
    continent: "afrique" as const,
    pays: "namibie" as const,
  },
  {
    n: "06",
    name: "Canada",
    region: "Amérique du Nord",
    tagline: "Grands espaces",
    img: canadaImg,
    note: "Rocheuses, Yukon sauvage, baleines du Saint-Laurent — un voyage où la nature impose le rythme.",
    continent: "ameriques" as const,
    pays: "canada" as const,
  },
  {
    n: "07",
    name: "Brésil",
    region: "Amérique du Sud",
    tagline: "Nature",
    img: bresilImg,
    note: "Amazonie, Pantanal, Chapada Diamantina, plages de Bahia — un Brésil hors des clichés.",
    continent: "ameriques" as const,
    pays: "bresil" as const,
  },
  {
    n: "08",
    name: "Polynésie",
    region: "Océanie · Pacifique sud",
    tagline: "Évasion",
    img: polynesieImg,
    note: "Bora Bora, Marquises, Tuamotu — archipels, lagons turquoise et culture maohi vivante.",
    continent: "oceanie" as const,
    pays: "polynesie" as const,
  },
];

const piliers = [
  ["I", "Des voyages qui vous ressemblent", "Conçus avec passion et expérience, testés par notre équipe avant de vous être proposés."],
  ["II", "Petite équipe, grandes attentions", "Une agence à taille humaine. Chaque voyageur n'a qu'une interlocutrice, du premier mot au dernier souvenir."],
  ["III", "Voyagez autrement", "Itinéraires respectueux des cultures et de l'environnement, partenaires locaux choisis un à un."],
  ["IV", "Liberté sans stress", "Suivi avant et pendant le voyage. Nous restons joignables 24/7 pour toute urgence."],
];

const etapes = [
  "Découvrez nos différents voyages",
  "Nous échangeons sur vos envies",
  "Nous créons un devis personnalisé",
  "Des propositions sur-mesure",
  "Confirmation de votre voyage",
  "Suivi avant et pendant le voyage",
];

const engagements = [
  ["01", "Passion terrain", "Chaque destination est repérée et testée par notre équipe avant de vous être proposée."],
  ["02", "Guides locaux francophones", "Des conteurs, pisteurs et complices, choisis un par un, qui parlent votre langue."],
  ["03", "100 % sur-mesure", "Votre rythme, vos envies, votre budget. Aucun voyage standard, jamais."],
  ["04", "Adresses coup de cœur", "Lodges intimes, ryokans centenaires, maisons d'hôtes confidentielles — testés sur place."],
  ["05", "Logistique invisible", "Vols, transferts, permis, réservations : nous orchestrons, vous profitez."],
  ["06", "Assistance 24/7", "Une équipe à taille humaine, vraiment joignable, avant et pendant votre voyage."],
];

const journal = [
  {
    img: namibieImg,
    cat: "Carnet · Afrique",
    date: "Avril 2026",
    title: "Namibie : dix jours sous les étoiles du Namib",
    extrait: "Sossusvlei à l'aube, bivouac au Damaraland, rencontre avec les Himba — récit d'un repérage aux confins du désert.",
  },
  {
    img: perouImg,
    cat: "Inspiration · Amériques",
    date: "Mars 2026",
    title: "Pérou : la vallée sacrée hors des sentiers",
    extrait: "Au-delà du Machu Picchu, ces villages andins où l'on tisse encore comme au temps des Incas.",
  },
  {
    img: mongolieImg,
    cat: "Conseils · Asie",
    date: "Février 2026",
    title: "Mongolie : quelle saison pour le grand silence ?",
    extrait: "Steppes d'été, glace du Khövsgöl, festival du Naadam — notre guide pour choisir votre fenêtre.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader overlay />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Voyage sur mesure long-courrier — La Voyagerie, agence de voyage à Cassis"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/80" />
        <div className="grain absolute inset-0" />

        <div className="relative h-full mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-5 md:px-12 flex flex-col justify-end pb-12 md:pb-24 text-cream">
          <div className="reveal">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] mb-4 md:mb-6 opacity-80">
              Agence de voyage sur mesure · Cassis
            </p>
            <h1 className="font-display text-[15vw] sm:text-[10vw] md:text-[7.5vw] lg:text-[5.5vw] xl:text-[5vw] leading-[0.9] tracking-tight max-w-[20ch]">
              Et vous,
              <br />
              <em className="italic font-light text-gold-gradient">où iriez-vous&nbsp;?</em>
            </h1>
            <p className="font-hand text-2xl md:text-3xl text-cream/85 mt-4 md:mt-5">
              Dites-nous simplement ce qui vous fait rêver… on s'occupe du reste.
            </p>

            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-10">
              <Link
                to="/prise-de-rendez-vous"
                className="inline-flex items-center justify-center bg-cream text-ink px-7 md:px-10 py-4 md:py-5 text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] rounded-full hover:bg-clay hover:text-cream transition group"
              >
                Je prends rendez-vous
                <span className="ml-3 group-hover:translate-x-1 transition">→</span>
              </Link>
              <a
                href="#destinations"
                className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] underline underline-offset-8 decoration-cream/40 hover:decoration-cream"
              >
                Voir les destinations
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MOT D'ACCUEIL — manuscrit */}
      <section className="paper border-b border-border">
        <div className="boho-band w-full opacity-80" aria-hidden />
        <div className="mx-auto max-w-[900px] px-5 md:px-12 py-10 md:py-16 text-center">
          <p className="font-hand text-[1.6rem] sm:text-3xl md:text-4xl leading-[1.5] text-ink/85">
            Ici, pas de catalogue ni de formulaire froid. Juste une petite équipe,
            un carnet, un thé, et l'envie d'écouter votre histoire avant d'écrire la suite.
          </p>
          <div className="gold-rule w-40 mx-auto mt-8" aria-hidden />
          <p className="font-hand text-xl md:text-2xl text-clay mt-6">— Laurence &amp; l'équipe, Cassis</p>
        </div>
      </section>

      {/* PILIERS */}
      <section className="py-10 md:py-16 bg-cream border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {piliers.map(([n, t, d]) => (
            <div key={n} className="relative pl-5 border-l border-clay/25">
              <span className="absolute -left-[4px] top-2 h-[7px] w-[7px] rotate-45 bg-clay/60" aria-hidden />
              <p className="font-display italic text-clay text-2xl mb-3">{n}</p>
              <h3 className="font-display text-lg md:text-xl uppercase tracking-wide leading-tight">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* MARQUEE */}
      <div className="border-b border-border py-2 md:py-3 overflow-hidden bg-cream">
        <div className="marquee flex gap-6 md:gap-10 whitespace-nowrap font-sans text-sm md:text-base text-ink/40 tracking-[0.15em] uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-6 md:gap-10 shrink-0 items-center">
              <span>Japon</span><span className="text-clay/60">✦</span>
              <span>Philippines</span><span className="text-clay/60">✦</span>
              <span>Ouganda</span><span className="text-clay/60">✦</span>
              <span>Zimbabwe</span><span className="text-clay/60">✦</span>
              <span>Canada</span><span className="text-clay/60">✦</span>
              <span>Brésil</span><span className="text-clay/60">✦</span>
              <span>Polynésie</span><span className="text-clay/60">✦</span>
              <span>Namibie</span><span className="text-clay/60">✦</span>
              <span>Pérou</span><span className="text-clay/60">✦</span>
              <span>Mongolie</span><span className="text-clay/60">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* MANIFESTE — votre agence à votre écoute */}
      <section className="relative py-8 md:py-14">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 grid md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-3">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay">I — À votre écoute</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl leading-[1.2] tracking-tight">
              Chez <strong>La Voyagerie</strong>, nous créons des voyages personnalisés conçus
              avec passion et expérience. Chaque destination est testée par notre équipe avant
              de vous être proposée — pour des séjours uniques, authentiques et adaptés à
              vos envies. <em className="italic text-clay">Voyagez en toute confiance</em>
              &nbsp;avec une agence qui connaît le terrain.
            </h2>
            <Link
              to="/a-propos-de-nous"
              className="mt-8 md:mt-10 inline-flex items-center text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink border border-ink rounded-full px-6 md:px-8 py-3 md:py-4 hover:bg-ink hover:text-cream transition"
            >
              Découvrez notre agence →
            </Link>
          </div>
        </div>
      </section>

      {/* RENCONTREZ LAURENCE */}
      <section className="relative py-12 md:py-20 paper border-t border-border overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative order-1 md:order-1 max-w-[440px] mx-auto md:mx-0">
            {/* halo terracotta + cadre arche */}
            <div className="absolute -inset-6 arch blur-3xl opacity-25 bg-gold/70" aria-hidden />
            <div className="relative arch border border-gold/50 p-2 md:p-3 glow-warm">
              <div className="relative overflow-hidden arch bg-ink/5">
                <video
                  src={laurenceVideoAsset.url}
                  poster={laurencePortrait}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Laurence Palandjian, fondatrice de La Voyagerie, vous accueille"
                  className="w-full h-[440px] md:h-[580px] object-cover"
                />
              </div>
            </div>
            {/* note manuscrite épinglée */}
            <div className="tape relative mt-8 md:mt-0 md:absolute md:-bottom-8 md:-right-10 md:w-[260px] bg-cream border border-border shadow-[0_18px_50px_-25px_rgba(0,0,0,0.4)] px-6 py-6 md:rotate-[-2deg]">
              <p className="font-hand text-xl md:text-2xl leading-snug text-ink/85">
                « On se retrouve autour d'un café à Cassis&nbsp;? Apportez vos rêves,
                j'apporte les cartes. »
              </p>
            </div>
          </div>

          <div className="order-2 md:order-2">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-4 md:mb-6">
              Rencontrez Laurence
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl leading-[1.05] tracking-tight mb-5">
              Bonjour,<br />
              <em className="italic text-clay">je suis Laurence.</em>
            </h2>
            <p className="font-hand text-2xl md:text-3xl text-clay mb-6">
              Vingt ans de routes, de carnets et de rencontres.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-[480px] mb-8">
              Depuis plus de 20 ans, je crée des voyages sur mesure. J'ai transmis
              ma méthode à une intelligence dédiée — <strong className="text-ink">Le Savoir de Laurence</strong> —
              pour comprendre votre projet avant même que je le compose.
            </p>
            <Link
              to="/savoir-de-laurence"
              className="inline-flex items-center bg-ink text-cream px-7 md:px-10 py-4 md:py-5 text-[10px] md:text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay transition group"
            >
              Vivre l'expérience
              <span className="ml-3 group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>
        </div>
      </section>


      {/* DESTINATIONS PHARES */}
      <section id="destinations" className="relative bg-ink text-cream py-8 md:py-14">
        <div className="gold-rule absolute top-0 inset-x-0" aria-hidden />
        <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-5 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-10 md:mb-16">
            <div>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ochre mb-4 md:mb-6">II — Destinations phares</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-[2rem] lg:text-4xl leading-[0.95]">
                Nos huit destinations
                <br />
                <em className="italic text-ochre">coups de cœur.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm opacity-70 pb-4">
              Huit itinéraires long-courrier signés La Voyagerie — pour vous donner
              le ton de ce que nous savons composer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-14">
            {phares.map((d) => (
              <Link
                key={d.n}
                to="/voyage-sur-mesure/$continent/$pays"
                params={{ continent: d.continent, pays: d.pays }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream/5">
                  <img
                    src={d.img}
                    alt={`Voyage sur mesure ${d.name}`}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 text-cream text-[10px] tracking-[0.3em] uppercase mix-blend-difference">
                    {d.n}
                  </div>
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-ochre">{d.tagline}</p>
                <div className="pt-2 flex items-baseline justify-between border-b border-cream/20 pb-3 gap-3">
                  <h3 className="font-display text-2xl md:text-3xl group-hover:text-ochre transition">{d.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.25em] opacity-60 text-right max-w-[55%]">{d.region}</span>
                </div>
                <p className="pt-3 text-sm opacity-70 max-w-md leading-relaxed">{d.note}</p>
                <p className="pt-3 text-[10px] uppercase tracking-[0.3em] text-ochre opacity-90 group-hover:opacity-100">
                  Découvrir {d.name} <span className="ml-1 inline-block group-hover:translate-x-1 transition">→</span>
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14 md:mt-20 text-center border-t border-cream/10 pt-12 md:pt-16 py-0 my-[8px]">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ochre mb-4 md:mb-6">
              Collection d'itinéraires · 100 % personnalisables
            </p>
            <h3 className="font-display text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl mb-8 md:mb-10 max-w-2xl mx-auto leading-tight">
              Namibie, Pérou, Mongolie, Patagonie…
              <br />
              <em className="italic text-ochre">parcourez le monde entier.</em>
            </h3>
            <Link
              to="/voyage-sur-mesure"
              className="inline-flex items-center bg-cream text-ink px-7 md:px-10 py-4 md:py-5 text-[10px] md:text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay hover:text-cream transition"
            >
              Voir toutes les destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="py-10 md:py-16 bg-cream border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12">
          <div className="grid md:grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-16">
            <div className="md:col-span-5">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-4 md:mb-6">Nos engagements</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-[2rem] lg:text-4xl leading-[0.95]">
                Une promesse <em className="italic text-clay">tenue</em>, du premier mot au retour.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                Six engagements concrets qui font la différence d'une agence à taille humaine,
                avec une vraie culture du terrain et un sens de l'attention.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-10 md:gap-y-14 border-t border-border pt-10 md:pt-14">
            {engagements.map(([n, t, d]) => (
              <div key={n}>
                <p className="font-display italic text-clay text-2xl md:text-3xl mb-3">{n}</p>
                <h3 className="font-display text-lg md:text-xl uppercase tracking-wide leading-tight">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDÉOS AUTHENTIQUES */}
      <section className="py-10 md:py-16 bg-cream">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-4 md:mb-6">III — Vidéos authentiques</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2rem] lg:text-4xl leading-[0.95] mb-4 md:mb-6 max-w-3xl">
            Le voyage, raconté
            <br />
            <em className="italic text-clay">en images vraies.</em>
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-muted-foreground mb-10 md:mb-14 leading-relaxed">
            Nous filmons nos repérages — sans mise en scène, sans drone publicitaire.
            Pour vous donner une idée juste de ce que vous allez vivre, et de ce que
            nous savons composer.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { img: ougandaImg, label: "Bwindi · Ouganda", note: "Trek aux gorilles, mars dernier" },
              { img: philippinesImg, label: "Palawan · Philippines", note: "El Nido, lever du jour" },
              { img: kyotoImg, label: "Kyoto · Japon", note: "Temples avant l'aube" },
            ].map((v) => (
              <div key={v.label} className="group relative aspect-[4/5] overflow-hidden">
                <img
                  src={v.img}
                  alt={`Vidéo ${v.label}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream/90 flex items-center justify-center group-hover:bg-clay group-hover:text-cream transition">
                    <span className="ml-1 border-l-[14px] border-l-ink border-y-[9px] border-y-transparent group-hover:border-l-cream" />
                  </div>
                </div>
                <div className="absolute bottom-4 md:bottom-5 left-4 md:left-5 text-cream">
                  <p className="font-display text-lg md:text-xl">{v.label}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] opacity-80 mt-1">{v.note}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 md:mt-10 text-xs text-muted-foreground italic">
            ↳ Nos carnets vidéo complets sont disponibles sur demande, ou&nbsp;
            <a href="https://www.instagram.com/lavoyagerie" target="_blank" rel="noopener" className="underline hover:text-clay">sur notre Instagram</a>.
          </p>
        </div>
      </section>

      {/* CONTINENTS */}
      <section className="py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-14">
            <div className="md:col-span-7">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-4 md:mb-6">Parcourir le monde</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
                Cinq continents, <em className="italic text-clay">mille itinéraires.</em>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Du safari namibien aux temples de Kyoto, chaque destination est confiée à un spécialiste qui la connaît intimement. Choisissez un continent pour commencer.
              </p>
              <Link
                to="/voyage-sur-mesure"
                className="inline-block mt-6 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink underline underline-offset-8 decoration-ink/30 hover:decoration-clay hover:text-clay transition"
              >
                Toutes les destinations →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
            {[
              ["afrique", "Afrique", ougandaImg],
              ["ameriques", "Amériques", bresilImg],
              ["asie", "Asie", kyotoImg],
              ["oceanie", "Océanie", polynesieImg],
              ["europe", "Europe", namibieImg],
            ].map(([slug, name, img], i) => (
              <Link
                key={slug as string}
                to="/voyage-sur-mesure/$continent"
                params={{ continent: slug as string }}
                className={`group relative block overflow-hidden aspect-[3/4] ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <img
                  src={img as string}
                  alt={name as string}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className="font-display text-2xl md:text-3xl text-cream leading-none">
                    {name}
                  </h3>
                  <p className="mt-2 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-cream/70 flex items-center gap-2">
                    Découvrir
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="py-10 md:py-16 bg-cream border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-10 md:mb-16">
            <div>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-4 md:mb-6">Carnet de voyage</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-[2rem] lg:text-4xl leading-[0.95] max-w-3xl">
                Récits, conseils & <em className="italic text-clay">inspirations</em>.
              </h2>
            </div>
            <Link
              to="/blog-agence-voyage"
              className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink underline underline-offset-8 decoration-ink/30 hover:decoration-clay hover:text-clay transition self-start md:self-end"
            >
              Tout le journal →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {journal.map((a) => (
              <Link
                key={a.title}
                to="/blog-agence-voyage"
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-clay">
                  {a.cat} · {a.date}
                </p>
                <h3 className="mt-3 font-display text-xl md:text-2xl leading-snug group-hover:text-clay transition">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {a.extrait}
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-ink opacity-70 group-hover:opacity-100">
                  Lire <span className="ml-1 inline-block group-hover:translate-x-1 transition">→</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ÉTAPES */}
      <section className="py-8 md:py-14 bg-cream">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 grid md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-4">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-4 md:mb-6">IV — Les étapes</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2rem] lg:text-4xl leading-[0.95]">
              Pour un voyage
              <br />
              <em className="italic">100 % personnalisé.</em>
            </h2>
            <p className="mt-6 md:mt-8 text-sm text-muted-foreground max-w-sm">
              De la première conversation au retour de voyage, six étapes pour
              composer votre itinéraire et vous accompagner sereinement.
            </p>
          </div>
          <div className="md:col-span-8 md:border-l border-border md:pl-12">
            <ol className="divide-y divide-border">
              {etapes.map((e, i) => (
                <li key={e} className="py-4 md:py-6 flex items-baseline gap-4 md:gap-6">
                  <span className="font-display italic text-clay text-xl md:text-2xl w-8 md:w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-lg md:text-2xl">{e}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-clay text-cream py-12 md:py-16 relative overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="boho-band absolute top-0 inset-x-0 opacity-40 invert" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 md:px-12 text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] mb-6 md:mb-10 opacity-80">
            ↳ L'avis d'une voyageuse
          </p>
          <blockquote className="font-hand text-3xl sm:text-4xl md:text-5xl leading-[1.35]">
            « Vous m'avez offert quatorze jours dont je me souviendrai
            quatorze ans. Le voyage que je n'aurais jamais su demander, et
            pourtant celui qu'il me fallait. »
          </blockquote>
          <p className="mt-6 md:mt-10 text-[10px] md:text-[11px] uppercase tracking-[0.3em] opacity-80">
            — Élise M., retour d'Ouganda
          </p>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-10 md:py-16 bg-cream border-t border-border">
        <div className="mx-auto max-w-[1100px] px-5 md:px-12">
          <div className="grid md:grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-16">
            <div className="md:col-span-4">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-4 md:mb-6">Questions fréquentes</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
                Tout ce que <em className="italic text-clay">vous voulez savoir</em> avant de partir.
              </h2>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-border border-y border-border">
                {FAQ_ITEMS.map((item) => (
                  <li key={item.q}>
                    <details className="group py-5 md:py-6">
                      <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                        <h3 className="font-display text-lg md:text-2xl leading-snug pr-4">{item.q}</h3>
                        <span className="font-display italic text-clay text-2xl md:text-3xl shrink-0 leading-none transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 md:py-20 paper relative">
        <div className="boho-band absolute top-0 inset-x-0 opacity-70" aria-hidden />
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-6 md:mb-8">V — Écrire</p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-9xl leading-[0.9] tracking-tight max-w-[14ch] mx-auto">
            Le voyage
            <br />
            <em className="italic text-gold-gradient">commence ici.</em>
          </h2>
          <p className="font-hand text-2xl md:text-4xl text-ink/80 mt-6 md:mt-8">
            Écrivez-nous comme à une amie qui connaît bien la route.
          </p>
          <p className="mt-5 md:mt-6 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Adressez-nous quelques lignes : une saison, une humeur, un souvenir
            d'enfance. Nous vous répondrons sous trois jours, à la main.
          </p>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demande-de-devis"
              className="inline-flex items-center bg-ink text-cream px-8 md:px-12 py-4 md:py-6 text-[10px] md:text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay transition group"
            >
              Demander un devis
              <span className="ml-3 group-hover:translate-x-1 transition">→</span>
            </Link>
            <Link
              to="/prise-de-rendez-vous"
              className="inline-flex items-center border border-ink text-ink px-8 md:px-12 py-4 md:py-6 text-[10px] md:text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-ink hover:text-cream transition"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
