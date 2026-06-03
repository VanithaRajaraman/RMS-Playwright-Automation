const { test } = require('../../../fixtures/baseTest');

test('create customer', async ({ customerPage }) => {
  await customerPage.createCustomer();
});
