import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useOrders } from '../../context/OrderContext';

const MyAddressesPage = () => {
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  const { getOrders } = useOrders();
  const latestOrder = getOrders()[0];
  const address = latestOrder?.address;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen ${theme.bg} font-poppins pb-24 md:pb-8 pt-4 md:pt-8 transition-colors duration-300`}
    >
      <div className="max-w-2xl mx-auto w-full px-4 md:px-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 -ml-2 rounded-full flex items-center justify-center ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} active:scale-95 transition-transform`}
          >
            <ArrowLeft size={22} className={theme.text} />
          </button>
          <h1 className={`text-2xl font-bold flex-1 text-center ${theme.text}`}>My Addresses</h1>
          <div className="w-8" />
        </div>

        {!address ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <MapPin size={60} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
            <p className={`${theme.textSecondary} mt-4 mb-6 text-sm font-medium`}>No saved addresses</p>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-[#4A90E2] text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
            >
              Add from Checkout
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`${theme.bgCard} border ${theme.border} rounded-2xl p-5 md:p-6 shadow-sm transition-colors duration-300`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <MapPin size={22} className="text-[#4A90E2]" />
                </div>
                <div>
                  <p className={`font-bold ${theme.text}`}>Home</p>
                  <p className={`text-xs ${theme.textSecondary}`}>Saved from latest order</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                Default
              </span>
            </div>

            <div className="space-y-2">
              <p className={`font-bold ${theme.text}`}>{address.fullName}</p>
              <p className={`text-sm ${theme.textSecondary}`}>{address.phone}</p>
              <p className={`text-sm leading-relaxed ${theme.textSecondary}`}>
                {address.address}, {address.city}, {address.postalCode}
              </p>
            </div>

            <button
              onClick={() => toast.success('Address selected!')}
              className="w-full mt-6 py-3 rounded-xl border-2 border-[#4A90E2] text-[#4A90E2] font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors active:scale-95"
            >
              Use This Address
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyAddressesPage;
