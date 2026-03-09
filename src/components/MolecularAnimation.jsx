import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import PATHWAYS from '../data/pathways';

const allPathwayKeys = ['sweet', 'sour', 'salty', 'bitter', 'umami', 'smell'];

export default function MolecularAnimation() {
  const { state, dispatch } = useGame();
  const [selectedPathway, setSelectedPathway] = useState(
    state.showPathwayAnimation || 'sweet'
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const pathway = PATHWAYS[selectedPathway];
  if (!pathway) return null;

  const handleNext = () => {
    if (currentStep < pathway.steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      dispatch({ type: 'COMPLETE_PATHWAY', payload: selectedPathway });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSelectPathway = (key) => {
    setSelectedPathway(key);
    setCurrentStep(0);
  };

  const step = pathway.steps[currentStep];
  const progress = ((currentStep + 1) / pathway.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-earth-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-4xl font-bold text-earth-900 mb-2">
            🔬 Molecular Pathways
          </h2>
          <p className="text-earth-600 font-body">
            Step through each signaling pathway to understand how taste and smell signals
            travel from receptor to brain.
          </p>
        </motion.div>

        {/* Pathway selector tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {allPathwayKeys.map((key) => {
            const pw = PATHWAYS[key];
            const isCompleted = state.completedPathways.includes(key);
            return (
              <button
                key={key}
                onClick={() => handleSelectPathway(key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1 ${
                  selectedPathway === key
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-white text-earth-600 hover:bg-earth-100'
                }`}
                style={selectedPathway === key ? { backgroundColor: pw.color } : {}}
              >
                {isCompleted && '✓ '}
                {pw.name.replace(' Pathway', '').replace(' Signaling', '')}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step List (left sidebar) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-earth-200">
              <h3 className="font-display text-sm font-bold text-earth-700 mb-3 uppercase tracking-wider">
                Pathway Steps
              </h3>
              <div className="space-y-1">
                {pathway.steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStep(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                      i === currentStep
                        ? 'bg-earth-800 text-white'
                        : i < currentStep
                        ? 'bg-green-50 text-green-800'
                        : 'bg-earth-50 text-earth-600 hover:bg-earth-100'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {i < currentStep ? '✓' : i + 1}
                    </span>
                    <span className="truncate">{s.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <div className="text-xs text-earth-500 mb-1">
                  Cell type: <span className="font-semibold">{pathway.cellType}</span>
                </div>
                <div className="text-xs text-earth-500">
                  Mechanism: <span className="font-semibold">{pathway.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Animation Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-earth-200 overflow-hidden">
              {/* Progress bar */}
              <div className="h-1.5 bg-earth-100">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: pathway.color }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Step content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {/* Step header */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      className="text-5xl"
                    >
                      {step.icon}
                    </motion.div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-earth-400">
                        Step {currentStep + 1} of {pathway.steps.length}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-earth-900">
                        {step.label}
                      </h3>
                    </div>
                  </div>

                  {/* Molecule → Target visualization */}
                  <div className="bg-gradient-to-r from-earth-50 via-white to-earth-50 rounded-xl p-5 mb-6 border border-earth-100">
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      <div className="bg-white border-2 rounded-lg px-4 py-2 text-center" style={{ borderColor: pathway.color }}>
                        <div className="text-[10px] uppercase tracking-wider text-earth-400 font-bold">Molecule</div>
                        <div className="font-mono text-sm font-bold text-earth-900 mt-0.5">{step.molecule}</div>
                      </div>

                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-2xl"
                        style={{ color: pathway.color }}
                      >
                        →
                      </motion.div>

                      <div className="bg-white border-2 rounded-lg px-4 py-2 text-center" style={{ borderColor: pathway.color }}>
                        <div className="text-[10px] uppercase tracking-wider text-earth-400 font-bold">Target</div>
                        <div className="font-mono text-sm font-bold text-earth-900 mt-0.5">{step.target}</div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-earth-700 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Step visualization - animated cascade */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-6">
                    {pathway.steps.map((s, i) => (
                      <div key={s.id} className="flex items-center flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                            i <= currentStep ? 'text-white' : 'bg-earth-100 text-earth-400'
                          }`}
                          style={i <= currentStep ? { backgroundColor: pathway.color } : {}}
                        >
                          {s.icon}
                        </div>
                        {i < pathway.steps.length - 1 && (
                          <div
                            className={`w-4 h-0.5 ${i < currentStep ? '' : 'bg-earth-200'}`}
                            style={i < currentStep ? { backgroundColor: pathway.color } : {}}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="px-4 py-2 rounded-lg text-sm font-bold text-earth-600 bg-earth-100 hover:bg-earth-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>

                    <span className="text-xs text-earth-400">
                      {currentStep + 1} / {pathway.steps.length}
                    </span>

                    <button
                      onClick={handleNext}
                      className="px-6 py-2 rounded-lg text-sm font-bold text-white transition-all hover:shadow-lg"
                      style={{ backgroundColor: pathway.color }}
                    >
                      {currentStep === pathway.steps.length - 1 ? '✓ Complete' : 'Next →'}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Full cascade summary (study mode) */}
            {state.studyMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 bg-white rounded-2xl p-4 shadow-lg border border-earth-200"
              >
                <h4 className="font-display text-sm font-bold text-earth-800 mb-2">
                  📚 Full Cascade Summary
                </h4>
                <div className="font-mono text-xs text-earth-600 leading-relaxed">
                  {pathway.steps.map((s) => s.label).join(' → ')}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
