export const AGE_CATEGORIES = Object.freeze({
  UNDER_50: 'UNDER_50',
  BETWEEN_50_AND_59: 'BETWEEN_50_AND_59',
  BETWEEN_60_AND_63: 'BETWEEN_60_AND_63',
  OVER_63: 'OVER_63',
});

export const AGE_TO_MAX_EMPLOYEE_CONTRIBUTION = {
  [AGE_CATEGORIES.UNDER_50]: 24500,
  [AGE_CATEGORIES.BETWEEN_50_AND_59]: 32500,
  [AGE_CATEGORIES.BETWEEN_60_AND_63]: 35750,
  [AGE_CATEGORIES.OVER_63]: 32500,
};

export const COMBINED_MAX_CONTRIBUTION = 72000;

export const DEFAULT_COMPANY_CONTRIBUTION_PERCENTAGE = 2;
export const DEFAULT_INCOME = 7000;
export const DEFAULT_STI = 15000;
export const DEFAULT_RETIREMENT_CONTRIBUTION = 12;

const STI_STRING = 'STI';
export const PAYCHECKS = [
  'Jan #1',
  'Jan #2',
  'Feb #1',
  'Feb #2',
  STI_STRING,
  'Mar #1',
  'Mar #2',
  'Apr #1',
  'Apr #2',
  'May #1',
  'May #2',
  'Jun #1',
  'Jun #2',
  'Jul #1',
  'Jul #2',
  'Aug #1',
  'Aug #2',
  'Sept #1',
  'Sept #2',
  'Oct #1',
  'Oct #2',
  'Nov #1',
  'Nov #2',
  'Dec #1',
  'Dec #2',
];
export const STI_INDEX = PAYCHECKS.indexOf(STI_STRING);
export const NUM_PAYCHECKS = PAYCHECKS.length;
