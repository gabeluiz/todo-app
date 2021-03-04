import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#616161',
      main: '#303030',
      dark: '#212121',
      contrastText: '#fff',
    },
    secondary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    background: {
      default: '#303030',
    },
    text: {
      primary: '#fff',
    }
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
      root: {
        "&$selected": { color:'#616161', }
      }
    },
    '&:hover:before': {
      backgroundColor: 'rgba(0, 0, 0, 0.42)'
    }
  }
});

export default theme;