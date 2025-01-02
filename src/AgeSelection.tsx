import React from 'react';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {
  MAX_CONTRIBUTION_UNDER_50,
  MAX_CONTRIBUTION_FIFTIES_OR_OVER_63,
  MAX_CONTRIBUTION_BETWEEN_60_AND_63,
} from './Content';

interface Props {
  defaultValue: number;
  onChange: (event: React.SyntheticEvent) => void;
}

const AgeSelection = ({ defaultValue, onChange }: Props) => {
  const fiftiesOrOver63 = (
    <div>
      50 – 59 years old <b>or</b> over 63 years old
    </div>
  );
  return (
    <div>
      <Typography variant="subtitle1">
        Select your age <b>at the end of the calendar year</b>. This determines the employee contribution limit.
      </Typography>
      <FormControl>
        <RadioGroup defaultValue={defaultValue} onChange={onChange}>
          <FormControlLabel value={MAX_CONTRIBUTION_UNDER_50} control={<Radio />} label="Under 50 years old" />
          <FormControlLabel value={MAX_CONTRIBUTION_FIFTIES_OR_OVER_63} control={<Radio />} label={fiftiesOrOver63} />
          <FormControlLabel value={MAX_CONTRIBUTION_BETWEEN_60_AND_63} control={<Radio />} label="60 – 63 years old" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AgeSelection;
