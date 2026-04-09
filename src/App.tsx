import React from 'react';
import Box from '@mui/material/Box';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';
import {
  AGE_CATEGORIES,
  AGE_TO_MAX_EMPLOYEE_CONTRIBUTION,
  DEFAULT_COMPANY_CONTRIBUTION_PERCENTAGE,
  DEFAULT_INCOME,
  DEFAULT_RETIREMENT_CONTRIBUTION,
  NUM_PAYCHECKS,
} from './utils/constants';
import { roundToNearestCent, calculatePercentOfIncome } from './utils/monetaryCalculations';
import { useLocalStorageState, setLocalStorage } from './utils/localStorage';
import styles from './styles/App';

const App = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // CLEAR LEGACY LOCAL STORAGE                                                                                       //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  setLocalStorage('local_storage_max_contribution', null);
  setLocalStorage('local_storage_max_contribution_2025', null);
  setLocalStorage('local_storage_contribution_percentage', null);
  setLocalStorage('local_storage_income', null);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - AGE & MAX CONTRIBUTION                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [ageCategory, setAgeCategory] = useLocalStorageState(
    'local_storage_age_category_2025', // also used in 2026
    AGE_CATEGORIES.UNDER_50
  );

  const onChangeMaxEmployeeContribution = (event: React.SyntheticEvent): void => {
    const newAgeCategory = (event.target as HTMLInputElement).value;
    // @ts-ignore
    setAgeCategory(newAgeCategory);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - COMPANY CONTRIBUTION PERCENTAGE                                                                         //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [companyContributionPercentage, setCompanyContributionPercentage] = useLocalStorageState(
    'local_storage_company_contribution_percentage',
    DEFAULT_COMPANY_CONTRIBUTION_PERCENTAGE
  );

  const onChangeCompanyContributionPercentage = (event: React.SyntheticEvent, val: number): void => {
    const newValue = val === null ? 0 : val;
    setCompanyContributionPercentage(newValue);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - INCOME                                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const initialIncomeArray = Array(NUM_PAYCHECKS).fill(DEFAULT_INCOME);
  const [income, setIncome] = useLocalStorageState('local_storage_employee_income', initialIncomeArray);

  const onChangeIncome = (idx: number, value: number): void => {
    const newValue = value === null ? 0 : value;
    const newIncome = Object.assign([...income], { [idx]: newValue });
    setIncome(newIncome);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - MAX COMPANY CONTRIBUTION                                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [maxCompanyContribution, setMaxCompanyContribution] = React.useState(
    calculatePercentOfIncome(income, companyContributionPercentage / 100)
  );

  React.useEffect(() => {
    setMaxCompanyContribution(calculatePercentOfIncome(income, companyContributionPercentage / 100));
  }, [income, companyContributionPercentage]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - CONTRIBUTION PERCENTAGES                                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const initialContributionPercentage = Array(NUM_PAYCHECKS).fill(DEFAULT_RETIREMENT_CONTRIBUTION);
  const [contributionPercentage, setContributionPercentage] = useLocalStorageState(
    'local_storage_employee_contribution_percentage',
    initialContributionPercentage
  );

  const onChangeContributionPercentage = (idx: number, value: number): void => {
    const newValue = value === null ? 0 : value;
    const newContributionPercentage = Object.assign([...contributionPercentage], { [idx]: newValue });
    setContributionPercentage(newContributionPercentage);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DATA - CHART DATA                                                                                                //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [employeeSeries, setEmployeeSeries] = React.useState([]);
  const [companySeries, setCompanySeries] = React.useState([]);
  const [cumulativeEmployeeContribution, setCumulativeEmployeeContribution] = React.useState(0);
  const [cumulativeCompanyContribution, setCumulativeCompanyContribution] = React.useState(0);

  React.useEffect(() => {
    let newCumulativeEmployeeContribution = 0;
    let newCumulativeCompanyContribution = 0;

    const newEmployeeSeries = [];
    const newCompanySeries = [];
    for (let i = 0; i < NUM_PAYCHECKS; i++) {
      // Employee contribution
      let employeeContribution = roundToNearestCent((income[i] * contributionPercentage[i]) / 100.0);
      if (newCumulativeEmployeeContribution + employeeContribution > AGE_TO_MAX_EMPLOYEE_CONTRIBUTION[ageCategory]) {
        const overage =
          newCumulativeEmployeeContribution + employeeContribution - AGE_TO_MAX_EMPLOYEE_CONTRIBUTION[ageCategory];
        employeeContribution -= overage;
        // Account for rounding errors
        if (Math.abs(employeeContribution) < 0.0000000001) {
          employeeContribution = 0;
        }
      }

      // Company contribution
      const possibleCompanyContribution = roundToNearestCent(income[i] * (companyContributionPercentage / 100));
      const companyContribution = Math.min(possibleCompanyContribution, employeeContribution);

      // Update cumulative contributions
      newCumulativeEmployeeContribution += employeeContribution;
      newCumulativeCompanyContribution += companyContribution;

      // Series
      newEmployeeSeries.push(employeeContribution);
      newCompanySeries.push(companyContribution);
    }

    // State setters
    // @ts-ignore
    setEmployeeSeries(newEmployeeSeries);
    // @ts-ignore
    setCompanySeries(newCompanySeries);
    setCumulativeEmployeeContribution(newCumulativeEmployeeContribution);
    setCumulativeCompanyContribution(newCumulativeCompanyContribution);
  }, [ageCategory, income, contributionPercentage, companyContributionPercentage]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RETURN                                                                                                           //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Box sx={styles.box}>
      <SidePanel
        companyContributionPercentage={companyContributionPercentage}
        onChangeCompanyContributionPercentage={onChangeCompanyContributionPercentage}
        ageCategory={ageCategory}
        onChangeMaxEmployeeContribution={onChangeMaxEmployeeContribution}
      />
      <MainPanel
        cumulativeEmployeeContribution={cumulativeEmployeeContribution}
        ageCategory={ageCategory}
        cumulativeCompanyContribution={cumulativeCompanyContribution}
        maxCompanyContribution={maxCompanyContribution}
        employeeSeries={employeeSeries}
        companySeries={companySeries}
        income={income}
        onChangeIncome={onChangeIncome}
        contributionPercentage={contributionPercentage}
        onChangeContributionPercentage={onChangeContributionPercentage}
        companyContributionPercentage={companyContributionPercentage}
      />
    </Box>
  );
};

export default App;
