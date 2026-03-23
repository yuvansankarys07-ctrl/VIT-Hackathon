import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import RedesignPage from './pages/RedesignPage';
import ResultsPage from './pages/ResultsPage';
import SavedPage from './pages/SavedPage';
import AboutPage from './pages/AboutPage';

function App() {
  useEffect(() => {
    // Check API connection on mount
    const checkAPI = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        if (!response.ok) {
          console.warn('Backend API may not be running');
        }
      } catch (error) {
        console.warn('Backend API not available. Using mock data.');
      }
    };
    checkAPI();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/design" element={<RedesignPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
