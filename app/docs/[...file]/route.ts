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

    const baseDir = path.resolve(process.cwd(), "public", "docs");
    const targetPath = path.resolve(baseDir, ...file);

    if (!targetPath.startsWith(baseDir)) {
      return new NextResponse("Доступ запрещен", { status: 403 });
    }

    if (!fs.existsSync(targetPath)) {
      return new NextResponse("Документ не найден на диске", { status: 404 });
    }

    const stat = fs.statSync(targetPath);
    const rawFileName = file[file.length - 1];
    
    const decodedFileName = decodeURIComponent(rawFileName);
    const encodedFileName = encodeURIComponent(decodedFileName);


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
        "Content-Disposition": `attachment; filename="${encodedFileName}"; filename*=UTF-8''${encodedFileName}`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Ошибка при отдаче документа:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}