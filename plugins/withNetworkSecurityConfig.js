const { withAndroidManifest, AndroidConfig } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

function withNetworkSecurityConfig(config) {
  // Step 1: Copy the network_security_config.xml file
  config = require('expo/config-plugins').withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const sourceFile = path.join(
        projectRoot,
        'config',
        'network_security_config.xml',
      );
      const destDir = path.join(
        config.modRequest.platformProjectRoot,
        'app',
        'src',
        'main',
        'res',
        'xml',
      );
      const destFile = path.join(destDir, 'network_security_config.xml');

      // Create the xml directory if it doesn't exist
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Copy the file
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destFile);
        console.log('✅ network_security_config.xml copied successfully');
      } else {
        console.warn(
          '⚠️ network_security_config.xml not found at:',
          sourceFile,
        );
      }

      return config;
    },
  ]);

  // Step 2: Add the reference to AndroidManifest.xml
  config = withAndroidManifest(config, (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults,
    );

    mainApplication.$['android:networkSecurityConfig'] =
      '@xml/network_security_config';

    return config;
  });

  return config;
}

module.exports = withNetworkSecurityConfig;
