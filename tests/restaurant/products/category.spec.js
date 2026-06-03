const { test } = require('../../../fixtures/baseTest');
const { CategoryPage } = require('../../../pages/restaurant/products/CategoryPage');

test('create restaurant product category', async ({ page }) => {
  const categoryPage = new CategoryPage(page);
  await categoryPage.createCategory();
});
