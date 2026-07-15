const { test } = require('../../../fixtures/baseTest');

test('create shift template under workforce master', async ({ shiftMasterPage }) => {
  await shiftMasterPage.createShiftTemplate();
});
