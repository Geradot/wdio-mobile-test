class Page {
  constructor() {
    this.screenWidth = null;
    this.screenHeight = null;
  }

  async open(page) {
    const { width, height } = await driver.getWindowSize();
    this.screenWidth = width;
    this.screenHeight = height;
    await page.click();
  }

  async swipeLeft(duration = 600) {
    const startX = this.screenWidth * 0.8;
    const endX = this.screenWidth * 0.2;
    const y = this.screenHeight * 0.7;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: y },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerMove", duration: duration, x: endX, y: y },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
  }

  async swipeRight(duration = 600) {
    const startX = this.screenWidth * 0.2;
    const endX = this.screenWidth * 0.8;
    const y = this.screenHeight * 0.7;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: y },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerMove", duration: duration, x: endX, y: y },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
  }

  async swipeUp(duration = 500) {
    const x = this.screenWidth / 2;
    const startY = this.screenHeight * 0.8;
    const endY = this.screenHeight * 0.2;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: x, y: startY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 200 },
          { type: "pointerMove", duration: duration, x: x, y: endY },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
  }

  async swipeDown(duration = 500) {
    const x = this.screenWidth / 2;
    const startY = this.screenHeight * 0.2;
    const endY = this.screenHeight * 0.8;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: x, y: startY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 200 },
          { type: "pointerMove", duration: duration, x: x, y: endY },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
  }

  /**
   * Check edge by comparing page source
   * @param {Function} swipeFn - Swipe function to execute
   * @returns {boolean} - True if reached edge (no change in page structure)
   */
  async isSwipeAtEdgeBySource(swipeFn) {
    const sourceBefore = await driver.getPageSource();

    await swipeFn();
    await driver.pause(500); // Wait for swipe animation

    const sourceAfter = await driver.getPageSource();

    return sourceBefore === sourceAfter;
  }

  /**
   * Swipe until edge using page source comparison (faster)
   */
  async swipeUntilEdgeBySource(swipeFn, maxAttempts = 10) {
    let attempts = 0;
    let atEdge = false;

    while (!atEdge && attempts < maxAttempts) {
      atEdge = await this.isSwipeAtEdgeBySource(swipeFn);
      attempts++;

      if (atEdge) {
        break;
      }
    }

    return { reachedEdge: atEdge, attempts };
  }
}
export default Page;
