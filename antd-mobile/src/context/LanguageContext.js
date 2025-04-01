import React, { createContext, useState, useContext, useMemo } from 'react';
import { locales, defaultLocale } from '../locales';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('locale') || defaultLocale;
  });

  const value = useMemo(() => ({
    locale,
    setLocale: (newLocale) => {
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
    },
    t: (key) => locales[locale].app[key] || key
  }), [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};