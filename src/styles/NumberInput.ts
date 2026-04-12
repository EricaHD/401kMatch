export default {
  incrementButton: {
    borderRadius: '0.375rem 0 0 0.375rem',
    height: '37px',
    paddingTop: '9px',
  },
  decrementButton: {
    borderRadius: '0 0.375rem 0.375rem 0',
    height: '37px',
    paddingTop: '9px',
  },
  numberInput: {
    width: '60px',
    paddingLeft: '16px',
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