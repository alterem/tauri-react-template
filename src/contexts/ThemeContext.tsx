import { createContext, useContext, useState, ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';

interface ThemeContextType {
  currentTheme: 'light' | 'dark';
  toggleTheme: (checked: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};