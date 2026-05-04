import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass = (field) => (
    `w-full ${theme.input} ${theme.text} border rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder-gray-500 ${
      errors[field] ? 'border-red-500' : `${theme.border} focus:border-[#4A90E2]`
    }`
  );

  const validate = () => {
    const nextErrors = {
      name: form.name.trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
      password: form.password.length < 6,
      confirmPassword: form.confirmPassword !== form.password,
      terms: !acceptedTerms
    };
    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      signup(form.name, form.email, form.password);
      setLoading(false);
      toast.success('Account created!');
      navigate('/home');
    }, 600);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen ${theme.bg} font-poppins px-5 py-8 flex items-center justify-center transition-colors duration-300`}
    >
      <div className="w-full max-w-md">
        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/login')}
          className={`p-2 -ml-2 mb-6 rounded-full ${theme.text} active:scale-95 transition-transform`}
        >
          <ArrowLeft size={22} />
        </motion.button>

        <motion.div variants={itemVariants} className="mb-8">
          <h1 className={`text-3xl font-bold ${theme.text}`}>Create Account</h1>
          <p className={`text-sm mt-2 ${theme.textSecondary}`}>Join us today!</p>
        </motion.div>

        <motion.form variants={containerVariants} initial="hidden" animate="visible" onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <div className="relative">
              <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} />
              <input placeholder="Full Name" value={form.name} onChange={(event) => handleChange('name', event.target.value)} className={inputClass('name')} />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">Name must be at least 2 characters.</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative">
              <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} />
              <input type="email" placeholder="Email" value={form.email} onChange={(event) => handleChange('email', event.target.value)} className={inputClass('email')} />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">Enter a valid email address.</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative">
              <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(event) => handleChange('password', event.target.value)} className={`${inputClass('password')} pr-11`} />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters.</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative">
              <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} />
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" value={form.confirmPassword} onChange={(event) => handleChange('confirmPassword', event.target.value)} className={`${inputClass('confirmPassword')} pr-11`} />
              <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">Passwords must match.</p>}
          </motion.div>

          <motion.label variants={itemVariants} className={`flex items-start gap-3 text-sm ${theme.textSecondary}`}>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-1 accent-[#4A90E2]"
            />
            <span>
              I agree to the <span className="text-[#4A90E2] font-semibold">Terms & Privacy Policy</span>
            </span>
          </motion.label>
          {errors.terms && <p className="text-red-500 text-xs -mt-2">You must accept the terms.</p>}

          <motion.button
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A90E2] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Create Account'}
          </motion.button>
        </motion.form>

        <p className={`text-center text-sm mt-6 ${theme.textSecondary}`}>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-[#4A90E2] font-bold">
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
