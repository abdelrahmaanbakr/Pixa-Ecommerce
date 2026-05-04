import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockData } from '../../data/mockData';
import { formatPrice } from '../../utils/formatPrice';
import { useTheme } from '../../context/ThemeContext';
import ProductCard from '../../components/common/ProductCard';
import ProductCardSkeleton from '../../components/ui/ProductCardSkeleton';
import { ArrowLeft, SlidersHorizontal, Search, Star, SearchX } from 'lucide-react';

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

const SearchPage = () => {
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Products');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const hasMounted = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // TODO: Replace with API call when backend is ready
  const categories = ['All Products', 'Electronics', 'Sports', 'Fashion'];
  const filteredProducts = mockData.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = activeCategory === 'All Products'
      ? true
      : product.category === activeCategory;
    const matchPrice =
      (!minPrice || product.price >= Number(minPrice)) &&
      (!maxPrice || product.price <= Number(maxPrice));

    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`min-h-screen ${theme.bg} flex flex-col font-poppins pb-24 md:pb-8 transition-colors duration-300`}
    >
      {/* 1. HEADER (Mobile Only) */}
      <div className={`md:hidden ${theme.navBg} px-4 pt-5 pb-3 flex items-center gap-3 sticky top-0 z-50 shadow-sm border-b ${theme.border} transition-colors duration-300`}>
        <button 
          onClick={() => navigate(-1)} 
          className={`px-1 rounded-full flex items-center justify-center active:scale-90 transition-transform ${theme.text}`}
        >
          <ArrowLeft size={22} />
        </button>
        <div className={`flex-1 ${theme.input} rounded-full flex items-center px-4 py-2 border border-transparent focus-within:border-[#4A90E2] transition-colors`}>
          <input 
            type="text" 
            autoFocus
            placeholder="Search products..." 
            className={`bg-transparent w-full outline-none text-sm ${theme.text} placeholder-gray-500`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className={`${theme.text} px-1 rounded-full flex items-center justify-center`}>
          <SlidersHorizontal size={22} />
        </button>
      </div>

      {/* 2. TABS (Mobile Only) */}
      <div className={`md:hidden ${theme.navBg} px-4 py-2.5 flex border-b ${theme.border} shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] relative z-40 transition-colors duration-300`}>
        <div className="flex gap-2 w-full">
          <button 
            onClick={() => setActiveTab('Products')}
            className={`flex-1 py-1.5 text-sm font-semibold rounded-full transition-all ${
              activeTab === 'Products' ? 'bg-[#4A90E2] text-white shadow-md shadow-blue-500/20' : `${theme.textSecondary} bg-transparent border ${theme.border}`
            }`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('Store')}
            className={`flex-1 py-1.5 text-sm font-semibold rounded-full transition-all ${
              activeTab === 'Store' ? 'bg-[#4A90E2] text-white shadow-md shadow-blue-500/20' : `${theme.textSecondary} bg-transparent border ${theme.border}`
            }`}
          >
            Store
          </button>
        </div>
      </div>

      {/* Desktop Wrapper */}
      <div className="flex flex-col md:flex-row md:gap-6 md:p-6 max-w-7xl mx-auto w-full flex-1 md:pt-8 md:px-8 lg:px-16">
        
        {/* DESKTOP SIDEBAR (md only) */}
        <div className={`hidden md:flex flex-col w-[250px] shrink-0 sticky top-24 self-start ${theme.sidebar} rounded-lg p-4`}>
          <h2 className={`font-bold text-lg mb-4 ${theme.text}`}>Filters</h2>
          
          {/* Search Input */}
          <div className={`${theme.input} rounded-xl flex items-center px-4 py-3 border ${theme.border} focus-within:border-[#4A90E2] transition-colors mb-6 shadow-sm`}>
            <Search size={18} className={theme.textSecondary} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className={`bg-transparent w-full outline-none text-sm ml-2 ${theme.text} placeholder-gray-500`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Desktop Tabs */}
          <div className={`flex ${theme.input} p-1 rounded-lg mb-6`}>
            <button 
              onClick={() => setActiveTab('Products')}
              className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all ${
                activeTab === 'Products' ? `${theme.bgCard} ${theme.text} shadow-sm` : `${theme.textSecondary} hover:text-[#4A90E2]`
              }`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('Store')}
              className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all ${
                activeTab === 'Store' ? `${theme.bgCard} ${theme.text} shadow-sm` : `${theme.textSecondary} hover:text-[#4A90E2]`
              }`}
            >
              Store
            </button>
          </div>

          {/* Category Filter UI */}
          <div className="mb-6">
            <h3 className={`font-semibold text-sm mb-3 ${theme.text}`}>Categories</h3>
            <ul className={`space-y-2 text-sm ${theme.textSecondary}`}>
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer transition-colors ${
                    activeCategory === category ? 'text-[#4A90E2] font-bold' : `${theme.textSecondary} hover:text-[#4A90E2]`
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter UI */}
          <div className="mb-6">
            <h3 className={`font-semibold text-sm mb-3 ${theme.text}`}>Price Range</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className={`w-full ${theme.input} border ${theme.border} ${theme.text} rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[#4A90E2] placeholder-gray-500`}
              />
              <span className={theme.textSecondary}>-</span>
              <input
                type="text"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={`w-full ${theme.input} border ${theme.border} ${theme.text} rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[#4A90E2] placeholder-gray-500`}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-0 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={`flex flex-col items-center justify-center mt-24 ${theme.textSecondary}`}>
              <SearchX size={64} className={`mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <span className="text-sm font-medium">No products found</span>
            </div>
          ) : (
            <>
              {/* 3. PRODUCTS GRID */}
              {activeTab === 'Products' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {filteredProducts.map(product => (
                    <motion.div key={product.id} variants={itemVariants}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* 4. TOKO TAB (LIST VIEW) */}
              {activeTab === 'Store' && (
                <div className="flex flex-col gap-3">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className={`${theme.card} rounded-xl p-3.5 flex gap-3.5 cursor-pointer active:scale-95 transition-all shadow-sm`}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={`w-[80px] h-[80px] object-cover rounded-xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'} border`}
                      />
                      <div className="flex flex-col flex-1 justify-center py-0.5">
                        <h4 className={`text-[13px] font-bold line-clamp-2 leading-snug mb-1 ${theme.text}`}>
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Star size={12} fill="#FFD700" className="text-yellow-500" />
                          <span className={`text-[11px] font-medium ${theme.textSecondary}`}>
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="text-sm font-black text-[#4A90E2] mt-auto">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPage;
