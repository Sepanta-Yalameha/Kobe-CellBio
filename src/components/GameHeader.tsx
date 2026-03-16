// ==================================================
// FLAVOUR FIREKEEPER: GAME HEADER
// ==================================================

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { GAME_ROUNDS } from '../data/rounds';

export function GameHeader() {
  const phase = useGameStore(state => state.phase);
  const currentRound = useGameStore(state => state.currentRound);
  const globalTimeRemaining = useGameStore(state => state.globalTimeRemaining);
  const phaseTimeRemaining = useGameStore(state => state.phaseTimeRemaining);
  const currentPlayer = useGameStore(state => state.currentPlayer);
  const decrementGlobalTimer = useGameStore(state => state.decrementGlobalTimer);
  const decrementPhaseTimer = useGameStore(state => state.decrementPhaseTimer);
  const consecutiveCorrect = useGameStore(state => state.consecutiveCorrect);

  // Timer effects
  useEffect(() => {
    if (phase === 'build' || phase === 'biology_defense') {
      const interval = setInterval(() => {
        decrementGlobalTimer();
        decrementPhaseTimer();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, decrementGlobalTimer, decrementPhaseTimer]);

  const round = GAME_ROUNDS[currentRound];
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer color based on urgency
  const getTimerColor = (time: number, max: number) => {
    const ratio = time / max;
    if (ratio > 0.5) return 'text-green-400';
    if (ratio > 0.25) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Phase progress
  const getPhaseProgress = () => {
    if (!round) return 0;
    const maxTime = phase === 'build' ? round.buildPhaseTime : round.biologyPhaseTime;
    return ((maxTime - phaseTimeRemaining) / maxTime) * 100;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#1a1a2e] to-transparent">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Player info and round */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="text-sm font-bold text-[#f39c12]">
                  Round {currentRound + 1}/6
                </div>
                <div className="text-xs text-gray-400">
                  {round?.title || 'Starting...'}
                </div>
              </div>
            </div>
            
            <div className="hidden md:block h-8 w-px bg-white/20" />
            
            <div className="hidden md:block text-sm">
              <span className="text-gray-400">Player: </span>
              <span className="text-white font-medium">
                {currentPlayer?.name || 'Guest'}
              </span>
            </div>
          </div>

          {/* Center: Phase indicator and timer */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-3 justify-center">
              {/* Phase badge */}
              <motion.div
                key={phase}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                  ${phase === 'build' 
                    ? 'bg-[#d35400]/30 text-[#f39c12] border border-[#d35400]/50' 
                    : 'bg-[#9b59b6]/30 text-[#c084fc] border border-[#9b59b6]/50'
                  }`}
              >
                {phase === 'build' ? '🍳 Kitchen' : '🧬 Biology'}
              </motion.div>
              
              {/* Phase timer */}
              <div className="relative">
                <motion.div
                  className={`text-3xl font-mono font-bold tabular-nums
                    ${getTimerColor(phaseTimeRemaining, 
                      phase === 'build' ? round?.buildPhaseTime || 60 : round?.biologyPhaseTime || 90
                    )}`}
                  animate={phaseTimeRemaining <= 10 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  {formatTime(phaseTimeRemaining)}
                </motion.div>
                
                {/* Progress bar */}
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#d35400] to-[#f39c12]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${getPhaseProgress()}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Score and global timer */}
          <div className="flex items-center gap-4">
            {/* Streak indicator */}
            <AnimatePresence>
              {consecutiveCorrect >= 2 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="hidden md:flex items-center gap-1 px-2 py-1 bg-[#27ae60]/30 rounded-full"
                >
                  <span className="text-lg">🔥</span>
                  <span className="text-sm font-bold text-[#27ae60]">
                    {consecutiveCorrect}x
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Score */}
            <div className="text-right">
              <div className="text-xs text-gray-400">Score</div>
              <motion.div
                key={currentPlayer?.totalScore}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-xl font-bold text-white tabular-nums"
              >
                {currentPlayer?.totalScore || 0}
              </motion.div>
            </div>
            
            <div className="h-8 w-px bg-white/20" />
            
            {/* Global timer */}
            <div className="text-right">
              <div className="text-xs text-gray-400">Session</div>
              <div className={`text-lg font-mono tabular-nums ${getTimerColor(globalTimeRemaining, 600)}`}>
                {formatTime(globalTimeRemaining)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================================================
// ROUND INDICATOR COMPONENT
// ==================================================

export function RoundIndicator() {
  const currentRound = useGameStore(state => state.currentRound);
  
  return (
    <div className="flex items-center gap-2 justify-center py-4">
      {GAME_ROUNDS.map((_, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 rounded-full transition-colors ${
            index < currentRound
              ? 'bg-[#27ae60]'
              : index === currentRound
              ? 'bg-[#f39c12]'
              : 'bg-white/20'
          }`}
          animate={index === currentRound ? { scale: [1, 1.3, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      ))}
    </div>
  );
}
