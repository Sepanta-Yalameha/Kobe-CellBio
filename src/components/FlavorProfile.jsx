import { motion } from 'framer-motion';

const tasteConfig = {
  sweet: { color: 'bg-sweet', emoji: '🍬', label: 'Sweet' },
  sour: { color: 'bg-sour', emoji: '🍋', label: 'Sour' },
  bitter: { color: 'bg-bitter', emoji: '🌿', label: 'Bitter' },
  umami: { color: 'bg-umami', emoji: '🥩', label: 'Umami' },
  salty: { color: 'bg-salty', emoji: '🧂', label: 'Salty' },
};

export default function FlavorProfile({ profile, size = 'default' }) {
  if (!profile) return null;

  const isSmall = size === 'small';

  return (
    <div className="space-y-2">
      {Object.entries(profile).map(([taste, value], i) => {
        const config = tasteConfig[taste];
        return (
          <div key={taste} className="flex items-center gap-2">
            <span className={`${isSmall ? 'text-xs w-10' : 'text-sm w-14'} font-bold text-earth-700 flex items-center gap-1`}>
              <span className="text-xs">{config.emoji}</span>
              {!isSmall && config.label}
            </span>
            <div className={`flex-1 ${isSmall ? 'h-2' : 'h-3'} bg-gray-100 rounded-full overflow-hidden`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(value * 100)}%` }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`h-full ${config.color} rounded-full`}
              />
            </div>
            <span className={`${isSmall ? 'text-[10px] w-6' : 'text-xs w-8'} text-right text-earth-500`}>
              {Math.round(value * 100)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
