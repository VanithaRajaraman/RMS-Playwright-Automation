const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 70000,
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://upcoming-stage.palletnow.co',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 70000,
    navigationTimeout: 70000,
  },

  projects: [
    // ── Auth Setups ──────────────────────────────────────
    {
      name: 'grocery-setup',
      testMatch: /grocery\.auth\.setup\.spec\.js/,
    },
    {
      name: 'restaurant-setup',
      testMatch: /restaurant\.auth\.setup\.spec\.js/,
    },



    // ── Grocery Tests ────────────────────────────────────
    {
      name: 'grocery',
      dependencies: ['grocery-setup'],
      testMatch: /tests\/grocery\/.*/,
      use: { storageState: 'auth/grocery.auth.json' },
    },

    // ── Restaurant Tests ─────────────────────────────────
    {
      name: 'restaurant',
      dependencies: ['restaurant-setup'],
      testMatch: /tests\/restaurant\/.*/,
      use: { storageState: 'auth/restaurant.auth.json' },
    },
  ],
});