// app/contacts/page.tsx
import React from 'react';
import Link from 'next/link';
import styles from './contacts.module.css';

export default function ContactsPage() {
  return (
    <main className={styles.pageWrapper}>
      <section className={styles.section}>
        {/* Главный стандартный контейнер сайта, удерживающий контент в рамках 1200px */}
        <div className={styles.container}>
          
          {/* Заголовок страницы */}
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.Conttext}> Мы обеспечиваем надежную послепродажную поддержку и обслуживание оборудования.

Если вам необходимо обслуживание или техническая поддержка, обращайтесь в наш офис в г. Новокузнецк. </p>
          {/* Сетка с контактной информацией */}
          <div className={styles.grid}>
            
            {/* Блок 1: Адрес */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Наш адрес</h2>
              <p className={styles.cardText}>
                ООО "Девис Дерби Сибирь", <br />
                654027, Кемеровская обл. <br />
                г.Новокузнецк, ул. Сибиряков-Гвардейцев 2, оф. 32.15
              </p>
            </div>
            
            {/* Блок 2: Телефон */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Телефон</h2>
              <p className={styles.cardText}>
                 <br /> 
                <a href="tel:(3843) 99-12-14" className={styles.link}>(3843) 99-12-14</a>
                                 <br></br>
                <a href="tel:(3843) 72-00-40" className={styles.link}>(3843) 72-00-40</a>
              </p>
            </div>
            
            {/* Блок 3: Email */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Электронная почта</h2>
              <p className={styles.cardText}>
                По всем вопросам: <br />
                <a href="dds@dds-nk.ru" className={styles.link}>dds@dds-nk.ru</a>
                <br /><br />
                
              </p>
            </div>
            
          </div>

          {/* Интерактивная карта 2ГИС */}
          <div className={styles.mapWrapper}>
            <h2 className={styles.mapTitle}>Мы на карте</h2>
            <div className={styles.mapContainer}>
              <iframe
                /* ЗАМЕНИ ССЫЛКУ НИЖЕ НА СВОЙ СГЕНЕРИРОВАННЫЙ СРЦ ИЗ 2ГИС */
                src="https://widgets.2gis.com/widget?type=firms&options=%7B%22pos%22%3A%7B%22lat%22%3A55.755814%2C%22lon%22%3A37.617635%2C%22zoom%22%3A16%7D%2C%22id%22%3A%2270000001025623916%22%7D"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen={true}
                title="2GIS Map"
              />
            </div>
          </div>

          {/* Никаких кавычек в стилях! Кнопка возврата на главную */}
          <div className={styles.buttonWrapper}>
            <Link href="/" className={styles.btnHome}>
              Вернуться на главную
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}