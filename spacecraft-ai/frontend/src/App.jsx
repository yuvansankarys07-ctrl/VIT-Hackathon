import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import DesignPage from './pages/DesignPage';
import ResultsPage from './pages/ResultsPage';
import SavedPage from './pages/SavedPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const AUTH_USER_KEY = 'spacecraft_logged_in_user';

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem(AUTH_USER_KEY));
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function HomeRedirect() {
  const isAuthenticated = Boolean(localStorage.getItem(AUTH_USER_KEY));
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    // Check API connection on mount
    const checkAPI = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/health');
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
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {!isLoginPage && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={(
                <ProtectedRoute>
                  <DesignPage />
                </ProtectedRoute>
              )}
            />
            <Route path="/design" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/results"
              element={(
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/saved"
              element={(
                <ProtectedRoute>
                  <SavedPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/about"
              element={(
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/profile"
              element={(
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>
        {!isLoginPage && <Footer />}
      </div>
      <Toaster position="top-right" />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
