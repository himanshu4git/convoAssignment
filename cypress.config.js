const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      baseUrl: 'https://admin-dt.convoso.com'
    },
    specPattern: 'cypress/integration/*.js',
  },
  chromeWebSecurity: false,
  pageLoadTimeout: 90000,
  
});
