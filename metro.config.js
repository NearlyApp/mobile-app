const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

let config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('ogg', 'png');
config.resolver.sourceExts.push('mjs', 'cjs');
config.resolver.unstable_enablePackageExports = true;
config.resolver.platforms = ['ios', 'android'];

config = withNativeWind(config, {
  input: './src/styles/global.css',
});

module.exports = wrapWithReanimatedMetroConfig(config);
