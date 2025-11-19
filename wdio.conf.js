import "dotenv/config";

export const config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  specs: ["./test/specs/**/*.js"],
  hostname: "hub.browserstack.com",
  services: [
    [
      "browserstack",
      {
        app: process.env.BROWSERSTACK_APP,
        browserstackLocal: false,
        accessibility: false,
        testObservabilityOptions: {
          buildName: process.env.BUILD_NUMBER
            ? `Build ${process.env.BUILD_NUMBER}`
            : "local-build",
          projectName: "WDIO Mobile Project",
          buildTag: "SampleTag",
        },
      },
    ],
  ],
  capabilities: [],

  commonCapabilities: {
    "bstack:options": {
      debug: true,
      networkLogs: true,
      appiumLogs: true,
      deviceLogs: true,
    },
  },

  maxInstances: 10,
  logLevel: "info",
  framework: "mocha",
  reporters: ["spec", ["allure", { outputDir: "allure-results" }]],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
