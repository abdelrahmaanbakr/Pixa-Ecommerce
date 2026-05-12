import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { mockData } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import ProductCard from '../../components/common/ProductCard';
import ProductCardSkeleton from '../../components/ui/ProductCardSkeleton';
import { Bell, ShoppingCart, Search } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

// TODO: Replace banners with API data when backend is ready
// GET /api/banners
const banners = [
  {
    id: 1,
    tag: "Flash Sale",
    title: "Up to 50% OFF",
    subtitle: "Limited time offer",
    bg: "from-blue-600 to-blue-400",
    image: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?w=300&h=200&auto=compress",
    btnText: "Shop Now",
  },
  {
    id: 2,
    tag: "New Arrivals",
    title: "Fresh Styles",
    subtitle: "Just landed this season",
    bg: "from-purple-600 to-purple-400",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=300&h=200&auto=compress",
    btnText: "Explore",
  },
  {
    id: 3,
    tag: "Top Rated",
    title: "Best Sellers",
    subtitle: "Loved by thousands",
    bg: "from-orange-500 to-orange-300",
    image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?w=300&h=200&auto=compress",
    btnText: "View All",
  },
  {
    id: 4,
    tag: "Special Offers",
    title: "Exclusive Deals",
    subtitle: "Members only prices",
    bg: "from-green-600 to-green-400",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=300&h=200&auto=compress",
    btnText: "Grab Deal",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { isDark, theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const skeletonBaseColor = isDark ? '#1A1A2E' : '#e0e0e0';
  const skeletonHighlightColor = isDark ? '#2A2A3E' : '#f5f5f5';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`min-h-screen ${theme.bg} pb-20 md:pb-8 font-poppins transition-colors duration-300`}
    >
      {/* 1. HEADER SECTION (Mobile Only) */}
      <div className="md:hidden bg-[#4A90E2] pt-8 pb-10 px-5 rounded-b-3xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://picsum.photos/seed/avatar/40/40"
              alt="Avatar"
              className="w-11 h-11 rounded-full border-2 border-white object-cover"
            />
            <div>
              <h2 className="text-white font-bold text-sm">Michael Jordan</h2>
              <p className="text-blue-100 text-xs mt-0.5">Bekasi, Indonesia</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
              <Bell size={22} className="text-white" />
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="text-white bg-white/20 p-2 rounded-full relative hover:bg-white/30 transition-colors"
            >
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] bg-red-500 text-[10px] font-bold border-2 border-[#4A90E2] rounded-full px-0.5">
                  {cartCount}
                </span>
              )}
              <ShoppingCart size={22} className="text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div
          onClick={() => navigate('/search')}
          className={`${theme.input} rounded-full py-3 px-4 flex items-center shadow-lg shadow-blue-900/20 cursor-text transition-colors`}
        >
          <Search size={20} className={theme.textSecondary} />
          <span className={`ml-2 text-sm ${theme.textSecondary}`}>
            Search clothes, shoes, bags...
          </span>
        </div>
      </div>

      {/* Desktop Layout Wrapper */}
      <div className="max-w-7xl mx-auto w-full lg:p-6 lg:px-8 xl:px-16">

        {/* Main Content Area */}
        <div className="w-full flex flex-col pt-0 lg:pt-8 min-w-0">

          {/* BANNER SLIDER */}
          {loading ? (
            <div className="px-5 lg:px-0 mb-6 mt-4">
              <Skeleton
                height={176}
                borderRadius={16}
                baseColor={skeletonBaseColor}
                highlightColor={skeletonHighlightColor}
              />
            </div>
          ) : (
            <div className="px-5 lg:px-0 mb-6 mt-4 relative z-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              className="rounded-2xl"
            >
              {banners.map((banner) => (
                <SwiperSlide key={banner.id}>
                  <div className={`bg-gradient-to-r ${banner.bg} rounded-2xl h-44 flex items-center justify-between overflow-hidden relative`}>

                    {/* Left: Text */}
                    <div className="p-5 flex-1 z-10">
                      <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-2 inline-block backdrop-blur-sm">
                        {banner.tag}
                      </span>
                      <h3 className="text-white font-bold text-xl leading-tight mb-1">
                        {banner.title}
                      </h3>
                      <p className="text-white/80 text-xs mb-3">
                        {banner.subtitle}
                      </p>
                      <button
                        onClick={() => navigate('/search')}
                        className="bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-full hover:opacity-90 transition-all duration-200"
                      >
                        {banner.btnText} →
                      </button>
                    </div>

                    {/* Right: Image */}
                    <div className="w-44 h-44 flex-shrink-0 relative">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://picsum.photos/seed/fallback/300/200";
                        }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${banner.bg} opacity-20`} />
                    </div>

                    {/* Decorations */}
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
                    <div className="absolute right-32 -top-6 w-20 h-20 rounded-full bg-white/10" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
          )}

          {/* SECTION TITLE */}
          <div className="px-5 lg:px-0 flex justify-between items-end mb-4">
            <h3 className={`text-lg font-bold ${theme.text}`}>Latest Products</h3>
            <button className="text-sm font-semibold text-[#4A90E2] hover:text-blue-600 transition-colors">
              See All
            </button>
          </div>

          {/* PRODUCTS GRID */}
          {loading ? (
            <div className="px-5 lg:px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-5 lg:px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start"
            >
              {mockData.map((product) => (
                <motion.div key={product.id} variants={itemVariants} className="h-full">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
