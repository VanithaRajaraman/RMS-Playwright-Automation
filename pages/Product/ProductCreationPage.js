class ProductCreationPage {
  constructor(page) {
    this.page = page;
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

  async createProduct() {
    await this.clickAddProduct();

    await this.page.getByRole('textbox', { name: 'Product Name*' }).click();
    await this.page.getByRole('textbox', { name: 'Product Name*' }).fill('Aachi Special Masala');
    await this.page.getByText(/Add.*Aachi Special Masala/).click();

    await this.page.getByText('Search by category').click();
    await this.page.getByText('Pizza A Erode', { exact: true }).click();

    await this.page.getByText('Search by sub category').click();
    await this.page.getByText('Pizza cat 2 erode', { exact: true }).click();

    await this.page.getByText('Search by product type').click();
    await this.page.getByText('Pizz cat 3 erode', { exact: true }).click();

    await this.page.getByText('Search manufactured by').click();
    await this.page.getByText('Pro Nature Organic Foods Pvt.Ltd.', { exact: true }).click();

    await this.page.getByText('Search by brand').click();
    await this.page.getByText('Coca-Cola', { exact: true }).click();

    await this.page
      .locator('div:nth-child(3) > div:nth-child(2) > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__indicators > .react-select__indicator > .css-8mmkcg')
      .click();
    await this.page.getByText('5%', { exact: true }).click();

    await this.page.getByText('Select Tax Type').click();
    await this.page.getByText('Inclusive', { exact: true }).click();

    await this.page.getByRole('button', { name: 'Regular Product' }).click();
    await this.page.getByTestId('AutoAwesomeIcon').click();

    await this.page.getByRole('textbox', { name: 'Specification*' }).click();
    await this.page.getByRole('textbox', { name: 'Specification*' }).fill('100');

    await this.page
      .locator('.field-uom > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__indicators > .react-select__indicator > .css-8mmkcg')
      .click();
    await this.page.getByText('gm', { exact: true }).click();

    await this.page
      .locator('.field-packaging > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__indicators > .react-select__indicator > .css-8mmkcg')
      .click();
    await this.page.getByText('Pouch', { exact: true }).click();

    await this.page.getByRole('textbox', { name: 'MRP*' }).click();
    await this.page.getByRole('textbox', { name: 'MRP*' }).fill('100');

    await this.page.getByText('Select Tax Status').click();
    await this.page.getByText('Taxable', { exact: true }).click();

    await this.page.getByText('Select Channels').click();
    await this.page.getByText('App', { exact: true }).click();

    await this.page.locator('.react-select__value-container.react-select__value-container--is-multi > .react-select__input-container').click();
    await this.page.getByText('B2B', { exact: true }).click();

    await this.page.getByRole('button', { name: 'Weighing Scale Product' }).click();

    await this.page.getByRole('textbox', { name: '1', exact: true }).click();
    await this.page.getByRole('textbox', { name: '1', exact: true }).fill('1');

    await this.page.getByRole('textbox', { name: '₹' }).click();
    await this.page.getByRole('textbox', { name: '₹' }).fill('200');

    await this.page
      .locator('div:nth-child(2) > .product-form-grid > .field-tax-status > .select-field-container > .select-wrapper > .css-b62m3t-container > .react-select__control > .react-select__indicators > .react-select__indicator')
      .click();
    await this.page.locator('#react-select-23-option-0').click();

    await this.page.getByText('Select Channels').click();
    await this.page.locator('#react-select-24-option-0').click();

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async openCreatedProduct() {
    //await this.page.getByText('Aachi Special Masala').click();
    await this.page.getByRole('row', { name: /Aachi Special Masala/ }).first().click();
  }
}

module.exports = {
  ProductCreationPage,
  ProductPage: ProductCreationPage
};
