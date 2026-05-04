import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

const PaymentSuccess = ({ orderNumber, total, paymentMethod, items }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { theme } = useTheme();

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#4A90E2', '#ffffff', '#10B981']
    });
  }, []);

  const handleBackHome = () => {
    clearCart();
    navigate('/home');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center px-4 py-8 md:py-12"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6"
      >
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <motion.path
            d="M14 27L23 36L39 18"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <h1 className={`text-2xl md:text-3xl font-bold text-center ${theme.text}`}>
        Payment Successful!
      </h1>
      <p className={`text-sm mt-2 text-center ${theme.textSecondary}`}>
        Your order has been placed
      </p>

      <div className={`w-full max-w-md mt-6 p-5 rounded-2xl ${theme.bgCard} border ${theme.border} shadow-sm`}>
        <div className="grid grid-cols-2 gap-4 text-sm mb-5">
          <div>
            <p className={theme.textSecondary}>Order Number</p>
            <p className={`font-bold mt-1 ${theme.text}`}>{orderNumber}</p>
          </div>
          <div>
            <p className={theme.textSecondary}>Estimated Delivery</p>
            <p className={`font-bold mt-1 ${theme.text}`}>3-5 Business Days</p>
          </div>
        </div>

        <div className={`border-t ${theme.border} pt-4`}>
          <h2 className={`font-bold mb-3 ${theme.text}`}>Order Summary</h2>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold line-clamp-1 ${theme.text}`}>{item.name}</p>
                  <p className={`text-xs ${theme.textSecondary}`}>Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-[#4A90E2]">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className={`mt-4 pt-4 border-t ${theme.border} space-y-2`}>
            <div className="flex justify-between text-sm">
              <span className={theme.textSecondary}>Payment Method</span>
              <span className={`font-semibold ${theme.text}`}>{paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`font-bold ${theme.text}`}>Total Paid</span>
              <span className="font-black text-lg text-[#4A90E2]">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        <button
          onClick={() => toast.success('Coming Soon!')}
          className={`w-full py-3 rounded-xl font-bold border-2 border-[#4A90E2] text-[#4A90E2] transition-all active:scale-95 ${theme.bgCard}`}
        >
          Track My Order
        </button>
        <button
          onClick={handleBackHome}
          className="w-full py-3 rounded-xl font-bold bg-[#4A90E2] text-white shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
