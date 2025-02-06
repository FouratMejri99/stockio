import { Box, Grid } from "@mui/material";
import RegisterCard from "../component/RegisterCard";

const Register = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", // Align to the right
        alignItems: "center", // Center vertically
        minHeight: "100vh", // Full viewport height
        paddingRight: "4%", // Add some right padding for better spacing
      }}
    >
      {/* Wrapping OrbitingCirclesDemo in a Box with fixed dimensions */}

      <Grid container justifyContent="flex-end">
        <Grid item>
          <RegisterCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
