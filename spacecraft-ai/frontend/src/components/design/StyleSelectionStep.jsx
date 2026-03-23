import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '../../store/designStore';
import { stylesAPI } from '../../utils/api';
import toast from 'react-hot-toast';

function StyleSelectionStep() {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { styleData, setStyleData } = useDesignStore();

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await stylesAPI.getAll();
        if (response.data.success) {
          setStyles(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch styles:', error);
        // Fallback styles
        setStyles([
          { id: 'style-modern', name: 'Modern', description: 'Clean, contemporary design' },
          { id: 'style-minimal', name: 'Minimal', description: 'Essentials only' },
          { id: 'style-scandinavian', name: 'Scandinavian', description: 'Light and functional' },
          { id: 'style-boho', name: 'Boho', description: 'Eclectic and artistic' },
          { id: 'style-industrial', name: 'Industrial', description: 'Raw and edgy' },
          { id: 'style-traditional', name: 'Traditional', description: 'Classic elegance' },
          { id: 'style-cozy', name: 'Cozy', description: 'Warm and comfortable' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
  }, []);

  const styleIcons = {
    'style-modern': '🤖',
    'style-minimal': '⚪',
    'style-scandinavian': '❄️',
    'style-boho': '🌸',
    'style-industrial': '⚙️',
    'style-traditional': '👑',
    'style-cozy': '🔥'
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Step 2: Choose Your Design Style</h3>
        <p className="text-gray-600 mb-6">
          Select a design aesthetic that matches your personality and preferences
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {styles.map((style) => (
            <motion.button
              key={style.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStyleData({ styleId: style.id })}
              className={`p-6 rounded-xl text-left transition-all ${
                styleData.styleId === style.id
                  ? 'ring-2 ring-purple-600 bg-gradient-to-br from-purple-50 to-indigo-50'
                  : 'bg-white border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-4xl mb-3">
                {styleIcons[style.id] || '✨'}
              </div>
              <h4 className="text-lg font-bold mb-1">{style.name}</h4>
              <p className="text-sm text-gray-600">{style.description}</p>
            </motion.button>
          ))}
        </div>
      )}

      {/* Style Details */}
      {styleData.styleId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6"
        >
          <h4 className="font-bold mb-3">
            {styles.find(s => s.id === styleData.styleId)?.name} Style Characteristics
          </h4>
          <div className="flex flex-wrap gap-2">
            {styles.find(s => s.id === styleData.styleId)?.characteristics?.map((char, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white rounded-full text-sm border border-purple-300"
              >
                {char}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default StyleSelectionStep;
