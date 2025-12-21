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
    permissions: [
      'INTERNET',
      'ACCESS_NETWORK_STATE',
      'ACCESS_WIFI_STATE',
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
    ],
    usesCleartextTraffic: true,
  },
  extra: {
    apiBaseUrl: process.env.API_BASE_URL,
    router: {
      origin: false,
    },
    eas: {
      projectId: '17a963ee-6c5c-4563-9b94-a81381d4c3fe',
    },
  },
  plugins: ['./plugins/withNetworkSecurityConfig'],
});
