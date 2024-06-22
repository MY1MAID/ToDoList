import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#03dac6",
    },
    secondary: {
      main: "#03dac6", // Аква зеленый
    },
    background: {
      default: "#121212", // Очень темный серый
      paper: "#1e1e1e", // Темный серый
    },
    text: {
      primary: "#ffffff", // Белый
      secondary: "#b0bec5", // Светло-серый
    },
  },
});
