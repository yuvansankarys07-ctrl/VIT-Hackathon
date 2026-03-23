import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/landing/HeroSection';
import FeatureCard from '../components/landing/FeatureCard';
import StatsSection from '../components/landing/StatsSection';
import CTASection from '../components/landing/CTASection';

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '📸',
      title: 'Upload Room Photo',
      description: 'Share your room image and let our AI analyze the space'
    },
    {
      icon: '🎨',
      title: 'Choose Your Style',
      description: 'Pick from modern, minimal, boho, scandinavian, and more'
    },
    {
      icon: '💰',
      title: 'Set Your Budget',
      description: 'Get recommendations tailored to your budget constraints'
    },
    {
      icon: '🤖',
      title: 'AI Redesign',
      description: 'Receive intelligent interior design suggestions and previews'
    },
    {
      icon: '🎯',
      title: 'Customize Everything',
      description: 'Modify colors, furniture, and layout to match your vision'
    },
    {
      icon: '📊',
      title: 'Compare & Analyze',
      description: 'See before/after views and detailed space analysis'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection onGetStarted={() => navigate('/design')} />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              How SpaceCraft AI Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your room with AI-powered interior design that respects your budget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                What Makes Us Different
              </h3>
              <ul className="space-y-4">
                {[
                  'Budget-aware furniture recommendations',
                  'Space optimization analysis and warnings',
                  'Before & after visual comparison',
                  'Customization controls for total flexibility',
                  'Perfect for students, renters, and homeowners',
                  'AI-generated room redesign previews'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold text-xl mt-1">✓</span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/design')}
                className="btn-primary mt-8"
              >
                Start Designing Now
              </button>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 text-white text-center"
            >
              <div className="text-6xl mb-4">🎨</div>
              <h4 className="text-2xl font-bold mb-3">Smart Recommendations</h4>
              <p className="text-purple-100">
                Our AI engine considers room size, budget, style preferences, and practical constraints to generate the perfect interior design
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

export default LandingPage;
