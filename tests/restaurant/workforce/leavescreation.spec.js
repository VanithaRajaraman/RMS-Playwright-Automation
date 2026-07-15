const { test } = require('../../../fixtures/baseTest');

test('create leaves under workforce master', async ({ leavesCreationPage }) => {
  await leavesCreationPage.createLeave();
});
