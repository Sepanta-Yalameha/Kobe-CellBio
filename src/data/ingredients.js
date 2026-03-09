// All game ingredients with taste profiles, receptor data, and cultural context
const INGREDIENTS = [
  {
    id: 'walnuts',
    name: 'Walnuts',
    emoji: '🥜',
    category: 'nut',
    culturalContext:
      'Walnuts have been gathered and used by Indigenous peoples across North America for centuries. Black walnuts were prized for their rich flavor and used in stews, breads, and ceremonial foods. The nuts were often processed by cracking with stones and boiling to extract oils.',
    tasteProfile: {
      sweet: 0.2,
      sour: 0,
      bitter: 0.5,
      umami: 0.6,
      salty: 0.1,
    },
    smellCompounds: [
      { name: '2-Methylbutanal', description: 'Nutty, warm aroma' },
      { name: 'Hexanal', description: 'Green, grassy scent' },
      { name: 'Nonanal', description: 'Waxy, citrus-like aroma' },
    ],
    receptorsActivated: [
      {
        receptor: 'TAS2R (bitter GPCRs)',
        type: 'bitter',
        description: 'Bitter taste from tannins in walnut skin',
      },
      {
        receptor: 'TAS1R1/TAS1R3',
        type: 'umami',
        description: 'Umami from glutamate in walnut proteins',
      },
    ],
    molecularDetails: {
      tastants: ['Tannins', 'Glutamate', 'Fatty acids'],
      pathways: ['bitter', 'umami'],
    },
    cookingMethods: ['raw', 'roasted', 'crushed', 'oil-pressed'],
    color: '#8B6914',
    bgGradient: 'from-amber-800 to-amber-600',
  },
  {
    id: 'blackberries',
    name: 'Blackberries',
    emoji: '🫐',
    category: 'berry',
    culturalContext:
      'Blackberries hold deep significance for many Indigenous nations. The Kwakiutl, Salish, and many Pacific Northwest peoples harvested wild blackberries as a staple food, drying them into cakes for winter or mixing them with animal fats for pemmican. They were also used medicinally for digestive health.',
    tasteProfile: {
      sweet: 0.6,
      sour: 0.5,
      bitter: 0.2,
      umami: 0,
      salty: 0,
    },
    smellCompounds: [
      { name: 'Linalool', description: 'Floral, lavender-like aroma' },
      { name: 'β-Ionone', description: 'Sweet, violet-like scent' },
      { name: 'Furaneol', description: 'Caramel, strawberry aroma' },
    ],
    receptorsActivated: [
      {
        receptor: 'TAS1R2/TAS1R3',
        type: 'sweet',
        description: 'Sweet detection from natural sugars (fructose & glucose)',
      },
      {
        receptor: 'OTOP1 proton channel',
        type: 'sour',
        description: 'Sour detection from citric and malic acids',
      },
    ],
    molecularDetails: {
      tastants: ['Fructose', 'Glucose', 'Citric acid', 'Malic acid', 'Anthocyanins'],
      pathways: ['sweet', 'sour'],
    },
    cookingMethods: ['raw', 'mashed', 'boiled', 'dried'],
    color: '#4A0E4E',
    bgGradient: 'from-purple-900 to-purple-700',
  },
  {
    id: 'purple-rice',
    name: 'Purple Rice',
    emoji: '🍚',
    category: 'grain',
    culturalContext:
      'Wild rice (manoomin) is sacred to the Anishinaabe people and central to their cultural identity. Purple and dark rice varieties have been cultivated by Indigenous peoples in the Americas and Asia. The grain represents sustenance, community, and the relationship between people and the land.',
    tasteProfile: {
      sweet: 0.3,
      sour: 0,
      bitter: 0.1,
      umami: 0.4,
      salty: 0,
    },
    smellCompounds: [
      { name: '2-Acetyl-1-pyrroline', description: 'Nutty, popcorn-like aroma' },
      { name: 'Hexanal', description: 'Fresh, green scent' },
      { name: 'Vanillin', description: 'Warm, vanilla note' },
    ],
    receptorsActivated: [
      {
        receptor: 'TAS1R2/TAS1R3',
        type: 'sweet',
        description: 'Mild sweetness from starch breakdown',
      },
      {
        receptor: 'TAS1R1/TAS1R3',
        type: 'umami',
        description: 'Umami from amino acids released during cooking',
      },
    ],
    molecularDetails: {
      tastants: ['Starch → maltose', 'Amino acids', 'Anthocyanins'],
      pathways: ['sweet', 'umami'],
    },
    cookingMethods: ['boiled', 'steamed', 'toasted', 'ground'],
    color: '#4B0082',
    bgGradient: 'from-indigo-900 to-indigo-700',
  },
  {
    id: 'squash',
    name: 'Squash / Pumpkin',
    emoji: '🎃',
    category: 'vegetable',
    culturalContext:
      'Squash is one of the "Three Sisters" alongside corn and beans — a foundational agricultural system of the Haudenosaunee (Iroquois) and many other Indigenous nations. These three crops are planted together in a symbiotic relationship. Squash provides ground cover, corn provides a trellis for beans, and beans fix nitrogen for all three.',
    tasteProfile: {
      sweet: 0.7,
      sour: 0,
      bitter: 0.1,
      umami: 0.3,
      salty: 0,
    },
    smellCompounds: [
      { name: 'β-Carotene derivatives', description: 'Earthy, warm aroma' },
      { name: 'Geraniol', description: 'Sweet, rose-like scent' },
      { name: 'Linalool', description: 'Floral, delicate aroma' },
    ],
    receptorsActivated: [
      {
        receptor: 'TAS1R2/TAS1R3',
        type: 'sweet',
        description: 'Strong sweet detection from natural sugars when roasted',
      },
      {
        receptor: 'TAS1R1/TAS1R3',
        type: 'umami',
        description: 'Mild umami from amino acids in flesh',
      },
    ],
    molecularDetails: {
      tastants: ['Sucrose', 'Glucose', 'Glutamate', 'β-Carotene'],
      pathways: ['sweet', 'umami'],
    },
    cookingMethods: ['roasted', 'boiled', 'mashed', 'dried'],
    color: '#E67E22',
    bgGradient: 'from-orange-600 to-orange-400',
  },
  {
    id: 'wild-herbs',
    name: 'Wild Herbs & Roots',
    emoji: '🌿',
    category: 'herb',
    culturalContext:
      'Wild herbs and roots are foundational to Indigenous medicine and cuisine. Sage, sweetgrass, cedar, and wild mint have ceremonial and medicinal purposes. Root vegetables like wild turnip (timpsula) were staples of Plains nations. These ingredients connect food, medicine, and spirituality.',
    tasteProfile: {
      sweet: 0.1,
      sour: 0.2,
      bitter: 0.7,
      umami: 0.3,
      salty: 0.1,
    },
    smellCompounds: [
      { name: 'Thujone', description: 'Sharp, camphor-like (sage)' },
      { name: 'Menthol', description: 'Cool, minty aroma' },
      { name: 'Coumarin', description: 'Sweet, hay-like (sweetgrass)' },
    ],
    receptorsActivated: [
      {
        receptor: 'TAS2R (bitter GPCRs)',
        type: 'bitter',
        description: 'Strong bitter detection from alkaloids and terpenes',
      },
      {
        receptor: 'TRPV1 / TRPA1',
        type: 'sour',
        description: 'Chemesthetic sensations (cooling from menthol, warmth from certain roots)',
      },
    ],
    molecularDetails: {
      tastants: ['Terpenes', 'Alkaloids', 'Phenolic compounds', 'Essential oils'],
      pathways: ['bitter', 'sour'],
    },
    cookingMethods: ['fresh', 'dried', 'brewed', 'smoked'],
    color: '#27AE60',
    bgGradient: 'from-green-700 to-green-500',
  },
  {
    id: 'maple-syrup',
    name: 'Maple Syrup',
    emoji: '🍁',
    category: 'sweetener',
    culturalContext:
      'Maple syrup harvesting was taught by Indigenous peoples across northeastern North America. The Anishinaabe, Haudenosaunee, and Abenaki peoples developed the techniques of tapping maple trees and boiling sap. The "sugar moon" (Ziisbaakdoke Giizis) marks the maple harvesting season.',
    tasteProfile: {
      sweet: 0.9,
      sour: 0,
      bitter: 0.1,
      umami: 0.2,
      salty: 0,
    },
    smellCompounds: [
      { name: 'Maple furanone', description: 'Rich, caramel maple aroma' },
      { name: 'Vanillin', description: 'Warm vanilla note' },
      { name: 'Cyclotene', description: 'Sweet, maple-like scent' },
    ],
    receptorsActivated: [
      {
        receptor: 'TAS1R2/TAS1R3',
        type: 'sweet',
        description: 'Intense sweet receptor activation from sucrose',
      },
    ],
    molecularDetails: {
      tastants: ['Sucrose', 'Organic acids', 'Amino acids'],
      pathways: ['sweet'],
    },
    cookingMethods: ['drizzled', 'boiled', 'reduced', 'infused'],
    color: '#D4731A',
    bgGradient: 'from-amber-700 to-amber-500',
  },
  {
    id: 'bison',
    name: 'Bison Meat',
    emoji: '🥩',
    category: 'protein',
    culturalContext:
      'Bison (buffalo) sustained Plains Indigenous nations for millennia. Every part of the animal was used — meat for food, hides for shelter, bones for tools. Bison represents abundance, respect, and the deep connection between Indigenous peoples and the land. Pemmican, made from dried bison meat, berries, and fat, was a key preserved food.',
    tasteProfile: {
      sweet: 0,
      sour: 0,
      bitter: 0.1,
      umami: 0.9,
      salty: 0.3,
    },
    smellCompounds: [
      { name: 'Maillard reaction products', description: 'Rich, meaty aroma when cooked' },
      { name: '2-Methyl-3-furanthiol', description: 'Savory, roasted meat scent' },
      { name: 'Dimethyl sulfide', description: 'Earthy, cooked meat note' },
    ],
    receptorsActivated: [
      {
        receptor: 'TAS1R1/TAS1R3',
        type: 'umami',
        description: 'Strong umami from glutamate and IMP in meat',
      },
      {
        receptor: 'ENaC channel',
        type: 'salty',
        description: 'Salt detection from Na⁺ in meat',
      },
    ],
    molecularDetails: {
      tastants: ['Glutamate', 'Inosine monophosphate (IMP)', 'NaCl', 'Free amino acids'],
      pathways: ['umami', 'salty'],
    },
    cookingMethods: ['grilled', 'smoked', 'dried', 'stewed'],
    color: '#8B0000',
    bgGradient: 'from-red-900 to-red-700',
  },
  {
    id: 'corn',
    name: 'Corn / Maize',
    emoji: '🌽',
    category: 'grain',
    culturalContext:
      'Corn (maize) is one of the "Three Sisters" and was first domesticated by Indigenous peoples in Mexico over 9,000 years ago. It spread throughout the Americas and became central to the cultures, ceremonies, and diets of hundreds of Indigenous nations. Nixtamalization, the process of treating corn with alkali, was an Indigenous innovation that increases nutritional value.',
    tasteProfile: {
      sweet: 0.5,
      sour: 0,
      bitter: 0,
      umami: 0.3,
      salty: 0.1,
    },
    smellCompounds: [
      { name: 'Dimethyl sulfide', description: 'Sweet, cooked corn aroma' },
      { name: '2-Acetyl-1-pyrroline', description: 'Popcorn-like scent' },
      { name: 'Vanillin', description: 'Warm, vanilla undertone' },
    ],
    receptorsActivated: [
      {
        receptor: 'TAS1R2/TAS1R3',
        type: 'sweet',
        description: 'Sweet taste from natural sugars in corn',
      },
      {
        receptor: 'TAS1R1/TAS1R3',
        type: 'umami',
        description: 'Umami from glutamate released during nixtamalization',
      },
    ],
    molecularDetails: {
      tastants: ['Sucrose', 'Glucose', 'Glutamate', 'Starch'],
      pathways: ['sweet', 'umami'],
    },
    cookingMethods: ['boiled', 'roasted', 'ground', 'nixtamalized'],
    color: '#F4D03F',
    bgGradient: 'from-yellow-500 to-yellow-300',
  },
];

export default INGREDIENTS;
