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
  '#1',
  '#2',
  '#3',
  '#4',
  '#5',
  '#6',
  '#7',
  '#8',
  '#9',
  '#10',
  '#11',
  '#12',
  '#13',
  '#14',
  '#15',
  '#16',
  '#17',
  '#18',
  '#19',
  '#20',
  '#21',
  '#22',
  '#23',
  '#24',
];
export const NUM_PAYCHECKS = PAYCHECKS.length;
