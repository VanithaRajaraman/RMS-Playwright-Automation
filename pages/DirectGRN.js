class DirectGRN {
  constructor(page) {
    this.page = page;
  }

  async openInwardGRN() {
    await this.page.getByTitle('Purchase').locator('svg').click();
    await this.page.getByText('Inward (GRN)').click();
  }

  async createDirectGRN() {
    await this.page.getByRole('button', { name: 'Create GRN' }).click();

    // Select vendor
    await this.page.getByText('Name').click();
    await this.page.getByText('Select vendor').click();
    await this.page.getByText("Sam's Sweets", { exact: true }).click();

    // GRN date
    await this.page.getByRole('button', { name: 'Choose date' }).first().click();
    await this.page.getByRole('gridcell', { name: '31' }).click();

    // Invoice amount
    await this.page.getByRole('spinbutton').first().click();
    await this.page.getByRole('spinbutton').first().fill('118');

    // Select buyer
    await this.page.getByText('Select...').click();
    await this.page.locator('#react-select-5-input').fill('va');
    await this.page.getByText('Vanitha R', { exact: true }).click();

    // Invoice number
    await this.page.getByRole('textbox').nth(3).click();
    await this.page.getByRole('textbox').nth(3).fill('1AB');

    // Add product
    // await this.page.locator('#mui-19').click();
    // await this.page.locator('#mui-19').fill('mpos');
    // await this.page.getByRole('option', { name: 'mPOS Product 1 - 100 Grams' }).click();
    const itemRow = this.page.locator('#table-body tr').first();

await itemRow.getByRole('combobox').nth(1).click();
await itemRow.getByRole('combobox').nth(1).fill('mpos');
    await this.page.getByRole('option', { name: 'mPOS Product 1 - 100 Grams' }).click();

    await this.page.locator('#quantityInput-0').fill('100');
    await this.page.getByRole('spinbutton').nth(2).click();
    await this.page.getByRole('spinbutton').nth(2).fill('100');

    const receivedQty = this.page.locator(
      '#table-body > tr > td:nth-child(8) > .grn-body-row-boxes-1 > .MuiInputBase-root > .MuiInputBase-input'
    );

    await receivedQty.click();
    await receivedQty.fill('10');

    await this.page.getByRole('button', { name: '+ Add More Items' }).click();
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async approveLatestGRN() {
    //await this.page.getByText("Sam's Sweets").first().click();
    await this.page.locator('tbody tr').first().locator('div[title="Sam\\\'s Sweets"]').click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Approve' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async openBills() {
    await this.page.getByText('Bills', { exact: true }).click();
  }
}

module.exports = { DirectGRN };
