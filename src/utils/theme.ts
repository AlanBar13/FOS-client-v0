import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFC107',
      contrastText: '#212121',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#FF9800',
    },
    success: {
      main: '#4CAF50',
    },
    info: {
      main: '#00BCD4',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
});

export default theme;
