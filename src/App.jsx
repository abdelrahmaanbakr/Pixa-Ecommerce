import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { ROUTES } from './constants/routes';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyAddressesPage from './pages/MyAddressesPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/common/Navbar';
import ScrollToTop from './components/ui/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { OrderProvider } from './context/OrderContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

const AppContent = () => {
  const location = useLocation();
  const publicAuthRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.FORGOT_PASSWORD];
  const showNavbar = location.pathname !== ROUTES.SPLASH && !publicAuthRoutes.includes(location.pathname) && location.pathname !== ROUTES.CHECKOUT && !location.pathname.startsWith('/product');
  const { theme } = useTheme();

  return (
    <div className={`w-full min-h-[100dvh] relative flex flex-col font-poppins ${theme.bg} ${theme.text} transition-colors duration-300`}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: '10px',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
          },
          success: {
            style: {
              background: '#4A90E2',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#4A90E2',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
        }}
      />
      {showNavbar && <Navbar />}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path={ROUTES.SPLASH} element={<SplashPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={ROUTES.HOME} element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path={ROUTES.SEARCH} element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
            <Route path={ROUTES.CART} element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path={ROUTES.CHECKOUT} element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path={ROUTES.WISHLIST} element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            <Route path={ROUTES.PROFILE} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path={ROUTES.MY_ORDERS} element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
            <Route path={ROUTES.MY_ADDRESSES} element={<ProtectedRoute><MyAddressesPage /></ProtectedRoute>} />
            <Route path={ROUTES.PAYMENT_METHODS} element={<ProtectedRoute><PaymentMethodsPage /></ProtectedRoute>} />
            <Route path={ROUTES.PRODUCT_DETAIL} element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <ScrollToTop />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <OrderProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <AppContent />
              </Router>
            </WishlistProvider>
          </CartProvider>
        </OrderProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
