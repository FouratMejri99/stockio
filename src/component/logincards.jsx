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
import CoolMode from "../component/magicui/coolmode";
import { useNotificationContext } from "../context/notification";

function LoginCard() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);
  const { addNotification } = useNotificationContext();
  const [errorMessage, setErrorMessage] = useState(""); // For storing error messages
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (!agreeToRules) {
      setErrorMessage("You must agree to the website rules.");
      return;
    }

    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/stocklist");
        addNotification("Account logged in!");
        setErrorMessage(""); // Reset error message on successful login
      } else {
        setErrorMessage("Login failed. No token received.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`Login failed: ${error.message}`);
    }
  };

  const handleRegister = () => {
    navigate("/register");
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
          {/* Email Field */}
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
          {/* Display Error Message */}
          {errorMessage && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
          {/* Buttons */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <CoolMode>
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
              </CoolMode>
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
