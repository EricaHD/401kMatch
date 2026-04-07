import React from 'react';
import Box from '@mui/material/Box';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';
import {
  AGE_CATEGORIES,
  AGE_TO_MAX_EMPLOYEE_CONTRIBUTION,
  DEFAULT_COMPANY_CONTRIBUTION_PERCENTAGE,
  DEFAULT_INCOME,
  DEFAULT_STI,
  DEFAULT_RETIREMENT_CONTRIBUTION,
  NUM_PAYCHECKS,
  STI_INDEX,
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
  initialIncomeArray[STI_INDEX] = DEFAULT_STI;
  const [income, setIncome] = useLocalStorageState('local_storage_income', initialIncomeArray);

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
    'local_storage_contribution_percentage',
    initialContributionPercentage
  );

  const onChangeContributionPercentage = (idx: number, value: number): void => {
    const newValue = value === null ? 0 : value;
    // Adjusting Mar #1 retirement contribution percentage should also adjust STI contribution percentage
    const newContributionPercentage =
      idx === STI_INDEX + 1
        ? Object.assign([...contributionPercentage], { [idx]: newValue }, { [STI_INDEX]: newValue })
        : Object.assign([...contributionPercentage], { [idx]: newValue });
    setContributionPercentage(newContributionPercentage);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // AUTOPOPULATE                                                                                                     //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const autopopulateIncome = (preMarchAnnualSalary: number, postMarchAnnualSalary: number, sti: number): void => {
    const newPreMarchAnnualSalary = preMarchAnnualSalary === null ? 0 : preMarchAnnualSalary;
    const newPostMarchAnnualSalary = postMarchAnnualSalary === null ? 0 : postMarchAnnualSalary;
    const newSti = sti === null ? 0 : sti;
    const newIncome = Array(NUM_PAYCHECKS).fill(0);
    for (let i = 0; i < newIncome.length; i++) {
      if (i < STI_INDEX) {
        newIncome[i] = roundToNearestCent(newPreMarchAnnualSalary / 24);
      }
      if (i === STI_INDEX) {
        newIncome[i] = newSti;
      }
      if (i > STI_INDEX) {
        newIncome[i] = roundToNearestCent(newPostMarchAnnualSalary / 24);
      }
    }
    setIncome(newIncome);
  };

  const autopopulateContributionPercentage = (retirementContribution: number): void => {
    const newRetirementContribution = retirementContribution === null ? 0 : retirementContribution;
    const newContributionPercentage = Array(NUM_PAYCHECKS).fill(newRetirementContribution);
    setContributionPercentage(newContributionPercentage);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DATA - CHART DATA                                                                                                //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [employeeSeries, setEmployeeSeries] = React.useState([]);
  const [companySeries, setCompanySeries] = React.useState([]);
  const [unusedMatchSeries, setUnusedMatchSeries] = React.useState([]);
  const [cumulativeEmployeeContribution, setCumulativeEmployeeContribution] = React.useState(0);
  const [cumulativeCompanyContribution, setCumulativeCompanyContribution] = React.useState(0);

  React.useEffect(() => {
    let newCumulativeEmployeeContribution = 0;
    let newCumulativeCompanyContribution = 0;

    const newEmployeeSeries = [];
    const newCompanySeries = [];
    const newUnusedMatchSeries = [];
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
      const unusedCompanyContribution = possibleCompanyContribution - companyContribution;

      // Update cumulative contributions
      newCumulativeEmployeeContribution += employeeContribution;
      newCumulativeCompanyContribution += companyContribution;

      // Series
      newEmployeeSeries.push(employeeContribution);
      newCompanySeries.push(companyContribution);
      newUnusedMatchSeries.push(unusedCompanyContribution);
    }

    // State setters
    // @ts-ignore
    setEmployeeSeries(newEmployeeSeries);
    // @ts-ignore
    setCompanySeries(newCompanySeries);
    // @ts-ignore
    setUnusedMatchSeries(newUnusedMatchSeries);
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
        unusedMatchSeries={unusedMatchSeries}
        income={income}
        onChangeIncome={onChangeIncome}
        contributionPercentage={contributionPercentage}
        onChangeContributionPercentage={onChangeContributionPercentage}
        companyContributionPercentage={companyContributionPercentage}
        autopopulateIncome={autopopulateIncome}
        autopopulateContributionPercentage={autopopulateContributionPercentage}
      />
    </Box>
  );
};

export default App;
