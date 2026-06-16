const base = require('@playwright/test');
const { ProductCreationPage } = require('../pages/grocery/products/ProductCreationPage');
const { DepartmentCreationPage } = require('../pages/grocery/products/DepartmentPage');
const { OnlineCategoryPage } = require('../pages/grocery/products/OnlineCategoryPage');
const { BrandPage } = require('../pages/grocery/products/BrandPage');
const { PurchasePage } = require('../pages/grocery/purchase/PurchasePage');
const { DirectGRN } = require('../pages/grocery/purchase/DirectGRNPage');
const { CustomerPage } = require('../pages/grocery/sales/CustomerPage');
const { SalesOrder } = require('../pages/grocery/sales/SalesOrderPage');
const { SalesReturn } = require('../pages/grocery/sales/SalesReturnPage');
const { CategoryPage } = require('../pages/restaurant/products/CategoryPage');
const { PurchasePage: RestaurantPurchasePage } = require('../pages/restaurant/purchase/PurchasePage');
const { DirectGRN: RestaurantDirectGRN } = require('../pages/restaurant/purchase/GRNPage');
const TENANTS = require('../config/tenants');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function optionalAtText(value) {
  return new RegExp(`^@?${escapeRegExp(value)}$`, 'i');
}

async function loginAndSaveState(page, isRestaurant, authPath) {
  const appEnv = process.env.APP_ENV || 'upcoming';
  const tenant = isRestaurant ? TENANTS.restaurant[appEnv] : TENANTS.grocery[appEnv];

  if (!tenant) {
    throw new Error(`Unknown tenant for environment: ${appEnv}`);
  }

  await page.goto('/');
  await page.getByPlaceholder('Mobile number').fill(process.env.MOBILE_NUMBER || '8531821606');
  await page.getByRole('button', { name: 'Pin Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter Pin' }).fill(process.env.LOGIN_PIN || '1111');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Retail OS Retail OS A retail' }).click();
  await page.getByRole('button', { name: new RegExp(escapeRegExp(tenant.org), 'i') }).click();
  await page.getByText(optionalAtText(tenant.location)).click();

  await page.waitForURL('**/dashboards/**');
}


exports.test = base.test.extend({
  // Navigate to dashboard once for each test
  page: async ({ page }, use, testInfo) => {
    const isRestaurant = testInfo.project.name.includes('restaurant');
    const authPath = isRestaurant ? 'auth/restaurant.auth.json' : 'auth/grocery.auth.json';

    await page.goto('/dashboards/RETAIL');

    // Wait for network requests to settle and any redirects/modals to render
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    if (
      page.url().endsWith('/') || 
      page.url().includes('/login') || 
      await page.getByPlaceholder('Mobile number').isVisible() || 
      await page.getByText('Unauthorized Access').isVisible() ||
      await page.getByText('Reason:').isVisible()
    ) {
      console.log(`\n⚠️ Session invalid or overwritten for project [${testInfo.project.name}]. Performing auto-login...`);
      await loginAndSaveState(page, isRestaurant, authPath);
      await page.context().storageState({ path: authPath });
      await page.goto('/dashboards/RETAIL');
    }

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

  purchasePage: async ({ page }, use, testInfo) => {
    const isRestaurant = testInfo.project.name.includes('restaurant');
    const purchasePage = isRestaurant ? new RestaurantPurchasePage(page) : new PurchasePage(page);
    await use(purchasePage);
  },

  directGRN: async ({ page }, use, testInfo) => {
    const isRestaurant = testInfo.project.name.includes('restaurant');
    const directGRN = isRestaurant ? new RestaurantDirectGRN(page) : new DirectGRN(page);
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
