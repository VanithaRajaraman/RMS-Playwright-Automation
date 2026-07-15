const { test } = require('../../../fixtures/baseTest');

test('create designation under workforce master', async ({ designationCreationPage }) => {
  await designationCreationPage.createDesignation();
});
