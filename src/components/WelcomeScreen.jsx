import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

const floatingIngredients = [
  { emoji: '🫐', x: '10%', y: '20%', delay: 0 },
  { emoji: '🎃', x: '80%', y: '15%', delay: 0.5 },
  { emoji: '🥜', x: '15%', y: '70%', delay: 1 },
  { emoji: '🌿', x: '75%', y: '65%', delay: 1.5 },
  { emoji: '🍚', x: '50%', y: '10%', delay: 0.8 },
  { emoji: '🌽', x: '85%', y: '40%', delay: 1.2 },
  { emoji: '🍁', x: '25%', y: '85%', delay: 0.3 },
  { emoji: '🥩', x: '65%', y: '80%', delay: 0.7 },
];

export default function WelcomeScreen() {
  const { dispatch } = useGame();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-earth-900 via-earth-800 to-indigenous-terracotta flex items-center justify-center">
      {/* Floating ingredients */}
      {floatingIngredients.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-6xl select-none pointer-events-none"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigenous-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigenous-teal/10 rounded-full translate-x-1/3 translate-y-1/3" />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        {/* Title badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-block mb-4"
        >
          <span className="bg-indigenous-gold/20 text-indigenous-gold px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase">
            Cell Biology Education Game
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl md:text-7xl font-bold text-white mb-2 leading-tight"
        >
          Indigenous
          <br />
          <span className="bg-gradient-to-r from-indigenous-gold via-indigenous-orange to-indigenous-red bg-clip-text text-transparent">
            Flavor Lab
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-earth-200 text-lg md:text-xl mb-3 font-body"
        >
          The Science of Taste
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-earth-300 text-sm md:text-base mb-10 max-w-xl mx-auto font-body leading-relaxed"
        >
          Explore Indigenous ingredients, cook traditional dishes, and discover the molecular biology
          of how your taste buds and nose detect flavor — from GPCR receptors to neural signaling.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'cooking' })}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigenous-red to-indigenous-orange text-white font-display text-lg font-bold rounded-2xl shadow-lg hover:shadow-indigenous-red/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              🍳 Start Cooking
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigenous-orange to-indigenous-red opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'ingredients' })}
            className="px-8 py-4 bg-white/10 backdrop-blur text-white font-display text-lg font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            🌿 Explore Ingredients
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4"
        >
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'pathways' })}
            className="px-8 py-4 bg-white/10 backdrop-blur text-white font-display text-lg font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            🔬 Learn Taste Science
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'builder' })}
            className="px-8 py-4 bg-white/10 backdrop-blur text-white font-display text-lg font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            👨‍🍳 Build Your Dish
          </button>
        </motion.div>

        {/* Taste legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap gap-3 justify-center"
        >
          {[
            { label: 'Sweet', color: 'bg-sweet', emoji: '🍬' },
            { label: 'Sour', color: 'bg-sour', emoji: '🍋' },
            { label: 'Bitter', color: 'bg-bitter', emoji: '🌿' },
            { label: 'Umami', color: 'bg-umami', emoji: '🥩' },
            { label: 'Salty', color: 'bg-salty', emoji: '🧂' },
          ].map((t) => (
            <span
              key={t.label}
              className={`${t.color} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}
            >
              {t.emoji} {t.label}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
