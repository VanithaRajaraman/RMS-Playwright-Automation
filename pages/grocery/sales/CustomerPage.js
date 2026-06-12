const { expect } = require('@playwright/test');
const { getTestData } = require('../../../config/testData');

class CustomerPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('grocery').customer;
    const uniqueId = Date.now().toString().slice(-6);
    this.addressName = `2nd Cross ${uniqueId}`;
    this.mobileNumber = `90${uniqueId}90`;
    this.doorNumber = uniqueId.slice(-3);
    this.streetName = `Aswath Nagar ${uniqueId}`;
    this.pincode = `9${uniqueId.slice(-5)}`;
    this.contactName = `Test ${uniqueId}`;
    this.email = `test${uniqueId}@gmail.com`;
    this.customerName = `Tes ABC ${uniqueId}`;
    this.displayName = `Test ABC ${uniqueId}`;
  }

  async createCustomer() {
    const icon = this.page.locator('svg.revamp-sidebar__icon').nth(0);
    await icon.click();
    await this.page.getByText('Sales', { exact: true }).click();
    await this.page.getByText('Customers', { exact: true }).click();
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.page.locator('.css-8mmkcg').first().click();
    await this.page.getByText(this.data.customerType, { exact: true }).click();
    await this.page.locator('span').filter({ hasText: 'Address Name' }).getByRole('textbox').click();
    await this.page.locator('span').filter({ hasText: 'Address Name' }).getByRole('textbox').fill(this.addressName);
    await this.page.locator('span').filter({ hasText: 'Mobile Number' }).getByRole('spinbutton').click();
    await this.page.locator('span').filter({ hasText: 'Mobile Number' }).getByRole('spinbutton').fill(this.mobileNumber);
    await this.page.locator('div:nth-child(3) > .MuiTypography-root > .MuiInputBase-root > .MuiInputBase-input').click();
    await this.page.locator('.MuiInputBase-root.MuiInputBase-colorPrimary.Mui-focused > .MuiInputBase-input').fill(this.doorNumber);
    await this.page.locator('div:nth-child(4) > .MuiTypography-root > .MuiInputBase-root').click();
    await this.page.locator('.MuiInputBase-root.MuiInputBase-colorPrimary.Mui-focused > .MuiInputBase-input').fill(this.streetName);
    await this.page.locator('#react-select-5-input').click();
    await this.page.getByText(this.data.state, { exact: true }).click();
    await this.page.locator('div').filter({ hasText: /^Select$/ }).nth(5).click();
    await this.page.locator('#react-select-6-option-0').click();
    await this.page.locator('.MuiBox-root.css-91otsb > div:nth-child(8) > .MuiTypography-root > .MuiInputBase-root > .MuiInputBase-input').click();
    await this.page.locator('.MuiInputBase-root.MuiInputBase-colorPrimary.Mui-focused > .MuiInputBase-input').fill(this.pincode);
    await this.page.locator('input[name="contactName"]').click();
    await this.page.locator('input[name="contactName"]').fill(this.contactName);
    await this.page.locator('input[name="phoneNo"]').click();
    await this.page.locator('input[name="phoneNo"]').fill(this.mobileNumber);
    await this.page.locator('input[name="email"]').click();
    await this.page.locator('input[name="email"]').fill(this.email);
    await this.page.locator('.MuiBox-root.css-91otsb > .css-b62m3t-container > .css-1096ps7 > .css-1wy0on6 > .css-1d98x2t > .css-8mmkcg').click();
    await this.page.getByText(this.data.contactType, { exact: true }).click();
    await this.page.locator('div:nth-child(2) > .css-b62m3t-container > .css-1096ps7 > .css-1wy0on6 > .css-1d98x2t > .css-8mmkcg').click();
    await this.page.getByText(this.data.countryState, { exact: true }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.locator('span').filter({ hasText: 'Business (or) Customer Name' }).getByRole('textbox').click();
    await this.page.locator('span').filter({ hasText: 'Business (or) Customer Name' }).getByRole('textbox').fill(this.customerName);
    await this.page.locator('span').filter({ hasText: 'Display Name' }).getByRole('textbox').click();
    await this.page.locator('span').filter({ hasText: 'Display Name' }).getByRole('textbox').fill(this.displayName);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByText(this.displayName).click();
    await this.page.getByText('Customers').click();
    await this.verifyPosAndAppCustomersListed();
  }

  async expectCustomerListVisible(title) {
    await expect(this.page.getByRole('heading', { name: title })).toBeVisible({ timeout: 15000 });
    // Wait for the progress bar to be hidden if it is present
    await this.page.locator('role=progressbar').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => { });
    await expect(this.page.locator('tbody tr').first()).toBeVisible({ timeout: 15000 });
  }

  async verifyPosAndAppCustomersListed() {
    await this.page.getByText('POS Customers').click();
    await this.expectCustomerListVisible('POS Customers');

    await this.page.getByText('App Customers').click();
    // await this.expectCustomerListVisible('App Customers');
  }
}

module.exports = { CustomerPage };
