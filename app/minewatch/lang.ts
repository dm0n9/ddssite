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
        ru: "Датчик предназначен для контроля уровня веществ, обладающих электропроводностью, в шахтных резервуарах.",
        en: "The sensor is designed to monitor the level of electrically conductive substances in mine reservoirs.",
        cn: "该传感器旨在用于监测矿井 у резервуар 内导电物质的液位。"
      },
      specs: {
        ru: [
          "Датчик предназначен для контроля одного или двух уровней жидких или сыпучих сред в технологических емкостях.",
          "Применяется в подземных выработках угольных шахт и рудников, в том числе опасных по газу (метан) и угольной пыли.",
          "Обеспечивает высокую надежность контроля благодаря искробезопасному исполнению цепей.",
          "Устойчив к агрессивным шахтным средам, воздействию влаги и механическим нагрузкам."
        ],
        en: [
          "The sensor is designed to monitor one or two levels of liquid or bulk media in processing tanks.",
          "It is used in underground workings of coal mines and pits, including those hazardous due to gas (methane) and coal dust.",
          "Provides high monitoring reliability thanks to the intrinsically safe design of its circuits.",
          "Resistant to aggressive mine environments, moisture exposure, and mechanical stress."
        ],
        cn: [
          "该传感器旨在用于监测工艺容器 tank 中液体或散装介质的一个或两个物位。",
          "适用于煤矿和矿山的地下巷道，包括有气体（甲烷）和煤尘危险的场所。",
          "得益于其电路的本安型设计，提供了极高的监测可靠性。",
          "耐受恶劣的矿井环境、水分影响和机械载荷。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Контролируемое сопротивление срабатывания, кОм", 
            en: "Controlled response resistance, kOhm", 
            cn: "受控 响应电阻，千欧" 
          },
          value: { ru: "от 5 до 50", en: "from 5 to 50", cn: "5 至 50" }
        },
        {
          param: { 
            ru: "Количество контролируемых уровней", 
            en: "Number of monitored levels", 
            cn: "受控 液位数量" 
          },
          value: { ru: "1 или 2", en: "1 or 2", cn: "1 或 2" }
        },
        {
          param: { 
            ru: "Напряжение питания постоянного тока, В", 
            en: "DC supply voltage, V", 
            cn: "直流电源电压，V" 
          },
          value: { ru: "от 9 до 12", en: "from 9 to 12", cn: "9 至 12" }
        },
        {
          param: { 
            ru: "Потребляемый ток, мА, не более", 
            en: "Current consumption, mA, max", 
            cn: "消耗电流，mA，不超过" 
          },
          value: { ru: "35", en: "35", cn: "35" }
        },
        {
          param: { 
            ru: "Выходной сигнал (тип контакта)", 
            en: "Output signal (contact type)", 
            cn: "输出信号（触点类型）" 
          },
          value: { ru: "Сухой контакт / Реле", en: "Dry contact / Relay", cn: "干触点 / 继电器" }
        },
        {
          param: { 
            ru: "Габаритные размеры корпуса, мм, не более", 
            en: "Housing overall dimensions, mm, max", 
            cn: "外壳外形尺寸，毫米，不超过" 
          },
          value: { ru: "120х80х55", en: "120x80x55", cn: "120x80x55" }
        },
        {
          param: { 
            ru: "Масса датчика (без датчиков электрода), кг, не более", 
            en: "Sensor weight (without electrode sensors), kg, max", 
            cn: "传感器重量（不含电极传感器），公斤，不超过" 
          },
          value: { ru: "1,2", en: "1.2", cn: "1.2" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса по ГОСТ 14254", 
            en: "Housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты", 
            en: "Explosion protection marking", 
            cn: "防爆标志" 
          },
          value: { ru: "Ex ia I Ma", en: "Ex ia I Ma", cn: "Ex ia I Ma" }
        },
        {
          param: { 
            ru: "Средний срок службы, лет, не менее", 
            en: "Average service life, years, min", 
            cn: "平均使用寿命，年，不低于" 
          },
          value: { ru: "6", en: "6", cn: "6" }
        }
      ]
    },
        {
      id: "siu",
      ex: "Ex ia I Ma",
      image: "siu_2.png",
      title: {
        ru: "Сигнализатор искробезопасный универсальный (СИУ)",
        en: "Intrinsically Safe Universal Signalling Device (SIU)",
        cn: "SIU 本安型通用信号装置"
      },
      desc: {
        ru: "Предназначен для подачи светового и звукового предупредительного сигнала оповещения перед запуском конвейеров или машин.",
        en: "Designed to output visual and audible pre-start warning signals before starting conveyors or machinery.",
        cn: "旨在用于输送机或机械启动 ahead 发出声光预警信号。"
      },
      specs: {
        ru: [
          "Обеспечивает формирование громкого прерывистого звукового сигнала и яркой световой индикации.",
          "Применяется в подземных горных выработках угольных и сланцевых шахт, включая опасные по газу и пыли.",
          "Полностью искробезопасное исполнение цепей позволяет использовать устройство в наиболее опасных зонах.",
          "Корпус защищен от попадания пыли и влаги, устойчив к тяжелым условиям эксплуатации в забоях."
        ],
        en: [
          "Provides formation of a loud intermittent audible signal and bright visual indication.",
          "Used in underground mine workings of coal and shale mines, including those hazardous due to gas and dust.",
          "The fully intrinsically safe design of circuits allows the device to be used in the most hazardous zones.",
          "The enclosure is protected against dust and moisture, resistant to harsh face operating conditions."
        ],
        cn: [
          "提供高分贝断续声响信号和高亮度闪烁光指示。",
          "适用于煤矿和页岩矿的地下采掘, 包括具有瓦斯和粉尘爆炸危险的场所。",
          "电路采用完全本安型设计，允许在最危险的区域内工作。",
          "外壳具有优良的防尘防水性能，耐受工作面的恶劣运行条件。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Уровень звукового давления на расстоянии 1 м, дБ, не менее", 
            en: "Sound pressure level at 1 m distance, dB, min", 
            cn: "1米距离处的声压级，分贝，不低于" 
          },
          value: { ru: "95", en: "95", cn: "95" }
        },
        {
          param: { 
            ru: "Цвет светового сигнального устройства", 
            en: "Warning light color", 
            cn: "信号灯指示颜色" 
          },
          value: { ru: "Красный / Жёлтый", en: "Red / Yellow", cn: "红色 / 黄色" }
        },
        {
          param: { 
            ru: "Напряжение питания постоянного тока (искробезопасное), В", 
            en: "DC supply voltage (intrinsically safe), V", 
            cn: "直流电源电压（本安型），V" 
          },
          value: { ru: "от 9 до 16", en: "from 9 to 16", cn: "9 至 16" }
        },
        {
          param: { 
            ru: "Потребляемый ток в режиме подачи сигнала, мА, не более", 
            en: "Current consumption in signaling mode, mA, max", 
            cn: "信号发出模式下的最大消耗电流，mA，不超过" 
          },
          value: { ru: "120", en: "120", cn: "120" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса по ГОСТ 14254", 
            en: "Housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Габаритные размеры прибора, мм, не более", 
            en: "Device overall dimensions, mm, max", 
            cn: "设备外形尺寸，毫米，不超过" 
          },
          value: { ru: "160х110х75", en: "160x110x75", cn: "160x110x75" }
        },
        {
          param: { 
            ru: "Масса сигнализатора, кг, не более", 
            en: "Signalling device weight, kg, max", 
            cn: "信号装置重量，公斤，不超过" 
          },
          value: { ru: "1,5", en: "1.5", cn: "1.5" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты", 
            en: "Explosion protection marking", 
            cn: "防爆标志" 
          },
          value: { ru: "Ex ia I Ma", en: "Ex ia I Ma", cn: "Ex ia I Ma" }
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
      id: "sga",
      ex: "Ex ib I Mb",
      image: "SGA_2.png",
      title: {
        ru: "Газоанализатор стационарный СГА",
        en: "Stationary Gas Analyzer SGA",
        cn: "SGA 固定式气体分析仪"
      },
      desc: {
        ru: "Предназначен для непрерывного автоматического измерения объемной доли метана, кислорода, оксида и диоксида углерода, а также температуры, давления и влажности.",
        en: "Designed for continuous automatic measurement of the volume fraction of methane, oxygen, carbon monoxide, carbon dioxide, as well as temperature, pressure, and humidity.",
        cn: "旨在用于连续自动测量甲烷、氧气、一氧化碳、二氧化碳的体积比，以及温度、压力和湿度。"
      },
      specs: {
        ru: [
          "Применяется в подземных выработках рудников и угольных шахт для непрерывного мониторинга параметров рудничной атмосферы.",
          "В зависимости от модификации комплектуется различными типами сенсоров под конкретный измеряемый газ.",
          "Обеспечивает местную световую сигнализацию при достижении установленных пороговых значений концентрации газов.",
          "Передача данных и сигналов тревоги в общую шахтную систему автоматизации осуществляется по стандартным интерфейсам связи."
        ],
        en: [
          "Used in underground workings of mines and coal pits for continuous monitoring of the mine atmosphere parameters.",
          "Depending on the modification, it is equipped with various sensor types for a specific measured gas.",
          "Provides local visual signaling when preset gas concentration threshold values are reached.",
          "Data and alarm transmission to the general mine automation system is carried out via standard communication interfaces."
        ],
        cn: [
          "用于矿山和煤矿的地下巷道，对矿井空气环境参数进行连续监测。",
          "根据不同型号，可配备针对特定测量气体的各种传感器类型。",
          "当达到预设的气体浓度阈值时，提供本地光信号报警。",
          "通过标准通信接口将数据和报警信号传输至全矿通用自动化系统。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Диапазон измерений объемной доли метана (CH4), %", 
            en: "Methane (CH4) volume fraction measuring range, %", 
            cn: "甲烷 (CH4) 体积比测量范围，%" 
          },
          value: { ru: "от 0 до 5 / от 0 до 100", en: "from 0 to 5 / from 0 to 100", cn: "0 至 5 / 0 至 100" }
        },
        {
          param: { 
            ru: "Диапазон измерений объемной доли оксида углерода (CO), млн-1 (ppm)", 
            en: "Carbon monoxide (CO) volume fraction measuring range, ppm", 
            cn: "一氧化碳 (CO) 体积比测量范围，ppm" 
          },
          value: { ru: "от 0 до 200 / от 0 до 1000", en: "from 0 to 200 / from 0 to 1000", cn: "0 至 200 / 0 至 1000" }
        },
        {
          param: { 
            ru: "Диапазон измерений объемной доли кислорода (O2), %", 
            en: "Oxygen (O2) volume fraction measuring range, %", 
            cn: "氧气 (O2) 体积比测量范围，%" 
          },
          value: { ru: "от 0 до 30", en: "from 0 to 30", cn: "0 至 30" }
        },
        {
          param: { 
            ru: "Диапазон измерений объемной доли диоксида углерода (CO2), %", 
            en: "Carbon dioxide (CO2) volume fraction measuring range, %", 
            cn: "二氧化碳 (CO2) 体积比测量范围，%" 
          },
          value: { ru: "от 0 до 2 / от 0 до 5", en: "from 0 to 2 / from 0 to 5", cn: "0 至 2 / 0 至 5" }
        },
        {
          param: { 
            ru: "Напряжение питания постоянного тока, В", 
            en: "DC supply voltage, V", 
            cn: "直流电源电压，V" 
          },
          value: { ru: "от 9 до 16", en: "from 9 to 16", cn: "9 至 16" }
        },
        {
          param: { 
            ru: "Потребляемая мощность, Вт, не более", 
            en: "Power consumption, W, max", 
            cn: "功耗，瓦，不超过" 
          },
          value: { ru: "2,5", en: "2.5", cn: "2.5" }
        },
        {
          param: { 
            ru: "Интерфейс связи", 
            en: "Communication interface", 
            cn: "通信接口" 
          },
          value: { ru: "RS-485 (Modbus RTU)", en: "RS-485 (Modbus RTU)", cn: "RS-485 (Modbus RTU)" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса по ГОСТ 14254", 
            en: "Housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Габаритные размеры прибора, мм, не более", 
            en: "Device overall dimensions, mm, max", 
            cn: "设备外形尺寸，毫米，不超过" 
          },
          value: { ru: "220х140х85", en: "220x140x85", cn: "220x140x85" }
        },
        {
          param: { 
            ru: "Масса газоанализатора, кг, не более", 
            en: "Gas analyzer weight, kg, max", 
            cn: "气体分析仪重量，公斤，不超过" 
          },
          value: { ru: "3,5", en: "3.5", cn: "3.5" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты", 
            en: "Explosion protection marking", 
            cn: "防爆标志" 
          },
          value: { ru: "Ex ib I Mb", en: "Ex ib I Mb", cn: "Ex ib I Mb" }
        },
        {
          param: { 
            ru: "Средний срок службы датчиков (сенсоров), лет, не менее", 
            en: "Average service life of sensors, years, min", 
            cn: "传感器的平均使用寿命，年，不低于" 
          },
          value: { ru: "2", en: "2", cn: "2" }
        }
      ]
    },

        {
      id: "ipi-mv3",
      ex: "Ex ia I Ma",
      image: "ipimv3_2.png",
      title: {
        ru: "Преобразователь интерфейсов ИПИ. Модификация ИПИ.МВ.3",
        en: "Interface Converter IPI. Modification IPI.MV.3",
        cn: "接口转换器 IPI。型号 IPI.MV.3"
      },
      desc: {
        ru: "Искробезопасные преобразователи интерфейсов модификации ИПИ.МВ.3 являются активным удлинителем интерфейса RS-485.",
        en: "Intrinsically safe interface converters of the IPI.MV.3 modification are an active extender of the RS-485 interface.",
        cn: "IPI.MV.3 型本安接口转换器是 RS-485 接口的有源延长器。"
      },
      specs: {
        ru: [
          "Предназначен для трансляции сигналов интерфейса RS-485 в магистральные искробезопасные линии связи.",
          "Обеспечивает увеличение дальности связи по медному кабелю типа 'витая пара' на расстояние до 10 км.",
          "Позволяет производить разветвление и сегментацию шахтной сети передачи данных.",
          "Имеет полностью искробезопасное исполнение и предназначен для установки в подземных выработках рудников и шахт."
        ],
        en: [
          "Designed for broadcasting RS-485 interface signals into main intrinsically safe communication lines.",
          "Provides increased communication range via copper twisted-pair cable for a distance up to 10 km.",
          "Allows branching and segmentation of the mine data transmission network.",
          "Features a fully intrinsically safe design and is intended for installation in underground workings of mines and shafts."
        ],
        cn: [
          "旨在用于将 RS-485 接口信号转发到本安主干通信线路中。",
          "通过铜质双绞线电缆可将通信距离延长至长达 10 公里。",
          "支持对矿井数据传输网络进行分支和分段管理。",
          "采用完全本安型设计，适用于矿山和煤矿的地下巷道安装。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Максимальная дальность передачи данных, км", 
            en: "Maximum data transmission range, km", 
            cn: "最大数据传输距离，公里" 
          },
          value: { ru: "до 10", en: "up to 10", cn: "长达 10" }
        },
        {
          param: { 
            ru: "Скорость передачи данных, бит/с", 
            en: "Data transfer rate, bps", 
            cn: "数据传输速率，比特/秒" 
          },
          value: { ru: "от 1200 до 115200", en: "from 1200 to 115200", cn: "1200 至 115200" }
        },
        {
          param: { 
            ru: "Количество подключаемых ответвлений (сегментов линий)", 
            en: "Number of connectable branches (line segments)", 
            cn: "可连接的分支（线路段）数量" 
          },
          value: { ru: "до 4", en: "up to 4", cn: "最多 4 个" }
        },
        {
          param: { 
            ru: "Напряжение питания от искробезопасного источника, В", 
            en: "Supply voltage from an intrinsically safe source, V", 
            cn: "本安电源供电电压，V" 
          },
          value: { ru: "12", en: "12", cn: "12" }
        },
        {
          param: { 
            ru: "Потребляемый ток, мА, не более", 
            en: "Current consumption, mA, max", 
            cn: "消耗电流，mA，不超过" 
          },
          value: { ru: "50", en: "50", cn: "50" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса по ГОСТ 14254", 
            en: "Housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Габаритные размеры корпуса, мм, не более", 
            en: "Housing overall dimensions, mm, max", 
            cn: "外壳外形尺寸，毫米，不超过" 
          },
          value: { ru: "120х80х55", en: "120x80x55", cn: "120x80x55" }
        },
        {
          param: { 
            ru: "Масса прибора, кг, не более", 
            en: "Device weight, kg, max", 
            cn: "设备重量，公斤，不超过" 
          },
          value: { ru: "0,6", en: "0.6", cn: "0.6" }
        }
      ]
    },
    {
      id: "ipi-mv1",
      ex: "Ex ia I Ma",
      image: "ipimv1_2.png",
      title: {
        ru: "Преобразователь интерфейсов ИПИ. Модификация ИПИ.МВ.1",
        en: "Interface Converter IPI. Modification IPI.MV.1",
        cn: "接口转换器 IPI。型号 IPI.MV.1"
      },
      desc: {
        ru: "Искробезопасные преобразователи интерфейсов модификации ИПИ.МВ.1 являются пассивными повторителями интерфейса RS-485.",
        en: "Intrinsically safe interface converters of the IPI.MV.1 modification are passive repeaters of the RS-485 interface.",
        cn: "IPI.MV.1 型本安接口转换器是 RS-485 接口的无源重复器。"
      },
      specs: {
        ru: [
          "Предназначен для пассивного гальванического разделения и защиты сегментов сети RS-485.",
          "Не требует отдельного внешнего источника питания, работает за счет энергии сигнальных линий.",
          "Обеспечивает защиту оборудования от наведенных помех и перенапряжений в шахтных кабелях.",
          "Устанавливается на стыках различных участков магистральной сети в подземных выработках."
        ],
        en: [
          "Designed for passive galvanic isolation and protection of RS-485 network segments.",
          "Does not require a separate external power source, operates using the energy of signal lines.",
          "Provides equipment protection against induced interference and overvoltages in mine cables.",
          "Installed at the junctions of various sections of the trunk network in underground workings."
        ],
        cn: [
          "旨在用于 RS-485 网络段的无源 galvanic 隔离与保护。",
          "不需要单独的外接电源，利用信号线的能量工作。",
          "保护设备免受矿用电缆中感应干扰和过电压的影响。",
          "安装在地下巷道干线网络不同路段 Junctions 处。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Коэффициент гальванической изоляции, В", 
            en: "Galvanic isolation coefficient, V", 
            cn: "隔离电压，V" 
          },
          value: { ru: "не менее 1500", en: "min 1500", cn: "不低于 1500" }
        },
        {
          param: { 
            ru: "Вносимое затухание сигнала, дБ, не более", 
            en: "Inserted signal attenuation, dB, max", 
            cn: "引入信号衰减，分贝，不超过" 
          },
          value: { ru: "1,5", en: "1.5", cn: "1.5" }
        },
        {
          param: { 
            ru: "Поддерживаемые протоколы передачи данных", 
            en: "Supported data transfer protocols", 
            cn: "支持的数据传输协议" 
          },
          value: { ru: "Прозрачный для Modbus RTU / Profibus", en: "Transparent for Modbus RTU / Profibus", cn: "透传 Modbus RTU / Profibus" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса по ГОСТ 14254", 
            en: "Housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Габаритные размеры корпуса, мм, не более", 
            en: "Housing overall dimensions, mm, max", 
            cn: "外壳外形尺寸，毫米，不超过" 
          },
          value: { ru: "100х65х40", en: "100x65x40", cn: "100x65x40" }
        },
        {
          param: { 
            ru: "Масса прибора, кг, не более", 
            en: "Device weight, kg, max", 
            cn: "设备重量，公斤，不超过" 
          },
          value: { ru: "0,35", en: "0.35", cn: "0.35" }
        }
      ]
    },

        {
      id: "mku",
      ex: "Ex ib I Mb",
      image: "mku_2.png",
      title: {
        ru: "Модуль контроля и управления (МКУ)",
        en: "Control and Management Module (MKU)",
        cn: "MKU 控制与管理模块"
      },
      desc: {
        ru: "Предназначается для сбора данных с аналоговых и дискретных входов и последующей подачи сигналов управления через встроенные релейные выходы.",
        en: "Designed to collect data from analog and discrete inputs and subsequently deliver control signals via built-in relay outputs.",
        cn: "旨在通过模拟/数字输入采集数据并通过内置继电器发出控制信号。"
      },
      specs: {
        ru: [
          "Обеспечивает непрерывный мониторинг состояния датчиков безопасности на конвейерных линиях.",
          "Позволяет осуществлять дистанционное и автоматизированное управление исполнительными механизмами.",
          "Оснащен высоконадежными искробезопасными входными цепями контроля.",
          "Прочный металлический корпус защищен от механических повреждений и агрессивных воздействий шахтной среды."
        ],
        en: [
          "Provides continuous monitoring of safety sensor states on conveyor lines.",
          "Allows remote and automated control of actuation mechanisms.",
          "Equipped with highly reliable intrinsically safe input monitoring circuits.",
          "The durable metal housing is protected against mechanical damage and aggressive mine environment conditions."
        ],
        cn: [
          "对输送机线上的安全传感器状态进行连续监测。",
          "支持对执行机构进行远程和自动化控制。",
          "配备高可靠性的本安型输入监测回路。",
          "坚固的金属外壳可防机械损伤，并耐受矿井恶劣环境条件。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Количество дискретных входов контроля", 
            en: "Number of discrete monitoring inputs", 
            cn: "数字量监测输入数量" 
          },
          value: { ru: "до 16", en: "up to 16", cn: "最多 16 个" }
        },
        {
          param: { 
            ru: "Количество аналоговых входов (4-20 мА)", 
            en: "Number of analog inputs (4-20 mA)", 
            cn: "模拟量输入数量 (4-20 mA)" 
          },
          value: { ru: "4", en: "4", cn: "4 个" }
        },
        {
          param: { 
            ru: "Количество релейных выходов управления", 
            en: "Number of relay control outputs", 
            cn: "继电器控制输出数量" 
          },
          value: { ru: "до 8", en: "up to 8", cn: "最多 8 个" }
        },
        {
          param: { 
            ru: "Интерфейс передачи данных на верхний уровень", 
            en: "Data transmission interface to upper level", 
            cn: "上传至上级系统通信接口" 
          },
          value: { ru: "RS-485 (Modbus RTU)", en: "RS-485 (Modbus RTU)", cn: "RS-485 (Modbus RTU)" }
        },
        {
          param: { 
            ru: "Напряжение питания (искробезопасное), В", 
            en: "Supply voltage (intrinsically safe), V", 
            cn: "供电电压（本安型），V" 
          },
          value: { ru: "12", en: "12", cn: "12" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса по ГОСТ 14254", 
            en: "Housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Габаритные размеры блока, мм, не более", 
            en: "Block overall dimensions, mm, max", 
            cn: "模块外形尺寸，毫米，不超过" 
          },
          value: { ru: "260х160х90", en: "260x160x90", cn: "260x160x90" }
        },
        {
          param: { 
            ru: "Масса модуля, кг, не более", 
            en: "Module weight, kg, max", 
            cn: "模块重量，公斤，不超过" 
          },
          value: { ru: "4,2", en: "4.2", cn: "4.2" }
        }
      ]
    },
    {
      id: "ipi-m",
      ex: "Ex ia I Ma",
      image: "ipim_2.png",
      title: {
        ru: "Преобразователи интерфейсов RS-485 в Ethernet (ИПИ.М)",
        en: "RS-485 to Ethernet Interface Converters (IPI.M)",
        cn: "IPI.M RS-485 至以太网接口转换器"
      },
      desc: {
        ru: "Преобразователи предназначены для конвертации среды передачи данных из последовательного интерфейса RS-485 в локальную сеть Ethernet.",
        en: "Converters are designed to convert data transmission medium from serial RS-485 interface to local Ethernet network.",
        cn: "该转换器旨在用于将数据传输介质从 RS-485 串行接口转换为以太网局域网。"
      },
      specs: {
        ru: [
          "Служит связующим звеном между нижним уровнем датчиков и магистральной сетью Ethernet шахты.",
          "Обеспечивает двунаправленный прозрачный обмен данными для Modbus RTU устройств.",
          "Имеет встроенный веб-интерфейс для быстрой удаленной настройки сетевых параметров.",
          "Оснащен гальванической развязкой всех портов связи для защиты от высоковольтных наводок."
        ],
        en: [
          "Serves as a link between the lower sensor level and the main mine Ethernet network.",
          "Provides bidirectional transparent data exchange for Modbus RTU devices.",
          "Features a built-in web interface for rapid remote configuration of network parameters.",
          "Equipped with galvanic isolation on all communication ports to protect against high-voltage induction."
        ],
        cn: [
          "作为底层传感器与全矿以太网主干网络之间的连接纽带。",
          "为 Modbus RTU 设备提供双向透明的数据交换。",
          "内置 Web 界面，可用于远程快速配置网络参数。",
          "所有通信端口均配备 galvanic 隔离，以防高压感应影响。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Портов Ethernet 10/100 Base-TX, шт", 
            en: "Ethernet 10/100 Base-TX ports count, pcs", 
            cn: "10/100 Base-TX 以太网端口数量，个" 
          },
          value: { ru: "1 (разъем RJ-45)", en: "1 (RJ-45 connector)", cn: "1 个（RJ-45 接口）" }
        },
        {
          param: { 
            ru: "Количество каналов RS-485, шт", 
            en: "Number of RS-485 channels, pcs", 
            cn: "RS-485 通道数量，个" 
          },
          value: { ru: "1 или 2 (в зависимости от исполнения)", en: "1 or 2 (depending on design)", cn: "1 或 2 个（取决于型号）" }
        },
        {
          param: { 
            ru: "Напряжение питания от искробезопасной сети, В", 
            en: "Supply voltage from an intrinsically safe network, V", 
            cn: "本安网络供电电压，V" 
          },
          value: { ru: "12", en: "12", cn: "12" }
        },
        {
          param: { 
            ru: "Потребляемый ток, мА, не более", 
            en: "Current consumption, mA, max", 
            cn: "消耗电流，mA，不超过" 
          },
          value: { ru: "80", en: "80", cn: "80" }
        },
        {
          param: { 
            ru: "Степень защиты по ГОСТ 14254", 
            en: "Ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Габаритные размеры прибора, мм, не более", 
            en: "Device overall dimensions, mm, max", 
            cn: "设备外形尺寸，毫米，不超过" 
          },
          value: { ru: "140х90х55", en: "140x90x55", cn: "140x90x55" }
        },
        {
          param: { 
            ru: "Масса прибора, кг, не более", 
            en: "Device weight, kg, max", 
            cn: "设备重量，公斤，不超过" 
          },
          value: { ru: "0,7", en: "0.7", cn: "0.7" }
        }
      ]
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
        ru: "Прибор предназначен для контроля и технологического учёта расхода и давления жидких сред в шахтных трубопроводах и линиях орошения.",
        en: "The device is designed for monitoring and process logging of fluid flow and pressure in mine pipelines and irrigation lines.",
        cn: "该仪表旨在用于监测和工艺记录矿山管道和喷淋管线中的液体流量和压力。"
      },
      specs: {
        ru: [
          "Обеспечивает точный бесконтактный ультразвуковой метод измерения расхода воды и других технологических жидкостей.",
          "Применяется в подземных горных выработках рудников и шахт, опасных по газу (метан) и угольной пыли.",
          "Позволяет своевременно обнаруживать прорывы, утечки или засорения в гидравлических системах.",
          "Передает оперативные данные о расходе и текущем давлении на диспетчерский пульт автоматизации по цифровому интерфейсу."
        ],
        en: [
          "Provides an accurate non-contact ultrasonic method for measuring the flow of water and other process fluids.",
          "Used in underground workings of mines and shafts hazardous due to gas (methane) and coal dust.",
          "Allows timely detection of bursts, leaks, or blockages in hydraulic systems.",
          "Transmits operational flow and current pressure data to the automation control console via a digital interface."
        ],
        cn: [
          "提供用于测量水和其他工艺液体流量的精确非接触式超声波测量方法。",
          "适用于有气体（甲烷）和煤尘危险的矿山和煤矿地下巷道。",
          "能够及时发现液压系统中的爆裂、泄漏或堵塞故障。",
          "通过数字接口将流量和当前压力运行数据传输至自动化控制室。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Диапазон измеряемых расходов, м³/ч", 
            en: "Measured flow range, m³/h", 
            cn: "测量流量范围，m³/h" 
          },
          value: { ru: "от 0,1 до 200 (в зависимости от диаметра трубы)", en: "from 0.1 to 200 (depending on pipe diameter)", cn: "0.1 至 200（取决于管道直径）" }
        },
        {
          param: { 
            ru: "Предел допускаемой относительной погрешности, %", 
            en: "Limit of permissible relative error, %", 
            cn: "允许相对误差极限，%" 
          },
          value: { ru: "±1,5", en: "±1.5", cn: "±1.5" }
        },
        {
          param: { 
            ru: "Диапазон измерения давления в трубопроводе, МПа", 
            en: "Pipeline pressure measurement range, MPa", 
            cn: "管道压力测量范围，MPa" 
          },
          value: { ru: "от 0 до 6,0", en: "from 0 to 6.0", cn: "0 至 6.0" }
        },
        {
          param: { 
            ru: "Выходной интерфейс связи", 
            en: "Output communication interface", 
            cn: "输出通信接口" 
          },
          value: { ru: "RS-485 (Modbus RTU)", en: "RS-485 (Modbus RTU)", cn: "RS-485 (Modbus RTU)" }
        },
        {
          param: { 
            ru: "Напряжение питания от искробезопасного источника, В", 
            en: "Supply voltage from an intrinsically safe source, V", 
            cn: "本安电源供电电压，V" 
          },
          value: { ru: "12", en: "12", cn: "12" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса по ГОСТ 14254", 
            en: "Housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты", 
            en: "Explosion protection marking", 
            cn: "防爆标志" 
          },
          value: { ru: "Ex ia I Ma", en: "Ex ia I Ma", cn: "Ex ia I Ma" }
        },
        {
          param: { 
            ru: "Средний срок службы прибора, лет, не менее", 
            en: "Average device service life, years, min", 
            cn: "设备平均使用寿命，年，不低于" 
          },
          value: { ru: "6", en: "6", cn: "6" }
        }
      ]
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
        ru: "Планшет предназначен для применения в подземных выработках угольных шахт, опасных по газу (метан) и угольной пыли, в качестве мобильного рабочего места.",
        en: "The tablet is designed for use in underground workings of coal mines hazardous in gas (methane) and coal dust as a mobile workstation.",
        cn: "该平板电脑旨在用作移动工作站，适用于有气体（甲烷）和煤尘危险的煤矿地下巷道场所。"
      },
      specs: {
        ru: [
          "Используется инженерно-техническими работниками для оперативного контроля, ведения документации и связи непосредственно в шахте.",
          "Оснащен ударопрочным, полностью герметичным корпусом, защищающим внутреннюю электронику от жестких внешних воздействий.",
          "Поддерживает беспроводные интерфейсы передачи данных (Wi-Fi, Bluetooth) во взрывозащищенном исполнении.",
          "Позволяет загружать электронные чертежи, схемы вентиляции и планы ведения горных работ для автономной работы под землей."
        ],
        en: [
          "Used by engineering staff for operational control, documentation, and communication directly inside the mine.",
          "Equipped with a shockproof, fully sealed housing that protects internal electronics from harsh external influences.",
          "Supports wireless data transmission interfaces (Wi-Fi, Bluetooth) in an explosion-proof design.",
          "Allows uploading electronic blueprints, ventilation diagrams, and mining plans for autonomous underground operation."
        ],
        cn: [
          "供工程技术人员在矿井内直接进行运行控制、记录管理和通信联络使用。",
          "配备防震、完全密封的外壳，保护内部电子元件免受恶劣外部环境的影响。",
          "支持防爆设计的无线数据传输接口（Wi-Fi、蓝牙）。",
          "允许下载电子图纸、通风图和采矿计划，以便在地下进行自主作业。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Диагональ и разрешение экрана", 
            en: "Screen diagonal and resolution", 
            cn: "屏幕尺寸和分辨率" 
          },
          value: { ru: "8 дюймов / 1280x800 пикселей (IPS, повышенная яркость)", en: "8 inches / 1280x800 pixels (IPS, high brightness)", cn: "8 英寸 / 1280x800 像素（IPS，高亮度）" }
        },
        {
          param: { 
            ru: "Операционная система", 
            en: "Operating system", 
            cn: "操作系统" 
          },
          value: { ru: "Android / Защищенная ОС", en: "Android / Secure OS", cn: "Android / 安全操作系统" }
        },
        {
          param: { 
            ru: "Беспроводные интерфейсы связи", 
            en: "Wireless communication interfaces", 
            cn: "无线通信接口" 
          },
          value: { ru: "Wi-Fi (802.11 b/g/n), Bluetooth 4.2 (искробезопасные)", en: "Wi-Fi (802.11 b/g/n), Bluetooth 4.2 (intrinsically safe)", cn: "Wi-Fi (802.11 b/g/n), 蓝牙 4.2（本安型）" }
        },
        {
          param: { 
            ru: "Время автономной работы от аккумулятора, ч, не менее", 
            en: "Battery life for autonomous operation, h, min", 
            cn: "电池自主运行时间，小时，不低于" 
          },
          value: { ru: "8 (при активном использовании)", en: "8 (under active usage)", cn: "8（在积极使用下）" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса от пыли и влаги", 
            en: "Housing dust and water ingress protection", 
            cn: "外壳防尘防水等级" 
          },
          value: { ru: "IP67 по ГОСТ 14254", en: "IP67 according to GOST 14254", cn: "根据 GOST 14254 标准为 IP67" }
        },
        {
          param: { 
            ru: "Диапазон рабочих температур, °С", 
            en: "Operating temperature range, °С", 
            cn: "工作温度范围，°С" 
          },
          value: { ru: "от 0 до +40", en: "from 0 to +40", cn: "0 至 +40" }
        },
        {
          param: { 
            ru: "Масса планшета в защитном чехле, кг, не более", 
            en: "Tablet weight in protective case, kg, max", 
            cn: "平板电脑带防护套重量，公斤，不超过" 
          },
          value: { ru: "0,95", en: "0.95", cn: "0.95" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты", 
            en: "Explosion protection marking", 
            cn: "防爆标志" 
          },
          value: { ru: "Ex ia I Ma", en: "Ex ia I Ma", cn: "Ex ia I Ma" }
        }
      ]
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
        ru: "Сертифицированные искробезопасные дисплеи для отображения текстовых и графических данных о состоянии шахтной автоматики.",
        en: "Certified intrinsically safe displays for visualizing text and graphical data regarding mine automation status.",
        cn: "经认证的本安型显示器，用于显示有关矿山自动化状态的文本和图形数据。"
      },
      specs: {
        ru: [
          "Предназначен для отображения технологических мнемосхем, параметров датчиков и аварийных сообщений непосредственно под землей.",
          "Оснащен высококонтрастным экраном, обеспечивающим отличную видимость в условиях слабой освещенности шахтных выработок.",
          "Поддерживает программирование пользовательских интерфейсов и гибкую настройку экранов отображения.",
          "Полностью искробезопасная конструкция позволяет монтировать устройство на пультах управления механизмами в опасных зонах."
        ],
        en: [
          "Designed for displaying process mimic diagrams, sensor parameters, and alarm messages directly underground.",
          "Equipped with a high-contrast screen that ensures excellent visibility in low-light environments of mine workings.",
          "Supports user interface programming and flexible configuration of display screens.",
          "The fully intrinsically safe design allows the device to be mounted on machinery control panels in hazardous zones."
        ],
        cn: [
          "旨在用于在地下直接显示工艺模拟图、传感器参数和报警信息。",
          "配备高对比度屏幕，确保在矿井巷道低照明环境下的良好可视性。",
          "支持用户界面编程和显示屏幕的灵活配置。",
          "完全本安型设计允许将设备安装在危险区域的机械控制面板上。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Тип и диагональ экрана", 
            en: "Screen type and diagonal", 
            cn: "屏幕类型和尺寸" 
          },
          value: { ru: "Графический ЖК / 5,7 дюймов (или 7 дюймов в зависимости от исполнения)", en: "Graphical LCD / 5.7 inches (or 7 inches depending on design)", cn: "图形液晶显示屏 / 5.7 英寸（或 7 英寸，取决于型号）" }
        },
        {
          param: { 
            ru: "Разрешение дисплея, пикселей", 
            en: "Display resolution, pixels", 
            cn: "显示器分辨率，像素" 
          },
          value: { ru: "640x480 / 800x480", en: "640x480 / 800x480", cn: "640x480 / 800x480" }
        },
        {
          param: { 
            ru: "Интерфейсы связи для обмена данными", 
            en: "Communication interfaces for data exchange", 
            cn: "数据交换通信接口" 
          },
          value: { ru: "RS-485 (Modbus RTU), CAN-bus (искробезопасные)", en: "RS-485 (Modbus RTU), CAN-bus (intrinsically safe)", cn: "RS-485 (Modbus RTU), CAN 总线（本安型）" }
        },
        {
          param: { 
            ru: "Напряжение питания от искробезопасного источника, В", 
            en: "Supply voltage from an intrinsically safe source, V", 
            cn: "本安电源供电电压，V" 
          },
          value: { ru: "12", en: "12", cn: "12" }
        },
        {
          param: { 
            ru: "Потребляемый ток, мА, не более", 
            en: "Current consumption, mA, max", 
            cn: "消耗电流，mA，不超过" 
          },
          value: { ru: "150", en: "150", cn: "150" }
        },
        {
          param: { 
            ru: "Материал корпуса дисплея", 
            en: "Display enclosure material", 
            cn: "显示器外壳材质" 
          },
          value: { ru: "Ударопрочный антистатический пластик / Нержавеющая сталь", en: "Shockproof antistatic plastic / Stainless steel", cn: "防震抗静电塑料 / 不锈钢" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса по ГОСТ 14254", 
            en: "Housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты", 
            en: "Explosion protection marking", 
            cn: "防爆标志" 
          },
          value: { ru: "Ex ia I Ma", en: "Ex ia I Ma", cn: "Ex ia I Ma" }
        }
      ]
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
        ru: "Сетевая IP камера сертифицирована для группы I и предназначена для ведения технологического видеонаблюдения в подземных горных выработках.",
        en: "Network IP camera certified for group I and designed for industrial CCTV monitoring in underground mine workings.",
        cn: "经认证用于 I 组的网络 IP 摄像机，旨在用于地下矿山巷道中的工艺视频监视。"
      },
      specs: {
        ru: [
          "Обеспечивает непрерывный визуальный контроль работы конвейерных лент, погрузочных пунктов и других важных технологических зон шахты.",
          "Поставляется в прочной взрывонепроницаемой оболочке, выдерживающей высокие механические нагрузки и удары.",
          "Оснащена встроенной инфракрасной подсветкой для качественной съемки в условиях полной темноты или запыленности.",
          "Интегрируется напрямую в шахтную компьютерную сеть Ethernet для трансляции видеопотока высокого разрешения на поверхность."
        ],
        en: [
          "Provides continuous visual control over conveyor belts, loading points, and other vital mine process zones.",
          "Supplied in a durable flameproof enclosure capable of withstanding high mechanical loads and impacts.",
          "Equipped with built-in infrared illumination for high-quality recording in conditions of total darkness or heavy dust.",
          "Integrates directly into the mine Ethernet computer network to broadcast high-resolution video streams to the surface."
        ],
        cn: [
          "对输送带、装载点和矿井其他重要工艺区域进行连续的视觉监视控制。",
          "采用坚固的隔爆外壳供货，能够承受高机械载荷和冲击。",
          "配备内置红外照明，以便在完全黑暗或高粉尘条件下进行高质量拍摄。",
          "直接集成到矿用以太网计算机网络中，以便将高分辨率视频流传输至地面。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Разрешение видеосенсора", 
            en: "Video sensor resolution", 
            cn: "视频传感器分辨率" 
          },
          value: { ru: "Full HD (1920x1080 пикселей) / до 4 Мп", en: "Full HD (1920x1080 pixels) / up to 4 MP", cn: "Full HD (1920x1080 像素) / 最高 4 MP" }
        },
        {
          param: { 
            ru: "Дальность действия встроенной ИК-подсветки, м", 
            en: "Built-in IR illumination range, m", 
            cn: "内置红外照明技术距离，米" 
          },
          value: { ru: "до 20", en: "up to 20", cn: "长达 20" }
        },
        {
          param: { 
            ru: "Тип сетевого интерфейса связи", 
            en: "Network communication interface type", 
            cn: "网络通信接口类型" 
          },
          value: { ru: "100Base-FX (Оптический порт SC) / 100Base-TX (Медный разъем)", en: "100Base-FX (SC optical port) / 100Base-TX (Copper connector)", cn: "100Base-FX（SC 光口）/ 100Base-TX（铜质接口）" }
        },
        {
          param: { 
            ru: "Напряжение питания постоянного тока, В", 
            en: "DC supply voltage, V", 
            cn: "直流电源电压，V" 
          },
          value: { ru: "12 (или по технологии PoE в зависимости от модификации)", en: "12 (or via PoE technology depending on modification)", cn: "12（或根据型号支持 PoE 技术）" }
        },
        {
          param: { 
            ru: "Материал защитной оболочки (корпуса)", 
            en: "Protective enclosure (housing) material", 
            cn: "防护外壳材质" 
          },
          value: { ru: "Взрывонепроницаемая нержавеющая сталь / Высокопрочный сплав", en: "Flameproof stainless steel / High-strength alloy", cn: "隔爆不锈钢 / 高强度合金" }
        },
        {
          param: { 
            ru: "Степень защиты оболочки по ГОСТ 14254", 
            en: "Enclosure ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的外壳防护等级 (IP)" 
          },
          value: { ru: "IP66", en: "IP66", cn: "IP66" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты прибора", 
            en: "Device explosion protection marking", 
            cn: "设备防爆标志" 
          },
          value: { ru: "Ex d I Mb (или Ex ia I Ma в зависимости от исполнения)", en: "Ex d I Mb (or Ex ia I Ma depending on execution)", cn: "Ex d I Mb（或根据型号为 Ex ia I Ma）" }
        },
        {
          param: { 
            ru: "Масса видеокамеры в сборе, кг, не более", 
            en: "Assembled video camera weight, kg, max", 
            cn: "摄像机整机重量，公斤，不超过" 
          },
          value: { ru: "5,5", en: "5.5", cn: "5.5" }
        }
      ]
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
          param: { 
            ru: "Максимальное количество контролируемых конвейеров в одной цепочке", 
            en: "Maximum number of monitored conveyors in a single chain", 
            cn: "单链最大受控输送机数量" 
          },
          value: { ru: "до 32", en: "up to 32", cn: "最多 32 个" }
        },
        {
          param: { 
            ru: "Время задержки между пуском смежных конвейеров, с", 
            en: "Delay time between starting adjacent conveyors, s", 
            cn: "相邻输送机启动延时时间，秒" 
          },
          value: { ru: "регулируемое, от 5 до 30", en: "adjustable, from 5 to 30", cn: "可调，5 至 30" }
        },
        {
          param: { 
            ru: "Интерфейсы связи для интеграции в АСУ ТП", 
            en: "Communication interfaces for PCS integration", 
            cn: "用于集成至工业自动化系统的通信接口" 
          },
          value: { ru: "Ethernet (TCP/IP), RS-485 (Modbus RTU)", en: "Ethernet (TCP/IP), RS-485 (Modbus RTU)", cn: "以太网 (TCP/IP), RS-485 (Modbus RTU)" }
        },
        {
          param: { 
            ru: "Дальность действия линии связи и оповещения, км", 
            en: "Communication and signaling line operation range, km", 
            cn: "通信和报警线路技术距离，公里" 
          },
          value: { ru: "до 5 (без промежуточных повторителей)", en: "up to 5 (without intermediate repeaters)", cn: "长达 5（不含中间重复器）" }
        },
        {
          param: { 
            ru: "Номинальное напряжение питания блоков системы, В", 
            en: "Nominal supply voltage of system blocks, V", 
            cn: "系统模块额定供电电压，V" 
          },
          value: { ru: "12 / 36 (искробезопасное в зависимости от блока)", en: "12 / 36 (intrinsically safe depending on the block)", cn: "12 / 36（根据模块型号确定的本安型）" }
        },
        {
          param: { 
            ru: "Степень защиты оболочек оборудования по ГОСТ 14254", 
            en: "Equipment enclosures ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的设备外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты основных блоков контроля", 
            en: "Explosion protection marking of main control blocks", 
            cn: "主控制模块防爆标志" 
          },
          value: { ru: "Ex ib I Mb", en: "Ex ib I Mb", cn: "Ex ib I Mb" }
        },
        {
          param: { 
            ru: "Средний срок службы системы, лет, не менее", 
            en: "Average system service life, years, min", 
            cn: "系统平均使用寿命，年，不低于" 
          },
          value: { ru: "8", en: "8", cn: "8" }
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
          param: { 
            ru: "Рабочий диапазон частот беспроводной сети, ГГц", 
            en: "Wireless network operating frequency range, GHz", 
            cn: "无线网络工作频率范围，GHz" 
          },
          value: { ru: "2,4 (в соответствии со стандартом IEEE 802.15.4)", en: "2.4 (according to IEEE 802.15.4 standard)", cn: "2.4（符合 IEEE 802.15.4 标准）" }
        },
        {
          param: { 
            ru: "Точность позиционирования персонала/техники, м", 
            en: "Personnel/machinery positioning accuracy, m", 
            cn: "人员/设备定位精度，米" 
          },
          value: { ru: "до ±5 (в зоне прямой видимости базовых станций)", en: "up to ±5 (within line of sight of base stations)", cn: "最高 ±5（在基站视距范围内）" }
        },
        {
          param: { 
            ru: "Максимальное количество мобильных меток в сети, шт", 
            en: "Maximum number of mobile tags in the network, pcs", 
            cn: "网络中移动标签的最大数量，个" 
          },
          value: { ru: "до 65000", en: "up to 65000", cn: "最多 65000 个" }
        },
        {
          param: { 
            ru: "Дальность связи между соседними узлами (Mesh), м", 
            en: "Communication range between adjacent nodes (Mesh), m", 
            cn: "相邻节点间的通信距离 (Mesh)，米" 
          },
          value: { ru: "до 150 (в подземных выработках)", en: "up to 150 (in underground workings)", cn: "长达 150（在地下巷道内）" }
        },
        {
          param: { 
            ru: "Время непрерывной работы мобильной метки от батареи", 
            en: "Continuous operating time of a mobile tag from battery", 
            cn: "移动标签电池连续运行时间" 
          },
          value: { ru: "не менее 1 года (в зависимости от периода опроса)", en: "min 1 year (depending on polling period)", cn: "不少于 1 年（取决于轮询周期）" }
        },
        {
          param: { 
            ru: "Степень защиты оболочки базовых станций по ГОСТ 14254", 
            en: "Ingress protection (IP) of base stations enclosure according to GOST 14254", 
            cn: "根据 GOST 14254 标准的基站外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты компонентов сети", 
            en: "Explosion protection marking of network components", 
            cn: "网络组件防爆标志" 
          },
          value: { ru: "Ex ia I Ma", en: "Ex ia I Ma", cn: "Ex ia I Ma" }
        }
      ]
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
        cn: "该本安型矿用甲烷继电器旨在用于监测采煤机和掘进机作业区域内的甲烷体积比。"
      },
      specs: {
        ru: [
          "Обеспечивает непрерывный автоматический контроль концентрации горючего газа в забое.",
          "Выдает сигнал на экстренное отключение питания комбайна и сопутствующего оборудования при превышении порогов.",
          "Оснащено ударопрочным металлическим корпусом во взрывозащищенном рудничном исполнении.",
          "Интегрируется с информационными сетями автоматизации для передачи текущих показаний на пульт диспетчера."
        ],
        en: [
          "Provides continuous automatic monitoring of combustible gas concentration at the face.",
          "Issues a signal for emergency power shutdown of the shearer and associated equipment when thresholds are exceeded.",
          "Equipped with a shockproof metal housing in an explosion-proof mining design.",
          "Integrates with information automation networks to transmit current readings to the dispatcher's console."
        ],
        cn: [
          "实现对工作面可燃气体浓度的连续自动监测。",
          "当超过阈值时，发出对采煤机及相关设备进行紧急断电的信号。",
          "配备防爆矿用设计的防震金属外壳。",
          "与信息自动化网络集成，以便将当前读数传输至调度台。"
        ]
      },
      table: [
        {
          param: { 
            ru: "Диапазон контроля объемной доли метана, %", 
            en: "Methane volume fraction monitoring range, %", 
            cn: "甲烷体积比监测范围，%" 
          },
          value: { ru: "от 0 до 2,5 (или от 0 до 5,0 в зависимости от сенсора)", en: "from 0 to 2.5 (or from 0 to 5.0 depending on sensor)", cn: "0 至 2.5（或根据传感器型号为 0 至 5.0）" }
        },
        {
          param: { 
            ru: "Количество независимых порогов срабатывания", 
            en: "Number of independent operating thresholds", 
            cn: "独立报警阈值数量" 
          },
          value: { ru: "2 (Предупредительный / Аварийный)", en: "2 (Warning / Alarm)", cn: "2 个（预警 / 报警）" }
        },
        {
          param: { 
            ru: "Время срабатывания реле защиты, с, не более", 
            en: "Protection relay response time, s, max", 
            cn: "保护继电器响应时间，秒, 不超过" 
          },
          value: { ru: "5", en: "5", cn: "5" }
        },
        {
          param: { 
            ru: "Выходной сигнал управления (релейный выходы)", 
            en: "Control output signal (relay outputs)", 
            cn: "控制输出信号（继电器输出）" 
          },
          value: { ru: "2 перекидных контакта (сухой контакт)", en: "2 changeover contacts (dry contact)", cn: "2 个轉換触点（干触点）" }
        },
        {
          param: { 
            ru: "Напряжение питания от искробезопасного источника, В", 
            en: "Supply voltage from an intrinsically safe source, V", 
            cn: "本安电源供电电压，V" 
          },
          value: { ru: "12", en: "12", cn: "12" }
        },
        {
          param: { 
            ru: "Степень защиты корпуса прибора по ГОСТ 14254", 
            en: "Device housing ingress protection (IP) according to GOST 14254", 
            cn: "根据 GOST 14254 标准的设备外壳防护等级 (IP)" 
          },
          value: { ru: "IP65", en: "IP65", cn: "IP65" }
        },
        {
          param: { 
            ru: "Габаритные размеры блока, мм, не более", 
            en: "Block overall dimensions, mm, max", 
            cn: "模块外形尺寸，毫米，不超过" 
          },
          value: { ru: "180х130х75", en: "180x130x75", cn: "180x130x75" }
        },
        {
          param: { 
            ru: "Масса реле, кг, не более", 
            en: "Relay weight, kg, max", 
            cn: "继电器重量，公斤，不超过" 
          },
          value: { ru: "2,3", en: "2.3", cn: "2.3" }
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
          param: { 
            ru: "Максимальное количество опрашиваемых подземных контроллеров, шт", 
            en: "Maximum number of polled underground controllers, pcs", 
            cn: "最大可轮询地下控制器数量，个" 
          },
          value: { ru: "до 254 (в рамках одной сетевой структуры)", en: "up to 254 (within a single network structure)", cn: "最多 254 个（在单网络结构内）" }
        },
        {
          param: { 
            ru: "Протокол магистральной передачи данных на поверхность", 
            en: "Main data transmission protocol to the surface", 
            cn: "上传至地面的主干数据传输协议" 
          },
          value: { ru: "TCP/IP (по волоконно-оптическим линиям ВОЛС / Ethernet)", en: "TCP/IP (via fiber-optic lines FOCL / Ethernet)", cn: "TCP/IP（通过光纤线路 FOCL / 以太网）" }
        },
        {
          param: { 
            ru: "Время обновления данных на АРМ диспетчера, с", 
            en: "Data update time at dispatcher's workstation, s", 
            cn: "调度员工作站数据更新时间，秒" 
          },
          value: { ru: "не более 1...2 (для критических параметров безопасности)", en: "max 1...2 (for critical safety parameters)", cn: "不超过 1...2（针对关键安全参数）" }
        },
        {
          param: { 
            ru: "Поддерживаемые типы искробезопасных датчиков", 
            en: "Supported intrinsically safe sensor types", 
            cn: "支持的本安型传感器类型" 
          },
          value: { ru: "Аналоговые (4-20 мА), Дискретные, Частотные, RS-485 (Modbus)", en: "Analog (4-20 mA), Discrete, Frequency, RS-485 (Modbus)", cn: "模拟量 (4-20 mA), 数字量, 频率量, RS-485 (Modbus)" }
        },
        {
          param: { 
            ru: "Время автономной работы центральных узлов при аварии сети питания, ч", 
            en: "Autonomous operation time of central nodes during power outage, h", 
            cn: "电网断电时核心节点自主运行时间，小时" 
          },
          value: { ru: "не менее 4 (от встроенных взрывозащищенных ИБП)", en: "min 4 (from built-in explosion-proof UPS)", cn: "不少于 4 小时（来自内置防爆不间断电源）" }
        },
        {
          param: { 
            ru: "Интеграция с внешним программным обеспечением", 
            en: "Integration with external software", 
            cn: "与外部软件的集成管理" 
          },
          value: { ru: "Поддержка OPC UA / OPC DA для SCADA-систем верхнего уровня", en: "OPC UA / OPC DA support for upper-level SCADA systems", cn: "支持用于上级 SCADA 系统的 OPC UA / OPC DA" }
        },
        {
          param: { 
            ru: "Маркировка взрывозащиты центрального подземного оборудования", 
            en: "Explosion protection marking of central underground equipment", 
            cn: "地下核心设备防爆标志" 
          },
          value: { ru: "Ex ia I Ma (компоненты управления)", en: "Ex ia I Ma (control components)", cn: "Ex ia I Ma（控制组件）" }
        }
      ]
    }
  ]
};
