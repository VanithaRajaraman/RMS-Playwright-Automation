const { getTestData } = require('../../../config/testData');
const TENANTS = require('../../../config/tenants');

class DesignationCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').designation;
  }

  async selectDropdownOptionByValue(selectorOrLocator, value) {
    if (!value) return;
    const combobox = typeof selectorOrLocator === 'string' ? this.page.locator(selectorOrLocator) : selectorOrLocator;
    await combobox.click();
    try {
      await combobox.fill('');
      await combobox.fill(value);
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.log(`ℹ_ Selector is not editable/searchable. Proceeding directly...`);
    }

    const menu = this.page.locator('.react-select__menu, [role="listbox"]').first();
    const optionExact = menu.getByText(value, { exact: true }).first();
    const optionFuzzy = menu.getByText(value, { exact: false }).first();

    let option = optionExact;
    try {
      await optionExact.waitFor({ state: 'visible', timeout: 3000 });
    } catch (e) {
      console.log(`ℹ_ Exact match for "${value}" not found in menu. Trying fuzzy match...`);
      option = optionFuzzy;
      try {
        await optionFuzzy.waitFor({ state: 'visible', timeout: 2000 });
      } catch (err) {
        console.log(`⚠️ Option "${value}" not visible in menu. Falling back to keyboard selection...`);
        await this.page.keyboard.press('ArrowDown');
        await this.page.waitForTimeout(300);
        await this.page.keyboard.press('Enter');
        
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);
        return;
      }
    }

    await option.click({ force: true });
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  async clickUntilOpen(clickSelector, checkSelector, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      await clickSelector.click({ force: true });
      await this.page.waitForTimeout(1000);
      if (await checkSelector.isVisible()) {
        return;
      }
      console.log(`⚠️ Click did not open form. Retrying click (${i + 1}/${maxRetries})...`);
    }
    await clickSelector.click();
  }

  async navigateToMasterHub() {
    const workforceMenu = this.page.getByText('Pallet Workforce');
    if (!await workforceMenu.isVisible()) {
      const expandBtn = this.page.getByRole('button', { name: 'Expand sidebar' });
      if (await expandBtn.isVisible()) {
        await expandBtn.click();
      } else {
        const revampIcon = this.page.locator('svg.revamp-sidebar__icon').first();
        if (await revampIcon.isVisible()) {
          await revampIcon.click();
        }
      }
      await this.page.waitForTimeout(1000);
    }
    await workforceMenu.click();
    await this.page.waitForTimeout(1000);

    await this.page.getByText('Master').click();
    await this.page.waitForLoadState('networkidle').catch(() => { });
  }

  async createDesignation() {
    const uniqueId = Date.now().toString().slice(-6);
    const jobTitle = `${this.data.jobTitlePrefix}${uniqueId}`;

    await this.navigateToMasterHub();

    // Click on Designation card
    await this.page.getByText('Designation', { exact: true }).first().click();
    await this.page.waitForLoadState('networkidle').catch(() => { });

    // Click Add Designation with retry logic
    const addBtn = this.page.getByRole('button', { name: /Add Designation/i });
    const drawerTitle = this.page.getByText('Add New Designation', { exact: true }).first();
    await addBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.clickUntilOpen(addBtn, drawerTitle);

    // Fill form
    const titleInput = this.page.locator('input[placeholder="Enter Job Title"]');
    await titleInput.fill(jobTitle);

    // Select Job Level
    const levelDropdown = this.page.locator('xpath=//*[text()="Job Level *"]/..//input').first();
    await this.selectDropdownOptionByValue(levelDropdown, this.data.jobLevel);

    // Select Department
    const deptDropdown = this.page.locator('xpath=//*[text()="Department *"]/..//input').first();
    await this.selectDropdownOptionByValue(deptDropdown, this.data.department);

    // Job Summary
    await this.page.locator('textarea').first().fill(this.data.jobSummary);

    // Click Save
    await this.page.getByRole('button', { name: /Save/i }).first().click();
    await this.page.waitForTimeout(2000);

    // Handle SweetAlert success dialog
    const confirmBtn = this.page.locator('.swal2-confirm');
    try {
      await confirmBtn.waitFor({ state: 'visible', timeout: 3000 });
      await confirmBtn.click();
    } catch (e) {
      console.log('ℹ️ SweetAlert confirmation not shown.');
    }

    await this.page.waitForTimeout(2000);

    return { jobTitle };
  }
}

module.exports = { DesignationCreationPage };
