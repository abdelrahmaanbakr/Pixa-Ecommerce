import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { formatPrice } from '../../../utils/formatPrice';
import StarRating from '../../ui/StarRating';
import { Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  if (!product) {
    return null;
  }

  const handleWishlistClick = (event) => {
    event.stopPropagation();
    if (isInWishlist(product.id)) {
      toggleWishlist(product);
      toast.error('Removed from Favorites!');
    } else {
      toggleWishlist(product);
      toast.success('Added to Favorites!');
    }
  };

  const handleCartClick = (event) => {
    event.stopPropagation();
    addToCart(product);
    toast.success('Added to Cart!');
  };

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-full rounded-xl overflow-hidden ${theme.card} shadow-sm cursor-pointer active:scale-95 transition-all flex flex-col`}
    >
      <div className="relative overflow-hidden rounded-t-xl shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full aspect-square object-cover ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
        />

        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 active:scale-95 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            fill={isInWishlist(product.id) ? 'red' : 'none'}
            className={isInWishlist(product.id) ? 'text-red-500' : 'text-[#4A90E2]'}
          />
        </button>

        <button
          onClick={handleCartClick}
          className={`absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md transition-all duration-300 active:scale-95 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          aria-label="Add to cart"
        >
          <ShoppingCart size={18} color="white" />
        </button>
      </div>

      <div className="p-3 flex flex-1 flex-col">
        <h3 className={`min-h-[38px] text-sm font-bold line-clamp-2 leading-snug mb-1 ${theme.text}`}>
          {product.name}
        </h3>

        <div className="min-h-[32px] flex items-start gap-1 mb-2">
          <StarRating rating={product.rating} />
          <span className={`text-[11px] font-medium leading-tight ${theme.textSecondary}`}>
            {product.rating} | {product.reviewCount ?? product.reviews?.length ?? product.reviews ?? 0} reviews
          </span>
        </div>

        <p className="mt-auto text-sm font-black text-[#4A90E2]">
          {formatPrice(product.price)}
        </p>
      </div>

    </motion.div>
  );
};

export default ProductCard;
