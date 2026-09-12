import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db"
export async function GET() {
  try {
    const docs = [
      {
        category: "certificate",
        file: "Certificate_ASKU.pdf",
        size: "1.4 Мб",
        order: 1,
        title: {
          ru: "Сертификат соответствия ЕАЭС ТР ТС 012/2011 на систему АСКУ",
          en: "EAEU TR CU 012/2011 Certificate of Conformity for ASKU System",
          cn: "ASKU 系统 EAEU TR CU 012/2011 符合性证书"
        }
      },
      {
        category: "catalog",
        file: "Catalog_DDS_Full.pdf",
        size: "4.2 Мб",
        order: 2,
        title: {
          ru: "Общий каталог продукции Девис Дерби Сибирь (Полная версия)",
          en: "Davis Derby Siberia General Product Catalog (Full Version)",
          cn: "戴维斯德比西伯利亚综合产品目录（完整版）"
        }
      },
      {
        category: "manual",
        file: "Manual_SHEP01.pdf",
        size: "850 Кб",
        order: 3,
        title: {
          ru: "Руководство по эксплуатации и паспорт. Прибор ШЭП-01",
          en: "Operating Manual and Passport. SHEP-01 Device",
          cn: "SHEP-01 仪表操作手册与合格证"
        }
      },
      {
        category: "manual",
        file: "Manual_MW_MK8.pdf",
        size: "1.1 Мб",
        order: 4,
        title: {
          ru: "Руководство пользователя. Управляемый шахтный коммутатор MW-MK8/2.M",
          en: "User Manual. Managed Mine Switch MW-MK8/2.M",
          cn: "MW-MK8/2.M 网管型交换机用户手册"
        }
      },
      {
        category: "certificate",
        file: "Certificate_Flowmeter.pdf",
        size: "920 Кб",
        order: 5,
        title: {
          ru: "Сертификат ТР ТС на расходомер искробезопасный РИ",
          en: "TR CU Certificate for Intrinsically Safe Flowmeter RI",
          cn: "RI 本安型流量计 TR CU 认证证书"
        }
      }
    ];

    // Очищаем старые записи, если ты вдруг нажмешь на ссылку дважды
    await prisma.document.deleteMany({});

    // Загружаем все документы разом
    await prisma.document.createMany({
      data: docs
    });

    return NextResponse.json({ 
      status: "success", 
      message: "Все 5 документов успешно загружены в базу данных!" 
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      status: "error", 
      message: error.message 
    }, { status: 500 });
  }
}