"use client";

import Link from "next/link";
import styles from "./conveyor.module.css";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ConveyorControlPage() {
  const { currentLang = "ru" } = useLanguage ? useLanguage() : { currentLang: "ru" };

  const systemData = {
    id: "conveyor-control",
    ex: "Ex ib I Mb",
    image: "conveyor_1.jpg",
    title: {
      ru: "Система управления конвейерным транспортом",
      en: "Conveyor Transport Control System",
      cn: "输送机运输控制系统",
    },
    desc: {
      ru: "Система предназначена для автоматизированного централизованного управления и оперативного контроля разветвленными конвейерными линиями и сопутствующим оборудованием.",
      en: "The system is designed for automated centralized management and operational monitoring of branched conveyor lines and associated equipment.",
      cn: "该系统旨在用于分支输送机线及相关设备的自动化集中管理和运行监测。",
    },
    specs: {
      ru: [
        "Обеспечивает автоматический последовательный пуск и остановку конвейеров в составе единой технологической цепочки.",
        "Непрерывно контролирует датчики безопасности (экстренное прекращение пуска, сход ленты, завал перегрузочных пунктов, скорость).",
        "Позволяет осуществлять громкоговорящую связь, предпусковую звуковую и аварийную световую сигнализацию вдоль всего става конвейера.",
        "Визуализирует состояние всех датчиков и узлов линии на диспетчерском пульте верхнего уровня в реальном времени.",
      ],
      en: [
        "Provides automatic sequential startup and shutdown of conveyors within a unified technological chain.",
        "Continuously monitors safety sensors (emergency pull switches, belt misalignment, chute blockage, speed).",
        "Allows loudspeakers communication, pre-start acoustic and emergency visual signaling along the entire conveyor route.",
        "Visualizes the status of all sensors and line nodes on the upper-level dispatch control console in real time.",
      ],
      cn: [
        "实现统一工艺链内输送机的自动顺序启动和停止。",
        "对安全传感器（紧急拉绳、皮带跑偏、溜槽堵塞、速度）进行连续监测。",
        "支持沿整条输送机线路进行扩音通信、启动前声音和应急光信号报警。",
        "在上级调度控制台实时可视化显示所有传感器和线路节点的状态。",
      ],
    },
    table: [
      {
        param: {
          ru: "Максимальное количество контролируемых конвейеров в одной цепочке",
          en: "Maximum number of monitored conveyors in a single chain",
          cn: "单链最大受控输送机数量",
        },
        value: { ru: "до 32", en: "up to 32", cn: "最多 32 个" },
      },
      {
        param: {
          ru: "Время задержки между пуском смежных конвейеров, с",
          en: "Delay time between starting adjacent conveyors, s",
          cn: "相邻输送机启动延时时间，秒",
        },
        value: { ru: "регулируемое, от 5 до 30", en: "adjustable, from 5 to 30", cn: "可调，5 至 30" },
      },
      {
        param: {
          ru: "Интерфейсы связи для интеграции в АСУ ТП",
          en: "Communication interfaces for PCS integration",
          cn: "用于集成至工业自动化系统的通信接口",
        },
        value: {
          ru: "Ethernet (TCP/IP), RS-485 (Modbus RTU)",
          en: "Ethernet (TCP/IP), RS-485 (Modbus RTU)",
          cn: "以太网 (TCP/IP), RS-485 (Modbus RTU)",
        },
      },
      {
        param: {
          ru: "Дальность действия линии связи и оповещения, км",
          en: "Communication and signaling line operation range, km",
          cn: "通信和报警线路技术距离，公里",
        },
        value: {
          ru: "до 5 (без промежуточных повторителей)",
          en: "up to 5 (without intermediate repeaters)",
          cn: "长达 5（不含中间重复器）",
        },
      },
      {
        param: {
          ru: "Номинальное напряжение питания блоков системы, В",
          en: "Nominal supply voltage of system blocks, V",
          cn: "系统模块额定供电电压，V",
        },
        value: {
          ru: "12 / 36 (искробезопасное в зависимости от блока)",
          en: "12 / 36 (intrinsically safe depending on the block)",
          cn: "12 / 36（根据模块型号确定的本安型）",
        },
      },
      {
        param: {
          ru: "Степень защиты оболочек оборудования по ГОСТ 14254",
          en: "Equipment enclosures ingress protection (IP) according to GOST 14254",
          cn: "根据 GOST 14254 标准的设备外壳防护等级 (IP)",
        },
        value: { ru: "IP65", en: "IP65", cn: "IP65" },
      },
      {
        param: {
          ru: "Маркировка взрывозащиты основных блоков контроля",
          en: "Explosion protection marking of main control blocks",
          cn: "主控制模块防爆标志",
        },
        value: { ru: "Ex ib I Mb", en: "Ex ib I Mb", cn: "Ex ib I Mb" },
      },
      {
        param: {
          ru: "Средний срок службы системы, лет, не менее",
          en: "Average system service life, years, min",
          cn: "系统平均使用寿命，年，不低于",
        },
        value: { ru: "8", en: "8", cn: "8" },
      },
    ],
  };

  const uiTexts = {
    back: { ru: "Назад к системам", en: "Back to Systems", cn: "返回系统列表" },
    specs_title: {
      ru: "Область применения и особенности",
      en: "Scope of Application and Features",
      cn: "应用领域及特点",
    },
    table_title: {
      ru: "Технические характеристики",
      en: "Technical Specifications",
      cn: "技术参数",
    },
    th_param: { ru: "Наименование параметра", en: "Parameter Name", cn: "参数名称" },
    th_value: { ru: "Значение", en: "Value", cn: "数值" },
  };

  return (
    <main className={styles.main_layout}>
      <div className={styles.container}>
        {/* Кнопка возврата */}
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
                    "https://placehold.co/600x450/0d233a/ffffff?text=Conveyor+Control";
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
                  {(systemData.specs[currentLang as keyof typeof systemData.specs] || systemData.specs.ru).map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
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
                  <th>
                    {uiTexts.th_param[currentLang as keyof typeof uiTexts.th_param] || uiTexts.th_param.ru}
                  </th>
                  <th>
                    {uiTexts.th_value[currentLang as keyof typeof uiTexts.th_value] || uiTexts.th_value.ru}
                  </th>
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