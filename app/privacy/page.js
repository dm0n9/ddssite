"use client";

import Link from "next/link";
import styles from "./privacy.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function PrivacyPage() {
 
  const { currentLang = "ru" } = useLanguage ? useLanguage() : { currentLang: "ru" };

  return (
    <main className={styles.main_layout}>
      <div className={styles.container}>
        {/* Шапка с кнопкой возврата */}
        <section className={styles.hero_section}>
          <Link href="/" className={styles.back_link}>
            ← {currentLang === "ru" ? "На главную" : "Back to Home"}
          </Link>
          <h1 className={styles.main_title}>
            {currentLang === "ru"
              ? "Политика обработки персональных данных ООО «Девис Дерби Сибирь»"
              : "Privacy Policy"}
          </h1>
          <p className={styles.update_date}>
            {currentLang === "ru"
              ? "Дата последнего обновления: 10 августа 2026 г."
              : "Last updated: August 10, 2026"}
          </p>
        </section>

        {/* Основной текстовый блок */}
        <div className={styles.content_card}>
          

          {/* Пункт 1 */}
          <section className={styles.section}>
            <h2 className={styles.section_title}>
              <span className={styles.section_num}>1.</span> Общие положения
            </h2>
            <p className={styles.paragraph}>
              1.1. Настоящая Политика обработки персональных данных (далее — Политика) действует в отношении всей информации, которую ООО «Девис Дерби Сибирь» (далее — Оператор) может получить о пользователе во время использования сайта dds-nk.ru.
            </p>
            <p className={styles.paragraph}>
              1.2. Использование сайта dds-nk.ru означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональных данных. В случае несогласия с этими условиями пользователь должен воздержаться от использования сайта.
            </p>
            <p className={styles.paragraph}>
                1.3. На сайте dds-nk.ru отсутствуют формы обратной связи, личные кабинеты и функционал регистрации. Оператор не осуществляет сбор намеренно предоставленных пользователем данных (ФИО, телефоны, e-mail).
            </p>
          </section>

          {/* Пункт 2 */}
          <section className={styles.section}>
            <h2 className={styles.section_title}>
              <span className={styles.section_num}>2.</span> Состав обрабатываемых данных
            </h2>
            <p className={styles.paragraph}> 
                2.1. Сайт dds-nk.ru собирает и обрабатывает только технические данные, которые передаются в автоматическом режиме:
            </p>
            <ul className={styles.list}>
              <li>
                файлы cookie;
              </li>
              <li>
                сведения о действиях пользователя;
              </li>
              <li>
                cведения об оборудовании пользователя (тип устройства, браузер, разрешение экрана);
              </li>
              <li>
                дата и время сессии;
              </li>
              <li>
                IP-адрес.
              </li>
            </ul>
          </section>

          {/* Пункт 3 */}
          <section className={styles.section}>
            <h2 className={styles.section_title}>
              <span className={styles.section_num}>3.</span> Цели обработки
            </h2>
            <p className={styles.paragraph}>
              3.1. Технические данные пользователя обрабатываются исключительно в целях:
            </p>
            <ul className={styles.list}>
              <li>анализа работы сайта и его оптимизации;</li>
              <li>улучшения удобства пользования сайтом;</li>
              <li>сбора статистической информации о посещаемости.</li>
              
            </ul>
          </section>

          {/* Пункт 4 */}
          <section className={styles.section}>
            <h2 className={styles.section_title}>
              <span className={styles.section_num}>4.</span> Правовые основания
            </h2>
            <p className={styles.paragraph}>
              4.1 Оператор обрабатывает персональные данные на основании ст. 24 Конституции РФ и ст. 6 Федерального закона № 152-ФЗ «О персональных данных», а также на основании Согласия пользователя, выраженного путем продолжения работы с сайтом и нажатия кнопки «ОК» на информационном баннере.
            </p>
            
          </section>

          {/* Пункт 5 */}
          <section className={styles.section}>
            <h2 className={styles.section_title}>
              <span className={styles.section_num}>5.</span> Порядок обработки и защиты данных
            </h2>
            <p className={styles.paragraph}>
              5.1. Обработка персональных данных осуществляется путем сбора, записи, систематизации, накопления, хранения, уточнения, использования, удаления и уничтожения.
            </p>
            <p className={styles.paragraph}>
              5.2. Оператор принимает необходимые организационные и технические меры для защиты персональных данных пользователя от неправомерного или случайного доступа, уничтожения, изменения или блокирования.
            </p>
            <p className={styles.paragraph}>
                5.3. Передача данных третьим лицам не осуществляется, за исключением случаев, предусмотренных законодательством РФ и использованием сервисов аналитики (ООО «Яндекс»).
            </p>
          </section>

          {/* Пункт 6 */}
<section className={styles.section}>
  <h2 className={styles.section_title}>
    <span className={styles.section_num}>6.</span> Отказ от обработки
  </h2>
  <p className={styles.paragraph}>
    6.1. Пользователь может в любой момент отказаться от сбора данных (cookie), изменив настройки своего браузера или прекратив использование сайта.
  </p>
  <p className={styles.paragraph}>
    6.2. Для того чтобы прекратить обработку Cookie, Пользователи могут в настройках браузера самостоятельно ограничить или полностью отключить их использование. С момента такого ограничения или отключения обработка Cookie прекращается. Для этого необходимо изменить настройки браузера, чтобы блокировать определённые cookies. Однако важно отметить, что без использования технически необходимых cookies многие функции сайта могут работать некорректно или стать недоступными. Для изменения настроек cookies в популярных браузерах пользователи могут воспользоваться следующими инструкциями:
  </p>

  
  <ul className={styles.list}>
    
    {/* Google Chrome */}
    <li> 
      <strong>Google Chrome:</strong>
      <ul className={styles.list}> 
        <li>
          <Link 
            href="https://support.google.com/chrome/answer/95647?hl=ru&hlrm=ru" 
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://support.google.com/chrome/answer/95647?hl=ru&hlrm=ru
          </Link>
        </li> 
      </ul>
    </li>

    
    <li> 
      <strong>Mozilla Firefox:</strong>
      <ul className={styles.list}> 
        <li> 
          <Link 
            href="https://support.mozilla.org/ru/kb/uluchshennaya-zashita-ot-otslezhivaniya-firefox-dlya-kompyutera" 
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://support.mozilla.org/ru/kb/uluchshennaya-zashita-ot-otslezhivaniya-firefox-dlya-kompyutera
          </Link> 
        </li> 
      </ul>
    </li>

    
    <li> 
      <strong>Microsoft Edge:</strong>
      <ul className={styles.list}> 
        <li> 
          <Link 
            href="https://support.microsoft.com/ru-ru/windows/управление-файлами-cookie-в-microsoft-edge-просмотр-разрешение-блокировка-удаление-и-использование-168dab11-0753-043d-7c16-ede5947fc64d" 
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://support.microsoft.com/ru-ru/windows/управление-файлами-cookie-в-microsoft-edge-просмотр-разрешение-блокировка-удаление-и-использование-168dab11-0753-043d-7c16-ede5947fc64d
          </Link> 
        </li> 
      </ul>
    </li>

    {/* Safari */}
    <li> 
      <strong>Safari:</strong>
      <ul className={styles.list}> 
        <li> 
          <Link 
            href="https://support.apple.com/ru-ru/105082" 
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://support.apple.com/ru-ru/105082
          </Link> 
        </li> 
      </ul>
    </li>

    {/* Yandex */}
    <li> 
      <strong>Yandex:</strong>
      <ul className={styles.list}> 
        <li> 
          <Link 
            href="https://yandex.ru/support/browser/ru/personal-data-protection/cookies" 
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://yandex.ru/support/browser/ru/personal-data-protection/cookies
          </Link> 
        </li> 
      </ul>
    </li>

  </ul>
</section>

          {/* Пункт 7 */}
          <section className={styles.section}>
            {/* Контактная информация */}
            <div className={styles.contacts_box}>
              <p>
                <strong>Контакты для обращений:</strong>
              </p>
              <p>Email: dds@dds-nk.ru</p>
              <p>Телефон: (3843) 99-12-14, 72-00-40</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}