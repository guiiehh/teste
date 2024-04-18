const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pluginsFile: false,
    viewportHeight: 980,
    viewportWidth: 1280,
  },
});
