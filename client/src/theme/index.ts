import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#64D0D1',
    },
    secondary: {
      main: '#363535',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    body2: {
      color: '#707070',
    },
  },
  overrides: {},
});
