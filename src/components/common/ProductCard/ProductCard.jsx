import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { formatPrice } from '../../../utils/formatPrice';
import StarRating from '../../ui/StarRating';
import { Eye, Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigate();
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      className={`group relative h-full rounded-xl overflow-hidden ${theme.card} shadow-sm cursor-pointer transition-[box-shadow,border-color,transform] duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0D0D0D] hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300`}
    >
      <div className="relative overflow-hidden rounded-t-xl shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full aspect-square object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />

        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-md backdrop-blur transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2] ${
            isHovered || inWishlist ? 'md:opacity-100 md:scale-100' : 'md:opacity-0 md:scale-75'
          }`}
          aria-label={inWishlist ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={18}
            fill={inWishlist ? 'red' : 'none'}
            className={inWishlist ? 'text-red-500' : 'text-[#4A90E2]'}
          />
        </button>

        <button
          onClick={handleCartClick}
          className={`absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            isHovered ? 'md:opacity-100 md:scale-100' : 'md:opacity-0 md:scale-75'
          }`}
          aria-label="Add to cart"
        >
          <ShoppingCart size={18} color="white" />
        </button>

        <div className="absolute bottom-2 left-2 hidden items-center gap-1 rounded-full bg-white/95 px-3 py-2 text-[11px] font-bold text-[#4A90E2] shadow-md backdrop-blur transition-all duration-300 md:flex opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
          <Eye size={14} />
          Quick view
        </div>
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
