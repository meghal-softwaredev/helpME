import { createTheme } from '@mui/material/styles';
import {COLOR_PRIMARY} from '../constants/colorConstants';

const darkTheme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: COLOR_PRIMARY
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export { darkTheme };