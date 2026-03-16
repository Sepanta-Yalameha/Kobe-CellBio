// ==================================================
// FLAVOUR FIREKEEPER: BIOLOGY DEFENSE PHASE
// ==================================================

import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { GAME_ROUNDS } from '../data/rounds';
import { CELL_TYPE_INFO } from '../data/pathways';
import type {
  ReceptorIdentificationChallenge,
  CellTypeMatchChallenge,
  PathwayAssemblyChallenge,
  HigherOrderQuestion,
  Receptor,
  CellType,
  PathwayStep,
} from '../types';

// ==================================================
// CHALLENGE PROGRESS INDICATOR
// ==================================================

function ChallengeProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className={`h-2 flex-1 rounded-full transition-colors ${
            i < current
              ? 'bg-[#27ae60]'
              : i === current
              ? 'bg-[#f39c12]'
              : 'bg-white/10'
          }`}
          animate={i === current ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      ))}
    </div>
  );
}

// ==================================================
// RECEPTOR IDENTIFICATION CHALLENGE
// ==================================================

interface ReceptorChallengeProps {
  challenge: ReceptorIdentificationChallenge;
  onSubmit: (selected: string[]) => void;
}

function ReceptorIdentificationChallengeUI({ challenge, onSubmit }: ReceptorChallengeProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleReceptor = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const handleSubmit = () => {
    onSubmit(Array.from(selected));
  };

  // Group receptors by pathway for organization
  const groupedReceptors: Record<string, Receptor[]> = {};
  challenge.availableReceptors.forEach(r => {
    if (!groupedReceptors[r.pathway]) {
      groupedReceptors[r.pathway] = [];
    }
    groupedReceptors[r.pathway].push(r);
  });

  return (
    <div className="game-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#9b59b6]/30 flex items-center justify-center">
          <span className="text-2xl">🎯</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Receptor Identification</h3>
          <p className="text-sm text-gray-400">{challenge.question}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {challenge.availableReceptors.map(receptor => (
          <motion.button
            key={receptor.id}
            onClick={() => toggleReceptor(receptor.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-lg text-left transition-all border-2 ${
              selected.has(receptor.id)
                ? 'border-[#27ae60] bg-[#27ae60]/20'
                : 'border-white/10 bg-white/5 hover:border-white/30'
            }`}
          >
            <div className="font-medium text-white text-sm">
              {receptor.name}
            </div>
            <div className="text-xs text-gray-400 mt-1 line-clamp-2">
              {receptor.description}
            </div>
            {receptor.isDistractor && (
              <div className="text-xs text-red-400/50 mt-1">
                (May not apply)
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Selected: {selected.size} receptor{selected.size !== 1 ? 's' : ''}
        </div>
        <motion.button
          onClick={handleSubmit}
          disabled={selected.size === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="game-button"
        >
          Confirm Selection →
        </motion.button>
      </div>
    </div>
  );
}

// ==================================================
// CELL TYPE MATCH CHALLENGE
// ==================================================

interface CellTypeMatchProps {
  challenge: CellTypeMatchChallenge;
  onSubmit: (matches: Record<string, CellType>) => void;
}

function CellTypeMatchChallengeUI({ challenge, onSubmit }: CellTypeMatchProps) {
  const [matches, setMatches] = useState<Record<string, CellType>>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDrop = (item: string, cellType: CellType) => {
    setMatches(prev => ({ ...prev, [item]: cellType }));
  };

  const cellTypeLabels: Record<CellType, { name: string; color: string }> = {
    type_ii_taste: { name: 'Type II Taste Cell', color: 'bg-[#27ae60]' },
    type_iii_taste: { name: 'Type III Taste Cell', color: 'bg-[#e74c3c]' },
    olfactory_neuron: { name: 'Olfactory Neuron', color: 'bg-[#9b59b6]' },
    trigeminal: { name: 'Trigeminal', color: 'bg-[#f39c12]' },
    central_integration: { name: 'Central Integration', color: 'bg-[#3498db]' },
  };

  const handleSubmit = () => {
    onSubmit(matches);
  };

  const allMatched = challenge.matches.every(m => matches[m.item]);

  return (
    <div className="game-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#3498db]/30 flex items-center justify-center">
          <span className="text-2xl">🔗</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Cell Type Matching</h3>
          <p className="text-sm text-gray-400">{challenge.question}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Items to match */}
        <div>
          <div className="text-sm text-gray-400 mb-3">Items to Match:</div>
          <div className="space-y-2">
            {challenge.matches.map(({ item }) => (
              <div
                key={item}
                draggable
                onDragStart={() => setDraggedItem(item)}
                onDragEnd={() => setDraggedItem(null)}
                className={`p-3 rounded-lg bg-white/5 border-2 cursor-grab
                  ${matches[item] 
                    ? `border-${cellTypeLabels[matches[item]].color.replace('bg-', '')}`
                    : 'border-white/20 border-dashed'
                  }
                  ${draggedItem === item ? 'opacity-50' : ''}`}
              >
                <div className="text-white text-sm">{item}</div>
                {matches[item] && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${cellTypeLabels[matches[item]].color}`} />
                    <span className="text-xs text-gray-400">
                      → {cellTypeLabels[matches[item]].name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cell type bins */}
        <div>
          <div className="text-sm text-gray-400 mb-3">Drop Zones:</div>
          <div className="space-y-2">
            {challenge.availableCellTypes.map(cellType => (
              <div
                key={cellType}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedItem) {
                    handleDrop(draggedItem, cellType);
                    setDraggedItem(null);
                  }
                }}
                className={`p-3 rounded-lg border-2 border-dashed transition-colors
                  ${cellTypeLabels[cellType].color}/20 border-${cellTypeLabels[cellType].color.replace('bg-', '')}/50
                  hover:border-white/50`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${cellTypeLabels[cellType].color}`} />
                  <span className="text-white text-sm font-medium">
                    {cellTypeLabels[cellType].name}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {CELL_TYPE_INFO[cellType].description.slice(0, 60)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Matched: {Object.keys(matches).length}/{challenge.matches.length}
        </div>
        <motion.button
          onClick={handleSubmit}
          disabled={!allMatched}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="game-button"
        >
          Confirm Matches →
        </motion.button>
      </div>
    </div>
  );
}

// ==================================================
// PATHWAY ASSEMBLY CHALLENGE
// ==================================================

interface PathwayAssemblyProps {
  challenge: PathwayAssemblyChallenge;
  onSubmit: (ordered: string[]) => void;
}

function PathwayAssemblyChallengeUI({ challenge, onSubmit }: PathwayAssemblyProps) {
  const [items, setItems] = useState<PathwayStep[]>(challenge.shuffledSteps);

  const pathwayColors: Record<string, string> = {
    sweet: 'border-[#f39c12]',
    umami: 'border-[#e74c3c]',
    bitter: 'border-[#8b4513]',
    sour: 'border-[#27ae60]',
    salt: 'border-[#3498db]',
    smell: 'border-[#9b59b6]',
  };

  const handleSubmit = () => {
    onSubmit(items.map(item => item.id));
  };

  return (
    <div className="game-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#e67e22]/30 flex items-center justify-center">
          <span className="text-2xl">🔬</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            Pathway Assembly: {challenge.pathway.toUpperCase()}
          </h3>
          <p className="text-sm text-gray-400">{challenge.question}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-xs text-gray-400 mb-3">
          Drag to reorder the signaling steps from START to END:
        </div>
        
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="space-y-2"
        >
          {items.map((step, index) => (
            <Reorder.Item
              key={step.id}
              value={step}
              className={`pathway-card cursor-grab active:cursor-grabbing
                ${pathwayColors[challenge.pathway] || 'border-white/20'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                               text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm">
                    {step.description}
                  </div>
                  {step.isAdvanced && (
                    <span className="text-xs text-[#f39c12] mt-1">⚡ Advanced</span>
                  )}
                </div>
                <div className="text-gray-400">⋮⋮</div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {items.length} steps to order
        </div>
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="game-button"
        >
          Lock In Order →
        </motion.button>
      </div>
    </div>
  );
}

// ==================================================
// HIGHER-ORDER QUESTION CHALLENGE
// ==================================================

interface HigherOrderProps {
  challenge: HigherOrderQuestion;
  onSubmit: (optionId: string) => void;
}

function HigherOrderQuestionUI({ challenge, onSubmit }: HigherOrderProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const topicEmojis: Record<string, string> = {
    retronasal: '👃',
    cranial_nerve: '🧠',
    brain_region: '🎛️',
    pathway_comparison: '⚖️',
    modulation: '🔧',
  };

  return (
    <div className="game-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#f39c12]/30 flex items-center justify-center">
          <span className="text-2xl">{topicEmojis[challenge.topic] || '💡'}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Integration Question</h3>
          <p className="text-sm text-[#f39c12]">+Bonus Points Available</p>
        </div>
      </div>

      <div className="text-white mb-6 text-lg leading-relaxed">
        {challenge.question}
      </div>

      <div className="space-y-3 mb-6">
        {challenge.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => setSelected(option.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full p-4 rounded-lg text-left transition-all border-2
              ${selected === option.id
                ? 'border-[#27ae60] bg-[#27ae60]/20'
                : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${selected === option.id ? 'border-[#27ae60] bg-[#27ae60]' : 'border-white/30'}`}>
                {selected === option.id && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-white text-xs"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
              <span className="text-white">{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end">
        <motion.button
          onClick={() => selected && onSubmit(selected)}
          disabled={!selected}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="game-button"
        >
          Submit Answer →
        </motion.button>
      </div>
    </div>
  );
}

// ==================================================
// MAIN BIOLOGY DEFENSE COMPONENT
// ==================================================

export function BiologyDefense() {
  const currentChallenges = useGameStore(state => state.currentChallenges);
  const currentChallengeIndex = useGameStore(state => state.currentChallengeIndex);
  const setCurrentChallenge = useGameStore(state => state.setCurrentChallenge);
  const submitChallengeResponse = useGameStore(state => state.submitChallengeResponse);
  const submitBiologyAnswers = useGameStore(state => state.submitBiologyAnswers);
  const currentRound = useGameStore(state => state.currentRound);

  const currentChallenge = currentChallenges[currentChallengeIndex];
  const isLastChallenge = currentChallengeIndex >= currentChallenges.length - 1;
  const round = GAME_ROUNDS[currentRound];

  const handleChallengeSubmit = (response: unknown) => {
    submitChallengeResponse(currentChallenge.type, response);
    
    if (isLastChallenge) {
      // Small delay before showing results
      setTimeout(() => {
        submitBiologyAnswers();
      }, 500);
    } else {
      setCurrentChallenge(currentChallengeIndex + 1);
    }
  };

  if (!currentChallenge) {
    return (
      <div className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-white">Loading challenge...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {/* Round info */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9b59b6]/20 
                          border border-[#9b59b6]/30 mb-4">
            <span className="text-lg">🧬</span>
            <span className="text-[#c084fc] font-medium">Biology Defense Phase</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Round {currentRound + 1}: {round?.title}
          </h2>
          <p className="text-gray-400">
            Justify the biology of your dish
          </p>
        </div>

        {/* Progress */}
        <ChallengeProgress
          current={currentChallengeIndex}
          total={currentChallenges.length}
        />

        {/* Challenge Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChallengeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentChallenge.type === 'receptor_identification' && (
              <ReceptorIdentificationChallengeUI
                challenge={currentChallenge}
                onSubmit={(selected) => handleChallengeSubmit(selected)}
              />
            )}
            {currentChallenge.type === 'cell_type_match' && (
              <CellTypeMatchChallengeUI
                challenge={currentChallenge}
                onSubmit={(matches) => handleChallengeSubmit(matches)}
              />
            )}
            {currentChallenge.type === 'pathway_assembly' && (
              <PathwayAssemblyChallengeUI
                challenge={currentChallenge}
                onSubmit={(ordered) => handleChallengeSubmit(ordered)}
              />
            )}
            {currentChallenge.type === 'higher_order' && (
              <HigherOrderQuestionUI
                challenge={currentChallenge}
                onSubmit={(optionId) => handleChallengeSubmit(optionId)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Challenge counter */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          Challenge {currentChallengeIndex + 1} of {currentChallenges.length}
          {isLastChallenge && (
            <span className="text-[#f39c12] ml-2">• Final Challenge!</span>
          )}
        </div>
      </div>
    </div>
  );
}
