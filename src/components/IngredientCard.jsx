import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

const tasteColorMap = {
  sweet: { bg: 'bg-sweet-light', border: 'border-sweet', text: 'text-sweet-dark', bar: 'bg-sweet' },
  sour: { bg: 'bg-sour-light', border: 'border-sour', text: 'text-sour-dark', bar: 'bg-sour' },
  bitter: { bg: 'bg-bitter-light', border: 'border-bitter', text: 'text-bitter-dark', bar: 'bg-bitter' },
  umami: { bg: 'bg-umami-light', border: 'border-umami', text: 'text-umami-dark', bar: 'bg-umami' },
  salty: { bg: 'bg-salty-light', border: 'border-salty', text: 'text-salty-dark', bar: 'bg-salty' },
};

export default function IngredientCard({ ingredient, onClose, studyMode }) {
  const { dispatch } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${ingredient.bgGradient} p-6 rounded-t-3xl text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
          >
            ✕
          </button>
          <div className="text-6xl mb-2">{ingredient.emoji}</div>
          <h2 className="font-display text-3xl font-bold">{ingredient.name}</h2>
          <p className="text-white/80 text-sm mt-1 capitalize">{ingredient.category}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Cultural Context */}
          <div>
            <h3 className="font-display text-lg font-bold text-earth-800 mb-2 flex items-center gap-2">
              🏛️ Cultural Context
            </h3>
            <p className="text-earth-600 text-sm leading-relaxed">{ingredient.culturalContext}</p>
          </div>

          {/* Taste Profile */}
          <div>
            <h3 className="font-display text-lg font-bold text-earth-800 mb-3 flex items-center gap-2">
              👅 Taste Profile
            </h3>
            <div className="space-y-2">
              {Object.entries(ingredient.tasteProfile).map(([taste, value]) => (
                <div key={taste} className="flex items-center gap-3">
                  <span className={`text-xs font-bold uppercase w-14 ${tasteColorMap[taste].text}`}>
                    {taste}
                  </span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full ${tasteColorMap[taste].bar} rounded-full`}
                    />
                  </div>
                  <span className="text-xs text-earth-500 w-8 text-right">
                    {Math.round(value * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Receptors Activated */}
          <div>
            <h3 className="font-display text-lg font-bold text-earth-800 mb-3 flex items-center gap-2">
              🧬 Receptors Activated
            </h3>
            <div className="space-y-3">
              {ingredient.receptorsActivated.map((rec, i) => (
                <div
                  key={i}
                  className={`${tasteColorMap[rec.type]?.bg || 'bg-gray-100'} border ${tasteColorMap[rec.type]?.border || 'border-gray-300'} rounded-xl p-4`}
                >
                  <div className="font-display font-bold text-sm text-earth-900">
                    {rec.receptor}
                  </div>
                  <div className="text-xs text-earth-600 mt-1">{rec.description}</div>
                  {studyMode && (
                    <button
                      onClick={() => {
                        dispatch({ type: 'SHOW_PATHWAY', payload: rec.type });
                        onClose();
                      }}
                      className="mt-2 text-xs bg-earth-800 text-white px-3 py-1 rounded-full hover:bg-earth-700 transition-colors"
                    >
                      🔬 View Full Pathway →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Smell Compounds */}
          <div>
            <h3 className="font-display text-lg font-bold text-earth-800 mb-3 flex items-center gap-2">
              👃 Smell Compounds
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredient.smellCompounds.map((compound, i) => (
                <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="font-mono text-xs font-bold text-orange-800">
                    {compound.name}
                  </div>
                  <div className="text-xs text-orange-600 mt-0.5">{compound.description}</div>
                </div>
              ))}
            </div>
            {studyMode && (
              <button
                onClick={() => {
                  dispatch({ type: 'SHOW_PATHWAY', payload: 'smell' });
                  onClose();
                }}
                className="mt-3 text-xs bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                👃 View Olfactory Pathway →
              </button>
            )}
          </div>

          {/* Molecular Details (Study Mode) */}
          {studyMode && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <h3 className="font-display text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                📚 Molecular Details (Study Mode)
              </h3>
              <div className="text-sm text-indigo-800 space-y-2">
                <div>
                  <span className="font-bold">Key tastant molecules:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ingredient.molecularDetails.tastants.map((t, i) => (
                      <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-bold">Activated pathways:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ingredient.molecularDetails.pathways.map((p, i) => (
                      <span key={i} className={`${tasteColorMap[p]?.bar || 'bg-gray-500'} text-white px-2 py-0.5 rounded text-xs uppercase font-bold`}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-bold">Cooking methods:</span>{' '}
                  {ingredient.cookingMethods.join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
