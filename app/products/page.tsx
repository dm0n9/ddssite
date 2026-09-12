import { prisma } from "../lib/db";
import CatalogClient from "./CatalogClient";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let dbProducts: any[] = [];
  
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAdmin = session?.value === "authenticated";
  
  try {
    const rawProducts = await prisma.product.findMany({
      // Сначала сортируем по order, затем по дате создания
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });
    
    dbProducts = rawProducts.map((item) => {
      const specsData = item.specifications as any;
      return {
        id: item.id,
        ex: item.ex,
        image: item.image,
        title: item.title,
        desc: item.shortDesc,
        specs: item.applications,
        table: specsData?.table || [],
        note: specsData?.note || undefined,
        additionalImages: item.additionalImages || [], 
        isHidden: (item as any).isHidden, 
        order: (item as any).order || 0,
      };
    });
  } catch (error) {
    console.error("Ошибка чтения БД:", error);
  }

  return <CatalogClient initialDbProducts={dbProducts} isAdmin={isAdmin} />;
}