import React from 'react';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { AGE_CATEGORIES } from './Content';

interface Props {
  defaultValue: string;
  onChange: (event: React.SyntheticEvent) => void;
}

const AgeSelection = ({ defaultValue, onChange }: Props) => {
  return (
    <div>
      <Typography variant="subtitle1">
        Select your age <b>at the end of the calendar year</b>. This determines the employee contribution limit.
      </Typography>
      <FormControl>
        {/* Providing value prop makes no difference and suppresses console error */}
        <RadioGroup value={defaultValue} defaultValue={defaultValue} onChange={onChange}>
          <FormControlLabel value={AGE_CATEGORIES.UNDER_50} control={<Radio />} label="Under 50 years old" />
          <FormControlLabel value={AGE_CATEGORIES.BETWEEN_50_AND_59} control={<Radio />} label="50 – 59 years old" />
          <FormControlLabel value={AGE_CATEGORIES.BETWEEN_60_AND_63} control={<Radio />} label="60 – 63 years old" />
          <FormControlLabel value={AGE_CATEGORIES.OVER_63} control={<Radio />} label="Over 63 years old" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AgeSelection;
