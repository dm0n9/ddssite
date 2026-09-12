import { prisma } from "@/app/lib/db";
import { notFound } from "next/navigation";
import SystemClient from "./systemClient"; // Убедитесь, что регистр совпадает с названием файла

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Распаковываем params для совместимости с новыми версиями Next.js
  const resolvedParams = await params;
  
  const systemData = await prisma.system.findUnique({
    where: { slug: resolvedParams.slug },
  });

  // Если системы с таким URL нет, отдаем 404
  if (!systemData) {
    return notFound();
  }

  // Передаем данные в клиентский компонент
  return <SystemClient systemData={systemData} />;
}