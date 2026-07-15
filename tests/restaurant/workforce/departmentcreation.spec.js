const { test } = require('../../../fixtures/baseTest');

test('create department under workforce master', async ({ departmentCreationPage }) => {
  await departmentCreationPage.createDepartment();
});
