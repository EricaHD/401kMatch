import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Footer from './Footer';
import CumulativeContributionInfo from './CumulativeContributionInfo';
import SummaryTable from './SummaryTable';
import SectionTitle from './SectionTitle';
import { AGE_TO_MAX_EMPLOYEE_CONTRIBUTION } from './utils/constants';
import styles from './styles/MainPanel';

interface MainPanelProps {
  numPaychecks: number;
  ageCategory: keyof typeof AGE_TO_MAX_EMPLOYEE_CONTRIBUTION;
  maxCompanyContribution: number;
  employeeSeries: number[];
  companySeries: number[];
  cumulativeEmployeeContributions: number[];
  cumulativeCompanyContributions: number[];
  income: number[];
  onChangeIncome: (idx: number, value: number) => void;
  contributionPercentage: number[];
  onChangeContributionPercentage: (idx: number, value: number) => void;
  companyContributionPercentage: number;
}

const MainPanel: React.FC<MainPanelProps> = ({
  numPaychecks,
  ageCategory,
  maxCompanyContribution,
  employeeSeries,
  companySeries,
  cumulativeEmployeeContributions,
  cumulativeCompanyContributions,
  income,
  onChangeIncome,
  contributionPercentage,
  onChangeContributionPercentage,
  companyContributionPercentage,
}) => {
  return (
    <Box component="main" sx={styles.box}>
      <Stack>
        <Stack direction="row" spacing={7} justifyContent="center">
          <CumulativeContributionInfo
            cumulativeContribution={cumulativeEmployeeContributions.length > 0 ? cumulativeEmployeeContributions[cumulativeEmployeeContributions.length - 1] : 0}
            maximumContribution={AGE_TO_MAX_EMPLOYEE_CONTRIBUTION[ageCategory]}
            employeeOrCompany={'employee'}
          />
          <CumulativeContributionInfo
            cumulativeContribution={cumulativeCompanyContributions.length > 0 ? cumulativeCompanyContributions[cumulativeCompanyContributions.length - 1] : 0}
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
        <SummaryTable
          numPaychecks={numPaychecks}
          income={income}
          onChangeIncome={onChangeIncome}
          contributionPercentage={contributionPercentage}
          onChangeContributionPercentage={onChangeContributionPercentage}
          companyContributionPercentage={companyContributionPercentage}
          employeeContributions={employeeSeries}
          companyContributions={companySeries}
          cumulativeEmployeeContributions={cumulativeEmployeeContributions}
          cumulativeCompanyContributions={cumulativeCompanyContributions}
        />
      </Stack>
      <Footer />
    </Box>
  );
};

export default MainPanel;
