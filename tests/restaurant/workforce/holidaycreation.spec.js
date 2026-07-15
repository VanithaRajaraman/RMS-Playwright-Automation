const { test } = require('../../../fixtures/baseTest');

test('create holiday under workforce master', async ({ holidayCreationPage }) => {
  await holidayCreationPage.createHoliday();
});
