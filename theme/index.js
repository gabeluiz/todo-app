import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(0, 171, 85)',
      dark: '#007B55',
    },
    secondary: {
      light: '#7986cb',
      main: '#4285F4',
      dark: '#303f9f',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    background: {
      paper: '#212B36',
      default: '#161C24',
    },
    action:{
      hover:'#20262F',
      selected:'rgba(0, 171, 85, 0.16)',
      active:'rgb(0, 171, 85)',
    },
    type:"dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiListItem: {
      // root: {
      //   "&$selected": { color:'#616161', }
      // }
    },
    // '&:hover:before': {
    //   backgroundColor: 'rgba(0, 0, 0, 0.42)'
    // }
  },
  shape:{
    borderRadius:10
  }
});

export default theme;