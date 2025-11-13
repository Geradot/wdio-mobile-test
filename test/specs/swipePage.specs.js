import swipePage from "../pageobjects/SwipePage.js";
import { step } from "@wdio/allure-reporter";

describe("Swipe Page", () => {
  beforeEach(async () => {
    await swipePage.open();
  });

  afterEach(async function () {
    // Skip restart after the last test
    const currentTest = this.currentTest;
    const allTests = this.test.parent.tests;
    const isLastTest = allTests[allTests.length - 1] === currentTest;

    if (!isLastTest) {
      await driver.terminateApp("com.wdiodemoapp");
      await driver.activateApp("com.wdiodemoapp");
    }
  });

  it("horizontal swipe should work correctly", async () => {
    const CARDS_IN_MIDDLE = 3;
    const CARDS_ON_EDGE = 2;

    await step("Swipe left on 1 card", async () => {
      await swipePage.swipeCardsLeft();
      await step(`${CARDS_IN_MIDDLE} cards after swiping left`, async () => {
        await expect((await swipePage.getDisplayedCards()).length).toBe(
          CARDS_IN_MIDDLE
        );
      });
    });

    await step("Swipe right on 1 card", async () => {
      await swipePage.swipeCardsRight();
      await step(`${CARDS_ON_EDGE} cards after swiping right`, async () => {
        await expect((await swipePage.getDisplayedCards()).length).toBe(
          CARDS_ON_EDGE
        );
      });
    });
  });

  it("vertical swipe should work correctly", async () => {
    await step("Swipe to bottom", async () => {
      await swipePage.swipeUntilEdgeBySource(() => swipePage.swipeUp());
    });
    await step("Bottom text is displayed", async () => {
      await expect(swipePage.bottomText).toBeDisplayed();
    });
    await step("Swipe to top", async () => {
      await swipePage.swipeUntilEdgeBySource(() => swipePage.swipeDown());
    });
  });
});
