const groceryStageUpcoming = {
  product: {
    namePrefix: 'Aachi Special Masala',
    category: 'Pizza A Erode',
    subCategory: 'Pizza cat 2 erode',
    productType: 'Pizz cat 3 erode',
    manufacturer: 'Pro Nature Organic Foods Pvt.Ltd.',
    brand: 'Coca-Cola',
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
    buyer: 'Vanitha R',
    assignedUser: 'Vanitha R',
    indentDate: '27',
    grnDate: '28',
    productSearch: 'mpos',
    indentProductOption: 'mPOS Product 1 - mPOS Product 1 - 100 Grams 100 Grams',
    grnInvoiceAmount: '139',
    invoiceNumber: '1qw',
    quantity: '100',
    receivedQuantity: '10',
  },
  directGrn: {
    vendor: "Sam's Sweets",
    grnDate: '5',
    invoiceAmount: '118',
    buyerSearch: 'va',
    buyer: 'Vanitha R',
    invoiceNumber: '1AB',
    productSearch: 'mpos',
    productOption: 'mPOS Product 1 - 100 Grams',
    quantity: '100',
    purchasePrice: '100',
    receivedQuantity: '10',
  },
  sales: {
    customerName: 'TEST CUSTOMER',
    productSearch: 'mpos',
    productName: 'mPOS Product 1',
    productOption: 'mPOS Product 1 - mPOS Product 1 - 100 Grams - (100 Grams)',
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
};

const restaurantStageUpcoming = {
  product: {
    namePrefix: 'Pepper Biryani',
    category: 'Meat Masala',
    subCategory: 'Meat Spicy Masala',
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
};

const restaurantProd = {
  product: {
    namePrefix: 'Pepper Biryani',
    category: 'Meat Masala',
    subCategory: 'Meat Spicy Masala',
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
