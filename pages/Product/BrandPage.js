class BrandPage {
  constructor(page) {
    this.page = page;
  }

  async openBrandMaster() {
    await this.page.getByTitle('Products').locator('path').click();
    await this.page.getByText('Masters').click();
    await this.page.getByRole('button', { name: 'Brand' }).click();
  }

  async createBrand() {
    await this.page.getByRole('button', { name: '+ New' }).first().click();
    await this.page.locator('.css-8mmkcg').first().click();
    await this.page.getByText('Erode Manufacturers', { exact: true }).click();
    await this.page.locator('.css-1w4b01l > .css-1wy0on6 > .css-1d98x2t > .css-8mmkcg').click();
    await this.page.locator('#react-select-3-input').fill('CAP');
    await this.page.getByText('ADD "POS"', { exact: true }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();

    await this.page.getByRole('button', { name: '+ New' }).nth(1).click();
    await this.page.getByRole('textbox', { name: 'Enter Sub-brand', exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Enter Sub-brand', exact: true }).fill('mpos');
    await this.page.getByRole('textbox', { name: 'Enter Sub-brand Code' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Sub-brand Code' }).fill('12');
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}

module.exports = { BrandPage };
