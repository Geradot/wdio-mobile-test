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
