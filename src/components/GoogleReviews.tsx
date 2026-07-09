import { useEffect, useRef, useState } from "react";

/**
 * Avis Google — carrousel éditorial.
 *
 * Deux modes :
 *  1. Widget tiers (Elfsight / Trustindex) : passez `widgetHtml` (le snippet <div ...></div>)
 *     et `widgetScriptSrc` (l'URL du script). Le composant injecte le script une seule fois.
 *  2. Mode statique (par défaut) : affiche les avis listés dans `reviews`. Élégant, instantané,
 *     éditable depuis ce fichier.
 *
 * Pour passer en widget Elfsight :
 *   <GoogleReviews
 *      widgetHtml='<div class="elfsight-app-XXXX" data-elfsight-app-lazy></div>'
 *      widgetScriptSrc="https://elfsightcdn.com/platform.js"
 *   />
 */

export type Review = {
  author: string;
  date: string;
  rating: number; // 1-5
  text: string;
  initials?: string;
};

const DEFAULT_REVIEWS: Review[] = [
  { author: "Claire Tiersonnier", date: "Avril 2026", rating: 5, text: "On ne regrette pas d'avoir fait confiance à cette agence pour un road trip safari en Namibie de 10 jours. Les conseils avisés, l'écoute et le professionnalisme." },
  { author: "Christine Felix", date: "Mars 2026", rating: 5, text: "Grâce à cette agence très professionnelle et humaine nous avons réalisé le voyage de notre vie au Japon, nous avons pu choisir à la carte notre périple, tout était parfait : les hôtels, les ryokan, les transports. Encore un grand merci." },
  { author: "Maëva Marques", date: "Février 2026", rating: 5, text: "Nous avons confié l'organisation de notre voyage de noces à La Voyagerie, et plus particulièrement à Lisa, qui a parfaitement compris nos envies." },
  { author: "Laurent Sanchez", date: "Janvier 2026", rating: 5, text: "Voyage sur mesure en Tanzanie, agence à l'écoute de ses clients et toujours disponible même lorsque nous sommes à l'étranger." },
  { author: "Sylvie Thiroux", date: "Janvier 2026", rating: 5, text: "Un voyage parfaitement organisé et suivi par Laurence qui a réglé les quelques contretemps." },
  { author: "Valérie Mely", date: "Janvier 2026", rating: 5, text: "Merci Laurence et La Voyagerie pour nous avoir permis de vivre un voyage de rêve en Tanzanie et Zanzibar. Organisation du safari et choix des lodges optimale. Disponible et joignable à tout moment." },
  { author: "Cédric Bidault", date: "Janvier 2026", rating: 5, text: "Très belle expérience du début à la fin. Organisation impeccable. Je recommande sans hésitation cette entreprise pour son sérieux et son professionnalisme." },
  { author: "Rémi Follet", date: "Novembre 2025", rating: 5, text: "Une équipe aux petits soins, toujours à l'écoute et très réactive pour organiser mon voyage en Ouganda !" },
  { author: "Laurence Mas", date: "Novembre 2025", rating: 5, text: "Programme parfait, nos demandes ont été respectées, une organisation au top dans les moindres détails, nous n'avions qu'à nous laisser guider, ce qui est primordial en vacances." },
  { author: "Floriane Lahaye", date: "Octobre 2025", rating: 5, text: "Un grand merci à l'agence La Voyagerie Marseille pour l'organisation parfaite de notre séjour en Namibie !" },
  { author: "Mireille Lauri", date: "Octobre 2025", rating: 5, text: "Venise, la Sérénissime ! Ville de charme, de caractère où on aime s'y perdre." },
  { author: "Margaux Duteil", date: "Septembre 2025", rating: 5, text: "Nous avons passé un séjour inoubliable grâce à cette organisation exceptionnelle ! Un grand MERCI pour ce voyage féérique créé par vos soins !" },
  { author: "Audrey Pierra", date: "Juillet 2024", rating: 5, text: "Nous avons découvert l'Ouest canadien et les Rockies en autotour grâce à Laurence à qui nous confions nos vacances depuis plusieurs années. Toujours à l'écoute." },
  { author: "Rita Ferretti", date: "Juillet 2025", rating: 5, text: "Laurence a su, en tout point, nous planifier un itinéraire à notre image. Nous ne souhaitions pas être en rep dom à Punta Cana, mais nous voulions quelque chose de différent." },
  { author: "Odette Richert", date: "Août 2024", rating: 5, text: "Merci pour ce merveilleux voyage. On est toujours sous le charme de notre safari en Tanzanie." },
  { author: "Elsa Martinico", date: "Février 2025", rating: 5, text: "Merci à Laurence et à son équipe qui ont organisé pour notre famille plusieurs voyages. Professionnalisme et adaptabilité +++ pour des séjours sur-mesure où tout le monde s'y retrouve." },
  { author: "Gérard Trek", date: "Janvier 2025", rating: 5, text: "Jamais deux sans trois. Troisième voyage organisé par La Voyagerie et toujours aussi bien. 17 jours en Thaïlande du sud au nord, prestations parfaites." },
  { author: "Martine & Alain Hernandez", date: "Janvier 2025", rating: 5, text: "Grâce à La Voyagerie nous avons réalisé un safari inoubliable en Tanzanie et une extension magnifique à Zanzibar. Laurence et Lisa ont toujours été présentes." },
  { author: "Brahim Habi", date: "Janvier 2025", rating: 5, text: "Voyage magnifique grâce à leur organisation, suivi parfait tout au long du séjour, joignable à n'importe quel moment. Je recommande fortement." },
  { author: "Stéphane Lepage", date: "Février 2025", rating: 5, text: "Je conseille cette agence de voyage les yeux fermés. Laurence et Lisa seront à votre écoute pour vous préparer le voyage de vos rêves sur mesure." },
  { author: "Marie Warton", date: "Janvier 2025", rating: 5, text: "Nous avons été ravis de notre périple en Tanzanie et Zanzibar." },
  { author: "Serge Spaccesi", date: "Janvier 2025", rating: 5, text: "Très beau safari avec un guide francophone à l'écoute et très sympa. Très bonne organisation par l'agence La Voyagerie. Laurence et Lisa ont été présentes tout au long du voyage." },
  { author: "Fr Hu", date: "Décembre 2021", rating: 5, text: "Laurence nous a organisé un voyage de rêve au Costa Rica dernière minute. Les hôtels et les prestataires ont été de grande qualité, choisis avec soin." },
  { author: "Cécile Mandin", date: "Septembre 2024", rating: 5, text: "Un magnifique voyage entre mère et fille organisé par La Voyagerie. Merci à Laurence pour tous ces merveilleux souvenirs. Un voyage organisé parfaitement et une disponibilité très appréciable." },
  { author: "Jen Grassiano", date: "Novembre 2024", rating: 5, text: "Une expérience inoubliable au Brésil grâce à l'agence La Voyagerie que nous tenons à remercier ! Nous venons de passer un séjour fantastique." },
  { author: "Elena de la Sota", date: "Septembre 2024", rating: 5, text: "Laurence nous a préparé un itinéraire incroyable pour notre voyage de noces. Le choix du parcours et des hôtels était parfait. Merci !" },
  { author: "Thierry C.", date: "Septembre 2024", rating: 5, text: "La Voyagerie, c'est une agence extraordinaire, à taille humaine où la personnalisation est le point fort." },
  { author: "Cécile Moreau", date: "Septembre 2024", rating: 5, text: "Il y a agence et agence. La Voyagerie est plus qu'une agence. Le voyage commence dès le premier rendez-vous avec une écoute professionnelle et personnalisée." },
  { author: "Séverine Grandgeorge", date: "Août 2024", rating: 5, text: "Superbe voyage en Tanzanie, safari époustouflant et émouvant, guide super sympa, hôtels et camps superbes, on oublie tout." },
  { author: "Dominique Chatellier", date: "Février 2024", rating: 5, text: "Après le pays des big five, nous avons souhaité aller à la rencontre des gorilles et des chimpanzés." },
  { author: "Dominique Daguillon", date: "Février 2024", rating: 5, text: "Super contact, très professionnel, fait le maximum pour les clients. Je recommande +++" },
  { author: "Marine Fabretti-Devors", date: "Janvier 2024", rating: 5, text: "Nous sommes passés par La Voyagerie pour la réalisation sur mesure de notre voyage de noces." },
  { author: "Nicole Bartke", date: "Novembre 2023", rating: 5, text: "Voyage formidable. Exactement ce dont on rêvait. Merci à Laurence pour l'organisation et d'avoir ciblé vraiment nos envies. Je recommande vivement, très pro. PURA VIDA !" },
  { author: "Nadine Del", date: "Octobre 2023", rating: 5, text: "Voyage magnifique, j'ai réalisé mon rêve de nager avec les dauphins et tortues. Merci pour l'excellente organisation." },
  { author: "Audrey Ferron", date: "Septembre 2023", rating: 5, text: "Je recommande, grand professionnalisme, à votre écoute sur votre demande et vos besoins." },
  { author: "Magali C.", date: "Juin 2023", rating: 5, text: "Superbe voyage, organisation au top ! Avec de très belles infrastructures et un très bon suivi." },
  { author: "Sandrine Gorges", date: "Août 2023", rating: 4, text: "Voyage répondant complètement à nos demandes, hébergements, excursions, au top, merci et probablement à bientôt !" },
  { author: "Delphine Godo", date: "Février 2023", rating: 5, text: "Service parfait ! Je recommande vivement." },
  { author: "Cécile M.", date: "Février 2023", rating: 5, text: "MERCI à Laurence qui nous a aidés à réaliser notre rêve de faire un voyage inoubliable en famille." },
  { author: "Rita Ferretti", date: "Février 2023", rating: 5, text: "Un voyage à la carte et sur mesure en République Dominicaine que Laurence a su boucler en un temps record tout en étant à l'écoute." },
  { author: "Gérald Marmo", date: "Février 2023", rating: 5, text: "Superbe voyage. Paysages variés et faune abondante." },
  { author: "Marjorie de Luca", date: "Novembre 2022", rating: 5, text: "Un grand merci à Laurence pour son accompagnement et l'organisation de notre voyage à l'île Maurice !" },
  { author: "Hakima Lemmouchi", date: "Septembre 2022", rating: 5, text: "Laurence de La Voyagerie s'est occupée pour nous de l'élaboration de nos dernières vacances d'été en famille en Tanzanie et Zanzibar." },
  { author: "Olivier Martire", date: "Août 2022", rating: 5, text: "Un immense merci à Laurence pour l'organisation de notre voyage en Tanzanie et Zanzibar." },
  { author: "Agathe Sebbag", date: "Septembre 2022", rating: 5, text: "Voyage à la carte correspondant à nos attentes ! Tout était parfait sur place !" },
  { author: "Denis Chris", date: "Septembre 2022", rating: 5, text: "Un voyage conçu au millimètre, toujours disponible, des conseils pertinents, on sent de suite que c'est du vécu. Simplement parfait. À recommander les yeux fermés." },
  { author: "Paule Baert", date: "Septembre 2022", rating: 5, text: "Nous avons contacté La Voyagerie J-15 pour un séjour en Polynésie Française. Là où 3 autres agences n'ont pas réussi en 6 mois, Laurence a mis en place un voyage parfait." },
  { author: "Michel Campagne", date: "Septembre 2022", rating: 5, text: "Laurence et toute son équipe sont vraiment formidables. Nous avions un projet de voyage en Tanzanie très précis et elle a su capter nos attentes." },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden
          className={`w-3.5 h-3.5 ${i < count ? "fill-ochre" : "fill-cream/15"}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9 4.75 17.65l1-5.85L1.5 7.65l5.9-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

type Props = {
  reviews?: Review[];
  /** HTML du widget (ex. Elfsight <div class="elfsight-app-XXX">…</div>) */
  widgetHtml?: string;
  /** URL du script à injecter pour activer le widget */
  widgetScriptSrc?: string;
  /** Titre éditorial */
  title?: string;
  /** Sous-titre / résumé (note moyenne, nombre d'avis…) */
  subtitle?: string;
  /** Lien "Voir tous les avis" */
  googleHref?: string;
};

export function GoogleReviews({
  reviews = DEFAULT_REVIEWS,
  widgetHtml,
  widgetScriptSrc,
  title = "Ce qu'en disent nos voyageurs",
  subtitle = "4,9 / 5 sur Google · 48 avis",
  googleHref = "https://www.google.com/search?q=La+Voyagerie+Cassis+avis",
}: Props) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Injecte le script du widget une seule fois (évite les doublons en client SPA)
  useEffect(() => {
    if (!widgetScriptSrc) return;
    if (document.querySelector(`script[src="${widgetScriptSrc}"]`)) return;
    const s = document.createElement("script");
    s.src = widgetScriptSrc;
    s.async = true;
    document.body.appendChild(s);
  }, [widgetScriptSrc]);

  // Auto-rotation toutes les 7s
  useEffect(() => {
    if (widgetHtml) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, [reviews.length, widgetHtml]);

  // Mode widget tiers
  if (widgetHtml) {
    return (
      <section className="bg-cream border-t border-border py-10 md:py-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-clay/70" />
            <p className="text-[10px] uppercase tracking-[0.35em] text-clay/80">
              Avis Google
            </p>
          </div>
          <h2 className="font-display text-2xl md:text-[2rem] leading-[1.15] tracking-tight mb-8 max-w-2xl">
            {title}
          </h2>
          <div ref={widgetRef} dangerouslySetInnerHTML={{ __html: widgetHtml }} />
        </div>
      </section>
    );
  }

  const visible = reviews[index];

  return (
    <section className="bg-cream border-t border-border py-10 md:py-12 overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-clay/70" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-clay/80">
                Avis Google
              </p>
            </div>
            <h2 className="font-display text-2xl md:text-[2rem] leading-[1.15] tracking-tight max-w-2xl">
              {title}
            </h2>
            <div className="mt-3 text-sm text-foreground/65 flex items-center gap-3">
              <Stars count={5} />
              <span>{subtitle}</span>
            </div>
          </div>
          <a
            href={googleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.3em] text-clay hover:text-ochre transition border-b border-clay/40 hover:border-ochre pb-1"
          >
            Tous les avis sur Google →
          </a>
        </div>

        {/* Carrousel */}
        <div className="relative">
          <div ref={trackRef} className="relative grid">
            {reviews.map((r, i) => (
              <figure
                key={`${r.author}-${i}`}
                style={{ gridArea: "1 / 1" }}
                className={`transition-opacity duration-700 ${
                  i === index ? "opacity-100 relative" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={i !== index}
              >
                <blockquote className="font-display italic text-xl md:text-2xl leading-[1.5] text-foreground/90 max-w-4xl">
                  <span className="text-clay text-3xl leading-none mr-1 align-[-0.15em]">“</span>
                  {r.text}
                  <span className="text-clay text-3xl leading-none ml-1 align-[-0.35em]">”</span>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-clay/15 text-clay flex items-center justify-center font-display text-sm">
                    {r.initials ?? r.author.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-base text-foreground">{r.author}</span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                      {r.date} · <Stars count={r.rating} />
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Dots + flèches */}
          <div className="mt-8 flex items-center gap-2 flex-wrap">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Aller à l'avis ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === index ? "w-8 bg-clay" : "w-1.5 bg-clay/25 hover:bg-clay/60"
                }`}
              />
            ))}
            <div className="ml-auto flex items-center gap-3 relative z-10">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + reviews.length) % reviews.length); }}
                aria-label="Avis précédent"
                className="w-8 h-8 rounded-full border border-clay/30 text-clay hover:bg-clay hover:text-cream transition flex items-center justify-center cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60 tabular-nums min-w-[64px] text-center">
                {String(index + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % reviews.length); }}
                aria-label="Avis suivant"
                className="w-8 h-8 rounded-full border border-clay/30 text-clay hover:bg-clay hover:text-cream transition flex items-center justify-center cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
