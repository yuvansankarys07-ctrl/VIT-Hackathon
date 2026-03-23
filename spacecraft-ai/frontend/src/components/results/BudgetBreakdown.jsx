import React from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

function BudgetBreakdown({ budget }) {
  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4f46e5', '#945fec'];

  // Prepare data for pie chart
  const pieData = Object.entries(budget.allocation || {}).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
  }));

  // Prepare data for bar chart
  const barData = pieData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-soft p-8"
    >
      <h2 className="text-3xl font-bold mb-6">Budget Breakdown</h2>

      {/* Total Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-6"
        >
          <p className="text-gray-600 text-sm font-semibold">Total Budget</p>
          <p className="text-4xl font-bold text-purple-600 mt-2">
            ₹{(budget.totalBudget || 0).toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-6"
        >
          <p className="text-gray-600 text-sm font-semibold">Categories</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {Object.keys(budget.allocation || {}).length}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-6"
        >
          <p className="text-gray-600 text-sm font-semibold">Average Per Item</p>
          <p className="text-4xl font-bold text-green-600 mt-2">
            ₹{Math.round((budget.totalBudget || 0) / (Object.keys(budget.allocation || {}).length || 1)).toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-bold mb-4">Budget Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-bold mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="value" fill="#667eea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Details */}
      <div>
        <h3 className="text-lg font-bold mb-4">Category Allocation</h3>
        <div className="space-y-3">
          {pieData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="font-semibold">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₹{item.value.toLocaleString()}</p>
                <p className="text-xs text-gray-600">
                  {Math.round((item.value / (budget.totalBudget || 1)) * 100)}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default BudgetBreakdown;
