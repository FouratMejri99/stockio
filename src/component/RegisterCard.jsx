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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function RegisterCard() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);

  // Handle registration
  const handleRegister = () => {
    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!agreeToRules) {
      alert("You must agree to the website rules.");
      return;
    }
    alert(`Registration successful! Welcome, ${username}.`);
  };

  const onBackToLogin = () => {
    navigate("/login");
  };
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          {/* Confirm Password Field */}
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={handleRegister}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={onBackToLogin}
              >
                Back to Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RegisterCard;
