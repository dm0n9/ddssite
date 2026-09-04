"use server";
import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

// Автоматический подсчет веса файла
function formatBytes(bytes: number) {
  if (!+bytes) return '0 Байт';
  const k = 1024;
  const sizes = ['Байт', 'Кб', 'Мб', 'Гб'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export async function addDocument(formData: FormData) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_session")?.value !== "authenticated") return;

    const titleRu = formData.get("titleRu")?.toString() || "Новый документ";
    const titleEn = formData.get("titleEn")?.toString() || titleRu;
    const titleCn = formData.get("titleCn")?.toString() || titleRu;
    const category = formData.get("category")?.toString() || "manual";

    const docsDir = path.join(process.cwd(), "public", "docs");
    await fs.mkdir(docsDir, { recursive: true }).catch(() => {});

    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) throw new Error("Файл не загружен");

    const buffer = Buffer.from(await file.arrayBuffer());
    const shortId = Math.random().toString(36).substring(2, 6);
    const fileName = `doc-${shortId}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`;
    await fs.writeFile(path.join(docsDir, fileName), buffer);

    const fileSizeStr = formatBytes(file.size);

    const lastDoc = await prisma.document.findFirst({ orderBy: { order: 'desc' } });
    const newOrder = lastDoc ? lastDoc.order + 1 : 1;

    await prisma.document.create({
      data: {
        title: { ru: titleRu, en: titleEn, cn: titleCn },
        category,
        file: fileName,
        size: fileSizeStr,
        order: newOrder,
        isHidden: false,
      }
    });
    revalidatePath("/docs");
  } catch (error) {
    console.error("Ошибка добавления:", error);
  }
}

export async function updateDocument(formData: FormData) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_session")?.value !== "authenticated") return;

    const id = formData.get("id")?.toString();
    if (!id) return;

    const existingDoc = await prisma.document.findUnique({ where: { id } });
    if (!existingDoc) return;

    const titleRu = formData.get("titleRu")?.toString() || (existingDoc.title as any)?.ru;
    const titleEn = formData.get("titleEn")?.toString() || (existingDoc.title as any)?.en;
    const titleCn = formData.get("titleCn")?.toString() || (existingDoc.title as any)?.cn;
    const category = formData.get("category")?.toString() || existingDoc.category;

    const docsDir = path.join(process.cwd(), "public", "docs");
    await fs.mkdir(docsDir, { recursive: true }).catch(() => {});

    const file = formData.get("file") as File | null;
    let fileName = existingDoc.file;
    let fileSizeStr = existingDoc.size;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const shortId = Math.random().toString(36).substring(2, 6);
      fileName = `doc-${shortId}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`;
      await fs.writeFile(path.join(docsDir, fileName), buffer);
      fileSizeStr = formatBytes(file.size);
    }

    await prisma.document.update({
      where: { id },
      data: {
        title: { ru: titleRu, en: titleEn, cn: titleCn },
        category,
        file: fileName,
        size: fileSizeStr,
      }
    });
    revalidatePath("/docs");
  } catch (error) {
    console.error("Ошибка обновления:", error);
  }
}

export async function toggleDocVisibility(id: string, isHidden: boolean) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_session")?.value !== "authenticated") return;
    await prisma.document.update({ where: { id }, data: { isHidden } });
    revalidatePath("/docs");
  } catch (error) {}
}

export async function updateDocOrder(id: string, requestedOrder: number) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_session")?.value !== "authenticated") return;

    const docs = await prisma.document.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
    const currentIndex = docs.findIndex(d => d.id === id);
    if (currentIndex === -1) return;

    let targetIndex = requestedOrder - 1;
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= docs.length) targetIndex = docs.length - 1;

    const [movedDoc] = docs.splice(currentIndex, 1);
    docs.splice(targetIndex, 0, movedDoc);

    const updates = docs.map((d: any, index: number) => 
      prisma.document.update({ where: { id: d.id }, data: { order: index + 1 } })
    );

    await prisma.$transaction(updates);
    revalidatePath("/docs");
  } catch (error) {}
}