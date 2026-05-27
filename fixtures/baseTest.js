const base = require('@playwright/test');
const { ProductCreationPage } = require('../pages/Product/ProductCreationPage');
const { DepartmentCreationPage } = require('../pages/Product/DepartmentCreationPage');
const { OnlineCategoryPage } = require('../pages/Product/OnlineCategoryPage');
const {BrandPage} = require('../pages/Product/BrandPage');
const { PurchasePage } = require('../pages/Purchase/PurchasePage');
const { DirectGRN } = require('../pages/Purchase/DirectGRN');
const { CustomerPage } = require('../pages/Sales/CustomerPage');
const { SalesOrder } = require('../pages/Sales/SalesOrder');
const { SalesReturn } = require('../pages/Sales/SalesReturn');

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
  },

  customerPage: async ({ page }, use) => {
    const customerPage = new CustomerPage(page);
    await use(customerPage);
  },

  salesOrder: async ({ page }, use) => {
    const salesOrder = new SalesOrder(page);
    await use(salesOrder);
  },

  salesReturn: async ({ page }, use) => {
    const salesReturn = new SalesReturn(page);
    await use(salesReturn);
  }
});

exports.expect = base.expect;
