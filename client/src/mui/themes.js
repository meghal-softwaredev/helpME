import { createTheme } from "@mui/material/styles";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_GRAY_LIGHT,
  COLOR_WHITE,
  COLOR_GRAY_DARK,
} from "../constants/colorConstants";

const darkTheme = createTheme({
  components: {
    // Name of the component
    divider: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          background: COLOR_GRAY_LIGHT,
        },
      },
    },
  },
  status: {
    danger: "#e53e3e",
  },
  palette: {
    mode: "dark",
    primary: {
      main: COLOR_WHITE,
    },
    secondary: {
      main: COLOR_SECONDARY,
    },
    /* neutral: {
      main: '#64748B',
      contrastText: '#fff',
    }, */
  },
});

export { darkTheme };
