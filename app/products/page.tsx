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
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });
    
    dbProducts = rawProducts.map((item) => {
      const specsData = item.specifications as any;
      const resolvedTable = Array.isArray(specsData) 
        ? specsData 
        : (specsData?.table || []);
        
      const resolvedNote = Array.isArray(specsData) 
        ? undefined 
        : (specsData?.note || undefined);

      return {
        id: item.id,
        ex: item.ex,
        image: item.image,
        title: item.title,
        desc: item.shortDesc,
        specs: item.applications,
        table: resolvedTable,
        specifications: resolvedTable, 
        note: resolvedNote,
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