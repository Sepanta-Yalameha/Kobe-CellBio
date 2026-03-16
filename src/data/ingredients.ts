// ==================================================
// FLAVOUR FIREKEEPER: INGREDIENT DATABASE
// ==================================================

import type { Ingredient, PrepMethod, PrepModifier } from '../types';

// ==================================================
// MANDATORY INGREDIENTS (Must appear in all rounds)
// ==================================================

export const MANDATORY_INGREDIENTS: Ingredient[] = [
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    category: 'garden',
    emoji: '🎃',
    description: 'Sweet, earthy squash with caramelization potential. Sacred harvest symbol.',
    isMandatory: true,
    baseProfile: {
      sweetness: 6,
      sourness: 1,
      bitterness: 1,
      saltiness: 0,
      umami: 2,
      aromaIntensity: 5,
      fatRichness: 1,
    },
    volatility: 6,
    textureContribution: 'Creamy when cooked, fibrous raw',
    sodiumDependence: 3,
    primaryTastePathways: ['sweet'],
    aromaRelevant: true,
    color: '#E67E22',
  },
  {
    id: 'egg',
    name: 'Egg',
    category: 'meadow',
    emoji: '🥚',
    description: 'Complete protein with rich sulfur aromas. Binding and enrichment.',
    isMandatory: true,
    baseProfile: {
      sweetness: 0,
      sourness: 0,
      bitterness: 0,
      saltiness: 1,
      umami: 6,
      aromaIntensity: 4,
      fatRichness: 7,
    },
    volatility: 5,
    textureContribution: 'Binding, enriching, foaming',
    sodiumDependence: 4,
    primaryTastePathways: ['umami'],
    aromaRelevant: true,
    color: '#F5DEB3',
  },
  {
    id: 'blackberry',
    name: 'Blackberry',
    category: 'woods',
    emoji: '🫐',
    description: 'Tart-sweet berry with complex volatile aromatics. Wild-gathered treasure.',
    isMandatory: true,
    baseProfile: {
      sweetness: 5,
      sourness: 6,
      bitterness: 2,
      saltiness: 0,
      umami: 0,
      aromaIntensity: 8,
      fatRichness: 0,
    },
    volatility: 9,
    textureContribution: 'Juicy, seedy, burst texture',
    sodiumDependence: 0,
    primaryTastePathways: ['sweet', 'sour'],
    aromaRelevant: true,
    color: '#4A235A',
  },
  {
    id: 'walnut',
    name: 'Walnut',
    category: 'woods',
    emoji: '🌰',
    description: 'Rich, slightly bitter nut with brain-like appearance. Toasting reveals depth.',
    isMandatory: true,
    baseProfile: {
      sweetness: 2,
      sourness: 0,
      bitterness: 4,
      saltiness: 0,
      umami: 3,
      aromaIntensity: 5,
      fatRichness: 8,
    },
    volatility: 6,
    textureContribution: 'Crunchy, meaty',
    sodiumDependence: 2,
    primaryTastePathways: ['bitter', 'umami'],
    aromaRelevant: true,
    color: '#8B4513',
  },
  {
    id: 'wild-rice',
    name: 'Wild Rice',
    category: 'water',
    emoji: '🌾',
    description: 'Nutty aquatic grain, sacred to Great Lakes peoples. Earthy foundation.',
    isMandatory: true,
    baseProfile: {
      sweetness: 1,
      sourness: 0,
      bitterness: 1,
      saltiness: 0,
      umami: 4,
      aromaIntensity: 4,
      fatRichness: 1,
    },
    volatility: 4,
    textureContribution: 'Chewy, substantial',
    sodiumDependence: 5,
    primaryTastePathways: ['umami'],
    aromaRelevant: true,
    color: '#2C1810',
  },
];

// ==================================================
// SUPPORT INGREDIENTS
// ==================================================

export const SUPPORT_INGREDIENTS: Ingredient[] = [
  {
    id: 'maple-sugar',
    name: 'Maple Sugar',
    category: 'woods',
    emoji: '🍁',
    description: 'Concentrated tree sap sweetness with caramel notes.',
    isMandatory: false,
    baseProfile: {
      sweetness: 10,
      sourness: 0,
      bitterness: 0,
      saltiness: 0,
      umami: 1,
      aromaIntensity: 7,
      fatRichness: 0,
    },
    volatility: 7,
    textureContribution: 'Crystalline, dissolving',
    sodiumDependence: 0,
    primaryTastePathways: ['sweet'],
    aromaRelevant: true,
    color: '#D4A574',
  },
  {
    id: 'honey',
    name: 'Wildflower Honey',
    category: 'meadow',
    emoji: '🍯',
    description: 'Complex floral sweetness from meadow blossoms.',
    isMandatory: false,
    baseProfile: {
      sweetness: 9,
      sourness: 1,
      bitterness: 0,
      saltiness: 0,
      umami: 0,
      aromaIntensity: 8,
      fatRichness: 0,
    },
    volatility: 8,
    textureContribution: 'Viscous, coating',
    sodiumDependence: 0,
    primaryTastePathways: ['sweet'],
    aromaRelevant: true,
    color: '#FFD700',
  },
  {
    id: 'sunflower-oil',
    name: 'Sunflower Oil',
    category: 'meadow',
    emoji: '🌻',
    description: 'Light, neutral oil for cooking and richness.',
    isMandatory: false,
    baseProfile: {
      sweetness: 0,
      sourness: 0,
      bitterness: 0,
      saltiness: 0,
      umami: 0,
      aromaIntensity: 1,
      fatRichness: 9,
    },
    volatility: 2,
    textureContribution: 'Lubricating, coating',
    sodiumDependence: 0,
    primaryTastePathways: ['fatty'],
    aromaRelevant: false,
    color: '#F4D03F',
  },
  {
    id: 'corn',
    name: 'Corn',
    category: 'garden',
    emoji: '🌽',
    description: 'Sweet, starchy grain central to many traditions.',
    isMandatory: false,
    baseProfile: {
      sweetness: 5,
      sourness: 0,
      bitterness: 0,
      saltiness: 0,
      umami: 2,
      aromaIntensity: 4,
      fatRichness: 1,
    },
    volatility: 5,
    textureContribution: 'Crunchy or creamy',
    sodiumDependence: 4,
    primaryTastePathways: ['sweet'],
    aromaRelevant: true,
    color: '#F4D03F',
  },
  {
    id: 'onion',
    name: 'Wild Onion',
    category: 'garden',
    emoji: '🧅',
    description: 'Pungent bulb that sweetens with cooking.',
    isMandatory: false,
    baseProfile: {
      sweetness: 3,
      sourness: 1,
      bitterness: 2,
      saltiness: 0,
      umami: 4,
      aromaIntensity: 7,
      fatRichness: 0,
    },
    volatility: 8,
    textureContribution: 'Crunchy raw, soft cooked',
    sodiumDependence: 3,
    primaryTastePathways: ['umami', 'sweet'],
    aromaRelevant: true,
    color: '#DDA15E',
  },
  {
    id: 'garlic',
    name: 'Wild Garlic',
    category: 'garden',
    emoji: '🧄',
    description: 'Intense allium with pungent sulfur compounds.',
    isMandatory: false,
    baseProfile: {
      sweetness: 2,
      sourness: 0,
      bitterness: 2,
      saltiness: 0,
      umami: 5,
      aromaIntensity: 9,
      fatRichness: 0,
    },
    volatility: 9,
    textureContribution: 'Pungent, mellowing',
    sodiumDependence: 2,
    primaryTastePathways: ['umami'],
    aromaRelevant: true,
    color: '#F5F5DC',
  },
  {
    id: 'apple-cider-vinegar',
    name: 'Apple Cider Vinegar',
    category: 'garden',
    emoji: '🍎',
    description: 'Fermented apple acidity with fruity undertones.',
    isMandatory: false,
    baseProfile: {
      sweetness: 1,
      sourness: 9,
      bitterness: 0,
      saltiness: 0,
      umami: 1,
      aromaIntensity: 6,
      fatRichness: 0,
    },
    volatility: 7,
    textureContribution: 'Thin, brightening',
    sodiumDependence: 0,
    primaryTastePathways: ['sour'],
    aromaRelevant: true,
    color: '#D4A574',
  },
  {
    id: 'water',
    name: 'Spring Water',
    category: 'water',
    emoji: '💧',
    description: 'Pure foundation for cooking and dilution.',
    isMandatory: false,
    baseProfile: {
      sweetness: 0,
      sourness: 0,
      bitterness: 0,
      saltiness: 0,
      umami: 0,
      aromaIntensity: 0,
      fatRichness: 0,
    },
    volatility: 0,
    textureContribution: 'Liquid medium',
    sodiumDependence: 0,
    primaryTastePathways: [],
    aromaRelevant: false,
    color: '#87CEEB',
  },
  {
    id: 'sage',
    name: 'Wild Sage',
    category: 'meadow',
    emoji: '🌿',
    description: 'Aromatic herb with earthy, slightly bitter notes.',
    isMandatory: false,
    baseProfile: {
      sweetness: 0,
      sourness: 0,
      bitterness: 3,
      saltiness: 0,
      umami: 1,
      aromaIntensity: 8,
      fatRichness: 0,
    },
    volatility: 9,
    textureContribution: 'Leafy, velvety',
    sodiumDependence: 1,
    primaryTastePathways: ['bitter'],
    aromaRelevant: true,
    color: '#9DC183',
  },
  {
    id: 'cedar',
    name: 'Cedar Tips',
    category: 'woods',
    emoji: '🌲',
    description: 'Aromatic wood notes for smoking and infusion.',
    isMandatory: false,
    baseProfile: {
      sweetness: 0,
      sourness: 0,
      bitterness: 2,
      saltiness: 0,
      umami: 0,
      aromaIntensity: 9,
      fatRichness: 0,
    },
    volatility: 10,
    textureContribution: 'Aromatic only',
    sodiumDependence: 0,
    primaryTastePathways: [],
    aromaRelevant: true,
    color: '#2D5A3D',
  },
  {
    id: 'salt',
    name: 'Sea Salt',
    category: 'water',
    emoji: '🧂',
    description: 'Essential mineral for taste enhancement.',
    isMandatory: false,
    baseProfile: {
      sweetness: 0,
      sourness: 0,
      bitterness: 0,
      saltiness: 10,
      umami: 0,
      aromaIntensity: 0,
      fatRichness: 0,
    },
    volatility: 0,
    textureContribution: 'Crystalline',
    sodiumDependence: 0,
    primaryTastePathways: ['salt'],
    aromaRelevant: false,
    color: '#FFFFFF',
  },
  {
    id: 'duck-fat',
    name: 'Duck Fat',
    category: 'skies',
    emoji: '🦆',
    description: 'Rich, savory fat for deep flavor.',
    isMandatory: false,
    baseProfile: {
      sweetness: 0,
      sourness: 0,
      bitterness: 0,
      saltiness: 1,
      umami: 5,
      aromaIntensity: 5,
      fatRichness: 10,
    },
    volatility: 4,
    textureContribution: 'Rich, coating',
    sodiumDependence: 2,
    primaryTastePathways: ['fatty', 'umami'],
    aromaRelevant: true,
    color: '#F5DEB3',
  },
  {
    id: 'juniper',
    name: 'Juniper Berries',
    category: 'woods',
    emoji: '🫒',
    description: 'Piney, slightly bitter berries with gin-like aroma.',
    isMandatory: false,
    baseProfile: {
      sweetness: 1,
      sourness: 1,
      bitterness: 4,
      saltiness: 0,
      umami: 0,
      aromaIntensity: 9,
      fatRichness: 0,
    },
    volatility: 9,
    textureContribution: 'Small, aromatic',
    sodiumDependence: 0,
    primaryTastePathways: ['bitter'],
    aromaRelevant: true,
    color: '#4B0082',
  },
  {
    id: 'fish',
    name: 'Lake Trout',
    category: 'water',
    emoji: '🐟',
    description: 'Fresh water fish with delicate flavor.',
    isMandatory: false,
    baseProfile: {
      sweetness: 0,
      sourness: 0,
      bitterness: 0,
      saltiness: 2,
      umami: 7,
      aromaIntensity: 5,
      fatRichness: 5,
    },
    volatility: 6,
    textureContribution: 'Flaky, tender',
    sodiumDependence: 5,
    primaryTastePathways: ['umami'],
    aromaRelevant: true,
    color: '#C0C0C0',
  },
];

// ==================================================
// ALL INGREDIENTS
// ==================================================

export const ALL_INGREDIENTS: Ingredient[] = [...MANDATORY_INGREDIENTS, ...SUPPORT_INGREDIENTS];

// ==================================================
// PREPARATION MODIFIERS
// ==================================================

export const PREP_MODIFIERS: Record<PrepMethod, PrepModifier> = {
  raw: {
    method: 'raw',
    flavorChanges: {},
    description: 'No heat treatment - natural state',
  },
  roast: {
    method: 'roast',
    flavorChanges: {
      sweetness: 2,
      aromaIntensity: 3,
    },
    bitternessRiskIncrease: 2,
    aromaBoost: 3,
    description: 'Dry heat caramelization',
  },
  boil: {
    method: 'boil',
    flavorChanges: {
      aromaIntensity: -2,
    },
    aromaBoost: -2,
    description: 'Wet heat in water',
  },
  simmer: {
    method: 'simmer',
    flavorChanges: {
      umami: 1,
      aromaIntensity: 1,
    },
    aromaBoost: 1,
    description: 'Gentle wet heat extraction',
  },
  toast: {
    method: 'toast',
    flavorChanges: {
      sweetness: 1,
      aromaIntensity: 4,
    },
    bitternessRiskIncrease: 3,
    aromaBoost: 4,
    description: 'Dry heat for nuts and seeds',
  },
  mash: {
    method: 'mash',
    flavorChanges: {
      aromaIntensity: -1,
    },
    description: 'Physical breakdown',
  },
  whisk: {
    method: 'whisk',
    flavorChanges: {
      aromaIntensity: 1,
    },
    description: 'Aeration and emulsion',
  },
  caramelize: {
    method: 'caramelize',
    flavorChanges: {
      sweetness: 3,
      aromaIntensity: 4,
    },
    bitternessRiskIncrease: 4,
    aromaBoost: 4,
    description: 'Sugar browning reaction',
  },
  ferment: {
    method: 'ferment',
    flavorChanges: {
      sourness: 3,
      umami: 2,
      aromaIntensity: 3,
    },
    aromaBoost: 3,
    description: 'Microbial transformation',
  },
  smoke: {
    method: 'smoke',
    flavorChanges: {
      aromaIntensity: 5,
    },
    bitternessRiskIncrease: 1,
    aromaBoost: 5,
    description: 'Wood smoke infusion',
  },
};

// ==================================================
// HELPER FUNCTIONS
// ==================================================

export function getIngredientById(id: string): Ingredient | undefined {
  return ALL_INGREDIENTS.find(ing => ing.id === id);
}

export function getIngredientsByCategory(category: Ingredient['category']): Ingredient[] {
  return ALL_INGREDIENTS.filter(ing => ing.category === category);
}

export function getMandatoryIngredients(): Ingredient[] {
  return ALL_INGREDIENTS.filter(ing => ing.isMandatory);
}

export function applyPrepModifier(
  baseProfile: Ingredient['baseProfile'],
  prepMethod: PrepMethod
): Ingredient['baseProfile'] {
  const modifier = PREP_MODIFIERS[prepMethod];
  const newProfile = { ...baseProfile };
  
  for (const [key, change] of Object.entries(modifier.flavorChanges)) {
    const profileKey = key as keyof typeof newProfile;
    if (profileKey in newProfile && typeof change === 'number') {
      newProfile[profileKey] = Math.max(0, Math.min(10, newProfile[profileKey] + change));
    }
  }
  
  // Apply bitterness risk
  if (modifier.bitternessRiskIncrease) {
    newProfile.bitterness = Math.min(10, newProfile.bitterness + modifier.bitternessRiskIncrease);
  }
  
  return newProfile;
}

export function calculateCombinedProfile(
  preparedIngredients: { ingredient: Ingredient; prepMethod: PrepMethod; quantity: number }[]
): Ingredient['baseProfile'] {
  if (preparedIngredients.length === 0) {
    return {
      sweetness: 0,
      sourness: 0,
      bitterness: 0,
      saltiness: 0,
      umami: 0,
      aromaIntensity: 0,
      fatRichness: 0,
    };
  }
  
  const totalQuantity = preparedIngredients.reduce((sum, pi) => sum + pi.quantity, 0);
  const combined: Ingredient['baseProfile'] = {
    sweetness: 0,
    sourness: 0,
    bitterness: 0,
    saltiness: 0,
    umami: 0,
    aromaIntensity: 0,
    fatRichness: 0,
  };
  
  for (const pi of preparedIngredients) {
    const modifiedProfile = applyPrepModifier(pi.ingredient.baseProfile, pi.prepMethod);
    const weight = pi.quantity / totalQuantity;
    
    for (const key of Object.keys(combined) as (keyof typeof combined)[]) {
      combined[key] += modifiedProfile[key] * weight;
    }
  }
  
  // Round values
  for (const key of Object.keys(combined) as (keyof typeof combined)[]) {
    combined[key] = Math.round(combined[key] * 10) / 10;
  }
  
  return combined;
}
