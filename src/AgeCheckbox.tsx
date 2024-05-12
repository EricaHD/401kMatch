import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from './styles/AgeCheckbox';

interface Props {
  checked: boolean;
  onChange: (event: React.SyntheticEvent) => void;
}

const AgeCheckbox = ({ checked, onChange }: Props) => {
  return (
    <FormControlLabel
      checked={checked}
      control={<Checkbox onChange={onChange} />}
      label="Check this box if you will be 50 or older by the end of the calendar year"
      labelPlacement="end"
      sx={styles.ageCheckbox}
    />
  );
}

export default AgeCheckbox;
