import React from 'react';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { blue, grey } from './utils/colors';
import styles from './styles/ContributionPercentageInput';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    // @ts-ignore
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

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

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: left;
  margin: -16px;
`
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};
  border-radius: 8px;
  margin: 0 8px;
  padding: 8px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: #000000;
  }

  &:focus {
    border-color: #1a76d2;
    box-shadow: 0 0 0 1px #1a76d2;
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);

export default ContributionPercentageInput;
