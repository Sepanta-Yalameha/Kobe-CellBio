// ==================================================
// FLAVOUR FIREKEEPER: MAIN APP
// ==================================================

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { Tutorial } from './components/Tutorial';
import { GameHeader } from './components/GameHeader';
import { Kitchen } from './components/Kitchen';
import { BiologyDefense } from './components/BiologyDefense';
import { RoundResults } from './components/RoundResults';
import { Leaderboard } from './components/Leaderboard';
import { Notifications, StreakIndicator } from './components/Notifications';

// ==================================================
// GAME OVER TRANSITION
// ==================================================

function GameOver() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-4"
        >
          🔥
        </motion.div>
        <h1 className="text-4xl font-bold text-white mb-2">
          The Fire Burns Eternal
        </h1>
        <p className="text-gray-400">
          Calculating final scores...
        </p>
      </motion.div>
    </motion.div>
  );
}

// ==================================================
// MAIN APP COMPONENT
// ==================================================

function App() {
  const phase = useGameStore(state => state.phase);
  const globalTimeRemaining = useGameStore(state => state.globalTimeRemaining);
  const endGame = useGameStore(state => state.endGame);

  // Auto-end game when global timer runs out
  useEffect(() => {
    if (globalTimeRemaining <= 0 && phase !== 'leaderboard' && phase !== 'game_over' && phase !== 'start') {
      endGame();
    }
  }, [globalTimeRemaining, phase, endGame]);

  // Render content based on phase
  const renderContent = () => {
    switch (phase) {
      case 'start':
        return <StartScreen />;

      case 'tutorial':
        return (
          <>
            <StartScreen />
            <Tutorial />
          </>
        );

      case 'build':
        return (
          <>
            <GameHeader />
            <Kitchen />
            <StreakIndicator />
          </>
        );

      case 'biology_defense':
        return (
          <>
            <GameHeader />
            <BiologyDefense />
            <StreakIndicator />
          </>
        );

      case 'round_results':
        return (
          <>
            <GameHeader />
            <RoundResults />
          </>
        );

      case 'game_over':
        return <GameOver />;

      case 'leaderboard':
        return <Leaderboard />;

      default:
        return <StartScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23]">
      {/* Animated background */}
      <div className="bg-particles" />

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Global notifications */}
      <Notifications />

      {/* Time warning overlay */}
      <AnimatePresence>
        {globalTimeRemaining <= 60 && globalTimeRemaining > 0 && 
         phase !== 'start' && phase !== 'leaderboard' && phase !== 'game_over' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-red-500/20 py-1 text-center z-40"
          >
            <span className="text-red-400 font-medium text-sm">
              ⚠️ Less than 1 minute remaining!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
