/**
 * Restarts the app after each test if it's not the last test
 */
export async function restartAppAfterEachTest(context) {
  const currentTest = context.currentTest;
  const allTests = context.test.parent.tests;
  const isLastTest = allTests[allTests.length - 1] === currentTest;

  if (!isLastTest) {
    await driver.reloadSession();
  }
}
