import React from 'react';
import { motion } from 'framer-motion';
import { Check, Home, Zap } from 'lucide-react';

/**
 * FinalReviewStep
 * Review all selections before generation and optionally enable student mode
 */
export default function FinalReviewStep({
  designData = {},
  uploadedImage = null,
  isStudentMode = false,
  onStudentModeToggle,
  onGenerate,
  onBack,
  isGenerating = false
}) {
  const formatLabel = (key) => {
    const labels = {
      roomType: 'Room Type',
      style: 'Design Style',
      mood: 'Mood',
      budget: 'Budget',
      priority: 'Priority'
    };
    return labels[key] || key;
  };

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
          Ready to Redesign?
        </h3>
        <p className="text-gray-600">
          Review your selections and AI will generate your room redesign
        </p>
      </div>

      {/* Image Preview */}
      {uploadedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-100 rounded-lg overflow-hidden border-2 border-indigo-200"
        >
          <img
            src={uploadedImage.preview}
            alt="Your room"
            className="w-full h-64 object-cover"
          />
          <div className="p-3 bg-white border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Original:</span> {uploadedImage.name}
            </p>
          </div>
        </motion.div>
      )}

      {/* Design Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {Object.entries(designData).map(([key, value], idx) => {
          if (!value || key === 'imageId') return null;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-3"
            >
              <p className="text-xs font-semibold text-indigo-600 uppercase">
                {formatLabel(key)}
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1 capitalize">
                {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Student Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg border-2 p-4 transition-all cursor-pointer ${
          isStudentMode
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:border-green-400'
        }`}
        onClick={onStudentModeToggle}
      >
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isStudentMode}
            onChange={onStudentModeToggle}
            className="w-5 h-5 mt-1 rounded border-gray-300 text-green-600 focus:ring-0 cursor-pointer"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Optimize for Student / Compact Space
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Enable special optimization for hostel rooms, dorms, and compact spaces with budget-friendly, multi-purpose furniture and rental-safe solutions
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI Generation Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-2"
      >
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900">AI Redesign in Progress</p>
            <p className="text-sm text-blue-800 mt-1">
              Our AI will analyze your room and create a beautiful redesign based on your style, mood, and budget preferences. The transformation preserves your room's structure while completely redesigning the interior.
            </p>
            <p className="text-xs text-blue-700 mt-2">
              ⏱️ Generation typically takes 15-30 seconds
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-3 pt-6">
        <button
          onClick={onBack}
          disabled={isGenerating}
          className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={onGenerate}
          disabled={isGenerating || !uploadedImage}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                <Zap className="w-5 h-5" />
              </motion.div>
              Generating...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Generate Design
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
