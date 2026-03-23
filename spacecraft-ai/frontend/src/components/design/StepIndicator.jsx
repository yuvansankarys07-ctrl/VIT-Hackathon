import React from 'react';
import { motion } from 'framer-motion';

/**
 * StepIndicator - Visual step progress display for 6-step redesign wizard
 * Shows all steps and highlights current step with check marks for completed steps
 */
function StepIndicator({ currentStep, totalSteps, steps }) {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* Step Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{
                backgroundColor: currentStep >= step.number ? '#4f46e5' : '#e5e7eb',
                color: currentStep >= step.number ? '#fff' : '#9ca3af',
                scale: currentStep === step.number ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md"
            >
              {currentStep > step.number ? '✓' : step.number}
            </motion.div>
            <span className="text-xs md:text-sm font-medium mt-2 text-gray-700 text-center whitespace-nowrap">
              {step.title}
            </span>
          </motion.div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="hidden md:block h-1 w-8 lg:w-12 bg-gray-200 mb-6">
              <motion.div
                animate={{
                  backgroundColor: currentStep > step.number ? '#4f46e5' : '#e5e7eb',
                  scaleX: currentStep > step.number ? 1 : 0,
                  transformOrigin: 'left'
                }}
                transition={{ duration: 0.5 }}
                className="h-full"
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default StepIndicator;
