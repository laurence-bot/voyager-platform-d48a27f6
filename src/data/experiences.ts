import zimbabweImg from "@/assets/dest-zimbabwe.jpg";
import polynesieImg from "@/assets/dest-polynesie.jpg";
import bresilImg from "@/assets/dest-bresil.jpg";
import patagoniaImg from "@/assets/dest-patagonia.jpg";

export type Experience = {
  slug: string;
  name: string;
  tagline: string;
  img: string;
  intro: string;
  pourQui: string[];
  exemples: { titre: string; desc: string; duree: string }[];
  destinations: string[];
};

export const experiences: Experience[] = [
  {
    slug: "safari",
    name: "Safari",
    tagline: "Grands espaces & faune sauvage",
    img: zimbabweImg,
    intro:
      "Du delta de l'Okavango aux plaines du Serengeti, des éléphants de Hwange aux gorilles de Bwindi — nos safaris sont conçus avec des partenaires locaux choisis pour leur connaissance fine du terrain et leur engagement pour la conservation.",
    pourQui: [
      "Couples en quête d'émerveillement",
      "Familles avec enfants à partir de 8 ans",
      "Voyageurs solo accompagnés d'un guide privé",
      "Photographes animaliers",
    ],
    exemples: [
      {
        titre: "Botswana — l'eau et la savane",
        desc: "Okavango en mokoro, Chobe et ses éléphants, Kalahari et bushmen San. Lodges intimes et survols en avion-taxi.",
        duree: "12 jours",
      },
      {
        titre: "Tanzanie — la grande migration",
        desc: "Serengeti pendant la migration, cratère du Ngorongoro, finale plage à Zanzibar.",
        duree: "14 jours",
      },
      {
        titre: "Zimbabwe — safari à pied",
        desc: "Mana Pools en walking safari avec ranger, chutes Victoria, lodges confidentiels.",
        duree: "12 jours",
      },
    ],
    destinations: ["Botswana", "Tanzanie", "Zimbabwe", "Afrique du Sud", "Ouganda"],
  },
  {
    slug: "voyage-de-noces",
    name: "Voyage de noces",
    tagline: "Un souvenir pour la vie",
    img: polynesieImg,
    intro:
      "Le voyage de noces n'est pas un voyage comme les autres. C'est le premier que vous écrivez à deux, celui que vous raconterez le plus souvent. Nous le concevons avec une attention particulière : adresses confidentielles, surprises orchestrées, rythme à votre image.",
    pourQui: [
      "Jeunes mariés en quête d'authenticité",
      "Couples qui célèbrent un anniversaire",
      "Renouvellement de vœux",
      "Voyages romantiques en duo",
    ],
    exemples: [
      {
        titre: "Polynésie — du lagon aux Marquises",
        desc: "Tahiti, Bora Bora sur pilotis, croisière dans les Marquises sur l'Aranui.",
        duree: "16 jours",
      },
      {
        titre: "Japon — ryokans et lune de miel",
        desc: "Kyoto, Mont Kōya, Naoshima — un Japon raffiné pour deux.",
        duree: "14 jours",
      },
      {
        titre: "Maldives & Sri Lanka",
        desc: "Plantations de thé du Sri Lanka, puis bungalow sur pilotis aux Maldives.",
        duree: "15 jours",
      },
    ],
    destinations: ["Polynésie française", "Japon", "Sri Lanka", "Indonésie", "Cap-Vert"],
  },
  {
    slug: "voyage-en-famille",
    name: "Voyage en famille",
    tagline: "Souvenirs partagés",
    img: bresilImg,
    intro:
      "Voyager en famille, c'est composer avec des envies, des rythmes et des âges différents. Nos itinéraires familiaux mêlent émerveillement, confort et pédagogie — pour que chaque membre de la famille reparte avec ses propres souvenirs.",
    pourQui: [
      "Familles avec enfants de 5 à 16 ans",
      "Familles recomposées",
      "Voyages multi-générations (grands-parents)",
      "Tribus d'amis avec enfants",
    ],
    exemples: [
      {
        titre: "Costa Rica — la nature en immersion",
        desc: "Volcans, paresseux, plages des deux côtes — la famille rêvée pour découvrir la nature tropicale.",
        duree: "16 jours",
      },
      {
        titre: "Canada — l'Ouest sauvage",
        desc: "Rocheuses, ours, lacs turquoise et lodges en pleine nature.",
        duree: "14 jours",
      },
      {
        titre: "Japon — un dépaysement doux",
        desc: "Tokyo, Kyoto, Hiroshima — un Japon adapté aux enfants curieux.",
        duree: "14 jours",
      },
    ],
    destinations: ["Costa Rica", "Canada", "Japon", "Afrique du Sud", "Sri Lanka"],
  },
  {
    slug: "voyage-sportif",
    name: "Voyage sportif",
    tagline: "L'aventure à votre rythme",
    img: patagoniaImg,
    intro:
      "Trek, plongée, kayak de mer, ski de randonnée — pour les voyageurs qui veulent vivre la destination par le corps. Nos voyages sportifs sont encadrés par des guides locaux certifiés et adaptés à votre niveau.",
    pourQui: [
      "Randonneurs aguerris ou débutants motivés",
      "Plongeurs (PADI/CMAS) niveau 1 minimum",
      "Cyclistes longue distance",
      "Amateurs de ski hors-piste",
    ],
    exemples: [
      {
        titre: "Patagonie — le trek du W",
        desc: "Torres del Paine en 5 jours, refuges et bivouac, glacier Grey.",
        duree: "16 jours",
      },
      {
        titre: "Népal — tour des Annapurnas",
        desc: "Trek de 14 jours en lodges, col du Thorong La à 5 416 m.",
        duree: "21 jours",
      },
      {
        titre: "Indonésie — plongée Komodo",
        desc: "Croisière plongée à Komodo et Banda Sea, raies manta et requins.",
        duree: "12 jours",
      },
    ],
    destinations: ["Patagonie", "Népal", "Indonésie", "Norvège", "Nouvelle-Zélande"],
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
