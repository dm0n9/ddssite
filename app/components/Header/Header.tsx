// app/components/Header/Header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/components/Header/Header.module.css";
import { useLanguage } from "@/app/context/LanguageContext";
import { menuTexts } from "@/app/lib/headertxt";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/docs", key: "docs" },
  { href: "/contacts", key: "contacts" },
] as const;

export default function Header() {
  const { currentLang, setCurrentLang } = useLanguage();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.header_flex}`}>
        <div className={styles.logo_block}>
          <span className={styles.logo_main}>ДДС</span>
          <span className={styles.logo_sub}>Девис Дерби Сибирь</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${pathname === item.href ? styles.link_active : ""}`}
            >
              {menuTexts[item.key][currentLang]}
            </Link>
          ))}
        </nav>

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
      </div>
    </header>
  );
}