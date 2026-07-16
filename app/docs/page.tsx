"use client";
import { useState } from "react";
import styles from "./docs.module.css";
import { docsTexts } from "./lang"; 

export default function DocumentationPage() {
  const [currentLang, setCurrentLang] = useState<"ru" | "en" | "cn">("ru");
  const [activeCategory, setActiveCategory] = useState<"all" | "certificate" | "manual" | "catalog">("all");

  const uiTexts = {
    btn_download: { ru: "Скачать PDF", en: "Download PDF", cn: "下载 PDF" },
    tab_all: { ru: "Все документы", en: "All Docs", cn: "所有文档" },
    tab_certs: { ru: "Сертификаты ТР ТС", en: "Certificates", cn: "认证证书" },
    tab_manuals: { ru: "Руководства и паспорта", en: "Manuals & Passports", cn: "操作手册" },
    tab_catalogs: { ru: "Каталоги", en: "Catalogs", cn: "产品目录" },
    menu_products: { ru: "Продукция", en: "Products", cn: "产品中心" },
    menu_docs: { ru: "Документация", en: "Documentation", cn: "技术文档" },
    menu_contacts: { ru: "Контакты", en: "Contacts", cn: "联系我们" }
  };

  const filteredDocs = docsTexts.documents.filter((doc) => {
    if (activeCategory === "all") return true;
    return doc.category === activeCategory;
  });

  return (
    <main className={styles.main_layout}>
      {/* Фирменная синяя шапка ДДС */}
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.header_flex}`}>
          <div className={styles.logo_block}>
            <span className={styles.logo_main}>ДДС</span>
            <span className={styles.logo_sub}>Сибирь</span>
          </div>
          <nav className={styles.nav_menu}>
            {/* Ссылки навигации теперь ведут на главные разделы корня app */}
            <a href="/minewatch" className={styles.nav_link}>{uiTexts.menu_products[currentLang]}</a>
            <a href="/docs" className={`${styles.nav_link} ${styles.nav_link_active}`}>{uiTexts.menu_docs[currentLang]}</a>
            <a href="#" className={styles.nav_link}>{uiTexts.menu_contacts[currentLang]}</a>
          </nav>
          <div className={styles.lang_switcher}>
            {(["ru", "en", "cn"] as const).map((lang) => (
              <button 
                key={lang}
                className={`${styles.header_btn} ${currentLang === lang ? styles.header_btn_active : ""}`} 
                onClick={() => setCurrentLang(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <section className={styles.container} style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <h1 className={styles.main_title} style={{ margin: "0 0 30px 0" }}>
          {docsTexts.docs_page_title[currentLang]}
        </h1>

        {/* Переключатели категорий документов */}
        <div className={styles.docs_tabs}>
          <button 
            className={`${styles.tab_filter} ${activeCategory === "all" ? styles.tab_filter_active : ""}`} 
            onClick={() => setActiveCategory("all")}
          >
            {uiTexts.tab_all[currentLang]}
          </button>
          <button 
            className={`${styles.tab_filter} ${activeCategory === "certificate" ? styles.tab_filter_active : ""}`} 
            onClick={() => setActiveCategory("certificate")}
          >
            {uiTexts.tab_certs[currentLang]}
          </button>
          <button 
            className={`${styles.tab_filter} ${activeCategory === "manual" ? styles.tab_filter_active : ""}`} 
            onClick={() => setActiveCategory("manual")}
          >
            {uiTexts.tab_manuals[currentLang]}
          </button>
          <button 
            className={`${styles.tab_filter} ${activeCategory === "catalog" ? styles.tab_filter_active : ""}`} 
            onClick={() => setActiveCategory("catalog")}
          >
            {uiTexts.tab_catalogs[currentLang]}
          </button>
        </div>

        {/* Инженерный список файлов */}
        <div className={styles.docs_list_container}>
          {filteredDocs.map((doc) => (
            <div key={doc.id} className={styles.doc_row_item}>
              
              <div className={styles.doc_icon_zone}>
                <span className={styles.pdf_label}>PDF</span>
              </div>

              <div className={styles.doc_text_zone}>
                <h3 className={styles.doc_item_title}>{doc.title[currentLang]}</h3>
                <span className={styles.doc_item_size}>{doc.size}</span>
              </div>

              <a 
                href={`/docs/${doc.file}`} 
                download
                className={styles.btn_download_file}
              >
                <span>{uiTexts.btn_download[currentLang]}</span>
                <span style={{ fontSize: "16px" }}>⬇</span>
              </a>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
