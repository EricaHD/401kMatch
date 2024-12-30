import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { currencyFormatter } from './utils/monetaryCalculations';
import styles from './styles/CumulativeContributionInfo';

interface Props {
  cumulativeContribution: number;
  maximumContribution: number;
  employeeOrCompany: string;
}

const CumulativeContributionInfo = ({ cumulativeContribution, maximumContribution, employeeOrCompany }: Props) => {
  return (
    <Box sx={styles.contributionInfo}>
      <Typography variant="h5">
        Total {employeeOrCompany.charAt(0).toUpperCase() + employeeOrCompany.slice(1)} Contribution
      </Typography>
      <Typography variant="h3">{currencyFormatter(cumulativeContribution)}</Typography>
      <Typography variant="caption">
        Maximum {employeeOrCompany.toLowerCase()} contribution for the entire year ={' '}
        {currencyFormatter(maximumContribution)}
      </Typography>
    </Box>
  );
};

export default CumulativeContributionInfo;
