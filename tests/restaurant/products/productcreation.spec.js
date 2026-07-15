const { test, expect } = require('../../../fixtures/baseTest');
const { ProductCreationPage } = require('../../../pages/restaurant/products/ProductCreationPage');

test('create restaurant product', async ({ page }) => {
  const productCreationPage = new ProductCreationPage(page);

  // 1. Open products page and create the product
  await productCreationPage.openProducts();
  await productCreationPage.clickAddProduct();
  const apiResponse = await productCreationPage.createProduct();
  const apiProduct = apiResponse.data.data;

  // Display validation results in test output
  console.log('\n==================================================');
  console.log('🔍 UI to API Assertion & Validation Results:');
  console.log('==================================================');

  // Compare Menu Name
  const uiMenuName = productCreationPage.productName;
  const apiMenuName = apiProduct.name;
  console.log(`- Menu Name:  [UI: "${uiMenuName}"]  =>  [API: "${apiMenuName}"]`);
  expect(apiMenuName).toBe(uiMenuName);

  // Compare Category (Level 1)
  const uiCategory = productCreationPage.data.category;
  const apiCategory = apiProduct.appCategories.categoryLevel1[0];
  console.log(`- Category (Main Menu):  [UI: "${uiCategory}"]  =>  [API: "${apiCategory}"]`);
  expect(apiCategory).toBe(uiCategory);

  // Compare Sub Category (Level 2)
  const uiSubCategory = productCreationPage.data.subCategory;
  const apiSubCategory = apiProduct.appCategories.categoryLevel2[0];
  console.log(`- Sub Category (Sub Menu):  [UI: "${uiSubCategory}"]  =>  [API: "${apiSubCategory}"]`);
  expect(apiSubCategory).toBe(uiSubCategory);

  // Compare Variant Weight/Price (variantPrice maps to weight in backend)
  const uiVariantWeight = Number(productCreationPage.data.variantPrice);
  const apiVariantWeight = apiProduct.variants[0].weight;
  console.log(`- Variant Weight:  [UI: ${uiVariantWeight}]  =>  [API: ${apiVariantWeight}]`);
  expect(apiVariantWeight).toBe(uiVariantWeight);

  // Compare Tax Status
  const uiTaxStatus = productCreationPage.data.taxStatus.toUpperCase();
  const apiTaxStatus = apiProduct.variants[0].taxStatus.toUpperCase();
  console.log(`- Tax Status:  [UI: "${uiTaxStatus}"]  =>  [API: "${apiTaxStatus}"]`);
  expect(apiTaxStatus).toBe(uiTaxStatus);

  console.log('==================================================\n');

  // 2. Verify the product is created and appears in the list
  await expect(page.getByRole('row', { name: productCreationPage.productName }).first()).toBeVisible();

  await productCreationPage.openCreatedProduct();
});

