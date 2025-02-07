const { defineConfig } = require("cypress");
module.exports = defineConfig({
  projectId: "uab8ss",

  e2e: {
    baseUrl: 'http://localhost:3000', // or whatever URL your app is running on
  },
  });
