import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ file: string[] }> }
) {
  try {
    const { file } = await props.params;

    if (!file || file.length === 0) {
      return new NextResponse("Файл не указан", { status: 400 });
    }

    // Ищем файл физически в папке public/docs/
    const baseDir = path.resolve(process.cwd(), "public", "docs");
    const targetPath = path.resolve(baseDir, ...file);

    // 🔒 Защита от Path Traversal (запрет выхода выше public/docs)
    if (!targetPath.startsWith(baseDir)) {
      return new NextResponse("Доступ запрещен", { status: 403 });
    }

    // Если файла физически нет на диске сервера
    if (!fs.existsSync(targetPath)) {
      return new NextResponse("Документ не найден на диске", { status: 404 });
    }

    const stat = fs.statSync(targetPath);
    const rawFileName = file[file.length - 1];
    
    // Декодируем и заново кодируем имя для безопасной отдачи русских букв
    const decodedFileName = decodeURIComponent(rawFileName);
    const encodedFileName = encodeURIComponent(decodedFileName);

    // Стриминг файла кусочками через Node.js stream (не забивает оперативную память)
    const nodeStream = fs.createReadStream(targetPath);
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on("data", (chunk) => controller.enqueue(chunk));
        nodeStream.on("end", () => controller.close());
        nodeStream.on("error", (err) => controller.error(err));
      },
      cancel() {
        nodeStream.destroy();
      },
    });

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": stat.size.toString(),
        // RFC 5987: принудительное скачивание с сохранением оригинального имени файла
        "Content-Disposition": `attachment; filename="${encodedFileName}"; filename*=UTF-8''${encodedFileName}`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Ошибка при отдаче документа:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}