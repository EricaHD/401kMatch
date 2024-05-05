import React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { ChartsReferenceLine } from '@mui/x-charts';
import { currencyFormatter } from './utils/monetaryCalculations';

interface Props {
  xAxisData: string[];
  series: any; // array of objects
  maximumContribution: number;
  maximumContributionLabel: string;
}

const Chart = ({ xAxisData, series, maximumContribution, maximumContributionLabel }: Props) => {
  return (
    <ResponsiveChartContainer
      series={series}
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      yAxis={[{ max: maximumContribution * 1.05, valueFormatter: currencyFormatter }]}
      height={700}
      margin={{ left: 100 }}
    >
      <BarPlot />
      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsTooltip trigger={'axis'} />
      <ChartsAxisHighlight x={'band'} />
      <ChartsReferenceLine
        y={maximumContribution}
        label={`${maximumContributionLabel}: ${currencyFormatter(maximumContribution)}`}
        labelStyle={{ stroke: '#7daba1' }}
        lineStyle={{ stroke: '#7daba1', strokeWidth: '2', strokeDasharray: '5,5' }}
      />
    </ResponsiveChartContainer>
  );
}

export default Chart;
