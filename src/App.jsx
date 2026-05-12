import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { ROUTES } from './constants/routes';
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
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/common/Layout';
import ScrollToTop from './components/ui/ScrollToTop';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { OrderProvider } from './context/OrderContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

const AppContent = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const hideLayout = ['/', '/splash'].includes(location.pathname);

  const pageRoutes = (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.SPLASH} element={<SplashPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.MY_ORDERS} element={<MyOrdersPage />} />
        <Route path={ROUTES.MY_ADDRESSES} element={<MyAddressesPage />} />
        <Route path={ROUTES.PAYMENT_METHODS} element={<PaymentMethodsPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );

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
      {!hideLayout ? (
        <Layout>
          {pageRoutes}
        </Layout>
      ) : (
        <main className="flex-1 flex flex-col">
          {pageRoutes}
        </main>
      )}
      <ScrollToTop />
    </div>
  );
};

const App = () => {
  return (
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
  );
};

export default App;
