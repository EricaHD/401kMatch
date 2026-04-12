import React from 'react';
import Box from '@mui/material/Box';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';
import { NumberFieldChangeEvent } from './helperComponents/NumberInput';
import {
  AGE_CATEGORIES,
  AGE_TO_MAX_EMPLOYEE_CONTRIBUTION,
  DEFAULT_COMPANY_CONTRIBUTION_PERCENTAGE,
  DEFAULT_INCOME,
  DEFAULT_RETIREMENT_CONTRIBUTION,
  DEFAULT_NUM_PAYCHECKS,
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
  setLocalStorage('local_storage_age_category_2025', null); // also used in 2026
  setLocalStorage('local_storage_company_contribution_percentage', null);
  setLocalStorage('local_storage_num_paychecks', null);
  setLocalStorage('local_storage_employee_income', null);
  setLocalStorage('local_storage_employee_contribution_percentage', null);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - AGE & MAX CONTRIBUTION                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [ageCategory, setAgeCategory] = useLocalStorageState('ls_age', AGE_CATEGORIES.UNDER_50);

  const onChangeMaxEmployeeContribution = (event: React.SyntheticEvent): void => {
    const newAgeCategory = (event.target as HTMLInputElement).value;
    // @ts-ignore
    setAgeCategory(newAgeCategory);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - COMPANY CONTRIBUTION PERCENTAGE                                                                         //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [companyContributionPercentage, setCompanyContributionPercentage] = useLocalStorageState(
    'ls_company_contribution_percentage',
    DEFAULT_COMPANY_CONTRIBUTION_PERCENTAGE
  );

  const onChangeCompanyContributionPercentage = (val: number | null, event: NumberFieldChangeEvent): void => {
    const newValue = val === null ? 0 : val;
    setCompanyContributionPercentage(newValue);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - NUMBER OF PAYCHECKS                                                                                      //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [numPaychecks, setNumPaychecks] = useLocalStorageState('ls_num_paychecks', DEFAULT_NUM_PAYCHECKS);

  const onChangeNumPaychecks = (val: number | null, event: NumberFieldChangeEvent): void => {
    const newValue = val === null ? DEFAULT_NUM_PAYCHECKS : val;
    setNumPaychecks(newValue);
  };

  React.useEffect(() => {
    // Change income array
    if (income.length < numPaychecks) {
      const newIncome = [...income, ...Array(numPaychecks - income.length).fill(0)];
      setIncome(newIncome);
    } else if (income.length > numPaychecks) {
      setIncome(income.slice(0, numPaychecks));
    }
    // Change contribution percentage array
    if (contributionPercentage.length < numPaychecks) {
      const newContributionPercentage = [...contributionPercentage, ...Array(numPaychecks - contributionPercentage.length).fill(0)];
      setContributionPercentage(newContributionPercentage);
    } else if (contributionPercentage.length > numPaychecks) {
      setContributionPercentage(contributionPercentage.slice(0, numPaychecks));
    }
  }, [numPaychecks]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - INCOME                                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const initialIncomeArray = Array(numPaychecks).fill(DEFAULT_INCOME);
  const [income, setIncome] = useLocalStorageState('ls_employee_income', initialIncomeArray);

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

  const initialContributionPercentage = Array(numPaychecks).fill(DEFAULT_RETIREMENT_CONTRIBUTION);
  const [contributionPercentage, setContributionPercentage] = useLocalStorageState(
    'ls_employee_contribution_percentage',
    initialContributionPercentage
  );

  const onChangeContributionPercentage = (idx: number, value: number | null): void => {
    const newValue = value === null ? 0 : value;
    const newContributionPercentage = Object.assign([...contributionPercentage], { [idx]: newValue });
    setContributionPercentage(newContributionPercentage);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DATA - CHART DATA                                                                                                //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [employeeSeries, setEmployeeSeries] = React.useState([]);
  const [companySeries, setCompanySeries] = React.useState([]);
  const [cumulativeEmployeeContributions, setCumulativeEmployeeContributions] = React.useState([]);
  const [cumulativeCompanyContributions, setCumulativeCompanyContributions] = React.useState([]);

  React.useEffect(() => {
    let newCumulativeEmployeeContribution = 0;
    let newCumulativeCompanyContribution = 0;

    const newEmployeeSeries = [];
    const newCompanySeries = [];
    const newCumulativeEmployeeSeries = [];
    const newCumulativeCompanySeries = [];
    for (let i = 0; i < numPaychecks; i++) {
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
      newCumulativeEmployeeSeries.push(newCumulativeEmployeeContribution);
      newCumulativeCompanySeries.push(newCumulativeCompanyContribution);
    }

    // State setters
    // @ts-ignore
    setEmployeeSeries(newEmployeeSeries);
    // @ts-ignore
    setCompanySeries(newCompanySeries);
    // @ts-ignore
    setCumulativeEmployeeContributions(newCumulativeEmployeeSeries);
    // @ts-ignore
    setCumulativeCompanyContributions(newCumulativeCompanySeries);
  }, [ageCategory, income, contributionPercentage, companyContributionPercentage, numPaychecks]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RETURN                                                                                                           //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Box sx={styles.box}>
      <SidePanel
        numPaychecks={numPaychecks}
        onChangeNumPaychecks={onChangeNumPaychecks}
        companyContributionPercentage={companyContributionPercentage}
        onChangeCompanyContributionPercentage={onChangeCompanyContributionPercentage}
        ageCategory={ageCategory}
        onChangeMaxEmployeeContribution={onChangeMaxEmployeeContribution}
      />
      <MainPanel
        numPaychecks={numPaychecks}
        ageCategory={ageCategory}
        maxCompanyContribution={maxCompanyContribution}
        employeeSeries={employeeSeries}
        companySeries={companySeries}
        cumulativeEmployeeContributions={cumulativeEmployeeContributions}
        cumulativeCompanyContributions={cumulativeCompanyContributions}
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
