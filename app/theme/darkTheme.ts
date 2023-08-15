import { ThemeOptions } from "@mui/material";

const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#2250B8",
      light: "#658de9",
      dark: "#163b8d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1829EC",
      light: "#8088ed",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#e4d6f1",
    },
    background: {
      default: "#242424",
    },
    text: {
      primary: "#fff",
    },
    success: {
      main: "#1AA403",
      dark: "#0f5903",
      light: "#8bdf7d",
    },
    warning: {
      main: "#D4BF00",
      dark: "#b58c04",
      light: "#e2d885",
    },
    error: {
      main: "#A40303",
      dark: "#6b0303",
      light: "#e76060",
    },
  },
  typography: {
    h1: {
      default: "#fff",
    },
    body1: {
      color: "#fff",
    },
  },
};

export default darkTheme;
