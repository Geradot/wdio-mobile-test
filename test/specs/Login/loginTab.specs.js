import loginPage from "../../pageobjects/LoginPage.js";

describe("Login Page | Login Tab", () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  afterEach(async function () {
    await driver.reloadSession();
  });

  it("should log in successfully with valid credentials", async () => {
    await loginPage.fillLoginForm();
    await loginPage.clickLoginButton();
    await expect(loginPage.successMsg).toHaveText(loginPage.loggedInMessage);

    await loginPage.closeSuccessModal();
  });
});
