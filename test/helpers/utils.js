/**
 * Restarts the app after each test except the last one
 * Must be called inside afterEach with regular function (not arrow function)
 * @param {Object} context - The test context (this)
 * @param {string} appId - The app package ID (default: com.wdiodemoapp)
 */
export async function restartAppAfterEachTest(context, appId = "com.wdiodemoapp") {
  const currentTest = context.currentTest;
  const allTests = context.test.parent.tests;
  const isLastTest = allTests[allTests.length - 1] === currentTest;

  if (!isLastTest) {
    await driver.terminateApp(appId);
    await driver.activateApp(appId);
  }
}
