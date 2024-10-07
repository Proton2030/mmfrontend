const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      // Resolve react-native-randombytes
      'react-native-randombytes': path.resolve(__dirname, 'node_modules/react-native-randombytes'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
