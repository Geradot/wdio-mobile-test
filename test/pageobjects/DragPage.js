import Page from "./Page.js";

class DragPage extends Page {
  static POSITIONS = ["l", "c", "r"];
  static NUMBERS = [1, 2, 3];

  get dragTab() {
    return $("~Drag");
  }

  async open() {
    return super.open(this.dragTab);
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

  /**
   * Drag element to target using element-based Appium method
   * @param {string} fromPosition - Source position
   * @param {string} toPosition - Target position
   */
  async dragAndDropByElement(fromPosition, toPosition = fromPosition) {
    const dragElement = await this.getDragElement(fromPosition);
    const dropTarget = await this.getDropTarget(toPosition);

    await dragElement.dragAndDrop(dropTarget);
  }

  /**
   * Drag multiple elements in sequence
   * @param {Array<{from: string, to: string}>} moves - Array of moves [{from: 'l1', to: 'r1'}, ...]
   * OR @param {Array<string>} moves - Array of positions to drag to their own drop zones
   */
  async dragMultiple(moves) {
    for (const move of moves) {
      if (typeof move === "object")
        await this.dragAndDropByElement(move.from, move.to);
      else await this.dragAndDropByElement(move);
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
