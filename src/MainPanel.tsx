import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Footer from './Footer';
import CumulativeContributionInfo from './CumulativeContributionInfo';
import SummaryTable from './SummaryTable';
import SectionTitle from './SectionTitle';
import AutopopulateIncome from './AutopopulateIncome';
import AutopopulateContributionPercentage from './AutopopulateContributionPercentage';
import { AGE_TO_MAX_EMPLOYEE_CONTRIBUTION, PAYCHECKS, STI_INDEX } from './utils/constants';
import styles from './styles/MainPanel';

interface MainPanelProps {
  cumulativeEmployeeContribution: number;
  ageCategory: keyof typeof AGE_TO_MAX_EMPLOYEE_CONTRIBUTION;
  cumulativeCompanyContribution: number;
  maxCompanyContribution: number;
  employeeSeries: number[];
  companySeries: number[];
  income: number[];
  onChangeIncome: (idx: number, value: number) => void;
  contributionPercentage: number[];
  onChangeContributionPercentage: (idx: number, value: number) => void;
  companyContributionPercentage: number;
  autopopulateIncome: (preMarchAnnualSalary: number, postMarchAnnualSalary: number, sti: number) => void;
  autopopulateContributionPercentage: (retirementContribution: number) => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
  cumulativeEmployeeContribution,
  ageCategory,
  cumulativeCompanyContribution,
  maxCompanyContribution,
  employeeSeries,
  companySeries,
  income,
  onChangeIncome,
  contributionPercentage,
  onChangeContributionPercentage,
  companyContributionPercentage,
  autopopulateIncome,
  autopopulateContributionPercentage,
}) => {
  return (
    <Box component="main" sx={styles.box}>
      <Stack>
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

        <SectionTitle title={'Summary of Contributions'} marginTop={'35px'} marginBottom={'5px'} />
        <Typography variant="subtitle1" sx={styles.protipNote}>
          <i>
            Protip: after you adjust a value in the table below, click outside the text box to make sure the change
            takes effect!
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
          companyContributionPercentage={companyContributionPercentage}
          employeeContributions={employeeSeries}
          companyContributions={companySeries}
          stiIndex={STI_INDEX}
        />
      </Stack>
      <Footer />
    </Box>
  );
};

export default MainPanel;
