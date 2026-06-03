const { getTestData } = require('../../../config/testData');

class PrepStationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').prepStation;
  }

  async createPrepStation() {
    // Generate dynamic names and codes to prevent duplication errors
    const uniqueId = Date.now().toString().slice(-6);
    const stationName = `${this.data.namePrefix} ${uniqueId}`;
    const shortCode = `${this.data.shortCodePrefix}${uniqueId.slice(-2)}`;

    // Expand Products and click Masters
    await this.page.getByTitle('Products').locator('svg').click();
    await this.page.getByText('Masters').click();
    
    // Navigate to Prep Station
    await this.page.getByRole('button', { name: 'Prep Station' }).click();
    await this.page.getByRole('button', { name: 'Add Prep Station' }).click();

    // Fill the Prep Station form
    await this.page.getByRole('textbox', { name: 'Name*' }).click();
    await this.page.getByRole('textbox', { name: 'Name*' }).fill(stationName);

    await this.page.getByRole('textbox', { name: 'Description' }).click();
    await this.page.getByRole('textbox', { name: 'Description' }).fill(this.data.description);

    await this.page.getByRole('textbox', { name: 'Short Code' }).click();
    await this.page.getByRole('textbox', { name: 'Short Code' }).fill(shortCode);

    await this.page.getByRole('spinbutton', { name: 'Total Order Capacity' }).click();
    await this.page.getByRole('spinbutton', { name: 'Total Order Capacity' }).fill(this.data.totalOrderCapacity);

    await this.page.getByRole('spinbutton', { name: 'Close station when order %' }).click();
    await this.page.getByRole('spinbutton', { name: 'Close station when order %' }).fill(this.data.closeStationPercentage);

    // Save
    await this.page.getByRole('button', { name: 'Save' }).click();

    // Dismiss any SweetAlert confirmation (if present)
    await this.page.locator('.swal2-confirm').click({ timeout: 5000 }).catch(() => {});
  }
}

module.exports = { PrepStationPage };
