// ==================================================
// FLAVOUR FIREKEEPER: START SCREEN
// ==================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function StartScreen() {
  const [playerName, setPlayerName] = useState('');
  const startNewSession = useGameStore(state => state.startNewSession);

  const handleStart = () => {
    if (playerName.trim().length >= 2) {
      startNewSession(playerName.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-particles" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="game-card p-8 md:p-12 max-w-xl w-full text-center"
      >
        {/* Logo / Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <div className="text-6xl mb-4">🔥</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif text-[#f39c12]">
            FLAVOUR FIREKEEPER
          </h1>
          <p className="text-lg text-[#d4a574] mb-1 font-serif italic">
            Indigenous Cell Bio Kitchen
          </p>
          <p className="text-sm text-gray-400 mb-8">
            A competitive cell biology × flavour science game
          </p>
        </motion.div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d35400] to-transparent" />
          <span className="text-xl">🌾</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d35400] to-transparent" />
        </div>

        {/* Player name input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <label className="block text-left text-sm text-gray-400 mb-2">
            Enter your name to join
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                       text-white placeholder-gray-500 focus:outline-none focus:border-[#f39c12]
                       transition-colors text-lg"
            maxLength={20}
            autoFocus
          />
        </motion.div>

        {/* Start button */}
        <motion.button
          onClick={handleStart}
          disabled={playerName.trim().length < 2}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="game-button w-full text-lg mb-6"
        >
          🔥 Begin Journey
        </motion.button>

        {/* Game info */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-gray-400">10 min</div>
            <div className="text-xs text-gray-500">session</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-2xl mb-1">🧬</div>
            <div className="text-gray-400">6 rounds</div>
            <div className="text-xs text-gray-500">of biology</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-gray-400">16 players</div>
            <div className="text-xs text-gray-500">compete</div>
          </div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500"
        >
          <p className="mb-2">
            🎃 Pumpkin • 🥚 Egg • 🫐 Blackberry • 🌰 Walnut • 🌾 Wild Rice
          </p>
          <p>
            Master the science of taste and smell to win
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
