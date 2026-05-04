import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { Compass, ShoppingCart, Home, Heart, User, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme, theme } = useTheme();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navItems = [
    { path: '/search', label: 'Explore', icon: Compass, badge: 0 },
    { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: cartCount },
    { path: '/home', label: 'Home', icon: Home, badge: 0 },
    { path: '/wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { path: '/profile', label: 'Profile', icon: User, badge: 0 },
  ];

  return (
    <>
      {/* 1. Desktop Top Nav */}
      <div className={`hidden md:flex sticky top-0 z-50 w-full h-16 ${theme.navBg} border-b ${theme.border} px-4 md:px-8 lg:px-16 items-center justify-between font-poppins shadow-sm transition-colors duration-300`}>
        {/* Left: Logo */}
        <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/home')}>
          <img src="src\assets\images\Logo.png" alt="" />
        </div>

        {/* Center: Links */}
        <div className="flex gap-8 font-semibold text-sm">
          <button 
            onClick={() => navigate('/home')} 
            className={`${location.pathname==='/home' ? 'text-[#4A90E2] font-bold' : `${theme.textSecondary} hover:text-blue-500`} transition-colors`}
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/search')} 
            className={`${location.pathname==='/search' ? 'text-[#4A90E2] font-bold' : `${theme.textSecondary} hover:text-blue-500`} transition-colors`}
          >
            Explore
          </button>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/wishlist')} className="relative transition-transform active:scale-95 group">
             {wishlistCount > 0 && <span className={`absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 ${theme.border}`}>{wishlistCount}</span>}
             <Heart size={22} className={`group-hover:text-red-500 transition-colors ${theme.text}`} />
          </button>
          <button onClick={() => navigate('/cart')} className="relative transition-transform active:scale-95 group">
             {cartCount > 0 && <span className={`absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 ${theme.border}`}>{cartCount}</span>}
             <ShoppingCart size={22} className={`group-hover:text-[#4A90E2] transition-colors ${theme.text}`} />
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDark
                ? 'bg-yellow-400/10 hover:bg-yellow-400/20'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark
              ? <Sun size={20} className="text-yellow-400" />
              : <Moon size={20} className="text-gray-600" />
            }
          </button>
          <button onClick={() => navigate('/profile')} className="ml-2 border-2 border-transparent hover:border-[#4A90E2] rounded-full transition-all active:scale-95">
             <img src="https://picsum.photos/seed/avatar/32/32" alt="Avatar" className="w-8 h-8 rounded-full" />
          </button>
        </div>
      </div>

      {/* 2. Mobile Bottom Nav */}
      <div className={`flex md:hidden fixed bottom-0 z-50 left-0 right-0 w-full h-[70px] ${theme.navBg} border-t ${theme.border} justify-around items-center font-poppins px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-5px_15px_rgba(0,0,0,0.05)] transition-colors duration-300`}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => item.action ? item.action() : navigate(item.path)}
              className="flex flex-col items-center justify-center w-14 h-full transition-colors active:scale-95 pt-2 relative"
            >
              <div className={`flex items-center justify-center transition-all duration-300 relative ${isActive ? 'w-12 h-10 rounded-full bg-[#4A90E2] shadow-[0_4px_10px_rgba(74,144,226,0.5)]' : 'w-10 h-10'}`}>
                <span className={isActive ? 'transform scale-110' : ''}>
                  <item.icon size={22} className={isActive ? "text-white" : theme.textSecondary} />
                </span>
                
                {/* Badge */}
                {item.badge > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white`}>
                    {item.badge}
                  </span>
                )}
              </div>
              {!isActive && (
                <span className={`text-[10px] font-medium leading-none mt-1 ${theme.textSecondary}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
