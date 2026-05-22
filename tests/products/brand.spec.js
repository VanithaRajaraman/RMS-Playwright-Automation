const { test } = require('../../fixtures/baseTest');
const { BrandPage } = require('../../pages/Product/BrandPage');

test('create brand', async ({ page }) => {
  const brandPage = new BrandPage(page);

  await brandPage.openBrandMaster();
  await brandPage.createBrand();
});
