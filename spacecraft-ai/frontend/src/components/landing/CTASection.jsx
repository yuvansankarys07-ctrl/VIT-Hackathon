import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="section-container text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-opacity-90 text-white mb-8 max-w-2xl mx-auto">
            Join thousands of people creating beautiful, budget-friendly interior designs with SpaceCraft AI
          </p>
          <button
            onClick={() => navigate('/design')}
            className="bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition transform hover:scale-105"
          >
            Start Your Design →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
