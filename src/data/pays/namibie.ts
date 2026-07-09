import type { DetailedPays } from "@/data/destinations";

// Photos Namibie — vraies photos terrain (lavoyagerie.fr + photos voyage)
import sossusvleiPhoto from "@/assets/destinations/namibie/deadvlei-arbres.jpg"; // Vraie photo Deadvlei
import etoshaPhoto from "@/assets/destinations/namibie/etosha-saltpan-elephant.jpg";
import skeletonPhoto from "@/assets/destinations/namibie/skeleton-coast-misty.jpg";
import damaralandPhoto from "@/assets/destinations/namibie/spitzkoppe.jpg"; // Vraie photo Spitzkoppe (Damaraland)
import himbaPhoto from "@/assets/destinations/namibie/himba-portrait.jpg";
import swakopmundPhoto from "@/assets/destinations/namibie/desert-coucher-soleil.jpg"; // Désert au coucher de soleil
import jeep4x4 from "@/assets/destinations/namibie/4x4-namibie.jpg";
import parallaxDunes from "@/assets/destinations/namibie/parallax-dunes-sunrise.jpg";

// Photos d'ambiance et hero (récupérées du site lavoyagerie.fr)
import cielEtoile from "@/assets/destinations/namibie/ciel-etoile-namibie.webp";
import heroNamibie from "@/assets/destinations/namibie/hero-namibie.webp";

// Photos "Raisons d'aimer" (vraies photos — Unsplash + terrain)
import raisonCaprivi from "@/assets/destinations/namibie/raisons/caprivi.jpg";
import raisonKolmanskop from "@/assets/destinations/namibie/raisons/kolmanskop.jpg";
import raisonLumiere from "@/assets/destinations/namibie/raisons/lumiere-namibie.jpg";
import raisonFishRiver from "@/assets/destinations/namibie/raisons/fish-river-canyon.jpg";

// Photos lodges (exemples d'adresses La Voyagerie en Namibie)
import lodgeDesertQuiver from "@/assets/lodges/namibie/desert-quiver-camp.jpg";
import lodgeMowani from "@/assets/lodges/namibie/mowani-mountain-camp.jpg";
import lodgeOnguma from "@/assets/lodges/namibie/onguma-tented-camp.jpg";
import lodgeSossusvleiDesert from "@/assets/lodges/namibie/sossusvlei-desert-lodge.jpg";
import lodgeWaterberg from "@/assets/lodges/namibie/waterberg-pool.jpg";
import lodgeBagatelle from "@/assets/lodges/namibie/bagatelle-kalahari.jpg";
import lodgeNambwa from "@/assets/lodges/namibie/nambwa-tented-lodge.jpg";
import lodgeShipwreck from "@/assets/lodges/namibie/shipwreck-lodge.jpg";
import lodgeLittleOngava from "@/assets/lodges/namibie/little-ongava.jpg";

// Hero itinéraire Essentielle — dunes lumineuses
import heroEssentielle from "@/assets/destinations/namibie/hero-essentielle.jpg";
import heroAventureUpload from "@/assets/destinations/namibie/hero-aventure-upload.jpg";
// Vignette Aventure (petite carte de présentation uniquement) — fille avec carte routière
import vignetteAventure from "@/assets/destinations/namibie/aventure-namibienne.jpg";

// Covers itinéraires : Sossusvlei (Confort), Spitzkoppe (Authentique), 4x4 désert (Premium)
const itineraireConfort = heroEssentielle; // Dunes lumineuses, tons doux
const itineraireAuthentique = himbaPhoto;
// L'itinéraire Aventure utilise deux images distinctes :
// - coverImg (vignette) : la photo d'ambiance avec la carte routière
// - heroImg (plein écran) : la photo terrain fournie par le client
const itinerairePremiumCover = vignetteAventure;
const itinerairePremiumHero = heroAventureUpload;

// Photos dédiées itinéraire — vraies photos terrain (lavoyagerie.fr + photos voyage utilisateur)
import stepVolAvion from "@/assets/destinations/namibie/itineraire/vol-avion-nuages.jpg";
import stepGirafeSunset from "@/assets/destinations/namibie/itineraire/airplane-clouds.jpg"; // en réalité girafe sunset (savane)
import stepWindhoek from "@/assets/destinations/namibie/itineraire/windhoek.jpg";
import stepSwakopmundVille from "@/assets/destinations/namibie/itineraire/terrain-jour-5-sossusvlei.webp"; // en réalité Swakopmund
import stepSwakopmund from "@/assets/destinations/namibie/itineraire/swakopmund-coast.jpg";
import stepWalvis from "@/assets/destinations/namibie/itineraire/walvis-flamingos.jpg";
import stepDamaraland from "@/assets/destinations/namibie/itineraire/terrain-jour-11-damaraland.jpg";
import stepEtosha from "@/assets/destinations/namibie/itineraire/terrain-jour-12-etosha.jpg";
import stepEtoshaWaterhole from "@/assets/destinations/namibie/itineraire/terrain-jour-14-waterberg.webp"; // en réalité point d'eau Etosha
import stepWaterberg from "@/assets/destinations/namibie/itineraire/waterberg-plateau-cliffs.jpg";
import stepKalahari from "@/assets/destinations/namibie/itineraire/kalahari-oryx.jpg";
import stepKaokoland from "@/assets/destinations/namibie/itineraire/himba-woman.jpg";

// Photos terrain uploadées par l'utilisateur (vraies photos de voyage en Namibie)
import photoVieilleVoiture from "@/assets/destinations/namibie/itineraire/photo-vieille-voiture-namib.jpeg";
import photoPisteRouge from "@/assets/destinations/namibie/itineraire/photo-piste-desert-rouge.jpeg";
import photoCanyonDamaraland from "@/assets/destinations/namibie/itineraire/photo-canyon-damaraland.jpeg";
import photoSwakopmundGare from "@/assets/destinations/namibie/itineraire/photo-swakopmund-gare.jpeg";
import photoSpitzkoppeRochers from "@/assets/destinations/namibie/itineraire/photo-spitzkoppe-rochers.jpeg";
import photoSpitzkoppeSavane from "@/assets/destinations/namibie/itineraire/photo-spitzkoppe-savane.jpeg";
import photoEtoshaLionsPiste from "@/assets/destinations/namibie/itineraire/photo-etosha-lions-piste.jpeg";
import photoEtoshaLionSunset from "@/assets/destinations/namibie/itineraire/photo-etosha-lion-sunset.jpeg";

// Pool de photos par région (plusieurs variantes pour éviter les doublons dans un même itinéraire)
const STEP_POOL_BY_REGION: Record<string, string[]> = {
  "Vol": [stepVolAvion],
  "Windhoek": [stepWindhoek, stepGirafeSunset], // Plateau central = savane proche de Windhoek
  "Sossusvlei": [photoVieilleVoiture, photoPisteRouge],
  "Swakopmund": [stepSwakopmundVille, photoSwakopmundGare, stepSwakopmund],
  "Walvis Bay": [stepWalvis],
  "Damaraland": [photoSpitzkoppeRochers, photoCanyonDamaraland, photoSpitzkoppeSavane, stepDamaraland],
  "Etosha": [photoEtoshaLionSunset, photoEtoshaLionsPiste, stepEtosha, etoshaPhoto, stepEtoshaWaterhole],
  "Otjiwarongo": [stepWaterberg],
  "Kalahari": [stepKalahari],
  "Kaokoland": [stepKaokoland, himbaPhoto],
};

// Assigne une photo à chaque étape en restant STRICTEMENT dans le pool de la région
// (on ne mélange jamais les régions). On évite les doublons consécutifs ; si le pool
// est épuisé, on recommence en rotation au sein de la même région.
const enrichSteps = <T extends { region?: string; img?: string }>(steps: T[]): T[] => {
  const counters: Record<string, number> = {};

  return steps.map((s) => {
    if (s.img) return s;
    const region = s.region ?? "";
    const pool = STEP_POOL_BY_REGION[region] ?? [];
    if (pool.length === 0) return s;
    const idx = (counters[region] ?? 0) % pool.length;
    counters[region] = idx + 1;
    return { ...s, img: pool[idx] };
  });
};



export const namibieDetailed: DetailedPays = {
  metaTitle: "Voyage sur mesure Namibie | Safari, Autotour & Lodges | La Voyagerie",
  metaDescription:
    "Voyage sur mesure en Namibie par notre agence spécialiste : circuits, autotours et fly-in safaris d'auteur — Sossusvlei, Etosha, Damaraland, Skeleton Coast. Lodges confidentiels, guides francophones, accompagnement de bout en bout.",

  longIntro: [
    "Une lumière rasante, un horizon sans fin, et le silence. La Namibie ne se visite pas, elle s'éprouve. L'aube se pose sur les dunes du Sossusvlei, le sable rougit sous vos pas, et le silence devient presque une présence. C'est là que commence vraiment le voyage. Pays de l'extrême — dunes ocre à plus de 300 mètres, plaines salines d'Etosha, Skeleton Coast battue par l'Atlantique — on y roule des heures sans croiser personne. Puis un oryx surgit. Un éléphant du désert au pied d'un boulder rouge. Et l'on comprend ce qu'est un voyage sur mesure en Namibie.",
    "Chez La Voyagerie, agence spécialiste de la Namibie, nous concevons chaque circuit à la main — étape par étape, lodge par lodge. Tous nos itinéraires sont testés sur le terrain, avec nos partenaires francophones basés à Windhoek. Nous privilégions les lodges intimes, souvent moins de douze chambres. Nos guides locaux parlent votre langue. Et chaque rencontre — Himbas du Kaokoland, San du Kalahari, rangers du Damaraland — se prépare avec respect.",
    "Un couple, seize jours en autotour. Une famille, premier safari accessible. Trois semaines d'expédition photo, du Sossusvlei aux chutes Epupa. Quel que soit votre projet, nous le composons à votre rythme. Aucun groupe imposé, aucun itinéraire standardisé. Votre Namibie, et rien d'autre. Construisons-la ensemble.",
  ],

  whyVisit: [
    {
      title: "Les dunes de Sossusvlei",
      text: "Le décor le plus iconique d'Afrique australe — et le silence le plus pur. Au cœur du Namib, les dunes ocre du Sossusvlei s'embrasent à l'aube autour des arbres millénaires de Deadvlei. Vous grimpez Big Daddy avant le jour, le sable est froid sous vos pieds. Le soleil perce. Personne. Une scène qui reste, longtemps.",
      img: sossusvleiPhoto,
    },
    {
      title: "Le Fish River Canyon",
      text: "Vertige absolu au sud du pays. Deuxième plus grand canyon du monde — 160 km de long, 550 m de profondeur. Vous vous tenez au bord, le vent se lève, la terre s'ouvre. Une étape rare, loin des circuits classiques.",
      img: raisonFishRiver,
    },
    {
      title: "Des safaris d'exception à Etosha",
      text: "Un sanctuaire pour vos premiers émerveillements. Autour des points d'eau d'Etosha : éléphants, rhinocéros, lions, léopards, girafes. À midi, la lumière brûle ; à l'aube, tout vit. Moteur coupé près d'un waterhole — le théâtre commence. Idéal pour un premier safari en famille.",
      img: etoshaPhoto,
    },
    {
      title: "Le Damaraland, géologie et conservation",
      text: "Là où la pierre raconte l'humanité. Granit rouge, gravures rupestres de Twyfelfontein (UNESCO), éléphants du désert, camps engagés pour les rhinocéros noirs. Vous suivez un ranger en silence — soudain, une trace fraîche dans le sable. La conservation se vit ici, avec ceux qui en ont fait leur vie.",
      img: damaralandPhoto,
    },
    {
      title: "Kolmanskop, le village enseveli",
      text: "Une parenthèse hors du temps. Cité minière du début du XXᵉ siècle, rendue au désert. Une porte qui grince, une chambre pleine de sable, un rai de lumière à travers une fenêtre éventrée. Décor irréel, aimé des photographes.",
      img: raisonKolmanskop,
    },
    {
      title: "La Bande de Caprivi",
      text: "Le contre-pied vert de la Namibie. Au nord-est, un couloir bordé de quatre fleuves : forêts, hippopotames au crépuscule, éléphants qui descendent boire, oiseaux rares. Une Namibie tropicale, méconnue — un autre pays, dans le même voyage.",
      img: raisonCaprivi,
    },
    {
      title: "Skeleton Coast, l'Atlantique des naufrages",
      text: "Le bout du monde, à portée d'aile. Brume tenace, épaves rouillées, otaries de Cape Cross, dunes qui plongent dans l'océan. Vous survolez en petit avion depuis Swakopmund — l'ombre de l'aile glisse sur le sable. On en revient silencieux.",
      img: skeletonPhoto,
    },
    {
      title: "La rencontre avec les Himbas",
      text: "Une humanité rare. Dans le Kaokoland, les Himbas vivent encore selon leurs traditions — femmes ocrées d'otjize, coiffures sculpturales. Rencontre préparée avec respect, en présence d'un médiateur local que nous connaissons. Un sourire, un regard, un enfant qui prend votre main. De ces moments qui ne se racontent pas.",
      img: himbaPhoto,
    },
    {
      title: "La lumière, incomparable à toute heure",
      text: "Un ciel comme nulle part ailleurs. Moins de 3 habitants au km² — et donc une pureté absolue. Levers de soleil sur les dunes, nuits parmi les plus étoilées de la planète. Allongé dehors, la Voie lactée se déploie comme une rivière. On voyage ici les yeux levés autant que baissés.",
      img: raisonLumiere,
    },
  ],

  whenToGo: {
    summary:
      "La meilleure saison pour un voyage sur mesure en Namibie s'étend de mai à octobre — saison sèche, températures fraîches le matin et idéales en journée, faune concentrée autour des points d'eau du parc d'Etosha. Novembre à avril (saison verte) offre des paysages contrastés, des ciels d'orage spectaculaires sur les dunes du Sossusvlei et bien moins de visiteurs, mais quelques pistes peuvent devenir impraticables après les pluies. Que vous prépariez un safari Namibie en famille, un autotour photo ou un fly-in safari premium, notre équipe vous oriente vers la fenêtre la plus juste pour votre projet — et réserve les meilleurs lodges en Namibie six à neuf mois à l'avance en haute saison. Nous gérons pour vous l'ensemble du calendrier, des disponibilités lodges aux vols intérieurs : vous n'avez qu'à rêver, on s'occupe du reste.",
    months: [
      { month: "Jan", recommandation: "moyenne", note: "Saison verte, chaud et humide" },
      { month: "Fév", recommandation: "moyenne", note: "Pluies possibles" },
      { month: "Mar", recommandation: "bonne", note: "Fin des pluies, paysages verts" },
      { month: "Avr", recommandation: "bonne", note: "Très belle lumière, peu de monde" },
      { month: "Mai", recommandation: "ideal", note: "Sec, faune visible, doux" },
      { month: "Juin", recommandation: "ideal", note: "Idéal, nuits fraîches" },
      { month: "Juil", recommandation: "ideal", note: "Pleine saison sèche" },
      { month: "Août", recommandation: "ideal", note: "Faune exceptionnelle à Etosha" },
      { month: "Sep", recommandation: "ideal", note: "Sec, températures parfaites" },
      { month: "Oct", recommandation: "ideal", note: "Dernier mois optimal" },
      { month: "Nov", recommandation: "bonne", note: "Premières pluies, chaud" },
      { month: "Déc", recommandation: "moyenne", note: "Chaud, pluies possibles" },
    ],
  },

  lodges: [
    {
      name: "Mowani Mountain Camp",
      region: "Damaraland",
      description: "Camp d'auteur fondu dans les boulders de granit rouge du Damaraland. Tentes-suites en pierre et toile, panorama 360° sur les plaines, table d'inspiration namibienne. Idéal pour partir sur les traces des éléphants du désert.",
      highlights: ["Tentes-suites parmi les boulders", "Éléphants du désert", "Vues panoramiques"],
      website: "https://www.mowani.com",
      img: lodgeMowani,
    },
    {
      name: "Onguma Tented Camp",
      region: "Etosha (frontière est)",
      description: "Camp de toile testé par notre équipe, en bordure de la réserve privée Onguma, accolée au parc d'Etosha. Sept tentes intimes face à un point d'eau, safaris en véhicule ouvert, guides francophones sur demande.",
      highlights: ["Réserve privée Onguma", "Point d'eau privé", "Safaris en véhicule ouvert"],
      website: "https://www.onguma.com",
      img: lodgeOnguma,
    },
    {
      name: "Sossusvlei Desert Lodge",
      region: "Sossusvlei",
      description: "Adresse signature andBeyond au cœur de la réserve privée NamibRand. Suites en pierre et verre avec piscine privée, plafond rétractable pour observer les étoiles depuis le lit, observatoire astronomique. Référence absolue dans le désert.",
      highlights: ["Réserve NamibRand", "Plafond rétractable", "Observatoire astronomique"],
      website: "https://www.andbeyond.com/our-lodges/africa/namibia/namib-desert/andbeyond-sossusvlei-desert-lodge/",
      img: lodgeSossusvleiDesert,
    },
    {
      name: "Waterberg Plateau Lodge",
      region: "Waterberg",
      description: "Lodge intime adossé aux falaises rouges du plateau du Waterberg. Chalets de pierre fondus dans la végétation, piscine face aux roches, randonnées guidées et observation des damans, babouins et aigles couronnés.",
      highlights: ["Falaises du Waterberg", "Randonnées guidées", "Faune endémique"],
      website: "https://www.waterberg-wilderness.com/lodging/waterberg-plateau-lodge/",
      img: lodgeWaterberg,
    },
    {
      name: "Desert Quiver Camp",
      region: "Sossusvlei",
      description: "À quelques kilomètres de l'entrée du parc Namib-Naukluft, camp intime dans une vallée de roches noires. Chalets en pierre avec terrasse privée et cuisine extérieure, ciel étoilé d'exception, accès rapide aux dunes à l'aube.",
      highlights: ["Accès Sossusvlei à l'aube", "Chalets en pierre privatifs", "Ciel étoilé"],
      website: "https://www.desertquivercamp.com",
      img: lodgeDesertQuiver,
    },
    {
      name: "Bagatelle Kalahari Game Ranch",
      region: "Kalahari",
      description: "Sur les dunes rouges du Kalahari, lodge familial niché entre savane et sable ocre. Chalets de bois sur pilotis ouverts sur le coucher de soleil, observation des guépards, marche avec les Bushmen et nuits d'une rare douceur sous la Voie lactée.",
      highlights: ["Dunes rouges du Kalahari", "Rencontre avec les Bushmen", "Chalets sur pilotis"],
      website: "https://bagatelle-lodge.com",
      img: lodgeBagatelle,
    },
    {
      name: "Nambwa Tented Lodge",
      region: "Bande de Caprivi",
      description: "Unique lodge installé au cœur du parc national de Bwabwata, sur la rivière Kwando. Tentes-suites perchées sur pilotis dans la canopée, vue plongeante sur la plaine inondable et ses troupeaux d'éléphants. Safaris en 4×4, sorties en bateau et expérience immersive dans une Namibie verte et sauvage, à mille lieues du désert.",
      highlights: ["Au cœur du parc de Bwabwata", "Tentes perchées sur la canopée", "Safaris terrestres et fluviaux"],
      website: "https://www.africanmonarchjourneys.com/stay/nambwa-tented-lodge/",
      img: lodgeNambwa,
    },
    {
      name: "Shipwreck Lodge",
      region: "Skeleton Coast",
      description: "Adresse iconique posée entre les dunes et l'Atlantique, dans le parc national de la Skeleton Coast. Dix cabanes en bois inspirées des épaves échouées sur cette côte mythique, poêle à bois, vue sur l'océan, brouillards matinaux et excursions vers les colonies d'otaries et les rivières asséchées. Un bout du monde absolu.",
      highlights: ["Cabanes inspirées des épaves", "Skeleton Coast confidentielle", "Excursions colonies d'otaries"],
      website: "https://shipwrecklodge.com.na",
      img: lodgeShipwreck,
    },
    {
      name: "Little Ongava",
      region: "Etosha (réserve privée Ongava)",
      description: "L'une des plus belles adresses d'Afrique australe : trois suites privées seulement, perchées sur un kopje rocheux dominant la réserve privée d'Ongava, en lisière sud d'Etosha. Piscine privée, majordome dédié, safaris en véhicule ouvert et à pied avec rangers spécialistes des rhinos noirs et blancs. Intimité et exclusivité absolues.",
      highlights: ["3 suites seulement", "Réserve privée Ongava", "Rhinos noirs et blancs"],
      website: "https://ongava.com/lodge/little-ongava/",
      img: lodgeLittleOngava,
    },
  ],

  itineraires: [
    {
      slug: "essentielle-namibie-11-jours",
      title: "Essentielle Namibie",
      duration: "11 jours / 8 nuits",
      level: "Autotour",
      priceFrom: "À partir de 2 215 € / personne",
      pitch:
        "À la croisée des silences : dunes, roches et vie sauvage. Cet autotour Namibie en 11 jours / 8 nuits vous emmène sur les routes les plus spectaculaires du pays, entre dunes flamboyantes de Sossusvlei, côte Atlantique aux airs de bout du monde, paysages lunaires du Damaraland et safaris inoubliables dans le parc national d'Etosha. Idéal pour une première découverte de la Namibie : un bel équilibre entre nature grandiose, rencontres avec la faune, sites UNESCO et hébergements confortables en pleine brousse.",
      coverImg: itineraireConfort,
      steps: enrichSteps([
        { day: "Jour 1", title: "Départ de France", region: "Vol", description: "Départ de France à destination de Windhoek, la vibrante capitale de la Namibie. Ce vol marque le début d'un voyage exceptionnel en Afrique australe, à la découverte des paysages spectaculaires du désert du Namib, des vastes étendues arides peuplées d'animaux sauvages et d'une nature préservée. Nuit à bord avant de poser le pied sur le sol namibien, prêt à vivre une aventure inoubliable entre grands espaces et sensations d'évasion absolue." },
        { day: "Jour 2", title: "Arrivée à Windhoek", region: "Windhoek", description: "Bienvenue en Namibie ! À votre arrivée à l'aéroport international Hosea Kutako, situé à une quarantaine de kilomètres du centre de Windhoek, vous êtes accueillis par votre chauffeur ou votre guide francophone, selon la formule choisie (autotour ou circuit accompagné). Un transfert privé vous conduit à travers les premières étendues de savane namibienne, ponctuées d'acacias et de collines douces, pour rejoindre la capitale." },
        { day: "Jour 3", title: "Désert du Namib", region: "Sossusvlei", description: "Après le petit-déjeuner à Windhoek, vous prenez la route vers le sud-ouest en direction du désert du Namib, l'un des plus anciens et emblématiques déserts du monde. Cette première journée de route est une immersion progressive dans l'immensité namibienne, au cœur de paysages spectaculaires." },
        { day: "Jour 4", title: "Sossusvlei, Deadvlei et Sesriem Canyon", region: "Sossusvlei", description: "Réveil très matinal pour vivre l'un des moments forts de votre voyage en Namibie. Dès l'aube, vous pénétrez dans le Parc national du Namib-Naukluft pour découvrir les dunes emblématiques de Sossusvlei et le paysage surréaliste de Deadvlei." },
        { day: "Jour 5", title: "Swakopmund", region: "Swakopmund", description: "Nouvelle étape de votre voyage en Namibie, vous quittez les vastes étendues sablonneuses du désert du Namib pour rejoindre la côte atlantique et la ville singulière de Swakopmund, nichée entre dunes et océan. Ce trajet spectaculaire vous fait traverser des paysages désertiques parmi les plus saisissants du pays, pour un changement d'ambiance total entre chaleur sèche et brume marine." },
        { day: "Jour 6", title: "Damaraland", region: "Damaraland", description: "Après un dernier regard sur les brumes de l'Atlantique, vous prenez la route vers l'intérieur des terres, cap sur le Damaraland, l'une des régions les plus sauvages, minérales et authentiques de Namibie. Ce territoire ancestral, encore peu exploré, offre des paysages bruts et puissants, entre formations géologiques spectaculaires, vastes plaines semi-arides et traces d'une présence humaine millénaire." },
        { day: "Jour 7", title: "Parc national d'Etosha", region: "Etosha", description: "Ce matin, vous mettez le cap vers le nord pour rejoindre l'un des sites emblématiques de tout voyage en Namibie : le Parc national d'Etosha, véritable joyau de la faune africaine. Étendu sur plus de 22 000 km², ce sanctuaire naturel est l'une des plus anciennes et vastes réserves animalières d'Afrique australe, réputée pour ses paysages contrastés et sa faune exceptionnelle." },
        { day: "Jour 8", title: "Safari à Etosha", region: "Etosha", description: "Cette journée marque une immersion complète dans l'univers animalier du Parc national d'Etosha, l'un des plus grands sanctuaires de safari en Namibie. Avec ses 22 275 km², ce parc emblématique abrite une biodiversité exceptionnelle dans un décor à couper le souffle." },
        { day: "Jour 9", title: "Plateau du Waterberg", region: "Otjiwarongo", description: "Après un petit-déjeuner tranquille, vous quittez la région d'Etosha pour vous diriger vers le sud en direction du spectaculaire Waterberg Plateau, un site naturel emblématique de Namibie. Sur le trajet, une pause est possible à Otjiwarongo, une ville accueillante idéale pour un déjeuner ou une pause café." },
        { day: "Jour 10", title: "Safari au Plateau central", region: "Windhoek", description: "Pour cette dernière journée complète en Namibie, vous quittez le Waterberg en matinée pour rejoindre une réserve privée située sur le plateau central, à proximité de l'aéroport international, mais toujours en pleine nature sauvage. Profitez de cette ultime occasion pour observer la richesse animale de la Namibie dans un cadre intime, avant votre départ." },
        { day: "Jour 11", title: "Arrivée en France", region: "Vol", description: "Votre arrivée en France s'effectue dans la journée, le cœur chargé de souvenirs inoubliables. Votre voyage sur mesure en Namibie s'achève après des safaris exceptionnels, des paysages désertiques grandioses et des rencontres authentiques avec la nature et les populations locales. Une expérience unique, riche en émotions, qui restera gravée durablement dans votre mémoire." },
      ]),
    },
    {
      slug: "aventure-en-namibie-17-jours",
      title: "Aventure Namibienne",
      duration: "17 jours / 14 nuits",
      level: "Voyage guidé",
      priceFrom: "À partir de 4 599 € / personne",
      pitch:
        "Pour prendre vraiment le temps de la Namibie. Dix-sept jours — Sossusvlei, Walvis Bay, Damaraland, trois jours de safari à Etosha, en option Kalahari et Erongo. Une nuit sous la Voie lactée, les éléphants du désert au premier rayon. Le temps cesse de courir. Imaginons votre Aventure ensemble.",
      coverImg: itinerairePremiumCover,
      heroImg: itinerairePremiumHero,
      steps: enrichSteps([
        { day: "Jour 1", title: "Départ de la France", region: "Vol", description: "Vous embarquez pour un voyage inoubliable au cœur de l'Afrique australe, entre dunes rougeoyantes, faune sauvage et paysages désertiques grandioses. Nuit à bord et arrivée le lendemain pour le début de votre aventure namibienne placée sous le signe de l'évasion, du dépaysement et de la nature à l'état brut." },
        { day: "Jour 2", title: "Windhoek", region: "Windhoek", description: "Arrivée à l'aéroport international Hosea Kutako de Windhoek et transfert vers la capitale namibienne. Selon votre horaire de vol d'arrivée, vous pourriez avoir le temps de découvrir le centre-ville. Puis, vous vous installerez à votre hébergement et profiterez de temps libre jusqu'au repas du soir." },
        { day: "Jour 3", title: "Kalahari", region: "Kalahari", description: "Ce matin, cap vers le sud-est de la Namibie, en direction de la région de Mariental, aux portes du désert du Kalahari. Cette zone, cœur agricole de la région du Hardap, est connue pour son barrage de Hardap, l'un des plus importants du pays. Il alimente en eau les champs de cultures, vergers, et surtout les prairies de fourrage indispensables à l'élevage bovin et ovin." },
        { day: "Jour 4", title: "Désert du Namib", region: "Sossusvlei", description: "Ce matin, vous quittez les paysages rougeoyants du Kalahari pour prendre la route vers l'ouest, en direction du légendaire désert du Namib, reconnu comme l'un des plus anciens déserts du monde. Cette journée de transition vous emmène à travers des paysages grandioses, entre montagnes, plateaux et plaines désertiques." },
        { day: "Jour 5", title: "Désert du Namib", region: "Sossusvlei", description: "Départ matinal pour une journée exceptionnelle à la découverte des sites emblématiques de la Namibie : Sossusvlei, Deadvlei et le canyon de Sesriem. Vous partez explorer le désert du Namib, considéré comme le plus ancien désert de la planète, avec des origines remontant à plus de 55 millions d'années." },
        { day: "Jour 6", title: "Côte Atlantique / Swakopmund", region: "Swakopmund", description: "Aujourd'hui, vous quittez les plaines arides du désert du Namib pour entamer une magnifique traversée vers la côte Atlantique de la Namibie. Ce désert majestueux s'étend sur plus de 1 600 kilomètres, du sud de l'Angola au nord de l'Afrique du Sud, formant une bande côtière de 80 à 100 km de large, connue pour ses paysages extrêmes et ses contrastes fascinants." },
        { day: "Jour 7", title: "Côte Atlantique / Entre océan et désert", region: "Walvis Bay", description: "Cette journée est consacrée à une immersion unique entre l'océan Atlantique et le désert du Namib, deux mondes qui se rejoignent dans un contraste spectaculaire. Ce matin, croisière au départ de Walvis Bay, le plus grand port en eau profonde de Namibie, en catamaran sur la lagune classée zone humide protégée Ramsar depuis 1995." },
        { day: "Jour 8", title: "Montagne Erongo", region: "Damaraland", description: "Ce matin, vous profitez encore de quelques heures sur la côte Atlantique, notamment à Swakopmund, avant de prendre la route vers l'intérieur des terres. Pour ceux qui le souhaitent, une option très recommandée s'offre à vous : un détour d'environ 60 km vers le site spectaculaire du Spitzkoppe, surnommé le « Cervin namibien »." },
        { day: "Jour 9", title: "Damaraland", region: "Damaraland", description: "Aujourd'hui, vous traversez les grands espaces du Damaraland, région fascinante aux paysages contrastés et terres ancestrales du peuple Damara. C'est une journée de liaison panoramique, riche en découvertes visuelles. En route, vous longerez le massif du Brandberg, montagne sacrée et toit du pays, dont le sommet, le Köningstein, culmine à 2 573 mètres." },
        { day: "Jour 10", title: "Parc National d'Etosha", region: "Etosha", description: "Aujourd'hui, vous prenez la route vers l'est, en direction d'un des joyaux absolus de la Namibie : le Parc National d'Etosha, célèbre pour sa faune abondante et ses paysages saisissants. Le déjeuner pourra être prévu à Okaukuejo, l'un des principaux camps du parc, avant de poursuivre votre premier safari dans Etosha." },
        { day: "Jour 11", title: "Parc National d'Etosha", region: "Etosha", description: "Aujourd'hui, vous vivez votre première journée complète de safari dans le mythique Parc National d'Etosha, véritable sanctuaire de la faune sauvage d'Afrique australe. Une journée inoubliable, rythmée par les lumières changeantes, la poussière des pistes et l'émotion des premières rencontres animalières." },
        { day: "Jour 12", title: "Parc National d'Etosha", region: "Etosha", description: "Votre seconde journée complète de safari dans le Parc National d'Etosha s'annonce tout aussi riche en observations et en émotions. Véritable sanctuaire de la biodiversité, Etosha abrite pas moins de 114 espèces de mammifères et plus de 340 espèces d'oiseaux, dont certaines sont endémiques à la région." },
        { day: "Jour 13", title: "Plateau du Waterberg", region: "Otjiwarongo", description: "Après le petit déjeuner, vous prenez la route vers le sud pour rejoindre le majestueux Plateau du Waterberg. En cours de route, possibilité de faire un arrêt au CCF (Cheetah Conservation Fund), un centre de renommée mondiale dédié à la préservation des guépards et léopards de Namibie." },
        { day: "Jour 14", title: "Plateau central", region: "Windhoek", description: "Ce matin, vous prenez votre temps. Vous pouvez profiter d'une petite balade digestive dans les sentiers du Plateau du Waterberg, au lever du jour. Vous poursuivez ensuite votre itinéraire vers le plateau central namibien, pour rejoindre la réserve privée d'Okonjati, que vous atteignez pour le déjeuner." },
        { day: "Jour 15", title: "Windhoek", region: "Windhoek", description: "Après le petit déjeuner, vous prenez la route pour rejoindre Windhoek, la capitale de la Namibie, perchée à 1 650 mètres d'altitude, ce qui en fait la ville la plus haute du pays. Une dernière traversée des paysages namibiens, entre vastes plaines et collines semi-arides." },
        { day: "Jour 16", title: "Aéroport international Hosea Kutako", region: "Windhoek", description: "Toutes les belles aventures ont une fin… C'est aujourd'hui que s'achève votre voyage en Namibie. Selon votre horaire de vol international, votre transfert vers l'aéroport Hosea Kutako, situé à environ 45 minutes du centre de Windhoek, sera organisé en conséquence." },
        { day: "Jour 17", title: "France", region: "Vol", description: "Fin de votre voyage sur mesure en Namibie, entre safaris inoubliables, déserts spectaculaires et rencontres authentiques. Une aventure unique qui restera gravée dans votre mémoire." },
      ]),
    },
    {
      slug: "icones-de-namibie-17-jours",
      title: "Icônes de Namibie",
      duration: "17 jours / 14 nuits",
      level: "Autotour",
      priceFrom: "À partir de 4 790 € / personne",
      pitch:
        "Pour embrasser la Namibie dans toute son ampleur, jusqu'au Kaokoland reculé. Dix-sept jours — Sossusvlei, Swakopmund, Damaraland, Kaokoland, trois nuits à Etosha, rencontre avec les Himbas et les éléphants du désert. Pistes ocre à perte de vue. Ciels d'orage au loin. Le premier sourire d'une femme himba. Construisons votre itinéraire d'icônes.",
      coverImg: itineraireAuthentique,
      steps: enrichSteps([
        { day: "Jour 1", title: "Départ de France", region: "Vol", description: "Départ de France à destination de Windhoek, la capitale de la Namibie. Vous embarquez pour un voyage inoubliable au cœur de l'Afrique australe, entre dunes rougeoyantes, faune sauvage et paysages désertiques grandioses. Nuit à bord et arrivée le lendemain pour le début de votre aventure namibienne." },
        { day: "Jour 2", title: "Arrivée à Windhoek", region: "Windhoek", description: "Votre voyage en Namibie commence par votre arrivée à l'aéroport international Hosea Kutako, situé à une quarantaine de kilomètres du centre-ville. À votre arrivée, vous êtes accueillis par votre chauffeur ou votre guide francophone (selon la formule choisie : en autotour ou en circuit accompagné). Un transfert privé vers Windhoek vous permettra d'avoir un premier aperçu de la savane environnante." },
        { day: "Jour 3", title: "Désert du Namib", region: "Sossusvlei", description: "Après un petit-déjeuner paisible à Windhoek, vous prenez la route en direction du sud-ouest pour une première étape de liaison, déjà riche en paysages spectaculaires. L'objectif : rejoindre les grandes étendues du désert du Namib, véritable emblème de la Namibie." },
        { day: "Jour 4", title: "Sossusvlei, Deadvlei et Sesriem Canyon", region: "Sossusvlei", description: "Réveil aux aurores pour l'une des journées les plus spectaculaires de votre voyage en Namibie. Vous partez avant le lever du soleil pour entrer dans le Parc National du Namib-Naukluft, et vous diriger vers les dunes mythiques de Sossusvlei et Deadvlei." },
        { day: "Jour 5", title: "Swakopmund", region: "Swakopmund", description: "Aujourd'hui, vous poursuivez votre road trip en Namibie en traversant une fois encore les étendues grandioses du désert du Namib, direction la côte Atlantique. L'itinéraire du jour vous offre un changement spectaculaire de décor, passant des dunes brûlantes aux brumes marines, dans une ambiance unique en Afrique." },
        { day: "Jour 6", title: "Walvis Bay & Sandwich Harbour", region: "Walvis Bay", description: "Cette cinquième journée vous plongera dans une expérience unique en Namibie, entre vie marine et immensités désertiques. Tôt le matin, départ vers Walvis Bay, la ville portuaire voisine située à environ 30 minutes de route au sud de Swakopmund." },
        { day: "Jour 7", title: "Damaraland", region: "Damaraland", description: "Après un dernier regard sur l'océan, vous quittez la côte pour pénétrer dans une région parmi les plus sauvages et préservées de Namibie : le Damaraland. Cette terre rude, dominée par des formations rocheuses spectaculaires, abrite des paysages étonnamment variés, une faune résiliente et une histoire humaine millénaire." },
        { day: "Jour 8", title: "Damaraland", region: "Damaraland", description: "Ce matin, une expérience exceptionnelle vous attend : un safari guidé dans le Damaraland, à la recherche des très rares éléphants du désert, une espèce non endémique mais unique par son adaptation à un environnement aussi aride. Départ à l'aube avec un guide local expérimenté du lodge, qui vous conduira en 4×4 à travers les lits de rivières asséchées de l'Aba-Huab ou de la Huab." },
        { day: "Jour 9", title: "Kaokoland", region: "Kaokoland", description: "Votre itinéraire vous conduit aujourd'hui au cœur du Kaokoland, région reculée et montagneuse du nord-ouest de la Namibie. Cette terre indomptée est le fief du peuple Himba, l'une des dernières communautés semi-nomades du pays, dont les traditions sont restées presque intactes." },
        { day: "Jour 10", title: "Etosha", region: "Etosha", description: "Aujourd'hui, vous prenez la route vers l'un des joyaux du nord namibien : le Parc national d'Etosha, l'une des plus grandes et anciennes réserves naturelles d'Afrique. Deux options s'offrent à vous pour cette étape, en fonction des disponibilités et du style de votre voyage." },
        { day: "Jour 11", title: "Etosha", region: "Etosha", description: "Vous entrez aujourd'hui dans le vif de votre expérience safari en Namibie, en explorant les pistes d'Etosha National Park, vaste sanctuaire de vie sauvage de 22 275 km², soit plus de la moitié de la taille de la Suisse." },
        { day: "Jour 12", title: "Etosha", region: "Etosha", description: "Cette journée complète de safari dans Etosha vous permet d'explorer plus en profondeur les écosystèmes variés du parc, qui abrite plus de 114 espèces de mammifères et 340 espèces d'oiseaux. Véritable « arche de Noé » africaine, Etosha est réputée pour sa concentration animale, notamment en saison sèche (mai à octobre)." },
        { day: "Jour 13", title: "Etosha", region: "Etosha", description: "C'est votre troisième et dernière journée dans le Parc National d'Etosha, et elle vous offre une ultime chance de croiser les animaux emblématiques de la savane namibienne. Vous poursuivez votre exploration de la partie nord-est du parc, plus verdoyante et souvent moins fréquentée." },
        { day: "Jour 14", title: "Plateau du Waterberg", region: "Otjiwarongo", description: "Après le petit-déjeuner, vous quittez la région d'Etosha pour reprendre la route vers le sud et rejoindre une autre facette fascinante de la Namibie : le Plateau du Waterberg. Sur le trajet, possibilité de faire une halte à Otjiwarongo, agréable ville intermédiaire, pour un déjeuner ou une pause café." },
        { day: "Jour 15", title: "Plateau central de Waterberg", region: "Windhoek", description: "Dernière journée complète en Namibie, et pas des moindres. Vous quittez le Waterberg dans la matinée pour rejoindre une réserve privée du plateau central, à proximité de l'aéroport, mais encore en pleine savane." },
        { day: "Jour 16", title: "Windhoek", region: "Windhoek", description: "Toutes les belles choses ont une fin… et après deux semaines d'aventure entre déserts rouges, safaris inoubliables, rencontres culturelles et paysages à couper le souffle, il est temps de prendre le chemin du retour." },
        { day: "Jour 17", title: "France", region: "Vol", description: "Arrivée en France dans la journée, des souvenirs plein la tête. Fin de votre voyage sur mesure en Namibie, entre safaris inoubliables, déserts spectaculaires et rencontres authentiques. Une aventure unique qui restera gravée dans votre mémoire." },
      ]),
    },
  ],

  regions: [
    {
      name: "Sossusvlei & le Namib",
      img: sossusvleiPhoto,
      description:
        "Cœur emblématique du voyage : dunes de sable rouge culminant à 325 mètres, Deadvlei et ses arbres millénaires, canyon de Sesriem. À découvrir au lever du jour pour la lumière, en survol pour l'échelle.",
    },
    {
      name: "Damaraland",
      img: damaralandPhoto,
      description:
        "Plateaux granitiques, gravures rupestres de Twyfelfontein (UNESCO), éléphants du désert et rhinocéros noirs. Une région phare pour les voyageurs sensibles à la conservation et à la rencontre avec les communautés locales.",
    },
    {
      name: "Etosha",
      img: etoshaPhoto,
      description:
        "Le grand parc national de Namibie. Immense pan salin de 5 000 km², waterholes éclairés la nuit, la concentration animale est exceptionnelle de juin à octobre. À combiner avec une réserve privée comme Ongava pour le walking safari.",
    },
    {
      name: "Skeleton Coast",
      img: skeletonPhoto,
      description:
        "La côte des Squelettes : 500 km de désert qui s'effondre dans l'Atlantique, brumes constantes, épaves de bateaux, lions du désert et colonies d'otaries de Cape Cross. À explorer en survol ou depuis le camp Hoanib.",
    },
    {
      name: "Kaokoland & Kunene",
      img: himbaPhoto,
      description:
        "Le grand nord reculé, peuplé par les Himbas. Pistes exigeantes, chutes Epupa sur la rivière Kunene, sources chaudes. Réservé aux voyageurs en quête de bout du monde, en circuit guidé ou en fly-in.",
    },
    {
      name: "Swakopmund & Walvis Bay",
      img: swakopmundPhoto,
      description:
        "Halte coloniale allemande sur l'Atlantique. Architecture pastel, pâtisseries, kayak avec les otaries, sandboarding, survol de Sandwich Harbour. Une parenthèse douce entre deux étapes de désert.",
    },
  ],

  practical: {
    visa: "Pas de visa requis pour les ressortissants français, belges, suisses et canadiens pour des séjours touristiques de moins de 90 jours. Passeport valide 6 mois après la date de retour, avec au moins 3 pages vierges. Un visa électronique sera mis en place courant 2025 — nous suivons l'évolution réglementaire et vous tenons informés à chaque étape. Nous vous accompagnons sur chaque formalité, au cas par cas.",
    health: "Aucun vaccin obligatoire en provenance d'Europe. Vaccins recommandés : DTP, hépatites A et B, fièvre typhoïde. Traitement antipaludéen recommandé pour la région nord (Caprivi, nord d'Etosha) en saison des pluies. Eau du robinet potable dans les villes ; en brousse, eau en bouteille fournie par les lodges. Nous vous remettons un carnet santé personnalisé avec les contacts médicaux francophones sur place — nous gérons pour vous le lien avec nos relais médicaux à Windhoek.",
    money: "Dollar namibien (NAD), parité avec le rand sud-africain (ZAR), accepté partout. 1 € ≈ 20 NAD (variable). Cartes bancaires acceptées dans les lodges, hôtels et stations-service principales. Distributeurs disponibles dans les villes — prévoyez du cash pour les pourboires et marchés artisanaux. Nous indiquons sur votre carnet de route les bonnes pratiques de change et de paiement, étape par étape.",
    flights: "Pas de vol direct depuis la France. Trajets via Francfort (Lufthansa, Discover Airlines), Johannesburg (Air France + Airlink), Doha (Qatar Airways) ou Addis-Abeba (Ethiopian Airlines). Comptez 14 à 20 h de trajet total. Nous gérons pour vous l'intégralité de la billetterie internationale dans le cadre de votre devis, en optimisant horaires, escales et tarifs.",
    timezone: "GMT+2 toute l'année (1 h de plus qu'en hiver en France, même heure qu'en été). Aucun jet-lag majeur à prévoir — vous êtes opérationnel dès le premier matin sur les pistes.",
    language: "Anglais (officiel), afrikaans, allemand et plusieurs langues bantoues. Tous nos partenaires et guides parlent français — nous vous accompagnons dans votre langue, du premier briefing à Windhoek jusqu'au dernier transfert vers l'aéroport.",
    safety: "Pays politiquement stable et sûr. Précautions classiques en ville (Windhoek surtout). Routes globalement excellentes mais pistes en gravier exigeant prudence : 80 km/h max, distances longues. Nos véhicules 4×4 sont équipés de deux roues de secours, GPS, glacière et téléphone satellite. Nous restons joignables 7 j / 7 pendant tout votre séjour — un seul numéro à composer en cas de besoin.",
    tips: "Pourboires usuels : 100-150 NAD/jour pour le guide privé, 50-100 NAD/jour pour le staff de lodge, 10 % au restaurant. Prévoyez des vêtements chauds pour les matinées d'hiver (mai à août, jusqu'à 0 °C à l'aube) — polaire indispensable pour les safaris en véhicule ouvert. Nous vous remettons avant le départ un carnet de voyage complet : checklist bagages, conseils par étape, contacts utiles.",
  },

  faq: [
    {
      q: "Quel est le meilleur moment pour partir en Namibie ?",
      a: "La meilleure période pour un voyage sur mesure en Namibie s'étend de mai à octobre — saison sèche, températures agréables en journée, nuits fraîches, faune concentrée autour des points d'eau du parc d'Etosha. Juillet et août sont les mois les plus prisés pour les safaris Namibie en famille : il est alors recommandé de réserver les lodges en Namibie six à neuf mois à l'avance. Mars-avril offre des paysages verdoyants après les pluies, avec moins de visiteurs et des lumières d'une rare beauté pour la photo, notamment sur les dunes du Sossusvlei et le Damaraland. Notre équipe vous oriente vers la fenêtre la plus juste, en fonction de votre projet et de vos envies — discutons-en avec un de nos experts Namibie.",
    },
    {
      q: "Combien coûte un voyage sur mesure en Namibie ?",
      a: "Comptez à partir de 2 200 € / personne pour 11 jours en autotour Namibie 4×4 avec lodges confort, hors vols internationaux. Pour un circuit Namibie de 14-17 jours en hébergements supérieurs, le budget se situe généralement entre 4 500 et 6 500 € / personne. Un fly-in safari premium dans les meilleurs camps (Wilderness, andBeyond, Ongava) démarre à 12 000 € / personne pour 10 jours. Un voyage Namibie en famille avec enfants peut être optimisé autour de 3 800 € / personne. Chaque proposition est calibrée sur vos envies, votre saison de départ et votre budget — sans surcoût d'agence, avec la transparence totale de notre partenaire francophone à Windhoek. Partagez-nous votre projet : nous prenons le temps de l'étudier en détail, et revenons vers vous avec une proposition chiffrée et personnalisée.",
    },
    {
      q: "Faut-il un visa pour la Namibie ?",
      a: "Non, pas de visa requis pour les ressortissants français, belges, suisses et canadiens pour les séjours touristiques de moins de 90 jours. Un passeport valide 6 mois après la date de retour, avec au moins 3 pages vierges, est obligatoire. Un système de visa électronique sera mis en place courant 2025 — nous suivons l'évolution réglementaire et tenons nos clients informés en amont du départ. Nous vérifions chaque dossier avec vous, formalité par formalité : aucune mauvaise surprise à l'aéroport.",
    },
    {
      q: "Peut-on faire la Namibie en autotour avec des enfants ?",
      a: "Oui, la Namibie est l'une des meilleures destinations familiales d'Afrique australe à partir de 7-8 ans. Les distances sont longues mais les pistes sécurisées, les lodges en Namibie accueillent volontiers les enfants, et les safaris à Etosha en autonomie permettent de gérer son rythme. Nous adaptons l'itinéraire avec des étapes plus courtes, des activités ludiques (sandboarding à Swakopmund, quad dans le désert, rencontre avec les guépards à Otjitotongwe) et nous sélectionnons les lodges les plus adaptés aux familles. Nous restons joignables 7 j / 7 avant et pendant votre voyage — vous n'êtes jamais seuls. Imaginons votre voyage en famille.",
    },
    {
      q: "Quels vaccins sont nécessaires pour un voyage en Namibie ?",
      a: "Aucun vaccin n'est obligatoire en provenance d'Europe. Sont recommandés : DTP à jour, hépatites A et B, fièvre typhoïde. Le traitement antipaludéen est conseillé uniquement pour la région nord (bande de Caprivi, nord d'Etosha) en saison des pluies (novembre à avril). Consultez votre médecin ou un centre de vaccinations internationales 4 à 6 semaines avant le départ. Nous remettons à chaque client un carnet de voyage incluant les recommandations sanitaires à jour et les contacts médicaux francophones sur place. On s'occupe du reste — vous, vous voyagez l'esprit libre.",
    },
    {
      q: "Faut-il un permis de conduire international ?",
      a: "Non, le permis français est accepté en Namibie pour les locations de moins de 90 jours. Nous recommandons toutefois le permis international, plus simple à présenter en cas de contrôle. La conduite est à gauche, le réseau est excellent sur les axes goudronnés, plus exigeant sur les pistes en gravier — nos véhicules 4×4 sont équipés de deux roues de secours, GPS, glacière et téléphone satellite. Un briefing complet est délivré au départ de Windhoek par notre partenaire francophone. Quelques minutes d'échange suffisent pour démarrer votre projet.",
    },
    {
      q: "Combien de temps prévoir pour visiter la Namibie ?",
      a: "Un minimum de 11 à 12 jours est recommandé pour un premier circuit Namibie (Sossusvlei + Swakopmund + Damaraland + Etosha). Comptez 14 à 17 jours pour ajouter le Kaokoland et les rencontres avec les Himbas, et 21 jours pour une exploration approfondie incluant la bande de Caprivi et les chutes Victoria en extension Zambie ou Zimbabwe. Nous partons toujours de votre rythme, jamais d'un programme imposé. Donnez-nous quelques contraintes (dates, durée, envies), nous vous proposons une trame personnalisée.",
    },
    {
      q: "Peut-on combiner la Namibie avec un autre pays d'Afrique australe ?",
      a: "Oui, et c'est même l'une de nos extensions les plus appréciées. Les combinaisons les plus naturelles : Namibie + Botswana (delta de l'Okavango et Chobe) en 21 jours, Namibie + chutes Victoria (Zambie ou Zimbabwe) en 14-17 jours, ou Namibie + Cape Town et Garden Route en 18-21 jours pour un grand voyage Afrique australe. Les vols intérieurs ou trajets terrestres sont parfaitement rodés, et nous gérons pour vous l'intégralité de la logistique multi-pays. Parlez-nous de votre projet — nous le traduisons en itinéraire pensé sur mesure.",
    },
    {
      q: "Quelle différence entre un autotour et un fly-in safari Namibie ?",
      a: "Un autotour Namibie se fait en 4×4 de location, à votre rythme, sur des étapes de 2 à 5 h de route entre les sites — c'est la formule la plus libre, la plus immersive, et de loin la plus accessible (à partir de 2 200 € / pers en 11 jours). Un fly-in safari relie les camps les plus exclusifs en avion-taxi (Cessna), avec transferts privés au sol — vous gagnez du temps, accédez à des camps inaccessibles autrement (Hoanib Skeleton Coast, Serra Cafema, Little Kulala) et profitez d'un service ultra-personnalisé. À partir de 12 000 € / pers pour 10 jours. Nous vous aidons à choisir la formule qui correspond à votre style de voyage.",
    },
    {
      q: "Pourquoi passer par une agence comme La Voyagerie ?",
      a: "Parce que la Namibie est un pays exigeant en logistique : réservation des lodges en haute saison (souvent un an à l'avance), enchaînement précis des étapes en 4×4, équipement complet du véhicule, assistance 24/7 sur place via notre partenaire francophone à Windhoek. Nous testons chaque lodge en personne, négocions des tarifs préférentiels avec nos partenaires sélectionnés, et vous offrons une vraie sécurité du premier contact au retour à la maison. Et surtout : on dessine votre voyage sur mesure en Namibie avec vous, pas pour vous. Un seul interlocuteur, expert de la destination, du devis au retour à la maison.",
    },
  ],

  galleryImgs: [sossusvleiPhoto, etoshaPhoto, damaralandPhoto, skeletonPhoto, himbaPhoto, swakopmundPhoto, cielEtoile],

  parallaxBands: {
    afterIntro: sossusvleiPhoto,
    afterWhenToGo: parallaxDunes,
    afterRegions: swakopmundPhoto, // désert au coucher de soleil — tons chauds
  },

  pullQuote: {
    text: "La Namibie ne se visite pas. Elle se ressent — dans le silence des dunes du Sossusvlei à l'aube, dans l'immensité des plaines d'Etosha, dans la lumière dorée du Damaraland. Un voyage qui marque, longtemps après le retour.",
    author: "Notre équipe — agence spécialiste de la Namibie",
  },

  ctaBackground: cielEtoile,
};

// Photo héro principale du pays (utilisée comme img dans destinations.ts)
export const namibieHero = heroNamibie;
