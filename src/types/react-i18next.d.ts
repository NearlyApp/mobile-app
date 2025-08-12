import en from '@locales/en.json';
import 'react-i18next';

declare module 'react-i18next' {
  interface Resources {
    translation: typeof en;
  }

  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
    keySeparator: '.';
    defaultNS: 'translation';
    returnNull: false;
  }
}
