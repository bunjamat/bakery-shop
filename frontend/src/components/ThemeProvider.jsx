'use client';

import { useTheme } from '@/theme/themeStore';
import { useEffect } from 'react';

export default function ThemeProvider({ children }) {
  const darkMode = useTheme((state) => state.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return children;
}