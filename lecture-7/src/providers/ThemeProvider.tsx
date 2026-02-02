import { createContext, useEffect, useState, Dispatch, ReactNode, SetStateAction } from 'react';

const THEME_STORAGE_KEY = 'theme';

const IS_DARK_THEME_PREFERRED_QUERY = '(prefers-color-scheme: dark)';

type Theme = 'light' | 'dark';

type ThemeContext = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContext | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const isDarkPreferred = window.matchMedia(IS_DARK_THEME_PREFERRED_QUERY).matches;
    return (storedTheme as Theme) ?? (isDarkPreferred ? 'dark' : 'light');
  });

  const handlePreferredThemeChange = () => {
    const isDarkPreferred = window.matchMedia(IS_DARK_THEME_PREFERRED_QUERY).matches;
    setTheme(isDarkPreferred ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  }, [theme]);

  useEffect(() => {
    const darkModePrefference = window.matchMedia(IS_DARK_THEME_PREFERRED_QUERY);
    darkModePrefference.addEventListener('change', handlePreferredThemeChange);

    return () => darkModePrefference.removeEventListener('change', handlePreferredThemeChange);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
