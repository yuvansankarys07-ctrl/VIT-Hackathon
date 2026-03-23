import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '../../store/designStore';

function RoomInputStep() {
  const { roomData, setRoomData } = useDesignStore();
  const [inputMode, setInputMode] = useState('dimensions'); // dimensions or details

  const roomTypes = [
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'study', name: 'Study Room', icon: '📚' },
    { id: 'living', name: 'Living Room', icon: '🪑' },
    { id: 'office', name: 'Office Corner', icon: '💼' },
    { id: 'hostel', name: 'Hostel Room', icon: '🏢' }
  ];

  const handleRoomTypeChange = (type) => {
    setRoomData({ roomType: type });
  };

  const handleDimensionChange = (field, value) => {
    setRoomData({ [field]: parseFloat(value) || 0 });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRoomData({ imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateArea = () => {
    const area = roomData.length * roomData.width;
    return area.toFixed(2);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Step 1: Tell us about your room</h3>
        <p className="text-gray-600 mb-6">
          Start by selecting your room type and providing dimensions
        </p>
      </div>

      {/* Room Type Selection */}
      <div>
        <label className="block text-lg font-semibold mb-4">Room Type</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {roomTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRoomTypeChange(type.id)}
              className={`p-4 rounded-lg font-bold transition-all ${
                roomData.roomType === type.id
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <div className="text-sm">{type.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setInputMode('dimensions')}
          className={`pb-3 font-semibold transition-all ${
            inputMode === 'dimensions'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600'
          }`}
        >
          📐 Dimensions
        </button>
        <button
          onClick={() => setInputMode('image')}
          className={`pb-3 font-semibold transition-all ${
            inputMode === 'image'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600'
          }`}
        >
          📸 Upload Image
        </button>
      </div>

      {/* Dimensions Input */}
      {inputMode === 'dimensions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Length (m)</label>
              <input
                type="number"
                value={roomData.length}
                onChange={(e) => handleDimensionChange('length', e.target.value)}
                className="input-base"
                step="0.1"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Width (m)</label>
              <input
                type="number"
                value={roomData.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                className="input-base"
                step="0.1"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Height (m)</label>
            <input
              type="number"
              value={roomData.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              className="input-base"
              step="0.1"
              min="2"
            />
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Room Area</p>
            <p className="text-3xl font-bold text-purple-600">
              {calculateArea()} m²
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Doors</label>
              <input
                type="number"
                value={roomData.doors}
                onChange={(e) => handleDimensionChange('doors', e.target.value)}
                className="input-base"
                min="0"
                max="5"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Windows</label>
              <input
                type="number"
                value={roomData.windows}
                onChange={(e) => handleDimensionChange('windows', e.target.value)}
                className="input-base"
                min="0"
                max="5"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Upload */}
      {inputMode === 'image' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer block">
              <div className="text-4xl mb-3">📸</div>
              <p className="font-semibold mb-1">Click to upload room photo</p>
              <p className="text-sm text-gray-600">
                PNG, JPG up to 10MB
              </p>
            </label>
          </div>

          {roomData.imageUrl && (
            <div className="relative rounded-lg overflow-hidden h-64 bg-gray-200">
              <img
                src={roomData.imageUrl}
                alt="Room preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default RoomInputStep;
