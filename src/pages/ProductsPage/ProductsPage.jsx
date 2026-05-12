import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { X, PackageSearch } from 'lucide-react';
import { mockData } from '../../data/mockData';
import ProductCard from '../../components/common/ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 200 }
  }
};

const ProductsPage = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');

  const filteredProducts = mockData
    .filter(p => activeCategory === 'All' ||
      p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className={`min-h-screen font-poppins ${theme.bg}`}>
      <section className={`py-12 px-6 md:px-16
        bg-gradient-to-r from-blue-600 to-blue-400`}>
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold
              text-white mb-3">
            All Products
          </motion.h1>
          <p className="text-blue-100">
            {filteredProducts.length} products available
          </p>
        </div>
      </section>

      <div className={`sticky top-16 z-40
        ${theme.navBg} border-b ${theme.border}
        px-6 md:px-16 py-3 shadow-sm`}>
        <div className="max-w-6xl mx-auto flex items-center
          gap-3 overflow-x-auto scrollbar-hide">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-full text-sm
              border outline-none cursor-pointer shrink-0
              ${theme.bgSecondary} ${theme.text} ${theme.border}`}>
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name A-Z</option>
          </select>

          {['All', 'Electronics', 'Fashion', 'Sports',
            'Bags', 'Shoes', 'Accessories'].map(cat => (
            <button key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm
                font-medium whitespace-nowrap shrink-0
                transition-colors border
                ${activeCategory === cat
                  ? 'bg-blue-500 text-white border-blue-500'
                  : `${theme.bgSecondary} ${theme.text}
                     ${theme.border}`}`}>
              {cat}
            </button>
          ))}

          {(activeCategory !== 'All' || sortBy !== '') && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSortBy('');
              }}
              className="px-4 py-2 rounded-full text-sm
                text-red-500 border border-red-300
                whitespace-nowrap shrink-0
                hover:bg-red-50 transition-colors flex
                items-center gap-1">
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 md:px-16 py-8">
        <p className={`text-sm mb-6 ${theme.textSecondary}`}>
          Showing {filteredProducts.length} results
          {activeCategory !== 'All' && ` in "${activeCategory}"`}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center
            justify-center py-24 text-center">
            <PackageSearch size={64}
              className="text-gray-300 mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>
              No Products Found
            </h3>
            <p className={theme.textSecondary}>
              Try changing your filters
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSortBy('');
              }}
              className="mt-4 bg-blue-500 text-white
                px-6 py-2 rounded-full text-sm font-medium">
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3
              lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
