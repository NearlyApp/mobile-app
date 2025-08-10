export default ({ config }) => ({
  ...config,
  name: 'Nearly',
  slug: 'nearly',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  scheme: 'nearly',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  platforms: ['ios', 'android'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'fr.nearly.app',
    scheme: 'nearly',
  },
  android: {
    package: 'fr.nearly.app',
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
            host: 'nearly.app',
          },
          {
            scheme: 'nearly',
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
  },
  plugins: [
    [
      'expo-router',
      {
        root: './src/app',
      },
    ],
  ],
});
