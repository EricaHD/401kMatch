import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IncomeInput from './IncomeInput.jsx';
import styles from './styles/AutopopulateIncome.ts';

const DEFAULT_PRE_MARCH_ANNUAL_SALARY = 6250 * 24;
const DEFAULT_POST_MARCH_ANNUAL_SALARY = 6500 * 24;
const DEFAULT_STI = 17250;

export default function AutopopulateIncome({ autopopulateIncome }) {
  const [open, setOpen] = React.useState(false);
  const [preMarchAnnualSalary, setPreMarchAnnualSalary] = React.useState(DEFAULT_PRE_MARCH_ANNUAL_SALARY);
  const [postMarchAnnualSalary, setPostMarchAnnualSalary] = React.useState(DEFAULT_POST_MARCH_ANNUAL_SALARY);
  const [sti, setSti] = React.useState(DEFAULT_STI);

  const onClickButton = () => {
    setOpen(true);
  };

  const onSubmit = (preMarchAnnualSalary, postMarchAnnualSalary, sti) => {
    setOpen(false);
    autopopulateIncome(preMarchAnnualSalary, postMarchAnnualSalary, sti);
  };

  const onCancel = (preMarchAnnualSalary, postMarchAnnualSalary, sti) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={onClickButton} sx={styles.button}>
        Autopopulate<br />paycheck income
      </Button>
      <Dialog open={open} maxWidth="sm">
        <DialogTitle>Autopopulate Paycheck Income</DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
            <Typography variant="body1">Annual base salary before March 1:</Typography>
            <IncomeInput value={preMarchAnnualSalary} onChange={(val) => setPreMarchAnnualSalary(val)} />
          </Stack>
          <br />
          <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
            <Typography variant="body1">Annual base salary after March 1:</Typography>
            <IncomeInput value={postMarchAnnualSalary} onChange={(val) => setPostMarchAnnualSalary(val)} />
          </Stack>
          <br />
          <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
            <Typography variant="body1">STI (paid out in mid-March):</Typography>
            <IncomeInput value={sti} onChange={(val) => setSti(Number(val))} />
          </Stack>
          <br />
          <Typography variant="body1">
            <i>
              This will overwrite the values currently in the "Paycheck Income" column.
              Each value left blank will be treated as $0.
              You can still edit individual income values after autopopulating (e.g. in the case of an off-cycle raise or bonus).
            </i>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSubmit(preMarchAnnualSalary, postMarchAnnualSalary, sti)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
