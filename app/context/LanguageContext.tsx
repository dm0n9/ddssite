// context/LanguageContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Доступные языки
export type Language = "ru" | "en" | "cn";

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
}

// Создаем сам контекст
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Провайдер, который обернет наше приложение
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("ru");

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Удобный хук для использования в других файлах
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage должен использоваться внутри LanguageProvider");
  }
  return context;
}