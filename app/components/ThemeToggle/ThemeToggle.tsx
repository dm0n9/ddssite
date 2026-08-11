'use client';

import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '@/app/lib/cookies';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // При загрузке читаем сохраненную тему из cookie
    const savedTheme = getCookie('theme_preference') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    
    // Применяем тему на <html> теге
    document.documentElement.setAttribute('data-theme', nextTheme);
    
    // Сохраняем тему в cookie на 365 дней
    setCookie('theme_preference', nextTheme, 365);
  };

  return (
    <button onClick={toggleTheme} style={{ padding: '8px 16px', cursor: 'pointer' }}>
      {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
    </button>
  );
};