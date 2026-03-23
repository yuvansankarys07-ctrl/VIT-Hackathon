import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function StatsSection() {
  const stats = [
    { label: 'Design Styles', value: '7+' },
    { label: 'Furniture Items', value: '50+' },
    { label: 'Budget Ranges', value: '4+' },
    { label: 'Room Types', value: '5+' }
  ];

  const usageData = [
    { category: 'Students', percentage: 35 },
    { category: 'Renters', percentage: 40 },
    { category: 'Homeowners', percentage: 25 }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="section-container">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-purple-400">
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-700 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-8">Target Audience</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="category" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="percentage" fill="#667eea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;
