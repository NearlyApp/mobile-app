export default ({ config }) => ({
  ...config,
  name: 'Nearby',
  slug: 'app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  scheme: 'nearby',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  platforms: ['ios', 'android'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'fr.nearby.app',
    scheme: 'nearby',
  },
  android: {
    package: 'fr.nearby.app',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'nearby.app',
          },
          {
            scheme: 'nearby',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  extra: {
    apiBaseUrl: process.env.API_BASE_URL,
    router: {
      origin: false,
    },
    eas: {
      projectId: process.env.EXPO_PROJECT_ID,
    },
  },
  plugins: ['expo-secure-store'],
});
