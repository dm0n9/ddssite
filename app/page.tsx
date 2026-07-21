"use client";
import Link from 'next/link';
import Image from 'next/image'
import { useState } from "react"; 
import styles from '@/app/Home.module.css';
import { Carousel } from '@/app/Carousel/Carousel'


export default function Home() {
  const [currentLang, setCurrentLang] = useState<"ru" | "en" | "cn">("ru");
      
      const uiTexts = {
      btn_more: { ru: "Подробнее", en: "Details", cn: "详情" },
      btn_close: { ru: "Закрыть", en: "Close", cn: "关闭" },
      specs_title: { ru: "Область применения", en: "Application Area", cn: "应用领域" },
      table_title: { ru: "Технические характеристики", en: "Technical Specifications", cn: "技术参数" },
      th_param: { ru: "Наименование параметра", en: "Parameter Name", cn: "参数名称" },
      th_value: { ru: "Значение", en: "Value", cn: "数值" },
      // ПЕРЕВОДЫ ДЛЯ НОВОЙ ШАПКИ
      menu_home: { ru: "На главную", en: "Home", cn: "首页" },
      menu_about: { ru: "О нас", en: "About Us", cn: "关于我们" },
      menu_products: { ru: "Продукция", en: "Products", cn: "产品中心" },
      menu_support: { ru: "Сервисная поддержка", en: "Service Support", cn: "售后支持" },
      menu_docs: { ru: "Документация", en: "Documentation", cn: "技术文档" },
      menu_contacts: { ru: "Наши контакты", en: "Contacts", cn: "联系我们" }
    };
  return (
    <>
      

      <main>

        {/* СЛАЙД 1 — ГЛАВНЫЙ ЭКРАН (HERO) */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <p className={styles.heroTagline}>Промышленная автоматизация</p>

              <h1 className={styles.heroTitle}>
                Проектируем будущее технологических процессов
              </h1>

              <p className={styles.heroDescription}>
                Разработка, модернизация и комплексное обслуживание интеллектуальных систем
                управления и промышленного оборудования автоматизации для предприятий любого
                масштаба.
              </p>

              <div className={styles.heroActions}>
                <Link href="/products" className={styles.btnPrimary}>Наша продукция</Link>
                <Link href="/contacts" className={styles.btnSecondary}>Связаться с нами</Link>
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
                <span className={styles.eyebrow}>О компании</span>
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>
                  15 лет опыта в промышленной автоматизации
                </h2>
                <p>
                     ООО "Девис Дерби Сибирь" является дочерней компанией британской компании Davis Derby Ltd и занимается продажей и поддержкой систем управления, мониторинга и автоматизации для горнодобывающей и обогатительной отрасли промышленности в России и странах СНГ. Компания была основана в 2007 году и имеет штаб-квартиру в г.Новокузнецке.
   В качестве дочерней компании Davis Derby Ltd, ООО "Девис Дерби Сибирь" наследует высокий уровень качества продукции и сервиса, который отличает бренд Davis Derby. Компания имеет множество клиентов по всей России и странам СНГ и продолжает развиваться и укреплять свои позиции на рынке систем управления и мониторинга для горнодобывающей промышленности.
                </p>

                <div className={styles.statsRow}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>15+</span>
                    <span className={styles.statLabel}>лет на рынке</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>200+</span>
                    <span className={styles.statLabel}>реализованных проектов</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>24/7</span>
                    <span className={styles.statLabel}>сервисная поддержка</span>
                  </div>
                </div>
              </div>

              <div className={styles.aboutImageWrapper}>
                <Image
                  src="/photo_2026-07-21_14-00-35.jpg"
                  width={580}
                  height={440}
                  alt="О компании DDS"
                  className={styles.aboutImg}
                />
              </div>
            </div>
          </div>
        </section>

        {/* СЛАЙД 4 — ВИТРИНА ТОВАРОВ (содержимое карточек не менялось) */}
        <section id="products" className={`${styles.slide} ${styles.slide_white}`}>
          <div className={styles.container}>
            <div className={styles.slide_inner}>
              <div className={styles.sectionHead}>
                <span className={styles.eyebrow}>Продукция</span>
                <h2 className={styles.sectionTitle}>Наша продукция</h2>
                <p className={styles.sectionSubtitle}>
                  Высокотехнологичные решения, разработанные по международным стандартам
                  качества.
                </p>
              </div>

              <div className={styles.cards_grid}>

                <div className={styles.card_item}>
                  <div className={styles.card_top_info}>
                    <div className={styles.card_image}>
                      <img src="/SGA_1.png" alt="Газоанализатор" width={110} height={180} />
                    </div>
                    <h3 className={styles.card_title}>Газоанализатор</h3>
                  </div>
                  <Link href="http://localhost:3000/minewatch?product=sga" className={styles.btn_more_full}>Подробнее</Link>
                </div>

                <div className={styles.card_item}>
                  <div className={styles.card_top_info}>
                    <div className={styles.card_image}>
                      <img src="/tablet.png" alt="Товар 2" width={170} height={180} />
                    </div>
                    <h3 className={styles.card_title}>Планшет</h3>
                  </div>
                  <Link href="http://localhost:3000/minewatch?product=tablet" className={styles.btn_more_full}>Подробнее</Link>
                </div>

                <div className={styles.card_item}>
                  <div className={styles.card_top_info}>
                    <div className={styles.card_image}>
                      <img src="/ri.png" width={170} height={180} alt="Товар 3" />
                    </div>
                    <h3 className={styles.card_title}>Расходометр</h3>
                  </div>
                  <Link href="http://localhost:3000/minewatch?product=flowmeter" className={styles.btn_more_full}>Подробнее</Link>
                </div>

                <div className={styles.card_item}>
                  <div className={styles.card_top_info}>
                    <div className={styles.card_image}>
                      <img src="/products/shep_01.png" alt="Товар 4" />
                    </div>
                    <h3 className={styles.card_title}>ШЭП-01</h3>
                  </div>
                  <Link href="http://localhost:3000/minewatch?product=shep-01" className={styles.btn_more_full}>Подробнее</Link>
                </div>

                <div className={styles.card_item}>
                  <div className={styles.card_top_info}>
                    <div className={styles.card_image}>
                      <img src="/products/wipan_1.jpg" alt="Товар 5" />
                    </div>
                    <h3 className={styles.card_title}>WiPAN</h3>
                  </div>
                  <Link href="http://localhost:3000/minewatch?product=wipan" className={styles.btn_more_full}>Подробнее</Link>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* СЛАЙД 5 — НОВОСТИ КОМПАНИИ */}
        <section className={`${styles.slide} ${styles.slide_soft}`}>
          <div className={styles.container}>
            <div className={styles.slide_inner}>
              <div className={styles.sectionHead}>
                <span className={styles.eyebrow}>Новости</span>
                <h2 className={styles.sectionTitle}>Новости компании</h2>
                <p className={styles.sectionSubtitle}>
                  События, обновления линеек продукции и важные объявления.
                </p>
              </div>

              <div className={styles.newsGrid}>
                <article className={styles.newsCard}>
                  <img
                    src="https://placehold.co/600x400/eaf4fd/2f8fdd?text=Новости"
                    alt="ШАХТНЫЙ ЭЛЕКТРОИЗМЕРИТЕЛЬНЫЙ ПРИБОР ШЭП-01"
                    className={styles.newsImage}
                  />
                  <div className={styles.newsContent}>
                    {/* <div className={styles.newsDate}>Июнь 2026</div>*/}
                    <h3 className={styles.newsTitle}>ШАХТНЫЙ ЭЛЕКТРОИЗМЕРИТЕЛЬНЫЙ ПРИБОР ШЭП-01</h3>
                    <p className={styles.newsDesc}>
                      Универсальный контрольно-измерительный прибор.
                    </p>
                  </div>
                </article>

                <article className={styles.newsCard}>
                  <img
                    src="https://placehold.co/600x400/eaf4fd/2f8fdd?text=Новости"
                    alt="ДАТЧИК УРОВНЯ ДУИ"
                    className={styles.newsImage}
                  />
                  <div className={styles.newsContent}>
                     {/*<div className={styles.newsDate}>Май 2026</div>*/}
                    <h3 className={styles.newsTitle}>ДАТЧИК УРОВНЯ ДУИ</h3>
                    <p className={styles.newsDesc}>
                      Для контроля уровня веществ, обладающих электропроводностью.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}