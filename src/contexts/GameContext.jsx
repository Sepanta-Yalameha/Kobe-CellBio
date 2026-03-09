import { createContext, useContext, useReducer, useEffect } from 'react';
import INGREDIENTS from '../data/ingredients';
import RECIPES from '../data/recipes';
import QUIZZES from '../data/quizzes';

const GameContext = createContext();

const STORAGE_KEY = 'indigenous-flavor-lab-save';

function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load save:', e);
  }
  return null;
}

const defaultState = {
  currentScreen: 'welcome',
  score: 0,
  totalQuizzesAnswered: 0,
  correctAnswers: 0,
  discoveredIngredients: [],
  unlockedRecipes: [],
  createdDishes: [],
  cookingPot: [],
  currentQuiz: null,
  showQuizModal: false,
  showPathwayAnimation: null,
  studyMode: false,
  scienceFacts: [],
  completedPathways: [],
  currentRecipeResult: null,
  playerName: '',
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };

    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };

    case 'DISCOVER_INGREDIENT': {
      if (state.discoveredIngredients.includes(action.payload)) return state;
      const bonus = state.discoveredIngredients.length === 0 ? 50 : 25;
      return {
        ...state,
        discoveredIngredients: [...state.discoveredIngredients, action.payload],
        score: state.score + bonus,
      };
    }

    case 'ADD_TO_POT': {
      if (state.cookingPot.length >= 4) return state;
      if (state.cookingPot.includes(action.payload)) return state;
      return { ...state, cookingPot: [...state.cookingPot, action.payload] };
    }

    case 'REMOVE_FROM_POT':
      return {
        ...state,
        cookingPot: state.cookingPot.filter((id) => id !== action.payload),
      };

    case 'CLEAR_POT':
      return { ...state, cookingPot: [], currentRecipeResult: null };

    case 'COOK': {
      const potSet = new Set(state.cookingPot);
      let matchedRecipe = null;
      for (const recipe of RECIPES) {
        const required = new Set(recipe.requiredIngredients);
        const allRequired = [...required].every((r) => potSet.has(r));
        if (allRequired) {
          matchedRecipe = recipe;
          break;
        }
      }
      if (matchedRecipe) {
        const alreadyUnlocked = state.unlockedRecipes.includes(matchedRecipe.id);
        return {
          ...state,
          currentRecipeResult: matchedRecipe,
          unlockedRecipes: alreadyUnlocked
            ? state.unlockedRecipes
            : [...state.unlockedRecipes, matchedRecipe.id],
          score: state.score + (alreadyUnlocked ? 10 : matchedRecipe.points),
          showQuizModal: true,
          currentQuiz: getRandomQuizForIngredients(state.cookingPot, state),
        };
      }
      // No recipe matched — give partial credit and flavor analysis
      const flavorProfile = calculateFlavorProfile(state.cookingPot);
      return {
        ...state,
        currentRecipeResult: {
          id: 'custom-' + Date.now(),
          name: 'Experimental Dish',
          emoji: '🧪',
          description: 'An experimental combination! Interesting flavors...',
          flavorProfile,
          points: 20,
          scienceFact: 'Every flavor combination activates a unique pattern of taste receptors. Your brain integrates signals from all five taste types plus olfactory input to create flavor perception.',
        },
        score: state.score + 20,
      };
    }

    case 'ANSWER_QUIZ': {
      const { correct } = action.payload;
      return {
        ...state,
        totalQuizzesAnswered: state.totalQuizzesAnswered + 1,
        correctAnswers: state.correctAnswers + (correct ? 1 : 0),
        score: state.score + (correct ? 50 : 0),
        showQuizModal: false,
        currentQuiz: null,
      };
    }

    case 'SHOW_QUIZ':
      return { ...state, showQuizModal: true, currentQuiz: action.payload };

    case 'CLOSE_QUIZ':
      return { ...state, showQuizModal: false, currentQuiz: null };

    case 'SHOW_PATHWAY':
      return { ...state, showPathwayAnimation: action.payload };

    case 'CLOSE_PATHWAY':
      return { ...state, showPathwayAnimation: null };

    case 'COMPLETE_PATHWAY': {
      if (state.completedPathways.includes(action.payload)) return state;
      return {
        ...state,
        completedPathways: [...state.completedPathways, action.payload],
        score: state.score + 30,
      };
    }

    case 'TOGGLE_STUDY_MODE':
      return { ...state, studyMode: !state.studyMode };

    case 'ADD_SCIENCE_FACT': {
      if (state.scienceFacts.includes(action.payload)) return state;
      return { ...state, scienceFacts: [...state.scienceFacts, action.payload] };
    }

    case 'CREATE_DISH': {
      return {
        ...state,
        createdDishes: [...state.createdDishes, action.payload],
        score: state.score + 75,
      };
    }

    case 'RESET_GAME':
      return { ...defaultState };

    default:
      return state;
  }
}

function getRandomQuizForIngredients(potIngredients, state) {
  // Determine which pathways the pot ingredients activate
  const activatedPathways = new Set();
  for (const ingId of potIngredients) {
    const ing = INGREDIENTS.find((i) => i.id === ingId);
    if (ing) {
      ing.molecularDetails.pathways.forEach((p) => activatedPathways.add(p));
    }
  }
  // Also include smell
  activatedPathways.add('smell');

  // Filter quizzes by activated pathways
  const relevantQuizzes = QUIZZES.filter(
    (q) => activatedPathways.has(q.pathway) || q.category === 'neural'
  );

  if (relevantQuizzes.length === 0) return QUIZZES[0];
  return relevantQuizzes[Math.floor(Math.random() * relevantQuizzes.length)];
}

function calculateFlavorProfile(ingredientIds) {
  const profile = { sweet: 0, sour: 0, bitter: 0, umami: 0, salty: 0 };
  let count = 0;
  for (const id of ingredientIds) {
    const ing = INGREDIENTS.find((i) => i.id === id);
    if (ing) {
      Object.keys(profile).forEach((key) => {
        profile[key] += ing.tasteProfile[key];
      });
      count++;
    }
  }
  if (count > 0) {
    Object.keys(profile).forEach((key) => {
      profile[key] = Math.min(1, profile[key] / count);
    });
  }
  return profile;
}

export function GameProvider({ children }) {
  const saved = loadSavedState();
  const [state, dispatch] = useReducer(gameReducer, saved || defaultState);

  // Auto-save
  useEffect(() => {
    const toSave = { ...state, showQuizModal: false, currentQuiz: null, showPathwayAnimation: null };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export { calculateFlavorProfile };
