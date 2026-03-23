import React from 'react';
import { useNavigate } from 'react-router-dom';

const AUTH_USER_KEY = 'spacecraft_logged_in_user';
const PROJECTS_STORAGE_KEY = 'spacecraft-projects';

function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || '{}');
  const savedDesigns = JSON.parse(localStorage.getItem(PROJECTS_STORAGE_KEY) || '[]');

  const handleLogout = () => {
    localStorage.removeItem(AUTH_USER_KEY);
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600 mb-8">Your account details</p>

        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-500">Username</p>
            <p className="text-lg font-semibold text-slate-900">{user.username || 'Not available'}</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-500">Email</p>
            <p className="text-lg font-semibold text-slate-900">{user.email || 'Not available'}</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-500">Saved Designs</p>
            <p className="text-lg font-semibold text-slate-900">{savedDesigns.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate('/saved')}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Saved Designs
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] transition"
          >
            Design
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
