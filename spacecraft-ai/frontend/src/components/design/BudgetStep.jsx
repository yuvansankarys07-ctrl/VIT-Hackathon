import React from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '../../store/designStore';

function BudgetStep() {
  const { budgetData, setBudgetData } = useDesignStore();

  const moods = [
    { id: 'mood-calm', name: 'Calm', emoji: '😌', desc: 'Peaceful and relaxing' },
    { id: 'mood-productive', name: 'Productive', emoji: '💪', desc: 'Focus and energy' },
    { id: 'mood-luxury', name: 'Luxury', emoji: '✨', desc: 'Rich and elegant' },
    { id: 'mood-cozy', name: 'Cozy', emoji: '🔥', desc: 'Warm and comfortable' },
    { id: 'mood-aesthetic', name: 'Aesthetic', emoji: '🎨', desc: 'Visually pleasing' }
  ];

  const budgetPresets = [
    { label: '₹5,000', value: 5000, desc: 'Minimal essentials' },
    { label: '₹10,000', value: 10000, desc: 'Basic comfort' },
    { label: '₹25,000', value: 25000, desc: 'Good quality' },
    { label: '₹50,000', value: 50000, desc: 'Premium setup' }
  ];

  const priorities = [
    { id: 'aesthetics', name: 'Aesthetics First', icon: '🎨' },
    { id: 'storage', name: 'Storage First', icon: '📦' },
    { id: 'comfort', name: 'Comfort First', icon: '😴' },
    { id: 'budget', name: 'Budget First', icon: '💰' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Step 3: Budget & Preferences</h3>
        <p className="text-gray-600 mb-6">
          Set your budget and tell us what matters most
        </p>
      </div>

      {/* Budget Selection */}
      <div>
        <label className="block text-lg font-semibold mb-4">Select Budget</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {budgetPresets.map((preset) => (
            <motion.button
              key={preset.value}
              whileHover={{ scale: 1.05 }}
              onClick={() => setBudgetData({ amount: preset.value })}
              className={`p-4 rounded-lg transition-all ${
                budgetData.amount === preset.value
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <div className="font-bold">{preset.label}</div>
              <div className="text-xs mt-1">{preset.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Custom Budget */}
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2">Or enter custom amount</label>
          <input
            type="number"
            value={budgetData.amount}
            onChange={(e) => setBudgetData({ amount: parseInt(e.target.value) || 0 })}
            className="input-base"
            placeholder="₹"
            min="1000"
            max="500000"
          />
        </div>
      </div>

      {/* Mood Selection */}
      <div>
        <label className="block text-lg font-semibold mb-4">Room Mood</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setBudgetData({ mood: mood.id })}
              className={`p-4 rounded-lg transition-all text-center ${
                budgetData.mood === mood.id
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="font-bold text-sm">{mood.name}</div>
              <div className="text-xs text-gray-600 mt-1">{mood.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Priority Selection */}
      <div>
        <label className="block text-lg font-semibold mb-4">Design Priority</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {priorities.map((priority) => (
            <motion.button
              key={priority.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setBudgetData({ priority: priority.id })}
              className={`p-4 rounded-lg transition-all text-center ${
                budgetData.priority === priority.id
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-3xl mb-2">{priority.icon}</div>
              <div className="font-bold text-sm">{priority.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Budget Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6"
      >
        <h4 className="font-bold mb-3">Budget Summary</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Total Budget</p>
            <p className="text-3xl font-bold text-purple-600">₹{budgetData.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Current Mood</p>
            <p className="text-lg font-bold">
              {moods.find(m => m.id === budgetData.mood)?.name}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default BudgetStep;
