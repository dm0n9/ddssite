// app/components/Header/Header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/components/Header/Header.module.css";
import { useLanguage } from "@/app/context/LanguageContext";
import { menuTexts } from "@/app/lib/headertxt";
import { useState } from "react"

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/system", key: "system" },
  { href: "/docs", key: "docs" },
  { href: "/contacts", key: "contacts" },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLang, setCurrentLang } = useLanguage();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.header_flex}`}>
        <div className={styles.logo_block}>
          <span className={styles.logo_main}>ДДС</span>
          <span className={styles.logo_sub}>Девис Дерби Сибирь</span>
        </div>

       {/* Навигационное меню (ПК или выпадающее на мобильных) */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.nav_open : ""}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${pathname === item.href ? styles.link_active : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {menuTexts[item.key][currentLang]}
            </Link>
          ))}
        </nav>

        {/* Правая зона: Кнопка бургера + Переключатель языков */}
        <div className={styles.header_right}>
          <div className={styles.lang_switcher}>
            {(["ru", "en", "cn"] as const).map((l) => (
              <button
                key={l}
                className={`${styles.header_btn} ${currentLang === l ? styles.header_btn_active : ""}`}
                onClick={() => setCurrentLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button 
            className={styles.burger_btn} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Переключить меню"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>
    </header>
  );
}