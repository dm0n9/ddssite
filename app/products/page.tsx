"use client";
import { useState } from "react"; 
import styles from "./products.module.css";
import { homeTexts } from "./lang";
import Link from "next/link";

// Дорабатываем интерфейс под таблицы
interface TableRow {
  param: Record<string, string>;
  value: Record<string, string>;
}

interface Product {
  id: string;
  ex: string;
  image: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  specs?: Record<string, string[]>;
  table?: TableRow[]; // Добавили поле таблицы
  note?: Record<string, string>
}

export default function Home() {
  const [currentLang, setCurrentLang] = useState<"ru" | "en" | "cn">("ru");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    <main className={styles.main_layout}>
       {/* СОВРЕМЕННАЯ НАВИГАЦИОННАЯ ШАПКА */}
      


      {/* Заголовок */}
      <section className={styles.hero_section}>
        <div className={styles.container}>
          <h1 className={styles.main_title}>{homeTexts["home_page"][currentLang]}</h1>
        </div>
      </section>

      {/* Каталог */}
      <section className={styles.catalog_section}>
        <div className={`${styles.container} ${styles.product_grid}`}>
          {homeTexts.products.map((product) => (
            <div key={product.id} className={styles.product_card}>
              <div className={styles.card_top_info}>
                <div className={styles.card_badge_row}>
                  <span className={styles.ex_badge}>{product.ex}</span>
                </div>
                <div className={styles.card_image_container}>
                  <img src={`/products/${product.image}`} alt={product.title[currentLang]} className={styles.product_img} />
                </div>
                <div className={styles.card_info}>
                  <h3 className={styles.card_title}>{product.title[currentLang]}</h3>
                  <p className={styles.card_desc}>{product.desc[currentLang]}</p>
                </div>
              </div>
              <button className={styles.btn_more_full} onClick={() => setSelectedProduct(product as Product)}>
                <span>{uiTexts.btn_more[currentLang]}</span>
                <span className={styles.btn_arrow}>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* КРАСИВОЕ ОКНО С ТАБЛИЦАМИ */}
      {selectedProduct && (
        <div className={styles.modal_overlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
            
            <div className={styles.modal_header}>
              <span className={styles.modal_ex}>{selectedProduct.ex}</span>
              <button className={styles.btn_close} onClick={() => setSelectedProduct(null)}>
                {uiTexts.btn_close[currentLang]} ×
              </button>
            </div>

            <div className={styles.modal_body}>
              <div className={styles.modal_grid}>
                <div className={styles.modal_image_block}>
                  <img src={`/products/${selectedProduct.image}`} alt={selectedProduct.title[currentLang]} />
                </div>
                <div className={styles.modal_text_block}>
                  <h2 className={styles.modal_title}>{selectedProduct.title[currentLang]}</h2>
                  <p className={styles.modal_desc}>{selectedProduct.desc[currentLang]}</p>
                  
                  {selectedProduct.specs && (
                    <div className={styles.modal_specs_zone}>
                      <h4>{uiTexts.specs_title[currentLang]}:</h4>
                      <ul>
                        {selectedProduct.specs[currentLang]?.map((spec, index) => (
                          <li key={index}>{spec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* БЛОК СОВРЕМЕННОЙ ТАБЛИЦЫ ХАРАКТЕРИСТИК */}
              {selectedProduct.table && (
                <div className={styles.modal_table_zone}>
                  <h4 className={styles.table_section_title}>{uiTexts.table_title[currentLang]}</h4>
                  <table className={styles.tech_table}>
                    <thead>
                      <tr>
                        <th>{uiTexts.th_param[currentLang]}</th>
                        <th>{uiTexts.th_value[currentLang]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.table.map((row, idx) => (
                        <tr key={idx}>
                          <td className={styles.td_param}>{row.param[currentLang]}</td>
                          <td className={styles.td_value}>{row.value[currentLang]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Вывод сноски под таблицей, если она есть */}
                  {selectedProduct.note && (
                    <p className={styles.table_note}>
                      {selectedProduct.note[currentLang]}
                    </p>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </main>
  );
}
