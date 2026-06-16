const { test } = require('../../../fixtures/baseTest');
const { DirectGRN } = require('../../../pages/restaurant/purchase/GRNPage');

test('create and approve direct GRN', async ({ page }) => {
    const directGRN = new DirectGRN(page);
    await directGRN.openInwardGRN();
    await directGRN.createDirectGRN();
    await directGRN.approveLatestGRN();
    await directGRN.openBills();
});
