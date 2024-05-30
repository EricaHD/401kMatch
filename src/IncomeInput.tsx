import React from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import styles from './styles/IncomeInput';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const IncomeInput = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = React.useState(0);

  const handleInputChange = (event: React.ChangeEvent): void => {
    // @ts-ignore
    const value = Number(event.target.value);
    setInputValue(value);
    onChange(value);
  };

  const isNegative = (value: number): boolean => {
    return value < 0;
  };

  const hasMoreThanTwoDecimalPlaces = (value: number): boolean => {
    return (value * 100) % 1 !== 0;
  };

  const isInvalid = (value: number): boolean => {
    return isNegative(value) || hasMoreThanTwoDecimalPlaces(value);
  };

  return (
    <Stack direction="column" sx={styles.incomeInputStack}>
      <FormControl variant="standard" error={isInvalid(inputValue)}>
        <OutlinedInput
          type="number"
          startAdornment="$"
          value={value}
          onChange={handleInputChange}
          sx={styles.outlinedInput}
        />
        {isNegative(inputValue) && <FormHelperText>Value cannot be negative</FormHelperText>}
        {hasMoreThanTwoDecimalPlaces(inputValue) && (
          <FormHelperText>Value cannot have more than two decimal places</FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};

export default IncomeInput;
