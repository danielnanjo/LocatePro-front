import { useState } from 'react';
import { api, setAuth } from '../lib/api.js';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAuth(data.token);
      nav('/admin');
    } catch (e) {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="admin-login-page relative min-h-screen font-sans bg-gray-50 text-gray-800 overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-80" aria-hidden="true">
        <div id="particle-container" className="absolute inset-0"></div>
      </div>
      <Nav />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card bg-white/70 backdrop-blur-md max-w-md mx-auto p-8 shadow-xl"
        >
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://i.pinimg.com/736x/8d/f3/f1/8df3f1a3f1b4c6e91f1b62f5f1c9c8e9.jpg"
              alt="Admin"
              className="h-24 w-24 mb-4 drop-shadow-lg"
            />
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Admin Login</h2>
            <p className="text-gray-600 text-sm text-center">
              Please enter your credentials to access the admin dashboard.
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="text-red-600 text-center mt-3">{error}</p>}
            <button
              type="submit"
              className="btn w-full px-5 py-3 text-lg"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}