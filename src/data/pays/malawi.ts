import type { DetailedPays } from "@/data/destinations";

// === Photos Malawi (Wikimedia Commons — vérifiées) ===
const heroMalawi =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Cape_McLear%2C_Malawi_%282498445835%29.jpg/1920px-Cape_McLear%2C_Malawi_%282498445835%29.jpg"; // Cape Maclear, lac Malawi
const canoesLacMalawi =
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Canoes_on_Lake_Malawi.jpg"; // pirogues sur le lac
const elephantsLiwonde =
  "https://upload.wikimedia.org/wikipedia/commons/9/9e/Elephants_in_Liwonde_National_Park_%28cropped%29.JPG"; // éléphants à Liwonde
const impalasLiwonde =
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Impala%27s_in_Liwonde_National_Park_Malawi.jpg"; // impalas à Liwonde
const shireRiverLiwonde =
  "https://upload.wikimedia.org/wikipedia/commons/d/db/Liwonde_Park_-_view_of_Shire_River.jpg"; // rivière Shire à Liwonde
const mountMulanje =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Mount_Mulanje_%2815695182882%29.jpg/1920px-Mount_Mulanje_%2815695182882%29.jpg"; // Mont Mulanje
const mulanjeMassif =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mulanje_Massif.jpg/1920px-Mulanje_Massif.jpg"; // massif du Mulanje
const nyikaAltopiano =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Altopiano_nyika-malawi.jpg/1920px-Altopiano_nyika-malawi.jpg"; // plateau du Nyika
const nyikaPlateauII =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Nyika_Plateau_II_%2814874700438%29.jpg/1920px-Nyika_Plateau_II_%2814874700438%29.jpg"; // antilopes plateau Nyika
const nyikaForet =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Nyika_afromontane_forest.jpg/1920px-Nyika_afromontane_forest.jpg"; // forêt afromontane Nyika
const majeteElephant =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Elephant_at_Majete_wildlife_reserve.jpg/1920px-Elephant_at_Majete_wildlife_reserve.jpg"; // éléphant Majete
const majeteWildlife =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Majete_wildlife_reserve.jpg/1920px-Majete_wildlife_reserve.jpg"; // Majete
const likomaBeach =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Beach_on_Likoma_Island%2C_Malawi.JPG/1920px-Beach_on_Likoma_Island%2C_Malawi.JPG"; // plage Likoma
const likomaIlala =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Ilala_in_Likoma_Island.jpg/1920px-Ilala_in_Likoma_Island.jpg"; // ferry Ilala à Likoma
const capeMaclearSunset =
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Lake_Malawi_-_Cape_Maclear_-_Thumbi_Island_Sunset.jpg"; // coucher de soleil Thumbi Island
const otterPoint =
  "https://upload.wikimedia.org/wikipedia/commons/8/80/Otter_Point%2C_Cape_Maclear_%28Malawi%29.jpg"; // Otter Point
const zombaPlateau =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/At_the_slopes_of_Zomba_Platea.JPG/1920px-At_the_slopes_of_Zomba_Platea.JPG"; // plateau de Zomba
const zombaPlateauNord =
  "https://upload.wikimedia.org/wikipedia/commons/3/3b/View_of_Zomba_plateau_from_north.JPG"; // Zomba vu du nord
const shireRiverView =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/20171009_143544_view_of_shore_river_malawi.jpg/1920px-20171009_143544_view_of_shore_river_malawi.jpg"; // rivière Shire
const monoxylonBeach =
  "https://upload.wikimedia.org/wikipedia/commons/e/e2/Monoxylon_beach_Lake_Malawi_1557.jpg"; // pirogue traditionnelle lac Malawi

// === Hôtels & lodges (Unsplash, ambiance proche) ===
const lodgeBush =
  "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?auto=format&fit=crop&w=1800&q=80";
const lodgeBeach =
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80";
const lodgeTente =
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1800&q=80";
const lodgePlateau =
  "https://images.unsplash.com/photo-1572979504232-5a9a0a4af0e3?auto=format&fit=crop&w=1800&q=80";
const lodgeIle =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=80";
const lodgeRiviere =
  "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1800&q=80";
const lodgeColonial =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1800&q=80";
const lodgeFamille =
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=80";

// === Pool d'images par région ===
const STEP_POOL_BY_REGION: Record<string, string[]> = {
  Vol: [heroMalawi],
  "Lilongwe": [lodgeColonial, canoesLacMalawi],
  "Liwonde": [elephantsLiwonde, impalasLiwonde, shireRiverLiwonde, lodgeRiviere],
  "Majete": [majeteElephant, majeteWildlife, lodgeBush],
  "Lac Malawi": [heroMalawi, canoesLacMalawi, capeMaclearSunset, monoxylonBeach],
  "Cape Maclear": [heroMalawi, capeMaclearSunset, otterPoint, monoxylonBeach],
  "Likoma": [likomaBeach, likomaIlala, lodgeIle],
  "Mumbo": [otterPoint, likomaBeach, monoxylonBeach],
  "Nyika": [nyikaAltopiano, nyikaPlateauII, nyikaForet, lodgePlateau],
  "Mulanje": [mountMulanje, mulanjeMassif, lodgeBush],
  "Zomba": [zombaPlateau, zombaPlateauNord, lodgePlateau],
  "Shire": [shireRiverView, shireRiverLiwonde, lodgeRiviere],
  "Blantyre": [lodgeColonial, zombaPlateau],
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

export const malawiDetailed: DetailedPays = {
  metaTitle: "Voyage sur mesure Malawi | Lac, Safari & Plateaux | La Voyagerie",
  metaDescription:
    "Voyage sur mesure au Malawi par notre agence spécialiste : safari à Liwonde et Majete, plages du lac Malawi à Cape Maclear et Likoma, trek au Mont Mulanje et plateau du Nyika. Lodges intimes.",

  longIntro: [
    "On l'appelle « the warm heart of Africa », le cœur chaleureux de l'Afrique — et après quelques jours passés ici, on comprend pourquoi. Le Malawi est un petit pays enclavé entre la Tanzanie, la Zambie et le Mozambique, dont le tiers du territoire est occupé par un lac immense, le lac Malawi, troisième plus grand d'Afrique. Sur ses rives, des plages de sable blanc bordent une eau cristalline peuplée des fameux cichlidés multicolores — un aquarium naturel qui fait du Malawi l'un des meilleurs sites de plongée d'eau douce au monde. À l'est, le Mont Mulanje déchire le ciel à 3 002 mètres. Au nord, le plateau du Nyika déroule des prairies d'altitude peuplées d'antilopes et de zèbres. Au sud, les parcs de Liwonde et Majete ont retrouvé leurs big five après des décennies de travail acharné des équipes d'African Parks.",
    "Chez La Voyagerie, agence spécialiste du Malawi, nous concevons chaque circuit sur mesure avec nos partenaires installés à Lilongwe et à Blantyre. Le Malawi n'est pas un pays de safaris spectaculaires comme le Botswana ou la Tanzanie — c'est un pays de paysages variés, de rencontres humaines, de douceur authentique. Idéal en voyage à part entière pour 10 à 14 jours, ou en extension d'un safari en Zambie (frontière commune, accès facile depuis South Luangwa) ou d'un séjour à Zanzibar. Nos itinéraires combinent un parc national, une étape lacustre et un volet trek ou plateau, pour saisir toute la diversité du pays.",
    "Une lune de miel sur l'île de Likoma, dans l'un des plus beaux lodges insulaires d'Afrique. Une famille pour découvrir un safari accessible (pas de fauves dangereux à Liwonde côté hippopotames), des plages sans courant pour les enfants et un peuple parmi les plus accueillants du continent. Un trek exigeant sur le Mulanje, ou des randonnées douces sur le plateau du Nyika. Quel que soit votre projet, nous le construisons à votre rythme, en privilégiant les lodges éco-responsables et les acteurs locaux. Votre Malawi, et rien d'autre. Construisons-le ensemble.",
  ],

  whyVisit: [
    {
      title: "Le lac Malawi à Cape Maclear",
      text: "Cape Maclear est l'un des plus beaux villages de pêcheurs des rives du lac Malawi, classé au patrimoine mondial de l'UNESCO. Eau cristalline à 26 °C, plage de sable blanc, îles à explorer en kayak, plongée parmi des centaines d'espèces de cichlidés endémiques. On y dort dans des lodges les pieds dans l'eau, on y mange du poisson du lac (chambo, kampango) grillé au feu de bois.",
      img: heroMalawi,
    },
    {
      title: "Safari à Liwonde National Park",
      text: "Liwonde est le parc le plus accessible du Malawi, traversé par la rivière Shire (affluent du Zambèze). Concentration exceptionnelle d'éléphants (plus de 600), d'hippopotames et de crocodiles. Lions et léopards réintroduits avec succès par African Parks depuis 2015. Safaris en 4x4, en bateau sur la Shire au coucher du soleil, et à pied avec un ranger — une rareté dans la région.",
      img: elephantsLiwonde,
    },
    {
      title: "L'île de Likoma",
      text: "Une île de 17 km² perdue au milieu du lac Malawi, plus proche du Mozambique que des côtes malawiennes. Plages de sable blanc, eau transparente, une immense cathédrale anglicane construite par les missionnaires au début du XXᵉ siècle, des villages de pêcheurs hors du temps. Le Kaya Mawa, lodge d'exception, est l'un des plus beaux d'Afrique — idéal pour une lune de miel.",
      img: likomaBeach,
    },
    {
      title: "Le plateau du Nyika",
      text: "Au nord du pays, le plateau du Nyika est un haut plateau d'altitude (2 000 à 2 600 m) totalement atypique en Afrique : prairies vallonnées qui rappellent l'Écosse ou les Highlands, troupeaux d'antilopes rouanes, élands, zèbres et léopards. Randonnées à pied, à cheval ou en VTT, atmosphère fraîche et limpide. Une destination rare et confidentielle.",
      img: nyikaAltopiano,
    },
    {
      title: "Le Mont Mulanje",
      text: "Le massif du Mulanje culmine à 3 002 m (Pic Sapitwa) — c'est le toit de l'Afrique australe au sud du Kilimandjaro. Trek de 2 à 5 jours sur les hauts plateaux, refuges de pierre simples, forêts de cèdres endémiques, cascades vertigineuses. Une aventure pour marcheurs expérimentés, accompagnée par les guides du Mountain Club of Malawi.",
      img: mountMulanje,
    },
    {
      title: "Majete Wildlife Reserve — le big five malawien",
      text: "Réserve gérée par African Parks depuis 2003, Majete est l'exemple d'une renaissance écologique réussie : du néant en 2003, les big five (lion, léopard, éléphant, buffle, rhino noir) ont tous été réintroduits. Aujourd'hui c'est un safari intime, dans une réserve peu fréquentée, avec un sentiment d'aventure et de réussite collective rare.",
      img: majeteElephant,
    },
    {
      title: "Plongée et snorkeling dans le lac Malawi",
      text: "Le lac Malawi abrite plus de 1 000 espèces de cichlidés endémiques — c'est le lac le plus poissonneux du monde en termes d'espèces. L'eau est limpide, sans courant, sans danger. Sites de snorkeling spectaculaires à Cape Maclear, Mumbo Island et Likoma. Plusieurs centres de plongée PADI à Cape Maclear pour les baptêmes et les plongées certifiées.",
      img: monoxylonBeach,
    },
    {
      title: "Zomba Plateau et l'ancienne capitale",
      text: "Zomba, ancienne capitale coloniale, est une ville verdoyante dominée par le plateau du même nom (1 800 m). Cascades, points de vue spectaculaires (Emperor's View, Queen's View), randonnées dans des plantations de pins, atmosphère reposante. Une étape charmante entre Lilongwe et le sud.",
      img: zombaPlateau,
    },
    {
      title: "La chaleur du peuple malawien",
      text: "Le Malawi n'a pas le tourisme de masse de ses voisins, et cela se ressent dans l'accueil : les rencontres y sont vraies, les villages chaleureux, les marchés colorés. Pays démocratique, paisible et sûr, c'est l'une des destinations africaines les plus authentiques pour qui veut sortir des sentiers battus sans renoncer au confort.",
      img: canoesLacMalawi,
    },
  ],

  whenToGo: {
    summary:
      "La meilleure période s'étend de mai à octobre — saison sèche, températures agréables (20-28 °C en plaine, plus frais en altitude). Mai à juillet sont les mois les plus frais et confortables ; août à octobre marquent la fin de la saison sèche, idéale pour les safaris (concentration de la faune aux points d'eau). De novembre à avril, c'est la saison des pluies : verte et photogénique, mais avec des averses quotidiennes et des routes parfois difficiles. Décembre-février correspond au pic des pluies — à éviter pour le trek. Le lac Malawi est agréable toute l'année.",
    months: [
      { month: "Jan", recommandation: "deconseille", note: "Pluies intenses, routes difficiles" },
      { month: "Fév", recommandation: "deconseille", note: "Pluies, herbe haute" },
      { month: "Mar", recommandation: "moyenne", note: "Fin de saison des pluies" },
      { month: "Avr", recommandation: "bonne", note: "Paysages verts, peu de touristes" },
      { month: "Mai", recommandation: "ideal", note: "Saison sèche, températures douces" },
      { month: "Juin", recommandation: "ideal", note: "Frais en altitude, parfait safari" },
      { month: "Juil", recommandation: "ideal", note: "Sec, ciel limpide, idéal Nyika" },
      { month: "Août", recommandation: "ideal", note: "Pleine saison, faune aux points d'eau" },
      { month: "Sep", recommandation: "ideal", note: "Chaud, safari exceptionnel" },
      { month: "Oct", recommandation: "ideal", note: "Très chaud en plaine, fin saison sèche" },
      { month: "Nov", recommandation: "moyenne", note: "Premières pluies, fleurs sauvages" },
      { month: "Déc", recommandation: "deconseille", note: "Saison humide installée" },
    ],
  },

  lodges: [
    {
      name: "Kaya Mawa",
      region: "Île de Likoma",
      description:
        "L'un des plus beaux lodges d'Afrique, posé sur la pointe sud de Likoma : 11 villas de pierre et bois ouvertes sur le lac, plage privée, piscine à débordement, cuisine d'exception. Atmosphère insulaire feutrée, ultime étape d'un voyage de noces.",
      highlights: ["Villas pieds dans l'eau", "Plongée et kayak", "Référence honeymoon Afrique"],
      img: lodgeIle,
    },
    {
      name: "Mkulumadzi Lodge",
      region: "Majete Wildlife Reserve",
      description:
        "Lodge éco-responsable au cœur de la réserve de Majete, géré en partenariat avec African Parks. 8 chalets contemporains face à la rivière Shire, safaris 4x4 et bateau, atmosphère intime. Une adresse rare et engagée.",
      highlights: ["Big five Majete", "Architecture contemporaine", "Engagement conservation"],
      img: lodgeBush,
    },
    {
      name: "Mvuu Camp",
      region: "Liwonde National Park",
      description:
        "Camp historique de Liwonde sur les rives de la Shire, géré par Central African Wilderness Safaris. Chalets et tentes-lodges sous canopée, safaris bateau au coucher du soleil, bonne base pour explorer le parc le plus accessible du pays.",
      highlights: ["Bord de Shire", "Safari bateau", "Atmosphère brousse"],
      img: lodgeRiviere,
    },
    {
      name: "Kuthengo Camp",
      region: "Liwonde National Park",
      description:
        "Petit camp mobile (4 tentes) installé sur la Shire, en partenariat avec African Parks. Une expérience safari authentique, intime, à l'écart des grandes infrastructures. Idéal pour les amoureux de brousse.",
      highlights: ["4 tentes seulement", "Safaris à pied", "Authenticité totale"],
      img: lodgeTente,
    },
    {
      name: "Pumulani Lodge",
      region: "Cape Maclear — Lac Malawi",
      description:
        "Lodge perché au-dessus du lac Malawi, dans le parc national, à côté de Cape Maclear. 10 villas-tentes face à l'eau, plage privée, kayaks, snorkeling. L'une des meilleures adresses des rives sud du lac.",
      highlights: ["Vue panoramique lac", "Plage privée", "Snorkeling cichlidés"],
      img: lodgeBeach,
    },
    {
      name: "Chelinda Lodge",
      region: "Nyika National Park",
      description:
        "Lodge en rondins niché à 2 200 m sur le plateau du Nyika, ambiance « pavillon de chasse écossais » en pleine Afrique. Cheminées, randonnées équestres, observation des élands et zèbres. Une adresse hors du temps, fraîche et confidentielle.",
      highlights: ["Plateau d'altitude", "Randonnée à cheval", "Atmosphère unique"],
      img: lodgePlateau,
    },
    {
      name: "Mumbo Island Camp",
      region: "Lac Malawi — Mumbo Island",
      description:
        "Camp éco-responsable sur une petite île déserte au large de Cape Maclear. 7 tentes safari face à l'eau, kayaks, snorkeling, repas autour du feu. Pas d'électricité, totale déconnexion. Une expérience Robinson rare en Afrique.",
      highlights: ["Île privée", "Éco-responsable", "Snorkeling exceptionnel"],
      img: lodgeFamille,
    },
    {
      name: "Latitude 13°",
      region: "Lilongwe",
      description:
        "Boutique-hôtel design au cœur de Lilongwe, idéal pour la première et la dernière nuit. Chambres contemporaines, restaurant gastronomique, piscine. Une étape urbaine de qualité avant ou après la brousse.",
      highlights: ["Boutique-hôtel design", "Centre de Lilongwe", "Étape urbaine"],
      img: lodgeColonial,
    },
  ],

  itineraires: [
    {
      slug: "essentiel-malawi-12-jours",
      title: "Essentiel Malawi",
      duration: "12 jours / 10 nuits",
      level: "Découverte confort",
      priceFrom: "À partir de 4 290 € / personne",
      pitch:
        "L'essentiel du Malawi en un seul voyage : safari à Liwonde, ascension douce du plateau de Zomba, baignade et snorkeling à Cape Maclear, extension sur l'île de Likoma. La combinaison parfaite brousse-lac.",
      coverImg: elephantsLiwonde,
      heroImg: heroMalawi,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Lilongwe", region: "Vol", description: "Départ de France via Addis-Abeba (Ethiopian Airlines) ou Nairobi (Kenya Airways). Arrivée à Lilongwe, accueil par notre représentant, transfert et nuit au Latitude 13°." },
        { day: "Jour 2", title: "Route vers Liwonde", region: "Liwonde", description: "Route panoramique vers le sud (4-5 h) à travers les villages malawiens. Installation au Mvuu Camp en bord de Shire. Premier safari bateau au coucher du soleil : hippopotames, éléphants venus boire, oiseaux." },
        { day: "Jour 3", title: "Safari Liwonde", region: "Liwonde", description: "Safari 4x4 au lever du jour, puis petit-déjeuner en brousse. Repos lodge. Après-midi safari à pied accompagné d'un ranger armé : une rareté en Afrique. Apéritif sundowner sur les berges de la Shire." },
        { day: "Jour 4", title: "Liwonde et route vers Zomba", region: "Zomba", description: "Dernier safari matinal à Liwonde. Route vers Zomba, l'ancienne capitale coloniale (2 h). Ascension du plateau de Zomba, point de vue d'Emperor's View, dîner à la Casa Rossa." },
        { day: "Jour 5", title: "Plateau de Zomba", region: "Zomba", description: "Journée de randonnée sur le plateau : Williams Falls, Chingwe's Hole, plantations de pins. Atmosphère fraîche et reposante, à 1 800 m d'altitude." },
        { day: "Jour 6", title: "Route vers Cape Maclear", region: "Cape Maclear", description: "Route panoramique vers le lac Malawi (3 h). Installation au Pumulani Lodge, perché au-dessus du lac. Première baignade dans une eau à 26 °C, sundowner les pieds dans l'eau." },
        { day: "Jour 7", title: "Cape Maclear et îles", region: "Cape Maclear", description: "Sortie en bateau aux îles Domwe et Thumbi : snorkeling parmi les cichlidés multicolores, déjeuner pique-nique sur une plage déserte. Retour en fin d'après-midi." },
        { day: "Jour 8", title: "Cape Maclear — détente", region: "Cape Maclear", description: "Journée libre : kayak, paddle, plongée (option), visite du village de pêcheurs de Cape Maclear, marché local. Coucher de soleil sur le lac." },
        { day: "Jour 9", title: "Vol pour Likoma", region: "Likoma", description: "Transfert à l'aéroport de Club Makokola, vol charter (1 h) vers Likoma. Installation au Kaya Mawa, l'un des plus beaux lodges d'Afrique. Première nuit sur l'île." },
        { day: "Jour 10", title: "Likoma — l'île au bout du monde", region: "Likoma", description: "Journée libre sur l'île : balade au village de Chipyela et sa cathédrale anglicane (la deuxième plus grande d'Afrique), pêche traditionnelle avec les pêcheurs locaux, snorkeling depuis la plage du lodge." },
        { day: "Jour 11", title: "Likoma — détente puis vol retour", region: "Likoma", description: "Matinée libre. Vol charter retour vers Lilongwe, puis connexion vol international en fin de journée." },
        { day: "Jour 12", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Le cœur chaleureux de l'Afrique vous accompagne encore longtemps." },
      ]),
    },
    {
      slug: "malawi-safari-trek-14-jours",
      title: "Malawi — Safari, Trek & Plateaux",
      duration: "14 jours / 12 nuits",
      level: "Aventure active",
      priceFrom: "À partir de 5 290 € / personne",
      pitch:
        "Pour les marcheurs et amoureux de paysages variés : safaris à Majete et Liwonde, trek de 3 jours sur le Mont Mulanje, randonnées sur le plateau du Nyika, fin reposante sur le lac. Le Malawi dans toute sa diversité.",
      coverImg: mountMulanje,
      heroImg: nyikaAltopiano,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Lilongwe", region: "Vol", description: "Vol international depuis la France, arrivée à Lilongwe, transfert au Latitude 13°." },
        { day: "Jour 2", title: "Vol pour Mzuzu et route Nyika", region: "Nyika", description: "Vol intérieur vers Mzuzu (nord du pays), puis route vers le plateau du Nyika (4 h). Installation au Chelinda Lodge à 2 200 m d'altitude. Atmosphère fraîche, panoramas à 360°." },
        { day: "Jour 3", title: "Plateau du Nyika", region: "Nyika", description: "Randonnée équestre matinale parmi les troupeaux d'élands et de zèbres. Pique-nique en altitude. Après-midi 4x4 à la recherche des léopards et des servals. Feu de cheminée le soir." },
        { day: "Jour 4", title: "Nyika et route vers le lac", region: "Lac Malawi", description: "Dernière randonnée matinale. Descente vers les rives nord du lac Malawi, route panoramique (5 h). Nuit en lodge intime face au lac." },
        { day: "Jour 5", title: "Vol vers Blantyre et Majete", region: "Majete", description: "Vol vers Blantyre, transfert vers Majete (2 h). Installation au Mkulumadzi Lodge. Premier safari à la rencontre des big five réintroduits." },
        { day: "Jour 6", title: "Safari Majete", region: "Majete", description: "Safari matinal et après-midi : éléphants, buffles, rhinos noirs (si chance), zèbres, antilopes sable. Sundowner sur la Shire." },
        { day: "Jour 7", title: "Route vers Mulanje", region: "Mulanje", description: "Route vers le pied du Mont Mulanje (2 h). Installation dans une lodge en bord de plantations de thé. Préparation du trek avec votre guide local du Mountain Club of Malawi." },
        { day: "Jour 8", title: "Mulanje — montée à Chambe Hut", region: "Mulanje", description: "Trek d'une journée pour rejoindre Chambe Hut (refuge de pierre simple) à 2 100 m. 5 h de marche dans la forêt de cèdres endémiques. Nuit en refuge avec porteur." },
        { day: "Jour 9", title: "Mulanje — traversée vers Lichenya Hut", region: "Mulanje", description: "Traversée du plateau du Mulanje : prairies d'altitude, cascades, panoramas spectaculaires sur le Mozambique. 6 h de marche, niveau soutenu. Nuit à Lichenya Hut." },
        { day: "Jour 10", title: "Mulanje — descente", region: "Mulanje", description: "Descente par le sentier de Lichenya jusqu'à Likhubula (4 h). Repas et douche bien mérités dans la lodge. Repos en après-midi." },
        { day: "Jour 11", title: "Route vers Cape Maclear", region: "Cape Maclear", description: "Route vers le lac Malawi (5 h). Installation au Pumulani Lodge. Repos sur la plage, baignade dans une eau cristalline." },
        { day: "Jour 12", title: "Cape Maclear — îles", region: "Cape Maclear", description: "Excursion en bateau aux îles Mumbo et Domwe. Snorkeling parmi les cichlidés, déjeuner sur la plage, kayak." },
        { day: "Jour 13", title: "Route Lilongwe et vol retour", region: "Vol", description: "Route vers Lilongwe (3 h). Vol international en soirée." },
        { day: "Jour 14", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris, des paysages plein la tête et les jambes solides." },
      ]),
    },
    {
      slug: "malawi-famille-11-jours",
      title: "Malawi en famille",
      duration: "11 jours / 9 nuits",
      level: "Famille (enfants 6 ans et +)",
      priceFrom: "À partir de 3 990 € / personne",
      pitch:
        "Un Malawi à hauteur d'enfant : safari accessible à Liwonde (éléphants depuis le bateau, sans danger), plages sécurisées du lac Malawi, snorkeling parmi les poissons multicolores, rencontres dans les villages. Une initiation parfaite à l'Afrique en famille.",
      coverImg: shireRiverLiwonde,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Lilongwe", region: "Vol", description: "Vol international vers Lilongwe via Addis-Abeba ou Nairobi. Arrivée, transfert au Latitude 13°, nuit reposante." },
        { day: "Jour 2", title: "Route vers Liwonde", region: "Liwonde", description: "Route panoramique vers le sud (4-5 h) avec pauses dans les villages. Installation au Mvuu Camp. Sortie bateau en fin d'après-midi : hippopotames et éléphants au coucher du soleil — émerveillement assuré pour les enfants." },
        { day: "Jour 3", title: "Safari Liwonde", region: "Liwonde", description: "Safari 4x4 matinal accompagné d'un guide patient avec les enfants. Repos et piscine en milieu de journée. Safari bateau l'après-midi : approche calme des hippopotames, idéal pour les plus jeunes." },
        { day: "Jour 4", title: "Liwonde — dernière matinée", region: "Liwonde", description: "Dernier safari bateau au lever du jour. Route vers Cape Maclear l'après-midi (4 h). Installation au Pumulani Lodge ou en lodge familial bord de lac." },
        { day: "Jour 5", title: "Cape Maclear — découverte", region: "Cape Maclear", description: "Journée détente et découverte : baignade dans l'eau cristalline, snorkeling depuis la plage (les enfants adorent les cichlidés colorés), kayak en double avec les parents." },
        { day: "Jour 6", title: "Excursion îles et snorkeling", region: "Cape Maclear", description: "Sortie bateau aux îles Domwe et Thumbi : snorkeling encadré pour toute la famille (équipement adapté aux enfants), déjeuner pique-nique sur une plage déserte. Approche des aigles pêcheurs." },
        { day: "Jour 7", title: "Visite du village", region: "Cape Maclear", description: "Matinée au village de Cape Maclear : marché aux poissons, démonstration de pêche traditionnelle, rencontre avec une école locale (avec respect et préparation). Après-midi piscine et plage." },
        { day: "Jour 8", title: "Cape Maclear — détente", region: "Cape Maclear", description: "Journée libre à votre rythme : paddle, baptême de plongée pour les ados, balade au lever du soleil, ou simple farniente sur le sable." },
        { day: "Jour 9", title: "Route vers Lilongwe", region: "Lilongwe", description: "Route vers Lilongwe (3 h) avec arrêt à la réserve de Kuti pour une dernière approche de la faune (girafes, zèbres, antilopes — sans danger). Nuit à Lilongwe." },
        { day: "Jour 10", title: "Vol retour", region: "Vol", description: "Visite des ateliers d'artisanat de Lilongwe, déjeuner au Four Seasons. Vol international en soirée." },
        { day: "Jour 11", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Les enfants se souviendront longtemps des hippopotames et des poissons-arc-en-ciel." },
      ]),
    },
  ],

  regions: [
    {
      name: "Liwonde — le safari accessible",
      img: elephantsLiwonde,
      description:
        "Le parc le plus accessible du Malawi, traversé par la rivière Shire. Concentration exceptionnelle d'éléphants et d'hippopotames, lions et léopards réintroduits par African Parks. Safaris 4x4, bateau et à pied.",
    },
    {
      name: "Majete — la renaissance",
      img: majeteElephant,
      description:
        "Réserve restaurée par African Parks depuis 2003, les big five y ont tous été réintroduits. Une réserve confidentielle, peu fréquentée, où chaque rencontre a un goût particulier.",
    },
    {
      name: "Lac Malawi & Cape Maclear",
      img: heroMalawi,
      description:
        "Troisième plus grand lac d'Afrique, UNESCO. Plages de sable blanc, eau cristalline à 26 °C, plongée parmi des centaines d'espèces de cichlidés endémiques. Cape Maclear est le village historique de la rive sud.",
    },
    {
      name: "Île de Likoma",
      img: likomaBeach,
      description:
        "17 km² perdus au milieu du lac, plus proche du Mozambique que du Malawi continental. Plages désertes, cathédrale anglicane spectaculaire, lodge Kaya Mawa — une retraite ultime.",
    },
    {
      name: "Plateau du Nyika",
      img: nyikaAltopiano,
      description:
        "Plateau d'altitude (2 000-2 600 m) au nord du pays, paysages de prairies vallonnées atypiques en Afrique. Antilopes rouanes, zèbres, élands, léopards. Randonnée à pied, à cheval ou en VTT.",
    },
    {
      name: "Mont Mulanje",
      img: mountMulanje,
      description:
        "Massif culminant à 3 002 m, toit de l'Afrique australe au sud du Kilimandjaro. Trek de 2 à 5 jours, refuges de pierre, forêts de cèdres endémiques. Une aventure pour marcheurs expérimentés.",
    },
    {
      name: "Plateau de Zomba",
      img: zombaPlateau,
      description:
        "Ancienne capitale coloniale, dominée par un plateau verdoyant à 1 800 m. Cascades, points de vue, plantations de pins. Une étape fraîche et reposante entre Lilongwe et le sud.",
    },
  ],

  practical: {
    visa:
      "Visa obligatoire pour les ressortissants français. Possibilité d'obtention en ligne (e-visa) avant le départ via le site officiel evisa.gov.mw — comptez 75 USD pour un visa simple entrée, validité 90 jours. Passeport valide 6 mois après la date d'entrée, deux pages vierges minimum. Pour les enfants mineurs voyageant sans un parent, autorisation de sortie de territoire à fournir.",
    health:
      "Vaccin contre la fièvre jaune obligatoire si vous arrivez d'une zone à risque. Vaccins recommandés : DTP, hépatites A et B, fièvre typhoïde. Traitement antipaludéen indispensable (Malarone recommandé). Eau du robinet à éviter, préférez l'eau en bouteille. Système de santé limité hors Lilongwe et Blantyre — assurance rapatriement vivement recommandée. Évitez la baignade dans la rivière Shire (bilharziose).",
    money:
      "Kwacha malawien (MWK). 1 € ≈ 1 750 MWK (taux variable). Les dollars US sont largement acceptés dans les lodges et pour les visas — prévoyez des billets neufs (postérieurs à 2013). Cartes bancaires acceptées dans les hôtels haut de gamme à Lilongwe et Blantyre, mais espèces indispensables pour le reste. Distributeurs présents dans les grandes villes.",
    flights:
      "Pas de vol direct depuis la France. Connexions via Addis-Abeba (Ethiopian Airlines), Nairobi (Kenya Airways) ou Johannesburg (South African Airways). Comptez 14 à 18 h de vol au total. Arrivée à Lilongwe (KIA) ou Blantyre (BLZ). Vols intérieurs limités (Ulendo Airlink) entre Lilongwe, Likoma et certains lodges — réservation à l'avance impérative.",
    timezone:
      "GMT+2. 1 h de plus qu'en France en hiver, même heure en été. Décalage minimal, idéal pour limiter la fatigue.",
    language:
      "Anglais (langue officielle) et chichewa (langue nationale, parlée par la majorité). Le français est rarement parlé hors des lodges haut de gamme et de quelques guides spécialisés — nos partenaires locaux fournissent des guides francophones sur demande.",
    safety:
      "Le Malawi est l'un des pays les plus sûrs d'Afrique australe — pays démocratique, paisible, sans conflit. Précautions usuelles dans les centres-villes de Lilongwe et Blantyre la nuit. Aucune zone à éviter sur le territoire. Idéal pour un premier voyage en Afrique subsaharienne.",
    tips:
      "Pourboires bienvenus (5-10 USD/jour pour les guides safari, 2-3 USD pour les chauffeurs). Tenue décontractée mais respectueuse dans les villages (épaules et genoux couverts pour les femmes). Crème solaire et chapeau indispensables. Adaptateur prise UK (3 broches). Goûtez le nsima (purée de maïs, plat national), le chambo (poisson du lac grillé) et la bière Carlsberg locale (brassée à Blantyre depuis 1968).",
  },

  faq: [
    {
      q: "Quelle est la meilleure période pour voyager au Malawi ?",
      a: "De mai à octobre : saison sèche, températures agréables, idéale pour les safaris et le trek. Mai à juillet sont les mois les plus frais ; août à octobre offrent les meilleurs safaris (concentration de la faune aux points d'eau). Évitez décembre à février (pluies intenses).",
    },
    {
      q: "Le Malawi est-il une bonne destination safari ?",
      a: "Le Malawi n'a pas la spectacularité du Botswana ou de la Tanzanie, mais Liwonde et Majete offrent désormais d'excellents safaris grâce au travail d'African Parks (réintroduction des big five). C'est un safari plus intime, moins fréquenté, parfait en complément d'un safari classique en Zambie ou en Tanzanie.",
    },
    {
      q: "Peut-on combiner le Malawi avec un autre pays ?",
      a: "Oui, c'est même fréquent. Combinaisons classiques : Malawi + Zambie (South Luangwa accessible par la route), Malawi + Tanzanie (vol depuis Lilongwe), Malawi + Zanzibar (extension plage), Malawi + Mozambique (frontière au sud).",
    },
    {
      q: "Le Malawi est-il adapté aux familles ?",
      a: "Oui, c'est une excellente première destination africaine en famille : peuple très accueillant, faible décalage horaire, safari accessible à Liwonde (hippopotames depuis le bateau, sans danger), lac Malawi sans courant ni requins, eau chaude. Recommandé à partir de 6 ans.",
    },
    {
      q: "Quel budget prévoir pour un voyage sur mesure au Malawi ?",
      a: "Comptez entre 4 000 et 6 000 € par personne pour un circuit de 12-14 jours avec vols internationaux, lodges intimes, transferts et activités. Plus haut pour les lodges signature (Kaya Mawa, Mkulumadzi) et les vols charters vers Likoma.",
    },
    {
      q: "Y a-t-il du paludisme au Malawi ?",
      a: "Oui, le paludisme est présent dans tout le pays toute l'année. Traitement antipaludéen indispensable (Malarone recommandé pour son bon profil de tolérance). Répulsif anti-moustiques DEET 50 % et vêtements longs en soirée. Risque très réduit en altitude (Nyika, Zomba, Mulanje).",
    },
    {
      q: "Peut-on plonger dans le lac Malawi ?",
      a: "Oui, c'est même l'un des meilleurs sites de plongée d'eau douce au monde. Eau cristalline (visibilité 15-30 m), pas de courant, plus de 1 000 espèces de cichlidés endémiques. Centres PADI à Cape Maclear pour baptêmes et certifications. Le snorkeling est tout aussi spectaculaire.",
    },
    {
      q: "Quels sont les vols pour le Malawi ?",
      a: "Pas de vol direct depuis la France. Les meilleures connexions passent par Addis-Abeba (Ethiopian Airlines, recommandée), Nairobi (Kenya Airways) ou Johannesburg (South African Airways). Comptez 14 à 18 h de vol au total. Arrivée à Lilongwe (KIA) ou Blantyre.",
    },
    {
      q: "Le Mont Mulanje est-il accessible à tous ?",
      a: "Le trek du Mulanje nécessite une bonne condition physique (5-7 h de marche par jour, dénivelé important). Les refuges sont rustiques (pierre, dortoirs, eau froide). Recommandé aux marcheurs expérimentés. Trek de 2 à 5 jours selon l'itinéraire. Guides et porteurs obligatoires (via le Mountain Club of Malawi).",
    },
    {
      q: "Pourquoi passer par une agence pour le Malawi ?",
      a: "Parce que la logistique est subtile (vols intérieurs limités, routes parfois difficiles, vols charters vers Likoma), que les meilleurs lodges se réservent longtemps à l'avance et qu'il faut connaître les guides francophones pour bien préparer chaque étape. Notre équipe a testé le pays et travaille en direct avec nos partenaires malawiens.",
    },
  ],

  galleryImgs: [heroMalawi, elephantsLiwonde, mountMulanje, nyikaAltopiano, likomaBeach, zombaPlateau, capeMaclearSunset],

  parallaxBands: {
    afterIntro: heroMalawi,
    afterWhenToGo: nyikaAltopiano,
    afterRegions: shireRiverLiwonde,
  },

  pullQuote: {
    text: "Le Malawi ne crie jamais — il chuchote. La douceur des rives du lac, le silence des plateaux du Nyika, la chaleur d'un sourire dans un village : ce pays se reçoit comme une confidence. « The warm heart of Africa », vraiment.",
    author: "Notre équipe spécialiste Malawi",
  },

  ctaBackground: heroMalawi,
};

export const malawiHero = heroMalawi;
