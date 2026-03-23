import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useDesignStore, useProjectsStore } from '../store/designStore';
import { projectsAPI, imageAPI } from '../utils/api';
import { Download, Send, RotateCcw } from 'lucide-react';

/**
 * ResultsPage - NEW IMAGE-BASED RESULTS
 * Display before/after room redesign with AI image generation
 */
function ResultsPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const sliderRef = useRef(null);

  const {
    uploadedImage,
    generatedDesign,
    roomType,
    style,
    mood,
    budget,
    priority,
    isStudentMode,
    setGeneratedDesign,
    setIsGenerating,
    reset
  } = useDesignStore();

  const { addProject } = useProjectsStore();

  // Redirect if no generated design
  if (!generatedDesign || !uploadedImage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900">No Design Generated</h1>
          <p className="text-lg text-gray-600 mb-8">
            Please complete the design wizard first
          </p>
          <button
            onClick={() => navigate('/design')}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Go to Design Wizard
          </button>
        </motion.div>
      </motion.div>
    );
  }

  const handleSaveProject = async () => {
    if (!projectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }

    try {
      setSaving(true);
      const toastId = toast.loading('Saving project...');

      const projectData = {
        name: projectName,
        description: `${style} ${roomType} design - ${budget} budget`,
        beforeImage: uploadedImage.url,
        afterImage: generatedDesign.outputImage,
        designData: {
          roomType,
          style,
          mood,
          budget,
          priority,
          isStudentMode
        },
        prompt: generatedDesign.prompt,
        provider: generatedDesign.provider,
        generationTime: generatedDesign.generationTime
      };

      const response = await projectsAPI.create(projectData);

      if (response.data.success) {
        addProject(response.data.data);
        toast.dismiss(toastId);
        toast.success('✅ Project saved successfully!');
        setShowSaveModal(false);
        setProjectName('');
      }
    } catch (error) {
      toast.error('Failed to save project');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerate = async () => {
    try {
      setIsRegenerating(true);
      const toastId = toast.loading('Regenerating design...');

      const designData = {
        imageId: generatedDesign.imageId,
        roomType,
        style,
        mood,
        budget,
        priority,
        isStudentMode
      };

      const response = await imageAPI.regenerateDesign(uploadedImage.id, designData);

      if (response.data.success) {
        setGeneratedDesign(response.data);
        toast.dismiss(toastId);
        toast.success('✨ Design regenerated!');
        setSliderValue(50);
      }
    } catch (error) {
      toast.error('Failed to regenerate design');
      console.error(error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      const link = document.createElement('a');
      link.href = generatedDesign.outputImage;
      link.download = `room-redesign-${Date.now()}.png`;
      link.click();
      toast.success('📥 Image downloaded!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            ✨ Your Room Transformed
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered interior redesign based on your {style} {roomType}
          </p>
        </motion.div>

        {/* Before/After Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12"
        >
          <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
            {/* Before Image (Background) */}
            <img
              src={uploadedImage.url}
              alt="Before"
              className="w-full h-full object-cover"
            />

            {/* After Image (With Slider Clip) */}
            <div
              ref={sliderRef}
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderValue}%` }}
            >
              <img
                src={generatedDesign.outputImage}
                alt="After"
                className="w-screen h-full object-cover"
                style={{ marginLeft: `-${100 - sliderValue}%` }}
              />
            </div>

            {/* Slider Handle */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-30"
            />

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20"
              style={{ left: `${sliderValue}%` }}
            />

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold z-10">
              Before
            </div>
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold z-10">
              After
            </div>

            {/* Slider Instruction */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-sm z-10">
              ↔️ Drag to compare
            </div>
          </div>
        </motion.div>

        {/* Design Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12"
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-1">Room Type</p>
            <p className="text-2xl font-bold text-indigo-600">{roomType}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-1">Style</p>
            <p className="text-2xl font-bold text-purple-600">{style}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-1">Mood</p>
            <p className="text-2xl font-bold text-pink-600">{mood}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-1">Budget</p>
            <p className="text-2xl font-bold text-green-600">{budget}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-1">Priority</p>
            <p className="text-2xl font-bold text-blue-600">{priority}</p>
          </div>
        </motion.div>

        {/* Generation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 mb-12 border border-indigo-200"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">✨ Generation Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-2">Provider</p>
              <p className="text-lg font-semibold capitalize">{generatedDesign.provider}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-2">Generation Time</p>
              <p className="text-lg font-semibold">{generatedDesign.generationTime || '~30s'}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-600 text-sm mb-2">AI Prompt Used</p>
              <div className="bg-white rounded-lg p-4 border border-gray-300 max-h-32 overflow-y-auto">
                <p className="text-gray-700 text-sm font-mono">{generatedDesign.prompt}</p>
              </div>
            </div>

            {isStudentMode && (
              <div className="md:col-span-2 bg-blue-100 border border-blue-300 rounded-lg p-4">
                <p className="text-blue-900 font-semibold">🎓 Student Mode Enabled</p>
                <p className="text-blue-800 text-sm mt-1">
                  This design is optimized for student/hostel rooms with budget-friendly, multi-purpose furniture and rental-safe solutions.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          <button
            onClick={handleDownloadImage}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Download size={20} />
            Download Image
          </button>

          <button
            onClick={() => setShowSaveModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
          >
            <Send size={20} />
            Save Project
          </button>

          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            <RotateCcw size={20} />
            {isRegenerating ? 'Regenerating...' : 'Regenerate'}
          </button>

          <button
            onClick={() => {
              reset();
              navigate('/design');
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
          >
            🔄 New Design
          </button>
        </motion.div>

        {/* Save Modal */}
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Save Design Project</h2>
              <p className="text-gray-600 mb-6">
                Save this room redesign project to your collection
              </p>

              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Modern Bedroom Redesign"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-indigo-500"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowSaveModal(false);
                    setProjectName('');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-all disabled:opacity-50"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
