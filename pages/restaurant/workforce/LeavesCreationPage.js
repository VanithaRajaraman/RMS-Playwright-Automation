const { getTestData } = require('../../../config/testData');
const TENANTS = require('../../../config/tenants');

class LeavesCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').leaves;
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

  async createLeave() {
    const uniqueId = Date.now().toString().slice(-6);
    const leaveName = `${this.data.leaveNamePrefix}${uniqueId}`;
    const shortName = `${this.data.shortNamePrefix}${uniqueId.slice(-2)}`;

    await this.navigateToMasterHub();

    // Click on Leaves card (main area card, avoiding sidebar)
    const leavesCard = this.page.locator('div[class*="card"], div[class*="Card"]').filter({ hasText: /^Leaves$/ }).first();
    if (await leavesCard.isVisible()) {
      await leavesCard.click();
    } else {
      await this.page.locator('main, [role="main"]').getByText('Leaves', { exact: true }).first().click();
    }
    await this.page.waitForLoadState('networkidle').catch(() => { });

    // Click Add Leaves
    const addBtn = this.page.getByRole('button', { name: /Add Leaves/i });
    try {
      await addBtn.waitFor({ state: 'visible', timeout: 5000 });
      await addBtn.click();
    } catch (e) {
      await this.page.getByRole('button', { name: /Add|New/i }).first().click();
    }
    await this.page.waitForTimeout(1000);

    // Fill form
    await this.page.locator('input[placeholder="Enter Leave Name"]').fill(leaveName);

    // Assign Locations
    const appEnv = process.env.APP_ENV || 'upcoming';
    const tenant = TENANTS.restaurant[appEnv];
    const locationName = tenant ? tenant.location : 'Automation Testing';
    const locDropdown = this.page.locator('xpath=//*[contains(text(),"Assign Locations")]/..//input').first();
    await this.selectDropdownOptionByValue(locDropdown, locationName);

    // Short Name
    await this.page.locator('input[placeholder="Enter Short Name"]').fill(shortName);

    // Is the leave type Paid checkbox
    if (this.data.isPaid) {
      await this.page.getByText('Is the leave type Paid').first().click({ force: true });
    }

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

    return { leaveName };
  }
}

module.exports = { LeavesCreationPage };
