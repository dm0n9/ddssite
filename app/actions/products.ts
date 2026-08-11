"use server";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

export async function addProduct(formData: FormData) {
  try {
    // --- 0. ПРОВЕРКА АВТОРИЗАЦИИ ---
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
    const customFileName = formData.get("customFileName")?.toString().trim() || "product";
    const cleanName = customFileName.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9-]/gi, '-'); 

    const appCount = parseInt(formData.get("appCount")?.toString() || "3", 10);
    const specCount = parseInt(formData.get("specCount")?.toString() || "3", 10);
    const extraImgCount = parseInt(formData.get("extraImgCount")?.toString() || "0", 10);

    // --- ОБРАБОТКА ГЛАВНОГО ФАЙЛА КАРТИНКИ ---
    const imageFile = formData.get("image") as File | null;
    let imageFileName = "placeholder.jpg"; 

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const shortId = Math.random().toString(36).substring(2, 6);
      const extension = imageFile.name.split('.').pop() || 'jpg';
      
      imageFileName = `${cleanName}-${shortId}.${extension}`;
      const savePath = path.join(process.cwd(), "public", "products", imageFileName);
      await fs.writeFile(savePath, buffer);
    }

    // --- ОБРАБОТКА ДОПОЛНИТЕЛЬНЫХ ФОТО (СХЕМ) ---
    const extraImagesPaths: string[] = [];
    
    // Создаем папку scheme, если её вдруг нет (чтобы избежать ошибок)
    const schemesDir = path.join(process.cwd(), "public", "products", "scheme");
    await fs.mkdir(schemesDir, { recursive: true }).catch(() => {});

    for (let i = 1; i <= extraImgCount; i++) {
      const extraFile = formData.get(`extraImg${i}`) as File | null;
      if (extraFile && extraFile.size > 0) {
        const buffer = Buffer.from(await extraFile.arrayBuffer());
        const shortId = Math.random().toString(36).substring(2, 6);
        const extension = extraFile.name.split('.').pop() || 'jpg';
        
        // Новое имя файла: scheme-[название-прибора]-[номер]-[id]
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
    await prisma.product.create({
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

    revalidatePath("/products");
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
  }
}