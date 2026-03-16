// ==================================================
// FLAVOUR FIREKEEPER: GAME STATE MANAGEMENT (Zustand)
// ==================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  GameState,
  Player,
  GameSession,
  RoundScore,
  BiologyChallenge,
  PreparedIngredient,
  FlavorProfile,
  PrepMethod,
  Notification,
  CulinaryScore,
  BiologyScore,
  PlayerStats,
  Ingredient,
} from '../types';
import { ALL_INGREDIENTS, calculateCombinedProfile } from '../data/ingredients';
import { GAME_ROUNDS, generateRoundChallenges } from '../data/rounds';

// ==================================================
// INITIAL STATE
// ==================================================

const INITIAL_FLAVOR_PROFILE: FlavorProfile = {
  sweetness: 0,
  sourness: 0,
  bitterness: 0,
  saltiness: 0,
  umami: 0,
  aromaIntensity: 0,
  fatRichness: 0,
};

const INITIAL_PLAYER_STATS: PlayerStats = {
  strongPathways: [],
  weakPathways: [],
  perfectRounds: 0,
  totalCorrectMechanisms: 0,
  totalIncorrectMechanisms: 0,
};

const createInitialState = (): Omit<GameState, 'actions'> => ({
  session: null,
  currentPlayer: null,
  phase: 'start',
  currentRound: 0,
  globalTimeRemaining: 600, // 10 minutes
  phaseTimeRemaining: 0,
  pantryIngredients: ALL_INGREDIENTS,
  prepAreaIngredients: [],
  vesselIngredients: [],
  selectedPrepMethod: 'raw',
  currentFlavorProfile: { ...INITIAL_FLAVOR_PROFILE },
  currentChallenges: [],
  challengeResponses: new Map(),
  currentChallengeIndex: 0,
  currentRoundScore: null,
  consecutiveCorrect: 0,
  showHints: true,
  tutorialStep: 0,
  notifications: [],
});

// ==================================================
// STORE INTERFACE
// ==================================================

interface GameStore extends GameState {
  // Session actions
  startNewSession: (playerName: string) => void;
  joinSession: (sessionId: string, playerName: string) => void;
  
  // Game flow actions
  startTutorial: () => void;
  startRound: () => void;
  endBuildPhase: () => void;
  submitBiologyAnswers: () => void;
  nextRound: () => void;
  endGame: () => void;
  
  // Build phase actions
  addToPrepArea: (ingredient: Ingredient) => void;
  removeFromPrepArea: (index: number) => void;
  addToVessel: (preparedIngredient: PreparedIngredient) => void;
  removeFromVessel: (index: number) => void;
  setSelectedPrepMethod: (method: PrepMethod) => void;
  clearVessel: () => void;
  
  // Biology phase actions
  setCurrentChallenge: (index: number) => void;
  submitChallengeResponse: (challengeId: string, response: unknown) => void;
  
  // Timer actions
  decrementGlobalTimer: () => void;
  decrementPhaseTimer: () => void;
  setPhaseTimer: (seconds: number) => void;
  
  // UI actions
  toggleHints: () => void;
  setTutorialStep: (step: number) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  
  // Scoring
  calculateRoundScore: () => RoundScore;
  
  // Leaderboard
  getLeaderboard: () => Player[];
  
  // Reset
  resetGame: () => void;
}

// ==================================================
// SCORING HELPERS
// ==================================================

function calculateCulinaryScore(
  vesselIngredients: PreparedIngredient[],
  targetProfile: Partial<FlavorProfile>,
  requiredIngredients: string[],
  forbiddenIngredients?: string[]
): CulinaryScore {
  const actualProfile = calculateCombinedProfile(vesselIngredients);
  
  // Flavor match score
  let flavorMatchTotal = 0;
  let flavorMatchCount = 0;
  
  for (const [key, targetValue] of Object.entries(targetProfile)) {
    if (targetValue !== undefined) {
      const actualValue = actualProfile[key as keyof FlavorProfile];
      const diff = Math.abs(actualValue - targetValue);
      const matchScore = Math.max(0, 100 - diff * 15);
      flavorMatchTotal += matchScore;
      flavorMatchCount++;
    }
  }
  
  const flavorMatchScore = flavorMatchCount > 0 ? flavorMatchTotal / flavorMatchCount : 0;
  
  // Ingredient usage score
  const usedIngredientIds = vesselIngredients.map(pi => pi.ingredient.id);
  const requiredUsed = requiredIngredients.filter(id => usedIngredientIds.includes(id));
  const ingredientUsageScore = (requiredUsed.length / requiredIngredients.length) * 100;
  
  // Prep method score (simplified)
  const prepMethodScore = vesselIngredients.length > 0 ? 75 : 0;
  
  // Constraint penalties
  let constraintPenalties = 0;
  if (forbiddenIngredients) {
    const forbidden = forbiddenIngredients.filter(id => usedIngredientIds.includes(id));
    constraintPenalties = forbidden.length * 20;
  }
  
  // Check for excessive bitterness
  if (actualProfile.bitterness > 6) {
    constraintPenalties += (actualProfile.bitterness - 6) * 10;
  }
  
  const total = Math.max(0, (flavorMatchScore * 0.5 + ingredientUsageScore * 0.35 + prepMethodScore * 0.15) - constraintPenalties);
  
  return {
    flavorMatchScore: Math.round(flavorMatchScore),
    ingredientUsageScore: Math.round(ingredientUsageScore),
    prepMethodScore: Math.round(prepMethodScore),
    constraintPenalties: Math.round(constraintPenalties),
    total: Math.round(total),
  };
}

function calculateBiologyScore(
  challenges: BiologyChallenge[],
  responses: Map<string, unknown>,
  consecutiveCorrect: number
): BiologyScore {
  let receptorScore = 0;
  let cellTypeScore = 0;
  let pathwayScore = 0;
  let higherOrderScore = 0;
  
  for (const challenge of challenges) {
    const response = responses.get(challenge.type);
    
    if (challenge.type === 'receptor_identification') {
      const selected = (response as string[]) || [];
      const correct = challenge.correctReceptors;
      const correctSelections = selected.filter(id => correct.includes(id));
      const incorrectSelections = selected.filter(id => !correct.includes(id));
      
      receptorScore = Math.max(0, (correctSelections.length / correct.length) * 100 - incorrectSelections.length * 10);
    }
    
    if (challenge.type === 'cell_type_match') {
      const matches = (response as Record<string, string>) || {};
      let correctMatches = 0;
      
      for (const match of challenge.matches) {
        if (matches[match.item] === match.correctCellType) {
          correctMatches++;
        }
      }
      
      cellTypeScore = (correctMatches / challenge.matches.length) * 100;
    }
    
    if (challenge.type === 'pathway_assembly') {
      const ordered = (response as string[]) || [];
      const correctOrder = challenge.correctOrder.map(s => s.id);
      
      // Kendall tau distance-based scoring
      let correctPositions = 0;
      for (let i = 0; i < Math.min(ordered.length, correctOrder.length); i++) {
        if (ordered[i] === correctOrder[i]) {
          correctPositions++;
        }
      }
      
      pathwayScore = (correctPositions / correctOrder.length) * 100;
    }
    
    if (challenge.type === 'higher_order') {
      const selectedOption = response as string;
      if (selectedOption === challenge.correctOptionId) {
        higherOrderScore = 100;
      }
    }
  }
  
  // Streak bonus
  const streakBonus = Math.min(consecutiveCorrect * 5, 25);
  
  const total = (receptorScore * 0.3 + cellTypeScore * 0.25 + pathwayScore * 0.35 + higherOrderScore * 0.1) + streakBonus;
  
  return {
    receptorIdentificationScore: Math.round(receptorScore),
    cellTypeMatchScore: Math.round(cellTypeScore),
    pathwayAssemblyScore: Math.round(pathwayScore),
    higherOrderScore: Math.round(higherOrderScore),
    streakBonus: Math.round(streakBonus),
    total: Math.round(total),
  };
}

// ==================================================
// ZUSTAND STORE
// ==================================================

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),
      
      // ==================================================
      // SESSION ACTIONS
      // ==================================================
      
      startNewSession: (playerName: string) => {
        const sessionId = uuidv4();
        const playerId = uuidv4();
        
        const player: Player = {
          id: playerId,
          name: playerName,
          sessionId,
          joinedAt: Date.now(),
          scores: [],
          totalScore: 0,
          biologyTotalScore: 0,
          culinaryTotalScore: 0,
          totalTime: 0,
          stats: { ...INITIAL_PLAYER_STATS },
        };
        
        const session: GameSession = {
          id: sessionId,
          startTime: Date.now(),
          roundConfigs: GAME_ROUNDS,
          players: [player],
          isActive: true,
        };
        
        set({
          session,
          currentPlayer: player,
          phase: 'tutorial',
          currentRound: 0,
          globalTimeRemaining: 600,
          pantryIngredients: ALL_INGREDIENTS,
        });
      },
      
      joinSession: (_sessionId: string, playerName: string) => {
        // In a real implementation, this would fetch session from server
        // For now, we create a new player in a new session
        get().startNewSession(playerName);
      },
      
      // ==================================================
      // GAME FLOW ACTIONS
      // ==================================================
      
      startTutorial: () => {
        set({
          phase: 'tutorial',
          tutorialStep: 0,
        });
      },
      
      startRound: () => {
        const state = get();
        const roundIndex = state.currentRound;
        const round = GAME_ROUNDS[roundIndex];
        
        if (!round) {
          get().endGame();
          return;
        }
        
        const challenges = generateRoundChallenges(round);
        
        set({
          phase: 'build',
          phaseTimeRemaining: round.buildPhaseTime,
          currentChallenges: challenges,
          challengeResponses: new Map(),
          currentChallengeIndex: 0,
          prepAreaIngredients: [],
          vesselIngredients: [],
          selectedPrepMethod: 'raw',
          currentFlavorProfile: { ...INITIAL_FLAVOR_PROFILE },
          currentRoundScore: null,
        });
      },
      
      endBuildPhase: () => {
        const state = get();
        const round = GAME_ROUNDS[state.currentRound];
        
        set({
          phase: 'biology_defense',
          phaseTimeRemaining: round?.biologyPhaseTime || 90,
          currentChallengeIndex: 0,
        });
      },
      
      submitBiologyAnswers: () => {
        const roundScore = get().calculateRoundScore();
        
        set(state => {
          const newScores = [...(state.currentPlayer?.scores || []), roundScore];
          const totalScore = newScores.reduce((sum, s) => sum + s.totalScore, 0);
          const biologyTotal = newScores.reduce((sum, s) => sum + s.biologyScore.total, 0);
          const culinaryTotal = newScores.reduce((sum, s) => sum + s.culinaryScore.total, 0);
          const totalTime = newScores.reduce((sum, s) => sum + s.completionTime, 0);
          
          return {
            phase: 'round_results',
            currentRoundScore: roundScore,
            currentPlayer: state.currentPlayer
              ? {
                  ...state.currentPlayer,
                  scores: newScores,
                  totalScore,
                  biologyTotalScore: biologyTotal,
                  culinaryTotalScore: culinaryTotal,
                  totalTime,
                }
              : null,
          };
        });
      },
      
      nextRound: () => {
        const state = get();
        const nextRoundIndex = state.currentRound + 1;
        
        if (nextRoundIndex >= GAME_ROUNDS.length) {
          get().endGame();
        } else {
          set({
            currentRound: nextRoundIndex,
          });
          get().startRound();
        }
      },
      
      endGame: () => {
        set({
          phase: 'game_over',
        });
        
        // Transition to leaderboard after brief delay
        setTimeout(() => {
          set({ phase: 'leaderboard' });
        }, 2000);
      },
      
      // ==================================================
      // BUILD PHASE ACTIONS
      // ==================================================
      
      addToPrepArea: (ingredient: Ingredient) => {
        const state = get();
        const prepMethod = state.selectedPrepMethod;
        
        const preparedIngredient: PreparedIngredient = {
          ingredient,
          prepMethod,
          quantity: 1,
        };
        
        set({
          prepAreaIngredients: [...state.prepAreaIngredients, preparedIngredient],
        });
      },
      
      removeFromPrepArea: (index: number) => {
        set(state => ({
          prepAreaIngredients: state.prepAreaIngredients.filter((_, i) => i !== index),
        }));
      },
      
      addToVessel: (preparedIngredient: PreparedIngredient) => {
        set(state => {
          const newVessel = [...state.vesselIngredients, preparedIngredient];
          const newProfile = calculateCombinedProfile(newVessel);
          
          return {
            vesselIngredients: newVessel,
            currentFlavorProfile: newProfile,
          };
        });
      },
      
      removeFromVessel: (index: number) => {
        set(state => {
          const newVessel = state.vesselIngredients.filter((_, i) => i !== index);
          const newProfile = calculateCombinedProfile(newVessel);
          
          return {
            vesselIngredients: newVessel,
            currentFlavorProfile: newProfile,
          };
        });
      },
      
      setSelectedPrepMethod: (method: PrepMethod) => {
        set({ selectedPrepMethod: method });
      },
      
      clearVessel: () => {
        set({
          vesselIngredients: [],
          currentFlavorProfile: { ...INITIAL_FLAVOR_PROFILE },
        });
      },
      
      // ==================================================
      // BIOLOGY PHASE ACTIONS
      // ==================================================
      
      setCurrentChallenge: (index: number) => {
        set({ currentChallengeIndex: index });
      },
      
      submitChallengeResponse: (challengeId: string, response: unknown) => {
        set(state => {
          const newResponses = new Map(state.challengeResponses);
          newResponses.set(challengeId, response);
          return { challengeResponses: newResponses };
        });
      },
      
      // ==================================================
      // TIMER ACTIONS
      // ==================================================
      
      decrementGlobalTimer: () => {
        set(state => ({
          globalTimeRemaining: Math.max(0, state.globalTimeRemaining - 1),
        }));
      },
      
      decrementPhaseTimer: () => {
        const state = get();
        const newTime = state.phaseTimeRemaining - 1;
        
        if (newTime <= 0) {
          // Auto-advance phase
          if (state.phase === 'build') {
            get().endBuildPhase();
          } else if (state.phase === 'biology_defense') {
            get().submitBiologyAnswers();
          }
        } else {
          set({ phaseTimeRemaining: newTime });
        }
      },
      
      setPhaseTimer: (seconds: number) => {
        set({ phaseTimeRemaining: seconds });
      },
      
      // ==================================================
      // UI ACTIONS
      // ==================================================
      
      toggleHints: () => {
        set(state => ({ showHints: !state.showHints }));
      },
      
      setTutorialStep: (step: number) => {
        set({ tutorialStep: step });
      },
      
      addNotification: (notification) => {
        const id = uuidv4();
        set(state => ({
          notifications: [...state.notifications, { ...notification, id }],
        }));
        
        // Auto-remove after duration
        setTimeout(() => {
          get().removeNotification(id);
        }, notification.duration);
      },
      
      removeNotification: (id: string) => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id),
        }));
      },
      
      // ==================================================
      // SCORING
      // ==================================================
      
      calculateRoundScore: () => {
        const state = get();
        const round = GAME_ROUNDS[state.currentRound];
        
        const culinaryScore = calculateCulinaryScore(
          state.vesselIngredients,
          round.order.flavorGoal.targetProfile,
          round.order.requiredIngredients,
          round.order.forbiddenIngredients
        );
        
        const biologyScore = calculateBiologyScore(
          state.currentChallenges,
          state.challengeResponses,
          state.consecutiveCorrect
        );
        
        // Time bonus: faster = more points (max 10% of base)
        const timeUsed = round.buildPhaseTime + round.biologyPhaseTime - state.phaseTimeRemaining;
        const maxTime = round.buildPhaseTime + round.biologyPhaseTime;
        const timeBonus = Math.round(((maxTime - timeUsed) / maxTime) * round.order.basePoints * 0.1);
        
        // Weighted total: 30% culinary, 60% biology, 10% time
        const rawTotal = (culinaryScore.total * 0.3) + (biologyScore.total * 0.6) + timeBonus;
        const multiplier = round.roundNumber === 6 ? 1.5 : 1; // Final boss multiplier
        const totalScore = Math.round(rawTotal * multiplier);
        
        return {
          roundNumber: state.currentRound + 1,
          culinaryScore,
          biologyScore,
          timeBonus,
          totalScore,
          completionTime: timeUsed,
        };
      },
      
      // ==================================================
      // LEADERBOARD
      // ==================================================
      
      getLeaderboard: () => {
        const state = get();
        if (!state.session) return [];
        
        // Sort by: total score, then biology score, then time, then final round
        return [...state.session.players].sort((a, b) => {
          if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
          if (b.biologyTotalScore !== a.biologyTotalScore) return b.biologyTotalScore - a.biologyTotalScore;
          if (a.totalTime !== b.totalTime) return a.totalTime - b.totalTime;
          
          const aFinal = a.scores[5]?.totalScore || 0;
          const bFinal = b.scores[5]?.totalScore || 0;
          return bFinal - aFinal;
        });
      },
      
      // ==================================================
      // RESET
      // ==================================================
      
      resetGame: () => {
        set(createInitialState());
      },
    }),
    {
      name: 'flavour-firekeeper-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist session and player data
        session: state.session,
        currentPlayer: state.currentPlayer,
      }),
    }
  )
);

// ==================================================
// LEADERBOARD STORAGE (for multi-device)
// ==================================================

const LEADERBOARD_KEY = 'flavour-firekeeper-leaderboard';

export function saveToLeaderboard(player: Player) {
  try {
    const existing = localStorage.getItem(LEADERBOARD_KEY);
    const leaderboard: Player[] = existing ? JSON.parse(existing) : [];
    
    // Add or update player
    const existingIndex = leaderboard.findIndex(p => p.id === player.id);
    if (existingIndex >= 0) {
      leaderboard[existingIndex] = player;
    } else {
      leaderboard.push(player);
    }
    
    // Keep top 100
    leaderboard.sort((a, b) => b.totalScore - a.totalScore);
    const trimmed = leaderboard.slice(0, 100);
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Failed to save to leaderboard:', e);
  }
}

export function loadLeaderboard(): Player[] {
  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.warn('Failed to load leaderboard:', e);
    return [];
  }
}

export function clearLeaderboard() {
  localStorage.removeItem(LEADERBOARD_KEY);
}
