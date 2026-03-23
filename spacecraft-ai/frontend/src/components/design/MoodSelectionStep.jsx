import React from 'react';
import { motion } from 'framer-motion';

/**
 * MoodSelectionStep
 * Select the atmospheric mood for the room
 * Supports 7 moods
 */
export default function MoodSelectionStep({
  selectedMood = 'calm',
  onMoodSelect,
  onNext,
  onBack
}) {
  const moods = [
    {
      id: 'calm',
      label: 'Calm',
      emoji: '🧘',
      description: 'Soft colors, gentle lighting, peaceful atmosphere',
      colors: 'Pastels, soft blues, soft greens',
      icon: '✨'
    },
    {
      id: 'productive',
      label: 'Productive',
      emoji: '⚡',
      description: 'Bright lighting, organized layout, inspiring accents',
      colors: 'Whites, bright accents, energizing',
      icon: '🎯'
    },
    {
      id: 'luxury',
      label: 'Luxury',
      emoji: '👑',
      description: 'Rich colors, sophisticated details, premium finishes',
      colors: 'Deep jewel tones, golds, blacks',
      icon: '✨'
    },
    {
      id: 'cozy',
      label: 'Cozy',
      emoji: '🔥',
      description: 'Warm lighting, soft textures, intimate arrangements',
      colors: 'Warm neutrals, earth tones, soft golds',
      icon: '❤️'
    },
    {
      id: 'aesthetic',
      label: 'Aesthetic',
      emoji: '🎨',
      description: 'Visually stunning, Instagram-worthy, harmonious colors',
      colors: 'Balanced palette, artistic styling',
      icon: '✨'
    },
    {
      id: 'energetic',
      label: 'Energetic',
      emoji: '🌟',
      description: 'Vibrant colors, dynamic energy, bold patterns',
      colors: 'Bright colors, color blocking, patterns',
      icon: '⚡'
    },
    {
      id: 'professional',
      label: 'Professional',
      emoji: '💼',
      description: 'Clean, organized, sophisticated and credible',
      colors: 'Neutral, sophisticated, muted',
      icon: '📊'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full space-y-6"
    >
      {/* Title */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          What mood do you want?
        </h3>
        <p className="text-gray-600">
          This influences lighting, colors, and overall atmosphere
        </p>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {moods.map((mood, idx) => {
          const isSelected = selectedMood === mood.id;

          return (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onMoodSelect(mood.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{mood.emoji}</span>
                <div className="flex-1">
                  <p className={`font-semibold ${isSelected ? 'text-indigo-600' : 'text-gray-800'}`}>
                    {mood.label}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {mood.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {mood.colors.split(', ').map((color, i) => (
                      <span key={i} className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Mood Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-4"
      >
        <p className="text-sm font-semibold text-gray-800">
          Selected: {moods.find(m => m.id === selectedMood)?.label}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {moods.find(m => m.id === selectedMood)?.description}
        </p>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-3 pt-6">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Next: Set Budget
        </button>
      </div>
    </motion.div>
  );
}
