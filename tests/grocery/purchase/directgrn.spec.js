const { test } = require('../../../fixtures/baseTest');

test('create and approve direct GRN', async ({ directGRN }) => {
  await directGRN.openInwardGRN();
  await directGRN.createDirectGRN();
  await directGRN.approveLatestGRN();
  await directGRN.openBills();
});
