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

export const DEFAULT_COMPANY_CONTRIBUTION_PERCENTAGE = 6;
export const DEFAULT_INCOME = 6250;
export const DEFAULT_RETIREMENT_CONTRIBUTION = 15;

export const PAYCHECKS = [
  'Jan #1',
  'Jan #2',
  'Feb #1',
  'Feb #2',
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
export const NUM_PAYCHECKS = PAYCHECKS.length;
