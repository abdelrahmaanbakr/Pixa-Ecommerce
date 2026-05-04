import React, { createContext, useEffect, useState, useContext } from 'react';

export const lightTheme = {
  bg: "bg-white",
  bgSecondary: "bg-gray-100",
  bgCard: "bg-white",
  text: "text-gray-900",
  textSecondary: "text-gray-500",
  border: "border-gray-200",
  navBg: "bg-white",
  input: "bg-gray-100",
  sidebar: "bg-white",
  card: "bg-white border border-gray-200",
  menuItem: "bg-gray-50 border border-gray-200",
}

export const darkTheme = {
  bg: "bg-[#0D0D0D]",
  bgSecondary: "bg-[#1A1A2E]",
  bgCard: "bg-[#1A1A2E]",
  text: "text-white",
  textSecondary: "text-gray-400",
  border: "border-gray-700",
  navBg: "bg-[#1A1A2E]",
  input: "bg-[#2A2A3E]",
  sidebar: "bg-[#1A1A2E]",
  card: "bg-[#1A1A2E] border border-gray-700",
  menuItem: "bg-[#1A1A2E] border border-gray-700",
}

const ThemeContext = createContext();

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDark(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
