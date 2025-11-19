import loginPage from "../../pageobjects/LoginPage.js";
import { restartAppAfterEachTest } from "../../helpers/utils.js";

describe("Login Page | Sign Up Tab", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.openSignUpTab();
  });

  afterEach(async function () {
    await restartAppAfterEachTest(this);
  });

  it("should register a new account successfully with valid credentials", async () => {
    await loginPage.fillSignUpForm();
    await loginPage.clickSignUpButton();
    await expect(loginPage.successMsg).toHaveText(loginPage.signedUpMessage);

    await loginPage.closeSuccessModal();
  });
});
