import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/design', label: 'Design' },
    { path: '/saved', label: 'Saved' },
    { path: '/about', label: 'About' }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white bg-opacity-95 backdrop-blur-md border-b border-gray-200">
      <div className="section-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="text-3xl">🚀</div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">SpaceCraft AI</h1>
              <p className="text-xs text-gray-600 leading-none">Interior Design</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-lg font-semibold transition-all relative ${
                  isActive(path)
                    ? 'text-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {label}
                {isActive(path) && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/design" className="btn-primary text-sm">
            Start Design
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
