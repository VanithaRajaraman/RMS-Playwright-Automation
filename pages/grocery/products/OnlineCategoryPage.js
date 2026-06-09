class OnlineCategoryPage {
  constructor(page) {
    this.page = page;
    const uniqueId = Date.now().toString().slice(-6);
    this.levelOneName = `Kitchen${uniqueId}`;
    this.levelTwoName = `Seafood${uniqueId}`;
    this.levelThreeName = `Prawn${uniqueId}`;
  }

  async selectDropdownOption(index, optionName) {
    const combobox = this.page.getByRole('combobox').nth(index);
    await combobox.click();
    await combobox.fill(optionName);
    await this.page.getByText(optionName, { exact: true }).click();
  }

  async openOnlineCategory() {
    // Dismiss any initial SweetAlert on page load if present
    await this.page.locator('.swal2-confirm').click({ timeout: 1000 }).catch(() => {});

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
    // Dismiss SweetAlert confirmation if it appears
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => {});
    await this.page.getByText(this.levelOneName, { exact: true }).waitFor();
    await this.page.getByRole('button', { name: '+ New' }).nth(1).waitFor();
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
    await this.page.waitForTimeout(2000); // Wait for DB sync and component hydration
    const mainCategoryDropdown = this.page.getByRole('combobox').first();
    await mainCategoryDropdown.click();
    await mainCategoryDropdown.fill(this.levelOneName);
    await this.page.getByText(this.levelOneName, { exact: true }).click();

    await this.page.getByRole('textbox', { name: 'Enter Level 2 name...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Level 2 name...' }).fill(this.levelTwoName);

    await this.page.getByRole('textbox', { name: 'Enter Level 2 description...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Level 2 description...' }).fill('dc');

    await this.page.getByRole('button', { name: 'Save' }).click();
    // Dismiss SweetAlert confirmation if it appears
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => {});
    await this.page.getByRole('button', { name: '+ New' }).nth(2).waitFor();
  }

  async createLevelThreeCategory() {
    await this.page.getByRole('button', { name: '+ New' }).nth(2).click();
    await this.page.waitForTimeout(2000); // Wait for DB sync and component hydration
    await this.selectDropdownOption(0, this.levelOneName);
    await this.selectDropdownOption(1, this.levelTwoName);
    await this.page.getByRole('textbox', { name: 'Enter level 3 name...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter level 3 name...' }).fill(this.levelThreeName);
    await this.page.getByRole('textbox', { name: 'Enter level 3 desc...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter level 3 desc...' }).fill('vvfv');
    await this.page.getByRole('button', { name: 'Save' }).click();
    // Dismiss SweetAlert confirmation if it appears
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => {});
  }

  async createOnlineCategory() {
    await this.createLevelOneCategory();
    await this.createLevelTwoCategory();
    await this.createLevelThreeCategory();
  }
}

module.exports = { OnlineCategoryPage };
