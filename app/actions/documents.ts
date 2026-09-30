"use server";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";


function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} Мб`;
  }
  return `${Math.round(bytes / 1024)} Кб`;
}


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


export async function addDocument(formData: FormData) {
  try {
    const externalUrl = formData.get("externalUrl")?.toString().trim();
    const file = formData.get("file") as File | null;

    let fileName = "";
    let sizeFormatted = "";

   
    if (externalUrl && /^https?:\/\//i.test(externalUrl)) {
      fileName = externalUrl;
      sizeFormatted = "Внешний ресурс";
    } else if (file && file.size > 0) {
      const docsDir = path.join(process.cwd(), "public", "docs");
      await fs.mkdir(docsDir, { recursive: true });

      fileName = file.name;
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(docsDir, fileName), buffer);
      sizeFormatted = formatFileSize(file.size);
    } else {
      throw new Error("Необходимо либо загрузить PDF файл, либо ввести внешнюю ссылку");
    }

    const category = formData.get("category")?.toString() || "manual";
    const titleRu = formData.get("titleRu")?.toString().trim() || "";
    const titleEn = formData.get("titleEn")?.toString().trim() || titleRu;
    const titleCn = formData.get("titleCn")?.toString().trim() || titleRu;

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


export async function updateDocument(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("ID документа не указан");

    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing) throw new Error("Документ не найден");

    const externalUrl = formData.get("externalUrl")?.toString().trim();
    const file = formData.get("file") as File | null;

    let fileName = existing.file;
    let sizeFormatted = existing.size;

    if (externalUrl && /^https?:\/\//i.test(externalUrl)) {
      fileName = externalUrl;
      sizeFormatted = "Внешний ресурс";
    } else if (file && file.size > 0) {
      const docsDir = path.join(process.cwd(), "public", "docs");
      await fs.mkdir(docsDir, { recursive: true });

      fileName = file.name;
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(docsDir, fileName), buffer);
      sizeFormatted = formatFileSize(file.size);
    }

    const category = formData.get("category")?.toString() || existing.category;
    const titleRu = formData.get("titleRu")?.toString().trim() || "";
    const titleEn = formData.get("titleEn")?.toString().trim() || titleRu;
    const titleCn = formData.get("titleCn")?.toString().trim() || titleRu;

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