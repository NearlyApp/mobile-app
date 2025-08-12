import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@locales/en.json';

export const resources = {
  en: { translation: en },
};

const DEFAULT_LOCALE = 'en';

export const getDefaultLanguage = (): string => {
  const deviceLocale: Nullable<string> =
    Localization.getLocales()[0]?.languageCode;

  if (deviceLocale && deviceLocale in resources) {
    return deviceLocale;
  }
  return DEFAULT_LOCALE;
};

export const currentLanguage = i18n.language || getDefaultLanguage();

const useLanguageStorage: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async () => {
    const language =
      (await AsyncStorage.getItem('language')) || getDefaultLanguage();
    return language;
  },
  init: () => null,
  cacheUserLanguage: async (language: string) => {
    await AsyncStorage.setItem('language', language.split('-')[0]);
  },
};

i18n
  .use(useLanguageStorage)
  .use(initReactI18next)
  .init({
    fallbackLng: getDefaultLanguage(),
    resources,
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
