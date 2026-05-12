import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockData } from '../../data/mockData';
import { formatPrice } from '../../utils/formatPrice';
import { useTheme } from '../../context/ThemeContext';
import ProductCard from '../../components/common/ProductCard';
import ProductCardSkeleton from '../../components/ui/ProductCardSkeleton';
import { ArrowLeft, SlidersHorizontal, Search, Star, SearchX, X } from 'lucide-react';

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
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
};

const categoryOptions = ['All', 'Electronics', 'Fashion', 'Sports', 'Bags', 'Accessories'];
const priceOptions = [
  { label: 'Under Rp 100K', max: 100000 },
  { label: 'Rp 100K - 500K', min: 100000, max: 500000 },
  { label: 'Above Rp 500K', min: 500000 },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isDark, theme } = useTheme();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('Products');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [priceFilter, setPriceFilter] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasMounted = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setActiveCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

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

  const activeFilters = [
    activeCategory !== 'All',
    priceFilter !== null,
    sortBy !== ''
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setActiveCategory('All');
    setPriceFilter(null);
    setSortBy('');
    setShowFilters(false);
  };

  const filteredProducts = mockData
    .filter((product) => {
      const matchSearch = !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === 'All' ||
        product.category === activeCategory;
      const matchPrice = !priceFilter || (
        (!priceFilter.min || product.price >= priceFilter.min) &&
        (!priceFilter.max || product.price <= priceFilter.max)
      );

      return matchSearch && matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`min-h-screen ${theme.bg} flex flex-col font-poppins pb-24 md:pb-8 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto w-full flex-1 p-4 md:p-6 md:px-8 lg:px-16">
        <div className="w-full">
          {/* Search Header */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className={`shrink-0 ${theme.text} active:scale-90 transition-transform`}
            >
              <ArrowLeft size={22} />
            </button>
            <div className={`flex-1 flex items-center gap-3 rounded-xl px-4 py-3 ${theme.input}`}>
              <Search size={18} className={theme.textSecondary} />
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className={`w-full bg-transparent outline-none text-sm ${theme.text} placeholder-gray-500`}
              />
            </div>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              {filteredProducts.length} results
            </span>
          </div>

          {/* Filter Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 whitespace-nowrap font-medium text-sm transition-colors ${
                showFilters
                  ? 'border-blue-500 text-blue-500 bg-blue-500/10'
                  : `${theme.border} ${theme.text}`
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilters > 0 && (
                <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>

            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : `${theme.bgSecondary} ${theme.text} border ${theme.border}`
                }`}
              >
                {category}
              </button>
            ))}

            {priceOptions.map((price) => (
              <button
                key={price.label}
                onClick={() => setPriceFilter(price)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-colors ${
                  priceFilter?.label === price.label
                    ? 'bg-blue-500 text-white'
                    : `${theme.bgSecondary} ${theme.text} border ${theme.border}`
                }`}
              >
                {price.label}
              </button>
            ))}

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className={`px-4 py-2 rounded-full text-sm border outline-none cursor-pointer ${theme.bgSecondary} ${theme.text} ${theme.border}`}
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {activeFilters > 0 && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-full text-sm text-red-500 border border-red-300 whitespace-nowrap hover:bg-red-50 transition-colors"
              >
                <X size={14} className="inline mr-1" />
                Clear All
              </button>
            )}
          </div>

          {/* Results Tabs */}
          <div className="flex gap-2 mb-4">
            {['Products', 'Store'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : `${theme.bgSecondary} ${theme.text}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={`flex flex-col items-center justify-center mt-24 ${theme.textSecondary}`}>
              <SearchX size={64} className={`mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <span className="text-sm font-medium">No products found</span>
            </div>
          ) : (
            <>
              {activeTab === 'Products' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {filteredProducts.map((product) => (
                    <motion.div key={product.id} variants={itemVariants} className="h-full">
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'Store' && (
                <div className="flex flex-col gap-3">
                  {filteredProducts.map((product) => (
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
