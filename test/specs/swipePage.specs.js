import swipePage from "../pageobjects/SwipePage.js";
import { step } from "@wdio/allure-reporter";
import { restartAppAfterEachTest } from "../helpers/utils.js";

describe("Swipe Page", () => {
  beforeEach(async () => {
    await swipePage.open();
  });

  afterEach(async function () {
    await restartAppAfterEachTest(this);
  });

  it("horizontal swipe should work correctly", async () => {
    const CARDS_IN_MIDDLE = 3;
    const CARDS_ON_EDGE = 2;

    await step("Swipe left on 1 card", async () => {
      await swipePage.swipeLeft();
      await step(`${CARDS_IN_MIDDLE} cards after swiping left`, async () => {
        await expect((await swipePage.getDisplayedCards()).length).toBe(
          CARDS_IN_MIDDLE
        );
      });
    });

    await step("Swipe right on 1 card", async () => {
      await swipePage.swipeRight();
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
