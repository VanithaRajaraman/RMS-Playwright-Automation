const { getTestData } = require('../../../config/testData');
const TENANTS = require('../../../config/tenants');

class ShiftMasterPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').shiftMaster;
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

  async createShiftTemplate() {
    const uniqueId = Date.now().toString().slice(-6);
    // Make shift code a 4-letter unique string
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let shiftCode = '';
    for (let i = 0; i < 4; i++) {
      shiftCode += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    const shiftName = `${this.data.shiftNamePrefix}${uniqueId}`;

    await this.navigateToMasterHub();

    // Click on Shift Master card
    await this.page.getByText('Shift Master', { exact: true }).first().click();
    await this.page.waitForLoadState('networkidle').catch(() => { });

    // Click New Shift Template
    const addBtn = this.page.getByRole('button', { name: /New Shift Template/i });
    try {
      await addBtn.waitFor({ state: 'visible', timeout: 5000 });
      await addBtn.click();
    } catch (e) {
      await this.page.getByRole('button', { name: /Add|New/i }).first().click();
    }
    await this.page.waitForTimeout(1000);

    // Fill form
    await this.page.locator('input[placeholder="eg: Morning Shift"]').fill(shiftName);
    await this.page.locator('input[placeholder="eg: MORN"]').fill(shiftCode);

    // Select color
    await this.page.getByText(this.data.color, { exact: true }).first().click({ force: true });

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

    return { shiftName, shiftCode };
  }
}

module.exports = { ShiftMasterPage };
