import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useDesignStore } from '../store/designStore';
import { plansAPI } from '../utils/api';
import StepIndicator from '../components/design/StepIndicator';
import RoomInputStep from '../components/design/RoomInputStep';
import StyleSelectionStep from '../components/design/StyleSelectionStep';
import BudgetStep from '../components/design/BudgetStep';
import ReviewStep from '../components/design/ReviewStep';

function DesignPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    step,
    setStep,
    roomData,
    styleData,
    budgetData,
    setCurrentPlan,
    reset
  } = useDesignStore();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      toast.loading('Generating your AI interior plan...');

      // Generate plan
      const response = await plansAPI.generatePlan({
        roomData,
        styleData,
        budgetData
      });

      if (response.data.success) {
        setCurrentPlan(response.data.data);
        toast.dismiss();
        toast.success('Plan generated successfully!');
        navigate('/results');
      } else {
        throw new Error('Failed to generate plan');
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.error || 'Error generating plan. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to start over?')) {
      reset();
      toast.success('Design cleared. Start fresh!');
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="section-container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Design Your Perfect Room
          </h1>
          <p className="text-lg text-gray-600">
            Let's create an AI-powered interior design tailored to your space and budget
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={step} totalSteps={4} />

        {/* Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mt-12 card-soft p-8"
        >
          {step === 1 && <RoomInputStep />}
          {step === 2 && <StyleSelectionStep />}
          {step === 3 && <BudgetStep />}
          {step === 4 && <ReviewStep roomData={roomData} styleData={styleData} budgetData={budgetData} />}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={step === 1 || loading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="btn-primary"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="loading-spinner w-5 h-5"></span>
                  Generating...
                </>
              ) : (
                '✨ Generate Design'
              )}
            </button>
          )}

          <button
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center text-gray-600">
          <p>Step {step} of 4</p>
        </div>
      </div>
    </div>
  );
}

export default DesignPage;
