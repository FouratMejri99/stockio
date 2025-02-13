import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggleButton;
