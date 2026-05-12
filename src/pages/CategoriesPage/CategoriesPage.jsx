import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
  Laptop,
  Shirt,
  Dumbbell,
  ShoppingBag,
  Footprints,
  Watch,
  ChevronRight
} from 'lucide-react';
import { mockData } from '../../data/mockData';
import ProductCard from '../../components/common/ProductCard';

const categories = [
  {
    label: 'Electronics',
    icon: Laptop,
    description: 'Latest gadgets and devices',
    count: '120+ Products',
    bg: 'from-blue-500 to-blue-400',
    lightBg: 'bg-blue-50',
    color: 'text-blue-500',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?w=400&auto=compress'
  },
  {
    label: 'Fashion',
    icon: Shirt,
    description: 'Trendy clothes for everyone',
    count: '200+ Products',
    bg: 'from-purple-500 to-purple-400',
    lightBg: 'bg-purple-50',
    color: 'text-purple-500',
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?w=400&auto=compress'
  },
  {
    label: 'Sports',
    icon: Dumbbell,
    description: 'Gear up for your workout',
    count: '80+ Products',
    bg: 'from-green-500 to-green-400',
    lightBg: 'bg-green-50',
    color: 'text-green-500',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?w=400&auto=compress'
  },
  {
    label: 'Bags',
    icon: ShoppingBag,
    description: 'Stylish bags for every occasion',
    count: '60+ Products',
    bg: 'from-orange-500 to-orange-400',
    lightBg: 'bg-orange-50',
    color: 'text-orange-500',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=400&auto=compress'
  },
  {
    label: 'Shoes',
    icon: Footprints,
    description: 'Step up your shoe game',
    count: '90+ Products',
    bg: 'from-red-500 to-red-400',
    lightBg: 'bg-red-50',
    color: 'text-red-500',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=400&auto=compress'
  },
  {
    label: 'Accessories',
    icon: Watch,
    description: 'Complete your look',
    count: '150+ Products',
    bg: 'from-yellow-500 to-yellow-400',
    lightBg: 'bg-yellow-50',
    color: 'text-yellow-600',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?w=400&auto=compress'
  },
];

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen font-poppins ${theme.bg}`}>
      <section className={`py-12 px-6 md:px-16
        bg-gradient-to-r from-blue-600 to-blue-400`}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold
              text-white mb-3">
            Shop by Category
          </motion.h1>
          <p className="text-blue-100">
            Find exactly what you're looking for
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2
        lg:grid-cols-3 gap-6 max-w-6xl mx-auto
        px-6 md:px-16 py-12">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => navigate(`/search?category=${cat.label}`)}
            className={`${theme.card} rounded-2xl overflow-hidden
              cursor-pointer shadow-sm hover:shadow-xl
              transition-all duration-300 group`}>
            <div className="relative h-48 overflow-hidden">
              <img src={cat.image} alt={cat.label}
                className="w-full h-full object-cover
                  transition-transform duration-500
                  group-hover:scale-110"
                onError={(e) => e.target.src =
                  `https://picsum.photos/seed/${cat.label}/400/200`}
              />
              <div className={`absolute inset-0
                bg-gradient-to-t from-black/60 to-transparent`} />

              <div className={`absolute top-3 right-3
                w-10 h-10 rounded-xl bg-white/90
                flex items-center justify-center shadow-md`}>
                <cat.icon size={20} className={cat.color} />
              </div>

              <span className="absolute bottom-3 left-3
                bg-white/90 text-gray-800 text-xs font-semibold
                px-3 py-1 rounded-full">
                {cat.count}
              </span>
            </div>

            <div className="p-4">
              <h3 className={`font-bold text-lg mb-1 ${theme.text}`}>
                {cat.label}
              </h3>
              <p className={`text-sm ${theme.textSecondary}`}>
                {cat.description}
              </p>
              <div className={`flex items-center gap-1 mt-3
                text-sm font-medium ${cat.color}`}>
                Shop Now
                <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {categories.map(cat => {
        const catProducts = mockData
          .filter(p => p.category === cat.label);
        if (catProducts.length === 0) return null;

        return (
          <section key={cat.label}
            className="py-10 px-6 md:px-16 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl
                  ${cat.lightBg} flex items-center justify-center`}>
                  <cat.icon size={20} className={cat.color} />
                </div>
                <h2 className={`text-xl font-bold ${theme.text}`}>
                  {cat.label}
                </h2>
              </div>
              <button
                onClick={() => navigate('/search')}
                className={`text-sm font-medium ${cat.color}
                  flex items-center gap-1`}>
                See All <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {catProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CategoriesPage;
