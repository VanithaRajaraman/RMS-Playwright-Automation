class SalesOrder {
  constructor(page) {
    this.page = page;
  }

  async createSalesOrder() {
    const icon = this.page.locator('svg.revamp-sidebar__icon').nth(0);
    await icon.click();
    await this.page.getByText('Sales', { exact: true }).click();
    await this.page.getByText('Sales Orders').click();
    await this.page.getByRole('button', { name: 'Order' }).click();
    await this.page.locator('.css-8mmkcg > path').first().click();
    await this.page.getByText('Business customer', { exact: true }).click();

    const isMposAlreadyAdded = await this.page
      .waitForFunction(
        () => Array.from(document.querySelectorAll('input')).some((input) => input.value.includes('mPOS Product 1')),
        null,
        { timeout: 10000 }
      )
      .then(() => true)
      .catch(() => false);

    if (!isMposAlreadyAdded) {
      await this.page.locator('td:nth-child(3) > .product-input-label > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
      await this.page.locator('input.MuiAutocomplete-input').nth(1).fill('mpos');
      await this.page.getByRole('option', { name: 'mPOS Product 1 - mPOS Product 1 - 100 Grams - (100 Grams)' }).click();
      await this.page.getByRole('spinbutton').nth(4).click();
      await this.page.getByRole('spinbutton').nth(4).fill('100');
    }

    let isOrderSaved = false;
    for (let attempt = 0; attempt < 2 && !isOrderSaved; attempt += 1) {
      await this.page.getByRole('button', { name: 'Save' }).click();
      isOrderSaved = await this.page
        .waitForFunction(
          () =>
            window.location.pathname.includes('/order-placed/') ||
            document.body.innerText.includes('Go to your order') ||
            document.body.innerText.includes('Your Order is Completed'),
          null,
          { timeout: 10000 }
        )
        .then(() => true)
        .catch(() => false);
    }

    await this.page
      .getByText('Go to your order', { exact: true })
      .click({ timeout: 15000 })
      .catch(async () => {
        await this.page.getByText('Go to All Orders', { exact: true }).click({ timeout: 15000 });
      });
  }

  async completeSalesOrder() {
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'Payment' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator('.menu-icon-div > .MuiSvgIcon-root > path').click();
    await this.page.getByRole('menuitem', { name: 'Packaged' }).click();
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'In-transit' }).click();
    await this.page.locator('.menu-icon-div > .MuiSvgIcon-root > path').click();
    await this.page.getByRole('menuitem', { name: 'Delivered' }).click();
  }

  async downloadInvoice() {
    await this.page.getByTestId('MoreHorizRoundedIcon').nth(1).click();
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.locator('.MuiSvgIcon-root.MuiSvgIcon-colorSuccess.MuiSvgIcon-fontSize12px > path').first().click();
    return downloadPromise;
  }

  async createCompleteAndDownloadSalesOrder() {
    await this.createSalesOrder();
    await this.completeSalesOrder();
    await this.downloadInvoice();
  }
}

module.exports = { SalesOrder };
