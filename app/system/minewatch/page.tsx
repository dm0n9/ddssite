"use client";

import Link from "next/link";
import styles from "./minewatch.module.css";
import { useLanguage } from "@/app/context/LanguageContext";

export default function MineWatchPage() {
  const { currentLang = "ru" } = useLanguage ? useLanguage() : { currentLang: "ru" };

  const systemData = {
    id: "minewatch",
    ex: "Ex ia I Ma",
    image: "PC21-1.jpg",
    title: {
      ru: "Система MineWATCH",
      en: "MineWATCH System",
      cn: "MineWATCH 系统",
    },
    desc: {
      ru: "Комплексная интегрированная система для сквозного автоматизированного управления, диспетчеризации и непрерывного мониторинга всей технологической цепочки шахты с передачей данных на поверхность.",
      en: "Comprehensive integrated system for end-to-end automated control, dispatching, and continuous monitoring of the entire mine technological chain with data transmission to the surface.",
      cn: "一套用于整座矿山自动化集中控制、调度和连续監測的综合系统，可将相关数据传输至地面。",
    },
    specs: {
      ru: [
        "Объединяет в единый комплекс системы конвейерного транспорта, газового контроля, связи и позиционирования.",
        "Обеспечивает сбор данных со всех подземных контроллеров и выводит их в виде графических мнемосхем на АРМ диспетчера.",
        "Обладает высокой живучестью: поддерживает резервирование линий связи, резервное питание и автономную работу сегментов.",
        "Флагманское решение Davis Derby для комплексной безопасности, автоматизации и снижения рисков аварийности на горных предприятиях.",
      ],
      en: [
        "Combines conveyor transport, gas monitoring, communication, and positioning systems into a single complex.",
        "Provides data collection from all underground controllers and outputs them as graphical mimic diagrams to the dispatcher's workstation.",
        "Features high survivability: supports communication line redundancy, backup power, and autonomous segment operation.",
        "Davis Derby's flagship solution for comprehensive safety, automation, and reducing accident risks in mining enterprises.",
      ],
      cn: [
        "将输送机运输、气体监测、通信和定位系统整合为一个统一的复合体系统。",
        "实现从所有地下控制器收集数据，并将其作为图形模拟图输出至调度员工作站。",
        "具有极高的生存能力：支持通信线路冗余、备用电源和网络分段自主运行。",
        "戴维斯德比的旗舰解决方案，用于矿山企业的综合安全、自动化和降低事故风险。",
      ],
    },
    table: [
      {
        param: {
          ru: "Максимальное количество опрашиваемых подземных контроллеров, шт",
          en: "Maximum number of polled underground controllers, pcs",
          cn: "最大可轮询地下控制器数量，个",
        },
        value: {
          ru: "до 254 (в рамках одной сетевой структуры)",
          en: "up to 254 (within a single network structure)",
          cn: "最多 254 个（在单网络结构内）",
        },
      },
      {
        param: {
          ru: "Протокол магистральной передачи данных на поверхность",
          en: "Main data transmission protocol to the surface",
          cn: "上传至地面的主干数据传输协议",
        },
        value: {
          ru: "TCP/IP (по волоконно-оптическим линиям ВОЛС / Ethernet)",
          en: "TCP/IP (via fiber-optic lines FOCL / Ethernet)",
          cn: "TCP/IP（通过光纤线路 FOCL / 以太网）",
        },
      },
      {
        param: {
          ru: "Время обновления данных на АРМ диспетчера, с",
          en: "Data update time at dispatcher's workstation, s",
          cn: "调度员工作站数据更新时间，秒",
        },
        value: {
          ru: "не более 1...2 (для критических параметров безопасности)",
          en: "max 1...2 (for critical safety parameters)",
          cn: "不超过 1...2（针对关键安全参数）",
        },
      },
      {
        param: {
          ru: "Поддерживаемые типы искробезопасных датчиков",
          en: "Supported intrinsically safe sensor types",
          cn: "支持的本安型传感器类型",
        },
        value: {
          ru: "Аналоговые (4-20 мА), Дискретные, Частотные, RS-485 (Modbus)",
          en: "Analog (4-20 mA), Discrete, Frequency, RS-485 (Modbus)",
          cn: "模拟量 (4-20 mA), 数字量, 频率量, RS-485 (Modbus)",
        },
      },
      {
        param: {
          ru: "Время автономной работы центральных узлов при аварии сети питания, ч",
          en: "Autonomous operation time of central nodes during power outage, h",
          cn: "电网断电时核心节点自主运行时间，小时",
        },
        value: {
          ru: "не менее 4 (от встроенных взрывозащищенных ИБП)",
          en: "min 4 (from built-in explosion-proof UPS)",
          cn: "不少于 4 小时（来自内置防爆不间断电源）",
        },
      },
      {
        param: {
          ru: "Интеграция с внешним программным обеспечением",
          en: "Integration with external software",
          cn: "与外部软件的集成管理",
        },
        value: {
          ru: "Поддержка OPC UA / OPC DA для SCADA-систем верхнего уровня",
          en: "OPC UA / OPC DA support for upper-level SCADA systems",
          cn: "支持用于上级 SCADA 系统的 OPC UA / OPC DA",
        },
      },
      {
        param: {
          ru: "Маркировка взрывозащиты центрального подземного оборудования",
          en: "Explosion protection marking of central underground equipment",
          cn: "地下核心设备防爆标志",
        },
        value: {
          ru: "Ex ia I Ma (компоненты управления)",
          en: "Ex ia I Ma (control components)",
          cn: "Ex ia I Ma（控制组件）",
        },
      },
    ],
  };

  const uiTexts = {
    back: { ru: "Назад к системам", en: "Back to Systems", cn: "返回系统列表" },
    specs_title: { ru: "Область применения и особенности", en: "Scope of Application and Features", cn: "应用领域及特点" },
    table_title: { ru: "Технические характеристики", en: "Technical Specifications", cn: "技术参数" },
    th_param: { ru: "Наименование параметра", en: "Parameter Name", cn: "参数名称" },
    th_value: { ru: "Значение", en: "Value", cn: "数值" },
  };

  return (
    <main className={styles.main_layout}>
      <div className={styles.container}>
        
        {/* Кнопка возврата к списку систем */}
        <div className={styles.nav_header}>
          <Link href="/system" className={styles.back_link}>
            ← {uiTexts.back[currentLang as keyof typeof uiTexts.back] || uiTexts.back.ru}
          </Link>
        </div>

        {/* Карточка системы */}
        <article className={styles.content_card}>
          <div className={styles.header_row}>
            <span className={styles.ex_badge}>{systemData.ex}</span>
          </div>

          <div className={styles.grid_two_cols}>
            <div className={styles.image_wrapper}>
              <img
                src={`/products/${systemData.image}`}
                alt={systemData.title[currentLang as keyof typeof systemData.title] || systemData.title.ru}
                className={styles.product_image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x450/0d233a/ffffff?text=MineWATCH";
                }}
              />
            </div>

            <div>
              <h1 className={styles.title}>
                {systemData.title[currentLang as keyof typeof systemData.title] || systemData.title.ru}
              </h1>
              <p className={styles.description}>
                {systemData.desc[currentLang as keyof typeof systemData.desc] || systemData.desc.ru}
              </p>

              <div className={styles.specs_section}>
                <h3 className={styles.section_subtitle}>
                  {uiTexts.specs_title[currentLang as keyof typeof uiTexts.specs_title] || uiTexts.specs_title.ru}
                </h3>
                <ul className={styles.specs_list}>
                  {(systemData.specs[currentLang as keyof typeof systemData.specs] || systemData.specs.ru).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Таблица параметров */}
          <div className={styles.table_section}>
            <h3 className={styles.section_subtitle}>
              {uiTexts.table_title[currentLang as keyof typeof uiTexts.table_title] || uiTexts.table_title.ru}
            </h3>
            <table className={styles.tech_table}>
              <thead>
                <tr>
                  <th>{uiTexts.th_param[currentLang as keyof typeof uiTexts.th_param] || uiTexts.th_param.ru}</th>
                  <th>{uiTexts.th_value[currentLang as keyof typeof uiTexts.th_value] || uiTexts.th_value.ru}</th>
                </tr>
              </thead>
              <tbody>
                {systemData.table.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.td_param}>
                      {row.param[currentLang as keyof typeof row.param] || row.param.ru}
                    </td>
                    <td className={styles.td_value}>
                      {row.value[currentLang as keyof typeof row.value] || row.value.ru}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

      </div>
    </main>
  );
}