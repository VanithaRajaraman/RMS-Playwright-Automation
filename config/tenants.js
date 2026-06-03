const TENANTS = {
  grocery: {
    stage: { org: 'Twinleaves', location: 'Automation Testing' },
    upcoming: { org: 'Twinleaves', location: 'Automation Testing' },
    prod: { org: 'Twinleaves Testing', location: 'Twinleaves Testing Location - 1' },
  },
  restaurant: {
    stage: { org: 'Canteen', location: 'Automation Testing' },
    upcoming: { org: 'Canteen', location: 'Automation Testing' },
    prod: { org: 'canteen', location: 'CANTEEN _ TEST ' },
  },
};

module.exports = TENANTS;
