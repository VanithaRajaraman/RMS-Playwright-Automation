const { getTestData } = require('../../../config/testData');
const TENANTS = require('../../../config/tenants');

class ShiftSchedulerPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').shiftScheduler;
  }

  async navigateToRoster() {
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

    await this.page.getByText('Shift & Attendance').click();
    await this.page.waitForLoadState('networkidle').catch(() => { });

    // Click Weekly Roster tab
    await this.page.getByText('Weekly Roster').first().click();
    await this.page.waitForTimeout(3000); // Wait for roster grid to render
  }

  async assignShift() {
    await this.navigateToRoster();

    // Click on the Monday cell of any employee row (e.g. Ajay)
    const row = this.page.locator('tbody tr').filter({ hasText: 'Ajay' }).first();
    const cell = row.locator('td').nth(2);
    await cell.waitFor({ state: 'visible', timeout: 5000 });

    // Retry clicking the roster cell until the Reassign Shift modal is visible
    const searchInput = this.page.locator('input[placeholder="Search employees by name or role..."]');
    for (let i = 0; i < 3; i++) {
      await cell.click({ force: true });
      await this.page.waitForTimeout(1500);
      if (await searchInput.isVisible()) {
        break;
      }
      console.log(`⚠️ Click did not open roster modal. Retrying cell click (${i + 1}/3)...`);
    }

    try {
      await searchInput.waitFor({ state: 'visible', timeout: 5000 });
      await searchInput.fill(this.data.employeeName);
      await this.page.waitForTimeout(1000);
    } catch (e) {
      console.log('ℹ️ Search input not visible, proceeding to select employee card directly...');
    }

    // Select the employee card
    const empCard = this.page.getByText(new RegExp(this.data.employeeName, 'i')).first();
    await empCard.waitFor({ state: 'visible', timeout: 5000 });
    await empCard.click({ force: true });
    await this.page.waitForTimeout(500);

    // Click Confirm Assignment
    const confirmBtn = this.page.getByRole('button', { name: /Confirm Assignment/i });
    await confirmBtn.click();
    await this.page.waitForTimeout(2000);

    // Dismiss SweetAlert confirmation if it appears
    const confirmSwal = this.page.locator('.swal2-confirm');
    if (await confirmSwal.isVisible()) {
      await confirmSwal.click();
    }

    await this.page.waitForTimeout(2000);
  }
}

module.exports = { ShiftSchedulerPage };
