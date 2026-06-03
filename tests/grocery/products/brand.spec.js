const { test } = require('../../../fixtures/baseTest');
const { BrandPage } = require('../../../pages/grocery/products/BrandPage');

test('create brand', async ({ page }) => {
  const brandPage = new BrandPage(page);

  await brandPage.openBrandMaster();
  await brandPage.createBrand();
});
