const { getTestData } = require('../../../config/testData');

class DepartmentCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('grocery').department;
    const uniqueId = Date.now().toString().slice(-6);
    this.departmentName = `${this.data.namePrefix}${uniqueId}`;
    this.departmentCode = uniqueId;
    this.subDepartmentName = `${this.data.subDepartmentNamePrefix}${uniqueId}`;
    this.subDepartmentDesc = `${this.data.subDepartmentDesc}${uniqueId}`;
    this.subDepartmentCode = uniqueId.slice(-4);
  }

  async openDepartmentMaster() {
    await this.page.getByTitle('Products').locator('path').click();
    await this.page.getByText('Masters').click();
    await this.page.getByRole('button', { name: 'Department' }).click();
  }

  async createDepartment() {
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department name...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department name...' }).fill(this.departmentName);
    await this.page.getByRole('textbox', { name: 'Enter Department desc...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department desc...' }).fill(this.data.desc);
    await this.page.getByRole('textbox', { name: 'Enter Department code...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Department code...' }).fill(this.departmentCode);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async createSubDepartment() {
    await this.page.getByText('Sub-department').click();
    await this.page.locator('#scheduleYes').nth(1).check();
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.page.reload({ waitUntil: 'load' });
    // await this.page.locator('.css-8mmkcg').click();     
    // await this.page.getByText('PAT1', { exact: true }).click();  
    await this.page.getByRole('combobox').click();
    await this.page.getByRole('combobox').fill(this.departmentName);
    await this.page.getByText(this.departmentName, { exact: true }).click();
    await this.page.getByRole('combobox').nth(0).click();
     
await this.page.getByText('Local', { exact: true }).click();
 
        await this.page.getByRole('textbox', { name: 'Enter sub-department name....' }).click();
    await this.page.getByRole('textbox', { name: 'Enter sub-department name....' }).fill(this.subDepartmentName);
    await this.page.getByRole('textbox', { name: 'Enter sub-department desc...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter sub-department name....' }).fill(this.subDepartmentName);
    await this.page.getByRole('textbox', { name: 'Enter sub-department desc...' }).fill(this.subDepartmentDesc);
    await this.page.getByRole('textbox', { name: 'Enter sub-department code...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter sub-department code...' }).fill(this.subDepartmentCode);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async createDepartmentAndSubDepartment() {
    await this.createDepartment();
    await this.createSubDepartment();
  }
}

module.exports = { DepartmentCreationPage };
