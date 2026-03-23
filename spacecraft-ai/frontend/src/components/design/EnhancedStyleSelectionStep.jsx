import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * EnhancedStyleSelectionStep
 * Select interior design style with detailed descriptions
 * Supports all 9 styles: Modern, Minimal, Traditional, Scandinavian, Boho, Industrial, Cozy, Contemporary, Rustic
 */
export default function EnhancedStyleSelectionStep({
  selectedStyle = 'modern',
  onStyleSelect,
  onNext,
  onBack
}) {
  const [showDetails, setShowDetails] = useState(null);

  const styles = [
    {
      id: 'modern',
      name: 'Modern',
      emoji: '🏢',
      description: 'Clean lines & contemporary',
      details: 'Minimalist forms, neutral colors with bold accents, glass and metal materials, sleek fixtures, uncluttered spaces',
      colors: 'Whites, grays, blacks with bright accents'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      emoji: '⬜',
      description: 'Simplicity & function',
      details: 'Everything has a purpose, white/gray palette, essential furniture only, lots of empty space, calming atmosphere',
      colors: 'Off-whites, light grays, pale neutrals'
    },
    {
      id: 'traditional',
      name: 'Traditional',
      emoji: '🏛️',
      description: 'Classic & timeless',
      details: 'Ornate details, dark woods, upholstered furniture, warm colors, elegant accessories, established heritage feeling',
      colors: 'Warm neutrals, deep jewel tones, golds'
    },
    {
      id: 'scandinavian',
      name: 'Scandinavian',
      emoji: '❄️',
      description: 'Light & cozy',
      details: 'Light wood, soft textiles, functional beauty, natural materials, hygge elements, warm but airy feeling',
      colors: 'Whites, light grays, soft pastels, warm woods'
    },
    {
      id: 'boho',
      name: 'Bohemian',
      emoji: '🌿',
      description: 'Eclectic & artistic',
      details: 'Mix of patterns and colors, plants, natural materials, layered textures, collected-over-time feel, worldly vibe',
      colors: 'Earth tones, jewel tones, warm oranges'
    },
    {
      id: 'industrial',
      name: 'Industrial',
      emoji: '⚙️',
      description: 'Raw & edgy',
      details: 'Exposed brick/concrete, metal accents, reclaimed wood, utilitarian furniture, warehouse aesthetic, artistic raw beauty',
      colors: 'Grays, blacks, metallics, concrete'
    },
    {
      id: 'cozy',
      name: 'Cozy',
      emoji: '🔥',
      description: 'Warm & inviting',
      details: 'Soft textures, comfortable furniture, warm lighting, layered fabrics, intimate arrangements, hygge-inspired comfort',
      colors: 'Warm browns, creams, soft golds'
    },
    {
      id: 'contemporary',
      name: 'Contemporary',
      emoji: '✨',
      description: 'Current trends',
      details: 'Updated modern elements, current design trends, mix of styles, contemporary proportions, forward-thinking yet comfortable',
      colors: 'Neutral base with trendy accents'
    },
    {
      id: 'rustic',
      name: 'Rustic',
      emoji: '🌾',
      description: 'Natural & handcrafted',
      details: 'Solid wood, natural materials, vintage pieces, stone accents, earthy palette, grounded cottage feel, timeless charm',
      colors: 'Earth tones, warm browns, natural stone'
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
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Design Style</h3>
        <p className="text-gray-600">Click on a style to preview details</p>
      </div>

      {/* Style Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {styles.map((style, idx) => {
          const isSelected = selectedStyle === style.id;
          const isDetailsOpen = showDetails === style.id;

          return (
            <motion.div key={style.id}>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => {
                  onStyleSelect(style.id);
                  setShowDetails(isDetailsOpen ? null : style.id);
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all text-center ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-3xl mb-2">{style.emoji}</div>
                <p className={`font-semibold text-sm ${isSelected ? 'text-indigo-600' : 'text-gray-800'}`}>
                  {style.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{style.description}</p>
              </motion.button>

              {/* Details Popup */}
              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border-2 border-indigo-500 rounded-lg shadow-lg p-3 w-56"
                  >
                    <p className="text-sm font-semibold text-gray-800 mb-2">{style.name}</p>
                    <p className="text-xs text-gray-600 mb-2">{style.details}</p>
                    <div className="text-xs">
                      <span className="font-semibold text-indigo-600">Colors: </span>
                      <span className="text-gray-600">{style.colors}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Style Details */}
      <AnimatePresence>
        {selectedStyle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{styles.find(s => s.id === selectedStyle)?.emoji}</span>
              <div>
                <p className="font-semibold text-gray-800">
                  {styles.find(s => s.id === selectedStyle)?.name} Style Selected
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {styles.find(s => s.id === selectedStyle)?.details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          Next: Select Mood
        </button>
      </div>
    </motion.div>
  );
}
