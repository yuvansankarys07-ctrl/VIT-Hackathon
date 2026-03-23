import React from 'react';
import { motion } from 'framer-motion';

function HeroSection({ onGetStarted }) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 text-white">
      <div className="section-container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white bg-opacity-20 px-4 py-2 rounded-full mb-6 backdrop-blur"
            >
              <span className="text-sm font-semibold">✨ AI-Powered Interior Design</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Redesign Your Room With AI
            </h1>

            <p className="text-xl text-white text-opacity-90 mb-8 max-w-xl leading-relaxed">
              Budget-aware interior visualization that helps you transform any space into your dream room.
              Perfect for students, renters, and homeowners.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onGetStarted}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition transform hover:scale-105"
              >
                Try Design Now →
              </button>
              <a
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:bg-opacity-10 transition"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-9xl opacity-80"
            >
              🏠
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
