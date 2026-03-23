import React, { useState } from 'react';
import { motion } from 'framer-motion';

function CustomizationPanel({ plan, onCustomize }) {
  const [customizations, setCustomizations] = useState({
    wallColor: '#FFFFFF',
    flooringType: 'light wood'
  });

  const colors = ['#FFFFFF', '#F5F1E8', '#E8DCC8', '#D3D3D3', '#FFE4E1', '#E0FFFF', '#FFF0F5'];
  const flooringTypes = ['light wood', 'dark wood', 'white tile', 'grey tile', 'concrete', 'marble'];

  const handleColorChange = (color) => {
    setCustomizations({ ...customizations, wallColor: color });
    onCustomize({ wallColor: color });
  };

  const handleFlooringChange = (flooring) => {
    setCustomizations({ ...customizations, flooringType: flooring });
    onCustomize({ flooringType: flooring });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-soft p-8 mt-12"
    >
      <h2 className="text-3xl font-bold mb-6">Customize Your Design</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Wall Color */}
        <div>
          <h3 className="text-xl font-bold mb-4">Wall Color</h3>
          <div className="mb-6">
            <div
              className="w-full h-32 rounded-xl border-4 border-gray-300 shadow-lg transition-all"
              style={{ backgroundColor: customizations.wallColor }}
            />
            <p className="text-center mt-2 text-sm text-gray-600 font-mono">
              {customizations.wallColor}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleColorChange(color)}
                className={`w-12 h-12 rounded-lg border-4 transition-all ${
                  customizations.wallColor === color
                    ? 'border-purple-600 shadow-lg scale-110'
                    : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              >
                {customizations.wallColor === color && (
                  <span className="text-lg">✓</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Flooring Type */}
        <div>
          <h3 className="text-xl font-bold mb-4">Flooring Type</h3>
          <div className="space-y-3">
            {flooringTypes.map((flooring) => (
              <motion.button
                key={flooring}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFlooringChange(flooring)}
                className={`w-full p-4 rounded-lg text-left font-semibold transition-all ${
                  customizations.flooringType === flooring
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-lg">
                    {flooring.includes('wood') && '🪵'}
                    {flooring.includes('tile') && '🔷'}
                    {flooring.includes('concrete') && '🩶'}
                    {flooring.includes('marble') && '⚪'}
                  </div>
                  <div>
                    <div className="capitalize font-bold">{flooring}</div>
                  </div>
                  {customizations.flooringType === flooring && (
                    <span className="ml-auto text-xl">✓</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 p-8 rounded-xl border-2 border-purple-200"
        style={{ backgroundColor: customizations.wallColor + '20' }}
      >
        <h4 className="font-bold text-lg mb-4">Preview</h4>
        <div
          className="w-full h-40 rounded-lg border-4 border-gray-400 relative overflow-hidden"
          style={{ backgroundColor: customizations.wallColor }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{
              background: `linear-gradient(180deg, 
                ${customizations.flooringType.includes('tile') ? '#8B7355' : '#5C4033'} 0%,
                ${customizations.flooringType.includes('wood') ? '#A0826D' : '#696969'} 100%)`
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
            <span>Room Preview</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Walls: <span className="font-mono font-bold">{customizations.wallColor}</span> | 
          Flooring: <span className="font-bold capitalize ml-2">{customizations.flooringType}</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default CustomizationPanel;
