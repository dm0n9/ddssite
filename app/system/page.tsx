"use client";

import styles from "./system.module.css";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext"; 

interface SystemItem {
  id: string;
  link: string;
    title: Record<string, string>;
  desc: Record<string, string>;
  image: string;
  }

export default function SystemsPage() {
  const { currentLang = "ru" } = useLanguage ? useLanguage() : { currentLang: "ru" };

  
 const systemsData: SystemItem[] = [
    {
      id: "system-1",
      link: "/system/conveyor",
      
      title: {
        ru: "Система управления конвейерным транспортом",
        en: "Conveyor Transport Control System",
        cn: "输送机运输控制系统",
      },
      desc: {
        ru: "Система предназначена для автоматизированного централизованного управления и оперативного контроля разветвленными конвейерными линиями и сопутствующим оборудованием.",
        en: "The system is designed for automated centralized management and operational monitoring of branched conveyor lines and associated equipment.",
        cn: "该系统旨在用于分支输送机线及相关设备的自动化集中管理和运行监测。",
      },
      image: "conveyor_1.jpg",
    },
    {
      id: "system-2",
      link: "/system/minewatch",
      
      title: {
        ru: "Система MineWATCH",
        en: "MineWATCH System",
        cn: "MineWATCH 系统",
      },
      desc: {
        ru: "Комплексная интегрированная система для сквозного автоматизированного управления, диспетчеризации и непрерывного мониторинга всей технологической цепочки шахты с передачей данных на поверхность.",
        en: "Comprehensive integrated system for end-to-end automated control, dispatching, and continuous monitoring of the entire mine technological chain with data transmission to the surface.",
        cn: "一套用于整座矿山自动化集中控制、调度和连续监测的综合系统，可将相关数据传输至地面。",
      },
      image: "PC21-1.jpg",
    },
    {
      id: "system-3",
      link: "/system/wipan",
      
      title: {
        ru: "WiPan Беспроводная персональная сеть",
        en: "WiPAN Wireless Personal Area Network",
        cn: "WiPan 无线个人网络",
      },
      desc: {
        ru: "Cистема Davis Derby WiPAN — это беспроводная платформа, которая обеспечивает высоконадежное покрытие беспроводной сетью связи на всей территории шахтной установки.",
        en: "The Davis Derby WiPAN system is a wireless platform that provides highly reliable wireless communication network coverage throughout the mine installation area.",
        cn: "戴维斯德比 WiPAN 系统是一个无线平台，可在整个矿井安装区域内提供高可靠性的无线通信网络覆盖。",
      },
      image: "wipan_1.jpg",
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
                  
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400/0d233a/ffffff?text=System+Image";
                  }}
                />
              </div>

              {/* Текстовый блок справа */}
              <div className={styles.info_block}>
                <div>
                  <div className={styles.card_header}>
                    
                    <h2 className={styles.card_title}>
                      {item.title[currentLang] || item.title.ru}
                    </h2>
                  </div>

                  <p className={styles.card_desc}>
                    {item.desc[currentLang] || item.desc.ru}
                  </p>

                  
                </div>

                
                <Link href={item.link} className={styles.btn_more}>
                  <span>
                    {currentLang === "ru" ? "Подробнее о системе" : "System Details"}
                  </span>
                  
                </Link>
              </div>


            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
