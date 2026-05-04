import React from 'react';
import { Bell, ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className="header flex gap-4 p-4">
      <Bell size={22} className="text-gray-700 dark:text-white" />
      <ShoppingCart size={22} className="text-gray-700 dark:text-white" />
    </header>
  );
};

export default Header;
