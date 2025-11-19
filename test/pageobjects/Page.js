class Page {
  async open(page) {
    await page.click();
  }

  async swipeLeft(startX = 800, endX = 300, y = 1500, duration = 600) {
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

  async swipeRight(startX = 300, endX = 800, y = 1500, duration = 600) {
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

  async swipeUp(x = 500, startY = 1800, endY = 600, duration = 500) {
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

  async swipeDown(x = 500, startY = 600, endY = 1800, duration = 500) {
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
