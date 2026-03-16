// ==================================================
// FLAVOUR FIREKEEPER: LEADERBOARD
// ==================================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore, loadLeaderboard, saveToLeaderboard } from '../store/gameStore';
import type { Player } from '../types';

// ==================================================
// PODIUM COMPONENT
// ==================================================

function Podium({ players }: { players: Player[] }) {
  const [first, second, third] = players;

  const podiumConfig = [
    { player: second, position: 2, height: 'h-24', delay: 0.4 },
    { player: first, position: 1, height: 'h-32', delay: 0.2 },
    { player: third, position: 3, height: 'h-20', delay: 0.6 },
  ];

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="flex items-end justify-center gap-4 mb-8">
      {podiumConfig.map(({ player, position, height, delay }) => (
        <motion.div
          key={position}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay, type: 'spring', stiffness: 100 }}
          className="text-center"
        >
          {player ? (
            <>
              <div className="text-4xl mb-2">{medals[position - 1]}</div>
              <div className="text-white font-bold mb-1 truncate max-w-[100px]">
                {player.name}
              </div>
              <div className="text-[#f39c12] font-bold text-xl mb-2">
                {player.totalScore}
              </div>
              <div
                className={`${height} w-20 rounded-t-lg bg-gradient-to-t 
                  ${position === 1 
                    ? 'from-[#ffd700]/30 to-[#ffd700]/70' 
                    : position === 2 
                    ? 'from-[#c0c0c0]/30 to-[#c0c0c0]/70'
                    : 'from-[#cd7f32]/30 to-[#cd7f32]/70'
                  } flex items-center justify-center`}
              >
                <span className="text-2xl font-bold text-white">{position}</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2 opacity-30">{medals[position - 1]}</div>
              <div className="text-gray-500 mb-1">---</div>
              <div className="text-gray-600 text-xl mb-2">-</div>
              <div className={`${height} w-20 rounded-t-lg bg-white/5`} />
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ==================================================
// PERFORMANCE SUMMARY
// ==================================================

function PerformanceSummary({ player }: { player: Player }) {
  const { stats, biologyTotalScore, culinaryTotalScore } = player;

  // Generate summary text
  const generateSummary = (): string => {
    const parts: string[] = [];

    if (stats.strongPathways.length > 0) {
      parts.push(`Strong on ${stats.strongPathways.join(', ')}`);
    }
    if (stats.weakPathways.length > 0) {
      parts.push(`Review ${stats.weakPathways.join(', ')}`);
    }
    if (stats.perfectRounds > 0) {
      parts.push(`${stats.perfectRounds} perfect round${stats.perfectRounds > 1 ? 's' : ''}`);
    }

    const accuracy = stats.totalCorrectMechanisms / 
      Math.max(1, stats.totalCorrectMechanisms + stats.totalIncorrectMechanisms) * 100;
    
    if (accuracy >= 80) {
      parts.push('Excellent mechanistic understanding');
    } else if (accuracy >= 60) {
      parts.push('Good grasp of core pathways');
    } else {
      parts.push('Focus on signaling cascade details');
    }

    return parts.join('. ') + '.';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="game-card p-6 mb-8"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span>📊</span> Performance Summary
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-2xl font-bold text-white">{player.totalScore}</div>
          <div className="text-xs text-gray-400">Total Score</div>
        </div>
        <div className="text-center p-3 bg-[#9b59b6]/10 rounded-lg">
          <div className="text-2xl font-bold text-[#c084fc]">{biologyTotalScore}</div>
          <div className="text-xs text-gray-400">Biology Score</div>
        </div>
        <div className="text-center p-3 bg-[#d35400]/10 rounded-lg">
          <div className="text-2xl font-bold text-[#f39c12]">{culinaryTotalScore}</div>
          <div className="text-xs text-gray-400">Culinary Score</div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded-lg">
        <div className="text-sm text-gray-300 leading-relaxed">
          {generateSummary()}
        </div>
      </div>
    </motion.div>
  );
}

// ==================================================
// LEADERBOARD TABLE
// ==================================================

function LeaderboardTable({ players, currentPlayerId }: { players: Player[]; currentPlayerId?: string }) {
  return (
    <div className="game-card overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span>🏆</span> Full Rankings
        </h3>
      </div>

      <div className="divide-y divide-white/5">
        {players.map((player, index) => {
          const isCurrentPlayer = player.id === currentPlayerId;
          
          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`leaderboard-row p-4 ${
                isCurrentPlayer ? 'bg-[#f39c12]/10' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 text-center">
                  {index <= 2 ? (
                    <span className="text-2xl">
                      {['🥇', '🥈', '🥉'][index]}
                    </span>
                  ) : (
                    <span className="text-gray-400 font-bold">{index + 1}</span>
                  )}
                </div>

                {/* Player name */}
                <div className="flex-1">
                  <div className={`font-medium ${isCurrentPlayer ? 'text-[#f39c12]' : 'text-white'}`}>
                    {player.name}
                    {isCurrentPlayer && (
                      <span className="ml-2 text-xs bg-[#f39c12]/20 px-2 py-0.5 rounded">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    Bio: {player.biologyTotalScore} | Cook: {player.culinaryTotalScore}
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="text-xl font-bold text-white">
                    {player.totalScore}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.floor(player.totalTime / 60)}:{(player.totalTime % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {players.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No players yet. Be the first!
          </div>
        )}
      </div>
    </div>
  );
}

// ==================================================
// MAIN LEADERBOARD COMPONENT
// ==================================================

export function Leaderboard() {
  const currentPlayer = useGameStore(state => state.currentPlayer);
  const resetGame = useGameStore(state => state.resetGame);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  // Load leaderboard and save current player
  useEffect(() => {
    if (currentPlayer) {
      saveToLeaderboard(currentPlayer);
    }
    
    const leaderboard = loadLeaderboard();
    // Sort by: total score, biology score, time, final round
    const sorted = leaderboard.sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (b.biologyTotalScore !== a.biologyTotalScore) return b.biologyTotalScore - a.biologyTotalScore;
      if (a.totalTime !== b.totalTime) return a.totalTime - b.totalTime;
      return (b.scores[5]?.totalScore || 0) - (a.scores[5]?.totalScore || 0);
    });
    setAllPlayers(sorted);
  }, [currentPlayer]);

  // Find current player's rank
  const currentRank = allPlayers.findIndex(p => p.id === currentPlayer?.id) + 1;
  const isWinner = currentRank === 1;

  return (
    <div className="pt-20 pb-8 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={isWinner ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-6xl mb-4"
          >
            {isWinner ? '👑' : '🏆'}
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isWinner ? 'You Are The Firekeeper!' : 'Final Results'}
          </h1>
          <p className="text-gray-400">
            {isWinner 
              ? 'Master of Flavour and Cell Biology'
              : 'Your journey has concluded'
            }
          </p>
        </motion.div>

        {/* Current player rank */}
        {currentPlayer && currentRank > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full
                          bg-gradient-to-r from-[#d35400]/30 to-[#f39c12]/30
                          border border-[#f39c12]/50">
              <span className="text-white">Your Rank:</span>
              <span className="text-3xl font-bold text-[#f39c12]">
                #{currentRank}
              </span>
              <span className="text-gray-400">
                of {allPlayers.length}
              </span>
            </div>
          </motion.div>
        )}

        {/* Podium (top 3) */}
        {allPlayers.length >= 1 && (
          <Podium players={allPlayers.slice(0, 3)} />
        )}

        {/* Performance summary for current player */}
        {currentPlayer && (
          <PerformanceSummary player={currentPlayer} />
        )}

        {/* Full leaderboard */}
        <LeaderboardTable 
          players={allPlayers} 
          currentPlayerId={currentPlayer?.id}
        />

        {/* Play Again */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            onClick={resetGame}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="game-button flex-1 text-lg"
          >
            🔥 Play Again
          </motion.button>
          <motion.button
            onClick={() => {
              // Share functionality could go here
              navigator.clipboard?.writeText(
                `I scored ${currentPlayer?.totalScore || 0} points in Flavour Firekeeper! 🔥🧬`
              );
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="game-button-secondary game-button flex-1 text-lg"
          >
            📤 Share Score
          </motion.button>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500">
          <p className="mb-2">
            🎃 Pumpkin • 🥚 Egg • 🫐 Blackberry • 🌰 Walnut • 🌾 Wild Rice
          </p>
          <p>
            Flavour Firekeeper: Indigenous Cell Bio Kitchen
          </p>
        </div>
      </div>
    </div>
  );
}
