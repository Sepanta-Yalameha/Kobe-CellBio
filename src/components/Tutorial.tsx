// ==================================================
// FLAVOUR FIREKEEPER: TUTORIAL
// ==================================================

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface TutorialStep {
  title: string;
  content: string;
  emoji: string;
  highlight?: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Welcome, Firekeeper!',
    content: 'You are about to embark on a journey through flavour science and cell biology. Your mission: create dishes and defend them with your knowledge of taste transduction.',
    emoji: '🔥',
  },
  {
    title: 'The Kitchen Phase',
    content: 'Drag ingredients from the Pantry to the Prep Area. Choose a preparation method (roast, boil, etc.), then drag prepared items to the Cooking Vessel to build your dish.',
    emoji: '🍳',
    highlight: 'pantry',
  },
  {
    title: 'Flavor Balance',
    content: 'Watch the Flavor Profile as you add ingredients. Match the target profile to score points. The 5 mandatory ingredients (🎃🥚🫐🌰🌾) are essential to your success.',
    emoji: '📊',
    highlight: 'flavor-profile',
  },
  {
    title: 'Biology Defense',
    content: 'After submitting your dish, you must DEFEND it with biology knowledge. This phase determines most of your score. Identify receptors, match cell types, and assemble signaling pathways.',
    emoji: '🧬',
  },
  {
    title: 'Key Pathways',
    content: 'Sweet/Umami/Bitter use Type II cells → GPCRs → Gustducin → PLCβ2 → IP3 → Ca²⁺ → ATP release. Sour uses Type III cells → OTOP1 → H⁺ entry → Serotonin release. Smell uses olfactory neurons → Golf → cAMP → CNG channels.',
    emoji: '🔬',
  },
  {
    title: 'Time & Scoring',
    content: 'You have 10 minutes total for 6 rounds. Scoring: 60% Biology, 30% Culinary, 10% Speed. The biology ALWAYS matters most. Ready to begin?',
    emoji: '⏱️',
  },
];

export function Tutorial() {
  const tutorialStep = useGameStore(state => state.tutorialStep);
  const setTutorialStep = useGameStore(state => state.setTutorialStep);
  const startRound = useGameStore(state => state.startRound);

  const currentStep = TUTORIAL_STEPS[tutorialStep];
  const isLastStep = tutorialStep >= TUTORIAL_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      startRound();
    } else {
      setTutorialStep(tutorialStep + 1);
    }
  };

  const handleSkip = () => {
    startRound();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="game-card p-8 max-w-lg w-full"
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {TUTORIAL_STEPS.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= tutorialStep ? 'bg-[#f39c12]' : 'bg-white/20'
              }`}
              animate={index === tutorialStep ? { scale: [1, 1.5, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tutorialStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-6xl mb-4"
            >
              {currentStep.emoji}
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-4">
              {currentStep.title}
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              {currentStep.content}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSkip}
            className="flex-1 py-3 px-4 rounded-lg border border-white/20 text-gray-400
                     hover:border-white/40 hover:text-white transition-colors"
          >
            Skip Tutorial
          </button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="game-button flex-1"
          >
            {isLastStep ? '🔥 Start Game' : 'Next →'}
          </motion.button>
        </div>

        {/* Step indicator */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Step {tutorialStep + 1} of {TUTORIAL_STEPS.length}
        </div>
      </motion.div>
    </div>
  );
}

// ==================================================
// IN-GAME HINT TOOLTIP
// ==================================================

interface HintTooltipProps {
  hint: string;
  onDismiss: () => void;
}

export function HintTooltip({ hint, onDismiss }: HintTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md 
                 bg-[#9b59b6]/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-40"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div className="flex-1">
          <div className="text-white font-medium mb-1">Hint</div>
          <div className="text-white/80 text-sm">{hint}</div>
        </div>
        <button
          onClick={onDismiss}
          className="text-white/50 hover:text-white text-xl"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
