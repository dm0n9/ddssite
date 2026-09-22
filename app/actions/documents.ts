"use server";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// Форматирование размера файла
function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} Мб`;
  }
  return `${Math.round(bytes / 1024)} Кб`;
}

// Автоматическая непрерывная перенумерация документов 1, 2, 3...
async function reindexVisibleDocs() {
  const visibleDocs = await prisma.document.findMany({
    where: { isHidden: false },
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" }
    ],
  });

  const updates = visibleDocs.map((item, index) =>
    prisma.document.update({
      where: { id: item.id },
      data: { order: index + 1 },
    })
  );

  if (updates.length > 0) {
    await prisma.$transaction(updates);
  }
}

// Переключение видимости документа
export async function toggleDocVisibility(id: string, isHidden: boolean) {
  try {
    await prisma.document.update({
      where: { id },
      data: {
        isHidden,
        order: isHidden ? 0 : 9999,
      },
    });

    await reindexVisibleDocs();

    revalidatePath("/docs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка переключения видимости документа:", error);
    throw error;
  }
}

// Ручное изменение порядка документа
export async function updateDocOrder(id: string, targetOrder: number) {
  try {
    const visibleDocs = await prisma.document.findMany({
      where: { isHidden: false },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" }
      ],
    });

    const targetDoc = visibleDocs.find((d) => d.id === id);
    if (!targetDoc) return { success: false };

    const filtered = visibleDocs.filter((d) => d.id !== id);
    const newIndex = Math.max(0, Math.min(targetOrder - 1, filtered.length));
    filtered.splice(newIndex, 0, targetDoc);

    const reorderQueries = filtered.map((item, index) =>
      prisma.document.update({
        where: { id: item.id },
        data: { order: index + 1 },
      })
    );

    await prisma.$transaction(reorderQueries);

    revalidatePath("/docs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при обновлении порядка документа:", error);
    throw error;
  }
}

// Добавление документа
export async function addDocument(formData: FormData) {
  try {
    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) throw new Error("Файл не выбран");

    const category = formData.get("category")?.toString() || "manual";
    const titleRu = formData.get("titleRu")?.toString().trim() || "";
    const titleEn = formData.get("titleEn")?.toString().trim() || "";
    const titleCn = formData.get("titleCn")?.toString().trim() || "";

    const docsDir = path.join(process.cwd(), "public", "docs");
    await fs.mkdir(docsDir, { recursive: true });

    const fileName = file.name;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(docsDir, fileName), buffer);

    const sizeFormatted = formatFileSize(file.size);
    const visibleCount = await prisma.document.count({ where: { isHidden: false } });

    await prisma.document.create({
      data: {
        category,
        file: fileName,
        size: sizeFormatted,
        title: {
          ru: titleRu,
          en: titleEn,
          cn: titleCn,
        },
        isHidden: false,
        order: visibleCount + 1,
      },
    });

    await reindexVisibleDocs();

    revalidatePath("/docs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка загрузки документа:", error);
    throw error;
  }
}

// Обновление документа
export async function updateDocument(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("ID документа не указан");

    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing) throw new Error("Документ не найден");

    const category = formData.get("category")?.toString() || existing.category;
    const titleRu = formData.get("titleRu")?.toString().trim() || "";
    const titleEn = formData.get("titleEn")?.toString().trim() || "";
    const titleCn = formData.get("titleCn")?.toString().trim() || "";

    let fileName = existing.file;
    let sizeFormatted = existing.size;

    const file = formData.get("file") as File | null;
    if (file && file.size > 0) {
      const docsDir = path.join(process.cwd(), "public", "docs");
      await fs.mkdir(docsDir, { recursive: true });

      fileName = file.name;
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(docsDir, fileName), buffer);
      sizeFormatted = formatFileSize(file.size);
    }

    await prisma.document.update({
      where: { id },
      data: {
        category,
        file: fileName,
        size: sizeFormatted,
        title: {
          ru: titleRu,
          en: titleEn,
          cn: titleCn,
        },
      },
    });

    revalidatePath("/docs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
    throw error;
  }
}