const { getTestData } = require('../../../config/testData');

class CategoryPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').category;
  }

  async createCategory() {
    const uniqueId = Date.now().toString().slice(-6);
    const categoryName = `${this.data.name} ${uniqueId}`;
    const level2Name = `${this.data.level2Name} ${uniqueId}`;

    await this.page.getByTitle('Products').locator('svg').click();
    await this.page.getByText('Masters').click();
    await this.page.getByRole('button', { name: 'Online Category' }).click({ force: true });
    
    // Wait for page network requests to settle
    await this.page.waitForLoadState('networkidle').catch(() => {});

    await this.page.getByRole('button', { name: '+ New' }).first().click({ force: true });
    await this.page.getByRole('textbox', { name: 'Enter category name...' }).fill(categoryName);
    await this.page.getByRole('textbox', { name: 'Enter Department desc...' }).fill(this.data.description);
    await this.page.getByRole('button', { name: 'Save' }).click({ force: true });

    // Dismiss SweetAlert confirmation for Level 1 category creation if it appears
    await this.page.locator('.swal2-confirm').click({ timeout: 3000 }).catch(() => { });

    // Verify the Level 1 category is created and appears in the list
    await this.page.getByText(categoryName, { exact: true }).waitFor();

    await this.page.getByRole('button', { name: '+ New' }).nth(1).click();
    
    // Reload page to refresh the category options in the dropdown list
    await this.page.reload({ waitUntil: 'load' });

    // Select the main category using search combobox within the select category container
    const mainCategoryDropdown = this.page.locator('.select-box-category').getByRole('combobox');
    await mainCategoryDropdown.click();
    await mainCategoryDropdown.fill(categoryName);
    await this.page.getByText(categoryName, { exact: true }).click();

    await this.page.getByRole('textbox', { name: 'Enter Level 2 name...' }).fill(level2Name);
    await this.page.getByRole('textbox', { name: 'Enter Level 2 description...' }).fill(this.data.level2Description);
    await this.page.getByRole('button', { name: 'Save' }).click({ force: true });

    // Dismiss SweetAlert confirmation for Level 2 category creation if it appears
    await this.page.locator('.swal2-confirm').click({ timeout: 3000 }).catch(() => { });

    // Verify the Level 2 category is created and appears in the list
    await this.page.getByText(level2Name, { exact: true }).waitFor();

    return { categoryName, level2Name };
  }
}

module.exports = { CategoryPage };
