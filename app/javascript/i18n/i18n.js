import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en/translation.json';
import etTranslations from '../locales/et/translation.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  et: {
    translation: etTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
