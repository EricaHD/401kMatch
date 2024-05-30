import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles/Header';

const Header = () => {
  return (
    <Box sx={styles.headerBackground}>
      <Typography variant="h3">2024 Retirement Contribution Calculator</Typography>
      <Typography variant="h6">with a 2% per-paycheck match from your company</Typography>
    </Box>
  );
};

export default Header;
