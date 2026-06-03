const { test } = require('../../../fixtures/baseTest');

test('create sales return', async ({ salesReturn }) => {
  await salesReturn.createReturn();
});
