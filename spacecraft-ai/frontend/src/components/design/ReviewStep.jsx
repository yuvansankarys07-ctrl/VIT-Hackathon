import React from 'react';
import { motion } from 'framer-motion';

function ReviewStep({ roomData, styleData, budgetData }) {
  const styleNames = {
    'style-modern': 'Modern',
    'style-minimal': 'Minimal',
    'style-scandinavian': 'Scandinavian',
    'style-boho': 'Boho',
    'style-industrial': 'Industrial',
    'style-traditional': 'Traditional',
    'style-cozy': 'Cozy'
  };

  const moodNames = {
    'mood-calm': 'Calm',
    'mood-productive': 'Productive',
    'mood-luxury': 'Luxury',
    'mood-cozy': 'Cozy',
    'mood-aesthetic': 'Aesthetic'
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Step 4: Ready to Generate?</h3>
        <p className="text-gray-600 mb-6">
          Review your selections and click "Generate Design" to create your AI interior plan
        </p>
      </div>

      {/* Room Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-soft p-6"
      >
        <h4 className="text-xl font-bold mb-4">Room Information</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Room Type</p>
            <p className="text-lg font-bold capitalize">{roomData.roomType}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Area</p>
            <p className="text-lg font-bold">
              {(roomData.length * roomData.width).toFixed(2)} m²
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Dimensions</p>
            <p className="text-lg font-bold">
              {roomData.length}m × {roomData.width}m × {roomData.height}m
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Doors</p>
            <p className="text-lg font-bold">{roomData.doors}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Windows</p>
            <p className="text-lg font-bold">{roomData.windows}</p>
          </div>
        </div>
      </motion.div>

      {/* Design Preferences Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-soft p-6"
      >
        <h4 className="text-xl font-bold mb-4">Design Preferences</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Style</p>
            <p className="text-lg font-bold text-purple-700">
              {styleNames[styleData.styleId] || 'Modern'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Mood</p>
            <p className="text-lg font-bold text-blue-700">
              {moodNames[budgetData.mood] || 'Productive'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Budget Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-soft p-6 bg-gradient-to-r from-green-50 to-emerald-50"
      >
        <h4 className="text-xl font-bold mb-4">Budget</h4>
        <p className="text-gray-600 text-sm mb-2">Total Budget</p>
        <p className="text-4xl font-bold text-green-600">
          ₹{budgetData.amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mt-4">
          Priority: <span className="font-bold capitalize">{budgetData.priority}</span>
        </p>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded"
      >
        <p className="text-blue-900">
          💡 <strong>Next:</strong> Click "Generate Design" to receive AI-powered recommendations for furniture, colors, layout, and budget breakdown.
        </p>
      </motion.div>
    </div>
  );
}

export default ReviewStep;
