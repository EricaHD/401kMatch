import React from 'react';
import Stack from '@mui/material/Stack';
import NumberInput from './helperComponents/NumberInput';
import styles from './styles/ContributionPercentageInput';

interface Props {
  value: number;
  onChange: (event: React.SyntheticEvent, val: number) => void;
}

const ContributionPercentageInput = ({ value, onChange }: Props) => {
  return (
    <Stack direction="column" sx={styles.contributionPercentageInputStack}>
      <NumberInput
        endAdornment="%"
        onChange={(event: React.SyntheticEvent, val: number) => onChange(event, val)}
        min={0}
        max={100}
        value={value}
      />
    </Stack>
  );
};

export default ContributionPercentageInput;
