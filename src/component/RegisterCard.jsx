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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterCard() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  axios.defaults.withCredentials = true;

  const handleRegister = async () => {
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

    try {
      const response = await axios.post(`${API}/register`, {
        email,
        username,
        password,
        confirmPassword,
      });
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    }
  };

  const onBackToLogin = () => {
    navigate("/login");
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 5,
        boxShadow: 3,
        borderRadius: 5,
      }}
    >
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
              <Button fullWidth variant="outlined" onClick={onBackToLogin}>
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
