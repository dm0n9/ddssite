import { prisma } from "../lib/db";
import DocsClient from "./DocsClient";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function DocumentationPage() {
  let dbDocs: any[] = [];
  
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAdmin = session?.value === "authenticated";
  
  try {
    const rawDocs = await prisma.document.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });
    
   dbDocs = rawDocs.map((item: any) => ({
      id: item.id,
      category: item.category,
      file: item.file,
      size: item.size,
      title: item.title,
      isHidden: item.isHidden,
      order: item.order,
    }));
  } catch (error) {
    console.error("Ошибка чтения БД:", error);
  }

  return <DocsClient initialDbDocs={dbDocs} isAdmin={isAdmin} />;
}