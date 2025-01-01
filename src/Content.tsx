import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AgeSelection from './AgeSelection';
import CumulativeContributionInfo from './CumulativeContributionInfo';
import Chart from './Chart';
import SummaryTable from './SummaryTable';
import SectionTitle from './SectionTitle';
import AutopopulateIncome from './AutopopulateIncome';
import AutopopulateContributionPercentage from './AutopopulateContributionPercentage';
import { roundToNearestCent, calculatePercentOfIncome } from './utils/monetaryCalculations';
import { useLocalStorageState, setLocalStorage } from './utils/localStorage';
import styles from './styles/Content';

export const MAX_CONTRIBUTION_UNDER_50 = 23500;
export const MAX_CONTRIBUTION_FIFTIES_OR_OVER_63 = 31000;
export const MAX_CONTRIBUTION_BETWEEN_60_AND_63 = 34750;
export const COMBINED_MAX_CONTRIBUTION = 70000;
const COMPANY_CONTRIBUTION_PERCENTAGE = 0.02;

const DEFAULT_INCOME = 7000;
const DEFAULT_STI = 15000;
const DEFAULT_RETIREMENT_CONTRIBUTION = 12;

const STI_STRING = 'STI';
const PAYCHECKS = [
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
const STI_INDEX = PAYCHECKS.indexOf(STI_STRING);
const NUM_PAYCHECKS = PAYCHECKS.length;

const Content = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - AGE & MAX CONTRIBUTION                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Clear legacy local storage keys that are no longer used
  setLocalStorage('local_storage_max_contribution', null);

  const [maxEmployeeContribution, setMaxEmployeeContribution] = useLocalStorageState(
    'local_storage_max_contribution_2025',
    MAX_CONTRIBUTION_UNDER_50
  );

  const onChangeMaxEmployeeContribution = (event: React.SyntheticEvent): void => {
    const newMaxEmployeeContribution = parseInt((event.target as HTMLInputElement).value);
    // @ts-ignore
    setMaxEmployeeContribution(newMaxEmployeeContribution);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE - INCOME                                                                                                   //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const initialIncomeArray = Array(NUM_PAYCHECKS).fill(DEFAULT_INCOME);
  initialIncomeArray[STI_INDEX] = DEFAULT_STI;
  const [income, setIncome] = useLocalStorageState('local_storage_income', initialIncomeArray);
  const [maxCompanyContribution, setMaxCompanyContribution] = React.useState(
    calculatePercentOfIncome(income, COMPANY_CONTRIBUTION_PERCENTAGE)
  );

  const onChangeIncome = (idx: number, value: number): void => {
    const newValue = value === null ? 0 : value;
    const newIncome = Object.assign([...income], { [idx]: newValue });
    setIncome(newIncome);
    setMaxCompanyContribution(calculatePercentOfIncome(newIncome, COMPANY_CONTRIBUTION_PERCENTAGE));
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
    setMaxCompanyContribution(calculatePercentOfIncome(newIncome, COMPANY_CONTRIBUTION_PERCENTAGE));
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
      if (newCumulativeEmployeeContribution + employeeContribution > maxEmployeeContribution) {
        const overage = newCumulativeEmployeeContribution + employeeContribution - maxEmployeeContribution;
        employeeContribution -= overage;
        // Account for rounding errors
        if (Math.abs(employeeContribution) < 0.0000000001) {
          employeeContribution = 0;
        }
      }

      // Company contribution
      const possibleCompanyContribution = roundToNearestCent(income[i] * 0.02);
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
  }, [maxEmployeeContribution, income, contributionPercentage]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RETURN                                                                                                           //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Stack sx={styles.fullWidth}>
      <Box sx={styles.scrollDownNote}>
        <Typography variant="subtitle1">
          Select your age <b>at the end of the calendar year</b>. This determines the employee contribution limit.
        </Typography>
        <AgeSelection defaultValue={maxEmployeeContribution} onChange={onChangeMaxEmployeeContribution} />
        <Typography variant="subtitle1">
          Scroll down to enter income and retirement contribution percentage details.
        </Typography>
      </Box>

      <Stack direction="row" spacing={5} justifyContent="center">
        <CumulativeContributionInfo
          cumulativeContribution={cumulativeEmployeeContribution}
          maximumContribution={maxEmployeeContribution}
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
        maximumContribution={maxEmployeeContribution}
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
      <Typography variant="subtitle1" sx={styles.scrollDownNote}>
        <i>
          Protip: after you adjust a value in the table below, click outside the text box to make sure the change takes
          effect!
        </i>
      </Typography>
      <Stack direction="row" spacing={5} justifyContent="center" sx={styles.autopopulateButtons}>
        <AutopopulateIncome autopopulateIncome={autopopulateIncome} />
        <AutopopulateContributionPercentage autopopulateContributionPercentage={autopopulateContributionPercentage} />
      </Stack>
      <SummaryTable
        paychecks={PAYCHECKS}
        income={income}
        onChangeIncome={onChangeIncome}
        contributionPercentage={contributionPercentage}
        onChangeContributionPercentage={onChangeContributionPercentage}
        employeeContributions={employeeSeries}
        companyContributions={companySeries}
        stiIndex={STI_INDEX}
      />
    </Stack>
  );
};

export default Content;
