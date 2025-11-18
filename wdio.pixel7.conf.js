import 'dotenv/config';

export const config = {
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  hostname: "hub.browserstack.com",
  specs: ["./test/specs/**/*.specs.js"],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      "bstack:options": {
        userName: process.env.BROWSERSTACK_USER,
        accessKey: process.env.BROWSERSTACK_KEY,
        deviceName: "Google Pixel 7 Pro",
        platformVersion: "13.0",
        platformName: "android",
        automationName: "UiAutomator2",
        app: process.env.BROWSERSTACK_APP,
        buildName: `Build ${process.env.BUILD_NUMBER || new Date().getTime()}`,
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      "browserstack",
      {
        browserstackLocal: false,
      },
    ],
  ],
  framework: "mocha",
  reporters: ["spec", ["allure", { outputDir: "allure-results" }]],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
