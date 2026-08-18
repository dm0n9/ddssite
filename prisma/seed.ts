import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { homeTexts } from '@/app/products/lang';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Начинается импорт товаров в базу данных...');

  for (const item of homeTexts.products) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {
        ex: item.ex,
        image: item.image,
        title: item.title,
        shortDesc: item.desc,
        applications: item.specs,
        specifications: {
          table: item.table,
          ...(item.note ? { note: item.note } : {}),
        },
        additionalImages: [],
        isHidden: false,
      },
      create: {
        id: item.id,
        ex: item.ex,
        image: item.image,
        title: item.title,
        shortDesc: item.desc,
        applications: item.specs,
        specifications: {
          table: item.table,
          ...(item.note ? { note: item.note } : {}),
        },
        additionalImages: [],
        isHidden: false,
      },
    });

    console.log(`✓ Товар импортирован: ${item.id}`);
  }

  console.log('Все товары успешно перенесены в PostgreSQL!');
}

main()
  .catch((e) => {
    console.error('Ошибка при переносе данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });