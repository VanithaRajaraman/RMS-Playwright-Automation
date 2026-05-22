class OnlineCategoryPage {
  constructor(page) {
    this.page = page;
    this.levelOneName = 'Fish L1C';
    this.levelTwoName = 'Fish L2B';
    this.levelThreeName = 'Fish L3B';
  }

  async openOnlineCategory() {
    await this.page.getByTitle('Products').locator('path').click();
    await this.page.getByText('Masters').click();
    await this.page.getByRole('button', { name: 'Online Category' }).click();
  }

  async createLevelOneCategory() {
    await this.page.getByRole('button', { name: '+ New' }).first().click();
    await this.page.getByRole('textbox', { name: 'Enter category name...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter category name...' }).fill(this.levelOneName);
    await this.page.getByRole('textbox', { name: 'Enter Department desc...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department desc...' }).fill('abc');
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // async createLevelTwoCategory() {
  //   await this.page.getByRole('button', { name: '+ New' }).nth(1).click();
  //   await this.page.getByText('Select main category...').click();
  //   await this.page.getByText(this.levelOneName, { exact: true }).click();
  //   await this.page.getByRole('textbox', { name: 'Enter Level 2 name...' }).click();
  //   await this.page.getByRole('textbox', { name: 'Enter Level 2 name...' }).fill(this.levelTwoName);
  //   await this.page.getByRole('textbox', { name: 'Enter Level 2 description...' }).click();
  //   await this.page.getByRole('textbox', { name: 'Enter Level 2 description...' }).fill('dc');
  //   await this.page.getByRole('button', { name: 'Save' }).click();
  // }

  

  async createLevelTwoCategory() {
    await this.page.getByRole('button', { name: '+ New' }).nth(1).click();

    await this.page.getByRole('combobox').first().click();
    await this.page.getByText(this.levelOneName, { exact: true }).click();

    await this.page.getByRole('textbox', { name: 'Enter Level 2 name...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Level 2 name...' }).fill(this.levelTwoName);

    await this.page.getByRole('textbox', { name: 'Enter Level 2 description...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Level 2 description...' }).fill('dc');

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async createLevelThreeCategory() {
    await this.page.getByRole('button', { name: '+ New' }).nth(2).click();
    await this.page.getByRole('combobox').first().click();
    await this.page.getByText(this.levelOneName, { exact: true }).click();
    await this.page.getByRole('combobox').nth(1).click();
    await this.page.getByText(this.levelTwoName, { exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Enter level 3 name...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter level 3 name...' }).fill(this.levelThreeName);
    await this.page.getByRole('textbox', { name: 'Enter level 3 desc...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter level 3 desc...' }).fill('vvfv');
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async createOnlineCategory() {
    await this.createLevelOneCategory();
    await this.createLevelTwoCategory();
    await this.createLevelThreeCategory();
  }
}

module.exports = { OnlineCategoryPage };
