import Page from "./Page.js";

class WebviewPage extends Page {
  get webviewTab() {
    return $("~Webview");
  }

  async open() {
    await super.open(this.webviewTab);
  }

  get banner() {
    return $(
      '//*[@content-desc="International Committee of the Red Cross"]/parent::*/parent::*'
    );
  }

  get iconText() {
    return $('//android.view.View[@text="WebdriverIO"]');
  }
}

export default new WebviewPage();
