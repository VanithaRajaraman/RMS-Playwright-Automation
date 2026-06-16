# RMS Playwright Automation

A Playwright-based test automation framework for verifying ERP workflows such as products, purchase, sales, and inventory across different verticals (Grocery and Restaurant) and environments (Stage, Upcoming, Prod).

## 🚀 Key Features

- **Page Object Model (POM)**: Clear separation of UI interactions (under `pages/`) from test assertions.
- **Session Sharing**: Authentication states are saved (`auth/grocery.auth.json`, `auth/restaurant.auth.json`) during the setup phase and reused across test specs to avoid redundant logins.
- **Multi-Environment Support**: Seamless execution on `stage`, `upcoming`, and `prod` environments using environment variables.
- **Custom Fixtures**: An extended Playwright test fixture (`fixtures/baseTest.js`) that automatically navigates to dashboards and injects instantiated page objects.
- **CI/CD Integrated**: Configured to run automatically in GitHub Actions on a schedule and on code push/pull requests.

---

## 📂 Project Structure

```text
├── .github/workflows/
│   └── playwright.yml         # CI/CD GitHub action workflow
├── .env.prod                  # Environment configuration for production
├── .env.stage                 # Environment configuration for staging
├── .env.upcoming              # Environment configuration for upcoming environment
├── .gitignore                 # Files and folders to ignore in Git
├── auth/                      # Saved storage states/sessions (gitignored)
│   ├── grocery.auth.json      # Stored credentials for grocery tests
│   └── restaurant.auth.json   # Stored credentials for restaurant tests
├── config/
│   ├── tenants.js             # Tenant definitions (org & locations per environment)
│   └── testData.js            # Environment-specific test data helper
├── fixtures/
│   └── baseTest.js            # Custom Playwright test fixture extending base test
├── pages/                     # Page Object Classes (POM)
│   ├── grocery/
│   │   ├── products/          # Pages for brand, department, online category, product creation
│   │   ├── purchase/          # Pages for purchase indent and direct GRN
│   │   └── sales/             # Pages for sales order, return, customer
│   └── restaurant/
│       ├── products/          # Pages for category, prep station, product creation
│       ├── purchase/          # Pages for GRN, purchase
│       └── sales/             # Pages for takeaway, dine-in, customer, return
├── tests/                     # Test Specifications
│   ├── auth/                  # Auth setup specs (login & session saving)
│   │   ├── grocery.auth.setup.spec.js
│   │   └── restaurant.auth.setup.spec.js
│   ├── grocery/               # Grocery workflow specs
│   └── restaurant/            # Restaurant workflow specs
├── playwright.config.js       # Playwright execution and project configurations
└── package.json               # Scripts, project metadata, and dependencies
```


---

## ⚙️ Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or 20 is recommended).

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install chromium
```

---

## 🔧 Environment Configurations

The execution uses the following environment variables:
- `BASE_URL`: Target application URL (e.g. `https://stage.palletnow.co`)
- `APP_ENV`: Deployment stage (e.g., `upcoming`, `stage`, `prod`)
- `MOBILE_NUMBER`: User login credential mobile number (defaults to predefined testing numbers)
- `LOGIN_PIN`: User pin (defaults to `1111`)

These are configured in `.env.stage`, `.env.upcoming`, and `.env.prod`.

---

## 🧪 Running Tests

A set of custom run scripts is configured in `package.json` for targeted execution.

### Grocery Tests

Run grocery suite in **Upcoming**:
```bash
npm run grocery:upcoming
```

Run grocery suite in **Stage**:
```bash
npm run grocery:stage
```

Run grocery suite in **Production**:
```bash
npm run grocery:prod
```

### Restaurant Tests

Run restaurant suite in **Upcoming**:
```bash
npm run restaurant:upcoming
```

Run restaurant suite in **Stage**:
```bash
npm run restaurant:stage
```

Run restaurant suite in **Production**:
```bash
npm run restaurant:prod
```

### Running All Tests

Run all tests in **Upcoming** / **Stage** / **Prod**:
```bash
npm run all:upcoming
npm run all:stage
npm run all:prod
```

### Running Individual Test Files

To run a specific test file, specify the test file path in the command. You should also specify the relevant environment variables (`BASE_URL` and `APP_ENV`) and the appropriate Playwright projects to ensure proper authentication states are loaded.

For example, to run tests in the **upcoming** environment:

#### 🛒 Grocery Single Test Examples:
- **Brand**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/products/brand.spec.js --project=grocery-setup --project=grocery
  ```
- **Department**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/products/department.spec.js --project=grocery-setup --project=grocery
  ```
- **Online Category**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/products/onlinecategory.spec.js --project=grocery-setup --project=grocery
  ```
- **Product Creation**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/products/productcreation.spec.js --project=grocery-setup --project=grocery
  ```
- **Direct GRN**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/purchase/directgrn.spec.js --project=grocery-setup --project=grocery
  ```
- **Purchase Indent**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/purchase/purchaseindent.spec.js --project=grocery-setup --project=grocery
  ```
- **Customer Creation**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/sales/customercreation.spec.js --project=grocery-setup --project=grocery
  ```
- **Sales Order**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/sales/salesorder.spec.js --project=grocery-setup --project=grocery
  ```
- **Sales Return**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/grocery/sales/salesreturn.spec.js --project=grocery-setup --project=grocery
  ```

#### 🍔 Restaurant Single Test Examples:
- **Category**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/products/category.spec.js --project=restaurant-setup --project=restaurant
  ```
- **Prep Station**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/products/prepstation.spec.js --project=restaurant-setup --project=restaurant
  ```
- **Product Creation**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/products/productcreation.spec.js --project=restaurant-setup --project=restaurant
  ```
- **GRN**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/purchase/grn.spec.js --project=restaurant-setup --project=restaurant
  ```
- **Purchase**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/purchase/purchase.spec.js --project=restaurant-setup --project=restaurant
  ```
- **Customer**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/sales/customer.spec.js --project=restaurant-setup --project=restaurant
  ```
- **Dine In**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/sales/dinein.spec.js --project=restaurant-setup --project=restaurant
  ```
- **Sales Return**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/sales/salesreturn.spec.js --project=restaurant-setup --project=restaurant
  ```
- **Takeaway**:
  ```bash
  cross-env BASE_URL=https://upcoming-stage.palletnow.co APP_ENV=upcoming npx playwright test tests/restaurant/sales/takeaway.spec.js --project=restaurant-setup --project=restaurant
  ```


## 🕹️ Codegen & Headed Mode Commands

### Code Generator (Codegen)
```bash
npx playwright codegen https://stage.palletnow.co/
```

### Headed Mode Commands
```bash
# Grocery (Stage Environment)
npm run grocery:stage -- grocery/products/productcreation.spec.js -- --headed
npm run grocery:stage -- grocery/products/productcreation.spec.js -- --headed --project=grocery --no-deps
npm run grocery:stage -- grocery/products/brand.spec.js -- --headed --project=grocery --no-deps
npm run grocery:stage -- grocery/products/department.spec.js -- --headed --project=grocery --no-deps
npm run grocery:stage -- grocery/products/onlinecategory.spec.js -- --headed --project=grocery --no-deps
npm run grocery:stage -- grocery/purchase/directgrn.spec.js -- --headed --project=grocery --no-deps
npm run grocery:stage -- grocery/purchase/purchaseindent.spec.js -- --headed --project=grocery --no-deps
npm run grocery:stage -- grocery/sales/customercreation.spec.js -- --headed --project=grocery --no-deps
npm run grocery:stage -- grocery/sales/ -- --headed --project=grocery --no-deps

# Grocery (Upcoming Environment)
npm run grocery:upcoming -- grocery/products/productcreation.spec.js -- --headed
npm run grocery:upcoming -- grocery/products/productcreation.spec.js -- --headed --project=grocery --no-deps

# Grocery (Prod Environment)
npm run grocery:prod -- grocery/products/productcreation.spec.js -- --headed
npm run grocery:prod -- grocery/products/productcreation.spec.js -- --headed --project=grocery --no-deps

# Restaurant (Stage Environment)
npm run restaurant:stage -- restaurant/products/category.spec.js -- --headed --project=restaurant --no-deps
npm run restaurant:stage -- restaurant/products/prepstation.spec.js -- --headed --project=restaurant --no-deps
npm run restaurant:stage -- restaurant/products/productcreation.spec.js -- --headed --project=restaurant --no-deps
npm run restaurant:stage -- restaurant/purchase/grn.spec.js -- --headed --project=restaurant --no-deps
npm run restaurant:stage -- restaurant/purchase/purchase.spec.js -- --headed --project=restaurant --no-deps

# Full Suites in Headed Mode
npx cross-env BASE_URL=https://stage.palletnow.co APP_ENV=stage playwright test --project=grocery --headed
npx cross-env BASE_URL=https://stage.palletnow.co APP_ENV=stage playwright test --project=restaurant --headed
npx cross-env BASE_URL=https://stage.palletnow.co APP_ENV=stage npx playwright test --headed
```

---

### View Reports

To view the latest HTML report generated by Playwright:
```bash
npm run report
```



---

## 📈 GitHub Actions CI

The test suite runs automatically via GitHub Actions:
- On every **push** or **pull request** targeting `main` or `master` branches.
- Daily on a schedule (at **11:00 AM IST** / **3:30 AM UTC**).
- Can also be triggered manually using `workflow_dispatch`.

---

## 🛠️ Git Workflow

To save and push your updates to the remote repository:

```bash
git add .
git commit -m "updates"
git push -u origin main
```
