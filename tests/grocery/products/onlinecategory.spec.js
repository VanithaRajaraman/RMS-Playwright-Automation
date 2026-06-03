const { test } = require('../../../fixtures/baseTest');
const { OnlineCategoryPage } = require('../../../pages/grocery/products/OnlineCategoryPage');

test('create online category levels', async ({ page }) => {
  const onlineCategoryPage = new OnlineCategoryPage(page);

  await onlineCategoryPage.openOnlineCategory();
  await onlineCategoryPage.createOnlineCategory();
});
