const { test } = require('../../../fixtures/baseTest');

test('create product', async ({ productCreationPage }) => {
  await productCreationPage.openProducts();
  await productCreationPage.createProduct();
  await productCreationPage.openCreatedProduct();
});
