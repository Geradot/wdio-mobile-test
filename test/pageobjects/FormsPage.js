import Page from "./Page.js";

class FormsPage extends Page {
  get formsTab() {
    return $("~Forms");
  }

  get textInput() {
    return $("~text-input");
  }

  get inputTextResult() {
    return $("~input-text-result");
  }

  get switchToggle() {
    return $("~switch");
  }

  get dropdown() {
    return $("//android.widget.EditText[@text='Select an item...']");
  }

  get dropdownOption1() {
    return $(
      '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="webdriver.io is awesome"]'
    );
  }

  get dropdownResult() {
    return $("//android.widget.EditText[@text='webdriver.io is awesome']");
  }

  get activeButton() {
    return $(
      '//android.view.ViewGroup[@content-desc="button-Active"]/android.view.ViewGroup'
    );
  }

  get alertWindow() {
    return $("id:android:id/content");
  }

  get alertMessage() {
    return $("id:android:id/message");
  }

  async open() {
    await super.open(this.formsTab);
  }

  async inputText(text) {
    await this.textInput.setValue(text);
  }

  async getInputTextResult() {
    return await this.inputTextResult.getText();
  }

  async toggleSwitch() {
    await this.switchToggle.click();
  }

  async getSwitchState() {
    return await this.switchToggle.getAttribute("checked");
  }

  async selectDropdownOption(optionElement) {
    await this.dropdown.click();
    await optionElement.click();
  }

  async selectFirstDropdownOption() {
    await this.selectDropdownOption(this.dropdownOption1);
  }

  async getDropdownText() {
    return await this.dropdownResult.getText();
  }

  async clickActiveButton() {
    await this.activeButton.click();
  }

  async isAlertWindowDisplayed() {
    return await this.alertWindow.isDisplayed();
  }

  async getAlertMessage() {
    return await this.alertMessage.getText();
  }
}

export default new FormsPage();
