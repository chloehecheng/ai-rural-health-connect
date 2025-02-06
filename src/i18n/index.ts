import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationRU from './locales/ru.json';
import translationIT from './locales/it.json';
import translationKO from './locales/ko.json';
import translationZH from './locales/zh.json';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  ru: {
    translation: translationRU,
  },
  it: {
    translation: translationIT,
  },
  ko: {
    translation: translationKO,
  },
  zh: {
    translation: translationZH,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;