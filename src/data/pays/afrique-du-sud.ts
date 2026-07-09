import type { DetailedPays } from "@/data/destinations";

// === Photos Afrique du Sud ===
// Pour cette page, on s'appuie sur des URLs externes (lodges officiels + Unsplash haute qualité)
// pour éviter d'alourdir le bundle local et garder des photos fidèles aux adresses sélectionnées.

const heroAfsud =
  "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=2400&q=80"; // Cape Town & Table Mountain
const tableMountain =
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1800&q=80";
const krugerSafari =
  "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1800&q=80";
const krugerLions =
  "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1800&q=80";
const gardenRoute =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=80";
const stellenboschVignobles =
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1800&q=80";
const johannesbourgSoweto =
  "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?auto=format&fit=crop&w=1800&q=80";
const boulderManchots =
  "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=1800&q=80";
const baleinesHermanus =
  "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=1800&q=80";
const capeBonneEsperance =
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1800&q=80";
const blydeCanyon =
  "https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?auto=format&fit=crop&w=1800&q=80";
const drakensberg =
  "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?auto=format&fit=crop&w=1800&q=80";
const safariLodge =
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=80";

// === Photos lodges (Unsplash — esprit & ambiance proches) ===
const lodgeSingitaSabi =
  "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1800&q=80";
const lodgeAndBeyondNgala =
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1800&q=80";
const lodgeRoyalMalewane =
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80";
const lodgeLionSands =
  "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1800&q=80";
const lodgeBushmansKloof =
  "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1800&q=80";
const lodgeBabylonstoren =
  "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1800&q=80";
const lodgeCapeGrace =
  "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1800&q=80";
const lodgeEllermanHouse =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80";
const lodgeGrootbosForest =
  "https://images.unsplash.com/photo-1470093851219-69951fcbb533?auto=format&fit=crop&w=1800&q=80";
const lodgeTintswaloAtlantic =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=80";

// === Pool d'images par région pour enrichir les étapes ===
const STEP_POOL_BY_REGION: Record<string, string[]> = {
  Vol: [heroAfsud],
  "Le Cap": [tableMountain, capeBonneEsperance, boulderManchots],
  "Cape Town": [tableMountain, capeBonneEsperance],
  Stellenbosch: [stellenboschVignobles, lodgeBabylonstoren],
  Franschhoek: [stellenboschVignobles],
  "Garden Route": [gardenRoute, baleinesHermanus],
  Hermanus: [baleinesHermanus, gardenRoute],
  Knysna: [gardenRoute],
  Tsitsikamma: [gardenRoute],
  Kruger: [krugerSafari, krugerLions, safariLodge],
  "Sabi Sand": [lodgeSingitaSabi, krugerLions, safariLodge],
  "Madikwe": [safariLodge, krugerSafari],
  Johannesburg: [johannesbourgSoweto],
  Soweto: [johannesbourgSoweto],
  "Blyde River": [blydeCanyon],
  Drakensberg: [drakensberg],
  "Cap de Bonne-Espérance": [capeBonneEsperance, tableMountain],
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

export const afriqueDuSudDetailed: DetailedPays = {
  metaTitle: "Voyage sur mesure Afrique du Sud | Safari, Cape Town & Vignobles | La Voyagerie",
  metaDescription:
    "Voyage sur mesure en Afrique du Sud par notre agence spécialiste : safari dans le Kruger, Cape Town et la Garden Route, vignobles de Stellenbosch. Lodges d'exception, accompagnement de bout en bout.",

  longIntro: [
    "Le vent du Cap, la silhouette de la Table Mountain qui se découpe au-dessus de l'Atlantique, et plus loin, dans la lumière dorée du Kruger, un léopard qui s'étire sur une branche. L'Afrique du Sud ne se choisit pas — elle s'impose. En un seul voyage, vous traversez plusieurs continents intérieurs : le théâtre minéral des falaises du Cap de Bonne-Espérance, les vignobles de Stellenbosch et de Franschhoek où l'on déjeune face aux montagnes, la côte sauvage de la Garden Route bordée de forêts millénaires, et les grandes plaines du Kruger où vivent encore les Big Five. C'est un pays-monde, condensé en quatorze jours.",
    "Chez La Voyagerie, agence spécialiste de l'Afrique du Sud, nous concevons chaque circuit à la main avec notre experte locale Laurie, installée à Cape Town depuis plusieurs années. Tous nos itinéraires sont testés, des réserves privées du Sabi Sand aux lodges intimes de la péninsule. Nous travaillons en direct avec les meilleurs guides francophones, sélectionnons les adresses pour leur âme — Singita, Royal Malewane, Babylonstoren, Ellerman House — et orchestrons chaque transition entre safari, route panoramique et séjour balnéaire. Aucun groupe imposé, aucun itinéraire standardisé.",
    "Une lune de miel entre lodge dans la brousse et vignobles d'auteur. Une famille avec ados pour un premier safari accessible et confortable. Trois semaines à combiner Kruger, Garden Route et Cape Town. Quel que soit votre projet, nous le composons à votre rythme, avec le bon équilibre entre raffinement et authenticité, entre tables étoilées et couchers de soleil dans la brousse. Votre Afrique du Sud, et rien d'autre. Construisons-la ensemble.",
  ],

  whyVisit: [
    {
      title: "Le parc Kruger et les Big Five",
      text: "Le mythique parc national Kruger, l'un des plus vastes d'Afrique. Lions, léopards, éléphants, buffles, rhinocéros : les Big Five s'y observent avec une régularité rare. Nous privilégions les réserves privées attenantes (Sabi Sand, Timbavati, Manyeleti) pour des safaris sans foule, en 4x4 ouverts, avec ranger et pisteur dédiés. Une expérience safari accessible, intense et magnifique.",
      img: krugerSafari,
    },
    {
      title: "Cape Town et la Table Mountain",
      text: "Entre océan et montagne, l'une des plus belles villes du monde. Téléphérique vers Table Mountain au lever du jour, marché de Bo-Kaap et ses maisons colorées, V&A Waterfront, plages de Camps Bay et de Clifton. Cape Town est cosmopolite, gastronomique, vibrante — et l'une des bases idéales pour rayonner sur la péninsule.",
      img: tableMountain,
    },
    {
      title: "La Garden Route",
      text: "L'un des plus beaux road trips d'Afrique australe. Sur 300 km entre Mossel Bay et la réserve de Tsitsikamma, la côte alterne forêts denses, plages désertes, lagunes et villages de pêcheurs. Knysna et ses huîtres, Plettenberg Bay et ses baleines, le parc national de Tsitsikamma et ses ponts suspendus. Une étape contemplative, à parcourir au rythme du vent.",
      img: gardenRoute,
    },
    {
      title: "Stellenbosch et Franschhoek — les vins du Cap",
      text: "À une heure du Cap, deux villages chargés d'histoire qui constituent le cœur de la route des vins sud-africains. Domaines historiques (Boschendal, Babylonstoren, Tokara), gastronomie d'auteur, jardins ouverts à la visite, dégustations confidentielles. Idéal pour les épicuriens et les voyages de noces.",
      img: stellenboschVignobles,
    },
    {
      title: "Le Cap de Bonne-Espérance et la péninsule",
      text: "Cap mythique, point de rencontre supposé de l'Atlantique et de l'océan Indien. Falaises vertigineuses, plages désertes, colonies de manchots à Boulders Beach, panoramas grandioses depuis Cape Point. Une journée d'excursion depuis Cape Town qui marque pour toujours.",
      img: capeBonneEsperance,
    },
    {
      title: "Les baleines australes d'Hermanus",
      text: "De juin à novembre, la baie de Hermanus accueille les baleines franches australes venues mettre bas dans ses eaux abritées. On les observe parfois à quelques mètres du rivage. Hermanus est l'un des meilleurs spots d'observation des baleines au monde — et une étape idéale entre Cape Town et la Garden Route.",
      img: baleinesHermanus,
    },
    {
      title: "Johannesburg, Soweto et le poids de l'histoire",
      text: "Comprendre l'Afrique du Sud contemporaine, c'est passer par Johannesburg et Soweto, berceau de la lutte contre l'apartheid. Maison de Nelson Mandela, musée de l'Apartheid, balade guidée à Soweto avec un habitant : une immersion forte, parfois bouleversante, toujours essentielle.",
      img: johannesbourgSoweto,
    },
    {
      title: "Le Blyde River Canyon et la Panorama Route",
      text: "Sur la route entre Johannesburg et le Kruger, la Panorama Route serpente entre falaises, cascades et points de vue grandioses. Blyde River Canyon — troisième plus grand canyon du monde — God's Window, Bourke's Luck Potholes. Un trait d'union spectaculaire entre les hauts plateaux et les plaines à safari.",
      img: blydeCanyon,
    },
    {
      title: "La culture, les townships et la Nation Arc-en-Ciel",
      text: "Onze langues officielles, des cultures zouloue, xhosa, afrikaner, indienne, malaise — l'Afrique du Sud est un pays mosaïque. Visites de townships accompagnées par des habitants engagés, cuisine cap-malaise, rencontres avec des artistes locaux, musique live à Soweto. L'âme du pays se révèle dans ces échanges.",
      img: heroAfsud,
    },
  ],

  whenToGo: {
    summary:
      "La meilleure saison pour un voyage sur mesure en Afrique du Sud dépend de votre projet. Pour les safaris (Kruger, Sabi Sand, Madikwe), la saison sèche de mai à octobre est idéale : végétation clairsemée, animaux concentrés autour des points d'eau, observations spectaculaires. Pour Cape Town, la Garden Route et les vignobles, la saison estivale (novembre à mars) offre des journées longues, ensoleillées, parfaites pour les plages et les terrasses. L'observation des baleines à Hermanus se fait de juin à novembre. La force de l'Afrique du Sud : grâce à sa diversité géographique, elle se visite toute l'année — il s'agit simplement de choisir la bonne combinaison. Notre équipe vous oriente vers la fenêtre la plus juste selon votre projet et réserve lodges, vols intérieurs et expériences plusieurs mois à l'avance pour les périodes hautes.",
    months: [
      { month: "Jan", recommandation: "bonne", note: "Été, parfait pour Cape Town & plages" },
      { month: "Fév", recommandation: "bonne", note: "Été chaud, vignobles superbes" },
      { month: "Mar", recommandation: "ideal", note: "Fin d'été, conditions idéales partout" },
      { month: "Avr", recommandation: "ideal", note: "Automne doux, début saison safari" },
      { month: "Mai", recommandation: "ideal", note: "Saison sèche, faune au top" },
      { month: "Juin", recommandation: "ideal", note: "Hiver sec, baleines à Hermanus" },
      { month: "Juil", recommandation: "ideal", note: "Pleine saison safari" },
      { month: "Août", recommandation: "ideal", note: "Sec, observations exceptionnelles" },
      { month: "Sep", recommandation: "ideal", note: "Printemps, fleurs du Namaqualand" },
      { month: "Oct", recommandation: "ideal", note: "Fin saison sèche, tout est ouvert" },
      { month: "Nov", recommandation: "bonne", note: "Début été, dernières baleines" },
      { month: "Déc", recommandation: "bonne", note: "Été, haute affluence Cape Town" },
    ],
  },

  lodges: [
    {
      name: "Singita Sabi Sand",
      region: "Sabi Sand (Kruger)",
      description:
        "Adresse mythique de la conservation africaine, dans la réserve privée du Sabi Sand attenante au Kruger. Lodges intimes, design contemporain en harmonie avec la brousse, cuisine signature, safaris en 4x4 ouverts avec ranger et pisteur dédiés. L'une des meilleures adresses au monde pour observer le léopard.",
      highlights: ["Leader mondial de la conservation", "Service signature", "Léopards quasi quotidiens"],
      img: lodgeSingitaSabi,
    },
    {
      name: "Royal Malewane",
      region: "Thornybush (Greater Kruger)",
      description:
        "Lodge ultra-luxueux dans la réserve privée de Thornybush, conçu par Liz Biden (Royal Portfolio). Suites avec piscine privée, spa de renom, équipe de rangers parmi les plus expérimentés d'Afrique. Une expérience safari sans compromis, idéale pour les voyages de noces.",
      highlights: ["Suites avec piscine privée", "Rangers d'exception", "Idéal lune de miel"],
      img: lodgeRoyalMalewane,
    },
    {
      name: "andBeyond Ngala Safari Lodge",
      region: "Timbavati (Greater Kruger)",
      description:
        "Premier lodge privé créé en concession dans le parc Kruger. Vingt cottages confortables sous les jackalberries, atmosphère safari authentique, engagement fort dans la conservation et les communautés. Excellent rapport qualité-expérience pour un premier safari.",
      highlights: ["Au cœur du Kruger", "Engagement conservation", "Familles bienvenues"],
      img: lodgeAndBeyondNgala,
    },
    {
      name: "Lion Sands River Lodge",
      region: "Sabi Sand (Kruger)",
      description:
        "Sur les rives de la Sabie River, lodge familial réputé pour ses fameuses Treehouses : nuits en plein cœur de la brousse, sous les étoiles, sur une plateforme surélevée. Expérience inoubliable pour les couples en quête de sensation, sans renoncer au confort.",
      highlights: ["Nuit en Treehouse étoilée", "Bord de rivière", "Sabi Sand premium"],
      img: lodgeLionSands,
    },
    {
      name: "Bushmans Kloof Wilderness Reserve",
      region: "Cederberg (à 3 h du Cap)",
      description:
        "Réserve privée nichée dans les montagnes du Cederberg, à 3 h de Cape Town. Pas de Big Five, mais des paysages spectaculaires, des peintures rupestres bushmen vieilles de 10 000 ans, une faune endémique et un spa primé. Extension idéale après Cape Town ou les vignobles.",
      highlights: ["Art rupestre bushman", "Paysages minéraux", "Spa primé"],
      img: lodgeBushmansKloof,
    },
    {
      name: "Babylonstoren",
      region: "Franschhoek (route des vins)",
      description:
        "Domaine viticole historique au pied du Simonsberg, transformé en hôtel-jardin d'exception. Cottages au cœur d'un potager de 3,5 hectares, restaurant farm-to-table, dégustations dans les caves du XVIIᵉ siècle. L'art de vivre sud-africain dans toute sa beauté.",
      highlights: ["Jardin extraordinaire", "Restaurant farm-to-table", "Cellier historique"],
      img: lodgeBabylonstoren,
    },
    {
      name: "Cape Grace",
      region: "Cape Town — V&A Waterfront",
      description:
        "Adresse signature du V&A Waterfront, vue sur la marina et Table Mountain. Service feutré, bar à whisky parmi les plus réputés du monde, position parfaite pour explorer Cape Town à pied. Idéal pour ouvrir ou clôturer un voyage en beauté.",
      highlights: ["Vue Table Mountain", "Bar à whisky d'exception", "Cœur de Cape Town"],
      img: lodgeCapeGrace,
    },
    {
      name: "Ellerman House",
      region: "Cape Town — Bantry Bay",
      description:
        "Manoir Cape Edwardian transformé en relais & châteaux face à l'Atlantique, dans le quartier confidentiel de Bantry Bay. Collection d'art sud-africain remarquable, spa, jardins suspendus sur l'océan. Une adresse intime et raffinée, à 10 min du centre.",
      highlights: ["Vue Atlantique", "Collection d'art sud-africaine", "Service feutré"],
      img: lodgeEllermanHouse,
    },
    {
      name: "Grootbos Forest Lodge",
      region: "Hermanus (Whale Coast)",
      description:
        "Réserve privée de fynbos surplombant Walker Bay, à 2 h du Cap. Suites en bois et verre fondues dans la forêt millénaire, observation des baleines depuis la terrasse en saison, équitation et randonnée écologique. Une étape unique entre Cape Town et la Garden Route.",
      highlights: ["Baleines en saison", "Forêt de fynbos millénaire", "Conservation engagée"],
      img: lodgeGrootbosForest,
    },
    {
      name: "Tintswalo Atlantic",
      region: "Cape Town — Hout Bay",
      description:
        "Lodge unique posé sur la plage de Hout Bay, au pied du Chapman's Peak. Dix suites face à l'océan, chacune inspirée d'une île océanique. Coucher de soleil légendaire sur l'Atlantique, accès rapide à la péninsule et au Cap de Bonne-Espérance.",
      highlights: ["Plage privée", "Couchers de soleil légendaires", "Proche Cap de Bonne-Espérance"],
      img: lodgeTintswaloAtlantic,
    },
  ],

  itineraires: [
    {
      slug: "essentiel-afrique-du-sud-12-jours",
      title: "Essentiel Afrique du Sud",
      duration: "12 jours / 10 nuits",
      level: "Découverte",
      priceFrom: "À partir de 4 690 € / personne",
      pitch:
        "Le grand classique de l'Afrique du Sud, à votre rythme. Douze jours pour combiner Cape Town, la péninsule, la route des vins, la Garden Route et un safari premium dans une réserve privée du Kruger. Un condensé parfait de paysages, de gastronomie et de nature sauvage.",
      coverImg: tableMountain,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Cape Town", region: "Vol", description: "Départ de France à destination de Cape Town. Vol de nuit, escale possible à Doha, Istanbul ou Amsterdam selon la compagnie sélectionnée. Premier souffle d'un voyage où chaque jour révélera un autre visage du pays." },
        { day: "Jour 2", title: "Arrivée à Cape Town — V&A Waterfront", region: "Cape Town", description: "Accueil à votre arrivée par notre partenaire local francophone. Transfert vers votre hôtel face au port (Cape Grace ou équivalent). Première balade au V&A Waterfront, puis dîner gastronomique au bord de l'eau. Le ton est donné." },
        { day: "Jour 3", title: "Table Mountain et Bo-Kaap", region: "Cape Town", description: "Ascension matinale au sommet de Table Mountain en téléphérique pour la lumière du matin. Vue à 360° sur la ville, les Twelve Apostles, Robben Island au large. Après-midi à Bo-Kaap (quartier cap-malais aux maisons colorées) puis visite guidée du District Six Museum." },
        { day: "Jour 4", title: "Péninsule du Cap et manchots de Boulders Beach", region: "Cap de Bonne-Espérance", description: "Journée complète sur la péninsule : descente par Chapman's Peak Drive, Hout Bay et ses phoques, Cap de Bonne-Espérance et son phare, Cape Point. Au retour, halte à Boulders Beach pour observer la colonie de manchots africains. Coucher de soleil à Camps Bay." },
        { day: "Jour 5", title: "Route des vins — Stellenbosch et Franschhoek", region: "Stellenbosch", description: "Cap à l'est vers la route des vins. Dégustations dans deux ou trois domaines historiques (Boschendal, Babylonstoren, Tokara), déjeuner farm-to-table dans les vignes, balade dans le village de Franschhoek. Nuit en lodge viticole d'exception." },
        { day: "Jour 6", title: "Vol pour la Garden Route — installation à Knysna", region: "Garden Route", description: "Vol intérieur vers George (1 h 30 depuis Cape Town). Récupération de la voiture de location et route panoramique jusqu'à Knysna. Balade sur les Heads (falaises ouvrant sur l'océan), dîner aux huîtres face à la lagune." },
        { day: "Jour 7", title: "Garden Route — Plettenberg Bay et Tsitsikamma", region: "Garden Route", description: "Route vers l'est. Arrêt à Plettenberg Bay pour observer les dauphins et baleines selon la saison. Après-midi dans le parc national de Tsitsikamma : pont suspendu de Storms River, forêts millénaires, falaises ouvertes sur l'océan Indien." },
        { day: "Jour 8", title: "Retour vers Cape Town ou vol pour Johannesburg", region: "Garden Route", description: "Matinée libre sur la Garden Route, dernier déjeuner face à l'océan. Selon votre itinéraire, vol intérieur depuis George vers Johannesburg en fin de journée pour la suite du voyage. Accueil et transfert vers votre lodge à proximité." },
        { day: "Jour 9", title: "Vol vers le Kruger — première soirée safari", region: "Kruger", description: "Vol intérieur vers la réserve privée du Sabi Sand ou Timbavati. Accueil sur l'airstrip par votre ranger et transfert au lodge. Première game drive en fin d'après-midi : la magie commence dès le premier soir, lumière dorée, premiers contacts avec la grande faune." },
        { day: "Jour 10", title: "Sabi Sand — safari intensif", region: "Sabi Sand", description: "Journée rythmée par deux safaris : départ avant l'aube avec petit-déjeuner brousse, puis sortie en fin d'après-midi avec sundowner. Entre les deux, repos au lodge, piscine face au bush, et briefings avec le ranger. Le Sabi Sand offre les meilleures chances mondiales d'observer le léopard." },
        { day: "Jour 11", title: "Sabi Sand — dernière journée safari", region: "Sabi Sand", description: "Dernière journée complète au cœur de la réserve, à chercher les Big Five qui vous manqueraient encore. Sortie pirouette : tracking à pied avec le pisteur, dîner boma sous les étoiles. Une nuit ultime à graver dans la mémoire." },
        { day: "Jour 12", title: "Vol retour vers la France", region: "Vol", description: "Vol intérieur vers Johannesburg en matinée, connexion internationale vers la France. Une dernière fois la lumière dorée de la brousse, puis le ciel. Arrivée à Paris le lendemain, le voyage continue dans les souvenirs." },
      ]),
    },
    {
      slug: "afrique-du-sud-signature-16-jours",
      title: "Afrique du Sud Signature",
      duration: "16 jours / 14 nuits",
      level: "Voyage premium",
      priceFrom: "À partir de 7 290 € / personne",
      pitch:
        "Pour prendre vraiment le temps de l'Afrique du Sud. Seize jours pour combiner Cape Town raffiné, vignobles d'auteur, baleines d'Hermanus, Garden Route en mode contemplatif, et un safari premium au Sabi Sand. Lodges signature, rythme apaisé, immersion totale.",
      coverImg: krugerLions,
      heroImg: lodgeSingitaSabi,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Cape Town", region: "Vol", description: "Départ de France. Vol de nuit vers Cape Town, escale selon la compagnie. Le grand voyage commence." },
        { day: "Jour 2", title: "Arrivée à Cape Town — Bantry Bay", region: "Cape Town", description: "Accueil et transfert vers Ellerman House à Bantry Bay, manoir face à l'Atlantique. Première soirée tranquille, dîner du chef face à l'océan." },
        { day: "Jour 3", title: "Table Mountain au lever du jour", region: "Cape Town", description: "Ascension matinale (premier téléphérique) pour la lumière du matin. Petit-déjeuner au sommet, vues à 360°. Après-midi à Bo-Kaap et galeries de Woodstock." },
        { day: "Jour 4", title: "Robben Island et Kirstenbosch", region: "Cape Town", description: "Matinée : traversée vers Robben Island, visite guidée par un ancien prisonnier politique. Après-midi : jardins botaniques de Kirstenbosch, l'un des plus beaux du monde, au pied de Table Mountain." },
        { day: "Jour 5", title: "Péninsule du Cap — Cape Point et Boulders Beach", region: "Cap de Bonne-Espérance", description: "Journée complète sur la péninsule. Chapman's Peak Drive, Cape Point, manchots de Boulders Beach. Déjeuner aux huîtres à Kalk Bay. Retour par Constantia et ses domaines viticoles historiques." },
        { day: "Jour 6", title: "Route vers Hermanus — baleines australes", region: "Hermanus", description: "Route vers l'est en longeant la côte. Installation à Grootbos Forest Lodge, sur les hauteurs de Walker Bay. En saison (juin à novembre), observation des baleines depuis la terrasse. Randonnée écologique dans le fynbos millénaire." },
        { day: "Jour 7", title: "Hermanus — sortie marine ou shark cage", region: "Hermanus", description: "Sortie en bateau pour approcher les baleines en saison, ou cage diving avec les grands requins blancs à Gansbaai pour les plus aventureux. Après-midi spa et farniente face à l'océan." },
        { day: "Jour 8", title: "Route vers Franschhoek — vignobles", region: "Franschhoek", description: "Route vers les vignobles. Installation à Babylonstoren, domaine-jardin d'exception. Visite des caves historiques, déjeuner farm-to-table dans les vignes, balade dans le potager de 3,5 hectares." },
        { day: "Jour 9", title: "Stellenbosch — dégustations confidentielles", region: "Stellenbosch", description: "Journée dédiée à la route des vins. Visites privées chez deux ou trois domaines (Tokara, Delaire Graff, Boschendal), déjeuner au Greenhouse ou équivalent. Soirée détente au domaine." },
        { day: "Jour 10", title: "Vol pour la Garden Route — Knysna", region: "Garden Route", description: "Vol intérieur vers George, transfert vers Knysna. Croisière sur la lagune au coucher du soleil, dîner aux huîtres face aux Heads." },
        { day: "Jour 11", title: "Garden Route — Plettenberg Bay", region: "Garden Route", description: "Route vers Plettenberg Bay. Sortie en bateau (dauphins, baleines en saison), balade à pied dans le Robberg Nature Reserve (panoramas spectaculaires sur l'océan)." },
        { day: "Jour 12", title: "Tsitsikamma — pont suspendu et forêts", region: "Tsitsikamma", description: "Journée dans le parc national de Tsitsikamma : pont suspendu de Storms River, forêts millénaires, falaises de l'océan Indien. Pour les plus actifs : zipline dans la canopée ou kayak sur la rivière." },
        { day: "Jour 13", title: "Vol vers le Sabi Sand — premier safari", region: "Sabi Sand", description: "Vol intérieur via Johannesburg jusqu'à l'airstrip du Sabi Sand. Accueil par votre ranger, transfert au Singita ou Royal Malewane. Premier safari de fin d'après-midi, sundowner dans la brousse." },
        { day: "Jour 14", title: "Sabi Sand — safari intensif", region: "Sabi Sand", description: "Deux safaris dans la journée. Le Sabi Sand est mondialement réputé pour ses léopards. Tracking, observation, rencontres rapprochées dans un cadre de conservation exemplaire." },
        { day: "Jour 15", title: "Sabi Sand — dernière journée", region: "Sabi Sand", description: "Dernière matinée safari, marche à pied avec le pisteur, déjeuner bush. Après-midi détente au lodge avant le dîner d'adieu au boma, sous les étoiles." },
        { day: "Jour 16", title: "Vol retour vers la France", region: "Vol", description: "Vol intérieur vers Johannesburg en matinée, connexion internationale. Arrivée à Paris le lendemain. Le voyage continue, dans les images et les sensations." },
      ]),
    },
    {
      slug: "afrique-du-sud-famille-13-jours",
      title: "Afrique du Sud en famille",
      duration: "13 jours / 11 nuits",
      level: "Famille",
      priceFrom: "À partir de 4 990 € / personne",
      pitch:
        "L'Afrique du Sud est l'une des destinations africaines les plus adaptées aux familles. Treize jours pensés pour combiner safari accessible (lodges familles bienvenues), Cape Town ludique, plages, manchots, fermes pédagogiques et nature. Aucune longue distance en avion, des hébergements adaptés aux enfants.",
      coverImg: boulderManchots,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Johannesburg", region: "Vol", description: "Départ de France. Vol de nuit vers Johannesburg." },
        { day: "Jour 2", title: "Arrivée et vol vers le Kruger", region: "Kruger", description: "Arrivée à Johannesburg, connexion intérieure vers une réserve privée du Greater Kruger (andBeyond Ngala, lion-friendly pour les familles). Premier safari en fin d'après-midi." },
        { day: "Jour 3", title: "Safari au cœur du Kruger", region: "Kruger", description: "Deux safaris dans la journée, adaptés aux enfants : sorties plus courtes, programme Ranger Kids dans certains lodges. Les enfants reçoivent un carnet de bord, apprennent à pister les empreintes." },
        { day: "Jour 4", title: "Kruger — safari et activités enfants", region: "Kruger", description: "Dernière journée safari. Découverte des programmes nature pour enfants : moulage d'empreintes, tracking, jeux éducatifs, dégustation des spécialités sud-africaines au boma." },
        { day: "Jour 5", title: "Vol vers Cape Town — installation", region: "Cape Town", description: "Vol intérieur vers Cape Town. Installation dans un appart-hôtel familial face à l'océan. Première soirée à V&A Waterfront, ambiance festive et restaurants kids-friendly." },
        { day: "Jour 6", title: "Table Mountain et aquarium", region: "Cape Town", description: "Matinée : ascension de Table Mountain en téléphérique (vues à couper le souffle). Après-midi : Two Oceans Aquarium au V&A Waterfront, l'un des plus beaux d'Afrique." },
        { day: "Jour 7", title: "Boulders Beach et péninsule", region: "Cap de Bonne-Espérance", description: "Journée famille sur la péninsule : manchots de Boulders Beach (les enfants peuvent les approcher de très près), Cap de Bonne-Espérance, déjeuner aux huîtres ou en famille à Kalk Bay." },
        { day: "Jour 8", title: "Stellenbosch — ferme et famille", region: "Stellenbosch", description: "Route vers Stellenbosch. Domaine Babylonstoren : visite du potager, ferme pédagogique, déjeuner au Greenhouse, ateliers nature pour enfants. Nuit au domaine." },
        { day: "Jour 9", title: "Route vers la Garden Route — Knysna", region: "Garden Route", description: "Vol vers George ou route panoramique vers la Garden Route. Installation à Knysna, lagune et plages calmes. Sortie en bateau dans la lagune, balade aux Heads." },
        { day: "Jour 10", title: "Plettenberg Bay — Monkeyland & Birds of Eden", region: "Garden Route", description: "Journée famille à Plettenberg Bay : sanctuaires de Monkeyland et Birds of Eden (refuges éthiques pour primates et oiseaux), plages désertes, surf pour les ados." },
        { day: "Jour 11", title: "Tsitsikamma — passerelle et forêt", region: "Tsitsikamma", description: "Parc national de Tsitsikamma : pont suspendu de Storms River, balade en forêt millénaire, canopy tour pour les ados. Dernière soirée face à l'océan Indien." },
        { day: "Jour 12", title: "Route vers George et vol retour", region: "Garden Route", description: "Matinée libre sur les plages, déjeuner d'adieu. Route vers l'aéroport de George, vol intérieur vers Johannesburg puis vol international vers la France." },
        { day: "Jour 13", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Une famille marquée à vie par l'Afrique du Sud." },
      ]),
    },
  ],

  regions: [
    {
      name: "Cape Town et la péninsule",
      img: tableMountain,
      description:
        "L'une des plus belles villes du monde, entre océan Atlantique et Table Mountain. V&A Waterfront, Bo-Kaap, Kirstenbosch, Cap de Bonne-Espérance, manchots de Boulders Beach. Base parfaite pour rayonner sur la péninsule.",
    },
    {
      name: "La route des vins — Stellenbosch & Franschhoek",
      img: stellenboschVignobles,
      description:
        "À une heure du Cap, deux villages historiques au cœur des vignobles sud-africains. Domaines de prestige, gastronomie d'auteur, art de vivre cap-hollandais. Idéal pour les épicuriens.",
    },
    {
      name: "La Garden Route",
      img: gardenRoute,
      description:
        "300 km de côte spectaculaire entre Mossel Bay et Tsitsikamma. Knysna et ses huîtres, Plettenberg Bay et ses baleines, forêts millénaires, plages désertes. Le road trip incontournable.",
    },
    {
      name: "Le parc Kruger et ses réserves privées",
      img: krugerSafari,
      description:
        "Le parc safari mythique du pays. Big Five, lodges d'exception dans les réserves privées du Sabi Sand, Timbavati, Manyeleti. Safaris en 4x4 ouverts, rangers et pisteurs dédiés.",
    },
    {
      name: "Hermanus et la Whale Coast",
      img: baleinesHermanus,
      description:
        "À 2 h du Cap, l'un des meilleurs spots d'observation des baleines au monde. De juin à novembre, les baleines franches australes viennent mettre bas dans la baie. Forêts de fynbos, vignobles côtiers.",
    },
    {
      name: "La Panorama Route et le Blyde River Canyon",
      img: blydeCanyon,
      description:
        "Trait d'union entre Johannesburg et le Kruger. Troisième plus grand canyon du monde, God's Window, Bourke's Luck Potholes. Spectaculaire et accessible.",
    },
  ],

  practical: {
    visa:
      "Pas de visa requis pour les ressortissants français, belges et suisses pour un séjour de moins de 90 jours. Passeport valide au moins 30 jours après la date de sortie du territoire, avec au moins deux pages vierges. Pour les voyageurs avec enfants mineurs, un acte de naissance non-abrégé peut être demandé à l'entrée — nous vous accompagnons sur les démarches.",
    health:
      "Vaccin contre la fièvre jaune obligatoire uniquement si vous arrivez d'une zone à risque. Vaccins de base recommandés à jour (DTP, hépatites). Traitement antipaludéen conseillé pour les régions du nord-est (Kruger, Limpopo) en saison des pluies. Eau du robinet potable dans les grandes villes. Système de santé de qualité dans les centres urbains.",
    money:
      "Rand sud-africain (ZAR). 1 € ≈ 20 ZAR (variable). Cartes bancaires acceptées partout (hôtels, restaurants, stations-service, supermarchés). Distributeurs faciles à trouver. Prévoyez du cash pour les pourboires et les marchés. Le pays est une bonne destination rapport qualité-prix par rapport à d'autres safaris africains.",
    flights:
      "Vols directs Paris — Johannesburg avec Air France (environ 11 h). Vols Paris — Cape Town avec une escale (Doha, Istanbul, Amsterdam, Dubaï). De nombreuses options de compagnies. Nous gérons pour vous l'intégralité de la billetterie internationale dans le cadre de votre devis, en optimisant horaires, escales et stop-overs éventuels.",
    timezone:
      "GMT+2 toute l'année. 1 h de plus qu'en France en hiver, pas de décalage en été. Aucun jet-lag majeur — vous êtes opérationnel dès le premier jour.",
    language:
      "Anglais et afrikaans largement parlés. 11 langues officielles au total (zoulou, xhosa, sotho...). Nos partenaires sur place — guides, rangers, hôtels — sont anglophones ; certains lodges proposent des guides francophones sur demande. Notre experte locale Laurie est francophone.",
    safety:
      "Pays globalement sûr pour les voyageurs encadrés. Précautions classiques en ville (Johannesburg, certains quartiers de Cape Town la nuit) : ne pas marcher seul après la tombée du jour, éviter de montrer des objets de valeur. Routes en très bon état, conduite à gauche. Nos circuits sont conçus pour garantir votre sécurité à chaque étape, avec chauffeur ou véhicule de location selon votre profil.",
    tips:
      "Pourboires usuels : 10-15 % au restaurant si le service n'est pas inclus, 5-10 USD/jour pour le chauffeur, 10-20 USD/jour pour le ranger et le pisteur en safari, 2-5 USD pour le porteur. Tenue safari (couleurs neutres : beige, kaki, marron) recommandée pour les game drives. Pull et veste pour les sorties matinales et les soirées en altitude.",
  },

  faq: [
    {
      q: "Peut-on combiner safari, ville et mer en Afrique du Sud ?",
      a: "Oui, c'est même ce qui fait la force de l'Afrique du Sud : vous pouvez faire un safari premium dans le Kruger ou le Sabi Sand, explorer la région du Cap et vous détendre sur la côte de la Garden Route en un seul voyage, sans longue distance en avion. C'est l'une des destinations africaines les plus polyvalentes et accessibles pour combiner plusieurs expériences en un séjour de 12 à 18 jours.",
    },
    {
      q: "Est-ce une destination adaptée aux amateurs de vin et de gastronomie ?",
      a: "Absolument. La région du Cap est célèbre pour ses vins renommés (Stellenbosch, Franschhoek, Constantia) et sa scène gastronomique créative et abordable. Babylonstoren, Tokara, Boschendal, Delaire Graff : autant de domaines d'exception où l'on déjeune dans les vignes, dort sur place, déguste en cave. Une étape idéale pour les épicuriens et les voyages de noces.",
    },
    {
      q: "Que voir en Afrique du Sud en 10 jours ?",
      a: "En 10 jours, vous pouvez explorer Cape Town et la péninsule, la route des vins, puis partir vers le parc Kruger pour 3 nuits de safari premium. C'est le format idéal pour une première découverte. Nous créons des circuits équilibrés entre nature, culture et détente, adaptés à votre rythme. Discutons-en avec un de nos experts.",
    },
    {
      q: "Peut-on faire un voyage en famille en Afrique du Sud ?",
      a: "L'Afrique du Sud est l'une des meilleures destinations africaines pour les familles : safaris adaptés aux enfants (lodges family-friendly avec programmes Ranger Kids), plages, manchots à Boulders Beach, fermes pédagogiques, excursions ludiques. Distances en avion courtes, infrastructure de qualité, sécurité globale. Nous concevons des voyages en famille où chaque moment est pensé pour petits et grands.",
    },
    {
      q: "Quel est le meilleur parc pour un safari en Afrique du Sud ?",
      a: "Le parc Kruger est le plus célèbre, immense et riche en faune. Nous recommandons particulièrement les réserves privées attenantes (Sabi Sand, Timbavati, Manyeleti) pour des safaris sans foule, en 4x4 ouverts, avec ranger et pisteur dédiés. Pilanesberg ou Madikwe (accessibles depuis Johannesburg) sont également d'excellents choix. Notre équipe vous conseille selon vos envies (Big Five, confort, accessibilité).",
    },
    {
      q: "Quel circuit pour un premier voyage en Afrique du Sud ?",
      a: "Pour une première fois, combinez Cape Town, la route des vins, la Garden Route et un safari dans le Kruger ou au Sabi Sand. C'est un condensé parfait de paysages variés, de gastronomie, et de nature sauvage. Comptez 12 à 16 jours pour un rythme confortable. La Voyagerie conçoit des circuits entièrement sur mesure selon vos attentes.",
    },
    {
      q: "Quelle est la différence entre les niveaux de safari ?",
      a: "Niveau 1 — Safari d'ambiance : quelques opportunités d'observation, expérience centrée sur les paysages (Namibie, Afrique du Sud côtière, Ouganda hors gorilles). Niveau 2 — Safari équilibré : safaris bien présents combinés à d'autres expériences (Afrique du Sud Kruger, Ouganda avec gorilles, Zambie, Zimbabwe). Niveau 3 — Safari intensif : l'animal au cœur du voyage (Tanzanie, Kenya, Botswana). L'Afrique du Sud Kruger est en niveau 2.",
    },
    {
      q: "Où voir des manchots en Afrique du Sud ?",
      a: "Le meilleur endroit pour voir les manchots africains est Boulders Beach, près du Cap. Cette plage est célèbre pour sa colonie de manchots vivant en liberté, que l'on approche depuis des passerelles aménagées. Une excursion incontournable pour petits et grands que nous intégrons dans nos circuits sur la péninsule.",
    },
    {
      q: "Peut-on combiner l'Afrique du Sud avec une autre destination ?",
      a: "Oui, de nombreux voyageurs combinent l'Afrique du Sud avec la Namibie pour ses paysages désertiques, les chutes Victoria au Zimbabwe ou en Zambie, ou le Botswana pour le delta de l'Okavango. La Voyagerie organise ces extensions sur mesure selon vos envies, en optimisant les vols intérieurs et les transitions.",
    },
    {
      q: "Est-ce que l'Afrique du Sud est adaptée à un voyage de noces ?",
      a: "Absolument. Safari en lodge intime (Singita, Royal Malewane), route des vins, plages sauvages, hôtels de charme face à l'océan (Ellerman House, Tintswalo Atlantic) : l'Afrique du Sud offre un mélange parfait de luxe, d'aventure et de moments à deux. Nous créons des lunes de miel uniques et inoubliables.",
    },
    {
      q: "Peut-on conduire facilement en Afrique du Sud ?",
      a: "On roule à gauche, mais la conduite est globalement fluide hors grandes villes. De nombreux voyageurs choisissent de louer une voiture sur la Garden Route — c'est le road trip parfait. Pour Johannesburg ou la péninsule, nous proposons aussi des circuits avec chauffeur-guide selon votre aisance. Nous adaptons la formule à votre profil.",
    },
    {
      q: "Quelle est la meilleure région à visiter en Afrique du Sud ?",
      a: "Chaque région offre une facette unique : le Western Cape pour Cape Town, les vignobles et la péninsule, la Garden Route pour la côte, le Kruger et le Mpumalanga pour les safaris, le KwaZulu-Natal pour la culture zouloue et les plages de l'océan Indien. Nos experts vous aident à construire un itinéraire personnalisé selon vos envies.",
    },
    {
      q: "Peut-on voir les Big Five en Afrique du Sud ?",
      a: "Oui, c'est l'un des seuls pays où les Big Five (lion, léopard, éléphant, buffle, rhinocéros) sont observables dans plusieurs parcs. Le Sabi Sand est particulièrement réputé pour le léopard — l'un des meilleurs spots au monde. Nous concevons pour vous les meilleures réserves privées ou publiques selon vos attentes et votre budget.",
    },
    {
      q: "L'Afrique du Sud est-elle une destination durable ?",
      a: "Oui, de plus en plus de lodges (andBeyond, Singita, Grootbos), guides et réserves s'engagent dans l'écotourisme, la conservation de la faune (programmes anti-braconnage), et le soutien aux communautés locales. Nous privilégions systématiquement les partenaires responsables dans nos circuits.",
    },
    {
      q: "Pourquoi passer par une agence comme La Voyagerie ?",
      a: "Parce que l'Afrique du Sud est un pays riche en options, où le bon dosage entre safari, ville, vignobles et côte fait toute la différence. Nous testons chaque adresse, travaillons en direct avec Laurie (notre experte à Cape Town) et nos partenaires triés sur le volet. Vous gagnez du temps, de la sérénité, et l'assurance que chaque étape a été choisie pour vous — pas pour le tour-opérateur. Un seul interlocuteur, expert de la destination, du devis au retour à la maison.",
    },
  ],

  galleryImgs: [tableMountain, krugerLions, gardenRoute, stellenboschVignobles, capeBonneEsperance, baleinesHermanus, blydeCanyon],

  parallaxBands: {
    afterIntro: krugerLions,
    afterWhenToGo: gardenRoute,
    afterRegions: capeBonneEsperance,
  },

  pullQuote: {
    text: "L'Afrique du Sud ne se résume pas — elle se traverse. Dans la lumière dorée du Sabi Sand qui caresse le pelage d'un léopard, dans la brume matinale qui s'accroche à Table Mountain, dans le silence d'une plage déserte de la Garden Route. Un pays-monde, condensé en un seul voyage.",
    author: "Laurie — notre experte Afrique du Sud, à Cape Town",
  },

  ctaBackground: krugerLions,
};

// Photo héro principale (utilisée comme img dans destinations.ts)
export const afriqueDuSudHero = heroAfsud;
