import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles/Header';

const Header = () => {
  return (
    <Box sx={styles.headerBackground}>
      <Typography sx={styles.yearText}>2026</Typography>
      <Typography sx={styles.titleText}>
        Retirement
        <br />
        Contribution
        <br />
        Calculator
      </Typography>
      <Typography sx={styles.subtitleText}>with a 2% per-paycheck match from your company</Typography>
    </Box>
  );
};

export default Header;
