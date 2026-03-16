// ==================================================
// FLAVOUR FIREKEEPER: TYPE DEFINITIONS
// ==================================================

// ==================================================
// INGREDIENT TYPES
// ==================================================

export type IngredientCategory = 'woods' | 'water' | 'garden' | 'meadow' | 'skies';

export interface FlavorProfile {
  sweetness: number;      // 0-10
  sourness: number;       // 0-10
  bitterness: number;     // 0-10
  saltiness: number;      // 0-10
  umami: number;          // 0-10
  aromaIntensity: number; // 0-10
  fatRichness: number;    // 0-10
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  emoji: string;
  description: string;
  isMandatory: boolean;
  
  // Flavor attributes
  baseProfile: FlavorProfile;
  volatility: number;           // How much aroma contributes (0-10)
  textureContribution: string;
  sodiumDependence: number;     // How much it relies on salt (0-10)
  
  // Biology relevance
  primaryTastePathways: TastePathway[];
  aromaRelevant: boolean;
  
  // Visual
  color: string;
}

export type PrepMethod = 
  | 'raw' 
  | 'roast' 
  | 'boil' 
  | 'simmer' 
  | 'toast' 
  | 'mash' 
  | 'whisk' 
  | 'caramelize'
  | 'ferment'
  | 'smoke';

export interface PrepModifier {
  method: PrepMethod;
  flavorChanges: Partial<FlavorProfile>;
  bitternessRiskIncrease?: number;
  aromaBoost?: number;
  description: string;
}

export interface PreparedIngredient {
  ingredient: Ingredient;
  prepMethod: PrepMethod;
  quantity: number;
}

// ==================================================
// TASTE PATHWAY TYPES
// ==================================================

export type TastePathway = 'sweet' | 'umami' | 'bitter' | 'sour' | 'salt' | 'fatty' | 'smell';

export type CellType = 
  | 'type_ii_taste' 
  | 'type_iii_taste' 
  | 'olfactory_neuron' 
  | 'trigeminal'
  | 'central_integration';

export interface Receptor {
  id: string;
  name: string;
  fullName: string;
  pathway: TastePathway;
  cellType: CellType;
  description: string;
  isDistractor?: boolean;
}

export interface PathwayStep {
  id: string;
  order: number;
  description: string;
  pathway: TastePathway;
  isAdvanced?: boolean;
}

export interface SignalingCascade {
  pathway: TastePathway;
  cellType: CellType;
  steps: PathwayStep[];
  outputSignal: string;
  targetReceptor: string;
}

// ==================================================
// ROUND & ORDER TYPES
// ==================================================

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface FlavorGoal {
  targetProfile: Partial<FlavorProfile>;
  tolerance: number;  // How close you need to be (0-3)
  description: string;
}

export interface BiologyConstraint {
  type: 'require_pathway' | 'avoid_receptor' | 'match_cell_type' | 'reconstruct_cascade';
  pathways?: TastePathway[];
  receptors?: string[];
  cellTypes?: CellType[];
  description: string;
}

export interface OrderCard {
  id: string;
  roundNumber: number;
  dishName: string;
  dishDescription: string;
  customerName: string;
  
  // Culinary requirements
  flavorGoal: FlavorGoal;
  requiredIngredients: string[];   // ingredient IDs
  forbiddenIngredients?: string[];
  requiredPrepMethods?: PrepMethod[];
  maxIngredients?: number;
  
  // Biology requirements
  biologyConstraints: BiologyConstraint[];
  primaryPathway: TastePathway;
  secondaryPathways: TastePathway[];
  
  // Scoring
  basePoints: number;
  bonusOpportunities: string[];
  timeLimit: number;  // seconds
  
  // Hints
  hints: string[];
  hintsEnabled: boolean;
}

export interface RoundConfig {
  roundNumber: DifficultyLevel;
  title: string;
  description: string;
  order: OrderCard;
  
  // Difficulty modifiers
  distractorCount: number;
  pathwayComplexity: number;      // 1-3: how many steps in drag-drop
  partialCreditEnabled: boolean;
  showHigherOrderQuestion: boolean;
  
  // Time
  buildPhaseTime: number;
  biologyPhaseTime: number;
  
  // Tutorial flags
  showTutorial: boolean;
  highlightedElements?: string[];
}

// ==================================================
// BIOLOGY CHALLENGE TYPES
// ==================================================

export interface ReceptorIdentificationChallenge {
  type: 'receptor_identification';
  question: string;
  correctReceptors: string[];
  availableReceptors: Receptor[];
  partialCredit: boolean;
}

export interface CellTypeMatchChallenge {
  type: 'cell_type_match';
  question: string;
  matches: { item: string; correctCellType: CellType }[];
  availableCellTypes: CellType[];
}

export interface PathwayAssemblyChallenge {
  type: 'pathway_assembly';
  pathway: TastePathway;
  question: string;
  correctOrder: PathwayStep[];
  shuffledSteps: PathwayStep[];
  partialCredit: boolean;
}

export interface HigherOrderQuestion {
  type: 'higher_order';
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  topic: 'retronasal' | 'cranial_nerve' | 'brain_region' | 'pathway_comparison' | 'modulation';
}

export type BiologyChallenge = 
  | ReceptorIdentificationChallenge
  | CellTypeMatchChallenge
  | PathwayAssemblyChallenge
  | HigherOrderQuestion;

export interface BiologyDefensePhase {
  challenges: BiologyChallenge[];
  timeLimit: number;
}

// ==================================================
// SCORING TYPES
// ==================================================

export interface CulinaryScore {
  flavorMatchScore: number;       // 0-100
  ingredientUsageScore: number;   // 0-100
  prepMethodScore: number;        // 0-100
  constraintPenalties: number;    // negative points
  total: number;
}

export interface BiologyScore {
  receptorIdentificationScore: number;  // 0-100
  cellTypeMatchScore: number;           // 0-100
  pathwayAssemblyScore: number;         // 0-100
  higherOrderScore: number;             // 0-100
  streakBonus: number;
  total: number;
}

export interface RoundScore {
  roundNumber: number;
  culinaryScore: CulinaryScore;
  biologyScore: BiologyScore;
  timeBonus: number;
  totalScore: number;
  completionTime: number;  // seconds
}

export interface PlayerStats {
  strongPathways: TastePathway[];
  weakPathways: TastePathway[];
  perfectRounds: number;
  totalCorrectMechanisms: number;
  totalIncorrectMechanisms: number;
}

// ==================================================
// GAME STATE TYPES
// ==================================================

export type GamePhase = 
  | 'start'
  | 'tutorial'
  | 'build'
  | 'biology_defense'
  | 'round_results'
  | 'game_over'
  | 'leaderboard';

export interface Player {
  id: string;
  name: string;
  sessionId: string;
  joinedAt: number;
  scores: RoundScore[];
  totalScore: number;
  biologyTotalScore: number;
  culinaryTotalScore: number;
  totalTime: number;
  stats: PlayerStats;
  rank?: number;
}

export interface GameSession {
  id: string;
  startTime: number;
  endTime?: number;
  roundConfigs: RoundConfig[];
  players: Player[];
  isActive: boolean;
}

export interface GameState {
  // Session
  session: GameSession | null;
  currentPlayer: Player | null;
  
  // Progress
  phase: GamePhase;
  currentRound: number;
  
  // Timers
  globalTimeRemaining: number;    // Total game time
  phaseTimeRemaining: number;     // Current phase time
  
  // Build phase state
  pantryIngredients: Ingredient[];
  prepAreaIngredients: PreparedIngredient[];
  vesselIngredients: PreparedIngredient[];
  selectedPrepMethod: PrepMethod;
  currentFlavorProfile: FlavorProfile;
  
  // Biology phase state
  currentChallenges: BiologyChallenge[];
  challengeResponses: Map<string, unknown>;
  currentChallengeIndex: number;
  
  // Scoring
  currentRoundScore: RoundScore | null;
  consecutiveCorrect: number;  // Streak
  
  // UI
  showHints: boolean;
  tutorialStep: number;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'streak';
  message: string;
  duration: number;
}

// ==================================================
// LEADERBOARD TYPES
// ==================================================

export interface LeaderboardEntry {
  rank: number;
  player: Player;
  totalScore: number;
  biologyScore: number;
  culinaryScore: number;
  completionTime: number;
  performanceSummary: string;
}

export interface Leaderboard {
  sessionId: string;
  entries: LeaderboardEntry[];
  generatedAt: number;
}
