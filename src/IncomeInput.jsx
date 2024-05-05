import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import styles from './styles/IncomeInput';

export default function IncomeInput({ label, value, onChange }) {
  const [inputValue, setInputValue] = React.useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event, event.target.value);
  };

  const isNegative = (value) => {
    return value < 0;
  }

  const hasMoreThanTwoDecimalPlaces = (value) => {
    return (value * 100) % 1 !== 0;
  }

  const isInvalid = (value) => {
    return isNegative(value) || hasMoreThanTwoDecimalPlaces(value);
  };

  return (
    <Stack direction="column" sx={styles.incomeInputStack}>
      <FormControl variant="standard" error={isInvalid(inputValue)}>
        <Typography variant="caption">{label}</Typography>
        <OutlinedInput
          type="number"
          startAdornment="$"
          value={value}
          onChange={handleInputChange}
          sx={styles.outlinedInput}
        />
        {isNegative(inputValue) && <FormHelperText>Value cannot be negative</FormHelperText>}
        {hasMoreThanTwoDecimalPlaces(inputValue) && <FormHelperText>Value cannot have more than two decimal places</FormHelperText>}
      </FormControl>
    </Stack>
  );
}
