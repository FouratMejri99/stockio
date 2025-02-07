import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios"; // Add axios import for making API requests
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../context/notification";

function LoginCard() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);
  const { addNotification } = useNotificationContext();

  // Handle form submission
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    if (!agreeToRules) {
      alert("You must agree to the website rules.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Save token in localStorage
        localStorage.setItem("token", response.data.token);
        alert(response.data.message);

        navigate("/stocklist");
        addNotification("Account logged in!");
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = () => {
    alert("Redirecting to registration page...");
    navigate("/register");
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          noWrap
          align="center"
          sx={{
            flexGrow: 1,
            fontFamily: '"Housttely Signature", cursive',
            fontSize: "1rem",
          }}
        >
          Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          {/* Username Field */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Agree to Rules Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeToRules}
                onChange={(e) => setAgreeToRules(e.target.checked)}
                color="primary"
              />
            }
            label="I agree to the website rules"
          />
          {/* Buttons */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    flexGrow: 1,
                    fontFamily: '"Housttely Signature", cursive',
                    fontSize: "1rem",
                  }}
                >
                  Login
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleRegister}
              >
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    flexGrow: 1,
                    fontFamily: '"Housttely Signature", cursive',
                    fontSize: "1rem",
                  }}
                >
                  Register
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LoginCard;
