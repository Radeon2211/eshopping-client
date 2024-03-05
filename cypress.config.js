/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');
const index = require('./cypress/plugins/index.js');

module.exports = defineConfig({
  experimentalStudio: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  env: {
    API_URL: 'http://10.130.2.120:4000',
    DEFAULT_APP_HASH: '#/products?p=1',
  },
  e2e: {
    setupNodeEvents(on, config) {
      return index(on, config);
    },
    baseUrl: 'http://10.130.2.120:3000/eshopping-client/#/',
    experimentalRunAllSpecs: true,
  },
  retries: {
    openMode: 2,
  },
});
