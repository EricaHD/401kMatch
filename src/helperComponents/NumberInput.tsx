import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { NumberField } from '@base-ui/react/number-field';
import OutlinedInput from '@mui/material/OutlinedInput';
import styles from '../styles/NumberInput';

export type NumberFieldChangeEvent = NumberField.Root.ChangeEventDetails;

interface Props {
  min: number;
  max: number;
  value: number;
  onChange: (value: number | null, eventDetails: NumberFieldChangeEvent) => void;
  endAdornment: string;
}

const NumberInput = ({ min, max, value, onChange, endAdornment }: Props) => {
  return (
    <NumberField.Root
      value={value}
      onValueChange={onChange}
      min={min}
      max={max}
      render={() => (
        <NumberField.Group>
          <Stack direction="row" spacing={1}>
            <Box sx={styles.incrementButton}>
              <NumberField.Decrement>
                <MinusIcon />
              </NumberField.Decrement>
            </Box>
            <Box sx={styles.numberInput}>
              <NumberField.Input
                render={<OutlinedInput endAdornment={endAdornment} sx={styles.outlinedInput} />}
              />
            </Box>
            <Box sx={styles.decrementButton}>
              <NumberField.Increment>
                <PlusIcon />
              </NumberField.Increment>
            </Box>
          </Stack>
        </NumberField.Group>
      )}
    >
    </NumberField.Root>
  );
};

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}

export { NumberInput };
