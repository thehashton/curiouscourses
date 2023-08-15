import { ThemeOptions } from "@mui/material";

const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#2250B8",
      light: "#658de9",
      dark: "#163b8d",
    },
    secondary: {
      main: "#5D849B",
      light: "#99bed4",
      dark: "#334a58",
    },
    background: {
      default: "#fff",
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
      default: "#242424",
    },
    body1: {
      color: "#242424",
    },
  },
};

export default lightTheme;
