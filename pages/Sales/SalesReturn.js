class SalesReturn {
  constructor(page) {
    this.page = page;
  }

  async createReturn() {
    const icon = this.page.locator('svg.revamp-sidebar__icon').nth(0);
    await icon.click();
    await this.page.getByText('Sales', { exact: true }).click();
    await this.page.getByRole('navigation').getByText('Returns').click();
    await this.page.getByRole('button', { name: 'Return' }).click();
    await this.page.locator('.css-8mmkcg > path').first().click();
    await this.page.getByText('Business customer', { exact: true }).click();
    await this.page.getByRole('button', { name: 'Product Lookup' }).click();
    await this.page.getByRole('spinbutton').first().fill('10');
    // await this.page.getByRole('spinbutton').click();
    // await this.page.getByRole('spinbutton').fill('1');
    await this.page.getByRole('button', { name: 'close' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}

module.exports = { SalesReturn };
