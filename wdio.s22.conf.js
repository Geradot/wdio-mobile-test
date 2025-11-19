import "dotenv/config";
import { config as baseConfig } from "./wdio.conf.js";

export const config = {
  ...baseConfig,
  capabilities: [
    {
      platformName: "android",
      "appium:platformVersion": "12.0",
      "appium:deviceName": "Samsung Galaxy S22 Ultra",
      "appium:automationName": "UIAutomator2",
      "appium:app": process.env.BROWSERSTACK_APP,
      "appium:noReset": false,
      "appium:fullReset": true,

      "bstack:options": {
        projectName: "WDIO Mobile Project | Samsung S22 Ultra",
        buildName: process.env.BUILD_NUMBER
          ? `Build ${process.env.BUILD_NUMBER}`
          : "local-build",
      },
    },
  ],
};
