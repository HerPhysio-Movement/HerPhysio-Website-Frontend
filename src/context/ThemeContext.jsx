import { createContext, useContext, useEffect, useState } from "react";

const themes = {
  light: {
    name: "Light",
    colors: {
      background: "#f9fafb",
      card: "#ffffff",
      text: "#1f2937",
      textSecondary: "#6b7280",
      border: "#e5e7eb",
      primary: "#fd90a7",
      primaryHover: "#f77997",
      sidebarBg: "#ffffff",
      headerBg: "#ffffff",
    },
  },
  dark: {
    name: "Dark",
    colors: {
      background: "#111827",
      card: "#1f2937",
      text: "#f9fafb",
      textSecondary: "#9ca3af",
      border: "#374151",
      primary: "#fd90a7",
      primaryHover: "#f77997",
      sidebarBg: "#1f2937",
      headerBg: "#1f2937",
    },
  },
  pink: {
    name: "Pink",
    colors: {
      background: "#fdf2f8",
      card: "#ffffff",
      text: "#1f2937",
      textSecondary: "#6b7280",
      border: "#fbcfe8",
      primary: "#ec4899",
      primaryHover: "#db2777",
      sidebarBg: "#ffffff",
      headerBg: "#ffffff",
    },
  },
  blue: {
    name: "Blue",
    colors: {
      background: "#eff6ff",
      card: "#ffffff",
      text: "#1f2937",
      textSecondary: "#6b7280",
      border: "#bfdbfe",
      primary: "#3b82f6",
      primaryHover: "#2563eb",
      sidebarBg: "#ffffff",
      headerBg: "#ffffff",
    },
  },
  green: {
    name: "Green",
    colors: {
      background: "#f0fdf4",
      card: "#ffffff",
      text: "#1f2937",
      textSecondary: "#6b7280",
      border: "#bbf7d0",
      primary: "#22c55e",
      primaryHover: "#16a34a",
      sidebarBg: "#ffffff",
      headerBg: "#ffffff",
    },
  },
  purple: {
    name: "Purple",
    colors: {
      background: "#faf5ff",
      card: "#ffffff",
      text: "#1f2937",
      textSecondary: "#6b7280",
      border: "#e9d5ff",
      primary: "#a855f7",
      primaryHover: "#9333ea",
      sidebarBg: "#ffffff",
      headerBg: "#ffffff",
    },
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved && themes[saved] ? saved : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    const themeColors = themes[currentTheme].colors;
    Object.entries(themeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }, [currentTheme]);

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};