import webviewPage from "../pageobjects/WebviewPage.js";

describe("Webview Page", () => {
  beforeEach(async () => {
    await webviewPage.open();
  });

  it("should load a banner", async () => {
    await expect(webviewPage.banner).toBeDisplayed({ timeout: 15_000 });
  });
});
