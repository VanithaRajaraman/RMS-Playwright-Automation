const groceryStageUpcoming = {
  product: {
    namePrefix: 'Aachi Special Masala',
    category: 'Pizza A Erode',
    subCategory: 'Pizza cat 2 erode',
    productType: 'Pizz cat 3 erode',
    manufacturer: 'Erode Manufacturers',
    brand: 'POS',
    taxRate: '5%',
    taxType: 'Inclusive',
    specification: '100',
    uom: 'gm',
    packaging: 'Pouch',
    mrp: '100',
    taxStatus: 'Taxable',
    salesChannels: ['App', 'B2B'],
    weighingQuantity: '1',
    weighingPrice: '200',
  },
  brand: {
    manufacturer: 'Erode Manufacturers',
    namePrefix: 'POS',
    subBrandPrefix: 'mpos',
  },
  purchase: {
    vendor: 'TEST VENDOR',
    buyerSearch: 'va',
    buyer: 'Automation Test',
    assignedUser: 'Automation Test',
    indentDate: '27',
    grnDate: '28',
    productSearch: 'mpos',
    indentProductOption: 'mPOS Product 1 - mPOS Product 1 100 gm',
    grnInvoiceAmount: '100',
    invoiceNumber: '1qw',
    quantity: '100',
    receivedQuantity: '10',
  },
  directGrn: {
    vendor: "Sam's Sweets",
    grnDate: '5',
    invoiceAmount: '100',
    buyerSearch: 'va',
    buyer: 'Automation Test',
    invoiceNumber: '1AB',
    productSearch: 'mpos',
    productOption: 'mPOS Product 1',
    quantity: '100',
    purchasePrice: '100',
    receivedQuantity: '10',
  },
  sales: {
    customerName: 'Test Name',
    productSearch: 'mpos',
    productName: 'mPOS Product 1',
    productOption: 'mPOS Product 1 - mPOS Product 1 - (100 gm)',
    quantity: '100',
    returnQuantity: '10',
  },
  customer: {
    customerType: 'Manufacturers',
    state: 'Andhra Pradesh',
    contactType: 'SUPPORT',
    countryState: 'Andaman and Nicobar Islands',
  },
  department: {
    namePrefix: 'PAT',
    desc: 'cc',
    subDepartmentNamePrefix: 'Test Sub',
    subDepartmentDesc: 'Test Subd',
  },
};

const groceryProd = {
  product: {
    namePrefix: 'Aachi Special Masala',
    category: 'Home Harmony',
    subCategory: 'Smart Living',
    productType: 'Heritage Suits',
    manufacturer: 'Krbl Limited',
    brand: 'Private',
    taxRate: '5%',
    taxType: 'Inclusive',
    specification: '100',
    uom: 'gm',
    packaging: 'Pouch',
    mrp: '100',
    taxStatus: 'Taxable',
    salesChannels: ['App', 'B2B'],
    weighingQuantity: '1',
    weighingPrice: '200',
  },
  department: {
    namePrefix: 'PAT',
    desc: 'cc',
    subDepartmentNamePrefix: 'Test Sub',
    subDepartmentDesc: 'Test Subd',
  },
  sales: {
    customerName: 'TEST CUSTOMER',
    productSearch: 'mpos',
    productName: 'mPOS Product 1',
    productOption: 'mPOS Product 1 - mPOS Product 1 - (100 gm)',
    quantity: '100',
    returnQuantity: '10',
  },
  customer: {
    customerType: 'Manufacturers',
    state: 'Andhra Pradesh',
    contactType: 'SUPPORT',
    countryState: 'Andaman and Nicobar Islands',
  },
};

const restaurantStageUpcoming = {
  product: {
    namePrefix: 'Pepper Biryani',
    category: 'Fish',
    subCategory: 'Meat',
    variantPrice: '2',
    taxStatus: 'Taxable',
  },
  category: {
    name: 'Meat Masala',
    description: 'Test',
    level2Name: 'Meat Spicy Masala',
    level2Description: 'Testa',
  },
  prepStation: {
    namePrefix: 'Prep Station',
    description: 'Test',
    shortCodePrefix: '12',
    totalOrderCapacity: '1000',
    closeStationPercentage: '10',
  },
  directGrn: {
    vendor: "Regression Vendor",
    grnDate: '5',
    invoiceAmount: '100',
    buyerSearch: 'va',
    buyer: 'Automation Test',
    invoiceNumber: '1AB',
    productSearch: 'Honey Jamun',
    productOption: 'Honey Jamun',
    quantity: '100',
    purchasePrice: '100',
    receivedQuantity: '10',
  },
  purchase: {
    vendor: 'Regression Vendor',
    buyerSearch: 'va',
    buyer: 'Automation Test',
    assignedUser: 'Automation Test',
    indentDate: '27',
    grnDate: '28',
    productSearch: 'Honey Jamun',
    indentProductOption: 'Honey Jamun - Honey Jamun 100 piece',
    grnInvoiceAmount: '100',
    invoiceNumber: '1qw',
    quantity: '100',
    receivedQuantity: '10',
  },
  employee: {
    firstNamePrefix: 'TestEmpFirst',
    lastName: 'TestEmpLast',
    gender: 'Male',
    dob: '1990-05-15',
    fatherName: 'Father Doe',
    motherName: 'Mother Doe',
    personalEmail: 'johndoe.personal@test.com',
    officialEmail: 'johndoe.official@test.com',
    officialPhoneNo: '9876543210',
    joiningDate: '2026-07-01',
    department: 'Support',
    designation: 'Associate',
    maritalStatus: 'Single',
    employmentType: 'Full Time',
    nationality: 'Indian',
    bloodGroup: 'O+',
    physicallyChallenged: 'No',
    reportingAuthority: 'None',
    isReportingManager: 'No',
    passportNumber: 'L1234567',
    employmentVisa: 'Visa123',
    visaExpiry: '2030-12-31',
    linkedin: 'https://linkedin.com/in/johndoe',
    ctc: '500000',
    currency: 'INR',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: '123456789012',
    uanNumber: '100020003000',
    esiNumber: '1234567890123456',
    emergencyPhone: '9876543211',
    emergencyContact: 'Jane Doe',
    emergencyRelation: 'Sister',
    permAddressLine1: '123 Main St',
    permAddressLine2: 'Apt 4B',
    permAddressState: 'Tamil Nadu',
    permAddressCity: 'Chennai',
    permAddressPincode: '600001',
    sameAsAbove: true,
    attendanceMapping: 'Automation Testing',
    isGeoMappingRequired: true,
    role: 'HRMS Employee',
    accountName: 'John Doe',
    bankName: 'Test Bank',
    accountNumber: '1234567890',
    ifscCode: 'TEST0001234',
    bankingType: 'Savings',
    vpa: 'johndoe@upi',
    institution: 'Test University',
    degree: 'Bachelor of Science',
    yearOfPassing: '2012',
    prevEmployer: 'Old Corp',
    prevStartDate: '2020-01-01',
    prevEndDate: '2025-12-31',
    bgVerification: 'Yes',
  },
  department: {
    namePrefix: 'AutoDept',
    codePrefix: 'AD',
    description: 'Automated Test Department'
  },
  designation: {
    jobTitlePrefix: 'AutoDesig',
    jobLevel: 'Associate',
    department: 'Support',
    jobSummary: 'Automated Job Role Summary'
  },
  leaves: {
    leaveNamePrefix: 'AutoLeave',
    shortNamePrefix: 'AL',
    isPaid: true
  },
  holiday: {
    leaveYear: '2026',
    holidayNamePrefix: 'AutoHoliday',
    date: '2026-12-25',
    isOptional: false
  },
  shiftMaster: {
    shiftNamePrefix: 'AutoShift',
    shiftCodePrefix: 'ASH',
    color: 'Blue'
  },
  shiftScheduler: {
    employeeName: 'Testempfirst',
  }
};

const restaurantProd = {
  product: {
    namePrefix: 'Spicy Biryani',
    category: 'Fish',
    subCategory: 'Meat',
    variantPrice: '2',
    taxStatus: 'Taxable',
  },
  category: {
    name: 'Meat Masala',
    description: 'Test',
    level2Name: 'Meat Spicy Masala',
    level2Description: 'Testa',
  },
  prepStation: {
    namePrefix: 'Prep Station',
    description: 'Test',
    shortCodePrefix: '12',
    totalOrderCapacity: '1000',
    closeStationPercentage: '10',
  },
  employee: {
    firstNamePrefix: 'TestEmpFirst',
    lastName: 'TestEmpLast',
    gender: 'Male',
    dob: '1990-05-15',
    fatherName: 'Father Doe',
    motherName: 'Mother Doe',
    personalEmail: 'johndoe.personal@test.com',
    officialEmail: 'johndoe.official@test.com',
    officialPhoneNo: '9876543210',
    joiningDate: '2026-07-01',
    department: 'Service',
    designation: 'Waiter',
    maritalStatus: 'Single',
    employmentType: 'Permanent',
    nationality: 'Indian',
    bloodGroup: 'O+',
    physicallyChallenged: 'No',
    reportingAuthority: 'None',
    isReportingManager: 'No',
    passportNumber: 'L1234567',
    employmentVisa: 'Visa123',
    visaExpiry: '2030-12-31',
    linkedin: 'https://linkedin.com/in/johndoe',
    ctc: '500000',
    currency: 'INR',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: '123456789012',
    uanNumber: '100020003000',
    esiNumber: '1234567890123456',
    emergencyPhone: '9876543211',
    emergencyContact: 'Jane Doe',
    emergencyRelation: 'Sister',
    permAddressLine1: '123 Main St',
    permAddressLine2: 'Apt 4B',
    permAddressState: 'Tamil Nadu',
    permAddressCity: 'Chennai',
    permAddressPincode: '600001',
    sameAsAbove: true,
    attendanceMapping: 'Automation Testing',
    isGeoMappingRequired: true,
    role: 'Staff',
    accountName: 'John Doe',
    bankName: 'Test Bank',
    accountNumber: '1234567890',
    ifscCode: 'TEST0001234',
    bankingType: 'Savings',
    vpa: 'johndoe@upi',
    institution: 'Test University',
    degree: 'Bachelor of Science',
    yearOfPassing: '2012',
    prevEmployer: 'Old Corp',
    prevStartDate: '2020-01-01',
    prevEndDate: '2025-12-31',
    bgVerification: 'Initiated',
  },
  department: {
    namePrefix: 'AutoDept',
    codePrefix: 'AD',
    description: 'Automated Test Department'
  },
  designation: {
    jobTitlePrefix: 'AutoDesig',
    jobLevel: 'Associate',
    department: 'Support',
    jobSummary: 'Automated Job Role Summary'
  },
  leaves: {
    leaveNamePrefix: 'AutoLeave',
    shortNamePrefix: 'AL',
    isPaid: true
  },
  holiday: {
    leaveYear: '2026',
    holidayNamePrefix: 'AutoHoliday',
    date: '2026-12-25',
    isOptional: false
  },
  shiftMaster: {
    shiftNamePrefix: 'AutoShift',
    shiftCodePrefix: 'ASH',
    color: 'Blue'
  },
  shiftScheduler: {
    employeeName: 'Testempfirst',
  }
};

const TEST_DATA = {
  grocery: {
    stage: groceryStageUpcoming,
    upcoming: groceryStageUpcoming,
    prod: groceryProd,
  },
  restaurant: {
    stage: restaurantStageUpcoming,
    upcoming: restaurantStageUpcoming,
    prod: restaurantProd,
  },
};

function getTestData(businessType, appEnv = process.env.APP_ENV || 'upcoming') {
  const businessData = TEST_DATA[businessType];

  if (!businessData) {
    throw new Error(`Unknown business type: ${businessType}`);
  }

  const envData = businessData[appEnv];

  if (!envData) {
    throw new Error(`Unknown ${businessType} APP_ENV: ${appEnv}`);
  }

  return envData;
}

module.exports = {
  TEST_DATA,
  getTestData,
};
