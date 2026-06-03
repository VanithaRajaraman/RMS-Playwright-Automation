const { test } = require('../../../fixtures/baseTest');
const { CategoryPage } = require('../../../pages/restaurant/products/CategoryPage');
const { ProductCreationPage } = require('../../../pages/restaurant/products/ProductCreationPage');

test('create restaurant product with dynamic category', async ({ page }) => {
  const categoryPage = new CategoryPage(page);
  const productCreationPage = new ProductCreationPage(page);

  // 1. Create a dynamic category first
  const { categoryName, level2Name } = await categoryPage.createCategory();

  // 2. Open products page and create the product under the dynamic category
  await productCreationPage.openProducts();
  await productCreationPage.createProduct({
    categoryName,
    subCategoryName: level2Name
  });
});
