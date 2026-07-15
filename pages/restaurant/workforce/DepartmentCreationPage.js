const { getTestData } = require('../../../config/testData');
const TENANTS = require('../../../config/tenants');

class DepartmentCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').department;
  }

  async selectFirstDropdownOption(selectorOrLocator) {
    const combobox = typeof selectorOrLocator === 'string' ? this.page.locator(selectorOrLocator) : selectorOrLocator;
    await combobox.click();
    await this.page.waitForTimeout(500); // Wait for list to render
    const menu = this.page.locator('.react-select__menu, [role="listbox"]').first();
    const option = menu.locator('[role="option"], .react-select__option, div[class*="-option"]').first();
    try {
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click({ force: true });
    } catch (e) {
      console.log(`⚠️ First option not visible. Falling back to keyboard selection...`);
      await this.page.keyboard.press('ArrowDown');
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('Enter');
    }
    await this.page.waitForTimeout(500); // Wait for value to settle
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

  async createDepartment() {
    const uniqueId = Date.now().toString().slice(-6);
    const name = `${this.data.namePrefix}${uniqueId}`;
    const code = `${this.data.codePrefix}${uniqueId}`;

    await this.navigateToMasterHub();

    // Click on Department card
    await this.page.getByText('Department', { exact: true }).first().click();
    await this.page.waitForLoadState('networkidle').catch(() => { });

    // Click Add Department with retry logic
    const addBtn = this.page.getByRole('button', { name: /Add Department/i });
    const drawerTitle = this.page.getByText('Add New Department', { exact: true }).first();
    await addBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.clickUntilOpen(addBtn, drawerTitle);

    // Fill form
    const nameInput = this.page.locator('input[placeholder="e.g, Platform Team"]');
    await nameInput.fill(name);
    await this.page.locator('input[placeholder="E.G, IT-PT"]').fill(code);

    // Select Head (optional manager, try to select first option if exists)
    const headDropdown = this.page.locator('.react-select__control, div').filter({ hasText: /^Select manager$/ }).first();
    if (await headDropdown.isVisible()) {
      await this.selectFirstDropdownOption(headDropdown).catch(() => {
        console.log('ℹ️ Manager dropdown not interactable or empty.');
      });
    }

    // Description
    await this.page.locator('textarea').first().fill(this.data.description);

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

    return { name, code };
  }
}

module.exports = { DepartmentCreationPage };
