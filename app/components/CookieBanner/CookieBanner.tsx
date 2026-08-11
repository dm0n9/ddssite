'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // <--- Импортируем Link
import { getCookie, setCookie } from '@/app/lib/cookies';
import styles from './CookieBanner.module.css';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookie_consent', 'true', 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.text}>
          Мы используем файлы cookie для персональной настройки отображения 
           и улучшения работы сайта. Продолжая использовать сайт,вы соглашаетесь с нашей{' '}
          <Link href="/privacy" className={styles.link}>
             политикой конфиденциальности
          </Link>.
        </p>
        <button onClick={handleAccept} className={styles.button}>
          ОК
        </button>
      </div>
    </div>
  );
};