import React from 'react';
import { motion } from 'framer-motion';

function StepIndicator({ currentStep, totalSteps }) {
  const steps = ['Room', 'Style', 'Budget', 'Review'];

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step Circle */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all ${
              index + 1 <= currentStep
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            {index + 1 <= currentStep ? '✓' : index + 1}
          </motion.div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className={`h-1 flex-1 mx-2 transition-all ${
                index + 1 < currentStep
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                  : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default StepIndicator;
