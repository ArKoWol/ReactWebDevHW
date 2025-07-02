import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Type for CSS variables
type ThemeVariables = {
  [key: string]: string;
};

// Type for theme variables map
type ThemeVariablesMap = {
  [key in Theme]: ThemeVariables;
};

// Single theme object using CSS variables
const theme = {
  borderRadius: '5px',
  palette: {
    common: {
      black: 'var(--color-black)',
      white: 'var(--color-white)',
    },
    primary: {
      main: 'var(--color-primary)',
      contrastText: 'var(--color-primary-contrast)',
    },
    secondary: {
      main: 'var(--color-secondary)',
      contrastText: 'var(--color-secondary-contrast)',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
    },
  },
  body: 'var(--color-body)',
  text: 'var(--color-text)',
  shape: 'var(--color-shape)',
  error: 'var(--color-error)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  disabled: 'var(--color-disabled)',
  border: 'var(--color-border)',
  textSecondary: 'var(--color-text-secondary)',
};

// Theme variable values
const themeVariables: ThemeVariablesMap = {
  [Theme.LIGHT]: {
    '--color-black': '#222831',
    '--color-white': '#ffffff',
    '--color-primary': '#35b8be',
    '--color-primary-contrast': '#ffffff',
    '--color-secondary': '#28224b',
    '--color-secondary-contrast': '#ffffff',
    '--color-body': '#f5fbfc',
    '--color-text': '#28224b',
    '--color-shape': '#ffffff',
    '--color-error': '#d32f2f',
    '--color-success': '#388e3c',
    '--color-warning': '#f57c00',
    '--color-disabled': '#bdbdbd',
    '--color-border': '#e0e0e0',
    '--color-text-secondary': '#757575',
  },
  [Theme.DARK]: {
    '--color-black': '#1a1b26',
    '--color-white': '#ffffff',
    '--color-primary': '#7aa2f7',
    '--color-primary-contrast': '#1a1b26',
    '--color-secondary': '#bb9af7',
    '--color-secondary-contrast': '#1a1b26',
    '--color-body': '#1a1b26',
    '--color-text': '#c0caf5',
    '--color-shape': '#24283b',
    '--color-error': '#f7768e',
    '--color-success': '#9ece6a',
    '--color-warning': '#e0af68',
    '--color-disabled': '#787c99',
    '--color-border': '#545c7e',
    '--color-text-secondary': '#a9b1d6',
  },
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme as Theme;
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return Theme.DARK;
    }
    return Theme.LIGHT;
  });

  useEffect(() => {
    // Apply CSS variables to :root
    const variables = themeVariables[currentTheme];
    Object.entries(variables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}; 