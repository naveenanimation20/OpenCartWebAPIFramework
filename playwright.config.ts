import { defineConfig, devices } from '@playwright/test';
import reportingLabs from './reporting-labs.config';

import dotenv from 'dotenv';

//npm install dotenv
//ENV=dev npx playwright test
const ENV = process.env.ENV || "qa";
console.log('Running tests on Environment: ', ENV);
dotenv.config({ path: `config/.env.${ENV}` });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,

  reporter: process.env.CI
    ? [
      ["blob"],
      ["html", { outputFolder: "reports/html-report", open: "never" }],
      ["allure-playwright", { outputFolder: "allure-results", suiteTitle: true }],
      ["reporting-labs", { open: "never" }]
    ]
    : [
      ["blob", { outputDir: "blob-report" }],
      ["list"],
      ["html", { outputFolder: "reports/html-report", open: "never" }],
      ["allure-playwright", { outputFolder: "allure-results", suiteTitle: true }],
      ["reporting-labs", { open: "never" }]
    ],

  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'on',
    video: 'on',
    trace: 'on-first-retry',
    headless: !process.env.CI ? false : true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});
