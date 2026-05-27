const { test } = require('../../fixtures/baseTest');

test('create sales order and download invoice', async ({ salesOrder }) => {
  await salesOrder.createCompleteAndDownloadSalesOrder();
});
