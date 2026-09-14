"use client";
import { useState, useEffect, Suspense, useTransition } from "react"; 
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./products.module.css";
import { homeTexts } from "./lang";
import { useLanguage } from "../context/LanguageContext";
import { addProduct, updateProduct, toggleProductVisibility, updateSingleProductOrder } from "../actions/products";
import { logoutAdmin } from "../actions/auth"; 

interface TableRow {
  param: Record<string, string>;
  value: Record<string, string>;
}

interface SpecificationRow {
  param: Record<string, string>;
  value: Record<string, string>;
}

interface Product {
  id: string;
  ex?: string; 
  image: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  specs?: Record<string, string[]>;
  table?: TableRow[];
  specifications?: SpecificationRow[];
  note?: Record<string, string>;
  additionalImages?: string[];
  isHidden?: boolean;
  order?: number;
}

function CatalogContent({ initialDbProducts, isAdmin }: { initialDbProducts: Product[], isAdmin: boolean }) {
  const { currentLang } = useLanguage();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPending, startTransition] = useTransition(); 
  const [isSaving, setIsSaving] = useState(false); 
  
  const searchParams = useSearchParams();

  const [appCount, setAppCount] = useState(3);
  const [specCount, setSpecCount] = useState(3);
  const [extraImgCount, setExtraImgCount] = useState(0);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [previewData, setPreviewData] = useState({
    title: "",
    desc: "",
    imageUrl: "",
    apps: [] as string[],
    specs: [] as { param: string; value: string }[],
    extraImages: {} as Record<number, string>,
  });

  const twInput = "w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white transition-colors placeholder-gray-400";
  const twLabel = "block text-sm font-semibold text-gray-700 mb-1.5";
  const twAddBtn = "mt-1 bg-gray-100 text-gray-700 font-medium py-1.5 px-3 border border-gray-300 rounded text-sm hover:bg-gray-200 transition-colors self-start";
  const twSectionTitle = "text-lg font-bold text-gray-900 mt-6 mb-3 border-b border-gray-100 pb-2";

  const uiTexts = {
    btn_more: { ru: "Подробнее", en: "Details", cn: "详情" },
    btn_close: { ru: "Закрыть", en: "Close", cn: "关闭" },
    btn_share: { ru: "Поделиться", en: "Share", cn: "分享" },
    btn_copied: { ru: "Ссылка скопирована!", en: "Link copied!", cn: "链接已复制！" },
    specs_title: { ru: "Область применения", en: "Application Area", cn: "应用领域" },
    table_title: { ru: "Технические характеристики", en: "Technical Specifications", cn: "技术参数" },
    th_param: { ru: "Наименование параметра", en: "Parameter Name", cn: "参数名称" },
    th_value: { ru: "Значение", en: "Value", cn: "数值" },
    extra_images: { ru: "Схемы и чертежи", en: "Schemes and Drawings", cn: "图纸 и дополнительные материалы" },
  };

  const allProducts = initialDbProducts;
  const visibleProducts = allProducts.filter(p => isAdmin ? true : !p.isHidden);

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

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setAppCount(Math.max(3, product.specs?.ru?.length || 3));
    
    // Определяем длину характеристик (из specifications или старой table)
    const specsSource = product.specifications || product.table || [];
    setSpecCount(Math.max(3, specsSource.length));
    setExtraImgCount(product.additionalImages?.length || 0);

    const mappedSpecs = specsSource.map(r => {
      const p = typeof r.param === 'object' ? (r.param.ru || Object.values(r.param)[0] || '') : (r.param || '');
      const v = typeof r.value === 'object' ? (r.value.ru || Object.values(r.value)[0] || '') : (r.value || '');
      return { param: p, value: v };
    });

    setPreviewData({
      title: product.title.ru || "",
      desc: product.desc.ru || "",
      imageUrl: product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/products/${product.image}`,
      apps: product.specs?.ru || [],
      specs: mappedSpecs,
      extraImages: product.additionalImages?.reduce((acc, img, i) => {
        acc[i] = img.startsWith('http') || img.startsWith('/') ? img : `/products/scheme/${img}`;
        return acc;
      }, {} as Record<number, string>) || {}
    });

    setIsPanelOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleVisibility = (id: string, currentHidden: boolean) => {
    startTransition(async () => {
      await toggleProductVisibility(id, !currentHidden);
      router.refresh();
    });
  };

  const handleOrderChange = (id: string, newOrder: number) => {
    startTransition(async () => {
      await updateSingleProductOrder(id, newOrder);
      router.refresh();
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdmin();
      router.refresh(); 
    });
  };

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

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      if (editingProduct) {
        formData.append("productId", editingProduct.id);
        await updateProduct(formData);
      } else {
        await addProduct(formData);
      }
      
      setIsPanelOpen(false);
      setEditingProduct(null);
      setAppCount(3);
      setSpecCount(3);
      setExtraImgCount(0);
      setPreviewData({ title: "", desc: "", imageUrl: "", apps: [], specs: [], extraImages: {} });
      
      startTransition(() => {
        router.refresh();
      });

    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Ошибка! Возможно, загружаемая картинка слишком большая (более 1-2 МБ). Проверьте консоль разработчика в браузере (F12).");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className={styles.main_layout}>
      {/* ПАНЕЛЬ КНОПОК АДМИНА */}
      {isAdmin && (
        <div className={styles.container} style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "15px 20px" }}>
          
          <button 
            onClick={handleLogout}
            disabled={isPending}
            className="px-5 py-2.5 rounded-md font-bold transition-all shadow-sm text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          >
             Выйти
          </button>

          <button 
            onClick={() => {
              setIsPanelOpen(!isPanelOpen);
              if (!isPanelOpen && !editingProduct) { 
                setAppCount(3); setSpecCount(3); setExtraImgCount(0); 
              }
            }}
            className="px-6 py-2.5 rounded-md font-bold transition-all shadow-sm text-sm border"
            style={{ 
              background: isPanelOpen ? "#fff" : "#0284c7", 
              color: isPanelOpen ? "#ef4444" : "#fff",
              borderColor: isPanelOpen ? "#ef4444" : "#0284c7"
            }}
          >
            {isPanelOpen ? "Закрыть панель" : "Добавить товар"}
          </button>
        </div>
      )}
      
      {isPanelOpen && isAdmin && (
        <div className={styles.container}>
          <div className="w-full mx-auto mb-12 mt-2">
            
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_600px] gap-8 xl:gap-10">
              
              <form 
                key={editingProduct ? editingProduct.id : 'new-product'}
                onSubmit={onSubmitForm} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-5 self-start"
                style={{ padding: "40px" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProduct ? "Редактирование прибора" : "Создание прибора"}
                  </h2>
                  {editingProduct && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Режим редактирования</span>
                  )}
                </div>
                
                <input type="hidden" name="appCount" value={appCount} />
                <input type="hidden" name="specCount" value={specCount} />
                <input type="hidden" name="extraImgCount" value={extraImgCount} />

                <div>
                  <label className={twLabel}>Имя файла (латиницей)</label>
                  <input type="text" name="customFileName" defaultValue={editingProduct ? editingProduct.image.replace(/\.[^/.]+$/, "") : ""} placeholder="ОБЯЗАТЕЛЬНО, например: mash-10" required={!editingProduct} className={twInput} />
                </div>

                <div>
                  <label className={twLabel}>Главное фото прибора {editingProduct && "(оставьте пустым, чтобы не менять)"}</label>
                  <input type="file" name="image" accept="image/*" onChange={handleImagePreview} className="w-full border border-gray-300 rounded-md p-1.5 text-sm bg-white file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
                </div>

                <h3 className={twSectionTitle}>Контент (Русский)</h3>
                
                <div>
                  <label className={twLabel}>Название товара</label>
                  <input type="text" name="titleRu" defaultValue={editingProduct?.title.ru} onChange={handlePreviewChange} placeholder="Введите название..." required className={twInput} />
                </div>
                
                <div>
                  <label className={twLabel}>Краткое описание</label>
                  <textarea name="descRu" defaultValue={editingProduct?.desc.ru} onChange={handlePreviewChange} placeholder="Описание характеристик..." required className={`${twInput} min-h-[80px] resize-none`} />
                </div>

                <div>
                  <label className={twLabel}>Области применения</label>
                  <div className="flex flex-col gap-2.5">
                    {Array.from({ length: appCount }).map((_, i) => (
                      <input key={`appRu${i}`} type="text" name={`appRu${i + 1}`} defaultValue={editingProduct?.specs?.ru?.[i]} onChange={(e) => handleAppChange(i, e.target.value)} placeholder={`Строка ${i + 1}`} className={twInput} />
                    ))}
                  </div>
                  <button type="button" onClick={() => setAppCount(c => c + 1)} className={twAddBtn}>
                    + Добавить строку
                  </button>
                </div>

                <div>
                  <label className={twLabel}>Технические характеристики</label>
                  <div className="flex flex-col gap-2.5">
                    {Array.from({ length: specCount }).map((_, i) => {
                      const specSource = editingProduct?.specifications || editingProduct?.table || [];
                      const defaultParam = specSource[i] ? (typeof specSource[i].param === 'object' ? specSource[i].param.ru : specSource[i].param) : '';
                      const defaultValue = specSource[i] ? (typeof specSource[i].value === 'object' ? specSource[i].value.ru : specSource[i].value) : '';

                      return (
                        <div key={`specRu${i}`} className="flex flex-col sm:flex-row gap-2.5">
                          <input type="text" name={`specRu${i + 1}Param`} defaultValue={defaultParam} onChange={(e) => handleSpecChange(i, 'param', e.target.value)} placeholder="Параметр (напр: Напряжение)" className={twInput} />
                          <input type="text" name={`specRu${i + 1}Value`} defaultValue={defaultValue} onChange={(e) => handleSpecChange(i, 'value', e.target.value)} placeholder="Значение (напр: 24В)" className={twInput} />
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => setSpecCount(c => c + 1)} className={twAddBtn}>
                    + Добавить параметр
                  </button>
                </div>

                <details className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                  <summary className="font-bold cursor-pointer text-gray-800 text-sm">Добавить английский перевод</summary>
                  <div className="flex flex-col gap-4 mt-4">
                    <div>
                      <label className={twLabel}>Название товара (EN)</label>
                      <input type="text" name="titleEn" defaultValue={editingProduct?.title?.en} placeholder="Введите название на английском..." className={twInput} />
                    </div>
                    <div>
                      <label className={twLabel}>Краткое описание (EN)</label>
                      <textarea name="descEn" defaultValue={editingProduct?.desc?.en} placeholder="Описание характеристик на английском..." className={`${twInput} min-h-[60px] resize-none`} />
                    </div>
                    <div>
                      <label className={twLabel}>Области применения (EN)</label>
                      <div className="flex flex-col gap-2.5">
                        {Array.from({ length: appCount }).map((_, i) => (
                          <input key={`appEn${i}`} type="text" name={`appEn${i + 1}`} defaultValue={editingProduct?.specs?.en?.[i]} placeholder={`Строка ${i + 1}`} className={twInput} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={twLabel}>Технические характеристики (EN)</label>
                      <div className="flex flex-col gap-2.5">
                        {Array.from({ length: specCount }).map((_, i) => {
                          const specSource = editingProduct?.specifications || editingProduct?.table || [];
                          const defaultParam = specSource[i] ? (typeof specSource[i].param === 'object' ? specSource[i].param.en : '') : '';
                          const defaultValue = specSource[i] ? (typeof specSource[i].value === 'object' ? specSource[i].value.en : '') : '';

                          return (
                            <div key={`specEn${i}`} className="flex flex-col sm:flex-row gap-2.5">
                              <input type="text" name={`specEn${i + 1}Param`} defaultValue={defaultParam} placeholder="Параметр" className={twInput} />
                              <input type="text" name={`specEn${i + 1}Value`} defaultValue={defaultValue} placeholder="Значение" className={twInput} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </details>

                <details className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                  <summary className="font-bold cursor-pointer text-gray-800 text-sm">Добавить китайский перевод</summary>
                  <div className="flex flex-col gap-4 mt-4">
                    <div>
                      <label className={twLabel}>Название товара (CN)</label>
                      <input type="text" name="titleCn" defaultValue={editingProduct?.title?.cn} placeholder="Введите название на китайском..." className={twInput} />
                    </div>
                    <div>
                      <label className={twLabel}>Краткое описание (CN)</label>
                      <textarea name="descCn" defaultValue={editingProduct?.desc?.cn} placeholder="Описание характеристик на китайском..." className={`${twInput} min-h-[60px] resize-none`} />
                    </div>
                    <div>
                      <label className={twLabel}>Области применения (CN)</label>
                      <div className="flex flex-col gap-2.5">
                        {Array.from({ length: appCount }).map((_, i) => (
                          <input key={`appCn${i}`} type="text" name={`appCn${i + 1}`} defaultValue={editingProduct?.specs?.cn?.[i]} placeholder={`Строка ${i + 1}`} className={twInput} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={twLabel}>Технические характеристики (CN)</label>
                      <div className="flex flex-col gap-2.5">
                        {Array.from({ length: specCount }).map((_, i) => {
                          const specSource = editingProduct?.specifications || editingProduct?.table || [];
                          const defaultParam = specSource[i] ? (typeof specSource[i].param === 'object' ? specSource[i].param.cn : '') : '';
                          const defaultValue = specSource[i] ? (typeof specSource[i].value === 'object' ? specSource[i].value.cn : '') : '';

                          return (
                            <div key={`specCn${i}`} className="flex flex-col sm:flex-row gap-2.5">
                              <input type="text" name={`specCn${i + 1}Param`} defaultValue={defaultParam} placeholder="Параметр" className={twInput} />
                              <input type="text" name={`specCn${i + 1}Value`} defaultValue={defaultValue} placeholder="Значение" className={twInput} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </details>

                <h3 className={twSectionTitle}>Дополнительные файлы {editingProduct && "(оставьте пустыми для старых файлов)"}</h3>
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
                    {isSaving ? "Сохранение..." : editingProduct ? "Сохранить изменения" : "Создать товар с таблицей и фото"}
                  </button>
                  {editingProduct && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingProduct(null);
                        setPreviewData({ title: "", desc: "", imageUrl: "", apps: [], specs: [], extraImages: {} });
                      }}
                      className="w-full bg-gray-100 text-gray-700 font-medium py-3.5 px-4 rounded-md hover:bg-gray-200 transition-colors text-base"
                    >
                      Отменить редактирование
                    </button>
                  )}
                </div>
              </form>

              <div className="h-full">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col sticky top-20 max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                  
                  <div 
                    className="flex justify-end items-center border-b border-gray-100 sticky top-0 bg-white z-10"
                    style={{ padding: "20px 40px" }}
                  >
                    <div className="flex gap-2">
                      <button disabled className="border border-gray-300 text-gray-500 px-3 py-1 rounded text-sm font-medium opacity-60">Поделиться</button>
                      <button disabled className="border border-gray-300 text-gray-500 px-3 py-1 rounded text-sm font-medium opacity-60">Закрыть</button>
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
                          {previewData.title || "Шахтный электроизмерительный прибор..."}
                        </h2>
                        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                          {previewData.desc || "Универсальный контрольно-измерительный прибор. Заполните данные слева."}
                        </p>

                        {previewData.apps.filter(Boolean).length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-base font-bold text-gray-900 mb-4">Область применения:</h4>
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

                    {Object.keys(previewData.extraImages).length > 0 && (
                      <div className="mt-14 border-t border-gray-100 pt-10">
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Схемы и чертежи</h4>
                        <div className="flex flex-col gap-8">
                          {Object.values(previewData.extraImages).map((imgUrl, idx) => (
                            <div key={idx} className="text-center">
                              <img 
                                src={imgUrl as string} 
                                alt={`Схема ${idx + 1}`} 
                                className="w-full rounded-lg border border-gray-200 shadow-sm"
                              />
                              <p className="mt-4 text-sm font-semibold text-gray-500">Схема {idx + 1}</p>
                            </div>
                          ))}
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
          <h1 className={styles.main_title}>{homeTexts["home_page"]?.[currentLang] || "Продукция"}</h1>
        </div>
      </section>

      <section className={styles.catalog_section}>
        <div className={`${styles.container} ${styles.product_grid}`}>
          {allProducts
            .filter(p => !p.isHidden)
            .map((product) => {
              const p = product as Product;
              const isDbProduct = initialDbProducts.some(dbP => dbP.id === p.id);

              return (
                <div key={p.id} className={`${styles.product_card} relative`}>
                  {isAdmin && isDbProduct && (
                    <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(p); }} className="bg-white/95 backdrop-blur-sm border border-blue-200 text-blue-600 px-3 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-blue-50 shadow-md">Изменить</button>
                      <button onClick={(e) => { e.stopPropagation(); handleToggleVisibility(p.id, !!p.isHidden); }} className="bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-gray-50 shadow-md">Скрыть</button>
                      
                      <div className="flex items-center gap-2 mt-1 w-full bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md p-1 shadow-md" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[9px] uppercase font-bold text-gray-500 pl-1.5 whitespace-nowrap">Порядок:</span>
                        <input 
                          key={`order-${p.id}-${p.order}`} 
                          type="number"
                          min="1"
                          defaultValue={p.order && p.order > 0 ? p.order : 1}
                          onBlur={(e) => handleOrderChange(p.id, parseInt(e.target.value) || 1)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.currentTarget.blur();
                            }
                          }}
                          className="w-full text-center text-xs font-bold border border-gray-300 rounded focus:border-blue-500 outline-none py-1 mr-0.5"
                        />
                      </div>
                    </div>
                  )}
                  <div className={styles.card_top_info}>
                    <div className={styles.card_image_container}>
                      <img src={p.image.startsWith('http') || p.image.startsWith('/') ? p.image : `/products/${p.image}`} alt={p.title[currentLang] || p.title.ru} className={styles.product_img} />
                    </div>
                    <div className={styles.card_info}>
                      <h3 className={styles.card_title}>{p.title[currentLang] || p.title.ru}</h3>
                      <p className={styles.card_desc}>{p.desc[currentLang] || p.desc.ru}</p>
                    </div>
                  </div>
                  <button className={styles.btn_more_full} onClick={() => setSelectedProduct(p)}>
                    <span>{uiTexts.btn_more[currentLang]}</span>
                    <span className={styles.btn_arrow}>→</span>
                  </button>
                </div>
              );
          })}
        </div>

        {isAdmin && allProducts.some(p => p.isHidden) && (
          <div className={`${styles.container} mt-20 pt-10 border-t-2 border-dashed border-gray-300`}>
            <h2 className="text-xl font-black text-gray-400 uppercase tracking-widest mb-8">Скрытые товары</h2>
            <div className={styles.product_grid}>
              {allProducts
                .filter(p => p.isHidden)
                .map((product) => {
                  const p = product as Product;
                  return (
                    <div key={p.id} className={`${styles.product_card} relative opacity-60 bg-gray-50`}>
                      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                        <button onClick={() => handleToggleVisibility(p.id, !!p.isHidden)} className="bg-white border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-emerald-50 shadow-md">
                          Показать
                        </button>
                      </div>
                      <div className={styles.card_top_info}>
                        <div className={styles.card_image_container}>
                          <img src={p.image.startsWith('http') || p.image.startsWith('/') ? p.image : `/products/${p.image}`} alt={p.title[currentLang] || p.title.ru} className={styles.product_img} />
                        </div>
                        <div className={styles.card_info}>
                          <h3 className={styles.card_title}>{p.title[currentLang] || p.title.ru} <span className="text-red-400 text-xs">(Скрыт)</span></h3>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        )}
      </section>

      {selectedProduct && (
        <div className={styles.modal_overlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
              <div></div>
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

              {/* ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ (поддерживает specifications и table) */}
              {((selectedProduct.specifications && selectedProduct.specifications.length > 0) || (selectedProduct.table && selectedProduct.table.length > 0)) && (
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
                      {(selectedProduct.specifications || selectedProduct.table)?.map((row: any, idx: number) => {
                        const paramText = row.param?.[currentLang] || row.param?.ru || Object.values(row.param || {})[0] || "—";
                        const valueText = row.value?.[currentLang] || row.value?.ru || Object.values(row.value || {})[0] || "—";

                        return (
                          <tr key={idx}>
                            <td className={styles.td_param}>{paramText}</td>
                            <td className={styles.td_value}>{valueText}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {selectedProduct.note && (
                    <p className={styles.table_note}>
                      {selectedProduct.note[currentLang]}
                    </p>
                  )}
                </div>
              )}

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