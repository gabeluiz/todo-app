import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const coreThemeObj = {
  palette: {
    primary: {
      main: 'rgb(0, 171, 85)',
    },
    secondary: {
      main: '#4285F4',
    },
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
  shape:{
    borderRadius:10
  }
};

export const darkTheme = createMuiTheme({
  ...coreThemeObj,
  palette: {
    ...coreThemeObj.palette,
    type: 'dark'
  }
});

export const lightTheme = createMuiTheme({
  ...coreThemeObj,
  palette: {
    ...coreThemeObj.palette,
    type: 'light'
  }
});