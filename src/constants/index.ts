import Constants from 'expo-constants';

export const API_BASE_URL =
  (Constants.expoConfig?.extra?.apiBaseUrl as string) ||
  'http://65.108.41.124:3000';
