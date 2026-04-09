import React from 'react';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IncomeInput from './IncomeInput';
import ContributionPercentageInput from './ContributionPercentageInput';
import { currencyFormatter, roundToNearestCent } from './utils/monetaryCalculations';
import styles from './styles/SummaryTable';

interface Props {
  paychecks: string[];
  income: number[];
  onChangeIncome: (idx: number, value: number) => void;
  contributionPercentage: number[];
  onChangeContributionPercentage: (idx: number, value: number) => void;
  companyContributionPercentage: number;
  employeeContributions: number[];
  companyContributions: number[];
  cumulativeEmployeeContribution: number;
  maximumEmployeeContribution: number;
  cumulativeCompanyContribution: number;
  maximumCompanyContribution: number;
}

const SummaryTable = ({
  paychecks,
  income,
  onChangeIncome,
  contributionPercentage,
  onChangeContributionPercentage,
  companyContributionPercentage,
  employeeContributions,
  companyContributions,
  cumulativeEmployeeContribution,
  maximumEmployeeContribution,
  cumulativeCompanyContribution,
  maximumCompanyContribution,
}: Props) => {
  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table size="small">
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="body1">
                <b>
                  Paycheck Income
                  <br />
                  (annual salary ÷ 24)
                </b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                <b>Retirement Contribution</b>
              </Typography>
            </TableCell>
            <TableCell sx={styles.centerText}>
              <Typography variant="body1">
                <b>Employee Contribution</b>
              </Typography>
            </TableCell>
            <TableCell sx={styles.centerText}>
              <Typography variant="body1">
                <b>Company Contribution</b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Rows */}
        <TableBody>
          {paychecks.map((paycheck, idx) => (
            <TableRow sx={styles.tableRow} key={paycheck}>
              <TableCell component="th" scope="row" key={`${paycheck}-paycheck`}>
                <Typography variant="body1">
                  <b>{paycheck}</b>
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row" key={`${paycheck}-income`}>
                <IncomeInput value={income[idx]} onChange={(val) => onChangeIncome(idx, val)} />
              </TableCell>
              <TableCell component="th" scope="row" key={`${paycheck}-contrib`}>
                <ContributionPercentageInput
                  value={contributionPercentage[idx]}
                  onChange={(event, val) => onChangeContributionPercentage(idx, val)}
                />
              </TableCell>
              <TableCell component="th" scope="row" key={`${paycheck}-employee`} sx={styles.centerText}>
                <Typography variant="body1">{currencyFormatter(employeeContributions[idx])}</Typography>
              </TableCell>
              <TableCell component="th" scope="row" key={`${paycheck}-company`} sx={styles.centerText}>
                <Typography variant="body1">{currencyFormatter(companyContributions[idx])}</Typography>
                <Typography variant="caption">
                  <i>
                    Maximum possible:{' '}
                    {currencyFormatter(roundToNearestCent((income[idx] * companyContributionPercentage) / 100))}
                  </i>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={styles.tableRow}>
            <TableCell component="th" scope="row">
              <Typography variant="body1">
                <b>Total</b>
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography variant="body1">
                <b>{currencyFormatter(income.reduce((sum, val) => sum + val, 0))}</b>
              </Typography>
            </TableCell>
            <TableCell />
            <TableCell component="th" scope="row" sx={styles.centerText}>
              <Typography variant="body1">
                <b>{currencyFormatter(cumulativeEmployeeContribution)}</b>
              </Typography>
              <Typography variant="caption">
                <i>
                  Maximum possible:{' '}
                  {currencyFormatter(maximumEmployeeContribution)}
                </i>
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row" sx={styles.centerText}>
              <Typography variant="body1">
                <b>{currencyFormatter(cumulativeCompanyContribution)}</b>
              </Typography>
              <Typography variant="caption">
                <i>
                  Maximum possible:{' '}
                  {currencyFormatter(maximumCompanyContribution)}
                </i>
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryTable;
