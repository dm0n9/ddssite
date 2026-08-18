# 1. ЭТАП СБОРКИ (Builder)
FROM node:22-alpine AS builder
WORKDIR /app

# Копируем файлы зависимостей и устанавливаем их
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# Копируем весь остальной код
COPY . .

# Генерируем Prisma Client и собираем проект
RUN npx prisma generate
RUN npm run build


# 2. ЭТАП ЗАПУСКА (Runner)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Копируем только то, что нужно для работы, из первого этапа
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Открываем порт
EXPOSE 3000

# Запускаем сервер
CMD ["npm", "run", "start"]