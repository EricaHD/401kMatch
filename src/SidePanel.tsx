import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Header from './Header';
import AgeSelection from './AgeSelection';
import ContributionPercentageInput from './ContributionPercentageInput';
import { AGE_TO_MAX_EMPLOYEE_CONTRIBUTION } from './utils/constants';
import { currencyWithoutCentsFormatter } from './utils/monetaryCalculations';
import styles from './styles/App';
import titleBackground from '../images/titleBackground.jpeg';

interface SidePanelProps {
  companyContributionPercentage: number;
  onChangeCompanyContributionPercentage: (event: React.SyntheticEvent, val: number) => void;
  ageCategory: keyof typeof AGE_TO_MAX_EMPLOYEE_CONTRIBUTION;
  onChangeMaxEmployeeContribution: (event: React.SyntheticEvent) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  companyContributionPercentage,
  onChangeCompanyContributionPercentage,
  ageCategory,
  onChangeMaxEmployeeContribution,
}) => {
  return (
    <Drawer
      sx={{
        width: 500,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 500,
          boxSizing: 'border-box',
          backgroundImage: `url(${titleBackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Header />
      <Box sx={styles.scrollDownNote}>
        <Divider sx={{ margin: '30px 0' }} style={{ background: 'gray' }} />
        <Stack direction="row" spacing={3} alignItems="center" marginBottom={'30px'}>
          <Typography variant="subtitle1">Company match percentage:</Typography>
          <ContributionPercentageInput
            value={companyContributionPercentage}
            onChange={onChangeCompanyContributionPercentage}
          />
        </Stack>
        <Divider sx={{ margin: '30px 0' }} style={{ background: 'gray' }} />
        <AgeSelection defaultValue={ageCategory} onChange={onChangeMaxEmployeeContribution} />
        <Typography variant="subtitle1">
          Employee contribution limit:{' '}
          <b>{currencyWithoutCentsFormatter(AGE_TO_MAX_EMPLOYEE_CONTRIBUTION[ageCategory])}</b>
        </Typography>
        <Divider sx={{ margin: '30px 0' }} style={{ background: 'gray' }} />
        <Typography variant="subtitle1">
          Enter income and retirement contribution percentage details in the table.
        </Typography>
      </Box>
    </Drawer>
  );
};

export default SidePanel;
