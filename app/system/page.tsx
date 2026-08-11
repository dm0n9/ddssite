"use client";

import styles from "./system.module.css";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext"; // Поддержка мультиязычности, если используется в проекте

interface SystemItem {
  id: string;
  badge: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  image: string;
  features: Record<string, string[]>;
}

export default function SystemsPage() {
  // Допускаем использование контекста языка или фоллбек на 'ru'
  const { currentLang = "ru" } = useLanguage ? useLanguage() : { currentLang: "ru" };

  // Данные для 3 больших систем
  const systemsData: SystemItem[] = [
    {
      id: "system-1",
      badge: "Комплексное решение",
      title: {
        ru: "Автоматизированная система мониторинга безопасности",
        en: "Automated Safety Monitoring System",
      },
      desc: {
        ru: "Централизованный комплекс для непрерывного контроля технологических параметров, предотвращения аварийных ситуаций и оповещения персонала в режиме реального времени.",
        en: "Centralized complex for continuous monitoring of process parameters, accident prevention, and real-time personnel notification.",
      },
      image: "system_1.jpg", // Замените на реальный файл из public
      features: {
        ru: [
          "Круглосуточный сбор и анализ данных с датчиков",
          "Интеграция с существующей инфраструктурой предприятия",
          "Автоматическое включение систем аварийной защиты",
        ],
        en: [
          "24/7 sensor data collection and analysis",
          "Integration with existing facility infrastructure",
          "Automatic emergency protection activation",
        ],
      },
    },
    {
      id: "system-2",
      badge: "Диспетчеризация",
      title: {
        ru: "Система диспетчерского управления и связи",
        en: "Dispatch Control and Communication System",
      },
      desc: {
        ru: "Многофункциональная платформа для передачи текстовых и голосовых данных, точного позиционирования объектов и координации действий рабочих бригад.",
        en: "Multifunctional platform for voice and text data transmission, precise positioning, and crew coordination.",
      },
      image: "system_2.jpg",
      features: {
        ru: [
          "Высокая помехоустойчивость и надежность каналов связи",
          "Отображение местоположения объектов на интерактивной карте",
          "Запись и архив всех переговоров и телеметрии",
        ],
        en: [
          "High noise immunity and reliable communication channels",
          "Interactive map display of personnel and asset locations",
          "Recording and archiving of all communications and telemetry",
        ],
      },
    },
    {
      id: "system-3",
      badge: "Энергоуправление",
      title: {
        ru: "Система интеллектуального управления энергоснабжением",
        en: "Intelligent Power Management System",
      },
      desc: {
        ru: "Инженерный комплекс для оптимизации энергопотребления, контроля качества электропитания и защиты промышленного оборудования от перегрузок.",
        en: "Engineering solution for energy consumption optimization, power quality control, and equipment overload protection.",
      },
      image: "system_3.jpg",
      features: {
        ru: [
          "Снижение пиковых нагрузок на электросеть",
          "Детализированная аналитика и отчетность по энергозатратам",
          "Автоматическое переключение на резервные источники питания",
        ],
        en: [
          "Reduction of peak grid loads",
          "Detailed analytics and energy consumption reporting",
          "Automatic failover to backup power sources",
        ],
      },
    },
  ];

  return (
    <main className={styles.main_layout}>
      {/* Шапка секции */}
      <section className={styles.hero_section}>
        <div className={styles.container}>
          <h1 className={styles.main_title}>
            {currentLang === "ru" ? "Промышленные системы" : "Industrial Systems"}
          </h1>
          <p className={styles.main_subtitle}>
            {currentLang === "ru"
              ? "Готовые инженерные решения для автоматизации и обеспечения безопасности"
              : "Turnkey engineering solutions for automation and safety"}
          </p>
        </div>
      </section>

      {/* Список из 3 больших карточек */}
      <section className={styles.container}>
        <div className={styles.systems_list}>
          {systemsData.map((item) => (
            <article key={item.id} className={styles.system_card}>
              
              {/* Блок с изображением слева */}
              <div className={styles.image_container}>
                <img
                  src={`/products/${item.image}`}
                  alt={item.title[currentLang] || item.title.ru}
                  className={styles.system_img}
                  onError={(e) => {
                    // Заглушка, если картинка не найдена в public
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400/0d233a/ffffff?text=System+Image";
                  }}
                />
              </div>

              {/* Текстовый блок справа */}
              <div className={styles.info_block}>
                <div>
                  <div className={styles.card_header}>
                    <span className={styles.card_badge}>{item.badge}</span>
                    <h2 className={styles.card_title}>
                      {item.title[currentLang] || item.title.ru}
                    </h2>
                  </div>

                  <p className={styles.card_desc}>
                    {item.desc[currentLang] || item.desc.ru}
                  </p>

                  <ul className={styles.features_list}>
                    {(item.features[currentLang] || item.features.ru).map(
                      (feature, idx) => (
                        <li key={idx}>
                          <span className={styles.bullet}>✓</span>
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <button className={styles.btn_more}>
                  <span>
                    {currentLang === "ru" ? "Запросить проект" : "Request a Project"}
                  </span>
                  <span className={styles.btn_arrow}>→</span>
                </button>
              </div>

            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
