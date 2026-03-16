// ==================================================
// FLAVOUR FIREKEEPER: BIOLOGY PATHWAY DATABASE
// ==================================================

import type { Receptor, PathwayStep, SignalingCascade, CellType, TastePathway } from '../types';

// ==================================================
// RECEPTORS DATABASE
// ==================================================

export const RECEPTORS: Receptor[] = [
  // SWEET RECEPTORS
  {
    id: 'tas1r2-tas1r3',
    name: 'TAS1R2/TAS1R3',
    fullName: 'Taste receptor type 1 member 2/3 heterodimer',
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    description: 'G-protein coupled receptor dimer for sweet taste detection',
  },
  
  // UMAMI RECEPTORS
  {
    id: 'tas1r1-tas1r3',
    name: 'TAS1R1/TAS1R3',
    fullName: 'Taste receptor type 1 member 1/3 heterodimer',
    pathway: 'umami',
    cellType: 'type_ii_taste',
    description: 'G-protein coupled receptor dimer for umami (glutamate) detection',
  },
  
  // BITTER RECEPTORS
  {
    id: 'tas2r',
    name: 'TAS2R family',
    fullName: 'Taste receptor type 2 family (~25 members)',
    pathway: 'bitter',
    cellType: 'type_ii_taste',
    description: 'Family of GPCRs for bitter compound detection',
  },
  
  // SOUR RECEPTOR
  {
    id: 'otop1',
    name: 'OTOP1',
    fullName: 'Otopetrin-1 proton channel',
    pathway: 'sour',
    cellType: 'type_iii_taste',
    description: 'Proton channel for sour taste (acid) detection',
  },
  
  // SALT RECEPTOR
  {
    id: 'enac',
    name: 'ENaC',
    fullName: 'Epithelial sodium channel',
    pathway: 'salt',
    cellType: 'type_ii_taste', // Simplified - actual cell type debated
    description: 'Sodium-selective channel for salt detection',
  },
  
  // FATTY ACID RECEPTORS
  {
    id: 'ffar4',
    name: 'FFAR4 (GPR120)',
    fullName: 'Free fatty acid receptor 4',
    pathway: 'fatty',
    cellType: 'type_ii_taste',
    description: 'GPCR for long-chain fatty acid detection',
  },
  {
    id: 'cd36',
    name: 'CD36',
    fullName: 'Cluster of differentiation 36',
    pathway: 'fatty',
    cellType: 'type_ii_taste',
    description: 'Fatty acid translocase for lipid binding',
  },
  {
    id: 'ffar2',
    name: 'FFAR2 (GPR43)',
    fullName: 'Free fatty acid receptor 2',
    pathway: 'fatty',
    cellType: 'type_ii_taste',
    description: 'GPCR for short-chain fatty acid detection',
  },
  
  // OLFACTORY RECEPTOR
  {
    id: 'olfactory-gpcr',
    name: 'Olfactory GPCR',
    fullName: 'Olfactory receptor (OR family, ~400 functional)',
    pathway: 'smell',
    cellType: 'olfactory_neuron',
    description: 'GPCR family on olfactory receptor neuron cilia',
  },
  
  // SIGNALING COMPONENTS (as selectable items)
  {
    id: 'gustducin',
    name: 'Gustducin (Gα-gust)',
    fullName: 'Gustatory G-protein alpha subunit',
    pathway: 'sweet', // Also umami, bitter
    cellType: 'type_ii_taste',
    description: 'G-protein that couples taste GPCRs to downstream signaling',
  },
  {
    id: 'plcb2',
    name: 'PLCβ2',
    fullName: 'Phospholipase C beta 2',
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    description: 'Enzyme that hydrolyzes PIP2 to produce IP3 and DAG',
  },
  {
    id: 'trpm5',
    name: 'TRPM5',
    fullName: 'Transient receptor potential cation channel M5',
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    description: 'Ca2+-activated cation channel causing depolarization',
  },
  {
    id: 'trpm4',
    name: 'TRPM4',
    fullName: 'Transient receptor potential cation channel M4',
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    description: 'Ca2+-activated cation channel (alongside TRPM5)',
  },
  {
    id: 'calhm',
    name: 'CALHM1/3',
    fullName: 'Calcium homeostasis modulator channels',
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    description: 'ATP release channel in Type II cells',
  },
  {
    id: 'p2x2-p2x3',
    name: 'P2X2/P2X3',
    fullName: 'Purinergic receptor P2X2/P2X3',
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    description: 'ATP receptor on gustatory afferent nerve fibers',
  },
  
  // OLFACTORY SIGNALING
  {
    id: 'golf',
    name: 'Gαolf',
    fullName: 'Olfactory G-protein alpha subunit',
    pathway: 'smell',
    cellType: 'olfactory_neuron',
    description: 'G-protein specific to olfactory signal transduction',
  },
  {
    id: 'adenylate-cyclase',
    name: 'Adenylate Cyclase III',
    fullName: 'Adenylyl cyclase type 3',
    pathway: 'smell',
    cellType: 'olfactory_neuron',
    description: 'Enzyme converting ATP to cAMP in olfactory neurons',
  },
  {
    id: 'cng-channel',
    name: 'CNG Channel',
    fullName: 'Cyclic nucleotide-gated channel',
    pathway: 'smell',
    cellType: 'olfactory_neuron',
    description: 'cAMP-gated ion channel allowing Na+ and Ca2+ entry',
  },
  
  // DISTRACTORS
  {
    id: 'glut',
    name: 'GLUT (transporter)',
    fullName: 'Glucose transporter',
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    description: 'Facilitated glucose transporter (not primary sweet receptor)',
    isDistractor: true,
  },
  {
    id: 'sglt',
    name: 'SGLT',
    fullName: 'Sodium-glucose linked transporter',
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    description: 'Sodium-glucose cotransporter (not primary sweet receptor)',
    isDistractor: true,
  },
  {
    id: 'ca4',
    name: 'Carbonic Anhydrase 4',
    fullName: 'Carbonic anhydrase IV',
    pathway: 'sour',
    cellType: 'type_iii_taste',
    description: 'Enzyme for CO2/carbonation detection',
    isDistractor: true,
  },
  {
    id: 'trpv1',
    name: 'TRPV1',
    fullName: 'Transient receptor potential vanilloid 1',
    pathway: 'bitter', // Distractor
    cellType: 'trigeminal',
    description: 'Capsaicin/heat receptor (trigeminal, not taste)',
    isDistractor: true,
  },
  {
    id: 'asic',
    name: 'ASIC',
    fullName: 'Acid-sensing ion channel',
    pathway: 'sour',
    cellType: 'trigeminal',
    description: 'Acid-sensing channel (trigeminal, contributes to perception)',
    isDistractor: true,
  },
];

// ==================================================
// PATHWAY STEPS DATABASE
// ==================================================

// SWEET/UMAMI/BITTER PATHWAY (Type II cells)
export const SWEET_UMAMI_BITTER_STEPS: PathwayStep[] = [
  { id: 'sub-1', order: 1, description: 'Tastant binds GPCR (TAS1R or TAS2R)', pathway: 'sweet' },
  { id: 'sub-2', order: 2, description: 'GPCR activates gustducin (Gα-gust)', pathway: 'sweet' },
  { id: 'sub-3', order: 3, description: 'Gustducin activates PLCβ2', pathway: 'sweet' },
  { id: 'sub-4', order: 4, description: 'PLCβ2 hydrolyzes PIP2 → IP3 + DAG', pathway: 'sweet' },
  { id: 'sub-5', order: 5, description: 'IP3 binds IP3 receptors on endoplasmic reticulum', pathway: 'sweet' },
  { id: 'sub-6', order: 6, description: 'Ca²⁺ released from ER stores', pathway: 'sweet' },
  { id: 'sub-7', order: 7, description: 'TRPM5 (and TRPM4) channels open', pathway: 'sweet' },
  { id: 'sub-8', order: 8, description: 'Cation influx causes depolarization', pathway: 'sweet' },
  { id: 'sub-9', order: 9, description: 'ATP released via CALHM/pannexin channels', pathway: 'sweet' },
  { id: 'sub-10', order: 10, description: 'ATP activates P2X2/P2X3 on gustatory afferent fibers', pathway: 'sweet' },
  { id: 'sub-11', order: 11, description: 'Signal transmitted to CNS', pathway: 'sweet' },
];

// SOUR PATHWAY (Type III cells)
export const SOUR_STEPS: PathwayStep[] = [
  { id: 'sour-1', order: 1, description: 'Acidic stimulus provides H⁺ ions', pathway: 'sour' },
  { id: 'sour-2', order: 2, description: 'H⁺ enters cell via OTOP1 channel', pathway: 'sour' },
  { id: 'sour-3', order: 3, description: 'Weak acids may diffuse and dissociate intracellularly', pathway: 'sour', isAdvanced: true },
  { id: 'sour-4', order: 4, description: 'Intracellular acidification increases', pathway: 'sour' },
  { id: 'sour-5', order: 5, description: 'K⁺ channel activity suppressed', pathway: 'sour' },
  { id: 'sour-6', order: 6, description: 'Membrane depolarization occurs', pathway: 'sour' },
  { id: 'sour-7', order: 7, description: 'Voltage-gated Na⁺ channels open', pathway: 'sour' },
  { id: 'sour-8', order: 8, description: 'Voltage-gated Ca²⁺ channels open', pathway: 'sour' },
  { id: 'sour-9', order: 9, description: 'Serotonin (5-HT) released via vesicular exocytosis', pathway: 'sour' },
  { id: 'sour-10', order: 10, description: 'Afferent gustatory nerve fibers activated', pathway: 'sour' },
];

// SALT PATHWAY (ENaC-centered)
export const SALT_STEPS: PathwayStep[] = [
  { id: 'salt-1', order: 1, description: 'Na⁺ from NaCl enters via ENaC', pathway: 'salt' },
  { id: 'salt-2', order: 2, description: 'Direct depolarization of taste cell', pathway: 'salt' },
  { id: 'salt-3', order: 3, description: 'Voltage-gated Na⁺ channels may enhance signal', pathway: 'salt', isAdvanced: true },
  { id: 'salt-4', order: 4, description: 'ATP released as neurotransmitter', pathway: 'salt' },
  { id: 'salt-5', order: 5, description: 'ATP activates purinergic receptors on afferent fibers', pathway: 'salt' },
];

// OLFACTORY PATHWAY
export const SMELL_STEPS: PathwayStep[] = [
  { id: 'smell-1', order: 1, description: 'Volatile odorant enters nasal mucus layer', pathway: 'smell' },
  { id: 'smell-2', order: 2, description: 'Odorant binds olfactory GPCR on cilia', pathway: 'smell' },
  { id: 'smell-3', order: 3, description: 'GPCR activates Gαolf (olfactory G-protein)', pathway: 'smell' },
  { id: 'smell-4', order: 4, description: 'Gαolf activates adenylate cyclase III', pathway: 'smell' },
  { id: 'smell-5', order: 5, description: 'Adenylate cyclase converts ATP → cAMP', pathway: 'smell' },
  { id: 'smell-6', order: 6, description: 'cAMP opens cyclic nucleotide-gated (CNG) channels', pathway: 'smell' },
  { id: 'smell-7', order: 7, description: 'Na⁺ and Ca²⁺ influx into cilia', pathway: 'smell' },
  { id: 'smell-8', order: 8, description: 'Ca²⁺ opens Cl⁻ channels → Cl⁻ efflux (amplification)', pathway: 'smell' },
  { id: 'smell-9', order: 9, description: 'Olfactory receptor neuron depolarizes', pathway: 'smell' },
  { id: 'smell-10', order: 10, description: 'Action potential generated and propagates', pathway: 'smell' },
  { id: 'smell-11', order: 11, description: 'Axon projects through cribriform plate', pathway: 'smell' },
  { id: 'smell-12', order: 12, description: 'Signal reaches glomeruli in olfactory bulb', pathway: 'smell' },
  { id: 'smell-13', order: 13, description: 'Synapse with mitral/tufted cells', pathway: 'smell' },
  { id: 'smell-14', order: 14, description: 'Higher olfactory processing follows', pathway: 'smell' },
];

// ==================================================
// SIGNALING CASCADES
// ==================================================

export const SIGNALING_CASCADES: SignalingCascade[] = [
  {
    pathway: 'sweet',
    cellType: 'type_ii_taste',
    steps: SWEET_UMAMI_BITTER_STEPS,
    outputSignal: 'ATP',
    targetReceptor: 'P2X2/P2X3',
  },
  {
    pathway: 'umami',
    cellType: 'type_ii_taste',
    steps: SWEET_UMAMI_BITTER_STEPS.map(s => ({ ...s, pathway: 'umami' as TastePathway })),
    outputSignal: 'ATP',
    targetReceptor: 'P2X2/P2X3',
  },
  {
    pathway: 'bitter',
    cellType: 'type_ii_taste',
    steps: SWEET_UMAMI_BITTER_STEPS.map(s => ({ ...s, pathway: 'bitter' as TastePathway })),
    outputSignal: 'ATP',
    targetReceptor: 'P2X2/P2X3',
  },
  {
    pathway: 'sour',
    cellType: 'type_iii_taste',
    steps: SOUR_STEPS,
    outputSignal: 'Serotonin (5-HT)',
    targetReceptor: '5-HT receptor',
  },
  {
    pathway: 'salt',
    cellType: 'type_ii_taste',
    steps: SALT_STEPS,
    outputSignal: 'ATP',
    targetReceptor: 'P2X2/P2X3',
  },
  {
    pathway: 'smell',
    cellType: 'olfactory_neuron',
    steps: SMELL_STEPS,
    outputSignal: 'Glutamate (at olfactory bulb)',
    targetReceptor: 'Glutamate receptors',
  },
];

// ==================================================
// CELL TYPE INFORMATION
// ==================================================

export const CELL_TYPE_INFO: Record<CellType, { name: string; description: string; pathways: TastePathway[] }> = {
  type_ii_taste: {
    name: 'Type II Taste Receptor Cell',
    description: 'GPCR-expressing cells for sweet, umami, and bitter detection. Release ATP as neurotransmitter.',
    pathways: ['sweet', 'umami', 'bitter'],
  },
  type_iii_taste: {
    name: 'Type III Taste Receptor Cell',
    description: 'Presynaptic cells for sour detection. Release serotonin via conventional synaptic vesicles.',
    pathways: ['sour'],
  },
  olfactory_neuron: {
    name: 'Olfactory Receptor Neuron',
    description: 'Primary sensory neurons in nasal epithelium expressing olfactory GPCRs on cilia.',
    pathways: ['smell'],
  },
  trigeminal: {
    name: 'Trigeminal Sensory Contribution',
    description: 'CN V afferents detecting temperature, texture, and chemical irritation (not taste proper).',
    pathways: [],
  },
  central_integration: {
    name: 'Central Flavor Integration',
    description: 'Orbitofrontal cortex and insular cortex integration of taste, smell, and somatosensory signals.',
    pathways: ['sweet', 'umami', 'bitter', 'sour', 'salt', 'smell'],
  },
};

// ==================================================
// HIGHER-ORDER INTEGRATION CONCEPTS
// ==================================================

export const HIGHER_ORDER_CONCEPTS = {
  retronasal_olfaction: {
    name: 'Retronasal Olfaction',
    description: 'Odorants released during chewing/swallowing travel from oral cavity to olfactory epithelium via the nasopharynx.',
    importance: 'Critical for flavor perception - most of what we call "taste" is actually smell.',
  },
  cranial_nerves: {
    taste: ['CN VII (Facial) - anterior 2/3 tongue', 'CN IX (Glossopharyngeal) - posterior 1/3 tongue', 'CN X (Vagus) - epiglottis/pharynx'],
    smell: ['CN I (Olfactory) - olfactory epithelium'],
    trigeminal: ['CN V (Trigeminal) - texture, temperature, chemical irritation'],
  },
  central_pathways: {
    taste: ['Solitary nucleus (NST/NTS)', 'Ventral posteromedial (VPM) thalamus', 'Primary gustatory cortex (insula/frontal operculum)'],
    smell: ['Olfactory bulb', 'Piriform cortex', 'Amygdala', 'Orbitofrontal cortex'],
    integration: ['Orbitofrontal cortex (OFC) - key integration site for flavor'],
  },
};

// ==================================================
// NEUROTRANSMITTER COMPARISON
// ==================================================

export const NEUROTRANSMITTER_INFO = {
  atp: {
    name: 'ATP',
    releaseType: 'Non-vesicular (via CALHM1/3 and pannexin)',
    cellTypes: ['Type II taste cells', 'Salt-responsive cells'],
    pathways: ['sweet', 'umami', 'bitter', 'salt'],
  },
  serotonin: {
    name: 'Serotonin (5-HT)',
    releaseType: 'Vesicular (conventional synaptic release)',
    cellTypes: ['Type III taste cells'],
    pathways: ['sour'],
  },
  glutamate: {
    name: 'Glutamate',
    releaseType: 'Vesicular (at central synapses)',
    cellTypes: ['Olfactory receptor neurons (at olfactory bulb)'],
    pathways: ['smell'],
  },
};

// ==================================================
// HELPER FUNCTIONS
// ==================================================

export function getReceptorById(id: string): Receptor | undefined {
  return RECEPTORS.find(r => r.id === id);
}

export function getReceptorsByPathway(pathway: TastePathway): Receptor[] {
  return RECEPTORS.filter(r => r.pathway === pathway && !r.isDistractor);
}

export function getReceptorsByCellType(cellType: CellType): Receptor[] {
  return RECEPTORS.filter(r => r.cellType === cellType);
}

export function getPathwaySteps(pathway: TastePathway): PathwayStep[] {
  const cascade = SIGNALING_CASCADES.find(c => c.pathway === pathway);
  return cascade?.steps || [];
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getDistractorReceptors(): Receptor[] {
  return RECEPTORS.filter(r => r.isDistractor);
}

export function getAllReceptorsForChallenge(): Receptor[] {
  return RECEPTORS;
}

export function getCascadeForPathway(pathway: TastePathway): SignalingCascade | undefined {
  return SIGNALING_CASCADES.find(c => c.pathway === pathway);
}
