import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Footer from './Footer';
import SidePanel from './SidePanel';
import CumulativeContributionInfo from './CumulativeContributionInfo';
import Chart from './Chart';
import SummaryTable from './SummaryTable';
import SectionTitle from './SectionTitle';
import AutopopulateIncome from './AutopopulateIncome';
import AutopopulateContributionPercentage from './AutopopulateContributionPercentage';
import {
  AGE_CATEGORIES,
  AGE_TO_MAX_EMPLOYEE_CONTRIBUTION,
  DEFAULT_COMPANY_CONTRIBUTION_PERCENTAGE,
  DEFAULT_INCOME,
  DEFAULT_STI,
  DEFAULT_RETIREMENT_CONTRIBUTION,
  NUM_PAYCHECKS,
  PAYCHECKS,
  STI_INDEX,
} from './utils/constants';
import { roundToNearestCent, calculatePercentOfIncome } from './utils/monetaryCalculations';
import { useLocalStorageState, setLocalStorage } from './utils/localStorage';
import styles from './styles/App';

const App = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - AGE & MAX CONTRIBUTION                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Clear legacy local storage keys that are no longer used
  setLocalStorage('local_storage_max_contribution', null);
  setLocalStorage('local_storage_max_contribution_2025', null);

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
  const [maxCompanyContribution, setMaxCompanyContribution] = React.useState(
    calculatePercentOfIncome(income, companyContributionPercentage / 100)
  );

  React.useEffect(() => {
    setMaxCompanyContribution(calculatePercentOfIncome(income, companyContributionPercentage / 100));
  }, [income, companyContributionPercentage]);

  const onChangeIncome = (idx: number, value: number): void => {
    const newValue = value === null ? 0 : value;
    const newIncome = Object.assign([...income], { [idx]: newValue });
    setIncome(newIncome);
  };

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
    <>
      <Box sx={{ display: 'flex' }}>
        <SidePanel
          companyContributionPercentage={companyContributionPercentage}
          onChangeCompanyContributionPercentage={onChangeCompanyContributionPercentage}
          ageCategory={ageCategory}
          onChangeMaxEmployeeContribution={onChangeMaxEmployeeContribution}
        />
        {/* Main panel */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
          <Stack sx={styles.fullWidth}>
            <Stack direction="row" spacing={7} justifyContent="center">
              <CumulativeContributionInfo
                cumulativeContribution={cumulativeEmployeeContribution}
                maximumContribution={AGE_TO_MAX_EMPLOYEE_CONTRIBUTION[ageCategory]}
                employeeOrCompany={'employee'}
              />
              <CumulativeContributionInfo
                cumulativeContribution={cumulativeCompanyContribution}
                maximumContribution={maxCompanyContribution}
                employeeOrCompany={'company'}
              />
            </Stack>

            <SectionTitle title={'Employee Contributions'} marginTop={'35px'} marginBottom={'0px'} />
            <Chart
              xAxisData={PAYCHECKS}
              contributionData={employeeSeries}
              unusedMatchData={[]}
              maximumContribution={AGE_TO_MAX_EMPLOYEE_CONTRIBUTION[ageCategory]}
              maximumContributionLabel={'Maximum Employee Contribution'}
            />

            <SectionTitle title={'Company Contributions'} marginTop={'35px'} marginBottom={'0px'} />
            <Chart
              xAxisData={PAYCHECKS}
              contributionData={companySeries}
              unusedMatchData={unusedMatchSeries}
              maximumContribution={maxCompanyContribution}
              maximumContributionLabel={'Maximum Company Contribution'}
            />

            <SectionTitle title={'Summary of Contributions'} marginTop={'35px'} marginBottom={'5px'} />
            <Typography variant="subtitle1" sx={styles.protipNote}>
              <i>
                Protip: after you adjust a value in the table below, click outside the text box to make sure the change
                takes effect!
              </i>
            </Typography>
            <Stack direction="row" spacing={5} justifyContent="center" sx={styles.autopopulateButtons}>
              <AutopopulateIncome autopopulateIncome={autopopulateIncome} />
              <AutopopulateContributionPercentage
                autopopulateContributionPercentage={autopopulateContributionPercentage}
              />
            </Stack>
            <SummaryTable
              paychecks={PAYCHECKS}
              income={income}
              onChangeIncome={onChangeIncome}
              contributionPercentage={contributionPercentage}
              onChangeContributionPercentage={onChangeContributionPercentage}
              companyContributionPercentage={companyContributionPercentage}
              employeeContributions={employeeSeries}
              companyContributions={companySeries}
              stiIndex={STI_INDEX}
            />
          </Stack>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default App;
