"use server";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";


async function reindexVisibleSystems() {
  const visibleSystems = await prisma.system.findMany({
    where: { isHidden: false },
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" }
    ],
  });

  const updates = visibleSystems.map((item, index) =>
    prisma.system.update({
      where: { id: item.id },
      data: { order: index + 1 },
    })
  );

  if (updates.length > 0) {
    await prisma.$transaction(updates);
  }
}


export async function addSystem(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (session?.value !== "authenticated") {
      console.error("🚨 Отказ в доступе: нет прав администратора!");
      return; 
    }

    const titleRu = formData.get("titleRu")?.toString().trim() || "Новая система";
    const titleEn = formData.get("titleEn")?.toString().trim() || titleRu;
    const titleCn = formData.get("titleCn")?.toString().trim() || titleRu;

    const descRu = formData.get("descRu")?.toString().trim() || "Описание отсутствует";
    const descEn = formData.get("descEn")?.toString().trim() || descRu;
    const descCn = formData.get("descCn")?.toString().trim() || descRu;

    const ex = formData.get("ex")?.toString().trim() || "Ex ia I Ma";
    const customFileName = formData.get("customFileName")?.toString().trim() || `system-${Date.now()}`;
    const cleanName = customFileName.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9-]/gi, '-'); 

    const appCount = parseInt(formData.get("appCount")?.toString() || "3", 10);
    const specCount = parseInt(formData.get("specCount")?.toString() || "3", 10);
    const extraImgCount = parseInt(formData.get("extraImgCount")?.toString() || "0", 10);

    
    const imageFile = formData.get("image") as File | null;
    let imageFileName = "placeholder.jpg"; 

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const shortId = Math.random().toString(36).substring(2, 6);
      const extension = imageFile.name.split('.').pop() || 'jpg';
      
      imageFileName = `${cleanName}-${shortId}.${extension}`;
      const uploadDir = path.join(process.cwd(), "public", "systems");
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, imageFileName), buffer);
    }

   
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
        await fs.writeFile(path.join(schemesDir, extraFileName), buffer);
        extraImagesPaths.push(extraFileName);
      }
    }

   
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
        if (param || value) table.push({ param: param || "", value: value || "" });
      }
      return table;
    };

    const tRu = getTable("Ru");
    const tEn = getTable("En");
    const tCn = getTable("Cn");

    const finalTable = tRu.map((row, index) => ({
      param: { ru: row.param, en: tEn[index]?.param || row.param, cn: tCn[index]?.param || row.param },
      value: { ru: row.value, en: tEn[index]?.value || row.value, cn: tCn[index]?.value || row.value }
    }));

    const visibleCount = await prisma.system.count({ where: { isHidden: false } });

    
    await prisma.system.create({
      data: {
        slug: cleanName,
        title: { ru: titleRu, en: titleEn, cn: titleCn },
        shortDesc: { ru: descRu, en: descEn, cn: descCn },
        ex,
        image: imageFileName,
        additionalImages: extraImagesPaths,
        applications: { 
          ru: getApps("Ru"), 
          en: getApps("En").length > 0 ? getApps("En") : getApps("Ru"), 
          cn: getApps("Cn").length > 0 ? getApps("Cn") : getApps("Ru") 
        },
        specifications: finalTable,
        isHidden: false,
        order: visibleCount + 1,
      },
    });

    await reindexVisibleSystems();

    revalidatePath("/system");
    revalidatePath("/systems");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при добавлении системы:", error);
    throw error;
  }
}


export async function updateSystem(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (session?.value !== "authenticated") {
      console.error("🚨 Отказ в доступе: нет прав администратора!");
      return; 
    }

    
    const systemId = formData.get("systemId")?.toString() || formData.get("productId")?.toString() || formData.get("id")?.toString();
    if (!systemId) {
      console.error("🚨 Ошибка: ID системы не передан для обновления!");
      return;
    }

    const existingSystem = await prisma.system.findUnique({
      where: { id: systemId }
    });

    if (!existingSystem) {
      console.error("🚨 Ошибка: Обновляемая система не найдена в базе!");
      return;
    }

    const titleRu = formData.get("titleRu")?.toString().trim() || "Новая система";
    const titleEn = formData.get("titleEn")?.toString().trim() || titleRu;
    const titleCn = formData.get("titleCn")?.toString().trim() || titleRu;

    const descRu = formData.get("descRu")?.toString().trim() || "Описание отсутствует";
    const descEn = formData.get("descEn")?.toString().trim() || descRu;
    const descCn = formData.get("descCn")?.toString().trim() || descRu;

    const ex = formData.get("ex")?.toString().trim() || existingSystem.ex;
    const customFileName = formData.get("customFileName")?.toString().trim() || existingSystem.slug;
    const cleanName = customFileName.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9-]/gi, '-'); 

    const appCount = parseInt(formData.get("appCount")?.toString() || "3", 10);
    const specCount = parseInt(formData.get("specCount")?.toString() || "3", 10);
    const extraImgCount = parseInt(formData.get("extraImgCount")?.toString() || "0", 10);

  
    const imageFile = formData.get("image") as File | null;
    let imageFileName = existingSystem.image;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const shortId = Math.random().toString(36).substring(2, 6);
      const extension = imageFile.name.split('.').pop() || 'jpg';
      
      imageFileName = `${cleanName}-${shortId}.${extension}`;
      const uploadDir = path.join(process.cwd(), "public", "systems");
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, imageFileName), buffer);
    }

    
    const extraImagesPaths: string[] = [];
    const schemesDir = path.join(process.cwd(), "public", "systems", "scheme");
    await fs.mkdir(schemesDir, { recursive: true }).catch(() => {});

    const oldExtraImages = (existingSystem.additionalImages as string[]) || [];

    for (let i = 1; i <= extraImgCount; i++) {
      const extraFile = formData.get(`extraImg${i}`) as File | null;
      
      if (extraFile && extraFile.size > 0) {
        const buffer = Buffer.from(await extraFile.arrayBuffer());
        const shortId = Math.random().toString(36).substring(2, 6);
        const extension = extraFile.name.split('.').pop() || 'jpg';
        
        const extraFileName = `scheme-${cleanName}-${i}-${Date.now()}-${shortId}.${extension}`;
        await fs.writeFile(path.join(schemesDir, extraFileName), buffer);
        extraImagesPaths.push(extraFileName);
      } else if (oldExtraImages[i - 1]) {
        extraImagesPaths.push(oldExtraImages[i - 1]);
      }
    }

    
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
        if (param || value) table.push({ param: param || "", value: value || "" });
      }
      return table;
    };

    const tRu = getTable("Ru");
    const tEn = getTable("En");
    const tCn = getTable("Cn");

    const finalTable = tRu.map((row, index) => ({
      param: { ru: row.param, en: tEn[index]?.param || row.param, cn: tCn[index]?.param || row.param },
      value: { ru: row.value, en: tEn[index]?.value || row.value, cn: tCn[index]?.value || row.value }
    }));

    
    await prisma.system.update({
      where: { id: systemId },
      data: {
        slug: cleanName,
        title: { ru: titleRu, en: titleEn, cn: titleCn },
        shortDesc: { ru: descRu, en: descEn, cn: descCn },
        ex,
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
    revalidatePath("/systems");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при обновлении системы:", error);
    throw error;
  }
}


export async function toggleSystemVisibility(id: string, isHidden: boolean) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (session?.value !== "authenticated") {
      console.error("🚨 [DEBUG] Ошибка: сессия админа не прошла проверку!");
      return; 
    }

    await prisma.system.update({
      where: { id: String(id) },
      data: { 
        isHidden,
        order: isHidden ? 0 : 9999 
      }
    });

    await reindexVisibleSystems();

    revalidatePath("/system");
    revalidatePath("/systems");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Ошибка переключения видимости системы:", error);
    throw error;
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

    
    const visibleSystems = await prisma.system.findMany({
      where: { isHidden: false },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    const targetSystem = visibleSystems.find(p => p.id === id);
    if (!targetSystem) return;

    
    const filtered = visibleSystems.filter(p => p.id !== id);

    
    const targetIndex = Math.max(0, Math.min(requestedOrder - 1, filtered.length));
    filtered.splice(targetIndex, 0, targetSystem);

  
    const updates = filtered.map((p, index) => 
      prisma.system.update({
        where: { id: p.id },
        data: { order: index + 1 }
      })
    );

    await prisma.$transaction(updates);

    revalidatePath("/system");
    revalidatePath("/systems");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при сохранении сортировки систем:", error);
    throw error;
  }
}