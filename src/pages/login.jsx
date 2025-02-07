import { Box, Grid } from "@mui/material";
import LoginCard from "../component/logincards";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        minHeight: "100vh", // Full viewport height
        position: "relative", // Ensure proper positioning
      }}
    >
      {/* Orbiting Circles Positioned Separately */}
      <Box
        sx={{
          position: "absolute",
          left: "10%", // Adjust position to the left
          top: "50%",
          transform: "translateY(-50%)",
          width: 200,
          height: 200,
        }}
      ></Box>

      {/* Login Card Centered */}
      <Grid container justifyContent="center">
        <Grid item>
          <LoginCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
