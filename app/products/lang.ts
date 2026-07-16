// app/minewatch/lang.ts
export const homeTexts = {
  home_page: {
    ru: "Продукция Девис Дерби Сибирь",
    en: "Davis Derby Siberia Products",
    cn: "戴维斯德比西伯利亚产品"
  },
  products: [
    {
      id: "shep-01",
      ex: "PO Ex ia I Ma",
      image: "shep_01.png",
      title: {
        ru: "Шахтный электроизмерительный прибор ШЭП-01",
        en: "Mine Electrical Measuring Device SHEP-01",
        cn: "SHEP-01 矿用电工测量仪表"
      },
      desc: {
        ru: "Универсальный контрольно-измерительный прибор.",
        en: "Universal control and measuring device.",
        cn: "通用控制和测量仪表。"
      },
      specs: {
        ru: [
          "Прибор для измерения искробезопасных цепей позволяет измерять постоянное и переменное напряжение, постоянный и переменный ток, частоту, коэффициент заполнения, сопротивление, емкость, падение напряжения на диодах, проводить «прозвонку» электрических цепей.",
          "Приборы могут применяться в угольных шахтах и рудниках и имеют маркировку взрывозащиты РО Ex ia I Ma.",
          "Соответствуют строгим требованиям ТР ТС 012/2011, ГОСТ 31610.0-2019, ГОСТ 31610.11-2019, ГОСТ 31442-2011."
        ],
        en: [
          "The device for measuring intrinsically safe circuits allows measuring DC and AC voltage, DC and AC current, frequency, duty cycle, resistance, capacitance, diode voltage drop, and performing continuity tests of electrical circuits.",
          "The devices can be used in coal mines and pits, carrying the PO Ex ia I Ma explosion protection marking.",
          "Complies with the strict requirements of TR CU 012/2011, GOST 31610.0-2019, GOST 31610.11-2019, GOST 31442-2011."
        ],
        cn: [
          "该本安电路测量仪表可用于测量交直流电压、交直流电流、频率、占空比、电阻、电容、二极管压降，并可对电路进行导通通路性测试（蜂鸣鸣叫测试）。",
          "该仪表适用于煤矿和矿山，具有 PO Ex ia I Ma 防爆标志。",
          "符合 TR CU 012/2011、GOST 31610.0-2019、GOST 31610.11-2019、GOST 31442-2011 的严格标准要求。"
        ]
      }, 
      // СТРУКТУРА ТАБЛИЦЫ ХАРАКТЕРИСТИК
            // Обновленная полная таблица для ШЭП-01
      table: [
        {
          param: { ru: "Измеряемое напряжение*", en: "Measured Voltage*", cn: "测量电压*" },
          value: { ru: "400 мВ – 600 В", en: "400 mV – 600 V", cn: "400 mV – 600 V" }
        },
        {
          param: { ru: "Измеряемый ток", en: "Measured Current", cn: "测量电流" },
          value: { ru: "400 мКA – 400 мА", en: "400 μA – 400 mA", cn: "400 μA – 400 mA" }
        },
        {
          param: { ru: "Измеряемое сопротивление", en: "Measured Resistance", cn: "测量电阻" },
          value: { ru: "400 Ом – 40 Moll", en: "400 Ohm – 40 MOhm", cn: "400 欧姆 – 40 兆欧" }
        },
        {
          param: { ru: "Измеряемая емкость", en: "Measured Capacitance", cn: "测量电容" },
          value: { ru: "4 нФ – 100 мкФ", en: "4 nF – 100 μF", cn: "4 nF – 100 μF" }
        },
        {
          param: { ru: "Измеряемая частота", en: "Measured Frequency", cn: "测量频率" },
          value: { ru: "0,9 Гц – 99,9 кГц", en: "0.9 Hz – 99.9 kHz", cn: "0.9 Hz – 99.9 kHz" }
        },
        {
          param: { ru: "Измеряемый коэффициент заполнения", en: "Measured Duty Cycle", cn: "测量占空比" },
          value: { ru: "0,1 – 99,9 %", en: "0.1 – 99.9 %", cn: "0.1 – 99.9 %" }
        },
        {
          param: { ru: "Маркировка взрывозащиты", en: "Explosion Protection Mark", cn: "防爆标志" },
          value: { ru: "PO Ex ia I Ma", en: "PO Ex ia I Ma", cn: "PO Ex ia I Ma" }
        },
        {
          param: { ru: "Масса, кг, не более", en: "Weight, kg, max", cn: "重量（公斤）不超过" },
          value: { ru: "0,08", en: "0.08", cn: "0.08" }
        },
        {
          param: { ru: "Потребляемая мощность, ВА, не более", en: "Power Consumption, VA, max", cn: "功耗（VA）不超过" },
          value: { ru: "0,25", en: "0.25", cn: "0.25" }
        }
      ],
      // Добавим новое поле для сноски под таблицей
      note: {
        ru: "*Максимальное измеряемое напряжение во взрывоопасной зоне 40 В",
        en: "*Maximum measured voltage in hazardous area is 40 V",
        cn: "*危险区域内的最大测量电压为 40 V"
      }

    },
    {
      id: "mw-mk8",
      ex: "Ex ia I Ma",
      image: "switch_MW.png",
      title: {
        ru: "Управляемый коммутатор MW-MK8/2.M",
        en: "Managed Switch MW-MK8/2.M",
        cn: "网管型交换机 MW-MK8/2.M"
      },
      desc: {
        ru: "Коммутатор предназначен для работы в составе оборудования сетей Ethernet.",
        en: "The switch is designed to operate as part of Ethernet network equipment.",
        cn: "该交换机旨在作为以太网网络设备的一部分运行。"
      },
            specs: {
        ru: [
          "8 портов 10/100BaseTX (RJ-45) и 2 оптических порта 1000Base-FX с номинальной дальностью 10 км (SC).",
          "Резервирование топологии: использование STP IEEE 802.1d 1998 и специализированных протоколов резервирования в кольце (от 1 до 4 колец с одним коммутатором).",
          "Возможность быстрого переключения с основного на резервный порт, комбинирование кольцевой топологии и резервирования.",
          "Поддержка протокола канального уровня LLDP для автоматического анонсирования и сбора информации о соседних устройствах в сети.",
          "Удаленная настройка по протоколу Telnet, через WEB-интерфейс, а также удаленная замена ПО через TFTP.",
          "Конфигурация хранится в энергонезависимой памяти в виде терминальных команд для удобного тиражирования настроек.",
          "Прочный корпус из нержавеющей стали с надежным креплением на DIN-рейку с помощью металлического зажима."
        ],
        en: [
          "8 ports 10/100BaseTX (RJ-45) and 2 optical ports 1000Base-FX with a nominal range of 10 km (SC).",
          "Topology redundancy: supports STP IEEE 802.1d 1998 and specialized ring redundancy protocols (from 1 to 4 rings with a single switch).",
          "Fast switching capability from primary to backup port, combining ring topology and port redundancy.",
          "LLDP support (Link Layer Discovery Protocol) for automatic advertising and gathering data about neighboring network devices.",
          "Remote configuration via Telnet protocol, WEB management interface, and remote software updates via TFTP.",
          "Configuration is stored in non-volatile memory as a sequence of terminal commands for easy replication of settings.",
          "Durable stainless steel housing with secure DIN-rail mounting using a metal clip."
        ],
        cn: [
          "8 个 10/100BaseTX (RJ-45) 端口和 2 个 1000Base-FX 光口，标称距离为 10 公里 (SC)。",
          "拓扑冗余：支持 STP IEEE 802.1d 1998 和专用的环网冗余协议（单台交换机支持 1 到 4 个环路）。",
          "支持主备端口之间的快速切换，可将环网拓扑与端口冗余相结合。",
          "支持链路层发现协议 (LLDP)，用于自动发布和收集网络中相邻设备的信息。",
          "可通过 Telnet 协议、WEB 管理界面进行远程配置，并支持通过 TFTP 进行远程固件升级。",
          "配置以终端命令序列的形式存储在非易失性存储器中，便于轻松复制和修改设置。",
          "坚固的不锈钢外壳，使用金属卡子牢固地安装在 DIN 导轨上。"
        ]
      },
        table: [
    { 
      param: { 
        ru: "Диапазон температуры окружающей среды при эксплуатации сигнализатора, °С", 
        en: "Operating ambient temperature range of the signaling device, °С", 
        cn: "报警器运行环境温度范围，°С" 
      },
      value: { ru: "от -40 до +50", en: "from -40 to +50", cn: "-40 至 +50" } 
    },
    { 
      param: { 
        ru: "Диапазон относительной влажности атмосферного воздуха, % при 35 °С (без конденсации влаги)", 
        en: "Relative humidity range of atmospheric air, % at 35 °С (without moisture condensation)", 
        cn: "大气相对湿度范围，35 °С 时 %（无水分凝结）" 
      }, 
      value: { ru: "от 20 до 98", en: "from 20 to 98", cn: "20 至 98" } 
    },
    { 
      param: { 
        ru: "Атмосферное давление, кПа", 
        en: "Atmospheric pressure, kPa", 
        cn: "大气压力，kPa" 
      }, 
      value: { ru: "от 80 до 120", en: "from 80 to 120", cn: "80 至 120" } 
    },
    { 
      param: { 
        ru: "Габаритные размеры (ДхШхВ), мм, не более", 
        en: "Overall dimensions (LxWxH), mm, max", 
        cn: "外形尺寸（长x宽x高），毫米，不超过" 
      }, 
      value: { ru: "150х100х50", en: "150x100x50", cn: "150x100x50" } 
    },
    { 
      param: { 
        ru: "Масса, кг, не более", 
        en: "Weight, kg, max", 
        cn: "重量，公斤, 不超过" 
      }, 
      value: { ru: "2", en: "2", cn: "2" } 
    },
    { 
      param: { 
        ru: "Напряжение питания постоянного тока, В", 
        en: "DC supply voltage, V", 
        cn: "直流电源电压，V" 
      }, 
      value: { ru: "от 10,5 до 13,5", en: "from 10.5 to 13.5", cn: "10.5 至 13.5" } 
    },
    { 
      param: { 
        ru: "Портов 10/100BaseTX half/full duplex - количество портов", 
        en: "10/100BaseTX half/full duplex ports - port quantity", 
        cn: "10/100BaseTX 半双工/全双工端口 - 端口数量" 
      }, 
      value: { ru: "8", en: "8", cn: "8" } 
    },
    { 
      param: { 
        ru: "Портов 10/100BaseTX half/full duplex - тип разъема", 
        en: "10/100BaseTX half/full duplex ports - connector type", 
        cn: "10/100BaseTX 半双工/全双工端口 - 接口类型" 
      }, 
      value: { ru: "RJ-45", en: "RJ-45", cn: "RJ-45" } 
    },
    { 
      param: { 
        ru: "Портов 1000Base-FX, номинальная дальность 10 км - количество портов", 
        en: "1000Base-FX ports, nominal range 10 km - port quantity", 
        cn: "1000Base-FX 端口，标称距离 10 公里 - 端口数量" 
      }, 
      value: { ru: "2", en: "2", cn: "2" } 
    },
    { 
      param: { 
        ru: "Портов 1000Base-FX, номинальная дальность 10 км - тип разъема", 
        en: "1000Base-FX ports, nominal range 10 km - connector type", 
        cn: "1000Base-FX 端口，标称距离 10 公里 - 接口类型" 
      }, 
      value: { ru: "SC", en: "SC", cn: "SC" } 
    },
    { 
      param: { 
        ru: "Размер таблицы MAC", 
        en: "MAC table size", 
        cn: "MAC 表大小" 
      }, 
      value: { ru: "8K", en: "8K", cn: "8K" } 
    },
    { 
      param: { 
        ru: "Поддержка VLAN", 
        en: "VLAN support", 
        cn: "VLAN 支持" 
      }, 
      value: { ru: "4K групп, QiniQ", en: "4K groups, QinQ", cn: "4K 组, QinQ" } 
    },
    { 
      param: { 
        ru: "Устранение петель", 
        en: "Loop mitigation", 
        cn: "环路消除" 
      }, 
      value: { ru: "STP, RSTP", en: "STP, RSTP", cn: "STP, RSTP" } 
    },
    { 
      param: { 
        ru: "Зеркалирование портов", 
        en: "Port mirroring", 
        cn: "端口镜像" 
      }, 
      value: { ru: "CLI, WWW, SNMP v.1/2/3", en: "CLI, WWW, SNMP v.1/2/3", cn: "CLI, WWW, SNMP v.1/2/3" } 
    },
    { 
      param: { 
        ru: "Маркировка взрывозащиты", 
        en: "Explosion protection marking", 
        cn: "防爆标志" 
      }, 
      value: { ru: "PO Ex ia op is I Ma", en: "PO Ex ia op is I Ma", cn: "PO Ex ia op is I Ma" } 
    },
    { 
      param: { 
        ru: "Материал корпуса", 
        en: "Enclosure material", 
        cn: "外壳材质" 
      }, 
      value: { ru: "Нержавеющая сталь", en: "Stainless steel", cn: "不锈钢" } 
    },
    { 
      param: { 
        ru: "Средний назначенный срок службы, лет, не менее", 
        en: "Average designated service life, years, min", 
        cn: "平均额定使用寿命，年，不低于" 
      }, 
      value: { ru: "5", en: "5", cn: "5" } 
    }
  ]

    },
        {
      id: "dui",
      ex: "Ex ia I Ma",
      image: "dui.jpg",
      title: {
        ru: "Датчик уровня искробезопасный ДУИ",
        en: "Intrinsically Safe Level Sensor DUI",
        cn: "DUI 本安型液位传感器"
      },
      desc: {
        ru: "Датчик предназначен для контроля уровня веществ, обладающих электропроводностью.",
        en: "The sensor is designed for monitoring the level of electrically conductive substances.",
        cn: "该传感器旨在用于监测导电物质的液位。"
      }
    },
    {
      id: "siu",
      ex: "Ex ia I Ma",
      image: "siu_2.png",
      title: {
        ru: "Сигнализатор искробезопасный универсальный",
        en: "Intrinsically Safe Universal Signalling Device",
        cn: "本安型通用信号装置"
      },
      desc: {
        ru: "Сигнализатор предназначен для выдачи светового и звукового сигнала оповещения.",
        en: "The signaling device is designed to issue visual and audible warning signals.",
        cn: "该信号装置旨在用于发出声光报警信号。"
      }
    },
    {
      id: "sga",
      ex: "Ex ib I Mb",
      image: "SGA_2.png",
      title: {
        ru: "Газоанализатор стационарный СГА",
        en: "Stationary Gas Analyzer SGA",
        cn: "SGA 固定式气体分析仪"
      },
      desc: {
        ru: "Прибор для измерения метана, O2, CO/CO2, температуры, давления и влажности.",
        en: "Device for measuring methane, O2, CO/CO2, temp, pressure, and humidity.",
        cn: "用于测量甲烷、氧气、CO/CO2、温度、压力和湿度的仪表。"
      }
    },
    {
      id: "ipi-mv3",
      ex: "Ex ia I Ma",
      image: "ipimv3_2.png",
      title: {
        ru: "Преобразователь интерфейсов ИПИ.МВ.3",
        en: "Interface Converter IPI.MV.3",
        cn: "IPI.MV.3 接口转换器"
      },
      desc: {
        ru: "Активный удлинитель интерфейса RS-485 (до 10 км).",
        en: "Active RS-485 interface extender (up to 10 km).",
        cn: "RS-485 接口有源延长器（长达 10 公里）。"
      }
    },
        {
      id: "ipi-mv1",
      ex: "Ex ia I Ma",
      image: "ipimv1_2.png",
      title: {
        ru: "Преобразователь интерфейсов ИПИ.МВ.1",
        en: "Interface Converter IPI.MV.1",
        cn: "IPI.MV.1 接口转换器"
      },
      desc: {
        ru: "Пассивный повторитель интерфейса RS-485 для увеличения длины линии.",
        en: "Passive RS-485 interface repeater designed to increase line length.",
        cn: "用于增加线路长度的 RS-485 接口无源重复器。"
      }
    },
    {
      id: "mku",
      ex: "Ex ib I Mb",
      image: "mku_2.png",
      title: {
        ru: "Модуль контроля и управления МКУ",
        en: "Control and Management Module MKU",
        cn: "MKU 控制与管理模块"
      },
      desc: {
        ru: "Сбор данных с аналоговых/дискретных входов и подача сигналов управления через реле.",
        en: "Data collection from analog/discrete inputs and control signals via relays.",
        cn: "通过模拟/数字输入采集数据并通过继电器发出控制信号。"
      }
    },
        {
      id: "ipi-m",
      ex: "Ex ia I Ma",
      image: "ipim_2.png",
      title: {
        ru: "Искробезопасные преобразователи интерфейсов RS-485 в Ethernet (ИПИ.М)",
        en: "Intrinsically Safe RS-485 to Ethernet Interface Converters (IPI.M)",
        cn: "IPI.M 本安型 RS-485 至以太网接口转换器"
      },
      desc: {
        ru: "Преобразователи предназначены для преобразования среды передачи данных из RS-485 в Ethernet.",
        en: "Converters are designed to convert data transmission medium from RS-485 to Ethernet.",
        cn: "该转换器旨在用于将数据传输介质从 RS-485 转换为以太网。"
      }
    },
    {
      id: "flowmeter",
      ex: "Ex ia I Ma",
      image: "ri_2.png",
      title: {
        ru: "Расходомер искробезопасный (РИ)",
        en: "Intrinsically Safe Flowmeter (RI)",
        cn: "RI 本安型流量计"
      },
      desc: {
        ru: "Прибор предназначен для контроля и технологического учёта расхода и давления в линии орошения.",
        en: "The device is designed for monitoring and process logging of flow and pressure in irrigation line.",
        cn: "该仪表旨在用于监测和工艺记录喷淋管线中的流量和压力。"
      }
    },
        {
      id: "tablet",
      ex: "Ex ia I Ma",
      image: "tablet_2.png",
      title: {
        ru: "Искробезопасный планшет комбинированный (ИПК)",
        en: "Intrinsically Safe Combined Tablet (IPK)",
        cn: "IPK 本安型组合平板电脑"
      },
      desc: {
        ru: "Планшет может применяться в подземных выработках угольных шахт, опасных по газу (метан) и угольной пыли.",
        en: "The tablet can be used in underground workings of coal mines hazardous in gas (methane) and coal dust.",
        cn: "该平板电脑可用于有气体（甲烷）和煤尘危险的煤矿地下巷道。"
      }
    },
    {
      id: "display-is",
      ex: "Ex ia I Ma",
      image: "display_3.jpg",
      title: {
        ru: "Искробезопасный программируемый дисплей",
        en: "Intrinsically Safe Programmable Display",
        cn: "本安型可编程显示器"
      },
      desc: {
        ru: "Сертифицированные искробезопасные дисплеи для отображения данных.",
        en: "Certified intrinsically safe displays for data visualization.",
        cn: "用于数据可视化的经认证的本安型显示器。"
      }
    },
        {
      id: "ip-camera",
      ex: "Ex d I Mb",
      image: "camera.jpg",
      title: {
        ru: "Искробезопасные IP камеры",
        en: "Intrinsically Safe IP Cameras",
        cn: "本安型网络摄像机"
      },
      desc: {
        ru: "Сетевая IP камера сертифицирована для группы I (подземные горные выработки).",
        en: "Network IP camera certified for group I (underground mine workings).",
        cn: "经认证用于 I 组（地下矿山巷道）的网络 IP 摄像机。"
      }
    },
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
        ru: "Система предназначена для автоматизированного управления системой конвейеров.",
        en: "The system is designed for automated management of conveyor system.",
        cn: "该系统旨在用于输送机系统的 Free 自动化管理。"
      }
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
        ru: "Cистема Davis Derby WiPAN — это беспроводная платформа, которая обеспечивает покрытие беспроводной сетью связи на всей территории установки.",
        en: "The Davis Derby WiPAN system is a wireless platform that provides wireless communication network coverage throughout the installation area.",
        cn: "戴维斯德比 WiPAN 系统是一个无线平台，可在整个安装区域内提供无线通信网络覆盖。"
      }
    },
    {
      id: "imrsh",
      ex: "Ex ib I Mb",
      image: "imrs_1.jpg",
      title: {
        ru: "Искробезопасное метан-реле шахтное ИМРШ",
        en: "Intrinsically Safe Mine Methane Relay IMRSH",
        cn: "IMRSH 本安型矿用甲烷继电器"
      },
      desc: {
        ru: "Искробезопасное метан-реле шахтное предназначено для контроля объемной доли метана в зоне работы очистных и проходческих комбайнов.",
        en: "The intrinsically safe mine methane relay is designed to monitor the volume fraction of methane in the operation zone of shearers and roadheaders.",
        cn: "该本安型矿用甲烷继电器旨在用于监测采煤机和掘进机作业区域内的甲烷体积 Back."
      }
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
        ru: "Система для управления и мониторинга всей шахтой и передачи соответствующих данных на поверхность.",
        en: "System for management and monitoring of the entire mine and transmission of relevant data to the surface.",
        cn: "用于整座矿山管理与監測并将相关数据传输至地面的系统。"
      }
    }
  ]
};
