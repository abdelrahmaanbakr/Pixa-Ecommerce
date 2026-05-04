import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const WishlistPage = () => {
  const { isDark, theme } = useTheme();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => `Rp ${price.toLocaleString('id-ID')}`;

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Added to Cart!');
  };

  if (wishlist.length === 0) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`flex-1 flex flex-col items-center justify-center p-4 ${theme.bg} min-h-screen font-poppins transition-colors duration-300`}
      >
        <Heart size={60} className={theme.textSecondary} />
        <p className={`${theme.textSecondary} mb-6 mt-4 text-sm font-medium`}>No favorites yet</p>
        <button 
          onClick={() => navigate('/home')}
          className="bg-[#4A90E2] text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
        >
          Explore Products
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`min-h-screen ${theme.bg} font-poppins pb-24 md:pb-8 pt-4 md:pt-8 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-16 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button onClick={() => navigate(-1)} className={`p-2 -ml-2 rounded-full flex items-center justify-center ${isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-black'} active:scale-95 transition-transform md:hidden`}>
            <ArrowLeft size={22} className={theme.text} />
          </button>
          <h1 className={`text-2xl font-bold flex-1 text-center md:text-left ${theme.text}`}>My Favorites</h1>
          <div className="w-8 md:hidden"></div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className={`flex md:flex-col p-3 md:p-4 rounded-xl ${theme.card} shadow-sm transition-all hover:shadow-md hover:-translate-y-1`}>
              <img src={item.image} alt={item.name} className={`w-[100px] h-[100px] md:w-full md:h-[200px] rounded-lg object-cover mb-0 md:mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />
              <div className="ml-4 md:ml-0 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-[13px] md:text-[15px] tracking-tight leading-snug pr-2 line-clamp-2 ${theme.text}`}>
                      {item.name}
                    </h3>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className={`hover:scale-110 transition-transform active:scale-95 flex items-center justify-center ${isDark ? 'md:bg-gray-800' : 'md:bg-gray-100'} md:p-1.5 md:rounded-full`}
                    >
                      <Heart size={20} fill="red" className="text-red-500" />
                    </button>
                  </div>
                  <p className="text-[#4A90E2] font-semibold text-sm md:text-lg mt-1">{formatPrice(item.price)}</p>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-[#4A90E2] text-white text-xs md:text-sm font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-2 mt-3 hover:bg-blue-600 transition-all active:scale-95"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistPage;
