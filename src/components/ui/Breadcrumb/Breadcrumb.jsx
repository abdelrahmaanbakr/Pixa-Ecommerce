import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { ChevronRight, Home } from 'lucide-react';

const routeNames = {
  '/home': 'Home',
  '/products': 'Products',
  '/categories': 'Categories',
  '/search': 'Search',
  '/cart': 'Cart',
  '/wishlist': 'Wishlist',
  '/profile': 'Profile',
  '/about': 'About',
  '/contact': 'Contact',
  '/checkout': 'Checkout',
  '/my-orders': 'My Orders',
  '/my-addresses': 'My Addresses',
  '/payment-methods': 'Payment Methods',
};

const Breadcrumb = ({ productName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const crumbs = [
    { label: 'Home', path: '/home' },
  ];

  const currentPath = location.pathname;
  if (routeNames[currentPath]) {
    crumbs.push({
      label: routeNames[currentPath],
      path: currentPath
    });
  }

  if (productName) {
    crumbs.push({
      label: productName,
      path: null
    });
  }

  if (location.pathname === '/home') return null;

  return (
    <nav className={`px-6 md:px-16 py-3
      border-b ${theme.border} ${theme.bgSecondary} font-poppins`}>
      <div className="max-w-6xl mx-auto flex items-center
        gap-1 flex-wrap">
        {crumbs.map((crumb, index) => (
          <div key={crumb.path || crumb.label}
            className="flex items-center gap-1">
            {index === 0 && (
              <Home size={14} className="text-blue-500" />
            )}

            {index < crumbs.length - 1 ? (
              <button
                onClick={() => crumb.path &&
                  navigate(crumb.path)}
                className="text-sm text-blue-500
                  hover:underline transition-colors">
                {crumb.label}
              </button>
            ) : (
              <span className={`text-sm font-medium
                ${theme.text}`}>
                {crumb.label}
              </span>
            )}

            {index < crumbs.length - 1 && (
              <ChevronRight size={14}
                className={theme.textSecondary} />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
