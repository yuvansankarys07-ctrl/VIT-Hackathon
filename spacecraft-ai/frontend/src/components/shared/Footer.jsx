import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SpaceCraft AI</h3>
            <p className="text-sm leading-relaxed">
              AI-powered interior design visualization for students, renters, and homeowners.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/design" className="hover:text-white transition">Design Tool</a></li>
              <li><a href="/about" className="hover:text-white transition">About</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-bold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Budget Planner</a></li>
              <li><a href="#" className="hover:text-white transition">Space Analysis</a></li>
              <li><a href="#" className="hover:text-white transition">AI Recommendations</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {currentYear} SpaceCraft AI. All rights reserved. Built for the VIT Hackathon.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
