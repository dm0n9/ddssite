import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { homeTexts } from '@/app/products/lang';

const connectionString = process.env.DATABASE_URL;
/*
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in .env');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Начинается импорт товаров в базу данных...');

  // Используем entries() для получения индекса каждого товара
  for (const [index, item] of homeTexts.products.entries()) {
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
        order: index + 1, // Порядковый номер: 1, 2, 3...
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
        order: index + 1, // Порядковый номер: 1, 2, 3...
      },
    });

    console.log(`✓ Товар импортирован [№${index + 1}]: ${item.id}`);
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
  });*/