import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET() {
  try {
    const docs = [
      {
        category: "catalog",
        file: "Presentation_Davis_Derby.pdf",
        size: "4.3 Мб",
        order: 1,
        title: {
          ru: "Презентация Davis Derby",
          en: "Davis Derby Presentation",
          cn: "戴维斯德比演示文稿"
        }
      },
      {
        category: "certificate",
        file: "Certificate_ASKU.pdf",
        size: "5.4 Мб",
        order: 2,
        title: {
          ru: "СЕРТИФИКАТ АСКУ",
          en: "ASKU Certificate",
          cn: "ASKU 认证证书"
        }
      },
      {
        category: "manual",
        file: "Description_Means_Measurement.pdf",
        size: "1.2 Мб",
        order: 3,
        title: {
          ru: "ОПИСАНИЕ ТИПА СРЕДСТВА ИЗМЕРЕНИЙ",
          en: "Description of the Measuring Instrument Type",
          cn: "测量器具型式说明"
        }
      },
      {
        category: "manual",
        file: "Verification_Methodology.pdf",
        size: "1.4 Мб",
        order: 4,
        title: {
          ru: "МЕТОДИКА ПОВЕРКИ",
          en: "Verification Methodology",
          cn: "检定规程"
        }
      },
      {
        category: "certificate",
        file: "https://fgis.gost.ru/fundmetrology/registry/65/items/395632",
        size: "Внешний ресурс",
        order: 5,
        title: {
          ru: "СВИДЕТЕЛЬСТВО об утверждении типа средств измерений",
          en: "Certificate of Measuring Instrument Type Approval",
          cn: "测量器具型式批准证书"
        }
      }
    ];

    await prisma.document.deleteMany({});

    await prisma.document.createMany({
      data: docs
    });

    return NextResponse.json({ 
      status: "success", 
      message: "Актуальные документы успешно записаны в базу данных!" 
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      status: "error", 
      message: error.message 
    }, { status: 500 });
  }
}