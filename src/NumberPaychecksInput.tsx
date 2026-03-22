import React from 'react';
import Stack from '@mui/material/Stack';
import NumberInput from './helperComponents/NumberInput';
import styles from './styles/NumberPaychecksInput';

interface Props {
  value: number;
  onChange: (event: React.SyntheticEvent, val: number) => void;
}

const NumberPaychecksInput = ({ value, onChange }: Props) => {
  return (
    <Stack direction="column" sx={styles.numberPaychecksInputStack}>
      <NumberInput
        endAdornment=""
        onChange={(event: React.SyntheticEvent, val: number) => onChange(event, val)}
        min={1}
        max={100}
        value={value}
      />
    </Stack>
  );
};

export default NumberPaychecksInput;
