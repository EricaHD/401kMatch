export const roundToNearestCent = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export const currencyWithoutCentsFormatter = (value: number) => {
  const currencyString = currencyFormatter(value);
  return currencyString.substring(0, currencyString.length - 3); // remove '.00'
};

export const calculatePercentOfIncome = (incomeArray: number[], percentage: number): number => {
  // Round per paycheck (instead of once at the end of the calculation)
  return incomeArray.reduce((accumulator, income) => accumulator + roundToNearestCent(income * percentage), 0);
};
