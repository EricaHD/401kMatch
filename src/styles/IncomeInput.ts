export default {
  incomeInputStack: {
    margin: '4px 16px',
  },
  outlinedInput: {
    borderRadius: '8px',
    fontSize: '1rem',
    height: '37px',
    background: 'white',
    marginLeft: '-16px',
    // Hide arrows on right side of type="number" input box
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': { display: 'none' },
    '& input[type=number]': { MozAppearance: 'textfield' },
  },
};
