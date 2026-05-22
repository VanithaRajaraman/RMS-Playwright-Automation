const { test } = require('../../fixtures/baseTest');

test('create and approve purchase indent with GRN', async ({ purchasePage }) => {
  // Navigate to dashboard (auth.json handles login automatically)
  //await purchasePage.navigate();

  // Step 1: Open Purchase Indent
  await purchasePage.openPurchaseIndent();

  // Step 2: Create Indent
  await purchasePage.createIndent();

  // Step 3: Approve Indent
  await purchasePage.approveIndent();

  // Step 4: Convert to PO
  await purchasePage.convertToPO();

  // Step 5: Create GRN
  await purchasePage.createGRN();

  // Step 6: Approve GRN
  await purchasePage.approveGRN();
}); 