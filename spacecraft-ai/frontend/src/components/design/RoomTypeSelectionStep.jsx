import React from 'react';
import { Bed, Sofa, Briefcase, Utensils, BookOpen, Home, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * RoomTypeSelectionStep
 * Select the type of room being redesigned
 */
export default function RoomTypeSelectionStep({
  selectedRoom = 'living room',
  onRoomSelect,
  onNext,
  onBack
}) {
  const roomTypes = [
    { id: 'bedroom', label: 'Bedroom', icon: Bed, description: 'Master bedroom or guest room' },
    { id: 'living room', label: 'Living Room', icon: Sofa, description: 'Main living space' },
    { id: 'office corner', label: 'Office Corner', icon: Briefcase, description: 'Dedicated work space' },
    { id: 'kitchen', label: 'Kitchen', icon: Utensils, description: 'Cooking & dining area' },
    { id: 'study room', label: 'Study Room', icon: BookOpen, description: 'Focus & learning space' },
    { id: 'hostel room', label: 'Hostel Room', icon: Home, description: 'Compact dorm space' },
    { id: 'studio apartment', label: 'Studio', icon: Maximize2, description: 'Multi-purpose space' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full space-y-6"
    >
      {/* Title */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">What type of room is it?</h3>
        <p className="text-gray-600">This helps us optimize the design recommendations</p>
      </div>

      {/* Room Type Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roomTypes.map((room, idx) => {
          const Icon = room.icon;
          const isSelected = selectedRoom === room.id;

          return (
            <motion.button
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onRoomSelect(room.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${
                  isSelected ? 'text-indigo-600' : 'text-gray-400'
                }`} />
                <div>
                  <p className={`font-semibold ${isSelected ? 'text-indigo-600' : 'text-gray-800'}`}>
                    {room.label}
                  </p>
                  <p className="text-sm text-gray-500">{room.description}</p>
                </div>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="roomSelection"
                  className="absolute inset-0 border-2 border-indigo-500 rounded-xl pointer-events-none"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-6">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Next: Choose Style
        </button>
      </div>
    </motion.div>
  );
}
