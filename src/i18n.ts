import * as Localization from 'expo-localization';
import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@locales/en.json';

const resources = {
  en: { translation: en },
};

const DEFAULT = 'en';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lng: string) => void) => {
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
      callback(locales[0].languageTag);
    } else {
      callback(DEFAULT);
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT,
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
