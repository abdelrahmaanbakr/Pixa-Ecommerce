import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { Pencil, Package, MapPin, CreditCard, Bell, Globe, Lock, Sun, Moon, LogOut, ChevronRight } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const ProfilePage = () => {
  const { isDark, theme, toggleTheme } = useTheme();
  const { getOrders } = useOrders();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const ordersCount = getOrders().length;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const MenuItem = ({ icon, label, rightContent, onClick, customBorderColor }) => (
    <button 
      onClick={onClick || (() => toast.success('Coming Soon!'))}
      className={`w-full flex items-center justify-between p-4 mb-3 ${theme.menuItem} rounded-2xl active:scale-[0.98] transition-all duration-300`}
    >
      <div className="flex items-center gap-4">
        <span className={`text-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'} p-2 rounded-lg leading-none flex items-center justify-center shadow-sm`}>
          {icon}
        </span>
        <span className={`font-bold text-sm ${theme.text}`}>{label}</span>
      </div>
      <div className={`text-sm font-semibold ${theme.textSecondary}`}>
        {rightContent || <ChevronRight size={18} />}
      </div>
    </button>
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`flex-1 p-5 ${theme.bg} min-h-screen pb-24 md:pb-8 font-poppins relative transition-colors duration-300`}
    >
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <h1 className={`text-2xl font-bold text-center mb-8 ${theme.text}`}>Profile</h1>

        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative mb-4">
            <img 
              src={user?.avatar || "https://picsum.photos/seed/avatar/100/100"} 
              alt="User Avatar" 
              className="w-[100px] h-[100px] rounded-full object-cover border-4 border-[#4A90E2] shadow-lg"
            />
            <button className={`absolute bottom-0 right-0 w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center shadow-md text-sm border-2 ${isDark ? 'border-[#0D0D0D]' : 'border-white'} active:scale-95 transition-transform`}>
              <Pencil size={16} />
            </button>
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${theme.text}`}>{user?.name || 'User'}</h2>
          <p className={`${theme.textSecondary} text-sm mt-1 font-medium`}>{user?.email || 'user@example.com'}</p>
        </div>

        {/* General Section */}
        <div className={`mb-8 p-6 rounded-2xl ${theme.bgCard} shadow-sm border ${theme.border} transition-colors duration-300`}>
          <h3 className={`text-sm font-bold mb-4 uppercase tracking-wider ${theme.textSecondary}`}>General</h3>
          <MenuItem
            icon={<Package size={20} className={theme.text} />}
            label="My Orders"
            rightContent={
              <span className="min-w-[24px] h-6 px-2 rounded-full bg-[#4A90E2] text-white text-xs font-bold flex items-center justify-center">
                {ordersCount}
              </span>
            }
            onClick={() => navigate('/my-orders')}
          />
          <MenuItem icon={<MapPin size={20} className={theme.text} />} label="My Addresses" onClick={() => navigate('/my-addresses')} />
          <MenuItem icon={<CreditCard size={20} className={theme.text} />} label="Payment Methods" onClick={() => navigate('/payment-methods')} />
        </div>

        {/* Settings Section */}
        <div className={`mb-8 p-6 rounded-2xl ${theme.bgCard} shadow-sm border ${theme.border} transition-colors duration-300`}>
          <h3 className={`text-sm font-bold mb-4 uppercase tracking-wider ${theme.textSecondary}`}>Settings</h3>
          <MenuItem icon={<Bell size={20} className={theme.text} />} label="Notifications" />
          <MenuItem icon={<Globe size={20} className={theme.text} />} label="Language" rightContent="English" />
          <MenuItem icon={<Lock size={20} className={theme.text} />} label="Privacy Policy" />
          <MenuItem 
            icon={isDark ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} className="text-yellow-500" />}
            label="Change Mode" 
            rightContent={
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {isDark ? 'Dark' : 'Light'}
                </span>
                <div
                  className={`w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 relative ${isDark ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isDark ? 'left-7' : 'left-1'}`} />
                </div>
              </div>
            } 
            onClick={toggleTheme} 
          />
        </div>

        {/* Logout */}
        <div className="mb-4">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-3 p-4 ${isDark ? 'bg-red-900/10 border-red-900/30' : 'bg-red-50 border-red-200'} border rounded-2xl active:scale-[0.98] transition-all duration-300 shadow-sm`}
          >
            <LogOut size={20} className="text-red-500" />
            <span className="text-red-500 font-bold text-sm">Logout</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
