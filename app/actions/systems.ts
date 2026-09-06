"use server";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

// ============================================================================
// 1. ДОБАВЛЕНИЕ НОВОГО ТОВАРА
// ============================================================================
export async function addSystem(formData: FormData) {
  try {
    // --- ПРОВЕРКА АВТОРИЗАЦИИ ---
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (session?.value !== "authenticated") {
      console.error("🚨 Отказ в доступе: нет прав администратора!");
      return; 
    }

    const titleRu = formData.get("titleRu")?.toString() || "Новый прибор";
    const titleEn = formData.get("titleEn")?.toString() || titleRu;
    const titleCn = formData.get("titleCn")?.toString() || titleRu;

    const descRu = formData.get("descRu")?.toString() || "Описание отсутствует";
    const descEn = formData.get("descEn")?.toString() || descRu;
    const descCn = formData.get("descCn")?.toString() || descRu;

    const ex = formData.get("ex")?.toString() || "Нет данных";
    const customFileName = formData.get("customFileName")?.toString().trim() || "system";
    const cleanName = customFileName.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9-]/gi, '-'); 

    const appCount = parseInt(formData.get("appCount")?.toString() || "3", 10);
    const specCount = parseInt(formData.get("specCount")?.toString() || "3", 10);
    const extraImgCount = parseInt(formData.get("extraImgCount")?.toString() || "0", 10);

    // --- ОБРАБОТКА ГЛАВНОГО ФОТО ---
    const imageFile = formData.get("image") as File | null;
    let imageFileName = "placeholder.jpg"; 

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const shortId = Math.random().toString(36).substring(2, 6);
      const extension = imageFile.name.split('.').pop() || 'jpg';
      
      imageFileName = `${cleanName}-${shortId}.${extension}`;
      const savePath = path.join(process.cwd(), "public", "systems", imageFileName);
      await fs.writeFile(savePath, buffer);
    }

    // --- ОБРАБОТКА ДОПОЛНИТЕЛЬНЫХ ФОТО (СХЕМ) ---
    const extraImagesPaths: string[] = [];
    const schemesDir = path.join(process.cwd(), "public", "systems", "scheme");
    await fs.mkdir(schemesDir, { recursive: true }).catch(() => {});

    for (let i = 1; i <= extraImgCount; i++) {
      const extraFile = formData.get(`extraImg${i}`) as File | null;
      if (extraFile && extraFile.size > 0) {
        const buffer = Buffer.from(await extraFile.arrayBuffer());
        const shortId = Math.random().toString(36).substring(2, 6);
        const extension = extraFile.name.split('.').pop() || 'jpg';
        
        const extraFileName = `scheme-${cleanName}-${i}-${shortId}.${extension}`;
        const savePath = path.join(schemesDir, extraFileName);
        
        await fs.writeFile(savePath, buffer);
        extraImagesPaths.push(extraFileName);
      }
    }

    // --- ОБРАБОТКА ДИНАМИЧЕСКИХ СПИСКОВ И ТАБЛИЦ ---
    const getApps = (lang: string) => {
      const apps = [];
      for (let i = 1; i <= appCount; i++) {
        const val = formData.get(`app${lang}${i}`)?.toString().trim();
        if (val) apps.push(val);
      }
      return apps;
    };

    const getTable = (lang: string) => {
      const table = [];
      for (let i = 1; i <= specCount; i++) {
        const param = formData.get(`spec${lang}${i}Param`)?.toString().trim();
        const value = formData.get(`spec${lang}${i}Value`)?.toString().trim();
        if (param && value) table.push({ param, value });
      }
      return table;
    };

    const finalTable = getTable("Ru").map((row, index) => {
      const tEn = getTable("En");
      const tCn = getTable("Cn");
      return {
        param: { ru: row.param, en: tEn[index]?.param || row.param, cn: tCn[index]?.param || row.param },
        value: { ru: row.value, en: tEn[index]?.value || row.value, cn: tCn[index]?.value || row.value }
      };
    });

    // --- СОХРАНЕНИЕ В БАЗУ ДАННЫХ ---
    await prisma.system.create({
      data: {
        slug: cleanName,
        title: { ru: titleRu, en: titleEn, cn: titleCn },
        shortDesc: { ru: descRu, en: descEn, cn: descCn },
        ex: ex,
        image: imageFileName,
        additionalImages: extraImagesPaths,
        applications: { 
          ru: getApps("Ru"), 
          en: getApps("En").length > 0 ? getApps("En") : getApps("Ru"), 
          cn: getApps("Cn").length > 0 ? getApps("Cn") : getApps("Ru") 
        },
        specifications: finalTable,
      },
    });

    revalidatePath("/system");
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
  }
}

// ============================================================================
// 2. ОБНОВЛЕНИЕ СУЩЕСТВУЮЩЕГО ТОВАРА
// ============================================================================
export async function updateSystem(formData: FormData) {
  try {
    // --- ПРОВЕРКА АВТОРИЗАЦИИ ---
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (session?.value !== "authenticated") {
      console.error("🚨 Отказ в доступе: нет прав администратора!");
      return; 
    }

    const systemId = formData.get("systemId")?.toString();
    if (!systemId) {
      console.error("🚨 Ошибка: ID товара не передан для обновления!");
      return;
    }

    // Получаем текущий товар из базы, чтобы не затереть старые картинки
    const existingSystem = await prisma.system.findUnique({
      where: { id: systemId }
    });

    if (!existingSystem) {
      console.error("🚨 Ошибка: Обновляемый товар не найден в базе!");
      return;
    }

    const titleRu = formData.get("titleRu")?.toString() || "Новый прибор";
    const titleEn = formData.get("titleEn")?.toString() || titleRu;
    const titleCn = formData.get("titleCn")?.toString() || titleRu;

    const descRu = formData.get("descRu")?.toString() || "Описание отсутствует";
    const descEn = formData.get("descEn")?.toString() || descRu;
    const descCn = formData.get("descCn")?.toString() || descRu;

    const ex = formData.get("ex")?.toString() || "Нет данных";
    const customFileName = formData.get("customFileName")?.toString().trim() || "system";
    const cleanName = customFileName.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9-]/gi, '-'); 

    const appCount = parseInt(formData.get("appCount")?.toString() || "3", 10);
    const specCount = parseInt(formData.get("specCount")?.toString() || "3", 10);
    const extraImgCount = parseInt(formData.get("extraImgCount")?.toString() || "0", 10);

    // --- ОБРАБОТКА ГЛАВНОГО ФОТО ---
    const imageFile = formData.get("image") as File | null;
    let imageFileName = existingSystem.image; // Если фото не меняли, оставляем старое

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const shortId = Math.random().toString(36).substring(2, 6);
      const extension = imageFile.name.split('.').pop() || 'jpg';
      
      imageFileName = `${cleanName}-${shortId}.${extension}`;
      const savePath = path.join(process.cwd(), "public", "systems", imageFileName);
      await fs.writeFile(savePath, buffer);
    }

    // --- ОБРАБОТКА ДОПОЛНИТЕЛЬНЫХ ФОТО (СХЕМ) ---
    const extraImagesPaths: string[] = [];
    const schemesDir = path.join(process.cwd(), "public", "systems", "scheme");
    await fs.mkdir(schemesDir, { recursive: true }).catch(() => {});

    // Получаем массив старых схем
    const oldExtraImages = (existingSystem.additionalImages as string[]) || [];

    for (let i = 1; i <= extraImgCount; i++) {
      const extraFile = formData.get(`extraImg${i}`) as File | null;
      
      if (extraFile && extraFile.size > 0) {
        // Если загружен новый файл схемы
        const buffer = Buffer.from(await extraFile.arrayBuffer());
        const shortId = Math.random().toString(36).substring(2, 6);
        const extension = extraFile.name.split('.').pop() || 'jpg';
        
        const extraFileName = `scheme-${cleanName}-${i}-${shortId}.${extension}`;
        const savePath = path.join(schemesDir, extraFileName);
        
        await fs.writeFile(savePath, buffer);
        extraImagesPaths.push(extraFileName);
      } else if (oldExtraImages[i - 1]) {
        // Если файл не загрузили, но на этом месте была старая схема — оставляем её
        extraImagesPaths.push(oldExtraImages[i - 1]);
      }
    }

    // --- ОБРАБОТКА ДИНАМИЧЕСКИХ СПИСКОВ И ТАБЛИЦ ---
    const getApps = (lang: string) => {
      const apps = [];
      for (let i = 1; i <= appCount; i++) {
        const val = formData.get(`app${lang}${i}`)?.toString().trim();
        if (val) apps.push(val);
      }
      return apps;
    };

    const getTable = (lang: string) => {
      const table = [];
      for (let i = 1; i <= specCount; i++) {
        const param = formData.get(`spec${lang}${i}Param`)?.toString().trim();
        const value = formData.get(`spec${lang}${i}Value`)?.toString().trim();
        if (param && value) table.push({ param, value });
      }
      return table;
    };

    const finalTable = getTable("Ru").map((row, index) => {
      const tEn = getTable("En");
      const tCn = getTable("Cn");
      return {
        param: { ru: row.param, en: tEn[index]?.param || row.param, cn: tCn[index]?.param || row.param },
        value: { ru: row.value, en: tEn[index]?.value || row.value, cn: tCn[index]?.value || row.value }
      };
    });

    // --- ОБНОВЛЕНИЕ ДАННЫХ В БАЗЕ ---
    await prisma.system.update({
      where: { id:  systemId },
      data: {
        title: { ru: titleRu, en: titleEn, cn: titleCn },
        shortDesc: { ru: descRu, en: descEn, cn: descCn },
        ex: ex,
        image: imageFileName,
        additionalImages: extraImagesPaths,
        applications: { 
          ru: getApps("Ru"), 
          en: getApps("En").length > 0 ? getApps("En") : getApps("Ru"), 
          cn: getApps("Cn").length > 0 ? getApps("Cn") : getApps("Ru") 
        },
        specifications: finalTable,
      },
    });

    revalidatePath("/system");
  } catch (error) {
    console.error("Ошибка при обновлении товара:", error);
  }
}

// ============================================================================
// 3. ПЕРЕКЛЮЧАТЕЛЬ ВИДИМОСТИ (СКРЫТЬ / ПОКАЗАТЬ)
// ============================================================================
export async function toggleSystemVisibility(id: string, isHidden: boolean) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    console.log("🔍 [DEBUG] Значение куки admin_session:", session?.value);

    if (session?.value !== "authenticated") {
      console.error("🚨 [DEBUG] Ошибка: сессия админа не прошла проверку!");
      return; 
    }

    console.log(`🔍 [DEBUG] Пытаемся обновить товар ${id}, установить isHidden = ${isHidden}`);

    const updated = await prisma.system.update({
      where: { id: String(id) },
      data: { isHidden }
    });

    console.log("✅ [DEBUG] Успешно обновлено в базе:", updated);

    revalidatePath("/system");
  } catch (error) {
    console.error("❌ [DEBUG] Ошибка в базе данных:", error);
  }
}

export async function updateSingleSystemOrder(id: string, requestedOrder: number) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (session?.value !== "authenticated") {
      console.error("🚨 Отказ в доступе: нет прав администратора!");
      return; 
    }

    // 1. Получаем все товары из БД, отсортированные по их текущему порядку
    const system = await prisma.system.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    // 2. Находим индекс товара, который мы хотим переместить
    const currentIndex = system.findIndex(p => p.id === id);
    if (currentIndex === -1) return;

    // 3. Вычисляем новый индекс (ограничиваем, чтобы не выйти за пределы)
    let targetIndex = requestedOrder - 1; 
    if (targetIndex < 0) targetIndex = 0; // Если ввели отрицательное число или 0 -> ставим первым
    if (targetIndex >= system.length) targetIndex = system.length - 1; // Если ввели 999 -> ставим последним

    // Если позиция не изменилась, ничего не делаем
    if (currentIndex === targetIndex) return;

    // 4. Магия массивов: вырезаем товар из старого места и вставляем в новое
    const [movedSystem] = system.splice(currentIndex, 1);
   system.splice(targetIndex, 0, movedSystem);

    // 5. Перезаписываем порядок (order) для ВСЕХ товаров строго по очереди (1, 2, 3...)
    // Используем транзакцию, чтобы обновить всё за одну долю секунды
    const updates = system.map((p, index) => 
      prisma.system.update({
        where: { id: p.id },
        data: { order: index + 1 } // Строгая нумерация начиная с 1
      })
    );

    await prisma.$transaction(updates);

    // Обновляем страницу для всех пользователей
    revalidatePath("/system");
  } catch (error) {
    console.error("Ошибка при сохранении сортировки:", error);
  }
}
