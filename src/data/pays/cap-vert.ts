import type { DetailedPays } from "@/data/destinations";

// === Photos Cap-Vert (Unsplash, prises au Cap-Vert, IDs vérifiés) ===
const heroCapVert =
  "https://images.unsplash.com/photo-1586724596969-bb771d938d70?auto=format&fit=crop&w=2400&q=80"; // côte volcanique du Cap-Vert
const santoAntaoTrek =
  "https://images.unsplash.com/photo-1672856181212-b5b5a0065a08?auto=format&fit=crop&w=1800&q=80"; // ocean & mountains - Santo Antão
const mindeloVille =
  "https://images.unsplash.com/photo-1514837665181-c9df4b3ab70e?auto=format&fit=crop&w=1800&q=80"; // taxi & palmier - Mindelo
const boaVistaPlage =
  "https://images.unsplash.com/photo-1592761684665-92bc9aacf340?auto=format&fit=crop&w=1800&q=80"; // palmier sur plage - Boa Vista
const salSalines =
  "https://images.unsplash.com/photo-1617173883936-9f118045ad7a?auto=format&fit=crop&w=1800&q=80"; // vue aérienne mer turquoise - Sal
const picoFogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Pico_do_Fogo_%284%29.jpg/1280px-Pico_do_Fogo_%284%29.jpg"; // volcan Pico do Fogo (Wikimedia Commons)
const pecheursAtlantique =
  "https://images.unsplash.com/photo-1609930109976-41dbee6132b2?auto=format&fit=crop&w=1800&q=80"; // barque de pêche - Cap-Vert
const plageDeserte =
  "https://images.unsplash.com/photo-1592761855671-33347cb2f7bb?auto=format&fit=crop&w=1800&q=80"; // palmier & océan
const dunesAtlantiques =
  "https://images.unsplash.com/photo-1524207874394-5ec7c8c8e1a6?auto=format&fit=crop&w=1800&q=80"; // dunes de sable - Boa Vista
const baleinesPlongee =
  "https://images.unsplash.com/photo-1545403842-6b8149e2759e?auto=format&fit=crop&w=1800&q=80"; // océan profond
const cidadeVelha =
  "https://images.unsplash.com/photo-1564076263935-fa4e59894f24?auto=format&fit=crop&w=1800&q=80"; // femmes capverdiennes - culture
const mornaMusique =
  "https://images.unsplash.com/photo-1678285327371-c387b149a206?auto=format&fit=crop&w=1800&q=80"; // scène de vie sur la plage

// === Hôtels & pousadas (Unsplash, esprit & ambiance proches) ===
const hotelHilltop =
  "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?auto=format&fit=crop&w=1800&q=80";
const hotelPestanaTropico =
  "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1800&q=80";
const hotelMorabeza =
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1800&q=80";
const quintaMontanha =
  "https://images.unsplash.com/photo-1567593810070-7a3d471af022?auto=format&fit=crop&w=1800&q=80";
const pedrasDoMar =
  "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1800&q=80";
const casaCavoquinho =
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1800&q=80";
const foyaBranca =
  "https://images.unsplash.com/photo-1583900985737-6d0495555783?auto=format&fit=crop&w=1800&q=80";
const pousadaTarrafal =
  "https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1800&q=80";

// === Pool d'images par région ===
const STEP_POOL_BY_REGION: Record<string, string[]> = {
  Vol: [heroCapVert],
  "Santiago": [cidadeVelha, mindeloVille, pecheursAtlantique],
  "Praia": [cidadeVelha, hotelPestanaTropico],
  "Cidade Velha": [cidadeVelha],
  "São Vicente": [mindeloVille, mornaMusique, foyaBranca],
  "Mindelo": [mindeloVille, mornaMusique],
  "Santo Antão": [santoAntaoTrek, quintaMontanha, plageDeserte],
  "Sal": [salSalines, boaVistaPlage, pedrasDoMar, hotelMorabeza],
  "Santa Maria": [boaVistaPlage, pedrasDoMar],
  "Boa Vista": [boaVistaPlage, dunesAtlantiques, plageDeserte, hotelHilltop],
  "Fogo": [picoFogo, casaCavoquinho],
  "São Filipe": [casaCavoquinho, cidadeVelha],
  "Chã das Caldeiras": [picoFogo],
  "Brava": [plageDeserte, santoAntaoTrek],
  "Maio": [boaVistaPlage, pecheursAtlantique],
  "Tarrafal": [pousadaTarrafal, plageDeserte],
  "Atlantique": [baleinesPlongee, pecheursAtlantique],
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

export const capVertDetailed: DetailedPays = {
  metaTitle: "Voyage sur mesure Cap-Vert | Îles, Trek & Plages | La Voyagerie",
  metaDescription:
    "Voyage sur mesure au Cap-Vert par notre agence spécialiste : trek à Santo Antão, musique morna à Mindelo, plages désertes de Boa Vista et Sal, ascension du volcan Pico do Fogo. Pousadas de charme.",

  longIntro: [
    "Dix îles posées dans l'Atlantique, à 500 km au large du Sénégal. Le Cap-Vert n'est pas une destination — c'est un archipel-monde, où chaque île est un pays à elle seule. Les crêtes vertigineuses de Santo Antão tombent dans l'océan en escaliers de pierre cultivés depuis cinq siècles. Mindelo, sur São Vicente, bat au rythme de la morna et des cafés-concerts. Boa Vista déroule des plages désertes de dunes blanches, où les tortues caouanes viennent pondre l'été venu. Et puis il y a Fogo, l'île-volcan, où l'on dort dans la caldeira d'un cône actif, sur un sol noir comme la nuit. Le Cap-Vert se choisit pour sa diversité — et pour cette douceur créole qui n'appartient qu'à lui.",
    "Chez La Voyagerie, agence spécialiste du Cap-Vert, nous concevons chaque circuit sur mesure avec nos partenaires capverdiens installés à Mindelo et à Praia. Nous ne vendons aucun forfait standard, aucun hôtel-club. Nos itinéraires combinent les îles avec justesse — Santo Antão pour la randonnée, São Vicente pour la culture, Sal ou Boa Vista pour le farniente, Fogo pour l'aventure volcanique. Nous travaillons avec des guides francophones, des pousadas familiales, des tables locales et nous orchestrons les vols inter-îles avec précision (TACV, ferry rapide entre Mindelo et Santo Antão).",
    "Une lune de miel entre trek vertigineux et plage sauvage. Une famille avec enfants pour découvrir un archipel sans danger, à taille humaine. Quinze jours pour vraiment prendre le temps des trois îles essentielles. Quel que soit votre projet, nous le composons à votre rythme, dans le respect du pays et de ses habitants. Votre Cap-Vert, et rien d'autre. Construisons-le ensemble.",
  ],

  whyVisit: [
    {
      title: "Le trek à Santo Antão",
      text: "Santo Antão est l'une des plus belles îles de randonnée au monde. Vallées verdoyantes plantées en terrasses, crêtes acérées suspendues au-dessus de l'océan, villages perchés accessibles uniquement à pied. Le trek du Paúl à Ponta do Sol, ou la traversée de Cova à Ribeira Grande, sont des expériences inoubliables — entre paysages d'Asie et atmosphère atlantique.",
      img: santoAntaoTrek,
    },
    {
      title: "Mindelo et la culture morna",
      text: "Mindelo, sur l'île de São Vicente, est la capitale culturelle du Cap-Vert. Berceau de Cesária Évora et de la morna (musique mélancolique inscrite à l'UNESCO), la ville vibre au rythme des cafés-concerts, des marchés colorés et des terrasses face à la baie. Un soir au Pedacinho ou au Café Mindelo, et l'âme cap-verdienne se livre.",
      img: mornaMusique,
    },
    {
      title: "Le volcan Pico do Fogo",
      text: "L'île de Fogo est dominée par son cône volcanique actif, le Pico do Fogo (2 829 m). On peut dormir dans la caldeira de Chã das Caldeiras, au pied du volcan, dans un village reconstruit après l'éruption de 2014. Ascension à l'aube (4 à 5 h de marche dans la cendre noire), panorama à 360° sur l'Atlantique au sommet. Une aventure brute et magnifique.",
      img: picoFogo,
    },
    {
      title: "Les plages désertes de Boa Vista",
      text: "Boa Vista est l'île la plus africaine de l'archipel : dunes blanches qui descendent jusqu'à la mer, plages de 18 km totalement vierges (Praia de Santa Mónica, Praia de Chaves), petits villages de pêcheurs colorés. C'est aussi l'un des principaux sites de ponte des tortues caouanes (juin à octobre).",
      img: boaVistaPlage,
    },
    {
      title: "L'île de Sal — détente et plongée",
      text: "Sal est l'île la plus touristique du Cap-Vert, mais hors des grands resorts, on découvre encore un Cap-Vert authentique : salines de Pedra de Lume au cœur d'un cratère, plages de Santa Maria, sites de plongée parmi les meilleurs d'Afrique de l'Ouest (épaves, raies manta de septembre à novembre). Idéale pour un séjour balnéaire en début ou fin de circuit.",
      img: salSalines,
    },
    {
      title: "Cidade Velha — première ville coloniale d'Afrique",
      text: "À 15 km de Praia, Cidade Velha (Ribeira Grande de Santiago) est la première ville coloniale construite par les Européens dans les tropiques. Inscrite à l'UNESCO, elle abrite une cathédrale en ruines, un fort portugais et un pilori sombrement célèbre — vestige de la traite. Une étape essentielle pour comprendre l'histoire du Cap-Vert et de l'Atlantique.",
      img: cidadeVelha,
    },
    {
      title: "Les villages créoles de Santiago",
      text: "Santiago est la plus grande île, le berceau historique du peuple cap-verdien. Ici se mélangent les héritages portugais et africains : marché d'Assomada, villages rastas de Tarrafal, batuque (musique traditionnelle des femmes), cachupa (plat national à base de maïs et de haricots). Une immersion culturelle profonde, loin des plages.",
      img: pecheursAtlantique,
    },
    {
      title: "L'observation des baleines à bosse",
      text: "De mars à mai, les baleines à bosse migrent entre les Caraïbes et les eaux capverdiennes pour mettre bas. Sorties en bateau possibles depuis Boa Vista, Sal et São Vicente. Tortues caouanes, dauphins, raies manta et requins-baleines complètent ce ballet océanique. Le Cap-Vert est l'une des nouvelles destinations d'observation marine en plein essor.",
      img: baleinesPlongee,
    },
    {
      title: "La douceur de vivre créole",
      text: "« No stress » est la devise capverdienne, et c'est sans doute la première chose qui frappe : la lenteur joyeuse des journées, la chaleur des rencontres, la musique partout, le mélange paisible des peuples. Le Cap-Vert n'a connu ni guerre ni instabilité, et c'est l'un des pays les plus sûrs d'Afrique. On en revient apaisé, presque transformé.",
      img: mindeloVille,
    },
  ],

  whenToGo: {
    summary:
      "Le Cap-Vert se visite quasiment toute l'année grâce à son climat sec, doux et tempéré par les alizés. La meilleure période s'étend d'octobre à juin : températures agréables (22 à 28 °C), vent constant idéal pour les sports nautiques (kite-surf, planche à voile), ciel dégagé. De juillet à septembre, il fait plus chaud et plus humide, avec quelques pluies brèves — c'est la saison de ponte des tortues à Boa Vista. La saison des baleines à bosse va de mars à mai, celle des raies manta autour de Sal de septembre à novembre. Pour la randonnée à Santo Antão, évitez les mois les plus humides (août-septembre) ; novembre à mai sont parfaits.",
    months: [
      { month: "Jan", recommandation: "ideal", note: "Sec et doux, idéal trek & plage" },
      { month: "Fév", recommandation: "ideal", note: "Carnaval de Mindelo (mythique)" },
      { month: "Mar", recommandation: "ideal", note: "Début saison baleines à bosse" },
      { month: "Avr", recommandation: "ideal", note: "Lumière magnifique, alizés doux" },
      { month: "Mai", recommandation: "ideal", note: "Pleine saison baleines, vent stable" },
      { month: "Juin", recommandation: "bonne", note: "Début saison chaude" },
      { month: "Juil", recommandation: "moyenne", note: "Chaud, brumes de chaleur" },
      { month: "Août", recommandation: "moyenne", note: "Saison humide brève, ponte tortues" },
      { month: "Sep", recommandation: "moyenne", note: "Quelques pluies, raies manta arrivent" },
      { month: "Oct", recommandation: "ideal", note: "Retour de la belle saison" },
      { month: "Nov", recommandation: "ideal", note: "Idéal trek Santo Antão" },
      { month: "Déc", recommandation: "ideal", note: "Sec, doux, fêtes capverdiennes" },
    ],
  },

  lodges: [
    {
      name: "Hotel Pestana Tropico",
      region: "Praia (Santiago)",
      description:
        "Adresse référence de la capitale, idéalement située face à la mer et à 5 min du centre historique. Chambres lumineuses avec vue océan, piscine, restaurant gastronomique. Base parfaite pour découvrir Cidade Velha et l'intérieur de Santiago.",
      highlights: ["Vue Atlantique", "Centre de Praia à pied", "Piscine et spa"],
      img: hotelPestanaTropico,
    },
    {
      name: "Foya Branca Resort",
      region: "São Vicente — São Pedro",
      description:
        "À 15 min de Mindelo, sur la plage de São Pedro, complexe intime de bungalows blancs face à l'Atlantique. Piscine à débordement, restaurant de poissons frais, base idéale pour rayonner sur São Vicente et embarquer pour Santo Antão (ferry à Mindelo).",
      highlights: ["Plage privée São Pedro", "Proche Mindelo", "Cuisine de poissons"],
      img: foyaBranca,
    },
    {
      name: "Quinta da Montanha",
      region: "Santo Antão — Ribeira Grande",
      description:
        "Pousada perchée au cœur des vallées vertes de Santo Antão, dans un ancien domaine agricole. Bungalows en pierre, jardin tropical, table d'hôtes à base de produits du potager. Idéal pour les randonneurs, à l'écart des bourgs.",
      highlights: ["Cœur des vallées vertes", "Table farm-to-table", "Esprit pousada familiale"],
      img: quintaMontanha,
    },
    {
      name: "Hotel Morabeza",
      region: "Sal — Santa Maria",
      description:
        "Adresse historique de Santa Maria, sur la plage la plus emblématique de Sal. Bungalows blancs au cœur d'un jardin tropical, plusieurs piscines, restaurants ouverts sur l'océan. Service feutré, esprit familial — l'une des meilleures adresses de Sal.",
      highlights: ["Plage de Santa Maria", "Jardin tropical", "Esprit hôtel-jardin"],
      img: hotelMorabeza,
    },
    {
      name: "Pedras do Mar Resort & Spa",
      region: "Sal — Santa Maria",
      description:
        "Resort intime en bord de mer, à l'écart de l'agitation de Santa Maria. Suites contemporaines avec terrasse face à l'océan, spa, plage privée. Idéal pour les voyages de noces ou un séjour balnéaire de qualité.",
      highlights: ["Spa face à l'océan", "Plage privée", "Suites avec terrasse"],
      img: pedrasDoMar,
    },
    {
      name: "Hotel Riu Touareg",
      region: "Boa Vista — Praia de Chaves",
      description:
        "Sur l'une des plus belles plages de Boa Vista, complexe intégré à un environnement de dunes sauvages. Chambres face à l'Atlantique, plusieurs restaurants, accès direct à 5 km de plage déserte. Idéal en extension détente après un circuit.",
      highlights: ["18 km de plage vierge", "Dunes sauvages", "Plusieurs restaurants"],
      img: hotelHilltop,
    },
    {
      name: "Casa Marisa (Chã das Caldeiras)",
      region: "Fogo — Chã das Caldeiras",
      description:
        "Pousada familiale au pied du volcan Pico do Fogo, dans le village reconstruit après l'éruption de 2014. Chambres simples mais chaleureuses, repas traditionnels (cachupa, vin local), base pour l'ascension du volcan au lever du jour.",
      highlights: ["Au pied du volcan", "Vin de Chã (unique)", "Ascension à l'aube"],
      img: casaCavoquinho,
    },
    {
      name: "Pousada de Tarrafal",
      region: "Santiago — Tarrafal",
      description:
        "Au nord de Santiago, dans le village rasta de Tarrafal, pousada simple posée face à l'une des plus belles plages de l'île. Cuisine familiale, atmosphère bohème, idéal pour une fin de circuit reposante loin des resorts.",
      highlights: ["Plage de Tarrafal", "Atmosphère bohème", "Cuisine familiale"],
      img: pousadaTarrafal,
    },
  ],

  itineraires: [
    {
      slug: "essentiel-cap-vert-10-jours",
      title: "Essentiel Cap-Vert",
      duration: "10 jours / 8 nuits",
      level: "Découverte douce",
      priceFrom: "À partir de 2 490 € / personne",
      pitch:
        "Trois îles, trois ambiances : Santiago pour l'histoire, São Vicente et Santo Antão pour la culture et le trek, Sal pour la plage. Un premier voyage idéal pour saisir la diversité de l'archipel, à un rythme accessible.",
      coverImg: santoAntaoTrek,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Praia", region: "Vol", description: "Départ de France à destination de Praia (vol direct TAP via Lisbonne, ou vol direct Air France selon saison). Arrivée en soirée, transfert à l'hôtel, dîner libre face à l'océan." },
        { day: "Jour 2", title: "Praia et Cidade Velha", region: "Cidade Velha", description: "Matinée au marché de Sucupira, l'un des plus colorés d'Afrique de l'Ouest. Après-midi à Cidade Velha, première ville coloniale d'Afrique (UNESCO) : cathédrale en ruines, fort portugais, pilori. Dîner au bord de l'eau." },
        { day: "Jour 3", title: "Vol vers Mindelo", region: "Mindelo", description: "Vol intérieur (TACV) vers São Vicente. Installation à Mindelo, découverte de la ville colorée : marché aux poissons, mercado municipal, rues pavées. Soirée concert dans un café-concert (Pedacinho ou Café Mindelo) — l'âme de la morna." },
        { day: "Jour 4", title: "Mindelo et São Pedro", region: "Mindelo", description: "Matinée libre à Mindelo (musée d'art africain, ateliers d'artistes). Déjeuner à São Pedro, dans un petit restaurant de pêcheurs. Après-midi détente sur la plage de Laginha ou randonnée au Monte Verde (panorama sur la baie)." },
        { day: "Jour 5", title: "Ferry vers Santo Antão", region: "Santo Antão", description: "Traversée en ferry rapide (1 h) vers Porto Novo. Accueil par votre guide francophone, route panoramique de la Corda jusqu'à Ribeira Grande. Installation dans votre pousada au cœur des vallées vertes." },
        { day: "Jour 6", title: "Trek du Paúl à Ponta do Sol", region: "Santo Antão", description: "La plus belle randonnée de Santo Antão : descente de la vallée du Paúl (cultures en terrasses, palmiers, cannes à sucre, rhumeries artisanales) jusqu'à Vila das Pombas, puis longe-côte spectaculaire jusqu'à Ponta do Sol. Environ 5 h de marche, dénivelé modéré." },
        { day: "Jour 7", title: "Retour à Mindelo et vol pour Sal", region: "Sal", description: "Ferry retour vers Mindelo, puis vol intérieur vers Sal. Installation à Santa Maria, première soirée sur la plage la plus emblématique de l'île." },
        { day: "Jour 8", title: "Sal — détente et excursions", region: "Sal", description: "Journée à votre rythme : plage, plongée, kite-surf, ou excursion aux salines de Pedra de Lume (bain salin dans le cratère d'un ancien volcan), au Buracona (piscine naturelle) et au marché aux poissons de Palmeira." },
        { day: "Jour 9", title: "Sal — dernière journée et vol retour", region: "Sal", description: "Matinée libre sur la plage. Vol international en fin de journée vers la France (via Lisbonne ou direct selon saison)." },
        { day: "Jour 10", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Les rythmes de la morna restent dans la tête longtemps après le retour." },
      ]),
    },
    {
      slug: "cap-vert-randonnee-12-jours",
      title: "Cap-Vert — Trek & Volcan",
      duration: "12 jours / 10 nuits",
      level: "Randonnée active",
      priceFrom: "À partir de 3 290 € / personne",
      pitch:
        "Pour les marcheurs et amoureux de paysages bruts : Santo Antão et ses vallées vertigineuses, Fogo et l'ascension du volcan Pico, et une fin reposante sur la plage. Le Cap-Vert dans toute son intensité géologique.",
      coverImg: picoFogo,
      heroImg: santoAntaoTrek,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Praia", region: "Vol", description: "Départ de France vers Praia." },
        { day: "Jour 2", title: "Vol pour Mindelo", region: "Mindelo", description: "Arrivée à Praia, connexion immédiate vers São Vicente. Installation à Mindelo, première soirée musicale dans un café-concert." },
        { day: "Jour 3", title: "Ferry vers Santo Antão", region: "Santo Antão", description: "Traversée vers Porto Novo, route panoramique de la Corda, installation à Ribeira Grande au cœur des vallées." },
        { day: "Jour 4", title: "Trek Cova — Ribeira Grande", region: "Santo Antão", description: "Descente spectaculaire depuis le cratère de Cova (1 100 m) jusqu'à Ribeira Grande : crêtes vertigineuses, vallées en terrasses, villages perchés. Environ 6 h de marche, fort dénivelé négatif." },
        { day: "Jour 5", title: "Trek Paúl — Ponta do Sol", region: "Santo Antão", description: "Descente de la vallée du Paúl jusqu'à la côte, puis longe-côte jusqu'à Ponta do Sol. 5 h de marche, dénivelé modéré, déjeuner dans une rhumerie artisanale." },
        { day: "Jour 6", title: "Trek Chã de Igreja — Cruzinha", region: "Santo Antão", description: "Une des randonnées les plus reculées de l'île : traversée du nord, villages accessibles uniquement à pied, falaises vertigineuses sur l'Atlantique. 6 à 7 h de marche, niveau soutenu." },
        { day: "Jour 7", title: "Retour à Mindelo et vol pour Fogo", region: "Fogo", description: "Ferry vers Mindelo, vol intérieur vers Fogo (via Praia). Arrivée à São Filipe, ville coloniale aux façades colorées. Installation et premier coucher de soleil sur le volcan." },
        { day: "Jour 8", title: "Montée à Chã das Caldeiras", region: "Chã das Caldeiras", description: "Route spectaculaire jusqu'à la caldeira du volcan (1 700 m), au pied du Pico do Fogo. Installation dans une pousada du village reconstruit après l'éruption de 2014. Visite des coulées de lave et des vignes de Chã (oui, on cultive la vigne ici, dans la cendre)." },
        { day: "Jour 9", title: "Ascension du Pico do Fogo", region: "Chã das Caldeiras", description: "Départ avant l'aube (4 h de marche dans la cendre noire) pour atteindre le sommet du Pico (2 829 m) au lever du soleil. Panorama à 360° sur l'Atlantique. Descente en glissade dans la cendre (rapide et grisante). Repos l'après-midi." },
        { day: "Jour 10", title: "Retour São Filipe et vol pour Sal", region: "Sal", description: "Descente vers São Filipe, vol vers Sal en milieu de journée. Installation à Santa Maria, repos bien mérité sur la plage." },
        { day: "Jour 11", title: "Sal — détente et vol retour", region: "Sal", description: "Matinée libre sur la plage. Vol international en fin de journée." },
        { day: "Jour 12", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Les jambes lourdes, la tête pleine d'horizons." },
      ]),
    },
    {
      slug: "cap-vert-famille-11-jours",
      title: "Cap-Vert en famille",
      duration: "11 jours / 9 nuits",
      level: "Famille (enfants 6 ans et +)",
      priceFrom: "À partir de 2 690 € / personne",
      pitch:
        "Un Cap-Vert à hauteur d'enfant : plages sûres de Sal et Boa Vista, observation des tortues caouanes en saison, balades douces à Santo Antão, marché animé de Mindelo. Un premier voyage en Afrique idéal pour les familles.",
      coverImg: boaVistaPlage,
      steps: enrichSteps([
        { day: "Jour 1", title: "Vol pour Sal", region: "Vol", description: "Départ de France vers Sal, vol direct (TUI, Transavia ou TAP selon saison). Arrivée à Santa Maria, installation à l'hôtel face à la plage." },
        { day: "Jour 2", title: "Sal — découverte de Santa Maria", region: "Sal", description: "Journée plage et exploration de Santa Maria : marché aux poissons sur la jetée, balade dans les rues colorées, baignade dans une eau à 24 °C." },
        { day: "Jour 3", title: "Excursion salines et Buracona", region: "Sal", description: "Excursion aux salines de Pedra de Lume (bain salin dans un cratère, expérience ludique), au Buracona (piscine naturelle), aux dunes de Terra Boa. Déjeuner dans un village de pêcheurs." },
        { day: "Jour 4", title: "Ferry vers Boa Vista", region: "Boa Vista", description: "Traversée en ferry rapide (1 h) vers Boa Vista, l'île aux dunes. Installation près de la plage de Chaves ou Santa Mónica. Première soirée sur l'une des plus belles plages d'Afrique." },
        { day: "Jour 5", title: "Boa Vista — désert et tortues (saison)", region: "Boa Vista", description: "Excursion en 4x4 dans le désert de Viana (dunes blanches sahariennes), déjeuner dans un village créole. De juin à octobre : sortie nocturne sur la plage de Ervatão pour observer la ponte des tortues caouanes (encadrée par une ONG locale)." },
        { day: "Jour 6", title: "Boa Vista — plages et détente", region: "Boa Vista", description: "Journée libre à votre rythme : 18 km de plage déserte à explorer, baignade, quad ou cheval pour les plus aventureux. Coucher de soleil sur les dunes." },
        { day: "Jour 7", title: "Vol pour Mindelo", region: "Mindelo", description: "Vol intérieur vers São Vicente. Découverte de Mindelo en famille : marché coloré, mercado de peixe, balade sur l'avenue Marginal. Soirée concert en famille (les enfants adorent la musique cap-verdienne)." },
        { day: "Jour 8", title: "Excursion d'une journée à Santo Antão", region: "Santo Antão", description: "Ferry tôt le matin vers Porto Novo. Route panoramique en 4x4 jusqu'à Cova, balade familiale dans la vallée du Paúl (chemins accessibles aux enfants), déjeuner chez l'habitant. Ferry retour à Mindelo en fin de journée." },
        { day: "Jour 9", title: "Mindelo — journée libre", region: "Mindelo", description: "Détente à Mindelo : plage de Laginha, déjeuner de fruits de mer à São Pedro, après-midi piscine ou musée d'art africain." },
        { day: "Jour 10", title: "Vol retour", region: "Vol", description: "Vol intérieur vers Praia ou Sal pour la connexion internationale. Vol de nuit vers la France." },
        { day: "Jour 11", title: "Arrivée en France", region: "Vol", description: "Arrivée à Paris. Les enfants demandent déjà quand on repart." },
      ]),
    },
  ],

  regions: [
    {
      name: "Santiago — l'île historique",
      img: cidadeVelha,
      description:
        "La plus grande île, berceau historique du peuple cap-verdien. Praia, capitale animée, Cidade Velha (première ville coloniale d'Afrique, UNESCO), villages créoles de l'intérieur, plage de Tarrafal au nord.",
    },
    {
      name: "São Vicente et Mindelo",
      img: mindeloVille,
      description:
        "Capitale culturelle du Cap-Vert. Mindelo et sa baie de Porto Grande, marchés colorés, café-concerts où vit la morna. Berceau de Cesária Évora, hub culturel de l'archipel.",
    },
    {
      name: "Santo Antão — l'île verte",
      img: santoAntaoTrek,
      description:
        "L'île des randonneurs. Vallées vertigineuses cultivées en terrasses, crêtes acérées, villages perchés. L'une des plus belles destinations de trek au monde, à 1 h de ferry de Mindelo.",
    },
    {
      name: "Sal — plages et plongée",
      img: salSalines,
      description:
        "L'île la plus touristique, mais aussi la plus accessible. Plages de Santa Maria, salines de Pedra de Lume au cœur d'un cratère, plongées sur épaves et raies manta (septembre-novembre).",
    },
    {
      name: "Boa Vista — l'île aux dunes",
      img: boaVistaPlage,
      description:
        "L'île la plus africaine, aux paysages sahariens. Dunes blanches, plages désertes de 18 km, villages de pêcheurs colorés. Site majeur de ponte des tortues caouanes (juin à octobre).",
    },
    {
      name: "Fogo — l'île-volcan",
      img: picoFogo,
      description:
        "Une île dominée par son volcan actif, le Pico do Fogo (2 829 m). Caldeira de Chã où l'on dort au pied du cône, vignobles uniques cultivés dans la cendre, ascension à l'aube. Une aventure géologique unique.",
    },
  ],

  practical: {
    visa:
      "Pas de visa requis pour les ressortissants français, belges et suisses pour un séjour touristique de moins de 30 jours, mais une taxe touristique (TSA) de 30 € est due à l'arrivée — elle peut être pré-réglée en ligne avant le départ (formulaire EASE). Passeport valide au moins 6 mois après la date d'entrée. Pour les enfants mineurs voyageant sans un parent, autorisation de sortie de territoire à fournir.",
    health:
      "Aucun vaccin obligatoire (sauf fièvre jaune si vous arrivez d'une zone à risque). Vaccins de base recommandés à jour. Pas de paludisme dans l'archipel. Eau du robinet déconseillée — préférez l'eau en bouteille. Système de santé correct à Praia et Mindelo, plus limité dans les îles secondaires. Assurance rapatriement recommandée.",
    money:
      "Escudo cap-verdien (CVE). 1 € ≈ 110 CVE (taux fixe). Euros largement acceptés dans les hôtels et restaurants touristiques. Cartes bancaires acceptées dans les villes (Praia, Mindelo, Santa Maria). Distributeurs présents sur toutes les îles habitées. Prévoyez du cash en CVE pour les marchés et les pourboires.",
    flights:
      "Vols directs depuis Lisbonne (TAP, plusieurs vols par jour) et depuis Paris en saison (TAP via Lisbonne, ou vols directs charters TUI / Transavia vers Sal et Boa Vista). Comptez 6 à 7 h depuis Paris. À l'intérieur de l'archipel, les vols intérieurs sont opérés par TACV (Bestfly) — réservation à l'avance recommandée. Ferry rapide Mindelo — Porto Novo (Santo Antão), 1 h de traversée.",
    timezone:
      "GMT-1. 2 h de moins qu'en France en hiver, 3 h de moins en été. Décalage très facile à gérer.",
    language:
      "Portugais (langue officielle) et créole capverdien (parlé partout). Anglais et français parlés dans les zones touristiques et par les guides. Nos guides locaux sont francophones.",
    safety:
      "L'un des pays les plus sûrs d'Afrique et d'Atlantique. Pas de conflit, démocratie stable depuis 1991. Prudence usuelle dans les centres-villes (Praia, Mindelo) le soir. Aucune zone à éviter. Idéal pour un premier voyage en Afrique et pour les familles.",
    tips:
      "Pourboires bienvenus mais non obligatoires (5 à 10 % au restaurant, 1-2 € pour les guides). Tenue décontractée toute l'année. Crème solaire indispensable (soleil très fort, vent qui masque la chaleur). Chaussures de marche pour Santo Antão et Fogo. Vent constant : prévoyez un coupe-vent même en été. Goûtez la cachupa (plat national), le grogue (rhum local) et le vin de Chã (rare et délicieux).",
  },

  faq: [
    {
      q: "Quelle est la meilleure période pour voyager au Cap-Vert ?",
      a: "D'octobre à juin pour des températures agréables (22-28 °C), un ciel dégagé et des alizés constants. La saison des baleines à bosse s'étend de mars à mai. La ponte des tortues caouanes se fait de juin à octobre à Boa Vista. Le carnaval de Mindelo (février) est l'un des plus beaux d'Afrique de l'Ouest.",
    },
    {
      q: "Combien d'îles visiter en un seul voyage ?",
      a: "Pour un premier voyage, nous recommandons 2 à 3 îles en 10-12 jours : Santiago (histoire) ou Sal (plage), São Vicente / Santo Antão (culture et trek), et éventuellement Boa Vista ou Fogo. Vouloir tout faire fatigue et ne laisse pas le temps de s'imprégner de l'esprit créole.",
    },
    {
      q: "Le Cap-Vert est-il adapté aux familles ?",
      a: "Oui, c'est l'une des meilleures destinations pour un premier voyage en Afrique en famille : pas de paludisme, pas de vaccins obligatoires, faible décalage horaire, sécurité totale, accueil chaleureux. Sal et Boa Vista sont idéales pour les enfants (plages sûres, eau chaude). Santo Antão est accessible aux ados marcheurs.",
    },
    {
      q: "Peut-on randonner facilement au Cap-Vert ?",
      a: "Oui, Santo Antão est une destination de trek mondialement reconnue. Plusieurs niveaux de difficulté, de la balade familiale dans la vallée du Paúl au trek soutenu de Chã de Igreja. Toujours avec un guide local francophone (sentiers parfois mal balisés). Fogo offre l'ascension exceptionnelle du Pico do Fogo, plus exigeante.",
    },
    {
      q: "Quel budget prévoir pour un voyage sur mesure au Cap-Vert ?",
      a: "Comptez entre 2 500 et 3 500 € par personne pour un circuit de 10-12 jours avec vols, hébergements en pousadas et hôtels de charme, vols intérieurs et guides francophones. Plus haut pour les hôtels signature (Pestana, Pedras do Mar) et les extensions Fogo.",
    },
    {
      q: "Y a-t-il un risque sanitaire au Cap-Vert ?",
      a: "Très faible. Pas de paludisme, pas de fièvre jaune, eau potable hors zones rurales (préférez l'eau en bouteille). Les vaccins de base à jour (DTP, hépatites) suffisent. Le Cap-Vert est l'une des destinations africaines les plus sûres sur le plan sanitaire.",
    },
    {
      q: "Peut-on observer les baleines et les tortues ?",
      a: "Oui, c'est l'une des spécialités du Cap-Vert. Baleines à bosse de mars à mai (sorties en bateau depuis Sal, Boa Vista et São Vicente). Ponte des tortues caouanes de juin à octobre, principalement à Boa Vista et Sal — sorties nocturnes encadrées par des ONG de conservation. Raies manta autour de Sal de septembre à novembre.",
    },
    {
      q: "Le Cap-Vert est-il intéressant pour les amateurs de musique ?",
      a: "Absolument. Mindelo est la capitale de la morna (inscrite à l'UNESCO), berceau de Cesária Évora. Cafés-concerts tous les soirs, festivals (Baía das Gatas en août, Festival do Mindelo en avril). Le carnaval de Mindelo en février est mythique. La musique est partout, dans chaque village.",
    },
    {
      q: "Quels sont les vols pour le Cap-Vert ?",
      a: "Vols directs depuis Lisbonne (TAP, plusieurs vols par jour). Depuis la France, soit TAP via Lisbonne (6-7 h au total), soit vols directs charters TUI / Transavia vers Sal et Boa Vista en haute saison. Les vols intérieurs sont opérés par TACV (Bestfly) — réservation à l'avance vivement recommandée.",
    },
    {
      q: "Pourquoi passer par une agence pour le Cap-Vert ?",
      a: "Parce que la logistique inter-îles est subtile (vols intérieurs limités, horaires changeants, ferry), que les meilleurs guides francophones sont rares et qu'il faut connaître les pousadas familiales authentiques pour éviter les hôtels-clubs sans âme. Notre équipe a testé l'archipel et travaille en direct avec nos partenaires capverdiens. Un seul interlocuteur, expert, du devis au retour.",
    },
  ],

  galleryImgs: [santoAntaoTrek, mindeloVille, boaVistaPlage, picoFogo, salSalines, cidadeVelha, mornaMusique],

  parallaxBands: {
    afterIntro: santoAntaoTrek,
    afterWhenToGo: boaVistaPlage,
    afterRegions: mindeloVille,
  },

  pullQuote: {
    text: "Le Cap-Vert n'est ni l'Afrique, ni le Portugal, ni le Brésil — il est tout cela à la fois, fondu dans une langue, une musique et une douceur qui n'appartiennent qu'à lui. « No stress », disent les Capverdiens. C'est sans doute le plus beau résumé du voyage qui vous attend.",
    author: "Notre équipe spécialiste Cap-Vert",
  },

  ctaBackground: santoAntaoTrek,
};

export const capVertHero = heroCapVert;
