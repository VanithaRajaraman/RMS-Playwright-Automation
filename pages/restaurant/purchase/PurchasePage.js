const { getTestData } = require('../../../config/testData');

class PurchasePage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').purchase;
  }



  async openPurchaseIndent() {
    await this.page.getByTitle('Purchase').locator('svg').click();
    await this.page.getByText('Purchase Indent').click();
  }

  async createIndent() {
    await this.page.getByRole('button', { name: 'Add Indent' }).click();

    // Select vendor
    await this.page.getByText('Name').click();
    await this.page.locator('.css-8mmkcg').first().click();
    await this.page.getByText(this.data.vendor, { exact: true }).click();

    // Select buyer
    await this.page
      .locator('.MuiGrid-root > div:nth-child(2) > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__value-container > .react-select__input-container')
      .click();
    await this.page.locator('.react-select__menu').getByText(this.data.buyer, { exact: true }).click();

    // Select assigned to
    await this.page
      .locator('.MuiGrid-root > div:nth-child(3) > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__value-container > .react-select__input-container')
      .click();
    await this.page.locator('.react-select__menu').getByText(this.data.assignedUser, { exact: true }).click();

    // Select date
    await this.page.getByRole('button', { name: 'Choose date' }).click();
    await this.page.getByRole('gridcell', { name: this.data.indentDate, exact: true }).click();

    // Add product
    await this.page.getByRole('button', { name: '+ Add More' }).click();

    // Wait for the new product row's quantity input to be visible to ensure the row has rendered
    await this.page.locator('#quantityInput-0').waitFor({ state: 'visible' });

    await this.page.locator("(//input[@role='combobox'])[last()]").click();
    await this.page.locator("(//input[@role='combobox'])[last()]").fill(this.data.productSearch);

    await this.page
      .getByRole('option', { name: this.data.indentProductOption })
      .click();

    // Optional SweetAlert confirm (e.g., Open PO exist for this item dialog)
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => { });

    await this.page.locator('#quantityInput-0').click();
    await this.page.locator('#quantityInput-0').fill(this.data.quantity);

    // Save indent
    await this.page.getByRole('button', { name: 'Save' }).click();

    // Optional SweetAlert confirm after save
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => { });
  }

  async approveIndent() {
    // await this.page.locator('div[title="TEST VENDOR"]').click();
    await this.page.locator('tbody tr').first().locator(`div[title="${this.data.vendor}"]`).click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Approve' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(5000);

  }

  async convertToPO() {
    await this.page.locator('.menu-icon-div > .MuiSvgIcon-root > path').click();
    await this.page.getByRole('menuitem', { name: 'Convert To P.O' }).click();
    await this.page.getByRole('row', { name: 'S.No Title UOM HSN/ SAC GST CESS Rate Qty Amount' }).getByRole('checkbox').check();
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByRole('button', { name: 'Later' }).click();
  }

  async createGRN() {
    await this.page.getByRole('cell', { name: this.data.vendor }).first().click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Inward (GRN)' }).click();

    // GRN date
    await this.page.getByRole('button', { name: 'Choose date' }).first().click();
    await this.page.getByRole('gridcell', { name: this.data.grnDate, exact: true }).click();

    // Invoice amount
    await this.page.getByRole('spinbutton').first().click();
    await this.page.getByRole('spinbutton').first().fill(this.data.grnInvoiceAmount);
    await this.page.getByRole('spinbutton').first().blur();

    // Select buyer
    await this.page.getByText('Select...').click();
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

    // Select the first row in the table
    const itemRow = this.page.locator('#table-body tr').first();

    await this.page.waitForTimeout(1000);
    // Click the AddIcon in the action column to open the modal dialog
    await itemRow.getByTestId('AddIcon').click();

    // Wait for the modal and click its Save button
    await this.page.locator('.MuiModal-root button.vendor-add-btn').click();
    await this.page.waitForTimeout(2000); // Wait for React state/calculations to settle

    // Click Save button on the main page
    await this.page.getByRole('button', { name: 'Save' }).click();

    // Wait for the GRN listing page to load
    await this.page.getByRole('button', { name: 'Create GRN' }).waitFor({ state: 'visible' });
  }

  async approveGRN() {
    // Locate the vendor title in the first row dynamically to prevent element locking race conditions
    await this.page.locator(`tbody tr:first-child div[title="${this.data.vendor}"]`).click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Approve' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}

module.exports = { PurchasePage };
