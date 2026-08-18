"use client";

import Link from "next/link";
import styles from "./wipan.module.css";
import { useLanguage } from "@/app/context/LanguageContext";

export default function WiPanPage() {
  const { currentLang = "ru" } = useLanguage ? useLanguage() : { currentLang: "ru" };

  const systemData = {
    id: "wipan",
    ex: "Ex ia I Ma",
    image: "wipan_1.jpg",
    title: {
      ru: "WiPan Беспроводная персональная сеть",
      en: "WiPan Wireless Personal Network",
      cn: "WiPan 无线个人网络",
    },
    desc: {
      ru: "Cистема Davis Derby WiPAN — это беспроводная платформа, которая обеспечивает высоконадежное покрытие беспроводной сетью связи на всей территории шахтной установки.",
      en: "The Davis Derby WiPAN system is a wireless platform that provides highly reliable wireless communication network coverage throughout the mine installation area.",
      cn: "戴维斯德比 WiPAN 系统是一个无线平台，可在整个矿井安装区域内提供高可靠性的无线通信网络覆盖。",
    },
    specs: {
      ru: [
        "Предназначена для точного позиционирования персонала, техники и сбора телеметрии с переносных датчиков безопасности.",
        "Использует энергоэффективную топологию самоорганизующейся ячеистой сети (Mesh), повышающую общую живучесть системы связи.",
        "Обеспечивает двусторонний обмен текстовыми сообщениями, сигналами аварийного оповещения и голосовыми вызовами под землей.",
        "Базовые станции сети имеют малые габариты, автономное питание и легко монтируются в шахтных выработках любой конфигурации.",
      ],
      en: [
        "Designed for accurate positioning of personnel, machinery, and telemetry collection from portable safety sensors.",
        "Utilizes an energy-efficient self-organizing mesh network topology, increasing the overall survivability of the communication system.",
        "Provides two-way exchange of text messages, emergency warning signals, and voice calls underground.",
        "Network base stations have small dimensions, autonomous power supply, and are easily mounted in mine workings of any configuration.",
      ],
      cn: [
        "旨在用于人员和设备的精确 underground 定位，以及从便携式安全传感器收集遥测数据。",
        "采用低功耗自组织网状网络拓扑结构（Mesh），提高了通信系统的整体生存能力。",
        "提供地下双向文本消息、应急报警信号和语音呼叫的交换。",
        "网络基站体积小、自主供电，易于在任何配置的矿井巷道内安装。",
      ],
    },
    table: [
      {
        param: {
          ru: "Рабочий диапазон частот беспроводной сети, ГГц",
          en: "Wireless network operating frequency range, GHz",
          cn: "无线网络工作频率范围，GHz",
        },
        value: {
          ru: "2,4 (в соответствии со стандартом IEEE 802.15.4)",
          en: "2.4 (according to IEEE 802.15.4 standard)",
          cn: "2.4（符合 IEEE 802.15.4 标准）",
        },
      },
      {
        param: {
          ru: "Точность позиционирования персонала/техники, м",
          en: "Personnel/machinery positioning accuracy, m",
          cn: "人员/设备定位精度，米",
        },
        value: {
          ru: "до ±5 (в зоне прямой видимости базовых станций)",
          en: "up to ±5 (within line of sight of base stations)",
          cn: "最高 ±5（在基站视距范围内）",
        },
      },
      {
        param: {
          ru: "Максимальное количество мобильных меток в сети, шт",
          en: "Maximum number of mobile tags in the network, pcs",
          cn: "网络中移动标签的最大数量，个",
        },
        value: { ru: "до 65000", en: "up to 65000", cn: "最多 65000 个" },
      },
      {
        param: {
          ru: "Дальность связи между соседними узлами (Mesh), м",
          en: "Communication range between adjacent nodes (Mesh), m",
          cn: "相邻节点间的通信距离 (Mesh)，米",
        },
        value: {
          ru: "до 150 (в подземных выработках)",
          en: "up to 150 (in underground workings)",
          cn: "长达 150（在地下巷道内）",
        },
      },
      {
        param: {
          ru: "Время непрерывной работы мобильной метки от батареи",
          en: "Continuous operating time of a mobile tag from battery",
          cn: "移动标签电池连续运行时间",
        },
        value: {
          ru: "не менее 1 года (в зависимости от периода опроса)",
          en: "min 1 year (depending on polling period)",
          cn: "不少于 1 年（取决于轮询周期）",
        },
      },
      {
        param: {
          ru: "Степень защиты оболочки базовых станций по ГОСТ 14254",
          en: "Ingress protection (IP) of base stations enclosure according to GOST 14254",
          cn: "根据 GOST 14254 标准的基站外壳防护等级 (IP)",
        },
        value: { ru: "IP65", en: "IP65", cn: "IP65" },
      },
      {
        param: {
          ru: "Маркировка взрывозащиты компонентов сети",
          en: "Explosion protection marking of network components",
          cn: "网络组件防爆标志",
        },
        value: { ru: "Ex ia I Ma", en: "Ex ia I Ma", cn: "Ex ia I Ma" },
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
                    "https://placehold.co/600x450/0d233a/ffffff?text=WiPan+System";
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