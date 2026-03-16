// ==================================================
// FLAVOUR FIREKEEPER: NOTIFICATIONS
// ==================================================

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function Notifications() {
  const notifications = useGameStore(state => state.notifications);
  const removeNotification = useGameStore(state => state.removeNotification);

  const getIcon = (type: string): string => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'streak': return '🔥';
      default: return 'ℹ️';
    }
  };

  const getColors = (type: string): string => {
    switch (type) {
      case 'success': return 'bg-[#27ae60]/90 border-[#27ae60]';
      case 'error': return 'bg-[#e74c3c]/90 border-[#e74c3c]';
      case 'streak': return 'bg-gradient-to-r from-[#f39c12]/90 to-[#e74c3c]/90 border-[#f39c12]';
      default: return 'bg-[#3498db]/90 border-[#3498db]';
    }
  };

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`${getColors(notification.type)} backdrop-blur-sm rounded-lg p-4 
                       border shadow-lg flex items-center gap-3`}
          >
            <span className="text-xl">{getIcon(notification.type)}</span>
            <span className="text-white flex-1">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white/50 hover:text-white"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ==================================================
// STREAK INDICATOR
// ==================================================

export function StreakIndicator() {
  const consecutiveCorrect = useGameStore(state => state.consecutiveCorrect);

  if (consecutiveCorrect < 2) return null;

  return (
    <motion.div
      initial={{ x: 100, scale: 0 }}
      animate={{ x: 0, scale: 1 }}
      className="streak-indicator flex items-center gap-2"
    >
      <motion.span
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="text-xl"
      >
        🔥
      </motion.span>
      <span className="font-bold">{consecutiveCorrect}x Streak!</span>
    </motion.div>
  );
}

// ==================================================
// SCORE POPUP
// ==================================================

interface ScorePopupProps {
  score: number;
  label?: string;
  position?: { x: number; y: number };
}

export function ScorePopup({ score, label, position }: ScorePopupProps) {
  const isPositive = score >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: 1, y: -50, scale: 1 }}
      exit={{ opacity: 0, y: -100 }}
      style={position ? { left: position.x, top: position.y } : {}}
      className={`fixed pointer-events-none text-2xl font-bold
        ${isPositive ? 'text-[#27ae60]' : 'text-[#e74c3c]'}`}
    >
      {isPositive ? '+' : ''}{score}
      {label && <span className="text-sm ml-1">{label}</span>}
    </motion.div>
  );
}
