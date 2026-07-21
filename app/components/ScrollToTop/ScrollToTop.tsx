"use client";

import React, { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Следим за скроллом страницы
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Обязательно удаляем обработчик при размонтировании
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Функция плавной прокрутки наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
      aria-label="Прокрутить вверх"
    >
      {/* Простая и легкая SVG-стрелочка внутри круга */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2.5} 
        stroke="currentColor" 
        className={styles.icon}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}