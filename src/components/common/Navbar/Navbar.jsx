import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import {
  Menu,
  Search,
  Heart,
  ShoppingCart,
  Sun,
  Moon,
  Home,
  Tag,
  Star,
  Info,
  Phone,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  Laptop,
  Shirt,
  Dumbbell,
  ShoppingBag,
  Watch,
  Footprints,
  Sparkles,
  Compass,
  User,
  X
} from 'lucide-react';
import logo from '../../../assets/images/Logo.png';

const Navbar = ({ placement = 'all' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme, theme } = useTheme();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <>
      {(placement === 'all' || placement === 'header') && (
        <>
          <header className={`hidden md:flex w-full items-center 
            justify-between px-10 py-4 sticky top-0 z-50
            ${theme.navBg} border-b ${theme.border}
            shadow-sm`}>

            {/* LEFT: Logo */}
            <div className="flex items-center gap-10">
              <img 
                src={logo} 
                alt="logo"
                className="h-8 w-auto cursor-pointer"
                onClick={() => navigate('/home')}
              />

              {/* Nav Links */}
              <nav className="flex items-center gap-6">
                {[
                  { label: 'Home', path: '/home' },
                  { label: 'Products', path: '/products' },
                  { label: 'Categories', path: '/categories' },
                  { label: 'About', path: '/about' },
                  { label: 'Contact', path: '/contact' },
                ].map(link => (
                  <button key={link.label}
                    onClick={() => navigate(link.path)}
                    className={`text-sm font-medium transition-colors
                      hover:text-blue-500
                      ${location.pathname === link.path
                        ? 'text-blue-500'
                        : theme.text}`}>
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* RIGHT: Search + Icons */}
            <div className="flex items-center gap-4">

              {/* Search Bar */}
              <div className={`flex items-center gap-2 px-4 py-2
                rounded-full ${theme.bgSecondary} 
                border ${theme.border} w-52
                focus-within:border-blue-500 transition-colors`}>
                <Search size={16} className={theme.textSecondary} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/search?q=${searchQuery}`)
                      setSearchQuery('')
                    }
                  }}
                  className={`bg-transparent outline-none text-sm
                    w-full ${theme.text} placeholder-gray-400`}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}>
                    <X size={14} className={theme.textSecondary} />
                  </button>
                )}
              </div>

              {/* Theme Toggle */}
              <button onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors
                  hover:bg-gray-100/10`}>
                {isDark 
                  ? <Sun size={20} className="text-yellow-400" />
                  : <Moon size={20} className="text-gray-500" />}
              </button>

              {/* Wishlist */}
              <button onClick={() => navigate('/wishlist')}
                className="relative p-1">
                <Heart size={22} className={theme.text} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 
                    w-4 h-4 bg-red-500 text-white text-[10px]
                    font-bold rounded-full 
                    flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button onClick={() => navigate('/cart')}
                className="relative p-1">
                <ShoppingCart size={22} className={theme.text} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1
                    w-4 h-4 bg-blue-500 text-white text-[10px]
                    font-bold rounded-full
                    flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button onClick={() => navigate('/profile')}>
                <img
                  src="https://picsum.photos/seed/avatar/32/32"
                  alt="profile"
                  className="w-8 h-8 rounded-full 
                    border-2 border-blue-500 object-cover
                    hover:opacity-90 transition-opacity"
                />
              </button>
            </div>
          </header>

          <header className={`md:hidden flex w-full items-center 
            justify-between px-4 py-3 sticky top-0 z-50
            ${theme.navBg} border-b ${theme.border} shadow-sm`}>
            {/* LEFT: Hamburger */}
            <button onClick={() => setMenuOpen(true)}
              className="p-2">
              <Menu size={24} className={theme.text} />
            </button>

            {/* CENTER: Logo */}
            <img src={logo} alt="logo" className="h-7 w-auto cursor-pointer"
              onClick={() => navigate('/home')} />

            {/* RIGHT: Cart + Wishlist */}
            <div className="flex items-center gap-1">
              <button onClick={() => navigate('/wishlist')}
                className="relative p-2">
                <Heart size={22} className={theme.text} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4
                    bg-red-500 text-white text-[10px] font-bold
                    rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button onClick={() => navigate('/cart')}
                className="relative p-2">
                <ShoppingCart size={22} className={theme.text} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4
                    bg-blue-500 text-white text-[10px] font-bold
                    rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMenuOpen(false)}
                  className="md:hidden fixed inset-0 bg-black z-50"
                />

                {/* Slide from right */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className={`md:hidden fixed top-0 right-0
                    h-full w-72 z-50 ${theme.bgCard}
                    shadow-2xl flex flex-col`}>

                  {/* Header */}
                  <div className={`flex items-center justify-between
                    p-4 border-b ${theme.border}`}>
                    <img src={logo} alt="logo" className="h-7 w-auto" />
                    <button onClick={() => setMenuOpen(false)}>
                      <X size={24} className={theme.text} />
                    </button>
                  </div>

                  {/* Links */}
                  <div className="flex-1 py-4 overflow-y-auto">
                    {[
                      { label: 'Home', path: '/home', icon: Home },
                      { label: 'Products', path: '/products', icon: ShoppingBag },
                      { label: 'Categories', path: '/categories', icon: LayoutGrid },
                      { label: 'About', path: '/about', icon: Info },
                      { label: 'Contact', path: '/contact', icon: Phone },
                      { label: 'Cart', path: '/cart', icon: ShoppingCart },
                      { label: 'Wishlist', path: '/wishlist', icon: Heart },
                      { label: 'Profile', path: '/profile', icon: User },
                    ].map(({ label, path, icon: Icon }) => (
                      <button key={label}
                        onClick={() => {
                          navigate(path)
                          setMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-4
                          px-6 py-4 text-sm font-medium
                          hover:bg-blue-500/10 hover:text-blue-500
                          transition-colors text-left
                          border-b ${theme.border}
                          ${location.pathname === path
                            ? 'text-blue-500 bg-blue-500/10'
                            : theme.text}`}>
                        <Icon size={20} className={
                          location.pathname === path
                            ? 'text-blue-500'
                            : theme.textSecondary
                        } />
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Theme Toggle Bottom */}
                  <div className={`p-4 border-t ${theme.border}`}>
                    <button
                      onClick={toggleTheme}
                      className={`w-full flex items-center
                        justify-between px-4 py-3 rounded-xl
                        ${theme.bgSecondary}`}>
                      <span className={`text-sm font-medium ${theme.text}`}>
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                      </span>
                      <div className="flex items-center gap-2">
                        {isDark
                          ? <Moon size={18} className="text-blue-400" />
                          : <Sun size={18} className="text-yellow-500" />}
                        <div className={`w-11 h-6 rounded-full relative
                          transition-colors duration-300
                          ${isDark ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          <div className={`absolute top-1 w-4 h-4
                            rounded-full bg-white transition-all duration-300
                            ${isDark ? 'left-6' : 'left-1'}`} />
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Navbar;
