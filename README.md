# WDIO Mobile Testing

## Summary

This repository contains a mobile testing project with automated test scenarios and reporting capabilities using WebDriverIO + Appium. Tests use BrowserStack account data, so be sure that you configured the `.env` file if it needs.

## Requirements

- Node.js (v18 or higher)
- npm
- Mobile testing framework (Appium)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Geradot/wdio-mobile-test.git
cd wdio-mobile-test
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env` file

## Launch

### All tests

```bash
npm run test
```

### For specific devices

#### Default: Samsung Galaxy S22 Ultra

```bash

npm run test
```

#### Google Pixel 7 Pro

```

npm run test:pixel
```

## Creating the Report

Generate test report and open it in a new browser tab:

```bash
npm run report
```

## CI/CD with GitHub Actions

This repository includes a GitHub Actions workflow that automatically:

1. Runs tests on push or pull request to main/master branches
2. Generates an Allure report from test results
3. Deploys the report to GitHub Pages

### Setup Instructions

1. **Configure GitHub Secrets**: Add the following secrets to your repository settings:
   - `BROWSERSTACK_USERNAME` - Your BrowserStack username
   - `BROWSERSTACK_ACCESS_KEY` - Your BrowserStack access key
   - `BROWSERSTACK_APP` - Your BrowserStack app URL

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"

3. **Trigger the Workflow**:
   - Push to main/master branch, or
   - Create a pull request, or
   - Manually trigger from Actions tab using "Run workflow"

The Allure report will be available at: `https://<username>.github.io/<repository-name>/`
