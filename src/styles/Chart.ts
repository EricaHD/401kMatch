import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { PAY_PERIOD_COLOR, CUMULATIVE_COLOR } from '../utils/colors';

export default {
  axisColors: {
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
  },
};
