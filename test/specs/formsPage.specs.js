import { faker } from "@faker-js/faker";
import formsPage from "../pageobjects/FormsPage.js";

describe("Forms Page", () => {
  beforeEach(async () => {
    await formsPage.open();
  });

  it("should input text and verify the result", async () => {
    const testText = faker.lorem.words(3);
    await formsPage.inputText(testText);
    await expect(formsPage.inputTextResult).toHaveText(testText);
  });

  it("should toggle the switch and verify the state", async () => {
    await formsPage.toggleSwitch();
    const switchState = await formsPage.getSwitchState();
    await expect(switchState).toBeTruthy();
  });

  it("should select an item from the dropdown and verify the selection", async () => {
    const expectedText = "webdriver.io is awesome";
    await formsPage.selectFirstDropdownOption();
    await expect(formsPage.dropdownResult).toHaveText(expectedText);
  });

  it("should be a window after clicking the active button", async () => {
    await formsPage.clickActiveButton();
    await expect(formsPage.alertWindow).toBeDisplayed();
    await expect(formsPage.alertMessage).toHaveText("This button is active");
  });
});
