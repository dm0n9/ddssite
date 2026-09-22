"use server";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// Вспомогательная функция: гарантирует строгий порядок 1, 2, 3... без пропусков
async function reindexVisibleProducts() {
  const visibleProducts = await prisma.product.findMany({
    where: { isHidden: false },
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" }
    ],
  });

  const updates = visibleProducts.map((prod, index) =>
    prisma.product.update({
      where: { id: prod.id },
      data: { order: index + 1 },
    })
  );

  if (updates.length > 0) {
    await prisma.$transaction(updates);
  }
}

// Переключение видимости (скрыть / показать) со сжатием номеров
export async function toggleProductVisibility(id: string, isHidden: boolean) {
  try {
    await prisma.product.update({
      where: { id },
      data: {
        isHidden,
        order: isHidden ? 0 : 9999, // Скрытым даем 0, восстанавливаемым — в конец
      },
    });

    await reindexVisibleProducts();

    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при переключении видимости товара:", error);
    throw error;
  }
}

// Ручное изменение порядка без дублирования и сдвигов
export async function updateSingleProductOrder(id: string, targetOrder: number) {
  try {
    const visibleProducts = await prisma.product.findMany({
      where: { isHidden: false },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" }
      ],
    });

    const targetProduct = visibleProducts.find((p) => p.id === id);
    if (!targetProduct) return { success: false };

    // Убираем перемещаемый товар из списка
    const filtered = visibleProducts.filter((p) => p.id !== id);

    // Вычисляем корректную позицию вставки
    const newIndex = Math.max(0, Math.min(targetOrder - 1, filtered.length));
    filtered.splice(newIndex, 0, targetProduct);

    // Присваиваем непрерывные номера 1, 2, 3...
    const reorderQueries = filtered.map((prod, index) =>
      prisma.product.update({
        where: { id: prod.id },
        data: { order: index + 1 },
      })
    );

    await prisma.$transaction(reorderQueries);

    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при обновлении порядка товара:", error);
    throw error;
  }
}

// Создание нового товара
export async function addProduct(formData: FormData) {
  try {
    const customFileName = formData.get("customFileName")?.toString().trim() || `product-${Date.now()}`;
    const ex = formData.get("ex")?.toString().trim() || "Ex ia I Ma";
    const imageFile = formData.get("image") as File | null;
    
    let imageName = "";
    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split(".").pop() || "jpg";
      imageName = `${customFileName}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "products");
      await fs.mkdir(uploadDir, { recursive: true });
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(path.join(uploadDir, imageName), buffer);
    }

    const appCount = parseInt(formData.get("appCount")?.toString() || "3");
    const specCount = parseInt(formData.get("specCount")?.toString() || "3");
    const extraImgCount = parseInt(formData.get("extraImgCount")?.toString() || "0");

    const appsRu: string[] = [];
    const appsEn: string[] = [];
    const appsCn: string[] = [];
    for (let i = 1; i <= appCount; i++) {
      const r = formData.get(`appRu${i}`)?.toString().trim();
      const e = formData.get(`appEn${i}`)?.toString().trim();
      const c = formData.get(`appCn${i}`)?.toString().trim();
      if (r) appsRu.push(r);
      if (e) appsEn.push(e);
      if (c) appsCn.push(c);
    }

    const specs: any[] = [];
    for (let i = 1; i <= specCount; i++) {
      const pRu = formData.get(`specRu${i}Param`)?.toString().trim();
      const vRu = formData.get(`specRu${i}Value`)?.toString().trim();
      const pEn = formData.get(`specEn${i}Param`)?.toString().trim() || pRu;
      const vEn = formData.get(`specEn${i}Value`)?.toString().trim() || vRu;
      const pCn = formData.get(`specCn${i}Param`)?.toString().trim() || pRu;
      const vCn = formData.get(`specCn${i}Value`)?.toString().trim() || vRu;

      if (pRu || vRu) {
        specs.push({
          param: { ru: pRu || "", en: pEn || "", cn: pCn || "" },
          value: { ru: vRu || "", en: vEn || "", cn: vCn || "" }
        });
      }
    }

    const additionalImages: string[] = [];
    const schemeDir = path.join(process.cwd(), "public", "products", "scheme");
    await fs.mkdir(schemeDir, { recursive: true });

    for (let i = 1; i <= extraImgCount; i++) {
      const extraFile = formData.get(`extraImg${i}`) as File | null;
      if (extraFile && extraFile.size > 0) {
        const ext = extraFile.name.split(".").pop() || "jpg";
        const extraName = `scheme-${customFileName}-${i}.${ext}`;
        const buffer = Buffer.from(await extraFile.arrayBuffer());
        await fs.writeFile(path.join(schemeDir, extraName), buffer);
        additionalImages.push(extraName);
      }
    }

    const visibleCount = await prisma.product.count({ where: { isHidden: false } });

    await prisma.product.create({
      data: {
        ex,
        image: imageName,
        title: {
          ru: formData.get("titleRu")?.toString().trim() || "",
          en: formData.get("titleEn")?.toString().trim() || "",
          cn: formData.get("titleCn")?.toString().trim() || "",
        },
        shortDesc: {
          ru: formData.get("descRu")?.toString().trim() || "",
          en: formData.get("descEn")?.toString().trim() || "",
          cn: formData.get("descCn")?.toString().trim() || "",
        },
        applications: { ru: appsRu, en: appsEn, cn: appsCn },
        specifications: specs,
        additionalImages,
        isHidden: false,
        order: visibleCount + 1,
      },
    });

    await reindexVisibleProducts();

    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка создания товара:", error);
    throw error;
  }
}

// Редактирование товара
export async function updateProduct(formData: FormData) {
  try {
    const id = formData.get("productId")?.toString();
    if (!id) throw new Error("ID товара не указан");

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) throw new Error("Товар не найден");

    const customFileName = formData.get("customFileName")?.toString().trim() || existingProduct.image.replace(/\.[^/.]+$/, "");
    const ex = formData.get("ex")?.toString().trim() || existingProduct.ex || "Ex ia I Ma";
    const imageFile = formData.get("image") as File | null;

    let imageName = existingProduct.image;
    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split(".").pop() || "jpg";
      imageName = `${customFileName}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "products");
      await fs.mkdir(uploadDir, { recursive: true });
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(path.join(uploadDir, imageName), buffer);
    }

    const appCount = parseInt(formData.get("appCount")?.toString() || "3");
    const specCount = parseInt(formData.get("specCount")?.toString() || "3");
    const extraImgCount = parseInt(formData.get("extraImgCount")?.toString() || "0");

    const appsRu: string[] = [];
    const appsEn: string[] = [];
    const appsCn: string[] = [];
    for (let i = 1; i <= appCount; i++) {
      const r = formData.get(`appRu${i}`)?.toString().trim();
      const e = formData.get(`appEn${i}`)?.toString().trim();
      const c = formData.get(`appCn${i}`)?.toString().trim();
      if (r) appsRu.push(r);
      if (e) appsEn.push(e);
      if (c) appsCn.push(c);
    }

    const specs: any[] = [];
    for (let i = 1; i <= specCount; i++) {
      const pRu = formData.get(`specRu${i}Param`)?.toString().trim();
      const vRu = formData.get(`specRu${i}Value`)?.toString().trim();
      const pEn = formData.get(`specEn${i}Param`)?.toString().trim() || pRu;
      const vEn = formData.get(`specEn${i}Value`)?.toString().trim() || vRu;
      const pCn = formData.get(`specCn${i}Param`)?.toString().trim() || pRu;
      const vCn = formData.get(`specCn${i}Value`)?.toString().trim() || vRu;

      if (pRu || vRu) {
        specs.push({
          param: { ru: pRu || "", en: pEn || "", cn: pCn || "" },
          value: { ru: vRu || "", en: vEn || "", cn: vCn || "" }
        });
      }
    }

    const additionalImages: string[] = [...(existingProduct.additionalImages || [])];
    const schemeDir = path.join(process.cwd(), "public", "products", "scheme");
    await fs.mkdir(schemeDir, { recursive: true });

    for (let i = 1; i <= extraImgCount; i++) {
      const extraFile = formData.get(`extraImg${i}`) as File | null;
      if (extraFile && extraFile.size > 0) {
        const ext = extraFile.name.split(".").pop() || "jpg";
        const extraName = `scheme-${customFileName}-${Date.now()}-${i}.${ext}`;
        const buffer = Buffer.from(await extraFile.arrayBuffer());
        await fs.writeFile(path.join(schemeDir, extraName), buffer);
        additionalImages.push(extraName);
      }
    }

    await prisma.product.update({
      where: { id },
      data: {
        ex,
        image: imageName,
        title: {
          ru: formData.get("titleRu")?.toString().trim() || "",
          en: formData.get("titleEn")?.toString().trim() || "",
          cn: formData.get("titleCn")?.toString().trim() || "",
        },
        shortDesc: {
          ru: formData.get("descRu")?.toString().trim() || "",
          en: formData.get("descEn")?.toString().trim() || "",
          cn: formData.get("descCn")?.toString().trim() || "",
        },
        applications: { ru: appsRu, en: appsEn, cn: appsCn },
        specifications: specs,
        additionalImages,
      },
    });

    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка обновления товара:", error);
    throw error;
  }
}