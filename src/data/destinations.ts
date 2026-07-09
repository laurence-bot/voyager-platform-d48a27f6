import { namibieDetailed, namibieHero as namibieImg } from "@/data/pays/namibie";
import { ougandaDetailed, ougandaHero as ougandaImgReal } from "@/data/pays/ouganda";
import { afriqueDuSudDetailed, afriqueDuSudHero } from "@/data/pays/afrique-du-sud";
import { botswanaDetailed, botswanaHero } from "@/data/pays/botswana";
import { capVertDetailed, capVertHero } from "@/data/pays/cap-vert";
import { malawiDetailed, malawiHero } from "@/data/pays/malawi";
import perouImg from "@/assets/dest-perou.jpg";
import mongolieImg from "@/assets/dest-mongolie.jpg";
import kyotoImg from "@/assets/dest-kyoto.jpg";
import patagoniaImg from "@/assets/dest-patagonia.jpg";
import cycladesImg from "@/assets/dest-cyclades.jpg";
import philippinesImg from "@/assets/dest-philippines.jpg";
import zimbabweImg from "@/assets/dest-zimbabwe.jpg";
import canadaImg from "@/assets/dest-canada.jpg";
import bresilImg from "@/assets/dest-bresil.jpg";
import polynesieImg from "@/assets/dest-polynesie.jpg";
import ougandaImg from "@/assets/dest-ouganda.jpg";

export type DayStep = {
  day: string; // ex: "Jour 1-2"
  title: string;
  region?: string;
  description: string;
  img?: string;
};

export type Lodge = {
  name: string;
  region: string;
  nights?: number;
  description: string;
  highlights?: string[];
  website?: string;
  img?: string;
};

export type Itineraire = {
  slug: string;
  title: string;
  duration: string;
  level: string; // Confort, Aventure douce, Premium...
  priceFrom?: string;
  pitch: string;
  steps: DayStep[];
  coverImg?: string; // Vignette utilisée dans les listes/cartes (ex: "autres itinéraires")
  heroImg?: string;  // Image plein écran du hero de la page itinéraire (fallback: coverImg)
  lodges?: Lodge[];
};

export type Region = {
  name: string;
  img?: string;
  description: string;
};

export type FaqItem = { q: string; a: string };

export type MonthClimat = {
  month: string; // Jan, Fév...
  recommandation: "ideal" | "bonne" | "moyenne" | "deconseille";
  note?: string;
};

export type DetailedPays = {
  metaTitle?: string;
  metaDescription?: string;
  longIntro: string[]; // paragraphes longs SEO
  whyVisit: { title: string; text: string; img?: string }[];
  whenToGo: {
    summary: string;
    months: MonthClimat[];
  };
  itineraires: Itineraire[];
  // Adresses lodges présentées au niveau du pays (exemples d'hébergements)
  lodges?: Lodge[];
  regions: Region[];
  practical: {
    visa: string;
    health: string;
    money: string;
    flights: string;
    timezone: string;
    language: string;
    safety: string;
    tips: string;
  };
  faq: FaqItem[];
  galleryImgs?: string[]; // photos additionnelles
  // Photos pleine largeur insérées entre les grandes sections (effet parallax léger)
  parallaxBands?: {
    afterIntro?: string; // entre I et II
    afterWhenToGo?: string; // entre III et IV
    afterRegions?: string; // entre V et VI
  };
  // Citation éditoriale affichée juste après I
  pullQuote?: { text: string; author?: string };
  // Image de fond semi-transparente derrière le CTA final
  ctaBackground?: string;
};

export type Pays = {
  slug: string;
  name: string;
  img: string;
  tagline: string;
  intro: string;
  highlights: string[];
  duration: string;
  bestSeason?: string;
  visa?: string;
  budget?: string;
  heroObjectPosition?: string;
  detailed?: DetailedPays;
};

export type Continent = {
  slug: string;
  name: string;
  hero: string;
  intro: string;
  pays: Pays[];
};

// Helper pour générer rapidement les pays — contenus à enrichir par Laurence
const stub = (
  slug: string,
  name: string,
  img: string,
  tagline: string,
  intro: string,
  highlights: string[],
  duration = "12 à 18 jours",
  bestSeason = "Toute l'année selon les régions",
  visa = "Renseignements à confirmer selon nationalité",
  budget = "À partir de 4 500 € / personne",
): Pays => ({ slug, name, img, tagline, intro, highlights, duration, bestSeason, visa, budget });

export const continents: Continent[] = [
  {
    slug: "afrique",
    name: "Afrique",
    hero: ougandaImg,
    intro:
      "Du désert namibien aux gorilles d'Ouganda, des safaris du Botswana aux plages du Cap-Vert, l'Afrique sur mesure par La Voyagerie : des itinéraires confidentiels, testés par notre équipe et nos partenaires locaux.",
    pays: [
      {
        ...stub("afrique-du-sud", "Afrique du Sud", afriqueDuSudHero, "Diversité",
          "Du Cap au Kruger, en passant par les vignobles de Stellenbosch et la Garden Route — l'Afrique du Sud condense en un seul voyage savane, océan, montagnes et villes vibrantes.",
          ["Safari dans le parc Kruger", "Cape Town et Table Mountain", "Garden Route et Plettenberg Bay", "Vignobles de Stellenbosch et Franschhoek"],
          "12 à 18 jours", "Avril à octobre",
          "Pas de visa pour les ressortissants français (séjour < 90 jours)",
          "À partir de 4 690 € / personne"),
        detailed: afriqueDuSudDetailed,
      },
      {
        ...stub("botswana", "Botswana", botswanaHero, "Safari",
          "Delta de l'Okavango, Chobe, Kalahari — le Botswana est l'Afrique des grands espaces préservés. Lodges intimes, safaris en mokoro, une faune exceptionnelle.",
          ["Delta de l'Okavango en mokoro", "Éléphants du Chobe", "Kalahari central et San", "Salines de Makgadikgadi"],
          "10 à 14 jours", "Avril à octobre",
          "Pas de visa pour les ressortissants français (séjour < 90 jours)",
          "À partir de 7 890 € / personne"),
        detailed: botswanaDetailed,
      },
      {
        ...stub("cap-vert", "Cap-Vert", capVertHero, "Atlantique",
          "Dix îles volcaniques au large du Sénégal — randonnée à Santo Antão, musique morna à São Vicente, plages désertes à Boa Vista. Le Cap-Vert est une mosaïque créole.",
          ["Trek à Santo Antão", "Mindelo et la culture morna", "Plages de Boa Vista et Sal", "Volcan du Pico (Fogo)"],
          "10 à 14 jours", "Octobre à juin",
          "Pas de visa pour les ressortissants français (séjour < 30 jours, taxe touristique 30 €)",
          "À partir de 2 490 € / personne"),
        detailed: capVertDetailed,
      },
      {
        ...stub("malawi", "Malawi", malawiHero, "Lac & douceur",
          "Le lac Malawi, ses eaux cristallines et ses villages de pêcheurs, les plateaux du Nyika, les réserves de Liwonde et Majete — le Malawi est l'Afrique douce, à taille humaine, idéale en extension d'un safari en Zambie ou en Tanzanie.",
          ["Plages et plongée dans le lac Malawi", "Plateau du Nyika et ses antilopes", "Safari à Liwonde (éléphants, hippopotames)", "Réserve de Majete et big five"],
          "10 à 14 jours", "Mai à octobre",
          "Visa obligatoire (e-visa en ligne, 75 USD)",
          "À partir de 4 290 € / personne"),
        detailed: malawiDetailed,
      },
      {
        ...stub("namibie", "Namibie", namibieImg, "Désert",
          "Sossusvlei, Skeleton Coast, Damaraland, Etosha — la Namibie est un pays minéral où chaque kilomètre raconte une histoire géologique.",
          ["Dunes ocre du Sossusvlei au lever du jour", "Lodges confidentiels en plein désert", "Rencontre avec les Himbas du Kaokoland", "Safaris dans le parc d'Etosha"],
          "12 à 16 jours", "Mai à octobre",
          "Pas de visa pour les ressortissants français (séjour < 90 jours)",
          "À partir de 4 800 € / personne"),
        heroObjectPosition: "center 55%",
        detailed: namibieDetailed,
      },
      {
        ...stub("ouganda", "Ouganda", ougandaImgReal, "Gorilles & forêts",
          "Le trek vers les gorilles de Bwindi reste l'une des expériences les plus bouleversantes que l'on puisse vivre. Un voyage rare, exigeant et inoubliable.",
          ["Trek aux gorilles dans la forêt de Bwindi", "Chimpanzés dans le parc de Kibale", "Source du Nil à Jinja", "Safari Queen Elizabeth & lions grimpeurs"],
          "10 à 14 jours", "Juin à septembre, décembre à février",
          "e-Visa obligatoire (demande en ligne avant le départ)",
          "À partir de 5 200 € / personne"),
        detailed: ougandaDetailed,
      },
      stub("tanzanie", "Tanzanie", zimbabweImg, "Grands safaris",
        "Serengeti, Ngorongoro, Zanzibar — la Tanzanie est l'Afrique des grandes migrations et des plages turquoise. Un classique magnifié par nos partenaires locaux.",
        ["Grande migration au Serengeti", "Cratère du Ngorongoro", "Zanzibar et Stone Town", "Trek du Kilimandjaro (option)"],
        "12 à 18 jours", "Juin à octobre"),
      stub("zambie", "Zambie", zimbabweImg, "Safari à pied",
        "South Luangwa, Lower Zambezi, chutes Victoria côté zambien — la Zambie est le berceau du walking safari. Camps confidentiels, guides d'exception, faune intacte.",
        ["Walking safari à South Luangwa", "Canoë sur le Lower Zambezi", "Chutes Victoria et Devil's Pool", "Camps de brousse intimes"],
        "10 à 14 jours", "Mai à octobre"),
      stub("zimbabwe", "Zimbabwe", zimbabweImg, "Authentique",
        "Les chutes Victoria, les éléphants de Hwange, les safaris à pied dans Mana Pools — le Zimbabwe est l'Afrique authentique des grands espaces.",
        ["Chutes Victoria au lever du jour", "Safari à pied dans Mana Pools", "Éléphants du parc Hwange", "Lodges confidentiels au cœur de la brousse"],
        "12 à 16 jours", "Mai à octobre"),
    ],
  },
  {
    slug: "ameriques",
    name: "Amériques",
    hero: bresilImg,
    intro:
      "Du grand nord canadien à la Patagonie, des temples mayas aux plateaux andins, en passant par les plages cubaines et l'Amazonie — l'Amérique sur mesure, par nos experts locaux.",
    pays: [
      stub("argentine", "Argentine", patagoniaImg, "Tango & glaciers",
        "Buenos Aires, Patagonie, Iguazú, Mendoza — l'Argentine est un continent à elle seule. Tango, vins de Mendoza, glaciers et estancias.",
        ["Buenos Aires et soirées tango", "Glacier Perito Moreno", "Chutes d'Iguazú", "Vignobles de Mendoza"],
        "16 à 21 jours", "Octobre à avril"),
      stub("belize", "Bélize", polynesieImg, "Caraïbes",
        "Récif corallien, sites mayas dans la jungle, plongée dans le Blue Hole — le Bélize est une destination confidentielle pour amoureux de nature.",
        ["Plongée au Blue Hole", "Sites mayas de Caracol", "Cayes et plages de sable blanc", "Jungle de Cayo"],
        "10 à 14 jours", "Décembre à mai"),
      stub("bolivie", "Bolivie", perouImg, "Altitude",
        "Salar d'Uyuni, lac Titicaca, La Paz, Amazonie — la Bolivie est une destination pour aventuriers en quête d'altiplanos et de cultures andines vivantes.",
        ["Salar d'Uyuni et lagunes andines", "La Paz et la Vallée de la Lune", "Lac Titicaca, île du Soleil", "Amazonie de Rurrenabaque"],
        "14 à 18 jours", "Mai à octobre"),
      stub("bresil", "Brésil", bresilImg, "Nature",
        "Amazonie, Pantanal, Chapada Diamantina, plages de Bahia — un Brésil hors des clichés, à la rencontre des communautés et des grands espaces.",
        ["Croisière en Amazonie brésilienne", "Safari dans le Pantanal", "Trek dans la Chapada Diamantina", "Plages confidentielles de Bahia"],
        "14 à 21 jours", "Avril à octobre"),
      stub("canada", "Canada", canadaImg, "Grands espaces",
        "Rocheuses canadiennes, Yukon sauvage, baleines du Saint-Laurent — un voyage où la nature impose le rythme.",
        ["Rocheuses et lac Moraine au lever du jour", "Aurores boréales du Yukon", "Baleines à bosse dans le Saint-Laurent", "Lodges en pleine nature"],
        "14 à 21 jours", "Juin à septembre"),
      stub("chili", "Chili", patagoniaImg, "Du désert au glacier",
        "Atacama, île de Pâques, Patagonie chilienne, vignobles de la Casablanca — le Chili est un fil de 4 300 km où chaque région est un voyage.",
        ["Désert d'Atacama et Vallée de la Lune", "Île de Pâques et moaïs", "Torres del Paine", "Vignobles de la vallée de Casablanca"],
        "16 à 21 jours", "Octobre à avril"),
      stub("colombie", "Colombie", bresilImg, "Renaissance",
        "Carthagène, café de la zone cafetière, Tayrona, Amazonie, Carthagène coloniale — la Colombie d'aujourd'hui, vibrante et accueillante.",
        ["Carthagène et son centre historique", "Zone cafetière, Salento", "Parc Tayrona", "Désert de Tatacoa"],
        "14 à 18 jours", "Décembre à mars"),
      stub("costa-rica", "Costa Rica", bresilImg, "Pura Vida",
        "Volcans Arenal et Poás, parcs Manuel Antonio et Corcovado, plages du Pacifique et des Caraïbes — le Costa Rica est la destination idéale pour découvrir la biodiversité tropicale.",
        ["Volcan Arenal et sources chaudes", "Parc Manuel Antonio", "Péninsule d'Osa et Corcovado", "Plages de Tamarindo"],
        "12 à 18 jours", "Décembre à avril"),
      stub("cuba", "Cuba", polynesieImg, "Caraïbes vintage",
        "La Havane, Trinidad, Viñales, Cayo Coco — Cuba comme une parenthèse hors du temps, entre architecture coloniale, salsa et plages turquoise.",
        ["La Havane vieille et ses voitures américaines", "Vallée de Viñales, plantations de tabac", "Trinidad, joyau colonial", "Plages de Cayo Coco"],
        "12 à 16 jours", "Novembre à avril"),
      stub("etats-unis", "États-Unis", canadaImg, "Road-trips",
        "Parcs nationaux de l'Ouest, New York, Californie, Hawaii — les États-Unis sur mesure pour des road-trips de légende et des séjours urbains de caractère.",
        ["Grand Canyon, Monument Valley, Yosemite", "New York et la côte Est", "Pacific Coast Highway", "Hawaii et îles volcaniques"],
        "14 à 21 jours", "Selon la région"),
      stub("guatemala", "Guatemala", perouImg, "Mayas & volcans",
        "Tikal au cœur de la jungle, lac Atitlán entouré de volcans, marchés de Chichicastenango — le Guatemala est l'âme maya vivante d'Amérique centrale.",
        ["Tikal au lever du jour", "Lac Atitlán et villages mayas", "Antigua coloniale", "Marché de Chichicastenango"],
        "12 à 16 jours", "Novembre à avril"),
      stub("mexique", "Mexique", perouImg, "Mosaïque",
        "Yucatán, Oaxaca, Mexico, Basse-Californie — le Mexique est une mosaïque de cultures, de saveurs et de paysages, à mille lieues des clichés.",
        ["Cité maya de Palenque", "Oaxaca et ses ateliers d'artisans", "Mexico et Teotihuacán", "Cenotes du Yucatán"],
        "14 à 18 jours", "Novembre à avril"),
      stub("perou", "Pérou", perouImg, "Culture",
        "Vallée Sacrée, Machu Picchu à l'aube, navigation sur l'Amazone et marchés textiles de Chinchero — un voyage entre archéologie, art et nature.",
        ["Machu Picchu au lever du soleil", "Vallée Sacrée et villages andins", "Lac Titicaca et îles des Uros", "Croisière en Amazonie péruvienne"],
        "14 à 20 jours", "Mai à septembre"),
      stub("patagonie", "Patagonie", patagoniaImg, "Aventure",
        "Granit, glaciers et silence absolu — entre Argentine et Chili, une terre de bout du monde pour les grands marcheurs et les rêveurs.",
        ["Trek du W au parc Torres del Paine", "Glacier Perito Moreno", "Estancias d'altitude au pied du Fitz Roy", "Bivouac en Terre de Feu"],
        "16 à 24 jours", "Octobre à avril"),
    ],
  },
  {
    slug: "asie",
    name: "Asie",
    hero: kyotoImg,
    intro:
      "Du Japon raffiné aux îles philippines, des steppes mongoles aux temples bouddhiques du Cambodge, des rizières du Vietnam aux montagnes du Népal — l'Asie sur mesure, racontée par nos experts locaux.",
    pays: [
      stub("cambodge", "Cambodge", kyotoImg, "Temples khmers",
        "Angkor au lever du jour, Siem Reap, lac Tonlé Sap, plages de Sihanoukville — le Cambodge est l'âme khmère, douce et résiliente.",
        ["Angkor Vat au lever du soleil", "Temples de Bayon et Ta Prohm", "Lac Tonlé Sap et villages flottants", "Phnom Penh et son histoire"],
        "10 à 14 jours", "Novembre à mars"),
      stub("chine", "Chine", kyotoImg, "Empire millénaire",
        "Pékin, Xi'an, Shanghai, Yangshuo, Tibet — la Chine est un voyage dans plusieurs siècles à la fois. Itinéraires culturels, gastronomiques ou aventureux.",
        ["Cité interdite et Grande Muraille", "Armée de terre cuite à Xi'an", "Paysages karstiques de Yangshuo", "Shanghai cosmopolite"],
        "14 à 21 jours", "Avril à mai, septembre à octobre"),
      stub("coree-du-sud", "Corée du Sud", kyotoImg, "Tradition & modernité",
        "Séoul vibrant, temples de Gyeongju, île de Jeju, villages traditionnels de Jeonju — la Corée est un équilibre fascinant entre K-pop et bouddhisme zen.",
        ["Séoul, Gangnam et Bukchon", "Temples de Gyeongju", "Île volcanique de Jeju", "DMZ et frontière nord-coréenne"],
        "12 à 16 jours", "Avril à juin, septembre à novembre"),
      stub("indonesie", "Indonésie", philippinesImg, "Archipel",
        "Bali, Java, Lombok, Komodo, Sumatra — 17 000 îles, des volcans actifs, des temples millénaires et des plongées extraordinaires.",
        ["Temples de Borobudur et Prambanan", "Lever du soleil au Mont Bromo", "Bali rizières d'Ubud", "Komodo et ses dragons"],
        "14 à 21 jours", "Avril à octobre"),
      stub("japon", "Japon", kyotoImg, "Culture",
        "Temples au lever du jour, ryokans centenaires, artisans de Kanazawa et nuits au Mont Kōya — un Japon lent, hors des sentiers battus.",
        ["Kyoto et ses temples zen au petit matin", "Nuit dans un temple du Mont Kōya", "Artisans de Kanazawa et de Takayama", "Île de Naoshima et art contemporain"],
        "14 à 21 jours", "Mars à mai, octobre à novembre"),
      stub("laos", "Laos", kyotoImg, "Sérénité",
        "Luang Prabang, plateau des Bolovens, 4 000 îles du Mékong — le Laos est l'Asie du Sud-Est telle qu'on la rêve : douce, lente, profondément spirituelle.",
        ["Aumône des moines à Luang Prabang", "Cascades de Kuang Si", "Plaine des Jarres", "4 000 îles du Mékong"],
        "10 à 14 jours", "Novembre à mars"),
      stub("nepal", "Népal", mongolieImg, "Himalaya",
        "Trek dans l'Annapurna ou l'Everest, Katmandou et Patan, jungle du Chitwan — le Népal pour les marcheurs et les amoureux de spiritualité.",
        ["Trek du tour des Annapurnas", "Katmandou et la vallée de Patan", "Safari dans le parc de Chitwan", "Vol panoramique sur l'Everest"],
        "14 à 21 jours", "Octobre à novembre, mars à mai"),
      stub("oman", "Oman", namibieImg, "Désert d'Arabie",
        "Mascate, désert du Wahiba, fjords du Musandam, montagnes du Jebel Akhdar — Oman est l'Arabie authentique, accueillante et préservée.",
        ["Désert du Wahiba en bivouac", "Mascate et Grande Mosquée", "Fjords du Musandam en dhow", "Wadis et villages de montagne"],
        "10 à 14 jours", "Octobre à avril"),
      stub("sri-lanka", "Sri Lanka", philippinesImg, "Île aux trésors",
        "Plantations de thé de Nuwara Eliya, temples de Kandy, plages du sud, safaris à Yala — le Sri Lanka concentre en une île tout ce qu'on aime de l'Asie.",
        ["Temple de la Dent à Kandy", "Train à travers les plantations de thé", "Forteresse de Sigiriya", "Safari à Yala"],
        "12 à 16 jours", "Décembre à avril"),
      stub("thailande", "Thaïlande", philippinesImg, "Sourire",
        "Bangkok électrique, temples du Nord à Chiang Mai, îles du Sud — la Thaïlande est une destination polyvalente, à composer selon vos envies.",
        ["Temples de Bangkok et Grand Palais", "Chiang Mai et trekking dans le Nord", "Îles d'Andaman", "Marchés flottants"],
        "12 à 18 jours", "Novembre à mars"),
      stub("vietnam", "Vietnam", philippinesImg, "Du Nord au Sud",
        "Hanoï, baie d'Halong, Hué, Hội An, delta du Mékong — le Vietnam est un fil tendu entre rizières, jonques et villes coloniales.",
        ["Croisière en jonque dans la baie d'Halong", "Vieille ville de Hội An", "Rizières en terrasses de Sapa", "Delta du Mékong en sampan"],
        "14 à 21 jours", "Octobre à avril"),
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    hero: cycladesImg,
    intro:
      "Quelques itinéraires européens d'auteur — Grand Nord finlandais, paysages volcaniques d'Islande, fjords norvégiens, Cyclades — pour les voyageurs qui souhaitent rester sur le continent sans renoncer à l'exigence du sur-mesure.",
    pays: [
      stub("finlande", "Finlande", canadaImg, "Grand Nord",
        "Laponie, aurores boréales, traîneaux à chiens, saunas finlandais — la Finlande est un voyage dans le silence blanc.",
        ["Aurores boréales en Laponie", "Traîneau à chiens et motoneige", "Igloos de verre", "Helsinki design"],
        "8 à 12 jours", "Décembre à mars"),
      stub("islande", "Islande", patagoniaImg, "Volcans & glaciers",
        "Cercle d'or, glacier Vatnajökull, fjords de l'Ouest, péninsule de Snæfellsnes — l'Islande est un pays géologique en mouvement permanent.",
        ["Cercle d'or et Geysir", "Plage de sable noir de Reynisfjara", "Lagune glaciaire de Jökulsárlón", "Fjords de l'Ouest sauvages"],
        "10 à 14 jours", "Juin à septembre, février à mars"),
      stub("norvege", "Norvège", canadaImg, "Fjords",
        "Fjords de l'Ouest, Lofoten, Cap Nord, train de Bergen — la Norvège est l'Europe à l'état pur, brute et majestueuse.",
        ["Fjord de Geiranger", "Îles Lofoten", "Train de Bergen à Oslo", "Cap Nord et soleil de minuit"],
        "10 à 14 jours", "Mai à septembre"),
      stub("cyclades", "Cyclades", cycladesImg, "Mer Égée",
        "Naviguer d'île en île, dormir dans des maisons cycladiques, partager le quotidien des pêcheurs.",
        ["Navigation cabotage entre Naxos et Amorgos", "Maisons d'hôtes confidentielles", "Tables de pêcheurs", "Sites archéologiques de Délos"],
        "10 à 14 jours", "Mai à octobre"),
    ],
  },
  {
    slug: "oceanie",
    name: "Océanie",
    hero: polynesieImg,
    intro:
      "Polynésie française, Nouvelle-Zélande, Australie — les bouts du monde, racontés par nos experts locaux pour des voyages d'exception au cœur du Pacifique.",
    pays: [
      stub("australie", "Australie", canadaImg, "Continent rouge",
        "Sydney, Grande Barrière de corail, Outback, Tasmanie — l'Australie est un continent à parcourir lentement, en road-trip ou en croisière.",
        ["Sydney et la Grande Barrière", "Uluru et l'Outback rouge", "Côte des Whitsundays", "Tasmanie sauvage"],
        "16 à 24 jours", "Septembre à novembre, mars à mai"),
      stub("nouvelle-zelande", "Nouvelle-Zélande", patagoniaImg, "Aotearoa",
        "Île du Nord et île du Sud, fjords du Milford Sound, glaciers et thermes — la Nouvelle-Zélande pour randonneurs, gourmets et amateurs de vins.",
        ["Milford Sound et Fiordland", "Mont Cook et lac Tekapo", "Rotorua et culture maorie", "Vignobles de Marlborough"],
        "16 à 21 jours", "Novembre à avril"),
      stub("polynesie", "Polynésie française", polynesieImg, "Pacifique",
        "Tahiti, Bora Bora, Marquises, Tuamotu — archipels, lagons turquoise et culture maohi vivante.",
        ["Lagon de Bora Bora et nuits sur pilotis", "Croisière dans les Marquises", "Plongée dans les passes des Tuamotu", "Rencontre avec les artisans tahitiens"],
        "14 à 21 jours", "Mai à octobre"),
    ],
  },
];

export function getContinent(slug: string) {
  return continents.find((c) => c.slug === slug);
}

export function getPays(continentSlug: string, paysSlug: string) {
  const c = getContinent(continentSlug);
  if (!c) return null;
  const p = c.pays.find((p) => p.slug === paysSlug);
  return p ? { continent: c, pays: p } : null;
}

export function findPaysBySlug(paysSlug: string) {
  for (const c of continents) {
    const p = c.pays.find((p) => p.slug === paysSlug);
    if (p) return { continent: c, pays: p };
  }
  return null;
}

export function getAllPays(): Array<{ continent: Continent; pays: Pays }> {
  return continents.flatMap((c) => c.pays.map((p) => ({ continent: c, pays: p })));
}
