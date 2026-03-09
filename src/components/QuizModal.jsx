import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

export default function QuizModal() {
  const { state, dispatch } = useGame();
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const quiz = state.currentQuiz;
  if (!quiz || !state.showQuizModal) return null;

  const handleAnswer = (option, index) => {
    setSelected(index);
    setAnswered(true);
  };

  const handleContinue = () => {
    const correct = quiz.options[selected]?.correct || false;
    dispatch({ type: 'ANSWER_QUIZ', payload: { correct } });
    setSelected(null);
    setAnswered(false);
  };

  const handleSkip = () => {
    dispatch({ type: 'CLOSE_QUIZ' });
    setSelected(null);
    setAnswered(false);
  };

  const categoryColors = {
    sweet: 'from-sweet to-pink-400',
    sour: 'from-sour to-yellow-300',
    bitter: 'from-bitter to-green-400',
    umami: 'from-umami to-purple-400',
    salty: 'from-salty to-blue-400',
    smell: 'from-orange-500 to-amber-400',
    neural: 'from-gray-700 to-gray-500',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 40 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${categoryColors[quiz.category] || 'from-gray-600 to-gray-400'} p-5 text-white`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                  🧠 Biology Checkpoint
                </span>
                <div className="text-xs mt-1 opacity-70 capitalize">
                  Category: {quiz.category} • Difficulty: {'⭐'.repeat(quiz.difficulty)}
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="text-white/60 hover:text-white text-sm"
              >
                Skip →
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Question */}
            <h3 className="font-display text-lg font-bold text-earth-900 mb-5 leading-snug">
              {quiz.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {quiz.options.map((option, i) => {
                let optionStyle = 'bg-earth-50 border-earth-200 hover:bg-earth-100 hover:border-earth-300';
                if (answered) {
                  if (option.correct) {
                    optionStyle = 'bg-green-50 border-green-500 ring-2 ring-green-500';
                  } else if (i === selected && !option.correct) {
                    optionStyle = 'bg-red-50 border-red-500 ring-2 ring-red-500';
                  } else {
                    optionStyle = 'bg-gray-50 border-gray-200 opacity-50';
                  }
                } else if (i === selected) {
                  optionStyle = 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500';
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => !answered && handleAnswer(option, i)}
                    disabled={answered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm font-medium text-earth-800">{option.text}</span>
                      {answered && option.correct && (
                        <span className="ml-auto text-green-600 text-lg">✓</span>
                      )}
                      {answered && i === selected && !option.correct && (
                        <span className="ml-auto text-red-600 text-lg">✗</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div
                  className={`p-4 rounded-xl ${
                    quiz.options[selected]?.correct
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-amber-50 border border-amber-200'
                  }`}
                >
                  <div className="font-display font-bold text-sm mb-1">
                    {quiz.options[selected]?.correct ? '🎉 Correct! +50 points' : '❌ Not quite!'}
                  </div>
                  <p className="text-xs text-earth-700 leading-relaxed">{quiz.explanation}</p>
                </div>
                <button
                  onClick={handleContinue}
                  className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-indigenous-teal to-teal-600 text-white rounded-xl font-display font-bold hover:shadow-lg transition-all"
                >
                  Continue Cooking →
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
