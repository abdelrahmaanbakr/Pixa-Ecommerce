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
  const mobileBg = isDark
    ? 'bg-[radial-gradient(circle_at_50%_0%,#242447_0%,#16162B_42%,#101020_100%)]'
    : 'bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,#F4F8FF_52%,#EAF3FF_100%)]';
  const desktopBg = isDark
    ? 'md:bg-[radial-gradient(circle_at_20%_18%,#1E2447_0%,#111122_42%,#0D0D0D_100%)]'
    : 'md:bg-[radial-gradient(circle_at_16%_20%,#FFFFFF_0%,#F7FBFF_54%,#FFFFFF_100%)]';
  const visualBg = isDark
    ? 'md:bg-[radial-gradient(circle_at_58%_36%,#2B315B_0%,#17172D_50%,#10101F_100%)]'
    : 'md:bg-[radial-gradient(circle_at_58%_36%,#FFFFFF_0%,#EEF6FF_55%,#E3F0FF_100%)]';

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`min-h-screen ${mobileBg} ${desktopBg} font-poppins flex flex-col md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] transition-colors duration-300 relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-0 before:opacity-[0.035] before:bg-[linear-gradient(90deg,rgba(255,255,255,0.95)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.95)_1px,transparent_1px)] before:bg-[length:4px_4px]`}
    >
      
      {/* Image Area */}
      <div className={`flex-none md:order-2 flex flex-col justify-end md:justify-center items-center px-6 pt-9 pb-2 md:min-h-screen md:p-12 lg:p-16 ${visualBg} relative z-10 overflow-hidden transition-colors duration-300 after:pointer-events-none after:absolute after:inset-0 after:opacity-[0.04] after:bg-[radial-gradient(circle,rgba(255,255,255,0.95)_1px,transparent_1px)] after:bg-[length:12px_12px]`}>
        {/* 1. Logo on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-9 md:hidden"
        >
         <img src={logo} alt="logo" className="h-10 md:h-12 w-auto object-contain" />
        </motion.div>

        {/* 2. Big hero image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0]
          }}
          transition={{
            opacity: { delay: 0.4, duration: 0.5 },
            scale: { delay: 0.4, duration: 0.5 },
            y: {
              delay: 0.9,
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          src={onBoardingImage} 
          alt="onboarding" 
          className="relative z-10 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[520px] lg:max-w-[620px] h-auto object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.18)] md:drop-shadow-[0_28px_55px_rgba(0,0,0,0.22)]"
        />
      </div>

      {/* 3, 4, 5. Text and Button Area */}
      <div className={`flex-1 md:order-1 px-6 pt-5 pb-10 w-full text-center md:text-left flex flex-col justify-start md:justify-center md:min-h-screen md:px-12 lg:px-20 xl:px-24 ${desktopBg} relative z-10 transition-colors duration-300`}>
        <motion.img
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          src={logo}
          alt="logo"
          className="hidden md:block h-12 w-auto object-contain mb-20 self-start"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`text-[30px] md:text-[56px] lg:text-[64px] font-bold ${theme.text} leading-[1.06] mb-4 md:mb-6 max-w-[680px]`}
        >
          Find Your Dream Product Here
        </motion.h1>
        <p className={`text-base md:text-lg lg:text-xl ${theme.textSecondary} mb-8 md:mb-12 max-w-[440px] md:leading-8`}>
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
