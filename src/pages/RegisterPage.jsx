import { Box, Grid, keyframes } from "@mui/material";
import RegisterCard from "../component/RegisterCard";

const orbitAnimation = keyframes`
  0% {
    transform: rotate(0deg) translateX(50px) rotate(0deg);
  }
  50% {
    transform: rotate(180deg) translateX(50px) rotate(-180deg);
  }
  100% {
    transform: rotate(360deg) translateX(50px) rotate(-360deg);
  }
`;
const Register = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        minHeight: "100vh", // Full viewport height
        position: "relative", // Ensure proper positioning
        overflow: "hidden",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Gradient background
      }}
    >
      {/* Orbiting Circles */}
      <Box
        sx={{
          position: "absolute",
          left: "15%",
          top: "50%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          animation: `${orbitAnimation} 6s linear infinite`,
        }}
      ></Box>

      <Box
        sx={{
          position: "absolute",
          right: "60%",
          top: "10%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          animation: `${orbitAnimation} 8s linear infinite reverse`,
        }}
      ></Box>

      <Box
        sx={{
          position: "absolute",
          right: "15%",
          top: "30%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          animation: `${orbitAnimation} 8s linear infinite reverse`,
        }}
      ></Box>

      <Box
        sx={{
          position: "absolute",
          right: "15%",
          top: "30%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          animation: `${orbitAnimation} 8s linear infinite reverse`,
        }}
      ></Box>

      <Box
        sx={{
          position: "absolute",
          right: "30%",
          top: "30%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          animation: `${orbitAnimation} 8s linear infinite reverse`,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          right: "70%",
          top: "30%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          animation: `${orbitAnimation} 8s linear infinite reverse`,
        }}
      ></Box>

      {/* Login Card Centered */}
      <Grid container justifyContent="center">
        <Grid item>
          <RegisterCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
