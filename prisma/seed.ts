import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const systemsData = [
  {
    id: "conveyor-control",
    ex: "Ex ib I Mb",
    image: "conveyor_1.jpg",
    title: {
      ru: "Система управления конвейерным транспортом",
      en: "Conveyor Transport Control System",
      cn: "输送机运输控制系统"
    },
    desc: {
      ru: "Система предназначена для автоматизированного централизованного управления и оперативного контроля разветвленными конвейерными линиями и сопутствующим оборудованием.",
      en: "The system is designed for automated centralized management and operational monitoring of branched conveyor lines and associated equipment.",
      cn: "该系统旨在用于分支输送机线及相关设备的自动化集中管理和运行监测。"
    },
    specs: {
      ru: [
        "Обеспечивает автоматический последовательный пуск и остановку конвейеров в составе единой технологической цепочки.",
        "Непрерывно контролирует датчики безопасности (экстренное прекращение пуска, сход ленты, завал перегрузочных пунктов, скорость).",
        "Позволяет осуществлять громкоговорящую связь, предпусковую звуковую и аварийную световую сигнализацию вдоль всего става конвейера.",
        "Визуализирует состояние всех датчиков и узлов линии на диспетчерском пульте верхнего уровня в реальном времени."
      ],
      en: [
        "Provides automatic sequential startup and shutdown of conveyors within a unified technological chain.",
        "Continuously monitors safety sensors (emergency pull switches, belt misalignment, chute blockage, speed).",
        "Allows loudspeakers communication, pre-start acoustic and emergency visual signaling along the entire conveyor route.",
        "Visualizes the status of all sensors and line nodes on the upper-level dispatch control console in real time."
      ],
      cn: [
        "实现统一工艺链内输送机的自动顺序启动和停止。",
        "对安全传感器（紧急拉绳、皮带跑偏、溜槽堵塞、速度）进行连续监测。",
        "支持沿整条输送机线路进行扩音通信、启动前声音和应急光信号报警。",
        "在上级调度控制台实时可视化显示所有传感器和线路节点的状态。"
      ]
    },
    table: [
      {
        param: { ru: "Максимальное количество контролируемых конвейеров в одной цепочке", en: "Maximum number of monitored conveyors in a single chain", cn: "单链最大受控输送机数量" },
        value: { ru: "до 32", en: "up to 32", cn: "最多 32 个" }
      },
      {
        param: { ru: "Время задержки между пуском смежных конвейеров, с", en: "Delay time between starting adjacent conveyors, s", cn: "相邻输送机启动延时时间，秒" },
        value: { ru: "регулируемое, от 5 до 30", en: "adjustable, from 5 to 30", cn: "可调，5 至 30" }
      },
      {
        param: { ru: "Интерфейсы связи для интеграции в АСУ ТП", en: "Communication interfaces for PCS integration", cn: "用于集成至工业自动化系统的通信接口" },
        value: { ru: "Ethernet (TCP/IP), RS-485 (Modbus RTU)", en: "Ethernet (TCP/IP), RS-485 (Modbus RTU)", cn: "以太网 (TCP/IP), RS-485 (Modbus RTU)" }
      },
      {
        param: { ru: "Дальность действия линии связи и оповещения, км", en: "Communication and signaling line operation range, km", cn: "通信和报警线路技术距离，公里" },
        value: { ru: "до 5 (без промежуточных повторителей)", en: "up to 5 (without intermediate repeaters)", cn: "长达 5（不含中间重复器）" }
      },
      {
        param: { ru: "Номинальное напряжение питания блоков системы, В", en: "Nominal supply voltage of system blocks, V", cn: "系统模块额定供电电压，V" },
        value: { ru: "12 / 36 (искробезопасное в зависимости от блока)", en: "12 / 36 (intrinsically safe depending on the block)", cn: "12 / 36（根据模块型号确定的本安型）" }
      },
      {
        param: { ru: "Степень защиты оболочек оборудования по ГОСТ 14254", en: "Equipment enclosures ingress protection (IP) according to GOST 14254", cn: "根据 GOST 14254 标准的设备外壳防护等级 (IP)" },
        value: { ru: "IP65", en: "IP65", cn: "IP65" }
      },
      {
        param: { ru: "Маркировка взрывозащиты основных блоков контроля", en: "Explosion protection marking of main control blocks", cn: "主控制模块防爆标志" },
        value: { ru: "Ex ib I Mb", en: "Ex ib I Mb", cn: "Ex ib I Mb" }
      },
      {
        param: { ru: "Средний срок службы системы, лет, не менее", en: "Average system service life, years, min", cn: "系统平均使用寿命，年，不低于" },
        value: { ru: "8", en: "8", cn: "8" }
      }
    ]
  },
  {
    id: "minewatch",
    ex: "Ex ia I Ma",
    image: "PC21-1.jpg",
    title: {
      ru: "Система MineWATCH",
      en: "MineWATCH System",
      cn: "MineWATCH 系统"
    },
    desc: {
      ru: "Комплексная интегрированная система для сквозного автоматизированного управления, диспетчеризации и непрерывного мониторинга всей технологической цепочки шахты с передачей данных на поверхность.",
      en: "Comprehensive integrated system for end-to-end automated control, dispatching, and continuous monitoring of the entire mine technological chain with data transmission to the surface.",
      cn: "一套用于整座矿山自动化集中控制、调度和连续監測的综合系统，可将相关数据传输至地面。"
    },
    specs: {
      ru: [
        "Объединяет в единый комплекс системы конвейерного транспорта, газового контроля, связи и позиционирования.",
        "Обеспечивает сбор данных со всех подземных контроллеров и выводит их в виде графических мнемосхем на АРМ диспетчера.",
        "Обладает высокой живучестью: поддерживает резервирование линий связи, резервное питание и автономную работу сегментов.",
        "Флагманское решение Davis Derby для комплексной безопасности, автоматизации и снижения рисков аварийности на горных предприятиях."
      ],
      en: [
        "Combines conveyor transport, gas monitoring, communication, and positioning systems into a single complex.",
        "Provides data collection from all underground controllers and outputs them as graphical mimic diagrams to the dispatcher's workstation.",
        "Features high survivability: supports communication line redundancy, backup power, and autonomous segment operation.",
        "Davis Derby's flagship solution for comprehensive safety, automation, and reducing accident risks in mining enterprises."
      ],
      cn: [
        "将输送机运输、气体监测、通信和定位系统整合为一个统一的复合体系统。",
        "实现从所有地下控制器收集数据，并将其作为图形模拟图输出至调度员工作站。",
        "具有极高的生存能力：支持通信线路冗余、备用电源和网络分段自主运行。",
        "戴维斯德比的旗舰解决方案，用于矿山企业的综合安全、自动化和降低事故风险。"
      ]
    },
    table: [
      {
        param: { ru: "Максимальное количество опрашиваемых подземных контроллеров, шт", en: "Maximum number of polled underground controllers, pcs", cn: "最大可轮询地下控制器数量，个" },
        value: { ru: "до 254 (в рамках одной сетевой структуры)", en: "up to 254 (within a single network structure)", cn: "最多 254 个（在单网络结构内）" }
      },
      {
        param: { ru: "Протокол магистральной передачи данных на поверхность", en: "Main data transmission protocol to the surface", cn: "上传至地面的主干数据传输协议" },
        value: { ru: "TCP/IP (по волоконно-оптическим линиям ВОЛС / Ethernet)", en: "TCP/IP (via fiber-optic lines FOCL / Ethernet)", cn: "TCP/IP（通过光纤线路 FOCL / 以太网）" }
      },
      {
        param: { ru: "Время обновления данных на АРМ диспетчера, с", en: "Data update time at dispatcher's workstation, s", cn: "调度员工作站数据更新时间，秒" },
        value: { ru: "не более 1...2 (для критических параметров безопасности)", en: "max 1...2 (for critical safety parameters)", cn: "不超过 1...2（针对关键安全参数）" }
      },
      {
        param: { ru: "Поддерживаемые типы искробезопасных датчиков", en: "Supported intrinsically safe sensor types", cn: "支持的本安型传感器类型" },
        value: { ru: "Аналоговые (4-20 мА), Дискретные, Частотные, RS-485 (Modbus)", en: "Analog (4-20 mA), Discrete, Frequency, RS-485 (Modbus)", cn: "模拟量 (4-20 mA), 数字量, 频率量, RS-485 (Modbus)" }
      },
      {
        param: { ru: "Время автономной работы центральных узлов при аварии сети питания, ч", en: "Autonomous operation time of central nodes during power outage, h", cn: "电网断电时核心节点自主运行时间，小时" },
        value: { ru: "не менее 4 (от встроенных взрывозащищенных ИБП)", en: "min 4 (from built-in explosion-proof UPS)", cn: "不少于 4 小时（来自内置防爆不间断电源）" }
      },
      {
        param: { ru: "Интеграция с внешним программным обеспечением", en: "Integration with external software", cn: "与外部软件的集成管理" },
        value: { ru: "Поддержка OPC UA / OPC DA для SCADA-систем верхнего уровня", en: "OPC UA / OPC DA support for upper-level SCADA systems", cn: "支持用于上级 SCADA 系统的 OPC UA / OPC DA" }
      },
      {
        param: { ru: "Маркировка взрывозащиты центрального подземного оборудования", en: "Explosion protection marking of central underground equipment", cn: "地下核心设备防爆标志" },
        value: { ru: "Ex ia I Ma (компоненты управления)", en: "Ex ia I Ma (control components)", cn: "Ex ia I Ma（控制组件）" }
      }
    ]
  },
  {
    id: "wipan",
    ex: "Ex ia I Ma",
    image: "wipan_1.jpg",
    title: {
      ru: "WiPan Беспроводная персональная сеть",
      en: "WiPan Wireless Personal Network",
      cn: "WiPan 无线个人网络"
    },
    desc: {
      ru: "Cистема Davis Derby WiPAN — это беспроводная платформа, которая обеспечивает высоконадежное покрытие беспроводной сетью связи на всей территории шахтной установки.",
      en: "The Davis Derby WiPAN system is a wireless platform that provides highly reliable wireless communication network coverage throughout the mine installation area.",
      cn: "戴维斯德比 WiPAN 系统是一个无线平台，可在整个矿井安装区域内提供高可靠性的无线通信网络覆盖。"
    },
    specs: {
      ru: [
        "Предназначена для точного позиционирования персонала, техники и сбора телеметрии с переносных датчиков безопасности.",
        "Использует энергоэффективную топологию самоорганизующейся ячеистой сети (Mesh), повышающую общую живучесть системы связи.",
        "Обеспечивает двусторонний обмен текстовыми сообщениями, сигналами аварийного оповещения и голосовыми вызовами под землей.",
        "Базовые станции сети имеют малые габариты, автономное питание и легко монтируются в шахтных выработках любой конфигурации."
      ],
      en: [
        "Designed for accurate positioning of personnel, machinery, and telemetry collection from portable safety sensors.",
        "Utilizes an energy-efficient self-organizing mesh network topology, increasing the overall survivability of the communication system.",
        "Provides two-way exchange of text messages, emergency warning signals, and voice calls underground.",
        "Network base stations have small dimensions, autonomous power supply, and are easily mounted in mine workings of any configuration."
      ],
      cn: [
        "旨在用于人员和设备的精确 underground 定位，以及从便携式安全传感器收集遥测数据。",
        "采用低功耗自组织网状网络拓扑结构（Mesh），提高了通信系统的整体生存能力。",
        "提供地下双向文本消息、应急报警信号和语音呼叫的交换。",
        "网络基站体积小、自主供电，易于在任何配置的矿井巷道内安装。"
      ]
    },
    table: [
      {
        param: { ru: "Рабочий диапазон частот беспроводной сети, ГГц", en: "Wireless network operating frequency range, GHz", cn: "无线网络工作频率范围，GHz" },
        value: { ru: "2,4 (в соответствии со стандартом IEEE 802.15.4)", en: "2.4 (according to IEEE 802.15.4 standard)", cn: "2.4（符合 IEEE 802.15.4 标准）" }
      },
      {
        param: { ru: "Точность позиционирования персонала/техники, м", en: "Personnel/machinery positioning accuracy, m", cn: "人员/设备定位精度，米" },
        value: { ru: "до ±5 (в зоне прямой видимости базовых станций)", en: "up to ±5 (within line of sight of base stations)", cn: "最高 ±5（在基站视距范围内）" }
      },
      {
        param: { ru: "Максимальное количество мобильных меток в сети, шт", en: "Maximum number of mobile tags in the network, pcs", cn: "网络中移动标签的最大数量，个" },
        value: { ru: "до 65000", en: "up to 65000", cn: "最多 65000 个" }
      },
      {
        param: { ru: "Дальность связи между соседними узлами (Mesh), м", en: "Communication range between adjacent nodes (Mesh), m", cn: "相邻节点间的通信距离 (Mesh)，米" },
        value: { ru: "до 150 (в подземных выработках)", en: "up to 150 (in underground workings)", cn: "长达 150（在地下巷道内）" }
      },
      {
        param: { ru: "Время непрерывной работы мобильной метки от батареи", en: "Continuous operating time of a mobile tag from battery", cn: "移动标签电池连续运行时间" },
        value: { ru: "не менее 1 года (в зависимости от периода опроса)", en: "min 1 year (depending on polling period)", cn: "不少于 1 年（取决于轮询周期）" }
      },
      {
        param: { ru: "Степень защиты оболочки базовых станций по ГОСТ 14254", en: "Ingress protection (IP) of base stations enclosure according to GOST 14254", cn: "根据 GOST 14254 标准的基站外壳防护等级 (IP)" },
        value: { ru: "IP65", en: "IP65", cn: "IP65" }
      },
      {
        param: { ru: "Маркировка взрывозащиты компонентов сети", en: "Explosion protection marking of network components", cn: "网络组件防爆标志" },
        value: { ru: "Ex ia I Ma", en: "Ex ia I Ma", cn: "Ex ia I Ma" }
      }
    ]
  }
];

async function main() {
  console.log('Очистка старых данных...');
  await prisma.system.deleteMany();
  console.log('Начинается импорт систем в базу данных...');

  for (const [index, item] of systemsData.entries()) {
    const payload = {
      ex: item.ex,
      image: item.image,
      title: item.title,
      shortDesc: item.desc,
      applications: item.specs,
      specifications: item.table,
      additionalImages: [],
      isHidden: false,
      order: index + 1,
    };

    await prisma.system.upsert({
      where: { slug: item.id },
      update: payload,
      create: {
        slug: item.id,
        ...payload,
      },
    });

    console.log(`✓ Система импортирована [№${index + 1}]: ${item.id}`);
  }

  console.log('Все системы успешно перенесены в PostgreSQL!');
}

main()
  .catch((e) => {
    console.error('Ошибка при переносе данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });