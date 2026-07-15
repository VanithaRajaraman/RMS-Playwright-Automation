const { getTestData } = require('../../../config/testData');
const TENANTS = require('../../../config/tenants');

class EmployeeCreationPage {
  constructor(page) {
    this.page = page;
    this.data = getTestData('restaurant').employee;
  }

  async selectFirstDropdownOption(selectorOrLocator) {
    const combobox = typeof selectorOrLocator === 'string' ? this.page.locator(selectorOrLocator) : selectorOrLocator;
    await combobox.click();
    await this.page.waitForTimeout(500); // Wait for list to render
    const menu = this.page.locator('.react-select__menu, [role="listbox"]').first();
    const option = menu.locator('[role="option"], .react-select__option, div[class*="-option"]').first();
    try {
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click({ force: true });
    } catch (e) {
      console.log(`⚠️ First option not visible. Falling back to keyboard selection...`);
      await this.page.keyboard.press('ArrowDown');
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('Enter');
    }
    await this.page.waitForTimeout(500); // Wait for value to settle
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  async selectDropdownOptionByValue(selectorOrLocator, value) {
    if (!value) return;
    const combobox = typeof selectorOrLocator === 'string' ? this.page.locator(selectorOrLocator) : selectorOrLocator;
    await combobox.click();
    try {
      await combobox.fill('');
      await combobox.fill(value);
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.log(`ℹ️ Selector is not editable/searchable. Proceeding to select option directly...`);
    }

    const menu = this.page.locator('.react-select__menu, [role="listbox"]').first();
    const optionExact = menu.getByText(value, { exact: true }).first();
    const optionFuzzy = menu.getByText(value, { exact: false }).first();

    let option = optionExact;
    try {
      await optionExact.waitFor({ state: 'visible', timeout: 3000 });
    } catch (e) {
      console.log(`ℹ️ Exact match for "${value}" not found in menu. Trying fuzzy match...`);
      option = optionFuzzy;
      try {
        await optionFuzzy.waitFor({ state: 'visible', timeout: 2000 });
      } catch (err) {
        console.log(`⚠️ Option "${value}" not visible in menu. Falling back to keyboard selection...`);
        await this.page.keyboard.press('ArrowDown');
        await this.page.waitForTimeout(300);
        await this.page.keyboard.press('Enter');
        
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);
        return;
      }
    }

    await option.click({ force: true });
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  async createEmployee() {
    const uniqueId = Date.now().toString().slice(-6);
    const digitToLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const uniqueLetters = uniqueId.split('').map(digit => digitToLetter[parseInt(digit)]).join('');

    const empId = `EMP${uniqueId}`;
    const firstNamePrefix = this.data.firstNamePrefix || 'TestEmpFirst';
    const firstName = `${firstNamePrefix}${uniqueLetters}`;
    const lastName = this.data.lastName || 'TestEmpLast';

    const getDynamicEmail = (email, suffix) => {
      if (!email) return `user${suffix}@test.com`;
      const [localPart, domain] = email.split('@');
      return `${localPart}${suffix}@${domain}`;
    };
    const personalEmail = getDynamicEmail(this.data.personalEmail, uniqueId);
    const officialEmail = getDynamicEmail(this.data.officialEmail, uniqueId);

    const officialPhoneNo = '9' + Math.floor(100000000 + Math.random() * 900000000).toString();
    const emergencyPhone = '8' + Math.floor(100000000 + Math.random() * 900000000).toString();
    const randomMobile = '9' + Math.floor(100000000 + Math.random() * 900000000).toString();

    // Helper functions for dynamic unique identity numbers
    const generatePAN = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const digits = '0123456789';
      let pan = '';
      for (let i = 0; i < 5; i++) pan += letters.charAt(Math.floor(Math.random() * letters.length));
      for (let i = 0; i < 4; i++) pan += digits.charAt(Math.floor(Math.random() * digits.length));
      pan += letters.charAt(Math.floor(Math.random() * letters.length));
      return pan;
    };

    const generateNumericString = (length, startDigit = '') => {
      let str = startDigit;
      const digits = '0123456789';
      const remainingLength = length - startDigit.length;
      for (let i = 0; i < remainingLength; i++) {
        str += digits.charAt(Math.floor(Math.random() * digits.length));
      }
      return str;
    };

    const generatePassport = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let passport = letters.charAt(Math.floor(Math.random() * letters.length));
      passport += generateNumericString(7);
      return passport;
    };

    const panNumber = generatePAN();
    const aadhaarNumber = generateNumericString(12, '3');
    const uanNumber = generateNumericString(12, '100');
    const esiNumber = generateNumericString(17);
    const passportNumber = generatePassport();

    const appEnv = process.env.APP_ENV || 'upcoming';
    const tenant = TENANTS.restaurant[appEnv];
    const locationName = tenant ? tenant.location : 'Automation Testing';

    // 1. Navigate to Pallet Workforce
    const workforceMenu = this.page.getByText('Pallet Workforce');
    if (!await workforceMenu.isVisible()) {
      // Toggle sidebar: try "Expand sidebar" button first, then revamp icon, then header button
      const expandBtn = this.page.getByRole('button', { name: 'Expand sidebar' });
      if (await expandBtn.isVisible()) {
        await expandBtn.click();
      } else {
        const revampIcon = this.page.locator('svg.revamp-sidebar__icon').first();
        if (await revampIcon.isVisible()) {
          await revampIcon.click();
        } else {
          const headerBtn = this.page.locator('header button').first();
          if (await headerBtn.isVisible()) {
            await headerBtn.click();
          }
        }
      }
      // Wait for expansion transition
      await this.page.waitForTimeout(1000);
    }
    await workforceMenu.click();
    await this.page.waitForTimeout(1000); // Wait for sub-menu expansion

    // Click on People or Employees sub-menu
    const peopleMenu = this.page.getByText('People');
    const employeesMenu = this.page.getByText('Employees');
    if (await employeesMenu.isVisible()) {
      await employeesMenu.click();
    } else if (await peopleMenu.isVisible()) {
      await peopleMenu.click();
    } else {
      await this.page.click('text=People');
    }

    // Handle "Add-on Required" dialog if it appears
    const activateBtn = this.page.getByRole('button', { name: 'Activate Add-on' });
    if (await activateBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await activateBtn.click();
      await this.page.waitForTimeout(3000); // Wait for activation to process
    }

    // Wait for the Employees list page and network requests to settle
    await this.page.waitForLoadState('networkidle').catch(() => { });

    // 2. Click Add Employee
    const addBtn = this.page.getByRole('button', { name: /Add Employee/i });
    if (await addBtn.isVisible()) {
      await addBtn.click();
    } else {
      await this.page.getByRole('button', { name: /\+ New/i }).first().click();
    }

    // Wait for the form to load
    await this.page.waitForLoadState('networkidle').catch(() => { });

    // 3. Fill the Form

    // --- Section 1: Basic Details ---
    // Location *
    await this.selectDropdownOptionByValue('input#locationId', locationName);

    // Employee ID *
    await this.page.locator('input#employeeDisplayId').fill(empId);

    // First Name *
    await this.page.locator('input#firstName').fill(firstName);

    // Last Name *
    await this.page.locator('input#lastName').fill(lastName);

    // Gender
    await this.selectDropdownOptionByValue('input#gender', this.data.gender);

    // Date of Birth
    await this.page.locator('div').filter({ hasText: 'Date Of Birth' }).locator('input[placeholder="Select the date"]').first().fill(this.data.dob);

    // Father's Name
    await this.page.locator('input#fatherName').fill(this.data.fatherName);

    // Mother's Name
    await this.page.locator('input#motherName').fill(this.data.motherName);

    // Personal Email
    await this.page.locator('input#personalEmail').fill(personalEmail);

    // Official Email
    await this.page.locator('input#officialEmail').fill(officialEmail);

    // Official Phone Number
    await this.page.locator('input#officialPhoneNo').fill(officialPhoneNo);

    // Date of Joining
    await this.page.locator('div').filter({ hasText: 'Date Of Joining' }).locator('input[placeholder="Select the date"]').first().fill(this.data.joiningDate);

    // Department *
    await this.selectDropdownOptionByValue('input#department', this.data.department);

    // Select Designation *
    await this.selectDropdownOptionByValue('input#designation', this.data.designation);

    // Marital Status
    await this.selectDropdownOptionByValue('input#maritalStatus', this.data.maritalStatus);

    // Employment Type *
    await this.selectDropdownOptionByValue('input#employmentType', this.data.employmentType);

    // Nationality
    await this.page.locator('input#nationality').fill(this.data.nationality);

    // Blood Group
    await this.selectDropdownOptionByValue('input#bloodGroup', this.data.bloodGroup);

    // Physically Challenged
    await this.selectDropdownOptionByValue('input#isPhysicallyChallenged', this.data.physicallyChallenged);

    // Reporting Authority
    await this.selectFirstDropdownOption('input#reportingAuthority');

    // Is Reporting Manager
    await this.selectDropdownOptionByValue('input#isReportingManager', this.data.isReportingManager);

    // Passport Number
    await this.page.locator('input#passportNumber').fill(passportNumber);

    // Employment Visa
    await this.page.locator('input#employmentVisa').fill(this.data.employmentVisa);

    // Visa Expiry
    await this.page.locator('div').filter({ hasText: 'Visa Expiry' }).locator('input[placeholder="Select the date"]').first().fill(this.data.visaExpiry);

    // LinkedIn
    await this.page.locator('input#linkedinUserName').fill(this.data.linkedin);


    // --- Section 2: Total Compensation ---
    // CTC *
    await this.page.locator('input#ctc').fill(this.data.ctc);

    // Currency
    await this.selectDropdownOptionByValue('input#currency', this.data.currency);


    // --- Section 3: Tax and Statutory Information ---
    // PAN Number
    await this.page.locator('input#panNumber').fill(panNumber);

    // Aadhaar Number
    await this.page.locator('input#adhaarNumber').fill(aadhaarNumber);

    // UAN Number
    await this.page.locator('input#uanNumber').fill(uanNumber);

    // ESIC Number
    await this.page.locator('input#esiNumber').fill(esiNumber);


    // --- Section 4: Emergency Details ---
    // Phone Number
    await this.page.locator('input#emergencyPhoneNumber').fill(emergencyPhone);

    // Contact Person
    await this.page.locator('input#emergencyContactName').fill(this.data.emergencyContact);

    // Relation
    await this.page.locator('input#emergencyContactRelation').fill(this.data.emergencyRelation);


    // --- Section 5: Address ---
    // Permanent Address Line 1
    await this.page.locator('div').filter({ hasText: /^Line 1$/ }).first().locator('input').fill(this.data.permAddressLine1);

    // Permanent Address Line 2
    await this.page.locator('div').filter({ hasText: /^Line 2$/ }).first().locator('input').fill(this.data.permAddressLine2);

    // Permanent Address State
    const stateInput = this.page.locator('xpath=//*[text()="State"]/..//input').first();
    await this.selectDropdownOptionByValue(stateInput, this.data.permAddressState);

    // Permanent Address City
    const cityInput = this.page.locator('xpath=//*[text()="City"]/..//input').first();
    await this.selectDropdownOptionByValue(cityInput, this.data.permAddressCity);

    // Permanent Address Pincode
    await this.page.locator('div').filter({ hasText: /^Pincode$/ }).first().locator('input').fill(this.data.permAddressPincode);

    // Same as Above checkbox
    if (this.data.sameAsAbove) {
      await this.page.getByText('Same as Above').first().click({ force: true });
    }


    // --- Section 6: Attendance Mapping & Access Control ---
    // Attendance Mapping
    await this.selectDropdownOptionByValue('input#attendanceMapping', this.data.attendanceMapping);

    // Is Geo Mapping Required
    if (this.data.isGeoMappingRequired) {
      await this.page.getByText('Is Geo Mapping Required').first().click({ force: true });
    }

    // Mobile Number (For Login OTP) *
    await this.page.locator('input#loginMobile').fill(randomMobile);

    // Role *
    await this.selectDropdownOptionByValue('input#userRole', this.data.role);


    // --- Section 7: Bank Details ---
    // Account Name
    await this.page.locator('input#accountName').fill(this.data.accountName);

    // Bank Name
    await this.page.locator('input#bankName').fill(this.data.bankName);

    // Account Number
    await this.page.locator('input#accountNumber').fill(this.data.accountNumber);

    // IFSC Code
    await this.page.locator('input#ifscCode').fill(this.data.ifscCode);

    // Banking Type
    await this.page.locator('input#bankingType').fill(this.data.bankingType);

    // VPA
    await this.page.locator('input#vpa').fill(this.data.vpa);


    // --- Section 8: Education Details ---
    // Institution
    await this.page.locator('input#institutionName').fill(this.data.institution);

    // Degree
    await this.page.locator('input#degree').fill(this.data.degree);

    // Year of Passing
    await this.page.locator('input#yearOfPassing').fill(this.data.yearOfPassing);


    // --- Section 9: Previous Employment Details ---
    // Employer
    await this.page.locator('input#employerName').fill(this.data.prevEmployer);

    // Start Date
    await this.page.locator('div').filter({ hasText: 'Start Date' }).locator('input[placeholder="Select the date"]').first().fill(this.data.prevStartDate);

    // End Date
    await this.page.locator('div').filter({ hasText: 'End Date' }).locator('input[placeholder="Select the date"]').first().fill(this.data.prevEndDate);

    // BG Verification
    await this.selectDropdownOptionByValue('input#bgVerification', this.data.bgVerification);


    // --- 4. Save ---
    await this.page.getByRole('button', { name: /Save|Submit/i }).click();

    // Wait for the popup/toast or validation to render
    await this.page.waitForTimeout(2000);

    // 1. Check SweetAlert Error Dialog
    const swalError = this.page.locator('.swal2-icon-error, .swal2-error');
    if (await swalError.isVisible()) {
      const errorTitle = await this.page.locator('#swal2-title, .swal2-title').textContent().catch(() => '');
      const errorText = await this.page.locator('#swal2-html-container, .swal2-html-container').textContent().catch(() => '');
      const fullError = `SweetAlert Error: ${errorTitle.trim()} - ${errorText.trim()}`;
      console.error(`❌ ${fullError}`);
      throw new Error(fullError);
    }

    // 2. Check Toastify Error
    const toastError = this.page.locator('.Toastify__toast--error, .toast-error, [class*="toast--error"]');
    if (await toastError.isVisible()) {
      const errorText = await toastError.textContent().catch(() => '');
      const fullError = `Toast Error: ${errorText.trim()}`;
      console.error(`❌ ${fullError}`);
      throw new Error(fullError);
    }

    // 3. Check for visible inline validation helper texts if still on add-employee page
    if (this.page.url().includes('/add-employee')) {
      const inlineErrors = this.page.locator('.invalid-feedback, .error-message, [class*="error-message"], .text-danger, [class*="invalid-helper"]');
      const count = await inlineErrors.count();
      const errors = [];
      for (let i = 0; i < count; i++) {
        const txt = await inlineErrors.nth(i).textContent().catch(() => '');
        if (txt && txt.trim() && !txt.includes('*') && txt.length < 100) {
          errors.push(txt.trim());
        }
      }
      if (errors.length > 0) {
        const fullError = `Form Validation Failed: ${errors.join(', ')}`;
        console.error(`❌ ${fullError}`);
        throw new Error(fullError);
      }
    }

    // Dismiss SweetAlert confirmation if it appears
    const confirmBtn = this.page.locator('.swal2-confirm');
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
    }

    // Wait a brief period for DB and page state synchronization
    await this.page.waitForTimeout(2000);

    return { empId, firstName, lastName, randomMobile };
  }
}

module.exports = { EmployeeCreationPage };
