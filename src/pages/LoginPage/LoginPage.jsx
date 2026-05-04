import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/Logo.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const inputClass = (field) => (
    `w-full ${theme.input} ${theme.text} border rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder-gray-500 ${
      errors[field] ? 'border-red-500' : `${theme.border} focus:border-[#4A90E2]`
    }`
  );

  const validate = () => {
    const nextErrors = {
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: password.length < 6
    };
    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      toast.error('Invalid credentials!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        navigate('/home');
      } else {
        toast.error('Invalid credentials!');
      }
    }, 600);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen ${theme.bg} font-poppins px-5 py-8 flex items-center justify-center transition-colors duration-300`}
    >
      <motion.div variants={itemVariants} className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-12 w-auto mx-auto mb-6 object-contain" />
          <h1 className={`text-3xl font-bold ${theme.text}`}>Welcome Back!</h1>
          <p className={`text-sm mt-2 ${theme.textSecondary}`}>Sign in to continue</p>
        </div>

        <motion.form variants={containerVariants} initial="hidden" animate="visible" onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-bold mb-2 ${theme.text}`}>Email</label>
            <div className="relative">
              <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="johndoe@example.com"
                className={inputClass('email')}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">Enter a valid email address.</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-bold mb-2 ${theme.text}`}>Password</label>
            <div className="relative">
              <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className={`${inputClass('password')} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters.</p>}
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="block ml-auto text-sm font-semibold text-[#4A90E2]"
          >
            Forgot Password?
          </motion.button>

          <motion.button
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A90E2] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
          </motion.button>
        </motion.form>

        <div className={`flex items-center gap-3 my-6 text-xs ${theme.textSecondary}`}>
          <div className={`flex-1 border-t ${theme.border}`} />
          <span>or continue with</span>
          <div className={`flex-1 border-t ${theme.border}`} />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => toast.success('Google login coming soon!')}
          className={`w-full ${theme.bgCard} ${theme.text} border ${theme.border} rounded-xl py-3 font-bold flex items-center justify-center gap-3 transition-colors`}
        >
          <span className="text-lg font-black text-[#4285F4]">G</span>
          Continue with Google
        </motion.button>

        <p className={`text-center text-sm mt-6 ${theme.textSecondary}`}>
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-[#4A90E2] font-bold">
            Sign Up
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
