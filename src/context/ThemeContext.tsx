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

const lightTheme = {
	borderRadius: '5px',
	palette: {
		common: {
			black: '#222831',
			white: '#ffffff',
		},
		primary: {
			main: '#76d275',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#28224b',
			contrastText: '#ffffff',
		},
	},
	typography: {
		h1: {
			fontSize: '2rem',
		},
	},
	body: '#f5fbfc',
	text: '#28224b',
	shape: '#ffffff',
};

const darkTheme = {
	borderRadius: '5px',
	palette: {
		common: {
			black: '#222831',
			white: '#ffffff',
		},
		primary: {
			main: '#76d275',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#28224b',
			contrastText: '#ffffff',
		},
	},
	typography: {
		h1: {
			fontSize: '2rem',
		},
	},
	body: '#28224b',
	text: '#ffffff',
	shape: '#3a3f6a',
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
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
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const currentTheme = theme === Theme.LIGHT ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}; 