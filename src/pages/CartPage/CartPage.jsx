import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const CartPage = () => {
  const { isDark, theme } = useTheme();
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast.error('Item Removed!');
  };

  const formatPrice = (price) => `Rp ${price.toLocaleString('id-ID')}`;

  if (cart.length === 0) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`flex-1 flex flex-col items-center justify-center p-4 ${theme.bg} min-h-screen font-poppins transition-colors duration-300`}
      >
        <ShoppingCart size={60} className={`${isDark ? 'text-gray-600' : 'text-gray-300'} mb-4`} />
        <p className={`${theme.textSecondary} mb-6 text-sm font-medium`}>Your cart is empty</p>
        <button 
          onClick={() => navigate('/home')}
          className="bg-[#4A90E2] text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
        >
          Start Shopping
        </button>
      </motion.div>
    );
  }

  const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15000;
  const total = subTotal + shipping;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`min-h-screen ${theme.bg} font-poppins pb-32 md:pb-10 pt-4 md:pt-8 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-16 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button onClick={() => navigate(-1)} className={`p-2 -ml-2 rounded-full flex items-center justify-center ${isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-black'} active:scale-95 transition-transform md:hidden`}>
            <ArrowLeft size={22} className={theme.text} />
          </button>
          <h1 className={`text-2xl font-bold flex-1 text-center md:text-left ${theme.text}`}>Shopping Cart</h1>
          <div className="w-8 md:hidden"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
          {/* Main Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className={`flex items-center p-3 md:p-4 rounded-xl ${theme.bgCard} shadow-sm ${theme.border} hover:shadow-md transition-all duration-300 border`}>
                <img src={item.image} alt={item.name} className={`w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />
                <div className="ml-4 flex-1">
                  <h3 className={`font-bold text-[13px] md:text-sm line-clamp-2 ${theme.text}`}>{item.name}</h3>
                  <p className="text-[#4A90E2] font-semibold text-sm md:text-[15px] mb-2">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-md transition-colors ${theme.menuItem} ${theme.text}`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className={`text-sm md:text-[15px] font-medium w-4 text-center ${theme.text}`}>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-md transition-colors ${theme.menuItem} ${theme.text}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className={`p-2 ml-2 hover:scale-110 transition-transform ${isDark ? 'md:hover:bg-red-900/30' : 'md:hover:bg-red-50'} md:rounded-full`}
                >
                  <Trash2 size={20} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full md:w-[320px] lg:w-[380px] flex-shrink-0">
            <div className={`p-5 md:p-6 rounded-2xl ${theme.bgCard} shadow-sm border ${theme.border} md:sticky md:top-24 transition-colors duration-300`}>
              <h2 className={`text-lg font-bold mb-4 md:mb-6 ${theme.text}`}>Order Summary</h2>
              <div className="space-y-4 text-sm md:text-[15px]">
                <div className="flex justify-between items-center text-gray-500">
                  <span className={theme.textSecondary}>Sub Total</span>
                  <span className={theme.text}>{formatPrice(subTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className={theme.textSecondary}>Shipping</span>
                  <span className={theme.text}>{formatPrice(shipping)}</span>
                </div>
                <div className={`my-4 border-t ${theme.border}`}></div>
                <div className="flex justify-between items-center mb-6">
                  <span className={`font-bold ${theme.text}`}>Total</span>
                  <span className={`font-bold text-lg md:text-xl text-[#4A90E2]`}>{formatPrice(total)}</span>
                </div>
                
                {/* Desktop Checkout Button */}
                <button 
                  onClick={() => navigate('/checkout')}
                  className="hidden md:block w-full bg-[#4A90E2] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Checkout Button (hidden on md) */}
      <div className={`md:hidden fixed bottom-[80px] left-0 right-0 px-4 z-40 ${theme.navBg} pt-2 pb-4 border-t ${theme.border} transition-colors duration-300`}>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-[#4A90E2] text-white font-bold py-3.5 rounded-full shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
        >
          Proceed to Checkout
        </button>
      </div>
    </motion.div>
  );
};

export default CartPage;
