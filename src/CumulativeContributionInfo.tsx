import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Gauge } from '@mui/x-charts/Gauge';
import { currencyFormatter } from './utils/monetaryCalculations';
import styles from './styles/CumulativeContributionInfo';

interface Props {
  cumulativeContribution: number;
  maximumContribution: number;
  employeeOrCompany: string;
}

const CumulativeContributionInfo = ({ cumulativeContribution, maximumContribution, employeeOrCompany }: Props) => {
  const StyledContainer = styled(Box)`
    ${({ theme }) => `
      transition: ${theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.standard,
      })};
      &:hover {
        transform: scale(1.05);
      }
    `}
  `;

  return (
    <StyledContainer sx={styles.contributionInfo}>
      <Typography variant="h5">
        Total {employeeOrCompany.charAt(0).toUpperCase() + employeeOrCompany.slice(1)} Contribution
      </Typography>
      <Gauge
        height={250}
        value={cumulativeContribution}
        valueMin={0}
        valueMax={maximumContribution}
        startAngle={-110}
        endAngle={110}
        cornerRadius="25%"
        text={currencyFormatter(cumulativeContribution)}
        sx={styles.gauge}
      />
      <Typography variant="body1">
        Maximum {employeeOrCompany.toLowerCase()} contribution for the entire year ={' '}
        {currencyFormatter(maximumContribution)}
      </Typography>
    </StyledContainer>
  );
};

export default CumulativeContributionInfo;
