import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

const NotFoundPage = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen ${theme.bg} font-poppins flex items-center justify-center px-5 transition-colors duration-300`}
    >
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <motion.div variants={itemVariants}>
          <motion.h1
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-bold text-8xl text-[#4A90E2] leading-none"
          >
            404
          </motion.h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ShoppingCart size={80} className="text-gray-400" />
          </motion.div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className={`mt-8 font-bold text-2xl ${theme.text}`}
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className={`mt-3 text-sm ${theme.textSecondary}`}
        >
          The page you're looking for doesn't exist
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 w-full flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            className="w-full max-w-xs bg-[#4A90E2] text-white font-bold py-3.5 rounded-full shadow-md shadow-blue-500/30 hover:bg-blue-600 transition-colors"
          >
            Go Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full max-w-xs border-2 border-[#4A90E2] text-[#4A90E2] font-bold py-3.5 rounded-full hover:bg-blue-50 dark:hover:bg-[#4A90E2]/10 transition-colors"
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default NotFoundPage
