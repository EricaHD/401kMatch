import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ContributionPercentageInput from './ContributionPercentageInput';
import styles from './styles/AutopopulateContributionPercentage';

const DEFAULT_RETIREMENT_CONTRIBUTION = 10;

interface Props {
  autopopulateContributionPercentage: (retirementContribution: number) => void;
}

const AutopopulateContributionPercentage = ({ autopopulateContributionPercentage }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [retirementContribution, setRetirementContribution] = React.useState(DEFAULT_RETIREMENT_CONTRIBUTION);

  const onClickButton = () => {
    setOpen(true);
  };

  const onSubmit = (retirementContribution: number) => {
    setOpen(false);
    autopopulateContributionPercentage(retirementContribution);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={onClickButton} sx={styles.button}>
        Autopopulate
        <br />
        retirement contribution
      </Button>
      <Dialog open={open} maxWidth="sm">
        <DialogTitle>Autopopulate Retirement Contribution</DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
            <Typography variant="body1">Retirement contribution percentage:</Typography>
            <ContributionPercentageInput
              value={retirementContribution}
              onChange={(event: React.SyntheticEvent, val: number) => setRetirementContribution(val)}
            />
          </Stack>
          <br />
          <Typography variant="body1">
            <i>
              This will overwrite the values currently in the "Retirement Contribution" column. If left blank, it will
              be treated as 0%. You can still edit individual retirement contribution values after autopopulating.
            </i>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(retirementContribution)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AutopopulateContributionPercentage;
