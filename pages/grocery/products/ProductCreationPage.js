const { getTestData } = require('../../../config/testData');

class ProductCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('grocery').product;
    const uniqueId = Date.now().toString().slice(-6);
    this.productName = `${this.data.namePrefix} ${uniqueId}`;
    this.productMenu = page.getByTitle('Products').locator('path');
    this.allProducts = page.getByText('All Products');
    this.addProductButton = page.getByRole('button', { name: 'Add Product' });
  }

  async openProducts() {
    await this.productMenu.click();
    await this.allProducts.click();
  }

  async clickAddProduct() {
    await this.addProductButton.click();
  }

  async createProduct(productName = this.productName) {
    this.productName = productName;
    await this.clickAddProduct();

    await this.page.getByRole('textbox', { name: 'Product Name*' }).click();
    await this.page.getByRole('textbox', { name: 'Product Name*' }).fill(productName);
    await this.page.getByText(new RegExp(`Add.*${productName}`)).click();

    await this.page.getByText('Search by category').click();
    await this.page.getByText(this.data.category, { exact: true }).click();

    await this.page.getByText('Search by sub category').click();
    await this.page.getByText(this.data.subCategory, { exact: true }).click();

    await this.page.getByText('Search by product type').click();
    await this.page.getByText(this.data.productType, { exact: true }).click();

    await this.page.getByText('Search manufactured by').click();
    await this.page.getByText(this.data.manufacturer, { exact: true }).click();

    await this.page.getByText('Search by brand').click();
    await this.page.getByText(this.data.brand, { exact: true }).click();

    await this.page
      .locator('div:nth-child(3) > div:nth-child(2) > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__indicators > .react-select__indicator > .css-8mmkcg')
      .click();
    await this.page.getByText(this.data.taxRate, { exact: true }).click();

    await this.page.getByText('Select Tax Type').click();
    await this.page.getByText(this.data.taxType, { exact: true }).click();

    await this.page.getByRole('button', { name: 'Regular Product' }).click();
    await this.page.getByTestId('AutoAwesomeIcon').click();

    await this.page.getByRole('textbox', { name: 'Specification*' }).click();
    await this.page.getByRole('textbox', { name: 'Specification*' }).fill(this.data.specification);

    await this.page
      .locator('.field-uom > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__indicators > .react-select__indicator > .css-8mmkcg')
      .click();
    await this.page.getByText(this.data.uom, { exact: true }).click();

    await this.page
      .locator('.field-packaging > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__indicators > .react-select__indicator > .css-8mmkcg')
      .click();
    await this.page.getByText(this.data.packaging, { exact: true }).click();

    await this.page.getByRole('textbox', { name: 'MRP*' }).click();
    await this.page.getByRole('textbox', { name: 'MRP*' }).fill(this.data.mrp);

    await this.page.getByText('Select Tax Status').click();
    await this.page.getByText(this.data.taxStatus, { exact: true }).click();

    await this.page.getByText('Select Channels').click();
    await this.page.getByText(this.data.salesChannels[0], { exact: true }).click();

    await this.page.locator('.react-select__value-container.react-select__value-container--is-multi > .react-select__input-container').click();
    await this.page.getByText(this.data.salesChannels[1], { exact: true }).click();

    await this.page.getByRole('button', { name: 'Weighing Scale Product' }).click();

    await this.page.getByRole('textbox', { name: '1', exact: true }).click();
    await this.page.getByRole('textbox', { name: '1', exact: true }).fill(this.data.weighingQuantity);

    await this.page.getByRole('textbox', { name: '₹' }).click();
    await this.page.getByRole('textbox', { name: '₹' }).fill(this.data.weighingPrice);

    await this.page
      .locator('div:nth-child(2) > .product-form-grid > .field-tax-status > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__indicators > .react-select__indicator')
      .click();
    await this.page.locator('#react-select-23-option-0').click();

    await this.page.getByText('Select Channels').click();
    await this.page.locator('#react-select-24-option-0').click();

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async openCreatedProduct() {
    await this.page.getByRole('row', { name: this.productName }).first().click();
  }
}

module.exports = {
  ProductCreationPage,
  ProductPage: ProductCreationPage
};
