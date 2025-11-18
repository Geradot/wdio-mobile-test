import Page from "./Page.js";
import { faker } from "@faker-js/faker";

class LoginPage extends Page {
  password = "";
  loggedInMessage = "You are logged in!";
  signedUpMessage = "You successfully signed up!";

  get loginTab() {
    return $("~Login");
  }
  async open() {
    return super.open(this.loginTab);
  }

  get signUpTab() {
    return $('//android.widget.TextView[@text="Sign up"]');
  }

  async openSignUpTab() {
    await this.signUpTab.click();
  }

  get emailInput() {
    return $("~input-email");
  }

  async fillEmail(email = faker.internet.email()) {
    await this.emailInput.setValue(email);
  }

  get passwordInput() {
    return $("~input-password");
  }

  async fillPassword(password = faker.internet.password()) {
    this.password = password;
    await this.passwordInput.setValue(this.password);
  }

  get passwordRepeatInput() {
    return $("~input-repeat-password");
  }

  async fillPasswordRepeat() {
    await this.passwordRepeatInput.setValue(this.password);
  }

  get signUpButton() {
    return $("~button-SIGN UP");
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  get loginButton() {
    return $("~button-LOGIN");
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  get successMsg() {
    return $("id:android:id/message");
  }

  get successSignedUpMsg() {
    return $("id:android:id/message");
  }

  get okButton() {
    return $("id:android:id/button1");
  }

  async closeSuccessModal() {
    await this.okButton.click();
  }

  async fillSignUpForm() {
    await this.fillEmail();
    await this.fillPassword();
    await this.fillPasswordRepeat();
  }

  async fillLoginForm() {
    await this.fillEmail();
    await this.fillPassword();
  }
}

export default new LoginPage();
