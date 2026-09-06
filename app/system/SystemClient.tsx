"use client";

import { useState, useTransition } from "react"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./system.module.css";
import { useLanguage } from "../context/LanguageContext";
import { addSystem, updateSystem, toggleSystemVisibility, updateSingleSystemOrder } from "../actions/systems";
import { logoutAdmin } from "../actions/auth"; 

export default function SystemsClient({ initialDbSystems, isAdmin }: { initialDbSystems: any[], isAdmin: boolean }) {
  const { currentLang = "ru" } = useLanguage ? useLanguage() : { currentLang: "ru" };
  const router = useRouter();
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPending, startTransition] = useTransition(); 
  const [isSaving, setIsSaving] = useState(false); 
  const [editingSystem, setEditingSystem] = useState<any | null>(null);

  // Стейты из CatalogClient для управления формой и предпросмотром
  const [appCount, setAppCount] = useState(3);
  const [specCount, setSpecCount] = useState(3);
  const [extraImgCount, setExtraImgCount] = useState(0);

  const [previewData, setPreviewData] = useState({
    title: "",
    desc: "",
    imageUrl: "",
    apps: [] as string[],
    specs: [] as { param: string; value: string }[],
    extraImages: {} as Record<number, string>,
  });

  // Константы стилей Tailwind для инпутов
  const twInput = "w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white transition-colors placeholder-gray-400";
  const twLabel = "block text-sm font-semibold text-gray-700 mb-1.5";
  const twAddBtn = "mt-1 bg-gray-100 text-gray-700 font-medium py-1.5 px-3 border border-gray-300 rounded text-sm hover:bg-gray-200 transition-colors self-start";
  const twSectionTitle = "text-lg font-bold text-gray-900 mt-6 mb-3 border-b border-gray-100 pb-2";

  // Обработчики предпросмотра
  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "titleRu") setPreviewData((prev) => ({ ...prev, title: value }));
    if (name === "descRu") setPreviewData((prev) => ({ ...prev, desc: value }));
  };

  const handleAppChange = (index: number, value: string) => {
    setPreviewData((prev) => {
      const newApps = [...prev.apps];
      newApps[index] = value;
      return { ...prev, apps: newApps };
    });
  };

  const handleSpecChange = (index: number, field: 'param' | 'value', value: string) => {
    setPreviewData((prev) => {
      const newSpecs = [...prev.specs];
      if (!newSpecs[index]) newSpecs[index] = { param: '', value: '' };
      newSpecs[index][field] = value;
      return { ...prev, specs: newSpecs };
    });
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewData((prev) => ({ ...prev, imageUrl: previewUrl }));
    }
  };

  const handleExtraImagePreview = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewData((prev) => ({
        ...prev,
        extraImages: { ...prev.extraImages, [index]: previewUrl }
      }));
    }
  };

  // Инициализация редактирования
  const handleEdit = (system: any) => {
    setEditingSystem(system);
    setAppCount(Math.max(3, system.applications?.ru?.length || 3));
    setSpecCount(Math.max(3, system.specifications?.length || 3));
    setExtraImgCount(system.additionalImages?.length || 0);

    setPreviewData({
      title: system.title?.ru || "",
      desc: system.shortDesc?.ru || "",
      imageUrl: system.image?.startsWith('http') || system.image?.startsWith('/') ? system.image : `/systems/${system.image}`,
      apps: system.applications?.ru || [],
      specs: system.specifications?.map((r: any) => ({ param: r.param?.ru, value: r.value?.ru })) || [],
      extraImages: system.additionalImages?.reduce((acc: any, img: string, i: number) => {
        acc[i] = img.startsWith('http') || img.startsWith('/') ? img : `/systems/scheme/${img}`;
        return acc;
      }, {} as Record<number, string>) || {}
    });

    setIsPanelOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Функции для видимости и сортировки
  const handleToggleVisibility = (id: string, currentHidden: boolean) => {
    startTransition(async () => {
      await toggleSystemVisibility(id, !currentHidden);
      router.refresh();
    });
  };

  const handleOrderChange = (id: string, newOrder: number) => {
    startTransition(async () => {
      await updateSingleSystemOrder(id, newOrder);
      router.refresh();
    });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (editingSystem) {
        formData.append("productId", editingSystem.id); // Сохраняем имя ключа productId, как в вашем экшене
        await updateSystem(formData);
      } else {
        await addSystem(formData);
      }
      setIsPanelOpen(false);
      setEditingSystem(null);
      setAppCount(3);
      setSpecCount(3);
      setExtraImgCount(0);
      setPreviewData({ title: "", desc: "", imageUrl: "", apps: [], specs: [], extraImages: {} });
      startTransition(() => { router.refresh(); });
    } catch (error) {
      console.error("Ошибка формы:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className={styles.main_layout}>
      
      {/* КНОПКИ АДМИНА */}
      {isAdmin && (
        <div className={styles.container} style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "15px 20px" }}>
          <button onClick={() => startTransition(async () => { await logoutAdmin(); router.refresh(); })} className="px-5 py-2.5 bg-white border border-gray-300 rounded text-gray-700">Выйти</button>
          <button 
            onClick={() => {
              setIsPanelOpen(!isPanelOpen);
              if (!isPanelOpen && !editingSystem) { 
                setAppCount(3); setSpecCount(3); setExtraImgCount(0); 
              }
            }}
            className="px-6 py-2.5 rounded font-bold"
            style={{ 
              background: isPanelOpen ? "#fff" : "#0284c7", 
              color: isPanelOpen ? "#ef4444" : "#fff",
              border: `1px solid ${isPanelOpen ? "#ef4444" : "#0284c7"}`
            }}
          >
            {isPanelOpen ? "Закрыть панель" : "Добавить систему"}
          </button>
        </div>
      )}

      {/* ФОРМА АДМИНКИ */}
      {isPanelOpen && isAdmin && (
        <div className={styles.container}>
          <div className="w-full mx-auto mb-12 mt-2">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_600px] gap-8 xl:gap-10">
              
              <form 
                key={editingSystem ? editingSystem.id : 'new-system'}
                onSubmit={onSubmitForm} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-5 self-start"
                style={{ padding: "40px" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingSystem ? "Редактировать систему" : "Новая система"}
                  </h2>
                  {editingSystem && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Режим редактирования</span>
                  )}
                </div>
                
                <input type="hidden" name="appCount" value={appCount} />
                <input type="hidden" name="specCount" value={specCount} />
                <input type="hidden" name="extraImgCount" value={extraImgCount} />

                <div>
                  <label className={twLabel}>URL-адрес (slug)</label>
                  <input type="text" name="customFileName" defaultValue={editingSystem ? editingSystem.slug : ""} placeholder="ОБЯЗАТЕЛЬНО, например: minewatch" required={!editingSystem} className={twInput} />
                </div>

                <div>
                  <label className={twLabel}>Маркировка взрывозащиты (ex)</label>
                  <input type="text" name="ex" defaultValue={editingSystem ? editingSystem.ex : "Ex ia I Ma"} required className={twInput} />
                </div>

                <div>
                  <label className={twLabel}>Главное фото системы {editingSystem && "(оставьте пустым, чтобы не менять)"}</label>
                  <input type="file" name="image" accept="image/*" onChange={handleImagePreview} className="w-full border border-gray-300 rounded-md p-1.5 text-sm bg-white file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
                </div>

                <h3 className={twSectionTitle}>Контент (Русский)</h3>
                
                <div>
                  <label className={twLabel}>Название системы</label>
                  <input type="text" name="titleRu" defaultValue={editingSystem?.title?.ru} onChange={handlePreviewChange} placeholder="Введите название..." required className={twInput} />
                </div>
                
                <div>
                  <label className={twLabel}>Краткое описание</label>
                  <textarea name="descRu" defaultValue={editingSystem?.shortDesc?.ru} onChange={handlePreviewChange} placeholder="Описание характеристик..." required className={`${twInput} min-h-[80px] resize-none`} />
                </div>

                <div>
                  <label className={twLabel}>Особенности системы</label>
                  <div className="flex flex-col gap-2.5">
                    {Array.from({ length: appCount }).map((_, i) => (
                      <input key={`appRu${i}`} type="text" name={`appRu${i + 1}`} defaultValue={editingSystem?.applications?.ru?.[i]} onChange={(e) => handleAppChange(i, e.target.value)} placeholder={`Строка ${i + 1}`} className={twInput} />
                    ))}
                  </div>
                  <button type="button" onClick={() => setAppCount(c => c + 1)} className={twAddBtn}>
                    + Добавить строку
                  </button>
                </div>

                <div>
                  <label className={twLabel}>Технические характеристики</label>
                  <div className="flex flex-col gap-2.5">
                    {Array.from({ length: specCount }).map((_, i) => (
                      <div key={`specRu${i}`} className="flex flex-col sm:flex-row gap-2.5">
                        <input type="text" name={`specRu${i + 1}Param`} defaultValue={editingSystem?.specifications?.[i]?.param?.ru} onChange={(e) => handleSpecChange(i, 'param', e.target.value)} placeholder="Параметр" className={twInput} />
                        <input type="text" name={`specRu${i + 1}Value`} defaultValue={editingSystem?.specifications?.[i]?.value?.ru} onChange={(e) => handleSpecChange(i, 'value', e.target.value)} placeholder="Значение" className={twInput} />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setSpecCount(c => c + 1)} className={twAddBtn}>
                    + Добавить параметр
                  </button>
                </div>

                <details className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                  <summary className="font-bold cursor-pointer text-gray-800 text-sm">Добавить английский перевод</summary>
                  <div className="flex flex-col gap-4 mt-4">
                    <div>
                      <label className={twLabel}>Название системы (EN)</label>
                      <input type="text" name="titleEn" defaultValue={editingSystem?.title?.en} placeholder="Введите название на английском..." className={twInput} />
                    </div>
                    <div>
                      <label className={twLabel}>Краткое описание (EN)</label>
                      <textarea name="descEn" defaultValue={editingSystem?.shortDesc?.en} placeholder="Описание на английском..." className={`${twInput} min-h-[60px] resize-none`} />
                    </div>
                    <div>
                      <label className={twLabel}>Особенности системы (EN)</label>
                      <div className="flex flex-col gap-2.5">
                        {Array.from({ length: appCount }).map((_, i) => (
                          <input key={`appEn${i}`} type="text" name={`appEn${i + 1}`} defaultValue={editingSystem?.applications?.en?.[i]} placeholder={`Строка ${i + 1}`} className={twInput} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={twLabel}>Технические характеристики (EN)</label>
                      <div className="flex flex-col gap-2.5">
                        {Array.from({ length: specCount }).map((_, i) => (
                          <div key={`specEn${i}`} className="flex flex-col sm:flex-row gap-2.5">
                            <input type="text" name={`specEn${i + 1}Param`} defaultValue={editingSystem?.specifications?.[i]?.param?.en} placeholder="Параметр" className={twInput} />
                            <input type="text" name={`specEn${i + 1}Value`} defaultValue={editingSystem?.specifications?.[i]?.value?.en} placeholder="Значение" className={twInput} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>

                <details className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                  <summary className="font-bold cursor-pointer text-gray-800 text-sm">Добавить китайский перевод</summary>
                  <div className="flex flex-col gap-4 mt-4">
                    <div>
                      <label className={twLabel}>Название системы (CN)</label>
                      <input type="text" name="titleCn" defaultValue={editingSystem?.title?.cn} placeholder="Введите название на китайском..." className={twInput} />
                    </div>
                    <div>
                      <label className={twLabel}>Краткое описание (CN)</label>
                      <textarea name="descCn" defaultValue={editingSystem?.shortDesc?.cn} placeholder="Описание на китайском..." className={`${twInput} min-h-[60px] resize-none`} />
                    </div>
                    <div>
                      <label className={twLabel}>Особенности системы (CN)</label>
                      <div className="flex flex-col gap-2.5">
                        {Array.from({ length: appCount }).map((_, i) => (
                          <input key={`appCn${i}`} type="text" name={`appCn${i + 1}`} defaultValue={editingSystem?.applications?.cn?.[i]} placeholder={`Строка ${i + 1}`} className={twInput} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={twLabel}>Технические характеристики (CN)</label>
                      <div className="flex flex-col gap-2.5">
                        {Array.from({ length: specCount }).map((_, i) => (
                          <div key={`specCn${i}`} className="flex flex-col sm:flex-row gap-2.5">
                            <input type="text" name={`specCn${i + 1}Param`} defaultValue={editingSystem?.specifications?.[i]?.param?.cn} placeholder="Параметр" className={twInput} />
                            <input type="text" name={`specCn${i + 1}Value`} defaultValue={editingSystem?.specifications?.[i]?.value?.cn} placeholder="Значение" className={twInput} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>

                <h3 className={twSectionTitle}>Дополнительные файлы {editingSystem && "(оставьте пустыми для старых файлов)"}</h3>
                <div className="flex flex-col gap-3">
                  {Array.from({ length: extraImgCount }).map((_, i) => (
                    <div key={`extraImg${i}`}>
                      <label className="block text-[13px] font-medium text-gray-600 mb-1">Схема {i + 1}</label>
                      <input type="file" name={`extraImg${i + 1}`} accept="image/*" onChange={(e) => handleExtraImagePreview(i, e)} className="w-full border border-gray-300 rounded-md p-1.5 text-sm bg-white file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
                    </div>
                  ))}
                  <button type="button" onClick={() => setExtraImgCount(c => c + 1)} className={twAddBtn}>
                    + Прикрепить схему/чертеж
                  </button>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <button type="submit" disabled={isSaving} className="w-full bg-[#22c55e] text-white font-medium py-3.5 px-4 rounded-md hover:bg-green-600 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed text-base">
                    {isSaving ? "Сохранение..." : editingSystem ? "Сохранить изменения" : "Создать систему"}
                  </button>
                  {editingSystem && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingSystem(null);
                        setPreviewData({ title: "", desc: "", imageUrl: "", apps: [], specs: [], extraImages: {} });
                      }}
                      className="w-full bg-gray-100 text-gray-700 font-medium py-3.5 px-4 rounded-md hover:bg-gray-200 transition-colors text-base"
                    >
                      Отменить редактирование
                    </button>
                  )}
                </div>
              </form>

              {/* БЛОК ПРЕДПРОСМОТРА СПРАВА */}
              <div className="h-full">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col sticky top-20 max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                  
                  <div className="flex justify-end items-center border-b border-gray-100 sticky top-0 bg-white z-10" style={{ padding: "20px 40px" }}>
                    <div className="flex gap-2">
                      <button disabled className="border border-gray-300 text-gray-500 px-3 py-1 rounded text-sm font-medium opacity-60">Предпросмотр</button>
                    </div>
                  </div>

                  <div style={{ padding: "40px" }}>
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 xl:gap-12 mb-12 items-start">
                      
                      <div className="w-full aspect-square flex items-center justify-center p-2 bg-white border border-gray-100 shadow-sm rounded-lg">
                        {previewData.imageUrl ? (
                           <img src={previewData.imageUrl} className="w-full h-full object-contain" alt="Preview" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
                            <span className="text-xs font-bold uppercase tracking-wider">Фото</span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-2xl font-bold text-gray-900 mb-5 leading-tight break-words hyphens-auto">
                          {previewData.title || "Название системы..."}
                        </h2>
                        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                          {previewData.desc || "Описание системы. Заполните данные слева."}
                        </p>

                        {previewData.apps.filter(Boolean).length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-base font-bold text-gray-900 mb-4">Особенности:</h4>
                            <ul className="list-none pl-0 text-sm text-gray-600 flex flex-col gap-3">
                              {previewData.apps.filter(Boolean).map((app, idx) => (
                                <li key={idx} className="leading-relaxed flex items-start gap-2.5">
                                  <span className="text-blue-500 mt-0.5">•</span>
                                  <span>{app}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {previewData.specs.some(s => s.param || s.value) && (
                      <div className="mt-12">
                        <h4 className="text-lg font-bold text-gray-900 mb-5">Технические характеристики</h4>
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <table className="w-full text-left border-collapse text-sm">
                            <thead>
                              <tr className="bg-[#0f172a] text-white">
                                <th className="py-3 pr-3 font-semibold uppercase tracking-wider text-xs w-1/2" style={{ paddingLeft: '24px' }}>Наименование параметра</th>
                                <th className="p-3 font-semibold uppercase tracking-wider text-xs w-1/2">Значение</th>
                              </tr>
                            </thead>
                            <tbody>
                              {previewData.specs.filter(s => s.param || s.value).map((spec, idx) => (
                                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                  <td className="py-3 pr-3 font-semibold text-gray-800 bg-gray-50/50" style={{ paddingLeft: '24px' }}>{spec.param || "—"}</td>
                                  <td className="p-4 text-gray-600 bg-white">{spec.value || "—"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <section className={styles.hero_section}>
        <div className={styles.container}>
          <h1 className={styles.main_title}>{currentLang === "ru" ? "Промышленные системы" : "Industrial Systems"}</h1>
        </div>
      </section>

      {/* ВЫВОД КАРТОЧЕК СИСТЕМ */}
      <section className={styles.container}>
        <div className={styles.systems_list}>
          {initialDbSystems.filter(s => isAdmin ? true : !s.isHidden).map((item) => (
            <article key={item.id} className={`${styles.system_card} relative ${item.isHidden ? "opacity-60 bg-gray-50" : ""}`}>
              
              {/* ПЛАШКА АДМИНА ПОВЕРХ КАРТОЧКИ */}
              {isAdmin && (
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-white/95 backdrop-blur-sm border border-blue-200 text-blue-600 px-3 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-blue-50 shadow-md">Изменить</button>
                  <button onClick={() => handleToggleVisibility(item.id, !!item.isHidden)} className="bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-gray-50 shadow-md">
                    {item.isHidden ? "Показать" : "Скрыть"}
                  </button>
                  <div className="flex items-center gap-2 mt-1 w-full bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md p-1 shadow-md">
                    <span className="text-[9px] uppercase font-bold text-gray-500 pl-1.5 whitespace-nowrap">Порядок:</span>
                    <input 
                      type="number" defaultValue={item.order} min="1"
                      onBlur={(e) => handleOrderChange(item.id, parseInt(e.target.value))}
                      onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                      className="w-full text-center text-xs font-bold border border-gray-300 rounded focus:border-blue-500 outline-none py-1 mr-0.5"
                    />
                  </div>
                </div>
              )}

              <div className={styles.image_container}>
                <img src={`/systems/${item.image}`} alt={item.title[currentLang] || item.title.ru} className={styles.system_img} />
              </div>

              <div className={styles.info_block}>
                <div>
                  <h2 className={styles.card_title}>{item.title[currentLang] || item.title.ru}</h2>
                  <p className={styles.card_desc}>{item.shortDesc[currentLang] || item.shortDesc.ru}</p>
                </div>
                
                <Link href={`/system/${item.slug}`} className={styles.btn_more}>
                  <span>{currentLang === "ru" ? "Подробнее о системе" : "System Details"}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}