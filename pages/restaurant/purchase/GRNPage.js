const { getTestData } = require('../../../config/testData');

class DirectGRN {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').directGrn;
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
    await this.page.getByRole('spinbutton').first().blur();

    // Select buyer
    await this.page.getByText('Select...').click();
    await this.page.locator('#react-select-5-input').fill(this.data.buyerSearch);
    await this.page.getByText(this.data.buyer, { exact: true }).click();

    // Invoice number
    await this.page.getByRole('textbox').nth(3).click();
    await this.page.getByRole('textbox').nth(3).fill(this.data.invoiceNumber);
    await this.page.getByRole('textbox').nth(3).blur();

    // Select GST Inclusive to ensure computed total matches invoice value (100)
    await this.page.getByText('GST Inclusive').click();
    try {
      await this.page.getByRole('button', { name: 'Confirm' }).waitFor({ state: 'visible', timeout: 3000 });
      await this.page.getByRole('button', { name: 'Confirm' }).click();
    } catch (e) {
      // Dialog did not appear, ignore
    }

    // Add product
    const itemRow = this.page.locator('#table-body tr').first();

    // In restaurant table, Title is the first combobox (nth(0)), unlike grocery which has Barcode as nth(0)
    await itemRow.getByRole('combobox').nth(0).click();
    await itemRow.getByRole('combobox').nth(0).fill(this.data.productSearch);
    await this.page.getByRole('option', { name: this.data.productOption }).click();

    // Fill Qty (column 4)
    await this.page.locator('#quantityInput-0').click();
    await this.page.locator('#quantityInput-0').fill(this.data.quantity);
    await this.page.locator('#quantityInput-0').blur();

    // Fill Total PP (column 5 / index 4)
    const totalPP = itemRow.locator('td').nth(4).locator('input');
    await totalPP.click();
    await totalPP.fill(this.data.purchasePrice);
    await totalPP.blur();

    await this.page.waitForTimeout(1000);
    // Click the AddIcon in the action column to open the modal dialog
    await itemRow.getByTestId('AddIcon').click();

    // Wait for the modal and click its Save button
    await this.page.locator('.MuiModal-root button.vendor-add-btn').click();
    await this.page.waitForTimeout(2000); // Wait for React state/calculations to settle

    // Click Save button on the main page
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async approveLatestGRN() {
    // Locate the vendor title in the first row dynamically to prevent element locking race conditions
    await this.page.locator(`tbody tr:first-child div[title="${this.data.vendor}"]`).click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Approve' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async openBills() {
    await this.page.getByText('Bills', { exact: true }).click();
  }
}

module.exports = { DirectGRN };
