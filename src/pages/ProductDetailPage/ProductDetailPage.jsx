import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { mockData } from '../../data/mockData';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import ProductCard from '../../components/common/ProductCard';
import ReviewCard from '../../components/ui/ReviewCard';
import AddReviewModal from '../../components/ui/AddReviewModal';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Heart,
  Home,
  MessageSquare,
  PenLine,
  Share2,
  Star,
  X
} from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isDark, theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const skeletonBaseColor = isDark ? '#1A1A2E' : '#e0e0e0';
  const skeletonHighlightColor = isDark ? '#2A2A3E' : '#f5f5f5';
  
  const product = mockData.find(p => p.id === parseInt(id));
  const [reviews, setReviews] = useState(product?.reviews || []);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [filterRating, setFilterRating] = useState(0);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
      : 0
  }));

  const filteredReviews = filterRating === 0
    ? reviews
    : reviews.filter(r => r.rating === filterRating);

  const displayedReviews = showAllReviews
    ? filteredReviews
    : filteredReviews.slice(0, 3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      toggleWishlist(product);
      toast.error('Removed from Favorites!');
    } else {
      toggleWishlist(product);
      toast.success('Added to Favorites! ❤️');
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to Cart!');
  };

  const handleBuyNow = () => {
    addToCart(product);
    toast.success('Added to Cart!');
    navigate('/cart');
  };

  if (!product) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`flex flex-col h-full ${theme.bg} font-poppins transition-colors duration-300`}
      >
        {/* 1. HEADER FOR ERROR STATE */}
        <div className={`sticky top-0 z-50 ${theme.navBg} px-4 py-4 flex items-center shadow-sm`}>
          <button onClick={() => navigate(-1)} className={`px-2 -ml-2 rounded-full flex items-center justify-center ${theme.text}`}>
            <ArrowLeft size={22} />
          </button>
          <span className={`font-bold text-lg ml-3 ${theme.text}`}>Back</span>
        </div>
        <div className={`flex-1 flex items-center justify-center font-semibold ${theme.textSecondary}`}>
          Product not found
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`relative font-poppins ${theme.bg} flex flex-col min-h-screen pb-20 md:pb-8 transition-colors duration-300`}
      >
        {/* 1. HEADER (Mobile Only) */}
        <div className={`md:hidden sticky top-0 z-50 ${theme.navBg} px-4 py-3 flex items-center justify-between shadow-sm border-b ${theme.border}`}>
          <button onClick={() => navigate(-1)} className={`p-2 -ml-2 rounded-full flex items-center justify-center active:scale-95 transition-transform ${theme.text}`}>
            <ArrowLeft size={22} />
          </button>
          <span className={`font-bold text-lg ${theme.text}`}>Product Detail</span>
          <div className="flex gap-2 text-xl">
            <div className="p-2 w-10 h-10" />
            <div className="p-2 w-10 h-10 -mr-2" />
          </div>
        </div>

        {/* Desktop Wrapper */}
        <div className="max-w-7xl mx-auto w-full md:px-8 lg:px-16 flex flex-col md:pt-6">
          <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
            
            {/* LEFT COLUMN (Image & Thumbnails) */}
            <div className={`w-full md:w-[40%] ${theme.bg} md:bg-transparent md:rounded-3xl md:p-4 h-fit md:sticky top-24 border-b border-transparent`}>
              <Skeleton
                height={280}
                width="100%"
                baseColor={skeletonBaseColor}
                highlightColor={skeletonHighlightColor}
                className="md:!h-[400px] md:rounded-2xl"
              />

              <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide">
                {[1, 2, 3, 4].map(idx => (
                  <Skeleton
                    key={idx}
                    width={60}
                    height={60}
                    borderRadius={8}
                    baseColor={skeletonBaseColor}
                    highlightColor={skeletonHighlightColor}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN (Info + Actions) */}
            <div className="w-full md:w-[60%] flex flex-col md:py-4">
              <div className={`px-5 md:px-0 pb-5 md:pb-4 pt-4 md:pt-0 ${theme.bg}`}>
                <Skeleton
                  height={24}
                  width="70%"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
                <Skeleton
                  height={16}
                  width="50%"
                  className="mt-3"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
              </div>
              
              <div className={`hidden md:flex flex-col ${theme.bgCard} border ${theme.border} shadow-sm p-6 rounded-2xl md:mt-4 mb-6`}>
                <Skeleton
                  height={16}
                  width="20%"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
                <Skeleton
                  height={32}
                  width="35%"
                  className="mt-2 mb-6"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
                <div className="flex gap-4">
                  <Skeleton height={50} borderRadius={999} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} containerClassName="flex-1" />
                  <Skeleton height={50} borderRadius={999} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} containerClassName="flex-1" />
                </div>
              </div>

              <div className={`${theme.bg} md:bg-transparent mt-2 md:mt-0 px-5 md:px-0 py-5`}>
                <Skeleton
                  height={16}
                  width="35%"
                  className="mb-3"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
                <Skeleton
                  count={3}
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
              </div>

              <div className={`${theme.bgCard} mt-2 md:mt-0 px-5 md:px-6 py-4 md:rounded-2xl border-y md:border ${theme.border}`}>
                <Skeleton
                  height={80}
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`h-[20px] md:hidden ${theme.bg}`}></div>
        
        <div className={`md:hidden sticky bottom-0 w-full mt-auto ${theme.navBg} border-t ${theme.border} px-5 py-4 flex items-center justify-between z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] transition-colors duration-300`}>
          <div className="w-28">
            <Skeleton height={12} width="45%" baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
            <Skeleton height={22} width="80%" className="mt-1" baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
          </div>
          <Skeleton height={50} width={130} borderRadius={999} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
        </div>
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
      className={`relative font-poppins ${theme.bg} flex flex-col min-h-screen pb-20 md:pb-8 transition-colors duration-300`}
    >
      {/* 1. HEADER (Mobile Only) */}
      <div className={`md:hidden sticky top-0 z-50 ${theme.navBg} px-4 py-3 flex items-center justify-between shadow-sm border-b ${theme.border}`}>
        <button onClick={() => navigate(-1)} className={`p-2 -ml-2 rounded-full flex items-center justify-center active:scale-95 transition-transform ${theme.text}`}>
          <ArrowLeft size={22} />
        </button>
        <span className={`font-bold text-lg ${theme.text}`}>Product Detail</span>
        <div className="flex gap-2 text-xl">
          <button onClick={handleWishlistToggle} className={`p-2 w-10 h-10 rounded-full flex items-center justify-center font-light active:scale-95 transition-items`}>
            {isInWishlist(product.id) ? <Heart size={22} fill="red" className="text-red-500" /> : <Heart size={22} className={theme.textSecondary} />}
          </button>
          <button className={`p-2 w-10 h-10 -mr-2 rounded-full flex items-center justify-center font-light active:scale-95 transition-transform ${theme.textSecondary}`}>
            <Share2 size={22} />
          </button>
        </div>
      </div>

      <nav className={`px-4 md:px-16 py-3 border-b ${theme.border}
        ${theme.bgSecondary}`}>
        <div className="max-w-6xl mx-auto flex items-center gap-1 text-sm">
          <button onClick={() => navigate('/home')}
            className="text-blue-500 hover:underline flex
              items-center gap-1">
            <Home size={14} />
            Home
          </button>
          <ChevronRight size={14} className={theme.textSecondary} />
          <button onClick={() => navigate('/products')}
            className="text-blue-500 hover:underline">
            Products
          </button>
          <ChevronRight size={14} className={theme.textSecondary} />
          <span className={`${theme.text} font-medium truncate
            max-w-[200px]`}>
            {product?.name}
          </span>
        </div>
      </nav>

      {/* Desktop Wrapper */}
      <div className="max-w-7xl mx-auto w-full md:px-8 lg:px-16 flex flex-col md:pt-6">
        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
          
          {/* LEFT COLUMN (Image & Thumbnails) */}
          <div className={`w-full md:w-[40%] ${theme.bg} md:bg-transparent md:rounded-3xl md:p-4 h-fit md:sticky top-24 border-b border-transparent`}>
            {/* 2. PRODUCT IMAGE */}
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-full h-[280px] md:h-[400px] object-cover md:rounded-2xl ${isDark ? 'bg-[#1A1A2E]' : 'bg-gray-100'}`}
            />

            {/* 3. THUMBNAIL ROW */}
            <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide">
              <div className="w-[60px] h-[60px] flex-shrink-0 border-2 border-[#4A90E2] rounded-lg overflow-hidden p-0.5">
                <img src={product.image} alt="thumb1" className="w-full h-full object-cover rounded shadow-sm" />
              </div>
              {[2, 3, 4].map(idx => (
                <div key={idx} className="w-[60px] h-[60px] flex-shrink-0 border border-transparent rounded-lg overflow-hidden">
                  <img src={product.image} alt={`thumb${idx}`} className={`w-full h-full object-cover opacity-60 ${isDark ? 'bg-[#1A1A2E]' : 'bg-gray-100'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN (Info + Actions) */}
          <div className="w-full md:w-[60%] flex flex-col md:py-4">
            
            {/* 4. PRODUCT INFO */}
            <div className={`px-5 md:px-0 pb-5 md:pb-4 pt-4 md:pt-0 ${theme.bg}`}>
              <h1 className={`text-[22px] font-bold leading-tight mb-2.5 ${theme.text}`}>
                {product.name}
              </h1>
              <div className={`flex items-center gap-2 text-xs font-medium ${theme.textSecondary}`}>
                <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded text-xs">
                  <Star size={14} fill="#FFD700" className="text-yellow-400" />
                  {product.rating}
                </div>
                <span>•</span>
                <span>{reviews.length} Reviews</span>
                <span>•</span>
                <span>800 Sold</span>
              </div>
            </div>
            
            {/* Desktop Actions Card */}
            <div className={`hidden md:flex flex-col ${theme.bgCard} border ${theme.border} shadow-sm p-6 rounded-2xl md:mt-4 mb-6`}>
              <p className={`text-[13px] font-semibold mb-1 ${theme.textSecondary}`}>Price</p>
              <p className="font-black text-3xl text-[#4A90E2] mb-6">{formatPrice(product.price)}</p>
              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-50 dark:bg-[#4A90E2]/10 text-[#4A90E2] border-2 border-[#4A90E2] font-bold text-[15px] py-3.5 rounded-full hover:bg-blue-100 dark:hover:bg-[#4A90E2]/20 transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#4A90E2] text-white font-bold text-[15px] py-3.5 rounded-full shadow-md shadow-blue-500/30 hover:bg-blue-600 active:scale-95 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* 5. DESCRIPTION SECTION */}
            <div className={`${theme.bg} md:bg-transparent mt-2 md:mt-0 px-5 md:px-0 py-5`}>
              <h2 className={`font-bold text-[15px] mb-3 ${theme.text}`}>Product Description</h2>
              <p className={`text-[13px] leading-relaxed text-justify ${theme.textSecondary}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Duis pellentesque condimentum orci id varius.
              </p>
            </div>

            {/* 6. SELLER INFO */}
            <div className={`${theme.bgCard} mt-2 md:mt-0 px-5 md:px-6 py-4 md:rounded-2xl border-y md:border ${theme.border} flex items-center justify-between`}>
              <div className="flex items-center gap-3 w-full">
                <img src="https://picsum.photos/seed/seller/40/40" alt="Seller" className={`w-11 h-11 rounded-full border ${theme.border} object-cover`} />
                <div className="flex-1">
                  <h3 className={`font-bold text-sm tracking-tight ${theme.text}`}>SNEAKERS</h3>
                  <p className={`text-[11px] mt-0.5 ${theme.textSecondary}`}>Bekasi, Indonesia</p>
                </div>
                <button className="border-2 border-[#4A90E2] text-[#4A90E2] text-xs font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  Follow +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTIONS */}
        {/* 7. REVIEWS SECTION */}
        <section className={`${theme.bg} md:bg-transparent mt-2 md:mt-12 px-4 md:px-0 py-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${theme.text}`}>
              Customer Reviews
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowReviewModal(true)}
              className="flex items-center gap-2 bg-blue-500
                text-white px-4 py-2 rounded-full text-sm
                font-medium hover:bg-blue-600 transition-colors">
              <PenLine size={16} />
              Write Review
            </motion.button>
          </div>

          <div className={`${theme.card} rounded-2xl p-5
            mb-6 shadow-sm`}>
            <div className="flex gap-6 items-center">
              <div className="text-center shrink-0">
                <p className={`text-5xl font-bold ${theme.text}`}>
                  {avgRating}
                </p>
                <div className="flex justify-center my-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={16}
                      fill={i < Math.round(avgRating)
                        ? '#FBBF24' : 'none'}
                      className={i < Math.round(avgRating)
                        ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className={`text-xs ${theme.textSecondary}`}>
                  {reviews.length} reviews
                </p>
              </div>

              <div className="flex-1 space-y-2">
                {ratingCounts.map(({ star, count, percentage }) => (
                  <button
                    key={star}
                    onClick={() => setFilterRating(
                      filterRating === star ? 0 : star
                    )}
                    className={`w-full flex items-center gap-3
                      group transition-opacity
                      ${filterRating > 0 && filterRating !== star
                        ? 'opacity-40' : 'opacity-100'}`}>
                    <span className={`text-xs w-3 shrink-0
                      ${theme.textSecondary}`}>
                      {star}
                    </span>
                    <Star size={12} fill="#FBBF24"
                      className="text-yellow-400 shrink-0" />
                    <div className={`flex-1 h-2 rounded-full
                      ${theme.bgSecondary} overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${percentage}%`
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full bg-yellow-400 rounded-full"
                      />
                    </div>
                    <span className={`text-xs w-4 shrink-0
                      ${theme.textSecondary}`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {filterRating > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <span className={`text-xs ${theme.textSecondary}`}>
                  Showing {filterRating} star reviews
                </span>
                <button
                  onClick={() => setFilterRating(0)}
                  className="text-xs text-blue-500
                    hover:underline flex items-center gap-1">
                  <X size={12} /> Clear filter
                </button>
              </div>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-10">
              <Star size={48} className="text-gray-300 mx-auto mb-3" />
              <p className={`font-semibold mb-1 ${theme.text}`}>
                No reviews yet
              </p>
              <p className={`text-sm mb-4 ${theme.textSecondary}`}>
                Be the first to review this product!
              </p>
              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-blue-500 text-white px-6 py-2
                  rounded-full text-sm font-medium
                  hover:bg-blue-600 transition-colors">
                Write a Review
              </button>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare size={48}
                className="text-gray-300 mx-auto mb-3" />
              <p className={theme.textSecondary}>
                No reviews for this rating yet
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {displayedReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {filteredReviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className={`w-full mt-4 py-3 rounded-xl border-2
                    border-blue-500 text-blue-500 font-medium text-sm
                    hover:bg-blue-500 hover:text-white transition-colors
                    flex items-center justify-center gap-2`}>
                  {showAllReviews ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>Show All {filteredReviews.length} Reviews
                      <ChevronDown size={16} /></>
                  )}
                </button>
              )}
            </>
          )}
        </section>

        {/* 8. SIMILAR PRODUCTS */}
        <div className={`${theme.bg} md:bg-transparent mt-2 md:mt-12 py-5 md:py-8 pl-5 md:px-0`}>
          <div className="flex items-center justify-between pr-5 md:pr-0 mb-6">
            <h2 className={`font-bold text-lg md:text-xl ${theme.text}`}>Similar Products</h2>
            <span className="text-sm font-bold text-[#4A90E2] cursor-pointer hover:underline">See All</span>
          </div>
          <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible scrollbar-hide pr-5 md:pr-0 pb-2">
            {mockData.slice(0, 3).map(sim => (
              <div key={sim.id} className="w-[160px] md:w-full flex-shrink-0">
                <ProductCard product={sim} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* spacer to ensure content doesn't get hidden behind the sticky bottom bar on scroll end */}
      <div className={`h-[20px] md:hidden ${theme.bg}`}></div>
      
      {/* 9. STICKY BOTTOM BAR (Mobile Only) */}
      <div className={`md:hidden sticky bottom-0 w-full mt-auto ${theme.navBg} border-t ${theme.border} px-5 py-4 flex items-center justify-between z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] transition-colors duration-300`}>
        <div>
          <p className={`text-[11px] font-semibold mb-0.5 ${theme.textSecondary}`}>Price</p>
          <p className="font-black text-[20px] text-[#4A90E2] leading-none">{formatPrice(product.price)}</p>
        </div>
        <button 
          onClick={handleBuyNow}
          className="bg-[#4A90E2] text-white font-bold text-[15px] px-8 py-3.5 rounded-full shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 active:scale-95 transition-all"
        >
          Buy Now
        </button>
      </div>

      <AddReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        productName={product?.name}
        onSubmit={(newReview) => {
          setReviews(prev => [newReview, ...prev]);
          setShowAllReviews(false);
          setFilterRating(0);
        }}
      />
    </motion.div>
  );
};

export default ProductDetailPage;
