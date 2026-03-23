import React from 'react';
import { motion } from 'framer-motion';

function ResultsDashboard({ plan }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-soft p-8 mb-12"
    >
      <h2 className="text-3xl font-bold mb-6">Your AI Design Plan</h2>

      {/* Style Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3">Design Summary</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          {plan.styleSummary}
        </p>
      </div>

      {/* Color Palette */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Color Palette</h3>
        <div className="flex gap-4 items-center">
          {plan.colorPalette?.colors?.map((color, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-lg shadow-md border-2 border-gray-200 transition-all"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs text-gray-600 mt-2 font-mono">{color}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Furniture Recommendations */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Essential Furniture</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.recommendedFurniture?.essentials?.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <span className="text-lg font-bold text-purple-600">₹{item.price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-xs text-gray-500">{item.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decor Suggestions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Decor Suggestions</h3>
        <div className="flex flex-wrap gap-3">
          {plan.decorSuggestions?.map((suggestion, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold"
            >
              ✨ {suggestion}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Lighting & Tips */}
      <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
        <h4 className="font-bold text-gray-900 mb-2">💡 Lighting Suggestion</h4>
        <p className="text-gray-700">{plan.lightingSuggestion}</p>
      </div>
    </motion.div>
  );
}

export default ResultsDashboard;
