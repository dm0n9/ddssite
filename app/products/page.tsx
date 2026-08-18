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
      orderBy: { createdAt: "desc" },
    });
    
    dbProducts = rawProducts.map((item) => {
      // Отладочная информация в консоль сервера
      console.log(`Товар: ${item.id}, Схемы в базе:`, item.additionalImages);
      
      return {
        id: item.id,
        ex: item.ex,
        image: item.image,
        title: item.title,
        desc: item.shortDesc,
        specs: item.applications,
        table: item.specifications,
        // САМАЯ ВАЖНАЯ СТРОЧКА (передает схемы на сайт):
        additionalImages: item.additionalImages || [], 
        isHidden: (item as any).isHidden,
      };
    });
  } catch (error) {
    console.error("Ошибка чтения БД:", error);
  }

  return <CatalogClient initialDbProducts={dbProducts} isAdmin={isAdmin} />;
}