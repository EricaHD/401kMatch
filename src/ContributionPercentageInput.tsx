import Stack from '@mui/material/Stack';
import { NumberInput, NumberFieldChangeEvent } from './helperComponents/NumberInput';
import styles from './styles/ContributionPercentageInput';

interface Props {
  value: number;
  onChange: (val: number | null, event: NumberFieldChangeEvent) => void;
}

const ContributionPercentageInput = ({ value, onChange }: Props) => {
  return (
    <Stack direction="column" sx={styles.contributionPercentageInputStack}>
      <NumberInput
        min={0}
        max={100}
        value={value}
        onChange={(val, event) => onChange(val, event)}
        endAdornment="%"
      />
    </Stack>
  );
};

export default ContributionPercentageInput;
