import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useDesignStore, useProjectsStore } from '../store/designStore';
import { projectsAPI } from '../utils/api';
import ResultsDashboard from '../components/results/ResultsDashboard';
import BeforeAfterComparison from '../components/results/BeforeAfterComparison';
import BudgetBreakdown from '../components/results/BudgetBreakdown';
import SpaceAnalysisCard from '../components/results/SpaceAnalysisCard';
import CustomizationPanel from '../components/results/CustomizationPanel';

function ResultsPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const {
    currentPlan,
    roomData,
    styleData,
    budgetData,
    customizations,
    setCurrentPlan,
    setCustomizations
  } = useDesignStore();

  const { addProject } = useProjectsStore();

  if (!currentPlan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">No Plan Generated</h1>
        <p className="text-gray-600 mb-8">Please complete the design wizard first</p>
        <button
          onClick={() => navigate('/design')}
          className="btn-primary"
        >
          Go to Design Wizard
        </button>
      </div>
    );
  }

  const handleSaveProject = async () => {
    if (!projectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }

    try {
      setSaving(true);
      toast.loading('Saving project...');

      const projectData = {
        name: projectName,
        description: `${styleData.styleId} style room design - ${budgetData.amount} budget`,
        roomData,
        plan: currentPlan,
        customizations
      };

      const response = await projectsAPI.create(projectData);
      
      if (response.data.success) {
        addProject(response.data.data);
        toast.dismiss();
        toast.success('Project saved successfully!');
        setShowSaveModal(false);
        setProjectName('');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to save project');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    toast.success('PDF download feature coming soon!');
  };

  const handleCustomize = (modifications) => {
    setCustomizations(modifications);
    // Here you would typically call an API to customize the plan
    const updatedBudget = {
      ...currentPlan.budgetBreakdown,
      ...modifications.budgetUpdate
    };
    toast.success('Design updated!');
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="section-container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your AI Interior Design
          </h1>
          <p className="text-lg text-gray-600">
            Complete with recommendations, budget breakdown, and space analysis
          </p>
        </motion.div>

        {/* Main Results Dashboard */}
        <ResultsDashboard plan={currentPlan} />

        {/* Before & After Comparison */}
        <BeforeAfterComparison
          beforeImage={roomData.imageUrl}
          afterImage={currentPlan.styleSummary}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-1">
            {/* Space Analysis */}
            <SpaceAnalysisCard scores={currentPlan.scores} />
          </div>

          <div className="lg:col-span-2">
            {/* Budget Breakdown */}
            <BudgetBreakdown budget={currentPlan.budgetBreakdown} />
          </div>
        </div>

        {/* Customization Panel */}
        <CustomizationPanel
          plan={currentPlan}
          onCustomize={handleCustomize}
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-12 justify-center">
          <button
            onClick={() => setShowSaveModal(true)}
            className="btn-primary"
          >
            💾 Save Project
          </button>
          <button
            onClick={handleDownloadPDF}
            className="btn-secondary"
          >
            📄 Download PDF
          </button>
          <button
            onClick={() => navigate('/saved')}
            className="btn-secondary"
          >
            📁 View Saved Projects
          </button>
          <button
            onClick={() => navigate('/design')}
            className="btn-secondary"
          >
            🔄 Design Another Room
          </button>
        </div>

        {/* Save Modal */}
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
            >
              <h2 className="text-2xl font-bold mb-4">Save Project</h2>
              <p className="text-gray-600 mb-4">Give your design project a name</p>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Modern Bedroom Redesign"
                className="input-base mb-6"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="btn-secondary flex-1"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="btn-primary flex-1"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
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
