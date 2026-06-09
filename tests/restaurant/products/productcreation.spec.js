const { test, expect } = require('../../../fixtures/baseTest');
const { ProductCreationPage } = require('../../../pages/restaurant/products/ProductCreationPage');

test('create restaurant product', async ({ page }) => {
  const productCreationPage = new ProductCreationPage(page);

  // 1. Open products page and create the product
  await productCreationPage.openProducts();
  await productCreationPage.clickAddProduct();
  await productCreationPage.createProduct();
  // 2. Verify the product is created and appears in the list
  await expect(page.getByRole('row', { name: productCreationPage.productName }).first()).toBeVisible();

  await productCreationPage.openCreatedProduct();
});

