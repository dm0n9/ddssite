"use client";
import { useState, useEffect, Suspense, useTransition } from "react"; 
import { useSearchParams } from "next/navigation";
import styles from "./products.module.css";
import { homeTexts } from "./lang"; 
import { useLanguage } from "../context/LanguageContext";
import { addProduct } from "../actions/products"; 

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
  additionalImages?: string[];
}

function CatalogContent({ initialDbProducts, isAdmin }: { initialDbProducts: Product[], isAdmin: boolean }) {
  const { currentLang } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  // Состояния для динамических полей
  const [appCount, setAppCount] = useState(3);
  const [specCount, setSpecCount] = useState(3);
  const [extraImgCount, setExtraImgCount] = useState(0);

  const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", color: "#000", width: "100%", boxSizing: "border-box" as const };
  const labelStyle = { margin: "0 0 8px 0", fontSize: "0.85rem", fontWeight: "bold", color: "#475569" };
  const boxStyle = { background: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" as const, gap: "8px" };
  const addBtnStyle = { padding: "6px 12px", background: "#e2e8f0", color: "#334155", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem", fontWeight: "bold", alignSelf: "flex-start", marginTop: "4px", transition: "0.2s" };

  const uiTexts = {
    btn_more: { ru: "Подробнее", en: "Details", cn: "详情" },
    btn_close: { ru: "Закрыть", en: "Close", cn: "关闭" },
    btn_share: { ru: "Поделиться", en: "Share", cn: "分享" },
    btn_copied: { ru: "Ссылка скопирована!", en: "Link copied!", cn: "链接已复制！" },
    specs_title: { ru: "Область применения", en: "Application Area", cn: "应用领域" },
    table_title: { ru: "Технические характеристики", en: "Technical Specifications", cn: "技术参数" },
    th_param: { ru: "Наименование параметра", en: "Parameter Name", cn: "参数名称" },
    th_value: { ru: "Значение", en: "Value", cn: "数值" },
    extra_images: { ru: "Схемы и чертежи", en: "Schemes and Drawings", cn: "图纸和附加材料" },
  };

  const allProducts = [...homeTexts.products, ...initialDbProducts];

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId && allProducts.length > 0) {
      const foundProduct = allProducts.find((p) => p.id === productId);
      if (foundProduct) {
        setSelectedProduct(foundProduct as Product);
      }
    }
  }, [searchParams, allProducts.length]);

  const handleShare = (productId: string) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?product=${productId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(productId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleFormSubmit = (formData: FormData) => {
    startTransition(async () => {
      await addProduct(formData);
      setIsPanelOpen(false);
      setAppCount(3);
      setSpecCount(3);
      setExtraImgCount(0); // Сброс
    });
  };

  return (
    <main className={styles.main_layout}>
      {/* КНОПКА ВИДНА ТОЛЬКО АДМИНУ */}
      {isAdmin && (
        <div className={styles.container} style={{ display: "flex", justifyContent: "flex-end", padding: "10px 20px" }}>
          <button 
            onClick={() => {
              setIsPanelOpen(!isPanelOpen);
              if (isPanelOpen) { setAppCount(3); setSpecCount(3); setExtraImgCount(0); }
            }}
            style={{ padding: "8px 16px", background: isPanelOpen ? "#ef4444" : "#ffffff", color: isPanelOpen ? "#fff" : "#0284c7", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          >
            {isPanelOpen ? "✕ Закрыть форму" : "+ Добавить товар"}
          </button>
        </div>
      )}
      
      {/* ПАНЕЛЬ ВИДНА ТОЛЬКО АДМИНУ */}
      {isPanelOpen && isAdmin && (
        <section style={{ padding: "20px", background: "#fff", borderRadius: "12px", maxWidth: "650px", margin: "20px auto", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", maxHeight: "80vh", overflowY: "auto" }}>
          <h2 style={{ marginBottom: "15px", color: "#000" }}>Добавить товар</h2>
          <form action={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <input type="hidden" name="appCount" value={appCount} />
            <input type="hidden" name="specCount" value={specCount} />
            <input type="hidden" name="extraImgCount" value={extraImgCount} />

            {/* БАЗОВЫЕ НАСТРОЙКИ */}
            <div style={{ background: "#f1f5f9", padding: "15px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="text" name="customFileName" placeholder="Имя файла латиницей (ОБЯЗАТЕЛЬНО, например: mash-10)" required style={inputStyle} />
              
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={labelStyle}>Главное фото прибора:</label>
                <input type="file" name="image" accept="image/*" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", background: "#fff", color: "#000" }} />
              </div>
              
              <input type="text" name="ex" placeholder="Маркировка взрывозащиты (например: PO EX IA I MA)" style={inputStyle} />
            </div>

            {/* РУССКИЙ ЯЗЫК */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h3 style={{ fontSize: "1.1rem", color: "#334155", margin: "10px 0 0 0" }}>🇷🇺 Русский (Основной)</h3>
              <input type="text" name="titleRu" placeholder="Название товара" required style={inputStyle} />
              <textarea name="descRu" placeholder="Краткое описание" required style={{...inputStyle, minHeight: "60px"}} />

              <div style={boxStyle}>
                <p style={labelStyle}>Области применения:</p>
                {Array.from({ length: appCount }).map((_, i) => (
                  <input key={`appRu${i}`} type="text" name={`appRu${i + 1}`} placeholder={`Строка ${i + 1}`} style={inputStyle} />
                ))}
                <button type="button" onClick={() => setAppCount(c => c + 1)} style={addBtnStyle}>+ Добавить строку</button>
              </div>

              <div style={boxStyle}>
                <p style={labelStyle}>Характеристики:</p>
                {Array.from({ length: specCount }).map((_, i) => (
                  <div key={`specRu${i}`} style={{ display: "flex", gap: "10px" }}>
                    <input type="text" name={`specRu${i + 1}Param`} placeholder={`Параметр ${i + 1}`} style={inputStyle} />
                    <input type="text" name={`specRu${i + 1}Value`} placeholder={`Значение ${i + 1}`} style={inputStyle} />
                  </div>
                ))}
                <button type="button" onClick={() => setSpecCount(c => c + 1)} style={addBtnStyle}>+ Добавить параметр</button>
              </div>
            </div>

            {/* АНГЛИЙСКИЙ ЯЗЫК */}
            <details style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <summary style={{ fontWeight: "bold", cursor: "pointer", color: "#0f172a" }}>en Добавить английский перевод</summary>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
                <input type="text" name="titleEn" placeholder="Название товара на английском" style={inputStyle} />
                <textarea name="descEn" placeholder="Краткое описание на английском" style={{...inputStyle, minHeight: "60px"}} />
                
                <div style={boxStyle}>
                  <p style={labelStyle}>Области применения (на английском):</p>
                  {Array.from({ length: appCount }).map((_, i) => (
                    <input key={`appEn${i}`} type="text" name={`appEn${i + 1}`} placeholder={`Строка ${i + 1}`} style={inputStyle} />
                  ))}
                </div>

                <div style={boxStyle}>
                  <p style={labelStyle}>Характеристики (на английском):</p>
                  {Array.from({ length: specCount }).map((_, i) => (
                    <div key={`specEn${i}`} style={{ display: "flex", gap: "10px" }}>
                      <input type="text" name={`specEn${i + 1}Param`} placeholder={`Параметр ${i + 1}`} style={inputStyle} />
                      <input type="text" name={`specEn${i + 1}Value`} placeholder={`Значение ${i + 1}`} style={inputStyle} />
                    </div>
                  ))}
                </div>
              </div>
            </details>

            {/* КИТАЙСКИЙ ЯЗЫК */}
            <details style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <summary style={{ fontWeight: "bold", cursor: "pointer", color: "#0f172a" }}>🇨🇳 Добавить китайский перевод</summary>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
                <input type="text" name="titleCn" placeholder="Название товара на китайском" style={inputStyle} />
                <textarea name="descCn" placeholder="Краткое описание на китайском" style={{...inputStyle, minHeight: "60px"}} />
                
                <div style={boxStyle}>
                  <p style={labelStyle}>Области применения (на китайском):</p>
                  {Array.from({ length: appCount }).map((_, i) => (
                    <input key={`appCn${i}`} type="text" name={`appCn${i + 1}`} placeholder={`Строка ${i + 1}`} style={inputStyle} />
                  ))}
                </div>

                <div style={boxStyle}>
                  <p style={labelStyle}>Характеристики (на китайском):</p>
                  {Array.from({ length: specCount }).map((_, i) => (
                    <div key={`specCn${i}`} style={{ display: "flex", gap: "10px" }}>
                      <input type="text" name={`specCn${i + 1}Param`} placeholder={`Параметр ${i + 1}`} style={inputStyle} />
                      <input type="text" name={`specCn${i + 1}Value`} placeholder={`Значение ${i + 1}`} style={inputStyle} />
                    </div>
                  ))}
                </div>
              </div>
            </details>

            {/* БЛОК ДОПОЛНИТЕЛЬНЫХ ФОТО (СХЕМЫ) */}
            <div style={boxStyle}>
              <h3 style={{ fontSize: "1.05rem", color: "#334155", margin: "0 0 10px 0" }}>📎 Дополнительные фото (Схемы, чертежи)</h3>
              {Array.from({ length: extraImgCount }).map((_, i) => (
                <div key={`extraImg${i}`} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={labelStyle}>Фото/Схема {i + 1}:</label>
                  <input type="file" name={`extraImg${i + 1}`} accept="image/*" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", background: "#fff", color: "#000" }} />
                </div>
              ))}
              <button type="button" onClick={() => setExtraImgCount(c => c + 1)} style={addBtnStyle}>+ Прикрепить фото/схему</button>
            </div>

            <button type="submit" disabled={isPending} style={{ padding: "14px", background: isPending ? "#999" : "#22c55e", color: "#fff", border: "none", borderRadius: "8px", cursor: isPending ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "1.05rem", marginTop: "10px" }}>
              {isPending ? "Сохраняем в базу..." : "Создать товар"}
            </button>
          </form>
        </section>
      )}

      {/* Заголовок */}
      <section className={styles.hero_section}>
        <div className={styles.container}>
          <h1 className={styles.main_title}>{homeTexts["home_page"]?.[currentLang] || "Продукция"}</h1>
        </div>
      </section>

      {/* Каталог */}
      <section className={styles.catalog_section}>
        <div className={`${styles.container} ${styles.product_grid}`}>
          {allProducts.map((product) => (
            <div key={product.id} className={styles.product_card}>
              <div className={styles.card_top_info}>
                <div className={styles.card_badge_row}>
                  {product.ex && product.ex !== "Нет данных" && (
                    <span className={styles.ex_badge}>{product.ex}</span>
                  )}
                </div>
                <div className={styles.card_image_container}>
                  <img 
                    src={product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/products/${product.image}`} 
                    alt={product.title[currentLang] || product.title.ru} 
                    className={styles.product_img} 
                  />
                </div>
                <div className={styles.card_info}>
                  <h3 className={styles.card_title}>{product.title[currentLang] || product.title.ru}</h3>
                  <p className={styles.card_desc}>{product.desc[currentLang] || product.desc.ru}</p>
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

      {/* МОДАЛЬНОЕ ОКНО */}
      {selectedProduct && (
        <div className={styles.modal_overlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
              <span className={styles.modal_ex}>{selectedProduct.ex !== "Нет данных" ? selectedProduct.ex : ""}</span>
              <div className={styles.modal_header_actions}>
                <button 
                  className={`${styles.btn_share} ${copiedId === selectedProduct.id ? styles.btn_share_success : ""}`}
                  onClick={() => handleShare(selectedProduct.id)}
                >
                  {copiedId === selectedProduct.id ? uiTexts.btn_copied[currentLang] : uiTexts.btn_share[currentLang]}
                </button>
                <button className={styles.btn_close} onClick={() => setSelectedProduct(null)}>
                  {uiTexts.btn_close[currentLang]} 
                </button>
              </div>
            </div>

            <div className={styles.modal_body}>
              <div className={styles.modal_grid}>
                <div className={styles.modal_image_block}>
                  <img 
                    src={selectedProduct.image.startsWith('http') || selectedProduct.image.startsWith('/') ? selectedProduct.image : `/products/${selectedProduct.image}`} 
                    alt={selectedProduct.title[currentLang] || selectedProduct.title.ru} 
                  />
                </div>
                <div className={styles.modal_text_block}>
                  <h2 className={styles.modal_title}>{selectedProduct.title[currentLang] || selectedProduct.title.ru}</h2>
                  <p className={styles.modal_desc}>{selectedProduct.desc[currentLang] || selectedProduct.desc.ru}</p>
                  
                  {selectedProduct.specs && selectedProduct.specs[currentLang]?.length > 0 && (
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

              {selectedProduct.table && selectedProduct.table.length > 0 && (
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

              {/* ОТРИСОВКА СХЕМ (ИЗ ПАПКИ SCHEME) */}
              {selectedProduct.additionalImages && selectedProduct.additionalImages.length > 0 && (
                <div style={{ marginTop: "30px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                  <h4 className={styles.table_section_title} style={{ marginBottom: "20px" }}>
                    {uiTexts.extra_images[currentLang]}
                  </h4>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                    {selectedProduct.additionalImages.map((img, idx) => (
                      <div key={idx} style={{ textAlign: "center" }}>
                        <a 
                          href={img.startsWith('http') || img.startsWith('/') ? img : `/products/scheme/${img}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ display: "block", cursor: "zoom-in" }}
                        >
                          <img 
                            src={img.startsWith('http') || img.startsWith('/') ? img : `/products/scheme/${img}`} 
                            alt={`Схема ${idx + 1}`} 
                            style={{ 
                              width: "100%", 
                              borderRadius: "8px", 
                              border: "1px solid #cbd5e1",
                              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                            }} 
                          />
                        </a>
                        <p style={{ marginTop: "10px", color: "#64748b", fontWeight: "bold", fontSize: "0.9rem" }}>
                          {currentLang === 'ru' ? 'Схема' : currentLang === 'en' ? 'Scheme' : '图纸'} {idx + 1}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function CatalogClient({ initialDbProducts, isAdmin }: { initialDbProducts: Product[], isAdmin: boolean }) {
  return (
    <Suspense fallback={<div>Загрузка каталога...</div>}>
      <CatalogContent initialDbProducts={initialDbProducts} isAdmin={isAdmin} />
    </Suspense>
  );
}