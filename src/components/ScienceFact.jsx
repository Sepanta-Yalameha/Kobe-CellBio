import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const facts = [
  'Your tongue has about 10,000 taste buds, each containing 50–100 taste receptor cells.',
  'Taste signals travel via cranial nerves VII, IX, and X to the nucleus of the solitary tract.',
  'Olfaction contributes ~80% of what we perceive as "flavor" — taste alone is only 5 basic qualities.',
  'The TRPM5 channel is essential for sweet, bitter, and umami taste. Knockout mice lose these tastes entirely.',
  'Humans have ~400 functional olfactory receptor genes. Each olfactory neuron expresses only ONE receptor type.',
  'Umami was identified as a fifth basic taste by Japanese chemist Kikunae Ikeda in 1908.',
  'Type II taste cells release ATP (not traditional neurotransmitters) through CALHM1/3 channels.',
  'Sour taste cells (Type III) are the only taste cells that form conventional synapses.',
  'The bitter taste system has ~25 different TAS2R receptors — an evolutionary adaptation to detect toxins.',
  'Olfaction is the only sensory system that bypasses the thalamus before reaching the cortex.',
  'Gustducin was named for its role in gustation (taste) — it\'s similar to transducin in vision.',
  'Indigenous peoples of the Americas domesticated corn, potatoes, tomatoes, and chocolate — all now global staples.',
  'OTOP1, the sour taste receptor, was only identified in 2019 — taste biology is still an active research field!',
  'The umami-IMP synergy effect makes meat + tomato combinations (like pasta sauce) taste especially savory.',
  'Wild rice (manoomin) is not actually rice — it\'s a semi-aquatic grass native to North America.',
];

export default function ScienceFact() {
  const [currentFact, setCurrentFact] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true);
      setCurrentFact((prev) => (prev + 1) % facts.length);
      setTimeout(() => setIsVisible(false), 8000);
    }, 30000);

    // Show first fact after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 8000);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-20 left-1/2 z-30 max-w-md w-full px-4"
        >
          <div className="bg-indigo-900/95 backdrop-blur text-white rounded-2xl p-4 shadow-2xl border border-indigo-700">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🔬</span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 mb-1">
                  Science Fact
                </div>
                <p className="text-xs leading-relaxed">{facts[currentFact]}</p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-indigo-400 hover:text-white flex-shrink-0 text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
