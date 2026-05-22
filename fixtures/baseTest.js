const base = require('@playwright/test');
const { ProductCreationPage } = require('../pages/Product/ProductCreationPage');
const { DepartmentCreationPage } = require('../pages/Product/DepartmentCreationPage');
const { OnlineCategoryPage } = require('../pages/Product/OnlineCategoryPage');
const {BrandPage} = require('../pages/Product/BrandPage');
const { PurchasePage } = require('../pages/PurchasePage');
const { DirectGRN } = require('../pages/DirectGRN');

exports.test = base.test.extend({
  // Navigate to dashboard once for each test
  page: async ({ page }, use) => {
    await page.goto('/dashboards/RETAIL');
    await use(page);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductCreationPage(page);
    await use(productPage);
  },

  productCreationPage: async ({ page }, use) => {
    const productCreationPage = new ProductCreationPage(page);
    await use(productCreationPage);
  },

  departmentCreationPage: async ({ page }, use) => {
    const departmentCreationPage = new DepartmentCreationPage(page);
    await use(departmentCreationPage);
  },

  onlineCategoryPage: async ({ page }, use) => {
    const onlineCategoryPage = new OnlineCategoryPage(page);
    await use(onlineCategoryPage);
  },

  purchasePage: async ({ page }, use) => {
    const purchasePage = new PurchasePage(page);
    await use(purchasePage);
  },

  directGRN: async ({ page }, use) => {
    const directGRN = new DirectGRN(page);
    await use(directGRN);
  }
});

exports.expect = base.expect;