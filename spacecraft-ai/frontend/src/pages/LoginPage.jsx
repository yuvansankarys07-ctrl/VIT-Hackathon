import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USERS_STORAGE_KEY = 'spacecraft_users';
const AUTH_USER_KEY = 'spacecraft_logged_in_user';

const getSavedUsers = () => {
  try {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return rawUsers ? JSON.parse(rawUsers) : [];
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetForm = () => {
    setUserId('');
    setPassword('');
    setUsername('');
    setEmail('');
    setConfirmPassword('');
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem(AUTH_USER_KEY);
    if (loggedInUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === 'signup') {
      if (!username || !email || !password || !confirmPassword) {
        alert('Please fill all signup fields.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      const users = getSavedUsers();
      const userExists = users.some(
        (user) => user.username.toLowerCase() === username.toLowerCase() || user.email.toLowerCase() === email.toLowerCase(),
      );

      if (userExists) {
        alert('User already exists. Please login.');
        return;
      }

      users.push({ username, email, password });
      saveUsers(users);
      alert('Signup successful! Please login with your User ID and password.');
      resetForm();
      setMode('login');
      return;
    }

    if (!userId || !password) {
      alert('Please enter User ID and password.');
      return;
    }

    const users = getSavedUsers();
    const matchedUser = users.find(
      (user) =>
        (user.username.toLowerCase() === userId.toLowerCase() || user.email.toLowerCase() === userId.toLowerCase())
        && user.password === password,
    );

    if (!matchedUser) {
      alert('Invalid User ID or password.');
      return;
    }

    localStorage.setItem(
      AUTH_USER_KEY,
      JSON.stringify({
        username: matchedUser.username,
        email: matchedUser.email,
      }),
    );

    alert('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-white">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-7">
        <h1 className="text-2xl font-bold text-center text-[#222] mb-6">{mode === 'login' ? 'Login Form' : 'Signup Form'}</h1>

        <div className="grid grid-cols-2 gap-2 bg-[#f1f5f9] rounded-lg p-1 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              resetForm();
            }}
            className={`rounded-md py-2 text-sm font-semibold transition-all ${
              mode === 'login'
                ? 'text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6]'
                : 'text-gray-700 bg-transparent'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              resetForm();
            }}
            className={`rounded-md py-2 text-sm font-semibold transition-all ${
              mode === 'signup'
                ? 'text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6]'
                : 'text-gray-700 bg-transparent'
            }`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 outline-none transition-all focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 outline-none transition-all focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </>
          )}

          {mode === 'login' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userId">
                User ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter username or email"
                className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 outline-none transition-all focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-100"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 outline-none transition-all focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-100"
            />
            {mode === 'login' && (
              <p className="text-right mt-2">
                <a href="#" className="text-sm text-[#3b82f6] hover:underline">
                  Forgot password?
                </a>
              </p>
            )}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 outline-none transition-all focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-100"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg py-2.5 text-white font-semibold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] transition-transform duration-200 hover:scale-[1.02] hover:from-[#1d4ed8] hover:to-[#2563eb]"
          >
            {mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        {mode === 'login' ? (
          <p className="text-center text-sm text-gray-600 mt-5">
            Not a member?{' '}
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                resetForm();
              }}
              className="text-[#3b82f6] font-semibold hover:underline"
            >
              Signup now
            </button>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setMode('login');
                resetForm();
              }}
              className="text-[#3b82f6] font-semibold hover:underline"
            >
              Login now
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
