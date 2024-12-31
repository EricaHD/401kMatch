// @ts-nocheck
import React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { currencyFormatter } from './utils/monetaryCalculations';
import { PAY_PERIOD_COLOR, CUMULATIVE_COLOR, UNUSED_MATCH_COLOR } from './utils/colors';

const PAY_PERIOD_LABEL = 'Pay Period Contribution';
const CUMULATIVE_LABEL = 'Cumulative Contribution';
const UNUSED_MATCH_LABEL = 'Unused company match';

interface Props {
  xAxisData: string[];
  contributionData: number[];
  unusedMatchData: number[];
  maximumContribution: number;
  maximumContributionLabel: string;
}

const Chart = ({
  xAxisData,
  contributionData,
  unusedMatchData,
  maximumContribution,
  maximumContributionLabel,
}: Props) => {
  const maximumPaycheckContribution = Math.max(...contributionData);
  const cumulativeData = contributionData.reduce((acc, current) => {
    acc.push(acc.length > 0 ? acc[acc.length - 1] + current : current);
    return acc;
  }, []);

  const series = [
    {
      type: 'line',
      yAxisId: 'cumulative',
      label: CUMULATIVE_LABEL + ' (right y-axis)',
      color: CUMULATIVE_COLOR,
      data: cumulativeData,
      valueFormatter: currencyFormatter,
    },
    {
      type: 'bar',
      yAxisId: 'contribution',
      label: PAY_PERIOD_LABEL + ' (left y-axis)    ',
      color: PAY_PERIOD_COLOR,
      data: contributionData,
      valueFormatter: currencyFormatter,
      stack: 'payPeriodStack',
    },
  ];
  if (unusedMatchData.length > 0) {
    series.push({
      type: 'bar',
      yAxisId: 'contribution',
      label: UNUSED_MATCH_LABEL + '    ',
      color: UNUSED_MATCH_COLOR,
      data: unusedMatchData,
      valueFormatter: currencyFormatter,
      stack: 'payPeriodStack',
    });
  }

  return (
    <ResponsiveChartContainer
      xAxis={[{ scaleType: 'band', data: xAxisData, id: 'paycheck' }]}
      yAxis={[
        { id: 'contribution', max: maximumPaycheckContribution * 2.5, valueFormatter: currencyFormatter },
        { id: 'cumulative', max: maximumContribution * 1.05, valueFormatter: currencyFormatter },
      ]}
      series={series}
      height={700}
      margin={{ left: 100, right: 100 }}
      sx={{
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-50px, 0)',
        },
        [`.${axisClasses.right} .${axisClasses.label}`]: {
          transform: 'translate(55px, 0)',
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-label': {
          fill: PAY_PERIOD_COLOR,
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-line': {
          stroke: PAY_PERIOD_COLOR,
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-tick': {
          stroke: PAY_PERIOD_COLOR,
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
          fill: PAY_PERIOD_COLOR,
        },
        '& .MuiChartsAxis-right .MuiChartsAxis-label': {
          fill: CUMULATIVE_COLOR,
        },
        '& .MuiChartsAxis-right .MuiChartsAxis-line': {
          stroke: CUMULATIVE_COLOR,
        },
        '& .MuiChartsAxis-right .MuiChartsAxis-tick': {
          stroke: CUMULATIVE_COLOR,
        },
        '& .MuiChartsAxis-right .MuiChartsAxis-tickLabel': {
          fill: CUMULATIVE_COLOR,
        },
      }}
    >
      <BarPlot />
      <LinePlot />
      <MarkPlot />
      <ChartsXAxis axisId="paycheck" tickLabelStyle={{ angle: 65, textAnchor: 'start' }} />
      <ChartsYAxis axisId="contribution" label={PAY_PERIOD_LABEL} />
      <ChartsYAxis axisId="cumulative" position="right" label={CUMULATIVE_LABEL} />
      <ChartsGrid horizontal />
      <ChartsAxisHighlight x={'band'} />
      <ChartsTooltip trigger={'axis'} />
      <ChartsReferenceLine
        axisId="cumulative"
        y={maximumContribution}
        label={`${maximumContributionLabel}: ${currencyFormatter(maximumContribution)}`}
        labelStyle={{ stroke: CUMULATIVE_COLOR }}
        lineStyle={{ stroke: CUMULATIVE_COLOR, strokeWidth: '2', strokeDasharray: '5,5' }}
      />
      <ChartsLegend
        direction="row"
        position={{
          horizontal: 'middle',
          vertical: 'top',
        }}
      />
    </ResponsiveChartContainer>
  );
};

export default Chart;
