import { CUMULATIVE_COLOR } from '../utils/colors';

export default {
  contributionInfo: {
    borderRadius: '10px',
    marginTop: '15px',
    padding: '10px',
    textAlign: 'center',
    width: '330px',
  },
  gauge: {
    [`& .MuiGauge-valueText`]: {
      fontSize: 40,
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    },
    [`& .MuiGauge-valueArc`]: {
      fill: CUMULATIVE_COLOR,
    },
  },
};
