import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/assets/hero-voyage.jpg";

const TITLE = "L'agence — La Voyagerie, voyage sur mesure à Cassis";
const DESC =
  "Découvrez La Voyagerie, agence de voyage sur mesure à Cassis fondée par Laurence Palandjian. Une équipe d'experts passionnés et un réseau de spécialistes locaux pour des voyages long-courrier authentiques.";

export const Route = createFileRoute("/a-propos-de-nous")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://lavoyagerie.fr/a-propos-de-nous" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/a-propos-de-nous" }],
  }),
  component: APropos,
});

const team = [
  {
    name: "Laurence Palandjian",
    role: "Fondatrice & gérante",
    bio: "Je suis Laurence, la fondatrice de l'agence La Voyagerie. Avec mon équipe, je crée pour vous, avec vous, le voyage de vos rêves. Votre programme se fait sur-mesure en fonction de vos envies et de votre budget.",
    photo: "/agence/laurence.webp",
  },
  {
    name: "Lisa",
    role: "Spécialiste voyage sur-mesure",
    bio: "Je suis Lisa, spécialiste du voyage sur-mesure au sein de l'agence La Voyagerie. Avec passion et expertise, je conçois — avec vous et pour vous — le voyage de vos rêves. Aventure ou détente, je compose votre programme entièrement sur-mesure pour faire de votre projet une réalité unique.",
    photo: "/agence/lisa.webp",
  },
];

const steps = [
  ["L'échange", "Nous échangeons de vive voix par téléphone, en visio ou à votre domicile pour cerner vos attentes et vos envies. Offrez-nous un peu de votre précieux temps pour en gagner par la suite."],
  ["La recherche", "Nous imaginons votre voyage personnalisé idéal en tenant compte de vos envies et de vos contraintes, en nous appuyant sur notre expertise et celle de nos partenaires locaux de confiance."],
  ["La présentation", "Nous vous présentons un premier jet d'itinéraire et d'hébergements, puis nous le retravaillons jusqu'à ce que le programme colle parfaitement à vos attentes."],
  ["La préparation", "Vous recevez vos documents de voyage par email avant le départ, accompagnés de nos conseils et de toutes les informations pratiques pour faciliter votre séjour."],
  ["Le grand départ", "Nous restons joignables 24/7 pour toute urgence pendant votre voyage. Et nous laissons aussi place à un soupçon de liberté — pour les bonnes surprises."],
];

const experts: Array<[string, string, string]> = [
  ["Catherine", "Australie", "catherine"],
  ["Laurène", "Afrique du Sud", "laurene"],
  ["Alice", "Indonésie", "alice"],
  ["Beatrix", "Corée du Sud", "beatrix"],
  ["Ivanilde", "Brésil", "ivanilde"],
  ["Sandra", "Canada", "sandra-canada"],
  ["Justine", "Polynésie", "justine"],
  ["Gaëlle", "Vietnam", "gaelle"],
  ["Marion", "Pérou", "marion"],
  ["Cherif", "Égypte", "cherif"],
  ["Rashmi", "Népal", "rashmi"],
  ["Liisa", "Norvège", "liisa"],
  ["Jean-Yves", "Laos", "jean-yves"],
  ["Laurie", "Botswana", "laurie"],
  ["Laurent", "Cambodge", "laurent"],
  ["Taina", "Finlande", "taina"],
  ["Nitin", "Inde", "nitin"],
  ["Karim", "Islande", "karim"],
  ["Marine", "Japon", "marine"],
  ["Yasar", "Jordanie", "yasar"],
  ["Vincent", "Nouvelle-Zélande", "vincent"],
  ["Sandra", "États-Unis", "sandra-usa"],
  ["Pam", "Thaïlande", "pam"],
  ["Jérôme", "Tibet", "jerome"],
  ["Emmanuelle", "Maroc", "emmanuelle"],
  ["Muneer", "Oman", "muneer"],
  ["Myo", "Myanmar", "myo"],
  ["Aurélie", "Sri Lanka", "aurelie"],
  ["Sherali", "Ouzbékistan", "sherali"],
  ["Maelle", "Nicaragua", "maelle"],
  ["Laura", "Équateur & Galápagos", "laura"],
  ["Anya", "Mongolie", "anya"],
  ["Adelind", "Mexique", "adelind"],
  ["Tristan", "Guatemala & Belize", "tristan"],
];

function APropos() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-40 pb-16 md:pt-48 md:pb-24 paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">
            ✦ L'agence de voyage
          </p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tight max-w-[18ch]">
            Experte
            <br />
            <em className="italic text-gold-gradient">en sur-mesure.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            La Voyagerie est votre agence de voyage sur-mesure à Cassis. La passion
            pour l'exploration y rencontre l'expertise pour créer des séjours uniques,
            adaptés à vos envies. Une équipe restreinte, un réseau d'experts locaux,
            des voyages écrits à la main.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-14 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">I — Mieux nous connaître</p>
          <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[0.95] mb-16 max-w-2xl">
            Une petite équipe,
            <br />
            <em className="italic">de grandes attentions.</em>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {team.map((m) => (
              <article key={m.name} className="flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 paper">
                  <img
                    src={m.photo}
                    alt={`${m.name} — ${m.role} La Voyagerie`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="border-l-2 border-clay pl-6">
                  <h3 className="font-display text-2xl md:text-3xl">{m.name}</h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-clay mt-2">{m.role}</p>
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-14 md:py-24 bg-ink text-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ochre mb-6">II — La méthode</p>
          <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[0.95] mb-16 max-w-3xl">
            Un accompagnement complet
            <br />
            <em className="italic text-ochre">pour votre voyage sur-mesure.</em>
          </h2>

          <ol className="divide-y divide-cream/15">
            {steps.map(([t, d], i) => (
              <li key={t} className="py-8 grid grid-cols-12 gap-4 items-baseline">
                <span className="col-span-2 md:col-span-1 font-display italic text-ochre text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 md:col-span-4 font-display text-2xl md:text-3xl">{t}</h3>
                <p className="col-span-12 md:col-span-7 text-sm opacity-80 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-14 md:py-24 bg-clay text-cream relative overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-6 md:px-12 text-center">
          <blockquote className="font-display text-3xl md:text-[2rem] lg:text-4xl italic leading-[1.2]">
            « Qui a l'habitude de voyager sait qu'il arrive toujours un moment où il faut partir. »
          </blockquote>
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] opacity-80">— Paulo Coelho</p>
        </div>
      </section>

      {/* LOCAL EXPERTS */}
      <section className="py-14 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">III — Nos experts locaux</p>
          <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[0.95] mb-6 max-w-3xl">
            Pour un voyage <em className="italic text-gold-gradient">authentique.</em>
          </h2>
          <p className="max-w-2xl text-muted-foreground mb-10 leading-relaxed">
            Nos spécialistes locaux sont des professionnels — mais avant tout des amoureux
            de leur destination. Grâce à leur connaissance fine du terrain, La Voyagerie
            vous offre des expériences uniques, parfaitement orchestrées.
          </p>

          <div className="flex flex-wrap gap-3">
            {experts.map(([_, country]) => (
              <span
                key={country}
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-24 bg-cream text-center">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <h2 className="font-display text-4xl md:text-[2rem] lg:text-4xl leading-[0.95] tracking-tight">
            Créons votre voyage <em className="italic text-gold-gradient">ensemble.</em>
          </h2>
          <Link
            to="/demande-de-devis"
            className="mt-12 inline-flex items-center bg-ink text-cream px-12 py-6 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay transition"
          >
            Demander un devis →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
