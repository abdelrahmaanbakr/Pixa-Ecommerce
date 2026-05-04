import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const getInitialUser = () => {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);

  // TODO: Replace fake auth with real API calls when backend is ready
  // login: POST /api/auth/login
  // signup: POST /api/auth/register
  // logout: POST /api/auth/logout
  const login = (email, password) => {
    if (!email || password.length < 6) {
      return { success: false };
    }

    const name = email.split('@')[0] || 'User';
    const userData = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      avatar: `https://picsum.photos/seed/${encodeURIComponent(email)}/100/100`
    };

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const signup = (name, email, password) => {
    if (!name || !email || password.length < 6) {
      return { success: false };
    }

    const userData = {
      name,
      email,
      avatar: `https://picsum.photos/seed/${encodeURIComponent(email)}/100/100`
    };

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
