const { test } = require('../../../fixtures/baseTest');

test('create restaurant employee under workforce', async ({ employeeCreationPage }) => {
  await employeeCreationPage.createEmployee();
});
