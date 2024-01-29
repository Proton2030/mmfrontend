// config-overrides.js
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  // Add any other webpack configurations you need
  addWebpackAlias({
    'react-native$': 'react-native-web',
  }),
);
