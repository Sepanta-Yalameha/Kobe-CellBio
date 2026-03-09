import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import QUIZZES from '../data/quizzes';

const categories = [
  { id: 'all', label: 'All', emoji: '📋' },
  { id: 'sweet', label: 'Sweet', emoji: '🍬' },
  { id: 'sour', label: 'Sour', emoji: '🍋' },
  { id: 'bitter', label: 'Bitter', emoji: '🌿' },
  { id: 'umami', label: 'Umami', emoji: '🥩' },
  { id: 'salty', label: 'Salty', emoji: '🧂' },
  { id: 'smell', label: 'Smell', emoji: '👃' },
  { id: 'neural', label: 'Neural', emoji: '🧠' },
];

export default function QuizPractice() {
  const { state, dispatch } = useGame();
  const [category, setCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const filtered =
    category === 'all' ? QUIZZES : QUIZZES.filter((q) => q.category === category);

  const quiz = filtered[currentIndex];

  const handleAnswer = (index) => {
    setSelected(index);
    setAnswered(true);
    setSessionTotal((s) => s + 1);
    const correct = quiz.options[index]?.correct || false;
    if (correct) setSessionCorrect((s) => s + 1);
    dispatch({
      type: 'ANSWER_QUIZ',
      payload: { correct },
    });
    // Re-show quiz modal state (we're managing our own here)
  };

  const handleNext = () => {
    setSelected(null);
    setAnswered(false);
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20 text-earth-400">No quizzes in this category</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-earth-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-4xl font-bold text-earth-900 mb-2">
            🧠 Quiz Practice
          </h2>
          <p className="text-earth-600 font-body">
            Test your molecular biology knowledge. Earn 50 points for each correct answer!
          </p>
          {sessionTotal > 0 && (
            <div className="mt-2 text-sm font-bold text-indigenous-teal">
              Session: {sessionCorrect}/{sessionTotal} correct (
              {Math.round((sessionCorrect / sessionTotal) * 100)}%)
            </div>
          )}
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setCurrentIndex(0);
                setSelected(null);
                setAnswered(false);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                category === cat.id
                  ? 'bg-earth-800 text-white shadow-lg'
                  : 'bg-white text-earth-600 hover:bg-earth-100'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="text-center text-xs text-earth-400 mb-4">
          Question {currentIndex + 1} of {filtered.length}
        </div>

        {/* Quiz Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-earth-400">
                  {quiz.category} • {'⭐'.repeat(quiz.difficulty)}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-earth-900 mb-5">
                {quiz.question}
              </h3>

              <div className="space-y-2">
                {quiz.options.map((option, i) => {
                  let style =
                    'bg-earth-50 border-earth-200 hover:bg-earth-100 hover:border-earth-300';
                  if (answered) {
                    if (option.correct) {
                      style = 'bg-green-50 border-green-500 ring-2 ring-green-500';
                    } else if (i === selected && !option.correct) {
                      style = 'bg-red-50 border-red-500 ring-2 ring-red-500';
                    } else {
                      style = 'bg-gray-50 border-gray-200 opacity-50';
                    }
                  } else if (i === selected) {
                    style = 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !answered && handleAnswer(i)}
                      disabled={answered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm font-medium text-earth-800">
                          {option.text}
                        </span>
                        {answered && option.correct && (
                          <span className="ml-auto text-green-600 text-lg">✓</span>
                        )}
                        {answered && i === selected && !option.correct && (
                          <span className="ml-auto text-red-600 text-lg">✗</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

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
                      {quiz.options[selected]?.correct
                        ? '🎉 Correct! +50 points'
                        : '❌ Not quite!'}
                    </div>
                    <p className="text-xs text-earth-700 leading-relaxed">
                      {quiz.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-indigenous-teal to-teal-600 text-white rounded-xl font-display font-bold hover:shadow-lg transition-all"
                  >
                    {currentIndex < filtered.length - 1
                      ? 'Next Question →'
                      : '🔄 Restart'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
