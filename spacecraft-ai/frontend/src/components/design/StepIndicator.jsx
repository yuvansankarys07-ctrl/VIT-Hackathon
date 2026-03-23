import React from 'react';
import { motion } from 'framer-motion';

/**
 * StepIndicator - Visual step progress display for 6-step redesign wizard
 * Shows all steps and highlights current step with check marks for completed steps
 */
function StepIndicator({ currentStep, totalSteps, steps }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/65 backdrop-blur-xl p-4 md:p-5 shadow-soft">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* Step Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl border p-3 transition-all duration-300 ${
              currentStep === step.number
                ? 'border-indigo-300 bg-indigo-50 shadow-glow'
                : currentStep > step.number
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-slate-200 bg-white/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: currentStep >= step.number ? '#4f46e5' : '#e2e8f0',
                  color: currentStep >= step.number ? '#fff' : '#64748b',
                  scale: currentStep === step.number ? 1.05 : 1
                }}
                transition={{ duration: 0.25 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm"
              >
                {currentStep > step.number ? '✓' : step.number}
              </motion.div>
              <span className="text-sm">{step.icon}</span>
            </div>
            <span className="mt-2 block text-xs font-medium text-slate-700 whitespace-nowrap">
              {step.title}
            </span>
          </motion.div>
        </React.Fragment>
      ))}
      </div>
    </div>
  );
}

export default StepIndicator;
