import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, calculateFlavorProfile } from '../contexts/GameContext';
import INGREDIENTS from '../data/ingredients';
import FlavorProfile from './FlavorProfile';

const cookingMethods = [
  { id: 'boiled', emoji: '♨️', name: 'Boiled', effect: 'Breaks down cell walls, releases more tastants' },
  { id: 'roasted', emoji: '🔥', name: 'Roasted', effect: 'Maillard reaction creates umami compounds' },
  { id: 'raw', emoji: '🥗', name: 'Raw', effect: 'Preserves volatile smell compounds' },
  { id: 'smoked', emoji: '💨', name: 'Smoked', effect: 'Adds phenolic bitter/umami compounds' },
  { id: 'dried', emoji: '☀️', name: 'Dried', effect: 'Concentrates sugars and flavors' },
  { id: 'mashed', emoji: '🥄', name: 'Mashed', effect: 'Increases surface area for receptor binding' },
];

export default function RecipeBuilder() {
  const { state, dispatch } = useGame();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [dishName, setDishName] = useState('');
  const [showResult, setShowResult] = useState(false);

  const toggleIngredient = (id) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 5 ? [...prev, id] : prev
    );
  };

  const selectedData = selectedIngredients
    .map((id) => INGREDIENTS.find((i) => i.id === id))
    .filter(Boolean);

  const flavorProfile = useMemo(() => {
    if (selectedData.length === 0) return null;
    const profile = calculateFlavorProfile(selectedIngredients);

    // Modify based on cooking method
    if (selectedMethod) {
      if (selectedMethod === 'roasted') {
        profile.umami = Math.min(1, profile.umami + 0.15);
        profile.sweet = Math.min(1, profile.sweet + 0.1);
      } else if (selectedMethod === 'smoked') {
        profile.bitter = Math.min(1, profile.bitter + 0.1);
        profile.umami = Math.min(1, profile.umami + 0.1);
      } else if (selectedMethod === 'dried') {
        profile.sweet = Math.min(1, profile.sweet + 0.15);
      }
    }
    return profile;
  }, [selectedIngredients, selectedMethod]);

  // Collect activated receptors
  const activatedReceptors = useMemo(() => {
    return [...new Set(selectedData.flatMap((i) => i.receptorsActivated.map((r) => r)))];
  }, [selectedData]);

  // Collect activated pathways
  const activatedPathways = useMemo(() => {
    return [...new Set(selectedData.flatMap((i) => i.molecularDetails.pathways))];
  }, [selectedData]);

  const handleCreate = () => {
    if (selectedIngredients.length < 2 || !selectedMethod) return;
    const dish = {
      id: 'custom-' + Date.now(),
      name: dishName || 'Custom Indigenous Dish',
      ingredients: selectedIngredients,
      method: selectedMethod,
      flavorProfile,
      activatedReceptors: activatedReceptors.map((r) => r.receptor),
      activatedPathways,
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: 'CREATE_DISH', payload: dish });
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    setSelectedMethod(null);
    setDishName('');
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-earth-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl font-bold text-earth-900 mb-2">
            👨‍🍳 Build Your Dish
          </h2>
          <p className="text-earth-600 font-body max-w-2xl mx-auto">
            Choose ingredients, pick a cooking method, name your creation, and see the complete
            molecular taste analysis.
          </p>
        </motion.div>

        {showResult ? (
          /* RESULT DISPLAY */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigenous-terracotta to-indigenous-orange p-6 text-white text-center">
                <div className="text-5xl mb-2">🍽️</div>
                <h3 className="font-display text-2xl font-bold">
                  {dishName || 'Custom Indigenous Dish'}
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  {selectedData.map((i) => i.emoji).join(' ')} •{' '}
                  {cookingMethods.find((m) => m.id === selectedMethod)?.name}
                </p>
                <div className="mt-3 inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-bold">
                  +75 points!
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Flavor Profile */}
                <div>
                  <h4 className="font-display text-lg font-bold text-earth-800 mb-3">
                    📊 Flavor Profile
                  </h4>
                  <FlavorProfile profile={flavorProfile} />
                </div>

                {/* Activated Receptors */}
                <div>
                  <h4 className="font-display text-lg font-bold text-earth-800 mb-3">
                    🧬 Activated Taste Receptors
                  </h4>
                  <div className="space-y-2">
                    {activatedReceptors.map((rec, i) => (
                      <div key={i} className="flex items-center gap-2 bg-earth-50 rounded-lg p-3">
                        <span className={`w-3 h-3 rounded-full bg-${rec.type}`} />
                        <div>
                          <div className="text-sm font-bold text-earth-800">{rec.receptor}</div>
                          <div className="text-xs text-earth-500">{rec.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Predicted Neural Signaling */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                  <h4 className="font-display text-sm font-bold text-indigo-900 mb-2">
                    🧠 Predicted Neural Signaling
                  </h4>
                  <div className="text-xs text-indigo-800 space-y-1">
                    {activatedPathways.includes('sweet') || activatedPathways.includes('umami') || activatedPathways.includes('bitter') ? (
                      <p>• <strong>GPCR pathway:</strong> Tastant → GPCR → Gustducin → PLCβ2 → IP3 → Ca²⁺ → TRPM5 → ATP → P2X2/P2X3</p>
                    ) : null}
                    {activatedPathways.includes('sour') && (
                      <p>• <strong>Sour pathway:</strong> H⁺ → OTOP1 → pH↓ → K⁺ channels close → depolarization → Ca²⁺ → Serotonin release</p>
                    )}
                    {activatedPathways.includes('salty') && (
                      <p>• <strong>Salt pathway:</strong> Na⁺ → ENaC → direct depolarization → ATP release</p>
                    )}
                    <p>• <strong>Olfactory pathway:</strong> Volatile molecules → OR GPCR → Golf → Adenylate cyclase → cAMP → CNG channels → Olfactory bulb</p>
                    <p className="mt-2 text-indigo-600">Signals travel via cranial nerves VII, IX, and X to the nucleus of the solitary tract, then to the VPM thalamus, and finally the gustatory cortex (insular cortex).</p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigenous-teal to-teal-600 text-white rounded-xl font-display font-bold hover:shadow-lg transition-all"
                >
                  Build Another Dish 🍳
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* BUILDER INTERFACE */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Ingredient Selection */}
            <div className="space-y-4">
              {/* Dish Name */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200">
                <h3 className="font-display text-sm font-bold text-earth-700 uppercase tracking-wider mb-2">
                  Name Your Dish
                </h3>
                <input
                  type="text"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="e.g., Three Sisters Harvest Bowl"
                  className="w-full px-4 py-2 rounded-xl border border-earth-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-indigenous-teal focus:border-transparent"
                />
              </div>

              {/* Ingredients */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200">
                <h3 className="font-display text-sm font-bold text-earth-700 uppercase tracking-wider mb-3">
                  Choose Ingredients (2–5)
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {INGREDIENTS.map((ing) => {
                    const isSelected = selectedIngredients.includes(ing.id);
                    return (
                      <motion.button
                        key={ing.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleIngredient(ing.id)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-indigenous-teal bg-teal-50 shadow-md'
                            : 'border-earth-200 bg-earth-50 hover:bg-earth-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{ing.emoji}</span>
                          <div>
                            <div className="text-xs font-bold text-earth-800">{ing.name}</div>
                            {isSelected && (
                              <span className="text-[10px] text-indigenous-teal font-bold">Selected ✓</span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Cooking Method */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200">
                <h3 className="font-display text-sm font-bold text-earth-700 uppercase tracking-wider mb-3">
                  Cooking Method
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {cookingMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        selectedMethod === method.id
                          ? 'border-indigenous-orange bg-orange-50 shadow-md'
                          : 'border-earth-200 bg-earth-50 hover:bg-earth-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{method.emoji}</div>
                      <div className="text-xs font-bold text-earth-800">{method.name}</div>
                    </button>
                  ))}
                </div>
                {selectedMethod && (
                  <p className="text-xs text-earth-500 mt-2 italic">
                    {cookingMethods.find((m) => m.id === selectedMethod)?.effect}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Preview */}
            <div className="space-y-4">
              {/* Flavor Preview */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200">
                <h3 className="font-display text-sm font-bold text-earth-700 uppercase tracking-wider mb-3">
                  📊 Live Flavor Preview
                </h3>
                {flavorProfile ? (
                  <FlavorProfile profile={flavorProfile} />
                ) : (
                  <p className="text-center text-earth-400 py-6 text-sm">
                    Select ingredients to see flavor preview
                  </p>
                )}
              </div>

              {/* Receptor Preview */}
              {selectedData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200"
                >
                  <h3 className="font-display text-sm font-bold text-earth-700 uppercase tracking-wider mb-3">
                    🧬 Receptor Activation
                  </h3>
                  <div className="space-y-2">
                    {activatedReceptors.map((rec, i) => (
                      <div key={i} className="bg-earth-50 rounded-lg p-2 flex items-start gap-2">
                        <span className="text-base">{rec.type === 'sweet' ? '🍬' : rec.type === 'sour' ? '🍋' : rec.type === 'bitter' ? '🌿' : rec.type === 'umami' ? '🥩' : rec.type === 'salty' ? '🧂' : '👃'}</span>
                        <div>
                          <div className="text-xs font-bold text-earth-800">{rec.receptor}</div>
                          <div className="text-[10px] text-earth-500">{rec.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Smell Compounds */}
              {selectedData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200"
                >
                  <h3 className="font-display text-sm font-bold text-earth-700 uppercase tracking-wider mb-3">
                    👃 Aroma Compounds
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {[...new Set(selectedData.flatMap((i) => i.smellCompounds.map((s) => s.name)))].map((name, i) => (
                      <span key={i} className="bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded text-[10px] font-mono">
                        {name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Create Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreate}
                disabled={selectedIngredients.length < 2 || !selectedMethod}
                className={`w-full px-6 py-4 rounded-2xl font-display font-bold text-lg text-white transition-all ${
                  selectedIngredients.length >= 2 && selectedMethod
                    ? 'bg-gradient-to-r from-indigenous-red to-indigenous-orange hover:shadow-xl cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {selectedIngredients.length < 2
                  ? `Select ${2 - selectedIngredients.length} more ingredient${2 - selectedIngredients.length > 1 ? 's' : ''}`
                  : !selectedMethod
                  ? 'Choose a cooking method'
                  : '🍽️ Create Dish & Analyze'}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
