import dragPage from "../pageobjects/DragPage.js";
import { restartAppAfterEachTest } from "../helpers/utils.js";

describe("Drag Page", () => {
  const elements = ["l1", "l2", "l3", "c1", "c2", "c3", "r1", "r2", "r3"];
  let element;

  beforeEach(async () => {
    await dragPage.open();
  });

  afterEach(async function () {
    await restartAppAfterEachTest(this);
  });

  it(`should successfully drag an element to correct place`, async () => {
    // Pick a random element to drag
    element = elements[Math.floor(Math.random() * elements.length)];

    await dragPage.dragAndDropByCoords(element);

    const isInDropZone = await dragPage.isInCorrectPosition(element);
    await expect(isInDropZone).toBe(true);
  });

  it("should verify failed drag keeps an element at source", async () => {
    let dragElement = "",
      targetPlace = "";
    // Take two different elements to simulate failed drag
    while (dragElement === targetPlace) {
      dragElement = elements[Math.floor(Math.random() * elements.length)];
      targetPlace = elements[Math.floor(Math.random() * elements.length)];
    }

    await dragPage.dragAndDropByCoords(dragElement, targetPlace);

    const stillAtSource = await dragPage.isDragElementPresent(dragElement);
    await expect(stillAtSource).toBe(true);
  });

  it("should successfully drag all elements into correct places", async () => {
    // Shuffle elements array to drag in random order
    await dragPage.dragMultiple([...elements].sort(() => Math.random() - 0.5));

    await expect(dragPage.congratsMsg).toBeDisplayed();
    await dragPage.clickRetryButton();

    await expect(await dragPage.getAllDragElements()).toHaveLength(
      elements.length
    );
  });

  it("should successfully reset after dragging an element", async () => {
    // Pick a random element to drag
    element = elements[Math.floor(Math.random() * elements.length)];

    await expect(await dragPage.getAllDragElements()).toHaveLength(
      elements.length
    );

    await dragPage.dragAndDropByCoords(element);
    await expect(await dragPage.getAllDragElements()).toHaveLength(
      elements.length - 1
    );

    await dragPage.clickResetButton();
    await expect(await dragPage.getAllDragElements()).toHaveLength(
      elements.length
    );
  });
});
