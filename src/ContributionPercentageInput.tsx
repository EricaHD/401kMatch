import React from 'react';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import NumberInput from './helperComponents/NumberInput';
import { grey } from './utils/colors';
import styles from './styles/ContributionPercentageInput';

interface Props {
  value: number;
  onChange: (event: React.SyntheticEvent, val: number) => void;
}

const ContributionPercentageInput = ({ value, onChange }: Props) => {
  return (
    <Stack direction="column" sx={styles.contributionPercentageInputStack}>
      <NumberInput
        // @ts-ignore
        endAdornment={<InputAdornment>%</InputAdornment>}
        onChange={(event: React.SyntheticEvent, val: number) => onChange(event, val)}
        min={0}
        max={100}
        value={value}
      />
    </Stack>
  );
};

const InputAdornment = styled('div')(
  ({ theme }) => `
  font-size: 1rem;
  line-height: 1.5;
  margin: 8px 10px 8px -25px;
  display: inline-flex;
  align-items: left;
  justify-content: left;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[500] : grey[700]};
`
);

export default ContributionPercentageInput;
