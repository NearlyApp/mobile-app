import Constants from "expo-constants";

export const APP_NAME = Constants.expoConfig?.name as string;

export const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl as string;
