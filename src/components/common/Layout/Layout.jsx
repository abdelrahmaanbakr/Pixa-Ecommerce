import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Breadcrumb from '../../ui/Breadcrumb';

const Layout = ({ children }) => {
  const location = useLocation();
  const showBreadcrumb = ![
    '/',
    '/home'
  ].includes(location.pathname) && !location.pathname.startsWith('/product/');

  return (
    <>
      <Header />
      {showBreadcrumb && <Breadcrumb />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
