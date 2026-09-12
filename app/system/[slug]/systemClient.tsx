"use client";

import Link from "next/link";
import styles from "./systemDetail.module.css";
import { useLanguage } from "@/app/context/LanguageContext";

export default function SystemClient({ systemData }: { systemData: any }) {
  const { currentLang = "ru" } = useLanguage ? useLanguage() : { currentLang: "ru" };

  const uiTexts = {
    back: { ru: "Назад к системам", en: "Back to Systems", cn: "返回系统列表" },
    specs_title: { ru: "Область применения и особенности", en: "Scope of Application and Features", cn: "应用领域及特点" },
    table_title: { ru: "Технические характеристики", en: "Technical Specifications", cn: "技术参数" },
    th_param: { ru: "Наименование параметра", en: "Parameter Name", cn: "参数名称" },
    th_value: { ru: "Значение", en: "Value", cn: "数值" },
  };

  // В БД массив особенностей сохраняется в поле applications (как у товаров)
  const features = systemData?.applications?.[currentLang] || systemData?.applications?.ru || [];
  
  // Таблица сохраняется в поле specifications
  const tableData = Array.isArray(systemData?.specifications) 
    ? systemData.specifications 
    : [];

  return (
    <main className={styles.main_layout}>
      <div className={styles.container}>
        
        {/* Кнопка возврата к списку систем */}
        <div className={styles.nav_header}>
          <Link href="/system" className={styles.back_link}>
            ← {uiTexts.back[currentLang as keyof typeof uiTexts.back] || uiTexts.back.ru}
          </Link>
        </div>

        {/* Карточка системы */}
        <article className={styles.content_card}>
          <div className={styles.header_row}>
            <span className={styles.ex_badge}>{systemData.ex}</span>
          </div>

          <div className={styles.grid_two_cols}>
            <div className={styles.image_wrapper}>
              <img
                // Ищем картинку в папке /systems/ (как прописано в ваших серверных экшенах)
                // Если картинки остались в /products/, просто поменяйте путь
                src={systemData.image?.startsWith('http') ? systemData.image : `/systems/${systemData.image}`}
                alt={systemData.title?.[currentLang] || systemData.title?.ru}
                className={styles.product_image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x450/0d233a/ffffff?text=System+Image";
                }}
              />
            </div>

            <div>
              <h1 className={styles.title}>
                {systemData.title?.[currentLang] || systemData.title?.ru}
              </h1>
              <p className={styles.description}>
                {systemData.shortDesc?.[currentLang] || systemData.shortDesc?.ru}
              </p>

              {features.length > 0 && (
                <div className={styles.specs_section}>
                  <h3 className={styles.section_subtitle}>
                    {uiTexts.specs_title[currentLang as keyof typeof uiTexts.specs_title] || uiTexts.specs_title.ru}
                  </h3>
                  <ul className={styles.specs_list}>
                    {features.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Таблица параметров */}
          {tableData.length > 0 && (
            <div className={styles.table_section}>
              <h3 className={styles.section_subtitle}>
                {uiTexts.table_title[currentLang as keyof typeof uiTexts.table_title] || uiTexts.table_title.ru}
              </h3>
              <table className={styles.tech_table}>
                <thead>
                  <tr>
                    <th>{uiTexts.th_param[currentLang as keyof typeof uiTexts.th_param] || uiTexts.th_param.ru}</th>
                    <th>{uiTexts.th_value[currentLang as keyof typeof uiTexts.th_value] || uiTexts.th_value.ru}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row: any, idx: number) => (
                    <tr key={idx}>
                      <td className={styles.td_param}>
                        {row.param?.[currentLang] || row.param?.ru}
                      </td>
                      <td className={styles.td_value}>
                        {row.value?.[currentLang] || row.value?.ru}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

      </div>
    </main>
  );
}