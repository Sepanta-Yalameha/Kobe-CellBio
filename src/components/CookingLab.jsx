import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import INGREDIENTS from '../data/ingredients';
import FlavorProfile from './FlavorProfile';

export default function CookingLab() {
  const { state, dispatch } = useGame();
  const [isBoiling, setIsBoiling] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const potIngredients = state.cookingPot
    .map((id) => INGREDIENTS.find((i) => i.id === id))
    .filter(Boolean);

  const availableIngredients = INGREDIENTS.filter(
    (i) => !state.cookingPot.includes(i.id)
  );

  const handleCook = () => {
    if (state.cookingPot.length < 2) return;
    setIsBoiling(true);
    setTimeout(() => {
      dispatch({ type: 'COOK' });
      setIsBoiling(false);
      setShowResult(true);
    }, 1500);
  };

  const handleReset = () => {
    dispatch({ type: 'CLEAR_POT' });
    setShowResult(false);
  };

  // Calculate combined flavor for preview
  const previewFlavor = { sweet: 0, sour: 0, bitter: 0, umami: 0, salty: 0 };
  if (potIngredients.length > 0) {
    potIngredients.forEach((ing) => {
      Object.keys(previewFlavor).forEach((k) => {
        previewFlavor[k] += ing.tasteProfile[k];
      });
    });
    Object.keys(previewFlavor).forEach((k) => {
      previewFlavor[k] = Math.min(1, previewFlavor[k] / potIngredients.length);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-earth-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl font-bold text-earth-900 mb-2">
            🍳 Cooking Lab
          </h2>
          <p className="text-earth-600 font-body">
            Add 2–4 ingredients to the pot, then cook to discover recipes and test your biology
            knowledge!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ingredient Shelf */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200">
              <h3 className="font-display text-lg font-bold text-earth-800 mb-3">
                🧺 Ingredient Shelf
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availableIngredients.map((ing) => (
                  <motion.button
                    key={ing.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch({ type: 'ADD_TO_POT', payload: ing.id })}
                    className={`bg-gradient-to-br ${ing.bgGradient} rounded-xl p-3 text-white text-left hover:shadow-lg transition-shadow`}
                    disabled={state.cookingPot.length >= 4}
                  >
                    <div className="text-2xl mb-1">{ing.emoji}</div>
                    <div className="text-xs font-bold truncate">{ing.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Cooking Pot */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200 flex flex-col items-center">
              <h3 className="font-display text-lg font-bold text-earth-800 mb-4">
                🥘 Cooking Pot
              </h3>

              {/* Pot Visual */}
              <div className="relative w-56 h-56 mb-4">
                {/* Pot body */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-40 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-[50%] rounded-t-lg border-4 border-gray-700 overflow-hidden">
                  {/* Liquid */}
                  <motion.div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-amber-800 to-amber-600"
                    animate={{
                      height: potIngredients.length > 0 ? `${30 + potIngredients.length * 15}%` : '10%',
                    }}
                    transition={{ type: 'spring' }}
                  />

                  {/* Bubbles when boiling */}
                  {isBoiling && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 bg-white/30 rounded-full"
                          style={{ left: `${20 + Math.random() * 60}%` }}
                          animate={{
                            y: [0, -80],
                            opacity: [0.6, 0],
                            scale: [0.5, 1.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeOut',
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* Ingredients in pot */}
                  <div className="absolute inset-0 flex items-center justify-center flex-wrap gap-1 p-2">
                    <AnimatePresence>
                      {potIngredients.map((ing) => (
                        <motion.div
                          key={ing.id}
                          initial={{ scale: 0, y: -40 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0 }}
                          className="text-2xl cursor-pointer hover:scale-125 transition-transform relative z-10"
                          onClick={() =>
                            dispatch({ type: 'REMOVE_FROM_POT', payload: ing.id })
                          }
                          title={`Remove ${ing.name}`}
                        >
                          {ing.emoji}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Pot handles */}
                <div className="absolute bottom-16 -left-1 w-6 h-4 bg-gray-700 rounded-l-full" />
                <div className="absolute bottom-16 -right-1 w-6 h-4 bg-gray-700 rounded-r-full" />

                {/* Steam */}
                {potIngredients.length > 0 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-3">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-8 bg-gray-300/40 rounded-full"
                        animate={{ y: [0, -15, 0], opacity: [0.4, 0.1, 0.4] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-earth-500 mb-3">
                {potIngredients.length === 0
                  ? 'Click ingredients to add them'
                  : 'Click an ingredient in the pot to remove it'}
              </p>

              {/* Pot status */}
              <div className="text-sm font-semibold text-earth-700 mb-4">
                {potIngredients.length}/4 ingredients
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCook}
                  disabled={potIngredients.length < 2 || isBoiling}
                  className={`px-6 py-3 rounded-xl font-display font-bold text-white text-sm transition-all ${
                    potIngredients.length >= 2 && !isBoiling
                      ? 'bg-gradient-to-r from-indigenous-red to-indigenous-orange hover:shadow-lg cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isBoiling ? '🔥 Cooking...' : '🔥 Cook!'}
                </motion.button>
                <button
                  onClick={handleReset}
                  className="px-4 py-3 rounded-xl font-display font-bold text-earth-600 text-sm bg-earth-100 hover:bg-earth-200 transition-colors"
                >
                  🗑️ Clear
                </button>
              </div>
            </div>
          </div>

          {/* Result / Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200">
              {showResult && state.currentRecipeResult ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{state.currentRecipeResult.emoji}</div>
                    <h3 className="font-display text-xl font-bold text-earth-900">
                      {state.currentRecipeResult.name}
                    </h3>
                    <p className="text-sm text-earth-600 mt-1">
                      {state.currentRecipeResult.description}
                    </p>
                    {state.currentRecipeResult.points && (
                      <div className="mt-2 inline-block bg-indigenous-gold/20 text-indigenous-gold px-3 py-1 rounded-full text-sm font-bold">
                        +{state.currentRecipeResult.points} points!
                      </div>
                    )}
                  </div>

                  <FlavorProfile profile={state.currentRecipeResult.flavorProfile} />

                  {state.currentRecipeResult.scienceFact && (
                    <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-3">
                      <div className="text-xs font-bold text-indigo-800 mb-1">🔬 Science Fact</div>
                      <p className="text-xs text-indigo-700 leading-relaxed">
                        {state.currentRecipeResult.scienceFact}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleReset}
                    className="w-full mt-4 px-4 py-2 bg-indigenous-teal text-white rounded-xl font-display font-bold hover:bg-indigenous-teal/90 transition-colors text-sm"
                  >
                    Cook Something New 🍳
                  </button>
                </motion.div>
              ) : (
                <div>
                  <h3 className="font-display text-lg font-bold text-earth-800 mb-3">
                    📊 Flavor Preview
                  </h3>
                  {potIngredients.length > 0 ? (
                    <FlavorProfile profile={previewFlavor} />
                  ) : (
                    <div className="text-center text-earth-400 py-8">
                      <div className="text-4xl mb-2">🧪</div>
                      <p className="text-sm">Add ingredients to see flavor preview</p>
                    </div>
                  )}

                  {/* Activated receptors preview */}
                  {potIngredients.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-display text-sm font-bold text-earth-700 mb-2">
                        Activated Receptors:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {[...new Set(
                          potIngredients.flatMap((i) =>
                            i.receptorsActivated.map((r) => r.receptor)
                          )
                        )].map((r, i) => (
                          <span
                            key={i}
                            className="bg-earth-100 text-earth-700 px-2 py-0.5 rounded text-[10px] font-mono"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
