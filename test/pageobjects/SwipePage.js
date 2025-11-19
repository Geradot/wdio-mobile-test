import Page from "./Page.js";

class SwipePage extends Page {
  get swipeTab() {
    return $("~Swipe");
  }

  get bottomText() {
    return $('//android.widget.TextView[@text="You found me!!!"]');
  }

  get allCards() {
    return $$(
      "//android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup"
    );
  }

  get horizontalScrollView() {
    return $("//android.widget.HorizontalScrollView");
  }

  async open() {
    await super.open(this.swipeTab);
    await this.horizontalScrollView.waitForDisplayed({ timeout: 15_000 });
  }

  async getDisplayedCards() {
    return await this.allCards;
  }

  async getCardsCount() {
    const cards = await this.allCards;
    return cards.length;
  }

  /**
   * Swipe cards left - uses parent method with page-specific coordinates
   */
  async swipeCardsLeft() {
    await super.swipeLeft(800, 300, 1500, 500);
  }

  /**
   * Swipe cards right - uses parent method with page-specific coordinates
   */
  async swipeCardsRight() {
    await super.swipeRight(300, 800, 1500, 500);
  }
}

export default new SwipePage();
