"use client";
import { useState } from "react";
import styles from "./docs.module.css";
import { docsTexts } from "./lang"; 
import { useLanguage } from "../context/LanguageContext";

export default function DocumentationPage() {
  // Достаем глобальный язык из контекста
  const { currentLang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<"all" | "certificate" | "manual" | "catalog">("all");

  const uiTexts = {
    btn_download: { ru: "Скачать PDF", en: "Download PDF", cn: "下载 PDF" },
    tab_all: { ru: "Все документы", en: "All Docs", cn: "所有文档" },
    tab_certs: { ru: "Сертификаты ТР ТС", en: "Certificates", cn: "认证证书" },
    tab_manuals: { ru: "Руководства и паспорта", en: "Manuals & Passports", cn: "操作手册" },
    tab_catalogs: { ru: "Каталоги", en: "Catalogs", cn: "产品目录" }
  };

  const filteredDocs = docsTexts.documents.filter((doc) => {
    if (activeCategory === "all") return true;
    return doc.category === activeCategory;
  });

  return (
    <main className={styles.main_layout}>
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