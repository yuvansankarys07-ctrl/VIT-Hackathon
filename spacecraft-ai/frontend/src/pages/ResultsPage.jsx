import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useDesignStore, useProjectsStore } from '../store/designStore';
import { projectsAPI, imageAPI } from '../utils/api';
import { AlertTriangle, Download, Lightbulb, PaintBucket, RotateCcw, Send, Sofa, Sparkles, SunMedium, Palette } from 'lucide-react';
import { PieChart, Pie, Cell, RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

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
  const [activeTab, setActiveTab] = useState('colors');
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

  const budgetPercentMap = { low: 38, medium: 62, high: 82, luxury: 95 };
  const budgetPercent = budgetPercentMap[budget] || 58;
  const budgetTone = budgetPercent < 55 ? '#16a34a' : budgetPercent < 80 ? '#eab308' : '#ef4444';

  const spaceScoreData = [
    { name: 'Walkability', value: 84, fill: '#3b82f6' },
    { name: 'Storage', value: 72, fill: '#6366f1' },
    { name: 'Light', value: 89, fill: '#8b5cf6' },
    { name: 'Openness', value: 77, fill: '#06b6d4' }
  ];

  const customizationTabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'furniture', label: 'Furniture', icon: Sofa },
    { id: 'lighting', label: 'Lighting', icon: SunMedium },
    { id: 'decor', label: 'Decor', icon: PaintBucket }
  ];

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Results Dashboard</h1>
          <p className="text-slate-600 mt-1">Premium AI redesign output for your {style} {roomType}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleDownloadImage} className="btn-primary inline-flex items-center gap-2"><Download size={16} /> Download</button>
          <button onClick={() => setShowSaveModal(true)} className="btn-secondary inline-flex items-center gap-2"><Send size={16} /> Save</button>
          <button onClick={handleRegenerate} disabled={isRegenerating} className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50"><RotateCcw size={16} /> {isRegenerating ? 'Regenerating...' : 'Regenerate'}</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-8 space-y-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl shadow-soft overflow-hidden">
            <div className="relative w-full aspect-video bg-slate-200 overflow-hidden">
              <img src={uploadedImage.url} alt="Before" className="w-full h-full object-cover" />

              <div ref={sliderRef} className="absolute inset-0 overflow-hidden" style={{ width: `${sliderValue}%` }}>
                <img src={generatedDesign.outputImage} alt="After" className="w-screen h-full object-cover" style={{ marginLeft: `-${100 - sliderValue}%` }} />
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-30"
              />

              <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg z-20" style={{ left: `${sliderValue}%` }} />
              <div className="absolute top-3 left-3 rounded-lg bg-black/55 text-white px-3 py-1 text-xs font-medium">Before</div>
              <div className="absolute top-3 right-3 rounded-lg bg-black/55 text-white px-3 py-1 text-xs font-medium">After</div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-lg bg-black/65 text-white px-3 py-1 text-xs">Drag to compare</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl shadow-soft p-5">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Generation Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="rounded-xl border border-slate-200 bg-white/90 p-3"><p className="text-xs text-slate-500">Room</p><p className="font-semibold text-slate-900">{roomType}</p></div>
              <div className="rounded-xl border border-slate-200 bg-white/90 p-3"><p className="text-xs text-slate-500">Style</p><p className="font-semibold text-slate-900">{style}</p></div>
              <div className="rounded-xl border border-slate-200 bg-white/90 p-3"><p className="text-xs text-slate-500">Mood</p><p className="font-semibold text-slate-900">{mood}</p></div>
              <div className="rounded-xl border border-slate-200 bg-white/90 p-3"><p className="text-xs text-slate-500">Provider</p><p className="font-semibold text-slate-900 capitalize">{generatedDesign.provider}</p></div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 max-h-44 overflow-y-auto">
              <p className="text-xs text-slate-500 mb-2">Prompt</p>
              <p className="text-xs md:text-sm text-slate-700 whitespace-pre-wrap">{generatedDesign.prompt}</p>
            </div>
            {isStudentMode && <p className="mt-3 text-sm rounded-xl bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2">Student mode optimization was included in this redesign.</p>}
          </motion.div>
        </div>

        <aside className="col-span-12 xl:col-span-4 space-y-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/40 bg-white/85 backdrop-blur-xl shadow-soft p-5">
            <h3 className="text-lg font-semibold text-slate-900">Budget Card</h3>
            <div className="h-40 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ name: 'Used', value: budgetPercent }, { name: 'Free', value: 100 - budgetPercent }]} dataKey="value" innerRadius={50} outerRadius={66} startAngle={90} endAngle={-270}>
                    <Cell fill={budgetTone} />
                    <Cell fill="#e2e8f0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-slate-600 -mt-5">Budget utilization: <span className="font-semibold">{budgetPercent}%</span></p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="rounded-3xl border border-white/40 bg-white/85 backdrop-blur-xl shadow-soft p-5">
            <h3 className="text-lg font-semibold text-slate-900">Space Score</h3>
            <div className="h-40 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="25%" outerRadius="100%" data={spaceScoreData} startAngle={180} endAngle={0}>
                  <RadialBar background dataKey="value" />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {spaceScoreData.map((row) => (
                <div key={row.name} className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: row.fill }} />{row.name}</div>
                  <span className="font-medium text-slate-900">{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-3xl border border-white/40 bg-white/85 backdrop-blur-xl shadow-soft p-5">
            <h3 className="text-lg font-semibold text-slate-900">AI Insights</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 flex items-start gap-2"><AlertTriangle size={16} className="text-amber-600 mt-0.5" /><span>Large bed reduces walking space near the window corner.</span></div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 flex items-start gap-2"><Lightbulb size={16} className="text-emerald-600 mt-0.5" /><span>Layered warm lighting improves mood consistency.</span></div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 flex items-start gap-2"><Sparkles size={16} className="text-indigo-600 mt-0.5" /><span>{priority} priority is reflected in furniture and circulation.</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="rounded-3xl border border-white/40 bg-white/85 backdrop-blur-xl shadow-soft p-5 sticky top-24">
            <h3 className="text-lg font-semibold text-slate-900">Customization Panel</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {customizationTabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`rounded-xl border px-3 py-2 text-sm flex items-center justify-center gap-2 transition-all ${active ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>
                    <Icon size={14} /> {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Live update preview mode for <span className="font-semibold text-slate-900">{activeTab}</span>. Tap options to simulate refinements.
            </div>
            <button
              onClick={() => {
                reset();
                navigate('/design');
              }}
              className="mt-4 w-full rounded-xl bg-slate-900 text-white py-2.5 text-sm font-medium hover:bg-slate-800 transition-all"
            >
              Start New Design
            </button>
          </motion.div>
        </aside>
      </div>

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
  );
}

export default ResultsPage;
