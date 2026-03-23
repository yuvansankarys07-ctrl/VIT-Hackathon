import React, { useState } from 'react';
import { motion } from 'framer-motion';

function BeforeAfterComparison({ beforeImage, afterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-soft p-8 mb-12"
    >
      <h2 className="text-3xl font-bold mb-6">Before & After</h2>

      <div className="relative w-full h-96 bg-gray-200 rounded-xl overflow-hidden border-4 border-gray-300">
        {/* After Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-center">
          <div>
            <div className="text-6xl mb-3">✨</div>
            <p className="text-xl font-bold">AI Redesigned Room</p>
            <p className="text-sm text-purple-100 mt-2">(Visualization Preview)</p>
          </div>
        </div>

        {/* Before Image (Slider) */}
        <div
          className="absolute inset-0 bg-gray-300 overflow-hidden flex items-center justify-center text-gray-600 text-center"
          style={{ width: `${sliderPosition}%` }}
        >
          {beforeImage ? (
            <img
              src={beforeImage}
              alt="Before"
              className="w-full h-full object-cover"
            />
          ) : (
            <div>
              <div className="text-6xl mb-3">📸</div>
              <p className="text-lg font-bold">Original Room</p>
            </div>
          )}
        </div>

        {/* Slider Handle */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-10"
        />

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white"
          style={{ left: `${sliderPosition}%`, transition: 'left 0.2s' }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-gray-600 text-lg"
          >
            ↔️
          </motion.div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-bold z-5">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-bold z-5">
          After
        </div>
      </div>

      <p className="text-center text-gray-600 mt-4 text-sm">
        Drag the slider to compare before and after designs
      </p>
    </motion.div>
  );
}

export default BeforeAfterComparison;
