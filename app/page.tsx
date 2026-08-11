// app/page.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/Home.module.css';
import { Carousel } from '@/app/Carousel/Carousel';
import { useLanguage } from '@/app/context/LanguageContext';
import { homePageTexts } from './lang';

export default function Home() {
  const { currentLang } = useLanguage();
      
  return (
    <main>
      {/* СЛАЙД 1 — ГЛАВНЫЙ ЭКРАН (HERO) */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <p className={styles.heroTagline}>{homePageTexts.hero.tagline[currentLang]}</p>

            <h1 className={styles.heroTitle}>
              {homePageTexts.hero.title[currentLang]}
            </h1>

            <p className={styles.heroDescription}>
              {homePageTexts.hero.desc[currentLang]}
            </p>

            <div className={styles.heroActions}>
              <Link href="/products" className={styles.btnPrimary}>
                {homePageTexts.hero.btn_products[currentLang]}
              </Link>
              <Link href="/contacts" className={styles.btnSecondary}>
                {homePageTexts.hero.btn_contacts[currentLang]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* СЛАЙД 2 — СЛАЙДЕР / КАРУСЕЛЬ */}
      <section className={styles.sliderSlide}>
        <Carousel />
      </section>

      {/* СЛАЙД 3 — О КОМПАНИИ */}
      <section id="about" className={`${styles.slide} ${styles.slide_soft}`}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.eyebrow}>{homePageTexts.about.eyebrow[currentLang]}</span>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>
                {homePageTexts.about.title[currentLang]}
              </h2>
              <p>
                {homePageTexts.about.desc[currentLang]}
              </p>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>15+</span>
                  <span className={styles.statLabel}>{homePageTexts.about.stat1_label[currentLang]}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>200+</span>
                  <span className={styles.statLabel}>{homePageTexts.about.stat2_label[currentLang]}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>24/7</span>
                  <span className={styles.statLabel}>{homePageTexts.about.stat3_label[currentLang]}</span>
                </div>
              </div>
            </div>

            <div className={styles.aboutImageWrapper}>
              <Image
                src="/team.png"
                width={700}
                height={440}
                alt={homePageTexts.about.alt_image[currentLang]}
                className={styles.aboutImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* СЛАЙД 4 — ВИТРИНА ТОВАРОВ */}
      <section id="products" className={`${styles.slide} ${styles.slide_white}`}>
        <div className={styles.container}>
          <div className={styles.slide_inner}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>{homePageTexts.products_section.eyebrow[currentLang]}</span>
              <h2 className={styles.sectionTitle}>{homePageTexts.products_section.title[currentLang]}</h2>
              <p className={styles.sectionSubtitle}>
                {homePageTexts.products_section.subtitle[currentLang]}
              </p>
            </div>

            <div className={styles.cards_grid}>
              {homePageTexts.products_section.items.map((item) => (
                <div key={item.id} className={styles.card_item}>
                  <div className={styles.card_top_info}>
                    <div className={styles.card_image}>
                      <img 
                        src={item.img} 
                        alt={item.title[currentLang]} 
                        width={item.imgWidth} 
                        height={item.imgHeight} 
                      />
                    </div>
                    <h3 className={styles.card_title}>{item.title[currentLang]}</h3>
                  </div>
                  <Link href={item.link} className={styles.btn_more_full}>
                    {homePageTexts.products_section.btn_more[currentLang]}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* СЛАЙД 5 — НОВОСТИ КОМПАНИИ */}
      <section className={`${styles.slide} ${styles.slide_soft}`}>
        <div className={styles.container}>
          <div className={styles.slide_inner}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>{homePageTexts.news_section.eyebrow[currentLang]}</span>
              <h2 className={styles.sectionTitle}>{homePageTexts.news_section.title[currentLang]}</h2>
              <p className={styles.sectionSubtitle}>
                {homePageTexts.news_section.subtitle[currentLang]}
              </p>
            </div>

            <div className={styles.newsGrid}>
              {homePageTexts.news_section.items.map((news) => (
                <article key={news.id} className={styles.newsCard}>
                  <img
                    src={news.img}
                    alt={news.title[currentLang]}
                    className={styles.newsImage}
                  />
                  <div className={styles.newsContent}>
                    <h3 className={styles.newsTitle}>{news.title[currentLang]}</h3>
                    <p className={styles.newsDesc}>
                      {news.desc[currentLang]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}