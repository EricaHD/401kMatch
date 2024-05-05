import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { currencyFormatter } from './utils/monetaryCalculations';
import styles from './styles/CumulativeContributionInfo';

export default function CumulativeContributionInfo({ cumulativeContribution, maximumContribution, individualOrCompany }) {
  return (
    <Box sx={styles.contributionInfo}>
      <Typography variant="h5">
        Total {individualOrCompany.charAt(0).toUpperCase() + individualOrCompany.slice(1)} Contribution
      </Typography>
      <Typography variant="h3">
        {currencyFormatter(cumulativeContribution)}
      </Typography>
      <Typography variant="caption">
        Maximum {individualOrCompany.toLowerCase()} contribution for the entire year = {currencyFormatter(maximumContribution)}
      </Typography>
    </Box>
  );
}
