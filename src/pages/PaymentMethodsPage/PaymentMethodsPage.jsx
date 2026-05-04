import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Building2, Smartphone, Banknote } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useOrders } from '../../context/OrderContext';

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  const { getOrders } = useOrders();
  const latestOrder = getOrders()[0];
  const paymentMethod = latestOrder?.paymentMethod;
  const accountNumber = useMemo(
    () => Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    []
  );

  const renderPaymentCard = () => {
    if (!latestOrder) return null;

    if (paymentMethod === 'credit-card') {
      return (
        <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg min-h-[220px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard size={28} />
              <span className="font-bold">Credit Card</span>
            </div>
            <span className="text-sm font-semibold">VISA</span>
          </div>
          <p className="text-2xl font-bold tracking-widest">**** **** **** 1234</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-white/70">CARDHOLDER</p>
              <p className="font-bold">{latestOrder.address.fullName}</p>
            </div>
            <div>
              <p className="text-xs text-white/70">VALID THRU</p>
              <p className="font-bold">12/26</p>
            </div>
          </div>
        </div>
      );
    }

    if (paymentMethod === 'bank-transfer') {
      return (
        <div className={`${theme.bgCard} border ${theme.border} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center gap-3 mb-5">
            <Building2 size={28} className="text-[#4A90E2]" />
            <div>
              <p className={`font-bold ${theme.text}`}>Bank Transfer</p>
              <p className={`text-sm ${theme.textSecondary}`}>Virtual Account</p>
            </div>
          </div>
          <p className={`text-xs ${theme.textSecondary}`}>Account Number</p>
          <p className={`text-2xl font-black tracking-wider mt-1 ${theme.text}`}>{accountNumber}</p>
        </div>
      );
    }

    if (paymentMethod === 'e-wallet') {
      return (
        <div className={`${theme.bgCard} border ${theme.border} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center gap-3 mb-5">
            <Smartphone size={28} className="text-[#4A90E2]" />
            <div>
              <p className={`font-bold ${theme.text}`}>E-Wallet</p>
              <p className={`text-sm ${theme.textSecondary}`}>GoPay / OVO</p>
            </div>
          </div>
          <p className={`text-xs ${theme.textSecondary}`}>Phone Number</p>
          <p className={`text-xl font-black mt-1 ${theme.text}`}>{latestOrder.address.phone}</p>
        </div>
      );
    }

    return (
      <div className={`${theme.bgCard} border ${theme.border} rounded-2xl p-6 shadow-sm`}>
        <div className="flex items-center gap-3">
          <Banknote size={28} className="text-[#4A90E2]" />
          <div>
            <p className={`font-bold ${theme.text}`}>Cash on Delivery</p>
            <p className={`text-sm ${theme.textSecondary}`}>Pay when delivered</p>
          </div>
        </div>
      </div>
    );
  };

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
          <h1 className={`text-2xl font-bold flex-1 text-center ${theme.text}`}>Payment Methods</h1>
          <div className="w-8" />
        </div>

        {!latestOrder ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <CreditCard size={60} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
            <p className={`${theme.textSecondary} mt-4 mb-6 text-sm font-medium`}>No payment methods saved</p>
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
          >
            {renderPaymentCard()}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentMethodsPage;
