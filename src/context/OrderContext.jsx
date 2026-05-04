import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

const loadOrders = () => {
  try {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(loadOrders);

  const addOrder = (orderData) => {
    const newOrder = {
      id: `#ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      items: [...orderData.items],
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      address: {
        fullName: orderData.address.fullName,
        phone: orderData.address.phone,
        address: orderData.address.address,
        city: orderData.address.city,
        postalCode: orderData.address.postalCode
      },
      status: 'Processing'
    };

    setOrders((prev) => {
      const nextOrders = [newOrder, ...prev];
      saveOrders(nextOrders);
      return nextOrders;
    });

    return newOrder;
  };

  const getOrders = () => orders;

  const clearOrders = () => {
    setOrders([]);
    saveOrders([]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrders, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
