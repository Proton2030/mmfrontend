import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DefaultTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

interface ThemeContextType {
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const theme = isDarkTheme ? MD3DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext error');
  }
  return context;
};
