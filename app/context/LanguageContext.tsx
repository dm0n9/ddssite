
"use client";

import { createContext, useContext, useState, ReactNode } from "react";


export type Language = "ru" | "en" | "cn";

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);


export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("ru");

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage должен использоваться внутри LanguageProvider");
  }
  return context;
}