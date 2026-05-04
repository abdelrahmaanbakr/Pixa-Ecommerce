import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Check, Loader2, Lock, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    // TODO: POST /api/auth/forgot-password { email }
    setError('');
    setLoading(true);
    toast.success('Reset link sent!');
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${theme.bg} font-poppins px-5 py-8 flex items-center justify-center transition-colors duration-300`}
    >
      <div className="w-full max-w-md">
        <button onClick={() => navigate('/login')} className={`p-2 -ml-2 mb-6 rounded-full ${theme.text} active:scale-95 transition-transform`}>
          <ArrowLeft size={22} />
        </button>

        {sent ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-green-500 mx-auto flex items-center justify-center mb-6"
            >
              <Check size={42} color="white" strokeWidth={3} />
            </motion.div>
            <h1 className={`text-2xl font-bold ${theme.text}`}>Check your email!</h1>
            <p className={`text-sm mt-2 mb-8 ${theme.textSecondary}`}>We sent a reset link to {email}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#4A90E2] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
            >
              Back to Login
            </button>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 mx-auto flex items-center justify-center mb-6">
                <Lock size={38} className="text-[#4A90E2]" />
              </div>
              <h1 className={`text-3xl font-bold ${theme.text}`}>Forgot Password?</h1>
              <p className={`text-sm mt-2 ${theme.textSecondary}`}>Enter your email and we'll send you a reset link</p>
            </div>

            <div className="relative">
              <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="johndoe@example.com"
                className={`w-full ${theme.input} ${theme.text} border rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder-gray-500 ${error ? 'border-red-500' : `${theme.border} focus:border-[#4A90E2]`}`}
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full mt-5 bg-[#4A90E2] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Send Reset Link'}
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
