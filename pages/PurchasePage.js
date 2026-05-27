class PurchasePage {
  constructor(page) {
    this.page = page;
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
    await this.page.getByText('TEST VENDOR', { exact: true }).click();

    // Select buyer
    await this.page
      .locator('.MuiGrid-root > div:nth-child(2) > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__value-container > .react-select__input-container')
      .click();
    await this.page.locator('#react-select-3-input').fill('va');
    await this.page.getByText('Vanitha R', { exact: true }).click();

    // Select assigned user
   // await this.page.locator('.react-select__value-container.react-select__value-container--is-multi > .react-select__input-container').click();
   
await this.page.getByText('Select', { exact: true }).click();
await this.page.getByText('Vanitha 2 Pallet', { exact: true }).click(); 
  //  await this.page.locator('#react-select-4-input').fill('va');
  //   await this.page.locator('#react-select-4-option-3').click();

    // Select date
    await this.page.getByRole('button', { name: 'Choose date' }).click();
    await this.page.getByRole('gridcell', { name: '27' }).click();

    // Add product
    await this.page.getByRole('button', { name: '+ Add More' }).click();

    await this.page.locator("(//input[@role='combobox'])[last()]").click();
    await this.page.locator("(//input[@role='combobox'])[last()]").fill('mpos');

    await this.page
      .getByRole('option', { name: 'mPOS Product 1 - mPOS Product 1 - 100 Grams 100 Grams' })
      .click();

    await this.page.locator('#quantityInput-0').click();
    await this.page.locator('#quantityInput-0').fill('100');

    // Optional SweetAlert confirm
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => {});

    // Save indent
    await this.page.getByRole('button', { name: 'Save' }).click();

    // Optional SweetAlert confirm after save
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => {});
  }

  async approveIndent() {
    // await this.page.locator('div[title="TEST VENDOR"]').click();
    await this.page.locator('tbody tr').first().locator('div[title="TEST VENDOR"]').click();
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
    await this.page.getByRole('cell', { name: 'TEST VENDOR' }).first().click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Inward (GRN)' }).click();

    // GRN date
    await this.page.getByRole('button', { name: 'Choose date' }).first().click();
    await this.page.getByRole('gridcell', { name: '28' }).click();

    // Invoice amount
    await this.page.getByRole('spinbutton').first().click();
    await this.page.getByRole('spinbutton').first().fill('139');

    // Select buyer
    await this.page.getByText('Select...').click();
    await this.page.locator('#react-select-8-input').fill('va');
    await this.page.getByText('Vanitha R', { exact: true }).click();

    // Invoice number
    await this.page.getByRole('textbox').nth(3).click();
    await this.page.getByRole('textbox').nth(3).fill('1qw');

    // Received quantity
    // await this.page.locator('.MuiInputBase-root.MuiInputBase-colorPrimary.product-aligning.product-not-added > .MuiInputBase-input').click();
    // await this.page.locator('.MuiInputBase-root.MuiInputBase-colorPrimary.Mui-focused > .MuiInputBase-input').fill('10');
    // await this.page.locator('#table-body > tr > td:nth-child(8) > .grn-body-row-boxes-1 > .MuiInputBase-root > .MuiInputBase-input').click();
    const receivedQty = this.page.locator(
  '#table-body > tr > td:nth-child(8) > .grn-body-row-boxes-1 > .MuiInputBase-root > .MuiInputBase-input'
    );

await receivedQty.click();
await receivedQty.fill('10');
   
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async approveGRN() {
    await this.page.getByRole('cell', { name: 'TEST VENDOR' }).first().click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Approve' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}

module.exports = { PurchasePage };