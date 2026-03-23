import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useDesignStore } from '../store/designStore';
import { imageAPI } from '../utils/api';

// Import wizard steps
import StepIndicator from '../components/design/StepIndicator';
import ImageUploadStep from '../components/design/ImageUploadStep';
import RoomTypeSelectionStep from '../components/design/RoomTypeSelectionStep';
import EnhancedStyleSelectionStep from '../components/design/EnhancedStyleSelectionStep';
import MoodSelectionStep from '../components/design/MoodSelectionStep';
import BudgetPriorityStep from '../components/design/BudgetPriorityStep';
import FinalReviewStep from '../components/design/FinalReviewStep';

/**
 * RedesignPage - NEW IMAGE-BASED DESIGN WIZARD
 * 7-step wizard for AI room redesign
 */
export default function RedesignPage() {
  const navigate = useNavigate();
  const {
    step,
    setStep,
    uploadedImage,
    setUploadedImage,
    imageId,
    roomType,
    setRoomType,
    style,
    setStyle,
    mood,
    setMood,
    budget,
    setBudget,
    priority,
    setPriority,
    isStudentMode,
    setStudentMode,
    isGenerating,
    setIsGenerating,
    generatedDesign,
    setGeneratedDesign,
    reset
  } = useDesignStore();

  const [localLoading, setLocalLoading] = useState(false);

  const steps = [
    { number: 1, title: 'Upload Room', icon: '📸' },
    { number: 2, title: 'Room Type', icon: '🏠' },
    { number: 3, title: 'Style', icon: '🎨' },
    { number: 4, title: 'Mood', icon: '✨' },
    { number: 5, title: 'Budget', icon: '💰' },
    { number: 6, title: 'Review', icon: '✓' },
    { number: 7, title: 'Generate', icon: '⚙️' }
  ];

  // Handle image upload
  const handleImageUpload = (imageData) => {
    setUploadedImage({
      id: imageData.id,
      filename: imageData.filename,
      url: imageData.url,
      name: imageData.originalName,
      preview: imageData.url, // Backend will serve this at /api/uploads/{filename}
    });
  };

  // Handle generate design
  const handleGenerateDesign = async () => {
    if (!imageId || !roomType || !style) {
      toast.error('Missing required information');
      return;
    }

    try {
      setIsGenerating(true);
      setLocalLoading(true);

      const designData = {
        imageId,
        roomType,
        style,
        mood,
        budget,
        priority,
        isStudentMode,
        provider: 'mock' // Will use auto-selection based on env vars
      };

      const response = await imageAPI.generateDesign(designData);

      if (response.data.success) {
        setGeneratedDesign(response.data);
        toast.success('✨ Room redesign generated successfully!');
        
        // Navigate to results page after brief delay
        setTimeout(() => {
          navigate('/results');
        }, 1000);
      } else {
        throw new Error(response.data.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate design');
    } finally {
      setIsGenerating(false);
      setLocalLoading(false);
    }
  };

  // Reset wizard on mount
  useEffect(() => {
    return () => {
      // Don't reset, keep data for navigation back
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Room Redesign
          </h1>
          <p className="text-gray-600">
            Upload your room photo and let AI transform it into your dream space
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={step} totalSteps={steps.length} steps={steps} />

        {/* Content Container */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-12"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Upload Image */}
            {step === 1 && (
              <ImageUploadStep
                key="step1"
                onImageUpload={(imageData) => {
                  handleImageUpload(imageData);
                  setTimeout(() => setStep(2), 300);
                }}
                uploadedImage={uploadedImage}
                isLoading={localLoading}
              />
            )}

            {/* Step 2: Room Type Selection */}
            {step === 2 && (
              <RoomTypeSelectionStep
                key="step2"
                selectedRoom={roomType}
                onRoomSelect={setRoomType}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}

            {/* Step 3: Style Selection */}
            {step === 3 && (
              <EnhancedStyleSelectionStep
                key="step3"
                selectedStyle={style}
                onStyleSelect={setStyle}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}

            {/* Step 4: Mood Selection */}
            {step === 4 && (
              <MoodSelectionStep
                key="step4"
                selectedMood={mood}
                onMoodSelect={setMood}
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
              />
            )}

            {/* Step 5: Budget & Priority */}
            {step === 5 && (
              <BudgetPriorityStep
                key="step5"
                budget={budget}
                priority={priority}
                onBudgetChange={setBudget}
                onPriorityChange={setPriority}
                onNext={() => setStep(6)}
                onBack={() => setStep(4)}
              />
            )}

            {/* Step 6: Final Review & Generation */}
            {step === 6 && (
              <FinalReviewStep
                key="step6"
                designData={{
                  roomType,
                  style,
                  mood,
                  budget,
                  priority,
                  isStudentMode
                }}
                uploadedImage={uploadedImage}
                isStudentMode={isStudentMode}
                onStudentModeToggle={() => setStudentMode(!isStudentMode)}
                onGenerate={handleGenerateDesign}
                onBack={() => setStep(5)}
                isGenerating={isGenerating || localLoading}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mt-12 bg-gray-200 rounded-full h-2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Step Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600 text-sm">
            Step {step} of 6 • {steps[step - 1]?.title}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
