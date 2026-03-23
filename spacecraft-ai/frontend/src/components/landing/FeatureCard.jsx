import React from 'react';
import { motion } from 'framer-motion';

function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="card-soft p-8 rounded-2xl text-center"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;
