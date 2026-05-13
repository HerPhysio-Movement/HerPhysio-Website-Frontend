import { createContext, useContext, useEffect, useState } from 'react';

const themes = {
  light: {
    name: 'Light',
    colors: {
      background: '#f9fafb',
      card: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      primary: '#fd90a7',
      primaryHover: '#f77997',
      sidebarBg: '#ffffff',
      headerBg: '#ffffff',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '#111827',
      card: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#9ca3af',
      border: '#374151',
      primary: '#fd90a7',
      primaryHover: '#f77997',
      sidebarBg: '#1f2937',
      headerBg: '#1f2937',
    },
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved && themes[saved] ? saved : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    const themeColors = themes[currentTheme].colors;
    Object.entries(themeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }, [currentTheme]);

  const setTheme = (themeName) => {
    if (themes[themeName]) setCurrentTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};