const { getTestData } = require('../../../config/testData');
const TENANTS = require('../../../config/tenants');

class HolidayCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').holiday;
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

  async createHoliday() {
    const uniqueId = Date.now().toString().slice(-6);
    const holidayName = `${this.data.holidayNamePrefix}${uniqueId}`;

    await this.navigateToMasterHub();

    // Click on Holiday card
    await this.page.getByText('Holiday', { exact: true }).first().click();
    await this.page.waitForLoadState('networkidle').catch(() => { });

    // Click Add Holidays
    const addBtn = this.page.getByRole('button', { name: /Add Holidays/i });
    try {
      await addBtn.waitFor({ state: 'visible', timeout: 5000 });
      await addBtn.click();
    } catch (e) {
      await this.page.getByRole('button', { name: /Add|New/i }).first().click();
    }
    await this.page.waitForTimeout(1000);

    // Select Year
    const yearDropdown = this.page.locator('xpath=//*[contains(text(),"Leave Year")]/..//input').first();
    await this.selectDropdownOptionByValue(yearDropdown, this.data.leaveYear);

    // Holiday Name
    await this.page.locator('input[placeholder="Enter the holiday name"]').fill(holidayName);

    // Date
    await this.page.locator('input[placeholder="Select the date"]').fill(this.data.date);

    // Is Optional checkbox
    if (this.data.isOptional) {
      await this.page.getByText('Is Optional holiday ?').first().click({ force: true });
    }

    // Click Add button to add to list
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.page.waitForTimeout(1000);

    // Click Save
    await this.page.getByRole('button', { name: 'Save' }).click();
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

    return { holidayName };
  }
}

module.exports = { HolidayCreationPage };
