import namibieImg from "@/assets/dest-namibie.jpg";
import namibie4x4Asset from "@/assets/namibie-4x4-carte.jpg.asset.json";
const namibie4x4Img = namibie4x4Asset.url;
import perouImg from "@/assets/dest-perou.jpg";
import mongolieAsset from "@/assets/mongolie-nomades.jpg.asset.json";
const mongolieImg = mongolieAsset.url;
import kyotoImg from "@/assets/dest-kyoto.jpg";
import ougandaImg from "@/assets/dest-ouganda.jpg";
import polynesieImg from "@/assets/dest-polynesie.jpg";

export type Article = {
  slug: string;
  title: string;
  category: "Afrique" | "Amériques" | "Asie" | "Europe" | "Océanie" | "Conseils" | "Inspiration";
  date: string;
  img: string;
  excerpt: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "namibie-road-trip-desert",
    title: "Namibie : un road-trip dans le plus vieux désert du monde",
    category: "Afrique",
    date: "Avril 2026",
    img: namibie4x4Img,
    excerpt:
      "Sossusvlei, Skeleton Coast, Damaraland — trois semaines pour traverser un pays minéral où le silence devient un compagnon de route.",
    body: [
      "Le voyage en Namibie commence souvent par Windhoek, capitale tranquille où l'on récupère son 4×4 équipé. Direction le sud, vers le Sossusvlei.",
      "Au lever du jour, les dunes ocre prennent une lumière irréelle. On grimpe Big Daddy pour voir Deadvlei à 360°, ce lac d'argile blanc parsemé d'arbres morts vieux de 900 ans.",
      "Plus au nord, le Damaraland offre ses paysages de roches volcaniques et la rencontre possible avec les éléphants du désert. Le Kaokoland conclut le voyage par la rencontre, pleine de respect, des Himbas.",
    ],
  },
  {
    slug: "ouganda-gorilles-bwindi",
    title: "Ouganda : à la rencontre des gorilles de Bwindi",
    category: "Afrique",
    date: "Mars 2026",
    img: ougandaImg,
    excerpt:
      "Le trek vers les gorilles des montagnes reste l'une des expériences les plus bouleversantes que nous ayons vécues. Conseils et préparation.",
    body: [
      "La forêt de Bwindi (« impénétrable » en anglais) abrite près de la moitié des gorilles des montagnes encore vivants sur Terre.",
      "Le trek dure de 2 à 8 heures selon le groupe de gorilles localisé. Les pisteurs partent à l'aube et nous guident jusqu'à eux. Une fois trouvés, une heure d'observation à 7 mètres.",
      "C'est cher (700 USD le permis), exigeant physiquement, et inoubliable. Il faut être en bonne condition et accepter l'incertitude.",
    ],
  },
  {
    slug: "japon-ryokans-temples",
    title: "Japon : ryokans, temples et cuisine d'auteur",
    category: "Asie",
    date: "Février 2026",
    img: kyotoImg,
    excerpt:
      "De Kyoto au Mont Kōya, en passant par les artisans de Kanazawa — un itinéraire de 18 jours conçu pour les voyageurs lents.",
    body: [
      "Le Japon se déguste lentement. Notre itinéraire favori démarre par 4 nuits à Kyoto, en ryokan dans le quartier de Higashiyama.",
      "Visite des temples zen au lever du jour (avant les groupes), atelier de calligraphie, dîner kaiseki en chambre privée.",
      "Puis cap au sud vers le Mont Kōya pour une nuit dans un temple bouddhique, méditation matinale et cimetière millénaire d'Okunoin.",
    ],
  },
  {
    slug: "perou-vallee-sacree",
    title: "Pérou : la Vallée Sacrée hors des sentiers battus",
    category: "Amériques",
    date: "Janvier 2026",
    img: perouImg,
    excerpt:
      "Au-delà du Machu Picchu, la richesse textile des villages andins et la rencontre avec les communautés Quechua.",
    body: [
      "Tout le monde court au Machu Picchu — et c'est mérité, surtout au lever du jour. Mais la Vallée Sacrée mérite qu'on s'y attarde.",
      "Chinchero et son marché textile du dimanche, Maras et ses salines préhispaniques, Ollantaytambo et ses ruines incas vivantes.",
      "Une nuit chez l'habitant à Patacancha permet de partager le quotidien d'une communauté Quechua, entre tissage et cérémonie à la Pachamama.",
    ],
  },
  {
    slug: "mongolie-nomades-saison",
    title: "Mongolie : quelle saison pour le grand silence ?",
    category: "Asie",
    date: "Décembre 2025",
    img: mongolieImg,
    excerpt:
      "Steppes d'été, glace du Khövsgöl, festival du Naadam — notre guide pour choisir votre fenêtre.",
    body: [
      "Juin à août : la steppe est verte, les températures douces, et le festival du Naadam (11-13 juillet) bat son plein.",
      "Septembre : moins de touristes, lumière dorée, premières neiges sur l'Altaï. Notre période préférée.",
      "Hiver (-30°C) : pour les courageux, le festival de l'aigle à Ölgii et la glace du lac Khövsgöl.",
    ],
  },
  {
    slug: "polynesie-noces-itineraire",
    title: "Polynésie française : composer son voyage de noces",
    category: "Océanie",
    date: "Novembre 2025",
    img: polynesieImg,
    excerpt:
      "Bora Bora, Tahaa, Marquises — quelles îles choisir et dans quel ordre ? Notre guide pour les jeunes mariés.",
    body: [
      "L'erreur classique : tout vouloir voir. Mieux vaut 3 îles bien choisies sur 14 jours qu'un saute-mouton fatigant.",
      "Notre triptyque favori : Moorea pour s'acclimater (3 nuits), Tahaa pour la vanille et le calme (4 nuits), Bora Bora pour le lagon mythique (5 nuits sur pilotis).",
      "Pour les voyageurs disposant de 3 semaines, ajouter 8 jours de croisière sur l'Aranui jusqu'aux Marquises change tout.",
    ],
  },
  {
    slug: "agence-voyage-sur-mesure-pourquoi",
    title: "Pourquoi choisir une agence de voyage sur-mesure ?",
    category: "Conseils",
    date: "Octobre 2025",
    img: namibieImg,
    excerpt:
      "Sur-mesure, sécurité, expertise locale, accompagnement 24/7 : les différences essentielles avec un voyage standardisé.",
    body: [
      "Une agence sur-mesure n'est pas un comparateur. C'est une équipe qui vous écoute, propose, ajuste et accompagne avant, pendant et après.",
      "Les voyages standardisés font gagner du temps en apparence — mais ils ignorent vos envies réelles, votre rythme, vos contraintes alimentaires ou familiales.",
      "Surtout : en cas d'imprévu (annulation de vol, hospitalisation, météo), une agence sur-mesure est joignable 24/7 et résout sur place. Un site low-cost vous laisse seul.",
    ],
  },
  {
    slug: "preparer-visa-vaccins",
    title: "Préparer son visa et ses vaccins pour un long-courrier",
    category: "Conseils",
    date: "Septembre 2025",
    img: kyotoImg,
    excerpt:
      "Notre check-list pratique avant un grand voyage : démarches administratives, santé, assurance, équipement.",
    body: [
      "Trois mois avant le départ : passeport valide 6 mois après le retour, démarches visa (e-visa quand possible).",
      "Deux mois avant : consultation médecin du voyage, vaccins selon destination (fièvre jaune, hépatites, typhoïde, encéphalite japonaise).",
      "Un mois avant : assurance voyage avec rapatriement, copie numérique des documents, carte de paiement Visa/Mastercard sans frais à l'étranger.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
