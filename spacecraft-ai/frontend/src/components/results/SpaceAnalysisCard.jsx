import React from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

function SpaceAnalysisCard({ scores }) {
  const radarData = [
    { subject: 'Walkability', value: scores?.walkabilityScore || 70, fullMark: 100 },
    { subject: 'Storage', value: scores?.storageEfficiency || 65, fullMark: 100 },
    { subject: 'Lighting', value: scores?.naturalLight || 75, fullMark: 100 },
    { subject: 'Openness', value: scores?.visualOpenness || 70, fullMark: 100 },
  ];

  const overallScore = scores?.overallUsability || 70;
  const recommendation = scores?.recommendation || 'Good';

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    return 'text-yellow-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="card-soft p-8 sticky top-20"
    >
      <h2 className="text-2xl font-bold mb-6">Space Analysis</h2>

      {/* Overall Score */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-6 mb-6 text-center"
      >
        <p className="text-gray-600 text-sm font-semibold mb-2">Overall Room Usability</p>
        <p className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
          {overallScore}/100
        </p>
        <p className={`text-lg font-semibold mt-3 ${getScoreColor(overallScore)}`}>
          {recommendation}
        </p>
      </motion.div>

      {/* Radar Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#667eea"
              fill="#667eea"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Scores */}
      <div className="space-y-3">
        {radarData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">{item.subject}</span>
              <span className={`font-bold ${getScoreColor(item.value)}`}>
                {item.value}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SpaceAnalysisCard;
