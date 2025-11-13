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
    // Wait for the Swipe page to load
    await this.horizontalScrollView.waitForDisplayed({ timeout: 5000 });
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

  /**
   * Check if cards reached left edge (using screenshot comparison)
   */
  async isAtLeftEdge() {
    return await this.isSwipeAtEdge(() => this.swipeCardsLeft());
  }

  /**
   * Check if cards reached right edge (using screenshot comparison)
   */
  async isAtRightEdge() {
    return await this.isSwipeAtEdge(() => this.swipeCardsRight());
  }

  /**
   * Swipe all the way to the left edge
   */
  async swipeToLeftEdge(maxAttempts = 10) {
    return await this.swipeUntilEdge(() => this.swipeCardsLeft(), maxAttempts);
  }

  /**
   * Swipe all the way to the right edge
   */
  async swipeToRightEdge(maxAttempts = 10) {
    return await this.swipeUntilEdge(() => this.swipeCardsRight(), maxAttempts);
  }
}

export default new SwipePage();
