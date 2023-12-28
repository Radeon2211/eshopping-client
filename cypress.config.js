/* eslint-disable import/extensions */
/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  experimentalStudio: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  env: {
    API_URL: 'http://192.168.1.28:4000',
    DEFAULT_APP_HASH: '#/products?p=1',
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://192.168.1.28:3000/eshopping-client/#/',
    experimentalRunAllSpecs: true,
  },
  retries: {
    openMode: 2,
  },
});
