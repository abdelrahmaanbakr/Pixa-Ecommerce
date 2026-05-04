import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import logo from "../../assets/images/Logo.png"
import onBoardingImage from "../../assets/images/on_boarding_image.png";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const SplashPage = () => {
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`min-h-screen ${theme.bg} font-poppins flex flex-col md:flex-row transition-colors duration-300`}
    >
      
      {/* Image Area */}
      <div className={`flex-1 flex flex-col justify-center items-center p-6 md:p-12 ${isDark ? 'bg-[#1A1A2E]' : 'md:bg-blue-50'} relative transition-colors duration-300`}>
        {/* 1. Logo at top left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-8 left-6 md:left-12"
        >
         <img src={logo} alt="logo" className="h-8 md:h-12 w-auto object-contain" />
        </motion.div>

        {/* 2. Big hero image in center */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          src={onBoardingImage} 
          alt="onboarding" 
          className="w-full max-w-[300px] md:max-w-md h-auto object-cover rounded-3xl shadow-sm mt-16 md:mt-0"
        />
      </div>

      {/* 3, 4, 5. Text and Button Area */}
      <div className={`flex-1 px-6 pb-10 w-full text-center md:text-left flex flex-col justify-center md:px-16 lg:px-24 ${theme.bg} transition-colors duration-300`}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`text-3xl md:text-5xl lg:text-6xl font-bold ${theme.text} leading-tight mb-4 md:mb-6`}
        >
          Find Your Dream Product Here
        </motion.h1>
        <p className={`text-base md:text-lg lg:text-xl ${theme.textSecondary} mb-8 md:mb-12`}>
          Shop anything easily
        </p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate(isAuthenticated ? '/home' : '/login')}
          className="w-full md:w-auto md:px-16 md:self-start bg-[#4A90E2] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-[0_4px_15px_rgba(74,144,226,0.3)] active:scale-95"
        >
          Shop Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SplashPage;
