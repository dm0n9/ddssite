import { prisma } from "@/app/lib/db"; // Убедитесь, что путь к prisma верный
import SystemsClient from "@/app/system/[slug]/systemClient";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function SystemsPage() {
  let dbSystems: any[] = [];
  
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAdmin = session?.value === "authenticated";
  
  try {
    // Получаем системы из базы, отсортированные по порядку
    dbSystems = await prisma.system.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });
  } catch (error) {
    console.error("Ошибка чтения БД систем:", error);
  }

  return <SystemsClient initialDbSystems={dbSystems} isAdmin={isAdmin} />;
}