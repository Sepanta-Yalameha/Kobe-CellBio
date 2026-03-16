// ==================================================
// FLAVOUR FIREKEEPER: ROUND RESULTS
// ==================================================

import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { GAME_ROUNDS } from '../data/rounds';

export function RoundResults() {
  const currentRoundScore = useGameStore(state => state.currentRoundScore);
  const currentRound = useGameStore(state => state.currentRound);
  const currentPlayer = useGameStore(state => state.currentPlayer);
  const nextRound = useGameStore(state => state.nextRound);
  const vesselIngredients = useGameStore(state => state.vesselIngredients);

  const round = GAME_ROUNDS[currentRound];
  const isLastRound = currentRound >= GAME_ROUNDS.length - 1;

  if (!currentRoundScore) return null;

  const { culinaryScore, biologyScore, timeBonus, totalScore } = currentRoundScore;

  // Calculate grade
  const getGrade = (score: number): { letter: string; color: string } => {
    if (score >= 90) return { letter: 'A+', color: 'text-[#27ae60]' };
    if (score >= 80) return { letter: 'A', color: 'text-[#27ae60]' };
    if (score >= 70) return { letter: 'B', color: 'text-[#f39c12]' };
    if (score >= 60) return { letter: 'C', color: 'text-[#f39c12]' };
    if (score >= 50) return { letter: 'D', color: 'text-[#e74c3c]' };
    return { letter: 'F', color: 'text-[#e74c3c]' };
  };

  const overallGrade = getGrade((biologyScore.total * 0.6 + culinaryScore.total * 0.4));

  return (
    <div className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="game-card p-8 max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-6xl mb-4"
          >
            {totalScore >= 250 ? '🌟' : totalScore >= 150 ? '✨' : '📜'}
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Round {currentRound + 1} Complete
          </h2>
          <p className="text-gray-400">{round?.title}</p>
        </div>

        {/* Dish Preview */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            {vesselIngredients.map((pi, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-3xl"
              >
                {pi.ingredient.emoji}
              </motion.span>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">
            {round?.order.dishName}
          </div>
        </div>

        {/* Overall Grade */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className={`text-8xl font-bold ${overallGrade.color}`}
          >
            {overallGrade.letter}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-3xl font-bold text-white mt-2"
          >
            +{totalScore} pts
          </motion.div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Culinary Score */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-[#d35400]/10 rounded-lg p-4 border border-[#d35400]/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🍳</span>
              <span className="font-medium text-[#f39c12]">Culinary</span>
              <span className="ml-auto text-white font-bold">
                {culinaryScore.total.toFixed(0)}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Flavor Match</span>
                <span>{culinaryScore.flavorMatchScore}%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Ingredients</span>
                <span>{culinaryScore.ingredientUsageScore}%</span>
              </div>
              {culinaryScore.constraintPenalties > 0 && (
                <div className="flex justify-between text-red-400">
                  <span>Penalties</span>
                  <span>-{culinaryScore.constraintPenalties}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Biology Score */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-[#9b59b6]/10 rounded-lg p-4 border border-[#9b59b6]/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧬</span>
              <span className="font-medium text-[#c084fc]">Biology</span>
              <span className="ml-auto text-white font-bold">
                {biologyScore.total.toFixed(0)}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Receptors</span>
                <span>{biologyScore.receptorIdentificationScore}%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Cell Types</span>
                <span>{biologyScore.cellTypeMatchScore}%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Pathways</span>
                <span>{biologyScore.pathwayAssemblyScore}%</span>
              </div>
              {biologyScore.streakBonus > 0 && (
                <div className="flex justify-between text-[#27ae60]">
                  <span>Streak Bonus</span>
                  <span>+{biologyScore.streakBonus}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Time Bonus */}
        {timeBonus > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#27ae60]/20 
                           text-[#27ae60] rounded-full text-sm">
              ⏱️ Speed Bonus: +{timeBonus} pts
            </span>
          </motion.div>
        )}

        {/* Running Total */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mb-8 pt-6 border-t border-white/10"
        >
          <div className="text-sm text-gray-400 mb-1">Total Score</div>
          <div className="text-4xl font-bold text-white">
            {currentPlayer?.totalScore || 0}
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          onClick={nextRound}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="game-button w-full text-lg"
        >
          {isLastRound ? '🏆 View Final Results' : `➡️ Start Round ${currentRound + 2}`}
        </motion.button>
      </motion.div>
    </div>
  );
}
