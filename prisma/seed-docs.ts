import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { docsTexts } from '@/app/docs/lang';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in .env');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Начинается импорт документов в базу данных...');

  // Используем entries() для получения индекса каждого документа
  for (const [index, item] of docsTexts.documents.entries()) {
    await prisma.document.upsert({
      where: { id: item.id },
      update: {
        category: item.category,
        file: item.file,
        size: item.size,
        title: item.title,
        isHidden: false,
        order: index + 1, // Порядковый номер: 1, 2, 3...
      },
      create: {
        id: item.id, // Используем id из lang.ts
        category: item.category,
        file: item.file,
        size: item.size,
        title: item.title,
        isHidden: false,
        order: index + 1, // Порядковый номер: 1, 2, 3...
      },
    });

    console.log(`✓ Документ импортирован [№${index + 1}]: ${item.title.ru.substring(0, 30)}...`);
  }

  console.log('Все документы успешно перенесены в PostgreSQL!');
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