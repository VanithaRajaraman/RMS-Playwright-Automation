const { getTestData } = require('../../../config/testData');

class ProductCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').product;
  }

  async openProducts() {
    await this.page.getByTitle('Products').click();
    await this.page.getByText('All Products').click();
  }

  async createProduct({ menuName, categoryName, subCategoryName, variantTitle }) {
    const uniqueId = Date.now().toString().slice(-6);
    const finalMenuName = menuName || `Spicy Biryani ${uniqueId}`;
    const finalVariantTitle = variantTitle || `Pepper Biryani ${uniqueId}`;

    await this.page.getByRole('button', { name: 'Add Menu' }).click();
    await this.page.getByRole('textbox', { name: 'Menu Name*' }).click();
    await this.page.getByRole('textbox', { name: 'Menu Name*' }).fill(finalMenuName);
    
    // Add menu item option
    await this.page.getByText(`➕ Add “${finalMenuName}”`).click();

    // Toggle "Has Variant"
    await this.page.locator('div:nth-child(5) > .checkbox-wrapper > .checkbox-custom').click();

    // Select Category
    await this.page.locator('.css-8mmkcg').first().click();
    await this.page.getByText(categoryName, { exact: true }).click();

    // Select Sub Category
    await this.page
      .locator('.react-select__indicator.react-select__dropdown-indicator.css-tlfecz-indicatorContainer > .css-8mmkcg')
      .first()
      .click();
    await this.page.getByText(subCategoryName, { exact: true }).click();

    // Click the width-140 select box (like prep station or other config dropdown)
    await this.page
      .locator('.w-140 > .select-field-container > .select-wrapper > .select-box-category > .react-select__control > .react-select__indicators > .react-select__indicator > .css-8mmkcg > path')
      .first()
      .click()
      .catch(() => {});

    // Expand or switch to Item Variant tab/accordion
    await this.page.getByText('Item Variant', { exact: true }).first().click();

    // Fill variant details
    await this.page.getByRole('textbox', { name: 'Enter variant title' }).fill(finalVariantTitle);
    await this.page.getByPlaceholder('eg: 35').fill(this.data.variantPrice);

    // Select Tax Status
    await this.page.locator('//svg[contains(@class,"css-8mmkcg")]').click();
    await this.page.getByText(this.data.taxStatus, { exact: true }).click();

    // Expand or switch to Additional Item Attributes tab/accordion
    await this.page.getByText('Additional Item Attributes', { exact: true }).first().click();
    await this.page.locator('span.radio-button-custom').nth(0).click();

    // Save
    await this.page.getByText('Save').click({ force: true });
  }
}

module.exports = { ProductCreationPage };
