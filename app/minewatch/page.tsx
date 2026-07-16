"use client";
import { useState, useEffect, Suspense } from "react"; 
import { useSearchParams } from "next/navigation";
import styles from "./products.module.css";
import { homeTexts } from "./lang";

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
  table?: TableRow[];
  note?: Record<string, string>;
}

function CatalogContent() {
  const [currentLang, setCurrentLang] = useState<"ru" | "en" | "cn">("ru");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const uiTexts = {
    btn_more: { ru: "Подробнее", en: "Details", cn: "详情" },
    btn_close: { ru: "Закрыть", en: "Close", cn: "关闭" },
    btn_share: { ru: "Копировать ссылку", en: "Copy Link", cn: "复制链接" },
    btn_copied: { ru: "Ссылка скопирована!", en: "Link copied!", cn: "链接已复制！" },
    specs_title: { ru: "Область применения", en: "Application Area", cn: "应用领域" },
    table_title: { ru: "Технические характеристики", en: "Technical Specifications", cn: "技术参数" },
    th_param: { ru: "Наименование параметра", en: "Parameter Name", cn: "参数名称" },
    th_value: { ru: "Значение", en: "Value", cn: "数值" },
    menu_home: { ru: "На главную", en: "Home", cn: "首页" },
    menu_about: { ru: "О нас", en: "About Us", cn: "关于我们" },
    menu_products: { ru: "Продукция", en: "Products", cn: "产品中心" },
    menu_support: { ru: "Сервисная поддержка", en: "Service Support", cn: "售后支持" },
    menu_docs: { ru: "Документация", en: "Documentation", cn: "技术文档" },
    menu_contacts: { ru: "Наши контакты", en: "Contacts", cn: "联系我们" }
  };

  // 1. Проверяем URL при загрузке страницы
  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const foundProduct = homeTexts.products.find((p) => p.id === productId);
      if (foundProduct) {
        setSelectedProduct(foundProduct as Product);
      }
    }
  }, [searchParams]);

  // 2. Функция генерации и копирования ссылки
  const handleShare = (productId: string) => {
    // Формируем чистый URL вида http://localhost:3000/minewatch?product=id
    const shareUrl = `${window.location.origin}${window.location.pathname}?product=${productId}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(productId);
      // Убираем надпись "Скопировано" через 2 секунды
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <main className={styles.main_layout}>
      {/* Шапка сайта */}
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.header_flex}`}>
          <div className={styles.logo_block}>
            <span className={styles.logo_main}>ДДС</span>
            <span className={styles.logo_sub}>Сибирь</span>
          </div>
          <nav className={styles.nav_menu}>
            <a href="#" className={styles.nav_link}>{uiTexts.menu_home[currentLang]}</a>
            <a href="#" className={styles.nav_link}>{uiTexts.menu_about[currentLang]}</a>
            <a href="#" className={`${styles.nav_link} ${styles.nav_link_active}`}>{uiTexts.menu_products[currentLang]}</a>
            <a href="#" className={styles.nav_link}>{uiTexts.menu_support[currentLang]}</a>
            <a href="#" className={styles.nav_link}>{uiTexts.menu_docs[currentLang]}</a>
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
              
              {/* Кнопка "Подробнее" */}
              <button className={styles.btn_more_full} onClick={() => setSelectedProduct(product as Product)}>
                <span>{uiTexts.btn_more[currentLang]}</span>
                <span className={styles.btn_arrow}>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ОКНО ПОДРОБНОЙ ИНФОРМАЦИИ */}
      {selectedProduct && (
        <div className={styles.modal_overlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
            
            {/* Ищите этот блок в районе 100-й строки вашего файла page.tsx */}
            <div className={styles.modal_header}>
              <span className={styles.modal_ex}>{selectedProduct.ex}</span>
              
              {/* ВОТ ЭТОТ БЛОК С ДВУМЯ КНОПКАМИ ДОЛЖЕН БЫТЬ ЗДЕСЬ */}
              <div className={styles.modal_header_actions}>
                <button 
                  className={`${styles.btn_share} ${copiedId === selectedProduct.id ? styles.btn_share_success : ""}`}
                  onClick={() => handleShare(selectedProduct.id)}
                >
                  {copiedId === selectedProduct.id ? uiTexts.btn_copied[currentLang] : uiTexts.btn_share[currentLang]}
                </button>
                
                <button className={styles.btn_close} onClick={() => setSelectedProduct(null)}>
                  {uiTexts.btn_close[currentLang]} ×
                </button>
              </div>
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

// По стандартам Next.js использование useSearchParams требует обертки в Suspense
export default function Home() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
