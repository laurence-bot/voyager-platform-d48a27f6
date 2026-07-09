import type { DetailedPays } from "@/data/destinations";

// Photos Ouganda — récupérées depuis lavoyagerie.fr
import heroOuganda from "@/assets/destinations/ouganda/hero-ouganda.webp";
import gorilles from "@/assets/destinations/ouganda/gorilles.webp";
import bwindi from "@/assets/destinations/ouganda/bwindi.webp";
import bwindiTrek from "@/assets/destinations/ouganda/bwindi-trek.webp";
import queenElizabeth from "@/assets/destinations/ouganda/queen-elizabeth.webp";
import queenIshasha from "@/assets/destinations/ouganda/queen-ishasha.webp";
import murchisonFalls from "@/assets/destinations/ouganda/murchison-falls.webp";
import murchisonNile from "@/assets/destinations/ouganda/murchison-nile.webp";
import kibaleForet from "@/assets/destinations/ouganda/kibale-foret.webp";
import kibaleChimp from "@/assets/destinations/ouganda/kibale-chimp.webp";
import sipiFalls from "@/assets/destinations/ouganda/sipi-falls.webp";
import sipiPaysage from "@/assets/destinations/ouganda/sipi-paysage.webp";
import ziwaRhino from "@/assets/destinations/ouganda/ziwa-rhino.webp";
import safariExploration from "@/assets/destinations/ouganda/safari-exploration.webp";

// Covers itinéraires
import coverSignature from "@/assets/destinations/ouganda/cover-signature.webp";
import coverEssentiel from "@/assets/destinations/ouganda/cover-essentiel.webp";
import coverFamille from "@/assets/destinations/ouganda/cover-famille.webp";
import coverExtension from "@/assets/destinations/ouganda/cover-extension.png";

// Pool de photos par région — pour enrichir les étapes des itinéraires
const STEP_POOL_BY_REGION: Record<string, string[]> = {
  "Vol": [murchisonNile],
  "Entebbe": [heroOuganda, safariExploration],
  "Kampala": [heroOuganda],
  "Jinja": [murchisonNile, sipiPaysage],
  "Murchison Falls": [murchisonFalls, murchisonNile],
  "Ziwa": [ziwaRhino],
  "Kibale": [kibaleForet, kibaleChimp],
  "Queen Elizabeth": [queenElizabeth, queenIshasha, safariExploration],
  "Bwindi": [bwindi, bwindiTrek, gorilles],
  "Lac Bunyonyi": [sipiPaysage, queenIshasha],
  "Lac Mburo": [safariExploration, queenElizabeth],
  "Sipi Falls": [sipiFalls, sipiPaysage],
};

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

export const ougandaDetailed: DetailedPays = {
  metaTitle: "Voyage sur mesure Ouganda | Trek Gorilles, Safari & Lodges | La Voyagerie",
  metaDescription:
    "Voyage sur mesure en Ouganda par notre agence spécialiste : trek gorilles à Bwindi, safari Queen Elizabeth, croisière Murchison Falls. Chauffeur-guide francophone, lodges sélectionnés, accompagnement de bout en bout.",

  longIntro: [
    "Une brume basse, le craquement d'une branche, deux yeux ambrés qui se posent sur les vôtres. L'Ouganda ne se raconte pas — il vous traverse. Au cœur de la forêt impénétrable de Bwindi, vous remontez les sentiers d'argile rouge, le souffle court, et soudain : un dos argenté, immobile, à trois mètres de vous. Ailleurs, ce serait un récit. Ici, c'est un instant suspendu, une rencontre rare avec les derniers gorilles de montagne. Et ce n'est qu'un fragment de ce que la « Perle de l'Afrique » vous réserve.",
    "Chez La Voyagerie, agence spécialiste de l'Ouganda, nous concevons chaque circuit à la main, avec notre chauffeur-guide local francophone Vianney et nos partenaires sur place. Tous nos itinéraires sont testés, des plaines de Queen Elizabeth aux chutes de Murchison Falls, des chimpanzés de Kibale aux cascades secrètes de Sipi. Lodges intimes, écolodges en pleine nature, camps de tentes choisis pour leur âme — jamais pour leur volume. Chaque étape se prépare avec respect : pour la faune, pour les communautés ougandaises, pour vous.",
    "Un couple en quête de gorilles, dix jours d'expédition. Une famille avec ados, premier safari africain encadré. Trois semaines pour combiner Bwindi, Murchison, Kibale et l'extension Sipi Falls. Quel que soit votre projet, nous le composons à votre rythme. Aucun groupe imposé, aucun itinéraire standardisé — votre Ouganda, et rien d'autre. Construisons-le ensemble.",
  ],

  whyVisit: [
    {
      title: "Le trek aux gorilles de Bwindi",
      text: "L'expérience qui justifie le voyage. Classée à l'UNESCO, la forêt impénétrable de Bwindi abrite près de la moitié des gorilles de montagne encore en vie sur Terre. Une heure d'observation autorisée, après une marche d'1 à 5 h selon le groupe attribué. Le silence, les regards, la conscience d'un instant rare. On en revient transformé.",
      img: bwindi,
    },
    {
      title: "Les lions grimpeurs d'Ishasha",
      text: "Une scène unique au monde. Dans la région d'Ishasha, au sud du parc Queen Elizabeth, les lions ont pris l'habitude de grimper aux figuiers pour échapper à la chaleur. Vous coupez le moteur du 4×4, et vous les voyez là, suspendus dans la lumière dorée — une étrangeté magnifique.",
      img: queenIshasha,
    },
    {
      title: "Murchison Falls et la croisière sur le Nil",
      text: "Le Nil Victoria s'engouffre dans une faille de sept mètres de large pour s'effondrer en grondant. Vous remontez le fleuve en bateau jusqu'au pied des chutes, hippopotames à droite, crocodiles à gauche, éléphants qui descendent boire. Un théâtre vivant, sans filtre.",
      img: murchisonFalls,
    },
    {
      title: "Les chimpanzés de la forêt de Kibale",
      text: "L'autre rencontre primate. Dans la canopée dense de Kibale, treize espèces de singes cohabitent — dont la plus forte densité de chimpanzés sauvages d'Afrique. Vous les suivez à pied, leurs cris se rapprochent, puis ils sont là, juste au-dessus de vous, vivants, bruyants, intensément humains.",
      img: kibaleChimp,
    },
    {
      title: "Les cascades de Sipi et le Mont Elgon",
      text: "L'Ouganda secret, à l'est du pays. Trois cascades enchaînées dans une région verdoyante peu fréquentée, à explorer à pied, en VTT ou en rappel. Sur le chemin, les caféiculteurs locaux vous ouvrent leurs maisons : on goûte un arabica d'altitude que l'on n'oubliera pas.",
      img: sipiFalls,
    },
    {
      title: "Le sanctuaire des rhinocéros de Ziwa",
      text: "Le seul endroit du pays où l'on observe des rhinocéros à pied. À mi-chemin entre Kampala et Murchison Falls, la réserve de Ziwa protège une trentaine d'individus dans le cadre d'un projet de conservation actif. Vous approchez en silence, à quelques mètres — un guide, un sentier, une présence brute.",
      img: ziwaRhino,
    },
    {
      title: "La source du Nil à Jinja",
      text: "Là où le plus long fleuve du monde commence. Jinja est une ville-mosaïque, vibrante, posée à la naissance du Nil blanc. On y fait du rafting de classe mondiale, on remonte le fleuve en bateau au coucher du soleil, on rencontre les pêcheurs au filet — une autre Ouganda, urbaine et électrique.",
      img: murchisonNile,
    },
    {
      title: "Les communautés et la culture locale",
      text: "L'âme du voyage. Coup de cœur de Carine, l'une de nos voyageuses : un spectacle de danse improvisé d'enfants d'un orphelinat, des sourires si purs que l'on a touché du doigt l'âme de l'Ouganda. Visites de villages préparées avec respect, échanges authentiques, hospitalité qui marque.",
      img: heroOuganda,
    },
    {
      title: "Une faune et une nature spectaculaires",
      text: "Big Five, primates, oiseaux rares — tout dans un seul pays. Du Bec-en-sabot que l'on traque sur le Nil aux éléphants de Murchison Falls, de la forêt brumeuse de Bwindi aux savanes de Queen Elizabeth, l'Ouganda concentre une biodiversité dont peu de destinations africaines peuvent se prévaloir.",
      img: queenElizabeth,
    },
  ],

  whenToGo: {
    summary:
      "La meilleure saison pour un voyage sur mesure en Ouganda s'étend de décembre à février et de juin à septembre — saisons sèches, pistes praticables, conditions idéales pour le trek aux gorilles à Bwindi et les safaris à Queen Elizabeth ou Murchison Falls. Mars-mai et octobre-novembre correspondent aux saisons des pluies : paysages plus verdoyants, lumières d'orage spectaculaires, périodes plus calmes pour éviter les foules — mais certaines pistes peuvent devenir glissantes. Que vous prépariez un trek gorilles, un safari familial ou une extension Sipi Falls, notre équipe vous oriente vers la fenêtre la plus juste pour votre projet — et réserve les permis gorilles (limités, 8 par groupe et par jour) ainsi que les meilleurs lodges six à neuf mois à l'avance en haute saison. Nous gérons pour vous l'ensemble du calendrier : permis, vols intérieurs, hébergements. Vous n'avez qu'à rêver, on s'occupe du reste.",
    months: [
      { month: "Jan", recommandation: "ideal", note: "Sec, idéal pour les gorilles" },
      { month: "Fév", recommandation: "ideal", note: "Sec, parfait pour le trek" },
      { month: "Mar", recommandation: "moyenne", note: "Début saison des pluies" },
      { month: "Avr", recommandation: "moyenne", note: "Pluies, paysages verts" },
      { month: "Mai", recommandation: "moyenne", note: "Pluies, peu de monde" },
      { month: "Juin", recommandation: "ideal", note: "Saison sèche, faune visible" },
      { month: "Juil", recommandation: "ideal", note: "Pleine saison, idéal trek" },
      { month: "Août", recommandation: "ideal", note: "Sec, conditions parfaites" },
      { month: "Sep", recommandation: "ideal", note: "Fin de saison sèche" },
      { month: "Oct", recommandation: "bonne", note: "Premières pluies, vert" },
      { month: "Nov", recommandation: "bonne", note: "Pluies modérées" },
      { month: "Déc", recommandation: "ideal", note: "Sec, lumière exceptionnelle" },
    ],
  },

  lodges: [
    {
      name: "Mahogany Springs Lodge",
      region: "Bwindi",
      description: "Lodge intime posé en lisière de la forêt impénétrable de Bwindi, à quelques minutes du point de départ des treks gorilles. Suites spacieuses, terrasse privée face à la forêt, table d'inspiration ougandaise. Idéal pour récupérer après une journée intense en montagne.",
      highlights: ["À deux pas du trek gorilles", "Suites face à la forêt", "Service francophone sur demande"],
      img: "https://static.wixstatic.com/media/97e8bd_8af569d6a5ca4422b46231488e2bebbd~mv2.jpg/v1/fill/w_1600,h_1067,al_c,q_85/97e8bd_8af569d6a5ca4422b46231488e2bebbd~mv2.jpg",
    },
    {
      name: "Kyambura Gorge Lodge",
      region: "Queen Elizabeth",
      description: "Adresse signature en bordure du parc Queen Elizabeth, dans une ancienne plantation de café réhabilitée. Huit cottages en pierre, vue sur la gorge de Kyambura (où l'on traque les chimpanzés), piscine à débordement. Engagement fort dans la conservation et les communautés locales.",
      highlights: ["Vue sur la gorge de Kyambura", "Plantation de café", "Conservation active"],
      img: "https://volcanoessafaris.com/storage/media-library/552/Volcanoes-safaris-Kyambura-Gorge-Lodge-HDR_0002-4-(13).jpg",
    },
    {
      name: "Paraa Safari Lodge",
      region: "Murchison Falls",
      description: "Posé sur les rives du Nil Victoria, en plein cœur du parc national de Murchison Falls. Chambres avec balcon donnant sur le fleuve, restaurant face au coucher de soleil, accès direct aux croisières vers les chutes. Une adresse historique, fidèle à l'esprit safari.",
      highlights: ["Balcons face au Nil", "Croisières au pied des chutes", "Au cœur du parc"],
      img: "https://paraalodge.wpenginepowered.com/wp-content/uploads/2015/07/suite-17-2-1-1240x560.jpg",
    },
    {
      name: "Primate Lodge Kibale",
      region: "Kibale",
      description: "Écolodge fondu dans la forêt tropicale de Kibale, à quelques mètres du point de départ du chimpanzee tracking. Bungalows en bois sur pilotis, ambiance jungle, réveil par les cris des primates. Une immersion totale, sans artifice.",
      highlights: ["Au cœur de la forêt de Kibale", "Bungalows sur pilotis", "Réveil avec les chimpanzés"],
      img: "https://thegreatlakescollection.com/wp-content/uploads/2025/02/primate-lodge-kibale-aerial-view-026.webp",
    },
    {
      name: "Sipi River Lodge",
      region: "Sipi Falls",
      description: "Lodge confidentiel face aux trois cascades de Sipi, à l'est du pays. Cottages en pierre et toit de chaume, jardins luxuriants, vue plongeante sur la vallée. Excursions en VTT, rappel des cascades, dégustation de café arabica chez les producteurs voisins.",
      highlights: ["Vue sur les cascades de Sipi", "Café arabica d'altitude", "Activités outdoor"],
      img: "https://www.mountelgonnationalpark.com/wp-content/uploads/2023/06/Sipi-River-Lodge-1475x700.jpg",
    },
    {
      name: "Ihamba Lakeside Safari Lodge",
      region: "Queen Elizabeth (lac George)",
      description: "Lodge familial sur les rives du lac George, à l'entrée nord du parc Queen Elizabeth. Chalets confortables, piscine, observation des hippopotames et oiseaux directement depuis la terrasse. Idéal pour un séjour familial calme entre deux safaris.",
      highlights: ["Bord du lac George", "Hippopotames depuis la terrasse", "Adapté aux familles"],
      img: queenIshasha,
    },
    {
      name: "Ziwa Rhino Lodge",
      region: "Ziwa Rhino Sanctuary",
      description: "Petit camp installé au sein même du sanctuaire de Ziwa, seul lieu en Ouganda où l'on observe des rhinocéros à pied. Bandas confortables, dîners conviviaux, briefings avec les rangers du programme de conservation. Étape rare et engagée.",
      highlights: ["Au sein du sanctuaire", "Rhinocéros à pied", "Programme de conservation"],
      img: "https://ziwarhinoandwildliferanch.com/wp-content/uploads/2024/05/luxury-chalet-exterior.webp",
    },
    {
      name: "Wildwaters Lodge",
      region: "Jinja (source du Nil)",
      description: "Adresse exclusive perchée sur une île privée au cœur des rapides du Nil blanc, près de Jinja. Dix cottages en bois ouverts sur le fleuve, son permanent de l'eau, accès uniquement par bateau. Une parenthèse sensorielle, parfaite avant ou après le trek gorilles.",
      highlights: ["Île privée sur le Nil", "Cottages face aux rapides", "Accès en bateau"],
      img: "https://wetu.com/ImageHandler/n1280x720/35420/1756839182596wildwaters-lodge-13.jpg",
    },
    {
      name: "Mihingo Lodge",
      region: "Lac Mburo",
      description: "Lodge perché sur un kopje rocheux dominant le parc national du lac Mburo. Tentes-suites avec vue panoramique, piscine taillée dans la roche, safaris à pied, à cheval ou en bateau. Une étape parfaite en transition entre Kampala et le sud-ouest du pays.",
      highlights: ["Vue panoramique sur le lac", "Safaris à cheval", "Tentes-suites confortables"],
      img: "https://mihingolodge.com/wp-content/uploads/2015/02/slider22.jpg",
    },
    {
      name: "Sanctuary Gorilla Forest Camp",
      region: "Bwindi",
      description: "Adresse mythique située à l'intérieur même de la forêt impénétrable de Bwindi — la seule autorisée à camper au cœur du parc. Huit tentes de luxe sur plateformes, salles de bain en pierre, parfois visitée par les gorilles eux-mêmes. Une expérience hors du commun.",
      highlights: ["Au cœur de la forêt", "Tentes de luxe sur pilotis", "Visites occasionnelles des gorilles"],
      img: "https://wetu.com/ImageHandler/n1280x720/18488/1753275170507_GFL_Exterior-(2).jpg",
    },
  ],

  itineraires: [
    {
      slug: "essentiel-ouganda-10-jours",
      title: "Essentiel Ouganda",
      duration: "10 jours / 8 nuits",
      level: "Découverte",
      priceFrom: "À partir de 4 290 € / personne",
      pitch:
        "Pour découvrir l'Ouganda dans ce qu'il a de plus puissant. Dix jours — Murchison Falls, Kibale et ses chimpanzés, Queen Elizabeth, et le moment qui restera : le trek aux gorilles de Bwindi. Chauffeur-guide francophone privatif. Composons votre Essentiel ensemble.",
      coverImg: coverEssentiel,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Entebbe", region: "Vol", description: "Départ de France à destination d'Entebbe, principale porte d'entrée de l'Ouganda. Vol de nuit en direction de l'Afrique de l'Est, premier souffle d'une aventure entre forêts tropicales, savanes peuplées et rencontres rares avec la grande faune ougandaise." },
        { day: "Jour 2", title: "Arrivée à Entebbe — accueil par votre chauffeur-guide", region: "Entebbe", description: "Arrivée à l'aéroport international d'Entebbe, posé sur les rives du lac Victoria. Vous êtes accueillis par votre chauffeur-guide francophone, qui vous accompagnera pendant tout le séjour. Transfert vers votre hôtel à Entebbe pour une première nuit reposante au bord du lac." },
        { day: "Jour 3", title: "Route vers Murchison Falls — pause au sanctuaire de Ziwa", region: "Ziwa", description: "Cap au nord-ouest, vers le parc national de Murchison Falls. En chemin, halte exceptionnelle au sanctuaire de rhinocéros de Ziwa : marche guidée à pied à quelques mètres de ces géants, dans le cadre d'un programme de conservation actif. Poursuite jusqu'à votre lodge en lisière du parc." },
        { day: "Jour 4", title: "Murchison Falls — safari et croisière sur le Nil", region: "Murchison Falls", description: "Safari matinal dans la partie nord du parc : girafes, éléphants, lions et antilopes des marais (kobs) au pied des plaines herbeuses. L'après-midi, croisière sur le Nil Victoria jusqu'au pied des chutes, parmi les hippopotames et les crocodiles. Ascension recommandée jusqu'au sommet pour ressentir la puissance brute du fleuve." },
        { day: "Jour 5", title: "Route vers Kibale — la forêt aux primates", region: "Kibale", description: "Longue traversée vers le sud-ouest et la forêt tropicale de Kibale, l'une des plus belles d'Afrique de l'Est. En route, paysages de plantations de thé, de bananiers et de collines verdoyantes. Installation à l'écolodge en lisière de la forêt, sons de la canopée comme musique d'arrière-plan." },
        { day: "Jour 6", title: "Kibale — chimpanzee tracking et marche dans Bigodi", region: "Kibale", description: "Tôt le matin, départ pour le tracking des chimpanzés sauvages dans Kibale, qui abrite la plus forte densité de primates d'Afrique. Une à trois heures de marche selon les groupes, puis une heure d'observation rapprochée. L'après-midi, marche dans le marais voisin de Bigodi, paradis ornithologique géré par la communauté locale." },
        { day: "Jour 7", title: "Queen Elizabeth — safari et lions d'Ishasha", region: "Queen Elizabeth", description: "Route vers le parc national Queen Elizabeth, l'un des plus beaux du pays. Safari sur la péninsule de Mweya, observation des éléphants, buffles et antilopes. Selon votre lodge, descente jusqu'à la région d'Ishasha, célèbre pour ses lions perchés dans les figuiers — un spectacle unique au monde." },
        { day: "Jour 8", title: "Route vers Bwindi — la forêt impénétrable", region: "Bwindi", description: "Traversée du canal de Kazinga puis route en direction du sud, à travers les collines verdoyantes du Kigezi, parfois surnommé « la Suisse africaine ». Arrivée en fin d'après-midi à votre lodge en lisière de Bwindi. Briefing du soir avec votre guide pour préparer le trek du lendemain." },
        { day: "Jour 9", title: "Bwindi — trek aux gorilles de montagne", region: "Bwindi", description: "Le moment du voyage. Départ à l'aube pour le briefing au quartier général des rangers, puis attribution d'un groupe de gorilles. Marche d'1 à 5 h à travers la forêt impénétrable, terrain escarpé, atmosphère brumeuse. Une heure d'observation autorisée — instant suspendu, regards échangés, silence de la jungle. Retour au lodge en fin de journée." },
        { day: "Jour 10", title: "Vol intérieur ou route pour Entebbe — vol retour", region: "Vol", description: "Selon votre rythme, vol intérieur depuis l'airstrip de Kihihi ou Kisoro vers Entebbe (1 h 30) ou route panoramique. Transfert vers l'aéroport international, dépôt du véhicule et vol retour vers la France. Une dernière fois la lumière dorée des collines ougandaises, puis le ciel." },
      ]),
    },
    {
      slug: "ouganda-signature-14-jours",
      title: "Ouganda Signature",
      duration: "14 jours / 12 nuits",
      level: "Voyage guidé",
      priceFrom: "À partir de 6 490 € / personne",
      pitch:
        "Pour prendre vraiment le temps de l'Ouganda. Quatorze jours — Jinja et la source du Nil, Murchison Falls, Kibale, Queen Elizabeth, deux journées à Bwindi pour augmenter les chances avec les gorilles, finition au lac Bunyonyi. Le rythme s'apaise, les rencontres s'approfondissent. Construisons votre Signature.",
      coverImg: coverSignature,
      heroImg: coverSignature,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Entebbe", region: "Vol", description: "Départ de France à destination de l'Ouganda, le pays surnommé la « Perle de l'Afrique » par Winston Churchill. Vol de nuit, escale possible à Doha, Addis-Abeba ou Bruxelles selon la compagnie sélectionnée." },
        { day: "Jour 2", title: "Entebbe et le lac Victoria", region: "Entebbe", description: "Accueil à votre arrivée par votre chauffeur-guide francophone. Transfert vers votre hôtel sur les rives du lac Victoria. Selon l'horaire, visite possible des jardins botaniques d'Entebbe ou simple temps de récupération avant l'aventure." },
        { day: "Jour 3", title: "Route vers Jinja — source du Nil", region: "Jinja", description: "Cap à l'est vers Jinja, là où le Nil blanc prend sa source à la sortie du lac Victoria. Croisière au coucher du soleil sur le fleuve, observation des oiseaux d'eau et des pêcheurs traditionnels. Ambiance festive et atypique d'une ville-mosaïque ougandaise." },
        { day: "Jour 4", title: "Route vers Murchison Falls", region: "Murchison Falls", description: "Longue journée de route vers le nord-ouest et le parc de Murchison Falls. Halte au sanctuaire de Ziwa pour une marche d'observation des rhinocéros à pied. Arrivée en fin de journée à votre lodge, premiers cris d'animaux dans la nuit." },
        { day: "Jour 5", title: "Murchison Falls — safari et croisière au pied des chutes", region: "Murchison Falls", description: "Game drive matinal dans la partie nord du parc : girafes de Rothschild, éléphants, lions, kobs. L'après-midi, croisière sur le Nil Victoria jusqu'au pied des chutes — où le fleuve s'engouffre dans une faille de 7 m. Ascension du sommet pour la perspective inverse." },
        { day: "Jour 6", title: "Route vers Kibale — forêt tropicale", region: "Kibale", description: "Traversée du pays vers le sud-ouest, paysages changeants entre savane et collines cultivées. Installation à votre écolodge à Kibale, en lisière de la forêt. Soirée tranquille pour s'imprégner des sons de la jungle." },
        { day: "Jour 7", title: "Kibale — chimpanzee tracking et marais de Bigodi", region: "Kibale", description: "Départ matinal pour la recherche des chimpanzés sauvages dans la canopée de Kibale. Une heure d'observation après une marche variable. L'après-midi, balade ornithologique dans le marais de Bigodi, géré par la communauté locale (200 espèces d'oiseaux, plusieurs primates)." },
        { day: "Jour 8", title: "Route vers Queen Elizabeth", region: "Queen Elizabeth", description: "Courte route vers le parc Queen Elizabeth. Safari de fin de journée sur la péninsule de Mweya, où les éléphants viennent boire au coucher du soleil. Installation à votre lodge avec vue sur le canal de Kazinga." },
        { day: "Jour 9", title: "Queen Elizabeth — canal de Kazinga et Ishasha", region: "Queen Elizabeth", description: "Croisière matinale sur le canal de Kazinga : la plus forte concentration d'hippopotames d'Afrique, buffles, éléphants, oiseaux d'eau. L'après-midi, descente vers la région d'Ishasha — où les lions ont la singularité de grimper aux figuiers. Patience récompensée." },
        { day: "Jour 10", title: "Route vers Bwindi — préparation du trek", region: "Bwindi", description: "Route panoramique à travers les collines verdoyantes du Kigezi vers la forêt impénétrable de Bwindi. Installation à votre lodge en lisière. Briefing du soir avec votre guide. Repos avant le grand jour." },
        { day: "Jour 11", title: "Bwindi — premier trek aux gorilles", region: "Bwindi", description: "Le moment attendu. Briefing au QG des rangers, attribution d'un groupe de gorilles, marche d'1 à 5 h à travers la forêt brumeuse. Une heure d'observation rapprochée — instant qui marque à vie. Retour au lodge, débriefing et soirée tranquille." },
        { day: "Jour 12", title: "Bwindi — second trek (option) ou village Batwa", region: "Bwindi", description: "Pour ceux qui le souhaitent, second trek aux gorilles afin d'augmenter la rencontre (groupe différent, expérience à chaque fois unique). Sinon, immersion auprès de la communauté Batwa, premier peuple de la forêt — découverte des plantes médicinales, danses traditionnelles, échanges sincères." },
        { day: "Jour 13", title: "Lac Bunyonyi — pause au bord du lac", region: "Lac Bunyonyi", description: "Route courte vers le lac Bunyonyi, perle du sud-ouest, l'un des lacs les plus profonds d'Afrique. Cadre serein, vingt-neuf îles, eaux calmes. Détente, kayak, marches autour du lac, dîner face au coucher de soleil — le voyage se referme en douceur." },
        { day: "Jour 14", title: "Vol intérieur pour Entebbe — vol retour", region: "Vol", description: "Vol intérieur depuis Kisoro ou Kihihi vers Entebbe (1 h 30 contre 10 h de route), transfert à l'aéroport international et vol retour. Le pays s'éloigne sous l'aile, les images restent." },
      ]),
    },
    {
      slug: "ouganda-famille-12-jours",
      title: "L'Ouganda en famille",
      duration: "12 jours / 10 nuits",
      level: "Famille",
      priceFrom: "À partir de 5 190 € / personne",
      pitch:
        "Un voyage pensé pour les familles avec adolescents (à partir de 15 ans). Murchison Falls, Kibale, Queen Elizabeth, le trek gorilles à Bwindi — le tout encadré par notre chauffeur-guide francophone, dans des lodges adaptés et un rythme respirable. Imaginons votre Ouganda en famille.",
      coverImg: coverFamille,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Entebbe", region: "Vol", description: "Départ en famille pour l'Ouganda, vol de nuit en direction d'Entebbe. L'aventure commence dans l'avion." },
        { day: "Jour 2", title: "Entebbe — détente au bord du lac Victoria", region: "Entebbe", description: "Accueil par votre chauffeur-guide francophone. Transfert à l'hôtel à Entebbe, premier après-midi de récupération au bord du lac Victoria. Visite possible du sanctuaire des chimpanzés orphelins de l'île de Ngamba en option." },
        { day: "Jour 3", title: "Route vers Murchison Falls — Ziwa Rhino Sanctuary", region: "Ziwa", description: "Direction le nord-ouest. Halte à Ziwa pour une marche en famille à la rencontre des rhinocéros — moment fort, sensibilisation à la conservation. Poursuite vers Murchison." },
        { day: "Jour 4", title: "Murchison Falls — safari et croisière sur le Nil", region: "Murchison Falls", description: "Safari matinal pour observer girafes, éléphants et lions. L'après-midi, croisière en bateau sur le Nil au pied des chutes : hippopotames, crocodiles, oiseaux. Une expérience que les ados n'oublient pas." },
        { day: "Jour 5", title: "Route vers Kibale", region: "Kibale", description: "Traversée du pays vers Kibale. Étapes courtes pour préserver le rythme familial, paysages de collines cultivées et de plantations de thé. Installation à l'écolodge." },
        { day: "Jour 6", title: "Kibale — chimpanzee tracking adapté aux familles", region: "Kibale", description: "Tracking des chimpanzés (autorisé à partir de 12 ans) — observation rapprochée. L'après-midi, balade ornithologique encadrée dans le marais de Bigodi, idéale pour les jeunes." },
        { day: "Jour 7", title: "Route vers Queen Elizabeth — safari", region: "Queen Elizabeth", description: "Cap vers le parc Queen Elizabeth. Safari l'après-midi sur la péninsule de Mweya — éléphants, buffles, antilopes, vues sur le canal de Kazinga." },
        { day: "Jour 8", title: "Queen Elizabeth — canal de Kazinga et Ishasha", region: "Queen Elizabeth", description: "Croisière matinale sur le canal de Kazinga : la plus forte concentration d'hippopotames d'Afrique, parfait pour la photo en famille. L'après-midi, route vers Ishasha pour la quête des lions perchés." },
        { day: "Jour 9", title: "Route vers Bwindi", region: "Bwindi", description: "Route panoramique vers le sud-ouest, à travers les collines du Kigezi. Installation à votre lodge, briefing du soir avec le guide pour préparer le trek." },
        { day: "Jour 10", title: "Bwindi — trek aux gorilles (à partir de 15 ans)", region: "Bwindi", description: "Trek aux gorilles, ouvert aux adolescents à partir de 15 ans. L'expérience qui marque toute une famille — un instant rare, partagé, dont on se souviendra des années." },
        { day: "Jour 11", title: "Lac Bunyonyi — repos au bord de l'eau", region: "Lac Bunyonyi", description: "Pause au lac Bunyonyi : kayak, baignade, dîner familial face au coucher de soleil. Le voyage se referme en douceur, les enfants débriefent les rencontres." },
        { day: "Jour 12", title: "Vol intérieur pour Entebbe — vol retour", region: "Vol", description: "Vol intérieur vers Entebbe, transfert à l'aéroport et vol retour vers la France. Une famille différente que celle de l'aller." },
      ]),
    },
  ],

  regions: [
    {
      name: "Bwindi — la forêt impénétrable",
      img: bwindi,
      description:
        "Classée à l'UNESCO, la forêt de Bwindi abrite près de la moitié des gorilles de montagne encore en vie. Trek d'1 à 5 h pour une heure d'observation rapprochée. L'expérience qui justifie le voyage.",
    },
    {
      name: "Queen Elizabeth — savane et primates",
      img: queenElizabeth,
      description:
        "L'un des plus beaux parcs du pays. Éléphants, buffles, hippopotames, oiseaux rares. La région d'Ishasha, au sud, est mondialement connue pour ses lions grimpeurs perchés dans les figuiers.",
    },
    {
      name: "Murchison Falls",
      img: murchisonFalls,
      description:
        "Le plus grand parc national d'Ouganda. Le Nil Victoria s'engouffre dans une faille de 7 m pour s'effondrer en grondant. Croisière au pied des chutes, safaris dans la savane nord, observation du Bec-en-sabot.",
    },
    {
      name: "Kibale — forêt aux primates",
      img: kibaleForet,
      description:
        "Plus forte densité de primates d'Afrique : 13 espèces de singes dont les chimpanzés sauvages. Tracking en forêt tropicale, marche dans le marais voisin de Bigodi, immersion totale.",
    },
    {
      name: "Sipi Falls et Mont Elgon",
      img: sipiFalls,
      description:
        "L'Ouganda secret, à l'est. Trois cascades à explorer à pied, en VTT ou en rappel. Berceau d'un café arabica d'altitude. Région verdoyante peu fréquentée, idéale en extension.",
    },
    {
      name: "Ziwa Rhino Sanctuary",
      img: ziwaRhino,
      description:
        "Unique sanctuaire de rhinocéros du pays, à mi-chemin entre Kampala et Murchison Falls. Observation à pied avec un guide — rare et impressionnante. Programme de conservation actif.",
    },
  ],

  practical: {
    visa: "Visa requis pour tous les voyageurs (français, belges, suisses, canadiens). Demande possible en ligne (e-Visa Ouganda) avant le départ — comptez 50 USD environ. Passeport valide au moins 6 mois après la date d'entrée. Nous vous accompagnons sur la procédure e-Visa, étape par étape : aucune mauvaise surprise à l'aéroport.",
    health: "Vaccination contre la fièvre jaune obligatoire (carnet international à présenter à l'arrivée). Vaccins recommandés : DTP, hépatites A et B, fièvre typhoïde. Traitement antipaludéen fortement conseillé, surtout pour les zones rurales et les parcs nationaux. Nous vous remettons un carnet santé personnalisé avec les contacts médicaux francophones sur place.",
    money: "Shilling ougandais (UGX). 1 € ≈ 4 100 UGX (variable). Le dollar américain est largement accepté pour les paiements importants (lodges, permis gorilles). Cartes bancaires acceptées dans les lodges et hôtels, peu ailleurs — prévoyez du cash pour les pourboires, marchés et villages.",
    flights: "Pas de vol direct depuis la France. Trajets via Bruxelles (Brussels Airlines), Doha (Qatar Airways), Addis-Abeba (Ethiopian Airlines) ou Istanbul (Turkish Airlines). Comptez 12 à 16 h de trajet total. Nous gérons pour vous l'intégralité de la billetterie internationale dans le cadre de votre devis, en optimisant horaires et escales.",
    timezone: "GMT+3 toute l'année (2 h de plus qu'en France l'hiver, 1 h de plus l'été). Aucun jet-lag majeur — vous êtes opérationnel dès le premier jour.",
    language: "Anglais et swahili (officiels), de nombreuses langues locales (luganda, runyankole...). Notre chauffeur-guide Vianney est francophone, et nous sélectionnons des partenaires parlant français pour les rencontres communautaires.",
    safety: "Pays globalement sûr et accueillant pour les voyageurs encadrés par une agence sérieuse. Précautions classiques en ville (Kampala). Routes en amélioration, mais distances longues — nos véhicules 4×4 sont adaptés. Notre équipe reste joignable 7 j / 7 pendant tout le séjour.",
    tips: "Pourboires usuels : 10-15 USD/jour pour le chauffeur-guide, 10-20 USD pour les rangers du trek gorilles, 5-10 USD/jour pour le staff de lodge. Prévoyez vêtements chauds pour les soirées en altitude (Bwindi, Lac Bunyonyi) et tenues couvrantes pour le trek (manches longues, gants, chaussures de randonnée).",
  },

  faq: [
    {
      q: "Est-ce que l'Ouganda est une destination sûre pour les voyageurs ?",
      a: "Oui, l'Ouganda est une destination globalement sûre pour les voyageurs encadrés par une agence sérieuse. La population est accueillante, et les principales zones touristiques (Bwindi, Queen Elizabeth, Murchison Falls, Kibale) sont stables et bien encadrées. Notre chauffeur-guide francophone vous accompagne en permanence, et nous restons joignables 7 j / 7 pendant tout votre séjour. Discutons-en avec un de nos experts Ouganda.",
    },
    {
      q: "Le voyage est-il encadré ?",
      a: "Oui. Tous nos voyages en Ouganda sont entièrement accompagnés par un chauffeur-guide local francophone (Vianney ou un de ses confrères). Il assure la conduite, la logistique, les explications culturelles et l'accompagnement pendant les activités. Tout est prévu pour que vous voyagiez en toute sérénité, même dans les zones plus reculées du Kaokoland du Kigezi ou du Karamoja. Partagez-nous votre projet, nous vous répondons sous 48 h.",
    },
    {
      q: "Faut-il une bonne condition physique pour voir les gorilles ?",
      a: "L'observation des gorilles en Ouganda implique une randonnée en forêt de 1 à 5 heures, parfois sur un terrain escarpé et glissant. Une bonne forme physique est recommandée, mais les rangers s'adaptent à votre rythme et il est possible de faire appel à des porteurs (10-15 USD), qui peuvent même vous porter sur une chaise pour les personnes ayant des difficultés. Construisons ensemble votre itinéraire idéal.",
    },
    {
      q: "Quelle est la différence entre les niveaux de safari ?",
      a: "Nous avons classifié les safaris par niveau pour que vous sachiez à quoi vous attendre. Niveau 1 (safari d'ambiance) : quelques opportunités d'observation, expérience centrée sur les paysages — Namibie, Afrique du Sud côtière, Ouganda hors gorilles. Niveau 2 (safari équilibré) : safaris bien présents combinés à d'autres expériences — Afrique du Sud (Kruger), Ouganda (avec trek gorilles), Zambie. Niveau 3 (safari intensif) : l'animal au cœur du voyage — Tanzanie, Kenya, Botswana. L'Ouganda est en niveau 2.",
    },
    {
      q: "Peut-on combiner safaris et forêt tropicale ?",
      a: "Absolument — c'est même ce qui rend l'Ouganda unique au monde. On peut voir les Big Five dans les parcs comme Queen Elizabeth ou Murchison Falls, tout en explorant des forêts luxuriantes peuplées de primates (chimpanzés à Kibale, gorilles à Bwindi, colobes en plusieurs sites). Aucune autre destination africaine ne propose une telle diversité d'écosystèmes en un seul voyage. Notre équipe vous accompagne à chaque étape de votre préparation.",
    },
    {
      q: "Quels types d'hébergements trouve-t-on en Ouganda ?",
      a: "Vous séjournerez dans une sélection de lodges, camps de tentes ou écolodges, selon l'itinéraire et la région. L'hébergement est confortable, bien situé, souvent en pleine nature, et sélectionné avec soin pour son accueil et son authenticité. Notre équipe a testé personnellement chaque adresse — du Mahogany Springs en lisière de Bwindi au Kyambura Gorge Lodge à Queen Elizabeth. Un échange suffit pour démarrer.",
    },
    {
      q: "Peut-on voyager en famille en Ouganda ?",
      a: "C'est possible, mais mieux adapté à des enfants de plus de 15 ans, notamment pour les randonnées en forêt et les longues distances. Le trek aux gorilles est strictement réservé aux 15 ans et plus (réglementation officielle). Les safaris et la nature font de ce voyage une aventure marquante pour les adolescents. Nous adaptons l'itinéraire à votre rythme familial. Demandez-nous une proposition personnalisée.",
    },
    {
      q: "Est-ce adapté à un premier voyage en Afrique ?",
      a: "Oui, l'Ouganda est adapté à un premier voyage si vous recherchez une Afrique authentique, sauvage et humaine, loin du tourisme de masse. L'encadrement permanent par notre chauffeur-guide francophone rend l'expérience fluide et rassurante, même pour une première fois. Vous combinez la magie d'une rencontre rare (les gorilles) avec des safaris classiques accessibles. Discutons-en avec un de nos experts Ouganda.",
    },
    {
      q: "Comment se déroule la réservation des permis gorilles ?",
      a: "Les permis gorilles sont strictement limités à 8 personnes par groupe et par jour, à Bwindi. Le coût officiel est de 800 USD par personne (tarif Uganda Wildlife Authority), inclus dans nos devis. Nous réservons vos permis 6 à 9 mois à l'avance pour les périodes hautes saisons (juin-septembre, décembre-février). Plus tôt nous lançons la procédure, plus nous pouvons garantir vos dates et votre groupe. Partagez-nous votre projet : nous prenons le temps de l'étudier en détail.",
    },
    {
      q: "Pourquoi passer par une agence comme La Voyagerie ?",
      a: "Parce que l'Ouganda est un pays exigeant en logistique : réservation des permis gorilles (limités, à anticiper longtemps), coordination des chauffeurs-guides francophones, sélection des lodges, gestion des vols intérieurs vers Bwindi. Nous testons chaque adresse, travaillons en direct avec Vianney et notre équipe sur place, et vous offrons une vraie sécurité du premier contact au retour. Et surtout : on dessine votre voyage sur mesure en Ouganda avec vous, pas pour vous. Un seul interlocuteur, expert de la destination, du devis au retour à la maison.",
    },
  ],

  galleryImgs: [bwindi, queenElizabeth, murchisonFalls, kibaleForet, sipiFalls, ziwaRhino, heroOuganda],

  parallaxBands: {
    afterIntro: queenIshasha,
    afterWhenToGo: sipiPaysage,
    afterRegions: safariExploration,
  },

  pullQuote: {
    text: "L'Ouganda ne se visite pas. Il vous traverse — dans le regard ambré d'un gorille à trois mètres de vous, dans le grondement du Nil aux chutes de Murchison, dans le sourire d'un enfant d'un orphelinat qui vous tend la main pour danser. Un voyage qui change quelque chose, durablement.",
    author: "Notre équipe — agence spécialiste de l'Ouganda",
  },

  ctaBackground: bwindi,
};

// Photo héro principale du pays (utilisée comme img dans destinations.ts)
export const ougandaHero = bwindi;
