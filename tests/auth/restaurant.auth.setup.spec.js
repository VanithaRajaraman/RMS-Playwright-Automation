const { test, expect } = require('@playwright/test');
const TENANTS = require('../../config/tenants');

const appEnv = process.env.APP_ENV || 'upcoming';
const tenant = TENANTS.restaurant[appEnv];

if (!tenant) {
  throw new Error(`Unknown restaurant APP_ENV: ${appEnv}`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function optionalAtText(value) {
  return new RegExp(`^@?${escapeRegExp(value)}$`, 'i');
}

test('login once', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Mobile number').fill(process.env.MOBILE_NUMBER || '8531821606');
  await page.getByRole('button', { name: 'Pin Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter Pin' }).fill(process.env.LOGIN_PIN || '1111');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Retail OS Retail OS A retail' }).click();
  await page.getByRole('button', { name: new RegExp(escapeRegExp(tenant.org), 'i') }).click();
  await page.getByText(optionalAtText(tenant.location)).click();

  await page.waitForURL('**/dashboards/**');
  await expect(page).toHaveURL(/dashboards/);

  await page.context().storageState({ path: 'auth/restaurant.auth.json' });
});
