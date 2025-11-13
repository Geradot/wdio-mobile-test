class Page {
  async open(page) {
    await page.click();
  }

  /**
   * Swipe from right to left (horizontal)
   */
  async swipeLeft(startX = 800, endX = 300, y = 1500, duration = 500) {
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: y },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 200 },
          { type: "pointerMove", duration: duration, x: endX, y: y },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.releaseActions();
  }

  /**
   * Swipe from left to right (horizontal)
   */
  async swipeRight(startX = 300, endX = 800, y = 1500, duration = 500) {
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: y },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 200 },
          { type: "pointerMove", duration: duration, x: endX, y: y },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.releaseActions();
  }

  /**
   * Swipe from bottom to top (vertical)
   */
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
    await driver.releaseActions();
  }

  /**
   * Swipe from top to bottom (vertical)
   */
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
    await driver.releaseActions();
  }

  /**
   * Check if swipe reached the edge by comparing screenshots before and after swipe
   * This method is universal and doesn't depend on specific elements
   * @param {Function} swipeFn - Swipe function to execute
   * @returns {boolean} - True if reached edge (no visual change after swipe)
   */
  async isSwipeAtEdge(swipeFn) {
    // Take screenshot before swipe
    const screenshotBefore = await driver.takeScreenshot();

    await swipeFn();
    await driver.pause(500); // Wait for swipe animation

    // Take screenshot after swipe
    const screenshotAfter = await driver.takeScreenshot();

    // Compare screenshots - if identical, we're at the edge
    return screenshotBefore === screenshotAfter;
  }

  /**
   * Alternative: Check edge by comparing page source (faster than screenshot)
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
   * Check if scrollable container reached edge using scrollable attribute
   * Works for scrollable views (ScrollView, RecyclerView, etc.)
   * @param {WebdriverIO.Element} scrollableElement - The scrollable container element
   * @param {string} direction - 'horizontal' or 'vertical'
   * @returns {boolean} - True if at edge
   */
  async isScrollableAtEdge(scrollableElement, direction = "vertical") {
    try {
      const scrollable = await scrollableElement.getAttribute("scrollable");
      if (scrollable !== "true") {
        return true; // Not scrollable = at edge
      }

      // For Android: check bounds before and after small swipe
      const boundsBefore = await scrollableElement.getAttribute("bounds");
      
      // Perform tiny swipe to test
      if (direction === "vertical") {
        await this.swipeUp(500, 1500, 1400, 100);
      } else {
        await this.swipeLeft(700, 600, 1500, 100);
      }
      
      await driver.pause(300);
      const boundsAfter = await scrollableElement.getAttribute("bounds");

      return boundsBefore === boundsAfter;
    } catch (e) {
      return false;
    }
  }

  /**
   * Swipe until reaching the edge (max attempts to prevent infinite loop)
   * Universal method using screenshot comparison
   */
  async swipeUntilEdge(swipeFn, maxAttempts = 10) {
    let attempts = 0;
    let atEdge = false;

    while (!atEdge && attempts < maxAttempts) {
      atEdge = await this.isSwipeAtEdge(swipeFn);
      attempts++;
      
      if (atEdge) {
        break;
      }
    }

    return { reachedEdge: atEdge, attempts };
  }

  /**
   * Alternative: Swipe until edge using page source comparison (faster)
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
