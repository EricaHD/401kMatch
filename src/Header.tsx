import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles/Header';

const Header = () => {
  return (
    <Box sx={styles.header}>
      <Typography sx={styles.yearText}>2026</Typography>
      <Typography sx={styles.titleText}>
        401k
        <br />
        Contribution
        <br />
        Calculator
      </Typography>
      <Typography variant="subtitle1" sx={styles.subtitleText}>
        This calculator assumes the company has a per-paycheck matching system and there is no true-up match.
      </Typography>
    </Box>
  );
};

export default Header;
