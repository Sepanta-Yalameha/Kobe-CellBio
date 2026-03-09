import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

const navItems = [
  { id: 'welcome', label: 'Home', emoji: '🏠' },
  { id: 'ingredients', label: 'Ingredients', emoji: '🌿' },
  { id: 'cooking', label: 'Cook', emoji: '🍳' },
  { id: 'pathways', label: 'Science', emoji: '🔬' },
  { id: 'builder', label: 'Build', emoji: '👨‍🍳' },
  { id: 'scoreboard', label: 'Score', emoji: '🏆' },
];

export default function Navbar() {
  const { state, dispatch } = useGame();

  return (
    <nav className="sticky top-0 z-40 bg-earth-900/95 backdrop-blur-md border-b border-earth-700">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'welcome' })}
          className="font-display font-bold text-white text-lg flex items-center gap-2"
        >
          <span className="text-xl">🧪</span>
          <span className="hidden sm:inline bg-gradient-to-r from-indigenous-gold to-indigenous-orange bg-clip-text text-transparent">
            Flavor Lab
          </span>
        </button>

        {/* Nav items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'SET_SCREEN', payload: item.id })}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                state.currentScreen === item.id
                  ? 'text-white'
                  : 'text-earth-400 hover:text-earth-200'
              }`}
            >
              {state.currentScreen === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  transition={{ type: 'spring', duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{item.emoji}</span>
              <span className="relative z-10 hidden md:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Score & Study Mode */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_STUDY_MODE' })}
            className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${
              state.studyMode
                ? 'bg-indigo-500 text-white'
                : 'bg-earth-700 text-earth-400 hover:text-white'
            }`}
          >
            📚 {state.studyMode ? 'Study ON' : 'Study'}
          </button>
          <div className="text-yellow-400 font-display font-bold text-sm">
            ⭐ {state.score}
          </div>
        </div>
      </div>
    </nav>
  );
}
