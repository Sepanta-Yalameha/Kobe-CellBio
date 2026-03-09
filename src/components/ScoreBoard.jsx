import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import INGREDIENTS from '../data/ingredients';
import RECIPES from '../data/recipes';
import QUIZZES from '../data/quizzes';

export default function ScoreBoard() {
  const { state, dispatch } = useGame();

  const totalIngredients = INGREDIENTS.length;
  const totalRecipes = RECIPES.length;
  const totalPathways = 6; // sweet, sour, salty, bitter, umami, smell

  const quizAccuracy =
    state.totalQuizzesAnswered > 0
      ? Math.round((state.correctAnswers / state.totalQuizzesAnswered) * 100)
      : 0;

  const stats = [
    {
      label: 'Total Score',
      value: state.score,
      icon: '⭐',
      color: 'from-yellow-400 to-amber-500',
    },
    {
      label: 'Ingredients Found',
      value: `${state.discoveredIngredients.length}/${totalIngredients}`,
      icon: '🌿',
      color: 'from-green-400 to-emerald-600',
    },
    {
      label: 'Recipes Unlocked',
      value: `${state.unlockedRecipes.length}/${totalRecipes}`,
      icon: '📖',
      color: 'from-orange-400 to-red-500',
    },
    {
      label: 'Pathways Completed',
      value: `${state.completedPathways.length}/${totalPathways}`,
      icon: '🔬',
      color: 'from-blue-400 to-indigo-600',
    },
    {
      label: 'Quizzes Answered',
      value: state.totalQuizzesAnswered,
      icon: '🧠',
      color: 'from-purple-400 to-pink-500',
    },
    {
      label: 'Quiz Accuracy',
      value: `${quizAccuracy}%`,
      icon: '🎯',
      color: 'from-teal-400 to-cyan-600',
    },
    {
      label: 'Dishes Created',
      value: state.createdDishes.length,
      icon: '🍽️',
      color: 'from-rose-400 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-earth-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl font-bold text-earth-900 mb-2">
            🏆 Score Board
          </h2>
          <p className="text-earth-600 font-body">Your progress in the Indigenous Flavor Lab</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-lg border border-earth-200 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-display font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs text-earth-500 mt-1 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Unlocked Recipes */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-earth-200 mb-6">
          <h3 className="font-display text-xl font-bold text-earth-900 mb-4">📖 Recipe Book</h3>
          {RECIPES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {RECIPES.map((recipe) => {
                const isUnlocked = state.unlockedRecipes.includes(recipe.id);
                return (
                  <div
                    key={recipe.id}
                    className={`rounded-xl p-4 border-2 transition-all ${
                      isUnlocked
                        ? 'bg-green-50 border-green-300'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{isUnlocked ? recipe.emoji : '🔒'}</div>
                      <div>
                        <div className="font-display font-bold text-sm text-earth-900">
                          {isUnlocked ? recipe.name : '???'}
                        </div>
                        {isUnlocked && (
                          <p className="text-xs text-earth-500 mt-0.5">{recipe.description}</p>
                        )}
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] text-earth-400">
                            {recipe.requiredIngredients
                              .map(
                                (id) =>
                                  INGREDIENTS.find((i) => i.id === id)?.emoji || '?'
                              )
                              .join(' + ')}
                          </span>
                        </div>
                      </div>
                      {isUnlocked && (
                        <span className="ml-auto text-green-500 text-lg">✓</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-earth-400 text-center py-4">No recipes yet — start cooking!</p>
          )}
        </div>

        {/* Created Dishes */}
        {state.createdDishes.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-earth-200 mb-6">
            <h3 className="font-display text-xl font-bold text-earth-900 mb-4">
              🍽️ Your Creations
            </h3>
            <div className="space-y-3">
              {state.createdDishes.map((dish, i) => (
                <div key={i} className="bg-earth-50 rounded-xl p-3 flex items-center gap-3">
                  <div className="text-2xl">🍽️</div>
                  <div>
                    <div className="font-display text-sm font-bold text-earth-900">{dish.name}</div>
                    <div className="text-[10px] text-earth-500">
                      {dish.ingredients
                        .map((id) => INGREDIENTS.find((i) => i.id === id)?.name)
                        .join(', ')}{' '}
                      • {dish.method}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reset */}
        <div className="text-center">
          <button
            onClick={() => {
              if (window.confirm('Reset all progress? This cannot be undone.')) {
                dispatch({ type: 'RESET_GAME' });
              }
            }}
            className="text-xs text-earth-400 hover:text-red-500 transition-colors"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}
