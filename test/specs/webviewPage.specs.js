import webviewPage from "../pageobjects/WebviewPage.js";
import { restartAppAfterEachTest } from "../helpers/utils.js";

describe("Webview Page", () => {
  beforeEach(async () => {
    await webviewPage.open();
  });

  afterEach(async function () {
    await restartAppAfterEachTest(this);
  });

  it("should load a WDIO icon and a banner", async () => {
    await webviewPage.iconText.waitForDisplayed({ timeout: 30_000 });
    await expect(webviewPage.banner).toBeDisplayed();
  });
});
