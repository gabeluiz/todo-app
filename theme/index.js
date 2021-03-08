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
      main: '#4285F4',
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
      paper: '#303030',
      default: '#282828',
    },
    text: {
      primary: '#fff',
    },
    action: {
      hover:'rgba(255, 255, 255, 0.08)',
      selected:'rgba(255, 255, 255, 0.03)',
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