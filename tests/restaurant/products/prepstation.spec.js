const { test } = require('../../../fixtures/baseTest');
const { PrepStationPage } = require('../../../pages/restaurant/products/PrepStationPage');

test('create restaurant prep station', async ({ page }) => {
  const prepStationPage = new PrepStationPage(page);
  await prepStationPage.createPrepStation();
});
