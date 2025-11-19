import Page from "./Page.js";

class DragPage extends Page {
  static POSITIONS = ["l", "c", "r"];
  static NUMBERS = [1, 2, 3];

  get dragTab() {
    return $("~Drag");
  }

  async open() {
    const tab = await this.dragTab;
    await tab.waitForDisplayed({ timeout: 15_000 });
    await super.open(this.dragTab);
  }

  get resetButton() {
    return $("~renew");
  }

  async clickResetButton() {
    await this.resetButton.click();
  }

  get congratsMsg() {
    return $('//android.widget.TextView[@text="Congratulations"]');
  }

  get retryButton() {
    return $("~button-Retry");
  }

  async clickRetryButton() {
    await this.retryButton.click();
  }

  getDragElement(position) {
    return $(`~drag-${position}`);
  }

  getDropTarget(position) {
    return $(`~drop-${position}`);
  }

  async getAllDragElements() {
    const elements = [];
    for (const pos of DragPage.POSITIONS) {
      for (const num of DragPage.NUMBERS) {
        const position = `${pos}${num}`;
        const element = await this.getDragElement(position);
        const isPresent = await element.isDisplayed().catch(() => false);
        if (isPresent) {
          elements.push({
            position,
            element,
          });
        }
      }
    }
    return elements;
  }

  async dragAndDropByCoords(fromPosition, toPosition = fromPosition) {
    const dragElement = await this.getDragElement(fromPosition);
    await dragElement.waitForDisplayed({ timeout: 5000 });

    const dropTarget = await this.getDropTarget(toPosition);

    const rect = await driver.getElementRect(dropTarget.elementId);
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            origin: dragElement.elementId,
            x: 0,
            y: 0,
            duration: 0,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 150 },
          {
            type: "pointerMove",
            origin: "viewport",
            x: centerX,
            y: centerY,
            duration: 500,
          },
          { type: "pause", duration: 150 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
  }

  /**
   * Drag multiple elements in sequence
   * @param {Array<{from: string, to: string}>} moves - Array of moves [{from: 'l1', to: 'r1'}, ...]
   * OR @param {Array<string>} moves - Array of positions to drag to their own drop zones
   */
  async dragMultiple(moves) {
    for (const move of moves) {
      if (typeof move === "object")
        await this.dragAndDropByCoords(move.from, move.to);
      else await this.dragAndDropByCoords(move);
    }
  }

  /**
   * Check if drag element is still present in its original position
   * Use this to verify FAILED drag (element didn’t move)
   * @param {string} position - Position to check (e.g., 'l1')
   * @returns {Promise<boolean>} true if element is still at source position
   */
  async isDragElementPresent(position) {
    const dragElement = await this.getDragElement(position);
    return await dragElement.isDisplayed().catch(() => false);
  }

  /**
   * Verify element successfully moved (drag element disappeared from source)
   * Use this to verify SUCCESSFUL drag
   * @param {string} position - Position to check (e.g., 'l1')
   * @returns {Promise<boolean>} true if element is NOT at source (drag successful)
   */
  async isInCorrectPosition(position) {
    const stillPresent = await this.isDragElementPresent(position);
    return !stillPresent;
  }
}

export default new DragPage();
