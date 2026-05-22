const { test, expect } = require('@playwright/test');

test('login once', async ({ page }) => {
  //await page.goto('https://upcoming-stage.palletnow.co/');
  await page.goto('/');
  await page.getByPlaceholder('Mobile number').fill('8531821606');
  await page.getByRole('button', { name: 'Pin Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter Pin' }).fill('1111');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Retail OS Retail OS A retail' }).click();
  await page.getByRole('button', { name: 'Twinleaves 11 locations' }).click();
  await page.getByText('@Erode').click();

  // ✅ Wait until fully landed on dashboard before saving state
  await page.waitForURL('**/dashboards/**');
  await expect(page).toHaveURL(/dashboards/);

  // ✅ Save session so erp-tests reuse it without logging in again
  await page.context().storageState({ path: 'auth/auth.json' });
});