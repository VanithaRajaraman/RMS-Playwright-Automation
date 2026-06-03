const { getTestData } = require('../../../config/testData');

class DirectGRN {
  constructor(page) {
    this.page = page;
    this.data = getTestData('grocery').directGrn;
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
    await this.page.getByText(this.data.vendor, { exact: true }).click();

    // GRN date
    await this.page.getByRole('button', { name: 'Choose date' }).first().click();
    await this.page.getByRole('gridcell', { name: this.data.grnDate, exact: true }).click();

    // Invoice amount
    await this.page.getByRole('spinbutton').first().click();
    await this.page.getByRole('spinbutton').first().fill(this.data.invoiceAmount);

    // Select buyer
    await this.page.getByText('Select...').click();
    await this.page.locator('#react-select-5-input').fill(this.data.buyerSearch);
    await this.page.getByText(this.data.buyer, { exact: true }).click();

    // Invoice number
    await this.page.getByRole('textbox').nth(3).click();
    await this.page.getByRole('textbox').nth(3).fill(this.data.invoiceNumber);

    // Add product
    // await this.page.locator('#mui-19').click();
    // await this.page.locator('#mui-19').fill('mpos');
    // await this.page.getByRole('option', { name: 'mPOS Product 1 - 100 Grams' }).click();
    const itemRow = this.page.locator('#table-body tr').first();

await itemRow.getByRole('combobox').nth(1).click();
await itemRow.getByRole('combobox').nth(1).fill(this.data.productSearch);
    await this.page.getByRole('option', { name: this.data.productOption }).click();

    await this.page.locator('#quantityInput-0').fill(this.data.quantity);
    await this.page.getByRole('spinbutton').nth(2).click();
    await this.page.getByRole('spinbutton').nth(2).fill(this.data.purchasePrice);

    const receivedQty = this.page.locator(
      '#table-body > tr > td:nth-child(8) > .grn-body-row-boxes-1 > .MuiInputBase-root > .MuiInputBase-input'
    );

    await receivedQty.click();
    await receivedQty.fill(this.data.receivedQuantity);

    await this.page.getByRole('button', { name: '+ Add More Items' }).click();
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async approveLatestGRN() {
    //await this.page.getByText("Sam's Sweets").first().click();
    await this.page.locator('tbody tr').first().locator(`div[title="${this.data.vendor}"]`).click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Approve' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async openBills() {
    await this.page.getByText('Bills', { exact: true }).click();
  }
}

module.exports = { DirectGRN };
