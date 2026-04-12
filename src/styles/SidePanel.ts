import titleBackground from '../../images/titleBackground.jpeg';

export default {
  divider: {
    margin: '30px 0',
    background: 'gray',
  },
  inputStack: {
    alignItems: 'center',
    marginBottom: '30px',
  },
  inputs: {
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  titleBackgroundImage: {
    width: 500,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 500,
      boxSizing: 'border-box',
      backgroundImage: `url(${titleBackground})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  },
};
