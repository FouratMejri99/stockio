import { Box, Grid } from "@mui/material";
import LoginCard from "../component/logincards";
import OrbitingCircles from "../component/OrbitingCirclesDemo";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", // Align to the right
        alignItems: "center", // Center vertically
        minHeight: "100vh", // Full viewport height
        paddingRight: "4%", // Add some right padding for better spacing
        position: "relative", // Make sure that the OrbitingCircles is positioned correctly
      }}
    >
      <Grid container justifyContent="flex-end">
        <Grid item>
          {/* Wrapping OrbitingCircles in a Box with fixed dimensions */}
          <Box sx={{ position: "absolute", width: 400, height: 400 }}>
            <OrbitingCircles />
          </Box>
          <LoginCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
