import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import INGREDIENTS from '../data/ingredients';
import IngredientCard from './IngredientCard';

const tasteColors = {
  sweet: 'bg-sweet',
  sour: 'bg-sour',
  bitter: 'bg-bitter',
  umami: 'bg-umami',
  salty: 'bg-salty',
};

export default function IngredientDiscovery() {
  const { state, dispatch } = useGame();
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(INGREDIENTS.map((i) => i.category))];

  const filtered =
    filter === 'all'
      ? INGREDIENTS
      : INGREDIENTS.filter((i) => i.category === filter);

  const handleSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
    dispatch({ type: 'DISCOVER_INGREDIENT', payload: ingredient.id });
  };

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
            🌿 Ingredient Discovery
          </h2>
          <p className="text-earth-600 font-body max-w-2xl mx-auto">
            Click each ingredient to learn about its taste profile, smell compounds,
            and which molecular receptors it activates. Discover all ingredients to earn bonus points!
          </p>
          <div className="mt-2 text-sm text-earth-500">
            Discovered: {state.discoveredIngredients.length} / {INGREDIENTS.length}
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                filter === cat
                  ? 'bg-indigenous-terracotta text-white shadow-lg'
                  : 'bg-white text-earth-600 hover:bg-earth-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ingredient Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filtered.map((ingredient, idx) => (
            <motion.div
              key={ingredient.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => handleSelect(ingredient)}
              className={`cursor-pointer relative group`}
            >
              <div
                className={`bg-gradient-to-br ${ingredient.bgGradient} rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full`}
              >
                {state.discoveredIngredients.includes(ingredient.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {ingredient.emoji}
                </div>
                <h3 className="font-display text-lg font-bold mb-1">
                  {ingredient.name}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(ingredient.tasteProfile)
                    .filter(([_, v]) => v > 0.3)
                    .map(([taste]) => (
                      <span
                        key={taste}
                        className={`${tasteColors[taste]} px-2 py-0.5 rounded-full text-[10px] font-bold uppercase`}
                      >
                        {taste}
                      </span>
                    ))}
                </div>
                <p className="text-white/70 text-xs mt-2 line-clamp-2">
                  {ingredient.receptorsActivated[0]?.receptor}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Ingredient Detail Modal */}
        <AnimatePresence>
          {selectedIngredient && (
            <IngredientCard
              ingredient={selectedIngredient}
              onClose={() => setSelectedIngredient(null)}
              studyMode={state.studyMode}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
