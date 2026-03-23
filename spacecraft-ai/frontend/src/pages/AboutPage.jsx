import React from 'react';
import { motion } from 'framer-motion';

function AboutPage() {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="section-container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 text-gradient">
            About SpaceCraft AI
          </h1>
          <p className="text-xl text-gray-600">
            The future of affordable, intelligent interior design
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-soft p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            SpaceCraft AI empowers students, renters, and homeowners to visualize and create beautiful, functional interior spaces within their budget. We believe that great design should be accessible to everyone, regardless of their financial constraints or design expertise.
          </p>
        </motion.div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-soft p-8"
          >
            <h3 className="text-2xl font-bold mb-4">The Problem</h3>
            <ul className="space-y-3 text-gray-700">
              <li>❌ Most design tools ignore budget constraints</li>
              <li>❌ No practical guidance for small spaces</li>
              <li>❌ Limited customization options</li>
              <li>❌ Expensive interior designers out of reach</li>
              <li>❌ No space optimization analysis</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-soft p-8 bg-gradient-to-br from-purple-50 to-blue-50"
          >
            <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
            <ul className="space-y-3 text-gray-700">
              <li>✅ Budget-aware AI recommendations</li>
              <li>✅ Space optimization analysis</li>
              <li>✅ Full customization controls</li>
              <li>✅ Affordable & free to use</li>
              <li>✅ Practical design warnings & tips</li>
            </ul>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-soft p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'AI-Powered Analysis',
                desc: 'Smart room analysis using advanced algorithms'
              },
              {
                title: 'Budget Intelligence',
                desc: 'Budget-aware furniture and decor recommendations'
              },
              {
                title: 'Space Optimization',
                desc: 'Detailed walkability, storage, and openness scores'
              },
              {
                title: 'Style Variety',
                desc: 'Support for 7+ design styles to match preferences'
              },
              {
                title: 'Before & After',
                desc: 'Visual comparison of original and redesigned spaces'
              },
              {
                title: 'Full Customization',
                desc: 'Modify colors, furniture, and layout freely'
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-purple-600">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Target Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-soft p-8 bg-gradient-to-r from-indigo-50 to-purple-50 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Who We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '👨‍🎓', name: 'Students', desc: 'Budget-friendly dorm & hostel room makeovers' },
              { icon: '🏠', name: 'Renters', desc: 'Rental-safe decor that doesn\'t damage walls' },
              { icon: '🏡', name: 'Homeowners', desc: 'Complete room redesigns on any budget' }
            ].map((user, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-3">{user.icon}</div>
                <h4 className="text-lg font-bold mb-2">{user.name}</h4>
                <p className="text-gray-600">{user.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-soft p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Built With Modern Tech</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'React',
              'Node.js',
              'Tailwind CSS',
              'Vite',
              'Express',
              'Zustand',
              'AI Engine',
              'REST API'
            ].map((tech, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-lg p-4 text-center font-semibold"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <a href="/design" className="btn-primary inline-block">
            Start Designing Now →
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutPage;
