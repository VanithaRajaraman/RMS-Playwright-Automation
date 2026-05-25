const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000, // 2 minutes per test
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  use: {
    baseURL: 'https://upcoming-stage.palletnow.co',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000, // 1 minute per click/fill/etc.
    navigationTimeout: 30000
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.spec\.js/
    },
    {
      name: 'erp-tests',
      dependencies: ['setup'],
      testIgnore: /.*auth\.setup\.spec\.js/,
      use: {
        storageState: 'auth/auth.json'  // ✅ reuses saved session
      }
    }
  ]
});