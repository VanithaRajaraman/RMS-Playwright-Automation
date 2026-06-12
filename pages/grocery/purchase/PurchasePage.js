const { getTestData } = require('../../../config/testData');

class PurchasePage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('grocery').purchase;
  }

  // async navigate() {
  //   await this.page.goto('https://upcoming-stage.palletnow.co/dashboards/RETAIL');
  // }

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
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => {});

    await this.page.locator('#quantityInput-0').click();
    await this.page.locator('#quantityInput-0').fill(this.data.quantity);

    // Save indent
    await this.page.getByRole('button', { name: 'Save' }).click();

    // Optional SweetAlert confirm after save
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => {});
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
    await this.page.getByRole('row', { name: 'S.No Barcode Title UOM MRP' }).getByRole('checkbox').check();
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

    // Received quantity
    // await this.page.locator('.MuiInputBase-root.MuiInputBase-colorPrimary.product-aligning.product-not-added > .MuiInputBase-input').click();
    // await this.page.locator('.MuiInputBase-root.MuiInputBase-colorPrimary.Mui-focused > .MuiInputBase-input').fill('10');
    // await this.page.locator('#table-body > tr > td:nth-child(8) > .grn-body-row-boxes-1 > .MuiInputBase-root > .MuiInputBase-input').click();
    const receivedQty = this.page.locator(
  '#table-body > tr > td:nth-child(8) > .grn-body-row-boxes-1 > .MuiInputBase-root > .MuiInputBase-input'
    );

    // Fill MRP to ensure validation passes (since it defaults to 0 when converted from PO)
    const mrpField = this.page.locator(
      '#table-body > tr > td:nth-child(7) > .grn-body-row-boxes-1 > .MuiInputBase-root > .MuiInputBase-input'
    );
    await mrpField.click({ force: true });
    await mrpField.fill(this.data.grnInvoiceAmount);
    await mrpField.blur();

await receivedQty.click({ force: true });
await receivedQty.fill(this.data.receivedQuantity);
await receivedQty.blur();

    // Wait for validation states and auto-calculations to settle
    await this.page.waitForTimeout(2000);
   
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async approveGRN() {
    await this.page.getByRole('cell', { name: this.data.vendor }).first().click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Approve' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}

module.exports = { PurchasePage };
