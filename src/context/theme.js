import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Default mode, will be toggled dynamically
    primary: {
      main: "#1976d2", // Adjust primary color
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f4f6f8", // Light mode background
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
