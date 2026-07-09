import type { DetailedPays } from "@/data/destinations";

// === Photos Botswana ===
// Lodges officiels + Unsplash/Pexels haute qualité (libres de droit)

const heroBotswana =
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=80"; // delta vu d'en haut
const okavangoDelta =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=80"; // delta okavango
const mokoroPirogue =
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1800&q=80"; // mokoro
const chobeElephants =
  "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?auto=format&fit=crop&w=1800&q=80"; // éléphants
const chobeRiver =
  "https://images.unsplash.com/photo-1525382455947-f319bc05fb35?auto=format&fit=crop&w=1800&q=80"; // safari bateau
const moremiSafari =
  "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1800&q=80"; // léopard
const moremiLeopard =
  "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1800&q=80";
const kalahariDesert =
  "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1800&q=80"; // désert
const makgadikgadiPan =
  "https://images.unsplash.com/photo-1573160813959-df05c1b1e5f4?auto=format&fit=crop&w=1800&q=80"; // pan salins
const sanBushmen =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=80";
const linyantiWild =
  "https://images.unsplash.com/photo-1549366021-9f761d040a94?auto=format&fit=crop&w=1800&q=80"; // lycaons / brousse
const lodgeBush =
  "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?auto=format&fit=crop&w=1800&q=80";
const sundownerSavane =
  "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1800&q=80"; // sunset savane

// === Lodges (URLs officielles, fallback Unsplash si besoin) ===
const lodgeMombo =
  "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1800&q=80";
const lodgeJaoCamp =
  "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=1800&q=80";
const lodgeBelmondEagle =
  "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&w=1800&q=80";
const lodgeSavute =
  "https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=1800&q=80";
const lodgeKwando =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=80";
const lodgeSanctuary =
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1800&q=80";
const lodgeJackBerry =
  "https://images.unsplash.com/photo-1602604851283-eb2e2bbe0d99?auto=format&fit=crop&w=1800&q=80";
const lodgeSanCamp =
  "https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=1800&q=80";

// === Pool par région ===
const STEP_POOL_BY_REGION: Record<string, string[]> = {
  Vol: [heroBotswana],
  Maun: [heroBotswana, lodgeBush],
  Kasane: [chobeRiver, chobeElephants],
  Okavango: [okavangoDelta, mokoroPirogue, lodgeJaoCamp],
  Moremi: [moremiSafari, moremiLeopard, lodgeMombo],
  Chobe: [chobeElephants, chobeRiver, lodgeBelmondEagle],
  Linyanti: [linyantiWild, lodgeSavute],
  Savuti: [linyantiWild, lodgeSavute, sundownerSavane],
  Kalahari: [kalahariDesert, sanBushmen, lodgeKwando],
  Makgadikgadi: [makgadikgadiPan, lodgeSanCamp],
  "Chutes Victoria": [chobeRiver, sundownerSavane],
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

export const botswanaDetailed: DetailedPays = {
  metaTitle: "Voyage sur mesure Botswana | Safari Okavango, Chobe & Lodges | La Voyagerie",
  metaDescription:
    "Safari de luxe sur mesure au Botswana par notre agence spécialiste : delta de l'Okavango en mokoro, éléphants du Chobe, Kalahari et peuple San. Lodges écoresponsables, low-volume high-value.",

  longIntro: [
    "Le bruit d'une pagaie qui fend l'eau, le souffle d'un éléphant à quelques mètres, le craquement d'un roseau sous le pied d'un hippopotame. Au Botswana, la nature règne en majesté. Ici, on ne traverse pas un pays — on entre dans un sanctuaire. Les méandres scintillants du delta de l'Okavango, miracle d'eau au cœur du Kalahari, les rives du Chobe où les troupeaux d'éléphants se rassemblent par centaines au coucher du soleil, les plaines infinies des pans de Makgadikgadi, vestiges d'un ancien lac préhistorique. Le Botswana est l'Afrique des grands espaces préservés, là où la faune est encore reine.",
    "Chez La Voyagerie, agence spécialiste du Botswana, nous concevons chaque safari sur mesure avec notre experte locale Laurie, installée à Cape Town, et nos partenaires triés sur le volet. Le Botswana a fait un choix fort : protéger sa nature par une politique low-volume, high-value. Camps intimes (rarement plus de 12 tentes), survols en avion de brousse entre les concessions, rangers et pisteurs d'exception. Tous nos itinéraires sont testés. Mokoro dans le delta, safari en 4x4 dans Moremi, croisière sur le Chobe, rencontre avec les San dans le Kalahari : chaque étape a une raison d'être, chaque lodge une âme.",
    "Une lune de miel en camp privé sur une île de l'Okavango. Une famille (avec enfants ados) pour une première immersion en pleine brousse. Trois semaines à combiner Botswana, Chutes Victoria et Namibie pour le voyage d'une vie en Afrique australe. Quel que soit votre projet, nous le composons à votre rythme. Aucun groupe imposé, aucun lodge standardisé. Votre Botswana, et rien d'autre. Construisons-le ensemble.",
  ],

  whyVisit: [
    {
      title: "Le delta de l'Okavango en mokoro",
      text: "L'expérience signature du Botswana. Unique au monde, le delta de l'Okavango est un delta intérieur qui ne se jette pas dans la mer, mais s'évapore dans le désert du Kalahari. Glisser en mokoro (pirogue traditionnelle) au milieu des nénuphars, pagayé par un poler local qui connaît chaque chenal, hippopotames qui soufflent à proximité, oiseaux multicolores au-dessus. Une heure suspendue, le silence absolu.",
      img: mokoroPirogue,
    },
    {
      title: "Les éléphants du Chobe",
      text: "La plus forte concentration d'éléphants d'Afrique : plus de 100 000 individus dans le parc national de Chobe. Au coucher du soleil, les troupeaux descendent boire sur les rives du fleuve, par centaines. Safari en bateau pour les observer depuis l'eau, à quelques mètres. Un spectacle naturel que peu de destinations au monde peuvent offrir.",
      img: chobeElephants,
    },
    {
      title: "La réserve de Moremi — léopards et lycaons",
      text: "Au cœur du delta, Moremi est l'une des plus belles réserves d'Afrique. Léopards furtifs dans les jackalberries, lycaons en meute (espèce parmi les plus menacées au monde), grands troupeaux de buffles, antilopes rares. Safari en 4x4 ouvert avec ranger dédié, dans un cadre d'une beauté brute.",
      img: moremiLeopard,
    },
    {
      title: "Le désert du Kalahari et le peuple San",
      text: "Le Kalahari est le berceau d'un peuple fascinant : les San, ou Bushmen, premiers habitants de l'Afrique australe. Partir à leur rencontre, c'est remonter le fil de l'histoire humaine. Marche guidée à travers la brousse, apprentissage des plantes médicinales, allumage du feu, contes au coin du brasier. Une expérience humaine rare et respectueuse.",
      img: sanBushmen,
    },
    {
      title: "Les pans salés de Makgadikgadi",
      text: "Un paysage blanc et infini, comme une mer immobile. Vestiges d'un ancien lac préhistorique, les pans salés de Makgadikgadi forment l'un des plus grands complexes salins au monde. Quad sur la croûte saline, nuit à la belle étoile au cœur du néant, rencontre avec les colonies de suricates habituées à la présence humaine. Surréaliste.",
      img: makgadikgadiPan,
    },
    {
      title: "La réserve confidentielle de Linyanti",
      text: "Concession privée frontalière du Chobe et de la Namibie, Linyanti est l'une des zones les moins fréquentées et les plus riches en faune. Lycaons en pleine chasse, lions du Savuti réputés pour leur chasse à l'éléphant, hyènes, hippopotames. Camps intimes (8 à 12 tentes), exclusivité totale dans la concession.",
      img: linyantiWild,
    },
    {
      title: "Les safaris à pied et de nuit",
      text: "Le Botswana est l'un des rares pays africains à autoriser les safaris à pied et de nuit dans les concessions privées. Tracking au sol avec un pisteur San, lecture des empreintes, approche silencieuse de la faune. La nuit, projecteur rouge pour observer hyènes, civettes, génettes — un autre Botswana se révèle après le coucher du soleil.",
      img: sundownerSavane,
    },
    {
      title: "Le modèle low-volume, high-value",
      text: "Le Botswana a fait le pari de protéger ses réserves par le prix et la rareté. Les concessions privées limitent strictement le nombre de véhicules par parcelle. Résultat : pas de file de 4x4 autour d'un lion, pas de foule. Chaque safari est exclusif, chaque rencontre intime. Un modèle de tourisme responsable que peu de pays ont osé.",
      img: lodgeBush,
    },
    {
      title: "Les Tsodilo Hills — Louvre du désert",
      text: "Au nord-ouest du pays, les Tsodilo Hills (inscrites à l'UNESCO) abritent plus de 4 500 peintures rupestres laissées par les San il y a des milliers d'années. Surnommées le « Louvre du désert », ces collines de quartzite sont un lieu spirituel intense. Randonnée guidée à la rencontre d'un patrimoine humain millénaire.",
      img: kalahariDesert,
    },
  ],

  whenToGo: {
    summary:
      "La meilleure saison pour un safari au Botswana est la saison sèche, d'avril à octobre. Bien qu'on la nomme « sèche », c'est en réalité la période de crue de l'Okavango : l'eau, provenant des hauts plateaux d'Angola, atteint son pic entre juin et août, transformant les plaines en zones de chasse pour la faune. La végétation clairsemée et la concentration des animaux autour des eaux permanentes (Okavango, Chobe) facilitent les observations. C'est aussi le moment idéal pour les excursions en mokoro et en bateau. De novembre à mars, c'est la saison verte : paysages luxuriants, observation exceptionnelle des oiseaux migrateurs (flamants, ibis), migration des zèbres du Chobe vers Nxai Pan entre décembre et mars. Une autre facette, plus secrète et plus verte, du Botswana.",
    months: [
      { month: "Jan", recommandation: "moyenne", note: "Saison verte, ornithologie" },
      { month: "Fév", recommandation: "moyenne", note: "Saison verte, paysages luxuriants" },
      { month: "Mar", recommandation: "bonne", note: "Fin saison verte, migrations zèbres" },
      { month: "Avr", recommandation: "ideal", note: "Début saison sèche, conditions idéales" },
      { month: "Mai", recommandation: "ideal", note: "Sec, température douce" },
      { month: "Juin", recommandation: "ideal", note: "Crue Okavango, mokoro parfait" },
      { month: "Juil", recommandation: "ideal", note: "Pic de crue, observations exceptionnelles" },
      { month: "Août", recommandation: "ideal", note: "Pic safari, faune concentrée" },
      { month: "Sep", recommandation: "ideal", note: "Sec, Chobe spectaculaire" },
      { month: "Oct", recommandation: "ideal", note: "Fin saison sèche, chaleur" },
      { month: "Nov", recommandation: "bonne", note: "Début pluies, oiseaux migrateurs" },
      { month: "Déc", recommandation: "moyenne", note: "Saison verte, pluies fréquentes" },
    ],
  },

  lodges: [
    {
      name: "Mombo Camp",
      region: "Moremi — île de Mombo",
      description:
        "Considéré comme l'un des meilleurs lodges au monde par les classements internationaux. Neuf tentes-suites de luxe au cœur de la concession de Mombo, au nord du delta. Densité de faune exceptionnelle (léopards, lions, lycaons), service signature Wilderness Safaris, engagement de conservation fort.",
      highlights: ["Top 10 lodges au monde", "Densité de faune exceptionnelle", "Engagement conservation"],
      img: lodgeMombo,
    },
    {
      name: "Jao Camp",
      region: "Okavango — concession Jao",
      description:
        "Lodge mythique perché sur des plateformes en bois au cœur du delta. Cinq suites contemporaines, chacune avec piscine privée, vue sur les plaines inondées. Mokoro, safari en bateau, marche à pied : l'essence même de l'Okavango.",
      highlights: ["Suites avec piscine privée", "Cœur du delta", "Mokoro et bateau"],
      img: lodgeJaoCamp,
    },
    {
      name: "Belmond Eagle Island Lodge",
      region: "Okavango — île aux aigles",
      description:
        "Camp Belmond niché sur une île privée du delta, parmi les figuiers géants. Douze tentes raffinées face à l'eau, spa, piscine à débordement, hélicoptère pour survols panoramiques de l'Okavango. Une adresse glamour au cœur du sauvage.",
      highlights: ["Survol hélico de l'Okavango", "Spa au cœur du delta", "Belmond signature"],
      img: lodgeBelmondEagle,
    },
    {
      name: "Savute Safari Lodge",
      region: "Chobe — concession Savuti",
      description:
        "Sur les rives du chenal Savuti, dans le parc national de Chobe. Douze chalets surélevés face au cours d'eau, observation des éléphants et lions célèbres de Savuti depuis la terrasse. Idéal pour observer la chasse des lions sur les jeunes éléphants — phénomène unique.",
      highlights: ["Lions célèbres de Savuti", "Éléphants depuis la terrasse", "Concession Chobe"],
      img: lodgeSavute,
    },
    {
      name: "Kwando Lagoon Camp",
      region: "Linyanti — concession Kwando",
      description:
        "Camp intime de huit tentes sur la rivière Kwando, dans une concession privée frontalière de la Namibie. Excellents guides, safaris à pied et de nuit, exclusivité totale (peu de véhicules dans la concession). Réputé pour les rencontres avec les lycaons.",
      highlights: ["Concession privée exclusive", "Safari à pied et de nuit", "Lycaons"],
      img: lodgeKwando,
    },
    {
      name: "Sanctuary Chief's Camp",
      region: "Moremi — Mombo Concession",
      description:
        "Lodge luxueux sur l'île de Chief's, au cœur de la réserve de Moremi. Dix tentes-suites avec piscine privée, restaurant gastronomique, spa. Une des meilleures bases pour explorer le delta sec et les plaines inondées, avec un guide attitré.",
      highlights: ["Cœur de Moremi", "Suites avec piscine", "Guide attitré"],
      img: lodgeSanctuary,
    },
    {
      name: "Jack's Camp",
      region: "Makgadikgadi — pans salés",
      description:
        "Camp emblématique du Botswana, sur le bord du Makgadikgadi Pan. Tentes en toile inspirées des camps des explorateurs des années 40, mobilier d'époque, bibliothèque-cabinet de curiosités. Quad sur les pans, rencontre avec les suricates, marche avec les San.",
      highlights: ["Suricates familiers", "Quad sur les pans", "Atmosphère explorateur 1940"],
      img: lodgeJackBerry,
    },
    {
      name: "San Camp",
      region: "Makgadikgadi — pans salés",
      description:
        "Camp saisonnier (avril-octobre) sur les pans de Makgadikgadi, sœur du Jack's Camp. Six tentes blanches plantées en plein désert, vue à 360° sur la mer de sel. Soirées à la belle étoile au cœur du néant, nuit la plus silencieuse de votre vie.",
      highlights: ["Camp saisonnier", "Nuit à la belle étoile", "Vue 360° sur les pans"],
      img: lodgeSanCamp,
    },
  ],

  itineraires: [
    {
      slug: "essentiel-botswana-10-jours",
      title: "Essentiel Botswana",
      duration: "10 jours / 8 nuits",
      level: "Safari intensif (niveau 3)",
      priceFrom: "À partir de 7 890 € / personne",
      pitch:
        "Le cœur du Botswana en huit nuits : delta de l'Okavango, réserve de Moremi, parc national de Chobe. Trois écosystèmes, trois ambiances, trois lodges intimes. Vols en avion de brousse entre chaque étape pour optimiser le temps de safari. Le concentré du meilleur safari au monde.",
      coverImg: okavangoDelta,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Johannesburg", region: "Vol", description: "Départ de France. Vol de nuit vers Johannesburg, porte d'entrée habituelle pour le Botswana. Escale possible selon la compagnie." },
        { day: "Jour 2", title: "Vol vers Maun et transfert dans l'Okavango", region: "Maun", description: "Arrivée à Johannesburg, connexion vers Maun, capitale des safaris. Accueil à l'aéroport, puis vol en avion de brousse vers votre premier camp dans le delta de l'Okavango. Premier sundowner au bord de l'eau." },
        { day: "Jour 3", title: "Okavango — mokoro et marche à pied", region: "Okavango", description: "Journée immersion totale dans le delta. Matinée en mokoro pagayé par un poler local, glisse silencieuse parmi les nénuphars et les hippopotames. Après-midi : safari à pied avec un guide, à la rencontre de la faune au sol." },
        { day: "Jour 4", title: "Okavango — game drive et coucher de soleil", region: "Okavango", description: "Safari en 4x4 ouvert dans les plaines inondées du delta. Léopards, lions, éléphants, troupeaux d'antilopes. Sundowner au cœur de la brousse, dîner sous les étoiles." },
        { day: "Jour 5", title: "Vol vers Moremi", region: "Moremi", description: "Vol en avion de brousse vers la réserve de Moremi, l'une des plus riches d'Afrique. Installation au camp, première game drive de l'après-midi. Possibilité d'observer les lycaons (espèce parmi les plus menacées au monde)." },
        { day: "Jour 6", title: "Moremi — safari complet", region: "Moremi", description: "Journée rythmée par deux safaris : départ avant l'aube avec petit-déjeuner bush, retour en fin de matinée, sortie en fin d'après-midi avec sundowner. Léopards dans les jackalberries, troupeaux de buffles, oiseaux rares." },
        { day: "Jour 7", title: "Vol vers le Chobe", region: "Chobe", description: "Vol vers Kasane, capitale du Chobe. Transfert au lodge en bord de fleuve. Premier safari en bateau au coucher du soleil : troupeaux d'éléphants descendent boire par centaines, hippopotames, oiseaux." },
        { day: "Jour 8", title: "Chobe — terre et eau", region: "Chobe", description: "Journée combinant game drive matinal dans le parc et croisière sur le Chobe en après-midi. Le Chobe abrite plus de 100 000 éléphants — la plus forte concentration d'Afrique. Sundowner sur le pont du bateau." },
        { day: "Jour 9", title: "Transfert vers les Chutes Victoria (option) ou vol retour", region: "Chutes Victoria", description: "Possibilité de prolonger vers les Chutes Victoria (côté zambien ou zimbabwéen, à 1h30 de Kasane). Sinon, vol vers Johannesburg en fin de matinée et connexion internationale en soirée." },
        { day: "Jour 10", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Le Botswana ne quitte plus jamais ceux qu'il a touchés." },
      ]),
    },
    {
      slug: "botswana-signature-14-jours",
      title: "Botswana Signature",
      duration: "14 jours / 12 nuits",
      level: "Voyage premium safari",
      priceFrom: "À partir de 12 490 € / personne",
      pitch:
        "Pour prendre vraiment le temps du Botswana. Douze nuits dans les meilleurs camps du pays, à combiner delta de l'Okavango, Moremi, Linyanti et les pans de Makgadikgadi. Vols en avion de brousse, lodges signature (Mombo, Jao, Jack's Camp), rangers et pisteurs d'exception. L'essence même du safari de luxe.",
      coverImg: lodgeMombo,
      heroImg: lodgeJaoCamp,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Johannesburg", region: "Vol", description: "Départ de France. Vol de nuit vers l'Afrique australe." },
        { day: "Jour 2", title: "Vol vers Maun puis avion de brousse vers Jao", region: "Okavango", description: "Arrivée à Johannesburg, connexion vers Maun, puis avion de brousse vers Jao Camp dans le delta. Premier sundowner sur la terrasse face aux plaines inondées." },
        { day: "Jour 3", title: "Jao Camp — mokoro et marche", region: "Okavango", description: "Immersion totale dans le delta. Mokoro au lever du jour, retour pour brunch face à l'eau, marche à pied l'après-midi. Le silence du delta n'a pas d'équivalent." },
        { day: "Jour 4", title: "Jao Camp — game drive et bateau", region: "Okavango", description: "Safari en bateau motorisé pour explorer les chenaux profonds. L'après-midi : game drive en 4x4 dans les zones sèches. Dîner étoilé." },
        { day: "Jour 5", title: "Vol vers Mombo Camp (Moremi)", region: "Moremi", description: "Avion de brousse vers Mombo Camp, considéré comme l'un des meilleurs lodges au monde. Installation dans votre tente-suite, première game drive sur l'île de Mombo, densité de faune exceptionnelle." },
        { day: "Jour 6", title: "Mombo — safari intensif", region: "Moremi", description: "Deux safaris dans la journée. Mombo offre des observations de léopards quasi quotidiennes, lions, lycaons. Tracking au sol, sundowner dans la brousse." },
        { day: "Jour 7", title: "Mombo — dernière journée", region: "Moremi", description: "Dernière journée complète dans la concession. Possibilité de balade à pied avec un pisteur expérimenté, brunch bush au bord d'un point d'eau, observation depuis un hide." },
        { day: "Jour 8", title: "Vol vers Linyanti — Kwando Lagoon Camp", region: "Linyanti", description: "Avion de brousse vers la concession privée de Kwando, à la frontière namibienne. Camp intime de huit tentes, exclusivité totale. Première sortie de fin d'après-midi avec game drive." },
        { day: "Jour 9", title: "Linyanti — safari à pied et de nuit", region: "Linyanti", description: "Linyanti est l'une des rares zones du Botswana à autoriser les safaris à pied et de nuit. Tracking au sol, observation des lycaons, sortie nocturne au projecteur rouge (hyènes, civettes)." },
        { day: "Jour 10", title: "Linyanti — game drive et bateau", region: "Linyanti", description: "Safari combinant 4x4 et bateau sur la rivière Kwando. Éléphants, hippopotames, oiseaux d'eau. Dîner gastronomique au camp." },
        { day: "Jour 11", title: "Vol vers Makgadikgadi — Jack's Camp", region: "Makgadikgadi", description: "Avion de brousse vers les pans salés de Makgadikgadi. Installation à Jack's Camp, mobilier d'époque, atmosphère explorateur 1940. Première marche au bord des pans au coucher du soleil." },
        { day: "Jour 12", title: "Makgadikgadi — suricates et pans", region: "Makgadikgadi", description: "Matinée à la rencontre des colonies de suricates habituées à la présence humaine (ils grimpent parfois sur les épaules pour mieux voir). Après-midi : quad sur les pans salés, soirée à la belle étoile au cœur du néant blanc." },
        { day: "Jour 13", title: "Marche avec les San et vol retour", region: "Makgadikgadi", description: "Matinée avec une famille San : marche guidée dans la brousse, apprentissage des plantes médicinales, allumage du feu. Vol vers Maun puis Johannesburg, connexion internationale en soirée." },
        { day: "Jour 14", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Un voyage dont on ne revient pas tout à fait." },
      ]),
    },
    {
      slug: "botswana-victoria-falls-12-jours",
      title: "Botswana & Chutes Victoria",
      duration: "12 jours / 10 nuits",
      level: "Combiné safari + chutes",
      priceFrom: "À partir de 9 890 € / personne",
      pitch:
        "Le grand combiné Botswana et Chutes Victoria. Dix nuits pour vivre le meilleur du safari botswanais (Okavango, Moremi, Chobe) puis terminer en beauté face aux chutes les plus spectaculaires d'Afrique, côté zimbabwéen. Une transition naturelle, deux merveilles du continent en un seul voyage.",
      coverImg: chobeElephants,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Johannesburg", region: "Vol", description: "Départ de France." },
        { day: "Jour 2", title: "Vol vers Maun puis Okavango", region: "Okavango", description: "Arrivée à Johannesburg, connexion vers Maun, avion de brousse vers votre premier camp du delta. Premier sundowner." },
        { day: "Jour 3", title: "Okavango — mokoro et marche", region: "Okavango", description: "Journée immersion : mokoro au matin, marche à pied l'après-midi. Le delta dans toute sa diversité." },
        { day: "Jour 4", title: "Okavango — game drive complet", region: "Okavango", description: "Deux safaris dans la journée. Léopards, éléphants, hippopotames, oiseaux. Dîner sous les étoiles." },
        { day: "Jour 5", title: "Vol vers Moremi", region: "Moremi", description: "Avion de brousse vers la réserve de Moremi, installation au camp, première game drive en fin d'après-midi." },
        { day: "Jour 6", title: "Moremi — lycaons et léopards", region: "Moremi", description: "Journée complète safari. Moremi est l'une des meilleures zones au monde pour observer les lycaons." },
        { day: "Jour 7", title: "Vol vers le Chobe", region: "Chobe", description: "Vol vers Kasane. Transfert au lodge en bord de fleuve. Croisière au coucher du soleil parmi les troupeaux d'éléphants." },
        { day: "Jour 8", title: "Chobe — game drive et bateau", region: "Chobe", description: "Game drive matinal dans le parc, croisière en bateau l'après-midi. Le Chobe au crépuscule est inoubliable." },
        { day: "Jour 9", title: "Transfert routier vers les Chutes Victoria", region: "Chutes Victoria", description: "Transfert routier (1h30) vers les Chutes Victoria, côté zimbabwéen. Installation à l'hôtel face aux chutes (Victoria Falls Hotel ou équivalent). Première vue sur la fumée qui tonne." },
        { day: "Jour 10", title: "Chutes Victoria — découverte complète", region: "Chutes Victoria", description: "Visite guidée des chutes côté Zimbabwe (le meilleur point de vue), survol en hélicoptère pour saisir leur immensité, dîner-croisière sur le Zambèze au coucher du soleil." },
        { day: "Jour 11", title: "Vol retour", region: "Vol", description: "Vol depuis Victoria Falls vers Johannesburg puis connexion internationale vers la France." },
        { day: "Jour 12", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Le Botswana et les Chutes Victoria gravés à vie." },
      ]),
    },
  ],

  regions: [
    {
      name: "Le delta de l'Okavango",
      img: okavangoDelta,
      description:
        "Unique au monde, l'Okavango est un delta intérieur qui ne se jette pas dans la mer mais s'évapore dans le Kalahari. Mokoro, safari en bateau, marche à pied : l'expérience signature du Botswana.",
    },
    {
      name: "Le parc national de Chobe",
      img: chobeElephants,
      description:
        "La plus forte concentration d'éléphants d'Afrique (plus de 100 000). Croisière sur le Chobe au coucher du soleil pour observer les troupeaux qui descendent boire. À 1h30 des Chutes Victoria.",
    },
    {
      name: "La réserve de Moremi",
      img: moremiLeopard,
      description:
        "Au cœur du delta, l'une des plus belles réserves d'Afrique. Léopards furtifs, lycaons en meute (espèce parmi les plus menacées au monde), buffles, antilopes rares. Le safari à l'état pur.",
    },
    {
      name: "Le désert du Kalahari et le peuple San",
      img: sanBushmen,
      description:
        "Terres arides berceau des San (Bushmen), premiers habitants de l'Afrique australe. Marche guidée à la rencontre d'un peuple millénaire, paysages hors du commun.",
    },
    {
      name: "Les pans de Makgadikgadi",
      img: makgadikgadiPan,
      description:
        "Vestiges d'un ancien lac préhistorique, l'un des plus grands complexes salins au monde. Quad sur la croûte saline, suricates familiers, nuit à la belle étoile au cœur du néant.",
    },
    {
      name: "La concession de Linyanti",
      img: linyantiWild,
      description:
        "Zone confidentielle frontalière du Chobe et de la Namibie, peu fréquentée et riche en faune. Lycaons, lions du Savuti, safaris à pied et de nuit dans les concessions privées.",
    },
  ],

  practical: {
    visa:
      "Pas de visa requis pour les ressortissants français, belges et suisses pour un séjour de moins de 90 jours. Passeport valide au moins 6 mois après la date d'entrée dans le pays, avec au moins deux pages vierges consécutives. Pour les voyageurs avec enfants mineurs, un acte de naissance non-abrégé peut être demandé à l'entrée — nous vous accompagnons sur les démarches.",
    health:
      "Vaccin contre la fièvre jaune obligatoire si vous arrivez d'une zone à risque. Vaccins de base recommandés à jour (DTP, hépatites). Traitement antipaludéen indispensable dans le nord du pays (Okavango, Chobe, Linyanti, Moremi). Eau du robinet non potable hors lodges. Système de santé limité dans les zones de brousse — assurance rapatriement indispensable (incluse dans nos devis).",
    money:
      "Pula botswanaise (BWP). 1 € ≈ 14 BWP (variable). Cartes bancaires acceptées dans les lodges et grandes villes (Maun, Kasane). Distributeurs à Maun et Kasane. Prévoyez du cash en USD ou pulas pour les pourboires (ranger, pisteur, équipe lodge).",
    flights:
      "Pas de vol direct France — Botswana. Connexions habituelles via Johannesburg (Air France ou compagnies européennes), puis vol intérieur sur Maun ou Kasane. À l'intérieur du pays, les déplacements entre concessions se font en avion de brousse (Cessna 6-12 places) — inclus dans nos devis et part essentielle de l'expérience.",
    timezone:
      "GMT+2 toute l'année. 1 h de plus qu'en France en hiver, pas de décalage en été.",
    language:
      "Anglais (langue officielle) parlé partout. Setswana couramment utilisé. Lodges anglophones ; certains proposent des guides francophones sur demande. Notre experte locale Laurie est francophone (basée à Cape Town).",
    safety:
      "L'un des pays les plus stables et sûrs d'Afrique. Pas de zones à éviter. Risques liés à la faune en brousse (respecter strictement les consignes des rangers). Routes en bon état entre les villes principales ; les déplacements entre concessions se font systématiquement en avion de brousse, en toute sécurité.",
    tips:
      "Pourboires usuels : 10-20 USD/jour pour le ranger et le pisteur en safari, 5-10 USD/jour pour le personnel du lodge (à laisser collectivement à l'arrivée ou au départ). Tenue safari (couleurs neutres : beige, kaki, marron — éviter bleu et noir qui attirent les mouches tsé-tsé). Pull et veste indispensables pour les sorties matinales en saison sèche (températures fraîches). Bagages limités en avion de brousse : 20 kg max en sac souple — nous vous briefons en détail.",
  },

  faq: [
    {
      q: "Pourquoi partir en voyage au Botswana ?",
      a: "Le Botswana est la référence en termes de qualité de safari, considéré comme la plus belle destination safari du monde. Le pays protège ses réserves par une politique low-volume, high-value : peu de véhicules par concession, camps intimes, faune préservée. Une expérience safari authentique dans des zones protégées comme le delta de l'Okavango, classé à l'UNESCO.",
    },
    {
      q: "Quelle est la durée idéale pour un circuit au Botswana ?",
      a: "Un voyage de 8 nuits permet de profiter pleinement d'un safari Botswana en combinant plusieurs réserves (Okavango, Moremi, Chobe). Il est aussi cohérent de le combiner avec les Chutes Victoria (Zambie ou Zimbabwe) en ajoutant 2 nuits. Pour le voyage d'une vie en Afrique australe, comptez 3 à 4 semaines en combinant Namibie, Botswana et Chutes Victoria.",
    },
    {
      q: "Quand partir au Botswana ?",
      a: "Saison sèche d'avril à octobre : c'est la meilleure période pour le safari, avec une faune concentrée autour des points d'eau. Le pic de crue de l'Okavango se situe entre juin et août — moment idéal pour le mokoro. Saison verte de novembre à mars : paysages luxuriants, ornithologie exceptionnelle, migration des zèbres du Chobe vers Nxai Pan.",
    },
    {
      q: "Où faire un safari au Botswana ?",
      a: "Les meilleurs safaris se font dans le delta de l'Okavango, la réserve de Moremi, le parc national de Chobe et la concession de Linyanti. Le désert du Kalahari et les pans de Makgadikgadi offrent une expérience plus minérale et culturelle (rencontre avec les San).",
    },
    {
      q: "Quels animaux peut-on voir au Botswana ?",
      a: "On y observe les Big Five (lion, léopard, éléphant, buffle, rhinocéros), mais aussi des troupeaux d'éléphants exceptionnels au Chobe, des lycaons (espèce parmi les plus menacées au monde), des léopards à Moremi et Mombo, des hippopotames, des girafes, et une avifaune extraordinaire.",
    },
    {
      q: "Faut-il un guide pour un safari au Botswana ?",
      a: "Oui, les safaris guidés sont quasi obligatoires. Tous nos circuits incluent rangers et pisteurs locaux d'exception, formés à la lecture du terrain et au respect de la faune. C'est une garantie de sécurité et de qualité d'observation incomparable.",
    },
    {
      q: "Qu'est-ce qu'un safari mobile au Botswana ?",
      a: "Un safari mobile est un circuit itinérant avec campement, où une équipe monte et démonte le camp à chaque étape. Très prisé pour une immersion totale en pleine brousse, c'est une formule plus aventurière et plus économique que les camps fixes. Idéal pour les voyageurs en quête d'authenticité.",
    },
    {
      q: "Quelle est la différence entre lodge et camp au Botswana ?",
      a: "Les lodges sont plus luxueux avec confort moderne (climatisation, piscine, restaurant gastronomique), tandis qu'un camp de toile offre une expérience plus authentique et immersive. Dans les deux cas, les déplacements entre concessions se font en avion de brousse — c'est ce qui justifie le coût élevé du Botswana, mais c'est aussi une part essentielle de l'expérience.",
    },
    {
      q: "Peut-on voyager au Botswana en famille ?",
      a: "Oui, mais avec quelques précautions. Les lodges les plus haut de gamme n'acceptent pas les enfants en bas âge. Pour les familles avec enfants ados (10+), de nombreux camps proposent des programmes adaptés. Le prix peut être un frein pour les familles — nous proposons des combinés Botswana + Afrique du Sud pour optimiser le budget.",
    },
    {
      q: "Le delta de l'Okavango est-il accessible toute l'année ?",
      a: "Oui, mais il est particulièrement impressionnant entre juin et septembre, pendant la saison des crues. L'eau provenant d'Angola transforme alors les plaines en un labyrinthe de chenaux et de plaines inondées — le moment idéal pour le mokoro. Le Delta de l'Okavango est le seul delta au monde qui se jette dans un désert.",
    },
    {
      q: "Peut-on combiner un voyage au Botswana avec une autre destination ?",
      a: "Oui, de nombreux voyageurs ajoutent les Chutes Victoria (Zambie ou Zimbabwe, à 1h30 du Chobe) ou un séjour à Cape Town. Le combiné Namibie + Botswana + Chutes Victoria est l'un des plus beaux voyages d'Afrique australe — comptez 3 à 4 semaines.",
    },
    {
      q: "Quelle est la différence entre les niveaux de safari ?",
      a: "Niveau 1 — Safari d'ambiance : observations ponctuelles, expérience centrée sur les paysages (Namibie, Afrique du Sud côtière). Niveau 2 — Safari équilibré : safaris bien présents combinés à d'autres expériences (Afrique du Sud Kruger, Ouganda, Zambie). Niveau 3 — Safari intensif : l'animal au cœur du voyage (Tanzanie, Kenya, Botswana). Le Botswana est en niveau 3.",
    },
    {
      q: "Pourquoi passer par une agence comme La Voyagerie ?",
      a: "Parce que le Botswana est une destination logistique complexe (vols intérieurs en avion de brousse, sélection des concessions privées, timing des saisons), où chaque détail compte. Nous testons chaque adresse, travaillons en direct avec Laurie et nos partenaires triés sur le volet. Vous gagnez du temps, de la sérénité, et l'assurance que chaque étape a été choisie pour vous. Un seul interlocuteur, expert de la destination, du devis au retour à la maison.",
    },
  ],

  galleryImgs: [okavangoDelta, mokoroPirogue, chobeElephants, moremiLeopard, makgadikgadiPan, linyantiWild, sanBushmen],

  parallaxBands: {
    afterIntro: chobeElephants,
    afterWhenToGo: kalahariDesert,
    afterRegions: sundownerSavane,
  },

  pullQuote: {
    text: "Le Botswana ne se visite pas — il s'écoute. Le souffle d'un éléphant qui boit à dix mètres, le clapotis d'un mokoro qui glisse entre les nénuphars, le rire d'une famille San autour du feu. Ici, c'est la nature qui dicte le rythme, et l'on en revient changé.",
    author: "Laurie — notre experte Botswana, à Cape Town",
  },

  ctaBackground: chobeElephants,
};

export const botswanaHero = heroBotswana;
