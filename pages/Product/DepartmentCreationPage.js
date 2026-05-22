class DepartmentCreationPage {
  constructor(page) {
    this.page = page;
  }

  async openDepartmentMaster() {
    await this.page.getByTitle('Products').locator('path').click();
    await this.page.getByText('Masters').click();
    await this.page.getByRole('button', { name: 'Department' }).click();
  }

  async createDepartment() {
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department name...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department name...' }).fill('CAT7');
    await this.page.getByRole('textbox', { name: 'Enter Department desc...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department desc...' }).fill('cc');
    await this.page.getByRole('textbox', { name: 'Enter Department code...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department code...' }).fill('124');
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async createSubDepartment() {
    await this.page.getByText('Sub-department').click();
    await this.page.locator('#scheduleYes').nth(1).check();
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.page.locator('.css-8mmkcg').click();
     await this.page.waitForTimeout(5000);
    await this.page.getByText('CAT7', { exact: true }).click();
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('combobox').nth(0).click();
     
await this.page.getByText('Local', { exact: true }).click();
 
        await this.page.getByRole('textbox', { name: 'Enter sub-department name....' }).click();
    await this.page.getByRole('textbox', { name: 'Enter sub-department name....' }).fill('Test Sub1');
    await this.page.getByRole('textbox', { name: 'Enter sub-department desc...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter sub-department name....' }).fill('Test Subd');
    await this.page.getByRole('textbox', { name: 'Enter sub-department desc...' }).fill('vcdvdv1');
    await this.page.getByRole('textbox', { name: 'Enter sub-department code...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter sub-department code...' }).fill('23');
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async createDepartmentAndSubDepartment() {
    await this.createDepartment();
    await this.createSubDepartment();
  }
}

module.exports = { DepartmentCreationPage };
