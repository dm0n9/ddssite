import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: Request, props: { params: Promise<{ slug: string[] }> }) {
  try {
    const params = await props.params;
    const slug = params.slug || [];
    
    const baseDir = path.join(process.cwd(), 'public', 'products');
    const filePath = path.join(baseDir, ...slug);

    if (!filePath.startsWith(baseDir)) {
      return new NextResponse('Access Denied', { status: 403 });
    }

    const fileBuffer = await fs.readFile(filePath);

    const ext = slug[slug.length - 1].split('.').pop()?.toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === 'png') mimeType = 'image/png';
    else if (ext === 'webp') mimeType = 'image/webp';
    else if (ext === 'svg') mimeType = 'image/svg+xml';
    else if (ext === 'pdf') mimeType = 'application/pdf';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return new NextResponse('Файл не найден', { status: 404 });
  }
}