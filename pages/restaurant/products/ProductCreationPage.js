const { getTestData } = require('../../../config/testData');

class ProductCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').product;
  }

  async openProducts() {
    // Wait for any initial progress spinner to disappear
    await this.page.locator('role=progressbar').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => { });
    await this.page.getByTitle('Products').locator('svg').click();
    await this.page.getByText('All Products').click();
  }

  async clickAddProduct() {
    await this.page.getByRole('button', { name: 'Add Menu' }).click();
  }

  async createProduct({ menuName, categoryName = this.data.category, subCategoryName = this.data.subCategory, variantTitle } = {}) {
    const uniqueId = Date.now().toString().slice(-6);
    const finalMenuName = menuName || `Spicy Biryani ${uniqueId}`;
    const finalVariantTitle = variantTitle || `Pepper Biryani ${uniqueId}`;
    this.productName = finalMenuName;

    // Click Add Menu button if the form is not already open
    if (!await this.page.getByRole('textbox', { name: 'Menu Name*' }).isVisible()) {
      await this.clickAddProduct();
    }

    await this.page.getByRole('textbox', { name: 'Menu Name*' }).click();
    await this.page.getByRole('textbox', { name: 'Menu Name*' }).fill(finalMenuName);

    // Add menu item option
    await this.page.getByText(`➕ Add “${finalMenuName}”`).click();

    // Toggle "Has Variant"
    await this.page.locator('div:nth-child(5) > .checkbox-wrapper > .checkbox-custom').click();

    // Select Category (Main Menu)
    const categoryDropdown = this.page.locator('.select-field-container').filter({ hasText: 'Main Menu' }).locator('input.react-select__input');
    await categoryDropdown.click();
    await categoryDropdown.fill(categoryName);
    await this.page.locator('.react-select__menu').getByText(categoryName, { exact: true }).click();

    // Select Sub Category (Sub Menu)
    const subCategoryDropdown = this.page.locator('.select-field-container').filter({ hasText: 'Sub Menu' }).locator('input.react-select__input');
    await subCategoryDropdown.click();
    await subCategoryDropdown.fill(subCategoryName);
    await this.page.locator('.react-select__menu').getByText(subCategoryName, { exact: true }).click();

    // Select GST
    const gstDropdown = this.page.locator('.select-field-container').filter({ hasText: 'GST' }).locator('input.react-select__input');
    await gstDropdown.click();
    await gstDropdown.fill('5%');
    await this.page.locator('.react-select__menu').getByText('5%', { exact: true }).click();


    // Expand or switch to Item Variant tab/accordion
    //await this.page.locator('div:nth-child(4) > .accordion-container > .accordion-header > .accordion-title-wrapper > .MuiSvgIcon-root > path').click();
    await this.page.getByText('Item Variant', { exact: true }).first().click();

    // Fill variant details
    await this.page.getByRole('textbox', { name: 'Enter variant title' }).fill(finalVariantTitle);

    // Select UOM
    await this.page.getByText('Select UOM').click();
    await this.page.waitForTimeout(500);
    await this.page.getByText('Gram', { exact: true }).click();

    await this.page.getByPlaceholder('eg: 35').fill(this.data.variantPrice);

    // Select Tax Status
    await this.page.getByText('Select tax status').click();
    await this.page.waitForTimeout(500);
    await this.page.getByText(this.data.taxStatus, { exact: true }).click();

    // Expand or switch to Additional Item Attributes tab/accordion
    await this.page.getByText('Additional Item Attributes', { exact: true }).first().click();
    await this.page.locator('span.radio-button-custom').nth(0).click();

    // Save
    await this.page.getByRole('button', { name: 'Save' }).click({ force: true });

    // Dismiss SweetAlert confirmation if it appears
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => { });
  }

  async openCreatedProduct() {
    await this.page.getByRole('row', { name: this.productName }).first().click();
  }
}

module.exports = { ProductCreationPage };
