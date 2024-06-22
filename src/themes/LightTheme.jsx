import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00796b", // Аква зеленый
    },
    secondary: {
      main: "#c51162", // Ярко-розовый
    },
    background: {
      default: "#e0f7fa", // Светло-голубой
      paper: "#ffffff", // Белый
    },
    text: {
      primary: "#212121", // Темно-серый
      secondary: "#757575", // Средне-серый
    },
  },
});
