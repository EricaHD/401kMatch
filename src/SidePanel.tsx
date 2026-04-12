import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Header from './Header';
import AgeSelection from './AgeSelection';
import ContributionPercentageInput from './ContributionPercentageInput';
import NumberPaychecksInput from './NumberPaychecksInput';
import { NumberFieldChangeEvent } from './helperComponents/NumberInput';
import { AGE_TO_MAX_EMPLOYEE_CONTRIBUTION } from './utils/constants';
import { currencyWithoutCentsFormatter } from './utils/monetaryCalculations';
import styles from './styles/SidePanel';

interface SidePanelProps {
  numPaychecks: number;
  onChangeNumPaychecks: (val: number | null, event: NumberFieldChangeEvent) => void;
  companyContributionPercentage: number;
  onChangeCompanyContributionPercentage: (val: number | null, event: NumberFieldChangeEvent) => void;
  ageCategory: keyof typeof AGE_TO_MAX_EMPLOYEE_CONTRIBUTION;
  onChangeMaxEmployeeContribution: (event: React.SyntheticEvent) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  numPaychecks,
  onChangeNumPaychecks,
  companyContributionPercentage,
  onChangeCompanyContributionPercentage,
  ageCategory,
  onChangeMaxEmployeeContribution,
}) => {
  return (
    <Drawer sx={styles.titleBackgroundImage} variant="permanent" anchor="left">
      <Header />
      <Box sx={styles.inputs}>
        <Divider sx={styles.divider} />
        <Stack direction="row" spacing={3} sx={styles.inputStack}>
          <Typography variant="subtitle1">Number of paychecks:</Typography>
          <NumberPaychecksInput
            value={numPaychecks}
            onChange={onChangeNumPaychecks}
          />
        </Stack>
        <Divider sx={styles.divider} />
        <Stack direction="row" spacing={3} sx={styles.inputStack}>
          <Typography variant="subtitle1">Company match percentage:</Typography>
          <ContributionPercentageInput
            value={companyContributionPercentage}
            onChange={onChangeCompanyContributionPercentage}
          />
        </Stack>
        <Divider sx={styles.divider} />
        <AgeSelection defaultValue={ageCategory} onChange={onChangeMaxEmployeeContribution} />
        <Typography variant="subtitle1">
          Employee contribution limit:{' '}
          <b>{currencyWithoutCentsFormatter(AGE_TO_MAX_EMPLOYEE_CONTRIBUTION[ageCategory])}</b>
        </Typography>
        <Divider sx={styles.divider} />
        <Typography variant="subtitle1">
          Enter income and retirement contribution percentage details in the table.
        </Typography>
      </Box>
    </Drawer>
  );
};

export default SidePanel;
