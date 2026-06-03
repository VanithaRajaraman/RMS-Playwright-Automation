const { test } = require('../../../fixtures/baseTest');

test('create department and sub-department', async ({ departmentCreationPage }) => {
  await departmentCreationPage.openDepartmentMaster();
  await departmentCreationPage.createDepartmentAndSubDepartment();
});
