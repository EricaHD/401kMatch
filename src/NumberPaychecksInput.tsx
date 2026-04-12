import React from 'react';
import Stack from '@mui/material/Stack';
import { NumberInput, NumberFieldChangeEvent } from './helperComponents/NumberInput';
import styles from './styles/NumberPaychecksInput';

interface Props {
  value: number;
  onChange: (val: number | null, event: NumberFieldChangeEvent) => void;
}

const NumberPaychecksInput = ({ value, onChange }: Props) => {
  return (
    <Stack direction="column" sx={styles.numberPaychecksInputStack}>
      <NumberInput
        min={1}
        max={104}
        value={value}
        onChange={(val, event) => onChange(val, event)}
        endAdornment=""
      />
    </Stack>
  );
};

export default NumberPaychecksInput;
