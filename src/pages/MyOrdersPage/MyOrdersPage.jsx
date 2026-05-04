import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Package, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useOrders } from '../../context/OrderContext';
import { formatPrice } from '../../utils/formatPrice';

const paymentLabels = {
  'credit-card': 'Credit Card',
  'bank-transfer': 'Bank Transfer',
  'e-wallet': 'E-Wallet',
  cod: 'Cash on Delivery'
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  const { getOrders } = useOrders();
  const orders = getOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen ${theme.bg} font-poppins pb-24 md:pb-8 pt-4 md:pt-8 transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto w-full px-4 md:px-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 -ml-2 rounded-full flex items-center justify-center ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} active:scale-95 transition-transform`}
          >
            <ArrowLeft size={22} className={theme.text} />
          </button>
          <h1 className={`text-2xl font-bold flex-1 text-center ${theme.text}`}>My Orders</h1>
          <div className="w-8" />
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Package size={60} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
            <p className={`${theme.textSecondary} mt-4 mb-6 text-sm font-medium`}>No orders yet</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-[#4A90E2] text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {orders.map((order) => {
              const firstItem = order.items[0];
              const moreCount = order.items.length - 1;

              return (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  className={`${theme.bgCard} border ${theme.border} rounded-2xl p-4 md:p-5 shadow-sm transition-colors duration-300`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className={`font-bold ${theme.text}`}>{order.id}</p>
                      <p className={`text-xs mt-1 ${theme.textSecondary}`}>{order.date}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={firstItem.image}
                      alt={firstItem.name}
                      className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm line-clamp-1 ${theme.text}`}>{firstItem.name}</p>
                      {moreCount > 0 && (
                        <p className={`text-xs mt-1 ${theme.textSecondary}`}>and {moreCount} more</p>
                      )}
                    </div>
                    <p className="font-black text-[#4A90E2]">{formatPrice(order.total)}</p>
                  </div>

                  <div className={`border-t ${theme.border} mt-4 pt-4`}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="w-full md:w-auto px-5 py-2.5 rounded-xl border-2 border-[#4A90E2] text-[#4A90E2] font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors active:scale-95"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/40 flex items-end md:items-center justify-center px-0 md:px-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              onClick={(event) => event.stopPropagation()}
              className={`${theme.bgCard} border ${theme.border} w-full md:max-w-xl max-h-[88vh] overflow-y-auto rounded-t-3xl md:rounded-2xl p-5 shadow-xl`}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className={`font-bold text-lg ${theme.text}`}>{selectedOrder.id}</p>
                  <p className={`text-xs mt-1 ${theme.textSecondary}`}>{selectedOrder.date}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className={`p-2 rounded-full ${theme.menuItem} active:scale-95 transition-transform`}
                >
                  <X size={18} className={theme.text} />
                </button>
              </div>

              <span className="inline-flex px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold mb-5">
                {selectedOrder.status}
              </span>

              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold line-clamp-1 ${theme.text}`}>{item.name}</p>
                      <p className={`text-xs mt-1 ${theme.textSecondary}`}>Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#4A90E2]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className={`border-t ${theme.border} mt-5 pt-5 space-y-4`}>
                <div>
                  <p className={`font-bold text-sm mb-2 ${theme.text}`}>Shipping Address</p>
                  <p className={`text-sm leading-relaxed ${theme.textSecondary}`}>
                    {selectedOrder.address.fullName}<br />
                    {selectedOrder.address.phone}<br />
                    {selectedOrder.address.address}, {selectedOrder.address.city}, {selectedOrder.address.postalCode}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme.textSecondary}>Payment Method</span>
                  <span className={`font-bold ${theme.text}`}>
                    {paymentLabels[selectedOrder.paymentMethod] || selectedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${theme.text}`}>Total Paid</span>
                  <span className="font-black text-lg text-[#4A90E2]">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MyOrdersPage;
