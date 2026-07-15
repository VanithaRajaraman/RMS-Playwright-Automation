const { test } = require('../../../fixtures/baseTest');

test('assign shift under weekly roster', async ({ shiftSchedulerPage }) => {
  await shiftSchedulerPage.assignShift();
});
