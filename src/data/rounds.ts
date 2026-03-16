// ==================================================
// FLAVOUR FIREKEEPER: ROUND CONFIGURATIONS
// ==================================================

import type { RoundConfig, BiologyChallenge, HigherOrderQuestion } from '../types';
import { 
  RECEPTORS, 
  SWEET_UMAMI_BITTER_STEPS, 
  SOUR_STEPS, 
  SALT_STEPS, 
  SMELL_STEPS,
  shuffleArray 
} from './pathways';

// ==================================================
// HIGHER-ORDER QUESTIONS BANK
// ==================================================

export const HIGHER_ORDER_QUESTIONS: HigherOrderQuestion[] = [
  // Retronasal olfaction
  {
    type: 'higher_order',
    question: 'Which component of this dish is MOST likely to rely on retronasal olfaction for full flavor perception?',
    options: [
      { id: 'a', text: 'The baseline saltiness from sea salt' },
      { id: 'b', text: 'The volatile aromatics released during roasting' },
      { id: 'c', text: 'The sourness from acid' },
      { id: 'd', text: 'The basic sweetness from sugars' },
    ],
    correctOptionId: 'b',
    explanation: 'Volatile aromatics travel from the oral cavity through the nasopharynx to reach olfactory receptors during eating—this is retronasal olfaction.',
    topic: 'retronasal',
  },
  {
    type: 'higher_order',
    question: 'During chewing, how do volatile compounds from food reach your olfactory epithelium?',
    options: [
      { id: 'a', text: 'Via the cribriform plate directly' },
      { id: 'b', text: 'Through the nasopharynx (retronasal pathway)' },
      { id: 'c', text: 'Via taste receptor cells that convert them' },
      { id: 'd', text: 'Through the tongue\'s filiform papillae' },
    ],
    correctOptionId: 'b',
    explanation: 'Volatiles released during mastication travel from the oral cavity up through the nasopharynx to reach olfactory receptors—the retronasal pathway.',
    topic: 'retronasal',
  },
  // Cranial nerves
  {
    type: 'higher_order',
    question: 'Which cranial pathway contributes to the perceived "burn" or texture but is NOT classical taste?',
    options: [
      { id: 'a', text: 'CN I (Olfactory)' },
      { id: 'b', text: 'CN VII (Facial)' },
      { id: 'c', text: 'CN V (Trigeminal)' },
      { id: 'd', text: 'CN IX (Glossopharyngeal)' },
    ],
    correctOptionId: 'c',
    explanation: 'The trigeminal nerve (CN V) carries somatosensory information including texture, temperature, and chemical irritation—not taste proper.',
    topic: 'cranial_nerve',
  },
  {
    type: 'higher_order',
    question: 'Taste information from the anterior 2/3 of the tongue travels via which nerve?',
    options: [
      { id: 'a', text: 'CN V (Trigeminal)' },
      { id: 'b', text: 'CN VII (Facial) via chorda tympani' },
      { id: 'c', text: 'CN IX (Glossopharyngeal)' },
      { id: 'd', text: 'CN X (Vagus)' },
    ],
    correctOptionId: 'b',
    explanation: 'The facial nerve (CN VII) via the chorda tympani carries taste from the anterior 2/3 of the tongue.',
    topic: 'cranial_nerve',
  },
  // Brain regions
  {
    type: 'higher_order',
    question: 'Which brain region is considered the primary site for integrated FLAVOR perception (combining taste + smell + texture)?',
    options: [
      { id: 'a', text: 'Primary gustatory cortex (insula)' },
      { id: 'b', text: 'Piriform cortex' },
      { id: 'c', text: 'Orbitofrontal cortex (OFC)' },
      { id: 'd', text: 'Ventral posteromedial thalamus' },
    ],
    correctOptionId: 'c',
    explanation: 'The orbitofrontal cortex (OFC) integrates gustatory, olfactory, and somatosensory inputs to create the unified perception of flavor.',
    topic: 'brain_region',
  },
  {
    type: 'higher_order',
    question: 'Where does olfactory information first synapse in the brain?',
    options: [
      { id: 'a', text: 'Thalamus (VPM)' },
      { id: 'b', text: 'Olfactory bulb glomeruli' },
      { id: 'c', text: 'Primary gustatory cortex' },
      { id: 'd', text: 'Nucleus of the solitary tract' },
    ],
    correctOptionId: 'b',
    explanation: 'Olfactory receptor neuron axons synapse with mitral/tufted cells in the glomeruli of the olfactory bulb—unique because it bypasses thalamus initially.',
    topic: 'brain_region',
  },
  // Pathway comparisons
  {
    type: 'higher_order',
    question: 'If you reduce sodium but amplify umami and aroma, which statement is MOST accurate?',
    options: [
      { id: 'a', text: 'ENaC activation will compensate automatically' },
      { id: 'b', text: 'Flavor can be maintained via TAS1R1/R3 and olfactory pathways' },
      { id: 'c', text: 'Sour pathway will need to increase to compensate' },
      { id: 'd', text: 'Bitter receptors will become more active' },
    ],
    correctOptionId: 'b',
    explanation: 'Umami (TAS1R1/TAS1R3) and retronasal olfaction can enhance perceived savoriness even when salt (ENaC) is reduced.',
    topic: 'pathway_comparison',
  },
  {
    type: 'higher_order',
    question: 'Which receptor family would MOST likely respond if walnuts are over-toasted and become bitter?',
    options: [
      { id: 'a', text: 'TAS1R2/TAS1R3 (sweet)' },
      { id: 'b', text: 'TAS2R family (bitter)' },
      { id: 'c', text: 'OTOP1 (sour)' },
      { id: 'd', text: 'ENaC (salt)' },
    ],
    correctOptionId: 'b',
    explanation: 'The TAS2R family of bitter taste receptors (~25 members) detect a wide range of bitter compounds including those from over-roasted, burnt foods.',
    topic: 'pathway_comparison',
  },
  // Modulation
  {
    type: 'higher_order',
    question: 'Type II taste receptor cells release which neurotransmitter, and how?',
    options: [
      { id: 'a', text: 'Serotonin via vesicular release' },
      { id: 'b', text: 'ATP via CALHM/pannexin channels (non-vesicular)' },
      { id: 'c', text: 'Glutamate via synaptic vesicles' },
      { id: 'd', text: 'GABA via transporters' },
    ],
    correctOptionId: 'b',
    explanation: 'Type II cells release ATP non-vesicularly through CALHM1/3 and pannexin-type channels, distinct from conventional synaptic transmission.',
    topic: 'modulation',
  },
  {
    type: 'higher_order',
    question: 'Which distinguishes Type III (sour) cell signaling from Type II (sweet/umami/bitter) cells?',
    options: [
      { id: 'a', text: 'Type III uses GPCR signaling while Type II does not' },
      { id: 'b', text: 'Type III releases serotonin vesicularly; Type II releases ATP non-vesicularly' },
      { id: 'c', text: 'Type III has no output to afferent fibers' },
      { id: 'd', text: 'Both use identical signaling mechanisms' },
    ],
    correctOptionId: 'b',
    explanation: 'Type III cells use conventional vesicular release of serotonin, while Type II cells release ATP non-vesicularly via CALHM channels.',
    topic: 'modulation',
  },
  // Amiloride sensitivity
  {
    type: 'higher_order',
    question: 'Amiloride-sensitive salt taste primarily involves which mechanism?',
    options: [
      { id: 'a', text: 'TAS2R bitter receptor activation' },
      { id: 'b', text: 'ENaC channel blockade by amiloride' },
      { id: 'c', text: 'OTOP1 proton entry' },
      { id: 'd', text: 'PLCβ2 phospholipase activity' },
    ],
    correctOptionId: 'b',
    explanation: 'Amiloride blocks ENaC channels, reducing sodium taste perception. Amiloride-sensitive salt taste reflects ENaC-mediated detection.',
    topic: 'modulation',
  },
];

// ==================================================
// ROUND 1: GUIDED INTRODUCTION
// ==================================================

const ROUND_1: RoundConfig = {
  roundNumber: 1,
  title: 'First Light',
  description: 'Learn the basics with a simple sweet pumpkin dish',
  order: {
    id: 'round-1-order',
    roundNumber: 1,
    dishName: 'Morning Pumpkin Bowl',
    dishDescription: 'A warming, sweet pumpkin preparation to start the day',
    customerName: 'Elder Sun Walker',
    flavorGoal: {
      targetProfile: { sweetness: 7, sourness: 1, bitterness: 1, umami: 2, aromaIntensity: 6 },
      tolerance: 3,
      description: 'Bright sweetness with warm aromatic notes',
    },
    requiredIngredients: ['pumpkin'],
    maxIngredients: 4,
    biologyConstraints: [
      { type: 'require_pathway', pathways: ['sweet'], description: 'Must understand sweet taste transduction' },
    ],
    primaryPathway: 'sweet',
    secondaryPathways: ['smell'],
    basePoints: 100,
    bonusOpportunities: ['Perfect flavor match (+20)', 'All pathway steps correct (+30)'],
    timeLimit: 90,
    hints: [
      'Roasting pumpkin increases sweetness perception',
      'Sweet taste uses TAS1R2/TAS1R3 receptor heterodimers',
      'Type II taste cells release ATP as their neurotransmitter',
    ],
    hintsEnabled: true,
  },
  distractorCount: 3,
  pathwayComplexity: 1,
  partialCreditEnabled: true,
  showHigherOrderQuestion: false,
  buildPhaseTime: 60,
  biologyPhaseTime: 75,
  showTutorial: true,
  highlightedElements: ['pantry', 'prep-area', 'vessel', 'submit'],
};

// ==================================================
// ROUND 2: SWEET + SOUR SPLIT
// ==================================================

const ROUND_2: RoundConfig = {
  roundNumber: 2,
  title: 'Berry Awakening',
  description: 'Balance sweet and sour using blackberry',
  order: {
    id: 'round-2-order',
    roundNumber: 2,
    dishName: 'Blackberry Dawn Compote',
    dishDescription: 'A tart-sweet berry preparation showcasing flavor balance',
    customerName: 'River Song',
    flavorGoal: {
      targetProfile: { sweetness: 5, sourness: 5, bitterness: 1, umami: 0, aromaIntensity: 8 },
      tolerance: 2,
      description: 'Equal sweet and sour with bright berry aroma',
    },
    requiredIngredients: ['blackberry'],
    maxIngredients: 4,
    biologyConstraints: [
      { type: 'require_pathway', pathways: ['sweet', 'sour'], description: 'Must distinguish sweet from sour pathways' },
      { type: 'match_cell_type', cellTypes: ['type_ii_taste', 'type_iii_taste'], description: 'Know which cell types handle which pathways' },
    ],
    primaryPathway: 'sour',
    secondaryPathways: ['sweet', 'smell'],
    basePoints: 150,
    bonusOpportunities: ['Cell type matching perfect (+25)', 'Sour pathway fully correct (+30)'],
    timeLimit: 90,
    hints: [
      'Blackberry contributes both sweet and sour tastes',
      'Sour taste uses OTOP1 in Type III cells, NOT Type II',
      'Type III cells release serotonin, not ATP',
    ],
    hintsEnabled: true,
  },
  distractorCount: 5,
  pathwayComplexity: 2,
  partialCreditEnabled: true,
  showHigherOrderQuestion: true,
  buildPhaseTime: 60,
  biologyPhaseTime: 90,
  showTutorial: false,
};

// ==================================================
// ROUND 3: LOW-SODIUM SAVOURY ENGINEERING
// ==================================================

const ROUND_3: RoundConfig = {
  roundNumber: 3,
  title: 'Umami Wisdom',
  description: 'Create savory depth without relying on salt',
  order: {
    id: 'round-3-order',
    roundNumber: 3,
    dishName: 'Ancestral Grain Pilaf',
    dishDescription: 'A satisfying savory dish using wild rice, egg, and aromatic depth',
    customerName: 'Grandmother Cedar',
    flavorGoal: {
      targetProfile: { sweetness: 2, sourness: 0, bitterness: 1, saltiness: 2, umami: 7, aromaIntensity: 7 },
      tolerance: 2,
      description: 'Deep umami savoriness with minimal salt, rich aroma',
    },
    requiredIngredients: ['wild-rice', 'egg'],
    forbiddenIngredients: [],
    maxIngredients: 5,
    biologyConstraints: [
      { type: 'require_pathway', pathways: ['umami', 'smell'], description: 'Must leverage umami and aroma pathways' },
      { type: 'reconstruct_cascade', pathways: ['smell'], description: 'Reconstruct olfactory signaling pathway' },
    ],
    primaryPathway: 'umami',
    secondaryPathways: ['smell', 'salt'],
    basePoints: 200,
    bonusOpportunities: ['Low-sodium success (+30)', 'Olfactory pathway perfect (+40)'],
    timeLimit: 90,
    hints: [
      'Umami uses TAS1R1/TAS1R3, sharing TAS1R3 with sweet',
      'Olfactory signaling uses Golf and cAMP, not IP3',
      'Retronasal olfaction can compensate for reduced salt',
    ],
    hintsEnabled: true,
  },
  distractorCount: 6,
  pathwayComplexity: 2,
  partialCreditEnabled: true,
  showHigherOrderQuestion: true,
  buildPhaseTime: 60,
  biologyPhaseTime: 90,
  showTutorial: false,
};

// ==================================================
// ROUND 4: BITTERNESS RISK AND BALANCING
// ==================================================

const ROUND_4: RoundConfig = {
  roundNumber: 4,
  title: 'Toasted Edge',
  description: 'Manage bitterness risk while unlocking walnut potential',
  order: {
    id: 'round-4-order',
    roundNumber: 4,
    dishName: 'Forest Nut Crunch',
    dishDescription: 'A toasted walnut preparation balancing depth without excessive bitterness',
    customerName: 'Stone Bear',
    flavorGoal: {
      targetProfile: { sweetness: 3, sourness: 0, bitterness: 3, umami: 4, aromaIntensity: 8 },
      tolerance: 2,
      description: 'Controlled bitterness with toasty aroma, some umami richness',
    },
    requiredIngredients: ['walnut'],
    maxIngredients: 5,
    biologyConstraints: [
      { type: 'require_pathway', pathways: ['bitter'], description: 'Understand bitter taste transduction' },
      { type: 'avoid_receptor', receptors: ['otop1', 'enac'], description: 'Do not confuse with sour/salt receptors' },
    ],
    primaryPathway: 'bitter',
    secondaryPathways: ['umami', 'smell'],
    basePoints: 250,
    bonusOpportunities: ['TAS2R identification correct (+25)', 'No false positives (+30)'],
    timeLimit: 85,
    hints: [
      'TAS2R family has ~25 members for detecting diverse bitter compounds',
      'Over-toasting increases Maillard products that taste bitter',
      'Bitter still uses Type II cells, gustducin, and PLCβ2',
    ],
    hintsEnabled: false, // Hints disabled this round
  },
  distractorCount: 8,
  pathwayComplexity: 2,
  partialCreditEnabled: true,
  showHigherOrderQuestion: true,
  buildPhaseTime: 55,
  biologyPhaseTime: 85,
  showTutorial: false,
};

// ==================================================
// ROUND 5: FULL FLAVOUR INTEGRATION
// ==================================================

const ROUND_5: RoundConfig = {
  roundNumber: 5,
  title: 'Harvest Feast',
  description: 'Integrate multiple pathways using at least 4 mandatory ingredients',
  order: {
    id: 'round-5-order',
    roundNumber: 5,
    dishName: 'Four Directions Stew',
    dishDescription: 'A complex dish honoring all elements—sweet, savory, and aromatic together',
    customerName: 'Council of Elders',
    flavorGoal: {
      targetProfile: { sweetness: 4, sourness: 2, bitterness: 2, umami: 5, aromaIntensity: 9 },
      tolerance: 2,
      description: 'Balanced complexity with dominant aroma, multiple taste dimensions',
    },
    requiredIngredients: ['pumpkin', 'wild-rice', 'walnut', 'blackberry'],
    maxIngredients: 6,
    biologyConstraints: [
      { type: 'require_pathway', pathways: ['sweet', 'umami', 'smell'], description: 'Must demonstrate understanding of multiple pathways' },
      { type: 'match_cell_type', cellTypes: ['type_ii_taste', 'olfactory_neuron', 'central_integration'], description: 'Match components to correct cell types and integration' },
      { type: 'reconstruct_cascade', pathways: ['sweet'], description: 'Fully reconstruct Type II cell cascade' },
    ],
    primaryPathway: 'smell',
    secondaryPathways: ['sweet', 'umami', 'bitter', 'sour'],
    basePoints: 300,
    bonusOpportunities: ['All 4 ingredients used well (+30)', 'Multi-pathway perfect (+50)', 'Integration question correct (+30)'],
    timeLimit: 80,
    hints: [
      'Type II cells handle sweet, umami, AND bitter—all via gustducin + PLCβ2 + IP3',
    ],
    hintsEnabled: false,
  },
  distractorCount: 10,
  pathwayComplexity: 3,
  partialCreditEnabled: true,
  showHigherOrderQuestion: true,
  buildPhaseTime: 55,
  biologyPhaseTime: 80,
  showTutorial: false,
};

// ==================================================
// ROUND 6: FINAL BOSS
// ==================================================

const ROUND_6: RoundConfig = {
  roundNumber: 6,
  title: 'The Firekeeper\'s Trial',
  description: 'The ultimate test—no hints, strict timing, full pathway mastery required',
  order: {
    id: 'round-6-order',
    roundNumber: 6,
    dishName: 'Sacred Flame Offering',
    dishDescription: 'A masterwork dish demonstrating complete understanding of flavor and biology',
    customerName: 'The Firekeeper',
    flavorGoal: {
      targetProfile: { sweetness: 5, sourness: 3, bitterness: 2, saltiness: 2, umami: 6, aromaIntensity: 10, fatRichness: 4 },
      tolerance: 1.5,
      description: 'Perfect balance across all dimensions with transcendent aroma',
    },
    requiredIngredients: ['pumpkin', 'egg', 'blackberry', 'walnut', 'wild-rice'],
    maxIngredients: 7,
    biologyConstraints: [
      { type: 'require_pathway', pathways: ['sweet', 'sour', 'umami', 'smell'], description: 'All major pathways must be understood' },
      { type: 'match_cell_type', cellTypes: ['type_ii_taste', 'type_iii_taste', 'olfactory_neuron', 'central_integration'], description: 'Complete cell type mastery' },
      { type: 'reconstruct_cascade', pathways: ['sour', 'smell'], description: 'Reconstruct both sour AND olfactory cascades' },
    ],
    primaryPathway: 'smell',
    secondaryPathways: ['sweet', 'sour', 'umami', 'bitter', 'salt'],
    basePoints: 400,
    bonusOpportunities: ['All 5 mandatory ingredients (+40)', 'Both cascades perfect (+60)', 'All higher-order questions correct (+50)'],
    timeLimit: 75,
    hints: [],
    hintsEnabled: false,
  },
  distractorCount: 12,
  pathwayComplexity: 3,
  partialCreditEnabled: true,
  showHigherOrderQuestion: true,
  buildPhaseTime: 50,
  biologyPhaseTime: 75,
  showTutorial: false,
};

// ==================================================
// EXPORTED ROUNDS ARRAY
// ==================================================

export const GAME_ROUNDS: RoundConfig[] = [
  ROUND_1,
  ROUND_2,
  ROUND_3,
  ROUND_4,
  ROUND_5,
  ROUND_6,
];

// ==================================================
// CHALLENGE GENERATION FUNCTIONS
// ==================================================

export function generateReceptorChallenge(
  round: RoundConfig
): BiologyChallenge {
  const primaryPathways = [round.order.primaryPathway, ...round.order.secondaryPathways];
  
  // Get correct receptors for this round's pathways
  const correctReceptors = RECEPTORS.filter(
    r => primaryPathways.includes(r.pathway) && !r.isDistractor
  ).map(r => r.id);
  
  // Get distractors
  const distractors = shuffleArray(
    RECEPTORS.filter(r => r.isDistractor || !primaryPathways.includes(r.pathway))
  ).slice(0, round.distractorCount);
  
  // Mix correct and distractors
  const availableReceptors = shuffleArray([
    ...RECEPTORS.filter(r => correctReceptors.includes(r.id)),
    ...distractors,
  ]);
  
  return {
    type: 'receptor_identification',
    question: `Select ALL receptors/channels involved in detecting the flavors of this dish:`,
    correctReceptors,
    availableReceptors,
    partialCredit: round.partialCreditEnabled,
  };
}

export function generateCellTypeChallenge(
  round: RoundConfig
): BiologyChallenge {
  const items: { item: string; correctCellType: 'type_ii_taste' | 'type_iii_taste' | 'olfactory_neuron' | 'trigeminal' | 'central_integration' }[] = [];
  
  // Add items based on round pathways
  if (round.order.primaryPathway === 'sweet' || round.order.secondaryPathways.includes('sweet')) {
    items.push({ item: 'TAS1R2/TAS1R3 (sweet)', correctCellType: 'type_ii_taste' });
  }
  if (round.order.primaryPathway === 'umami' || round.order.secondaryPathways.includes('umami')) {
    items.push({ item: 'TAS1R1/TAS1R3 (umami)', correctCellType: 'type_ii_taste' });
  }
  if (round.order.primaryPathway === 'bitter' || round.order.secondaryPathways.includes('bitter')) {
    items.push({ item: 'TAS2R family (bitter)', correctCellType: 'type_ii_taste' });
  }
  if (round.order.primaryPathway === 'sour' || round.order.secondaryPathways.includes('sour')) {
    items.push({ item: 'OTOP1 (sour)', correctCellType: 'type_iii_taste' });
  }
  if (round.order.primaryPathway === 'smell' || round.order.secondaryPathways.includes('smell')) {
    items.push({ item: 'Olfactory GPCRs', correctCellType: 'olfactory_neuron' });
  }
  
  // Always add integration
  items.push({ item: 'Orbitofrontal cortex flavor integration', correctCellType: 'central_integration' });
  
  return {
    type: 'cell_type_match',
    question: 'Match each receptor or process to its correct cell type or location:',
    matches: shuffleArray(items).slice(0, 4 + round.roundNumber - 1), // More items in later rounds
    availableCellTypes: ['type_ii_taste', 'type_iii_taste', 'olfactory_neuron', 'trigeminal', 'central_integration'],
  };
}

export function generatePathwayAssemblyChallenge(
  pathway: 'sweet' | 'sour' | 'salt' | 'smell',
  complexity: number
): BiologyChallenge {
  let steps: typeof SWEET_UMAMI_BITTER_STEPS;
  
  switch (pathway) {
    case 'sweet':
      steps = SWEET_UMAMI_BITTER_STEPS;
      break;
    case 'sour':
      steps = SOUR_STEPS;
      break;
    case 'salt':
      steps = SALT_STEPS;
      break;
    case 'smell':
      steps = SMELL_STEPS;
      break;
  }
  
  // Reduce steps based on complexity
  const stepCount = Math.min(steps.length, 4 + complexity * 2);
  const selectedSteps = steps.slice(0, stepCount);
  
  return {
    type: 'pathway_assembly',
    pathway,
    question: `Arrange the ${pathway.toUpperCase()} transduction pathway steps in correct order:`,
    correctOrder: selectedSteps,
    shuffledSteps: shuffleArray([...selectedSteps]),
    partialCredit: true,
  };
}

export function generateHigherOrderQuestion(round: RoundConfig): HigherOrderQuestion {
  // Select appropriate questions based on round content
  const relevantTopics: HigherOrderQuestion['topic'][] = [];
  
  if (round.order.secondaryPathways.includes('smell') || round.order.primaryPathway === 'smell') {
    relevantTopics.push('retronasal', 'brain_region');
  }
  if (round.roundNumber >= 3) {
    relevantTopics.push('cranial_nerve', 'pathway_comparison');
  }
  if (round.roundNumber >= 4) {
    relevantTopics.push('modulation');
  }
  
  // Filter questions by topic
  const candidates = HIGHER_ORDER_QUESTIONS.filter(
    q => relevantTopics.length === 0 || relevantTopics.includes(q.topic)
  );
  
  // Return a random question
  return candidates[Math.floor(Math.random() * candidates.length)] || HIGHER_ORDER_QUESTIONS[0];
}

export function generateRoundChallenges(round: RoundConfig): BiologyChallenge[] {
  const challenges: BiologyChallenge[] = [];
  
  // Always include receptor identification
  challenges.push(generateReceptorChallenge(round));
  
  // Always include cell type matching
  challenges.push(generateCellTypeChallenge(round));
  
  // Include pathway assembly based on constraints
  const cascadeConstraint = round.order.biologyConstraints.find(c => c.type === 'reconstruct_cascade');
  if (cascadeConstraint && cascadeConstraint.pathways) {
    for (const pathway of cascadeConstraint.pathways) {
      if (['sweet', 'sour', 'salt', 'smell'].includes(pathway)) {
        challenges.push(
          generatePathwayAssemblyChallenge(
            pathway as 'sweet' | 'sour' | 'salt' | 'smell',
            round.pathwayComplexity
          )
        );
      }
    }
  } else if (round.roundNumber >= 2) {
    // Default pathway assembly for the primary pathway
    if (['sweet', 'sour', 'salt', 'smell'].includes(round.order.primaryPathway)) {
      challenges.push(
        generatePathwayAssemblyChallenge(
          round.order.primaryPathway as 'sweet' | 'sour' | 'salt' | 'smell',
          round.pathwayComplexity
        )
      );
    }
  }
  
  // Higher-order question if enabled
  if (round.showHigherOrderQuestion) {
    challenges.push(generateHigherOrderQuestion(round));
  }
  
  return challenges;
}

// ==================================================
// TOTAL GAME TIME CALCULATION
// ==================================================

export function calculateTotalGameTime(): number {
  const tutorialTime = 45; // seconds
  const resultsTime = 30; // per round
  const finalLeaderboardTime = 30;
  
  const roundsTime = GAME_ROUNDS.reduce((total, round) => {
    return total + round.buildPhaseTime + round.biologyPhaseTime + resultsTime;
  }, 0);
  
  return tutorialTime + roundsTime + finalLeaderboardTime;
}

// Total should be approximately 10 minutes (600 seconds)
console.log('Total estimated game time:', calculateTotalGameTime(), 'seconds');
