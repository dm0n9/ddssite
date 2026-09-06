import { prisma } from "@/app/lib/db"
import { notFound } from "next/navigation";
import SystemClient from "./systemClient";

// Опционально: генерация статических путей для скорости работы
export async function generateStaticParams() {
  const systems = await prisma.system.findMany({
    select: { slug: true },
  });
  
  return systems.map((system) => ({
    slug: system.slug,
  }));
}

export default async function SystemPage({ params }: { params: { slug: string } }) {
  // Ищем систему в БД по slug, который передали в URL
  const systemData = await prisma.system.findUnique({
    where: { slug: params.slug },
  });

  // Если системы с таким URL нет, отдаем страницу 404
  if (!systemData) {
    notFound();
  }

  // Передаем данные в клиентский компонент
  return <SystemClient systemData={systemData} />;
}