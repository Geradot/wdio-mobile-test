import Page from "./Page.js";

class DragPage extends Page {
  // Positions: left (l), center (c), right (r)
  // Numbers: 1, 2, 3
  static POSITIONS = ["l", "c", "r"];
  static NUMBERS = [1, 2, 3];

  get dragTab() {
    return $("~Drag");
  }

  async open() {
    return super.open(this.dragTab);
  }

  /**
   * Get draggable element by position
   * @param {string} position - Position code (e.g., 'l1', 'c2', 'r3')
   * @returns {Promise<WebdriverIO.Element>}
   */
  getDragElement(position) {
    return $(`~drag-${position}`);
  }

  /**
   * Get drop target by position
   * @param {string} position - Position code (e.g., 'l1', 'c2', 'r3')
   * @returns {Promise<WebdriverIO.Element>}
   */
  getDropTarget(position) {
    return $(`~drop-${position}`);
  }

  /**
   * Get all draggable elements
   * @returns {Promise<Array<{position: string, element: WebdriverIO.Element}>>}
   */
  async getAllDragElements() {
    const elements = [];
    for (const pos of DragPage.POSITIONS) {
      for (const num of DragPage.NUMBERS) {
        const position = `${pos}${num}`;
        elements.push({
          position,
          element: await this.getDragElement(position),
        });
      }
    }
    return elements;
  }

  /**
   * Get all drop targets
   * @returns {Promise<Array<{position: string, element: WebdriverIO.Element}>>}
   */
  async getAllDropTargets() {
    const targets = [];
    for (const pos of DragPage.POSITIONS) {
      for (const num of DragPage.NUMBERS) {
        const position = `${pos}${num}`;
        targets.push({
          position,
          element: await this.getDropTarget(position),
        });
      }
    }
    return targets;
  }

  /**
   * Drag element to target using W3C Actions API
   * @param {string} fromPosition - Source position (e.g., 'l1')
   * @param {string} toPosition - Target position (e.g., 'r3')
   */
  async dragAndDrop(fromPosition, toPosition = fromPosition) {
    const dragElement = await this.getDragElement(fromPosition);
    const dropTarget = await this.getDropTarget(toPosition);

    const dragLocation = await dragElement.getLocation();
    const dropLocation = await dropTarget.getLocation();

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: dragLocation.x,
            y: dragLocation.y,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 500 },
          {
            type: "pointerMove",
            duration: 1000,
            x: dropLocation.x,
            y: dropLocation.y,
          },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.releaseActions();
  }

  /**
   * Drag element to target using element-based method (alternative)
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
   */
  async dragMultiple(moves) {
    for (const move of moves) {
      await this.dragAndDrop(move.from, move.to);
      await driver.pause(300); // Small delay between moves
    }
  }

  /**
   * Drag all elements to their correct positions
   * Assumes correct position matches the drag element's position
   */
  async dragAllToCorrectPositions() {
    const positions = [];
    for (const pos of DragPage.POSITIONS) {
      for (const num of DragPage.NUMBERS) {
        positions.push(`${pos}${num}`);
      }
    }

    for (const position of positions) {
      await this.dragAndDrop(position, position);
    }
  }

  /**
   * Verify element is in correct position
   * @param {string} position - Position to check
   * @returns {Promise<boolean>}
   */
  async isInCorrectPosition(position) {
    const dragElement = await this.getDragElement(position);
    const dropTarget = await this.getDropTarget(position);

    const dragLocation = await dragElement.getLocation();
    const dropLocation = await dropTarget.getLocation();

    // Check if drag element is close to drop target (tolerance of 50px)
    const tolerance = 50;
    return (
      Math.abs(dragLocation.x - dropLocation.x) < tolerance &&
      Math.abs(dragLocation.y - dropLocation.y) < tolerance
    );
  }

  /**
   * Get positions that are not in correct place
   * @returns {Promise<Array<string>>}
   */
  async getIncorrectPositions() {
    const incorrect = [];
    const positions = [];

    for (const pos of DragPage.POSITIONS) {
      for (const num of DragPage.NUMBERS) {
        positions.push(`${pos}${num}`);
      }
    }

    for (const position of positions) {
      const isCorrect = await this.isInCorrectPosition(position);
      if (!isCorrect) {
        incorrect.push(position);
      }
    }

    return incorrect;
  }
}

export default new DragPage();
