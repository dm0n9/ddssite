// app/contacts/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import styles from './contacts.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { contactsTexts } from './lang';

export default function ContactsPage() {
  const { currentLang } = useLanguage();

  const uiTexts = {
    btn_home: { 
      ru: "Вернуться на главную", 
      en: "Back to Home", 
      cn: "返回首页" 
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <section className={styles.section}>
        {/* Главный стандартный контейнер сайта, удерживающий контент в рамках 1200px */}
        <div className={styles.container}>
          
          {/* Заголовок страницы */}
          <h1 className={styles.title}>{contactsTexts.title[currentLang]}</h1>
          <p className={styles.Conttext}>
            {contactsTexts.description[currentLang]}
          </p>

          {/* Сетка с контактной информацией */}
          <div className={styles.grid}>
            
            {/* Блок 1: Адрес */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{contactsTexts.address_title[currentLang]}</h2>
              <p className={styles.cardText}>
                {contactsTexts.company_name[currentLang]}, <br />
                {contactsTexts.address_part1[currentLang]} <br />
                {contactsTexts.address_part2[currentLang]}
              </p>
            </div>
            
            {/* Блок 2: Телефон */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{contactsTexts.phone_title[currentLang]}</h2>
              <p className={styles.cardText}>
                 <br /> 
                <a href="tel:+73843991214" className={styles.link}>(3843) 99-12-14</a>
                 <br />
                <a href="tel:+73843720040" className={styles.link}>(3843) 72-00-40</a>
              </p>
            </div>
            
            {/* Блок 3: Email */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{contactsTexts.email_title[currentLang]}</h2>
              <p className={styles.cardText}>
                {contactsTexts.email_desc[currentLang]} <br />
                <a href="mailto:dds@dds-nk.ru" className={styles.link}>dds@dds-nk.ru</a>
                <br /><br />
              </p>
            </div>
            
          </div>

          {/* Интерактивная карта 2ГИС */}
          <div className={styles.mapWrapper}>
            <h2 className={styles.mapTitle}>{contactsTexts.map_title[currentLang]}</h2>
            <div className={styles.mapContainer}>
              <iframe
                src="https://go.2gis.com/gtHLT"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen={true}
                title="2GIS Map"
              />
            </div>
          </div>

          {/*Кнопка возврата на главную */}
          <div className={styles.buttonWrapper}>
            <Link href="/" className={styles.btnHome}>
              {uiTexts.btn_home[currentLang]}
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}