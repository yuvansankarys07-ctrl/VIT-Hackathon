import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Wallet } from 'lucide-react';

/**
 * BudgetPriorityStep
 * Set budget and design priority
 */
export default function BudgetPriorityStep({
  budget = 'medium',
  priority = 'aesthetics',
  onBudgetChange,
  onPriorityChange,
  onNext,
  onBack
}) {
  const [customBudget, setCustomBudget] = useState('');

  const budgetOptions = [
    { id: 'low', label: '₹5k-10k', description: 'Budget-conscious', icon: '🤑' },
    { id: 'medium', label: '₹10k-25k', description: 'Mid-range', icon: '💰' },
    { id: 'high', label: '₹25k-50k', description: 'Quality focused', icon: '💎' },
    { id: 'luxury', label: '₹50k+', description: 'Premium', icon: '👑' }
  ];

  const priorities = [
    { id: 'aesthetics', label: 'Aesthetics', description: 'Visual appeal first', icon: '🎨' },
    { id: 'storage', label: 'Storage', description: 'Organization & space', icon: '📦' },
    { id: 'comfort', label: 'Comfort', description: 'Livability & coziness', icon: '🛋️' },
    { id: 'budget', label: 'Budget', description: 'Cost-effective', icon: '💵' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full space-y-8"
    >
      {/* Budget Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            What's your budget?
          </h3>
          <p className="text-gray-600">
            This helps us suggest appropriate furniture and decor options
          </p>
        </div>

        {/* Budget Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {budgetOptions.map((option, idx) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onBudgetChange(option.id)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                budget === option.id
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <p className={`font-semibold text-sm ${budget === option.id ? 'text-indigo-600' : 'text-gray-800'}`}>
                {option.label}
              </p>
              <p className="text-xs text-gray-500">{option.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Custom Budget Input */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200"
        >
          <label className="text-sm font-semibold text-gray-700">
            Or enter custom budget (₹):
          </label>
          <input
            type="number"
            placeholder="e.g., 15000"
            value={customBudget}
            onChange={(e) => setCustomBudget(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </motion.div>
      </div>

      {/* Priority Section */}
      <div className="space-y-4 pt-6 border-t-2 border-gray-200">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Tag className="w-5 h-5" />
            What's your priority?
          </h3>
          <p className="text-gray-600">
            Choose what matters most in your room redesign
          </p>
        </div>

        {/* Priority Options */}
        <div className="grid grid-cols-2 gap-3">
          {priorities.map((option, idx) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (idx + 4) * 0.05 }}
              onClick={() => onPriorityChange(option.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                priority === option.id
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <p className={`font-semibold text-sm ${priority === option.id ? 'text-indigo-600' : 'text-gray-800'}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-4"
      >
        <p className="text-sm font-semibold text-gray-800 mb-2">Summary:</p>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            <span className="font-semibold">Budget:</span>{' '}
            {budgetOptions.find(b => b.id === budget)?.label}
            {customBudget && ` (₹${customBudget})`}
          </li>
          <li>
            <span className="font-semibold">Priority:</span>{' '}
            {priorities.find(p => p.id === priority)?.label}
          </li>
        </ul>
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
          Next: Special Options
        </button>
      </div>
    </motion.div>
  );
}
