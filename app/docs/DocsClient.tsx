"use client";
import { useState, useTransition } from "react";
import styles from "./docs.module.css";
import { useLanguage } from "../context/LanguageContext";
import { addDocument, updateDocument, toggleDocVisibility, updateDocOrder } from "../actions/documents";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "../actions/auth";

interface Doc {
  id: string;
  category: string;
  file: string;
  size: string;
  title: Record<string, string>;
  isHidden?: boolean;
  order?: number;
}

export default function DocsClient({ initialDbDocs, isAdmin }: { initialDbDocs: Doc[], isAdmin: boolean }) {
  const { currentLang } = useLanguage();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<"all" | "certificate" | "manual" | "catalog">("all");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [editingDoc, setEditingDoc] = useState<Doc | null>(null);

  const uiTexts = {
    docs_page_title: { 
      ru: "Техническая документация и сертификаты Девис Дерби Сибирь", 
      en: "Davis Derby Siberia Technical Documentation & Certificates", 
      cn: "戴维斯德比西伯利亚技术文档与认证证书" 
    },
    btn_download: { ru: "Скачать PDF", en: "Download PDF", cn: "下载 PDF" },
    tab_all: { ru: "Все документы", en: "All Docs", cn: "所有文档" },
    tab_certs: { ru: "Сертификаты ТР ТС", en: "Certificates", cn: "认证证书" },
    tab_manuals: { ru: "Руководства и паспорта", en: "Manuals & Passports", cn: "操作手册" },
    tab_catalogs: { ru: "Каталоги", en: "Catalogs", cn: "产品目录" }
  };
  
  const filteredDocs = initialDbDocs.filter((doc) => {
    if (!isAdmin && doc.isHidden) return false;
    if (activeCategory === "all") return true;
    return doc.category === activeCategory;
  });

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (editingDoc) {
        formData.append("id", editingDoc.id);
        await updateDocument(formData);
      } else {
        await addDocument(formData);
      }
      setIsPanelOpen(false);
      setEditingDoc(null);
      startTransition(() => router.refresh());
    } catch (error) {
      alert("Ошибка при сохранении документа.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (doc: Doc) => {
    setEditingDoc(doc);
    setIsPanelOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdmin();
      router.refresh();
    });
  };

  const twInput = "w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 outline-none bg-white placeholder-gray-400";
  const twLabel = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <main className={styles.main_layout}>
      {/* ЕДИНАЯ ПАНЕЛЬ АДМИНИСТРАТОРА */}
      {isAdmin && (
        <div className={styles.container} style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "15px 20px" }}>
          <button 
            onClick={handleLogout}
            disabled={isPending}
            className="px-5 py-2.5 rounded-md font-bold transition-all shadow-sm text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Выйти
          </button>

          <button 
            onClick={() => { 
              setIsPanelOpen(!isPanelOpen); 
              if (isPanelOpen) setEditingDoc(null); 
            }}
            className="px-6 py-2.5 rounded-md font-bold transition-all shadow-sm text-sm border transition-colors"
            style={{ 
              background: isPanelOpen ? "#fff" : "#0284c7", 
              color: isPanelOpen ? "#ef4444" : "#fff",
              borderColor: isPanelOpen ? "#ef4444" : "#0284c7" 
            }}
          >
            {isPanelOpen ? "Закрыть панель" : "Добавить документ"}
          </button>
        </div>
      )}

      {/* ФОРМА ДОБАВЛЕНИЯ/РЕДАКТИРОВАНИЯ */}
      {isPanelOpen && isAdmin && (
        <div style={{ maxWidth: "800px", margin: "20px auto", padding: "0 20px" }}>
          <form 
            onSubmit={onSubmitForm} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-5"
            style={{ padding: "40px" }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {editingDoc ? "Редактирование документа" : "Загрузка нового документа"}
            </h2>

            <div>
              <label className={twLabel}>Категория документа</label>
              <select name="category" defaultValue={editingDoc?.category || "manual"} className={twInput}>
                <option value="certificate">Сертификаты ТР ТС</option>
                <option value="manual">Руководства и паспорта</option>
                <option value="catalog">Каталоги</option>
              </select>
            </div>

            <div>
              <label className={twLabel}>Файл (.pdf)</label>
              <input type="file" name="file" accept=".pdf" required={!editingDoc} className="w-full border border-gray-300 rounded-md p-1.5 text-sm bg-white" />
              {editingDoc && <p className="text-xs text-gray-500 mt-1">Текущий файл: {editingDoc.file}. Оставьте пустым, чтобы не менять.</p>}
            </div>

            <div>
              <label className={twLabel}>Название (RU)</label>
              <input type="text" name="titleRu" defaultValue={editingDoc?.title.ru} required className={twInput} />
            </div>
            <div>
              <label className={twLabel}>Название (EN)</label>
              <input type="text" name="titleEn" defaultValue={editingDoc?.title.en} className={twInput} />
            </div>
            <div>
              <label className={twLabel}>Название (CN)</label>
              <input type="text" name="titleCn" defaultValue={editingDoc?.title.cn} className={twInput} />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button type="submit" disabled={isSaving} className="w-full bg-[#22c55e] text-white font-medium py-3 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400">
                {isSaving ? "Сохранение..." : editingDoc ? "Сохранить изменения" : "Загрузить документ"}
              </button>
              {editingDoc && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingDoc(null);
                    setIsPanelOpen(false);
                  }}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  Отменить редактирование
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <section className={styles.container} style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <h1 className={styles.main_title} style={{ margin: "0 0 30px 0" }}>
          {uiTexts.docs_page_title[currentLang]}
        </h1>

        {/* Переключатели категорий */}
        <div className={styles.docs_tabs}>
          <button className={`${styles.tab_filter} ${activeCategory === "all" ? styles.tab_filter_active : ""}`} onClick={() => setActiveCategory("all")}>
            {uiTexts.tab_all[currentLang]}
          </button>
          <button className={`${styles.tab_filter} ${activeCategory === "certificate" ? styles.tab_filter_active : ""}`} onClick={() => setActiveCategory("certificate")}>
            {uiTexts.tab_certs[currentLang]}
          </button>
          <button className={`${styles.tab_filter} ${activeCategory === "manual" ? styles.tab_filter_active : ""}`} onClick={() => setActiveCategory("manual")}>
            {uiTexts.tab_manuals[currentLang]}
          </button>
          <button className={`${styles.tab_filter} ${activeCategory === "catalog" ? styles.tab_filter_active : ""}`} onClick={() => setActiveCategory("catalog")}>
            {uiTexts.tab_catalogs[currentLang]}
          </button>
        </div>

        {/* Список документов */}
        <div className={styles.docs_list_container}>
          {filteredDocs.map((doc) => {
            return (
              <div 
                key={doc.id} 
                className={`${styles.doc_row_item} relative`} 
                style={{ 
                  paddingTop: isAdmin ? "46px" : undefined, 
                  opacity: doc.isHidden ? 0.6 : 1 
                }}
              >
                
                {/* Панель админа над строкой документа */}
                {isAdmin && (
                  <div className="absolute top-2.5 left-4 z-20 flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(doc)} 
                      className="bg-white/95 backdrop-blur-sm border border-blue-200 text-blue-600 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-blue-50 shadow-sm transition-all"
                    >
                      Изменить
                    </button>
                    
                    <button 
                      onClick={() => startTransition(() => { toggleDocVisibility(doc.id, !doc.isHidden); router.refresh(); })} 
                      className="bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-600 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-gray-50 shadow-sm transition-all"
                    >
                      {doc.isHidden ? "Показать" : "Скрыть"}
                    </button>
                    
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md px-2 py-0.5 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-gray-500 whitespace-nowrap">Порядок:</span>
                      <input 
                        key={`order-${doc.id}-${doc.order}`}
                        type="number" 
                        min="1" 
                        defaultValue={doc.order || 1}
                        onBlur={(e) => startTransition(() => { updateDocOrder(doc.id, parseInt(e.target.value) || 1); router.refresh(); })}
                        onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                        className="w-12 text-center text-xs font-bold border border-gray-300 rounded focus:border-blue-500 outline-none py-0.5"
                      />
                    </div>
                  </div>
                )}

                <div className={styles.doc_icon_zone}>
                  <span className={styles.pdf_label}>PDF</span>
                </div>

                <div className={styles.doc_text_zone}>
                  <h3 className={styles.doc_item_title}>
                    {doc.title[currentLang] || doc.title.ru} {doc.isHidden && <span className="text-red-500 text-xs ml-2">(Скрыт)</span>}
                  </h3>
                  <span className={styles.doc_item_size}>{doc.size}</span>
                </div>

                <a 
                  href={`/docs/${doc.file}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.btn_download_file}
                >
                  <span>{uiTexts.btn_download[currentLang]}</span>
                  <span style={{ fontSize: "16px" }}>⬇</span>
                </a>

              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}