import React, { useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const DemoAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    // Replace this with real authentication logic
    if (username && password) {
      // Simulate successful login
      window.location.reload(); // Or call your auth logic
    } else {
      setError("Please enter both username and password.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        🔐 Login to Post Blogs
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
        placeholder="Enter username"
        autoComplete="username"
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          placeholder="Enter password"
          autoComplete="current-password"
        />
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        disabled={!username.trim() || !password.trim()}
        sx={{ textTransform: "none", py: 1.5 }}
      >
        Login
      </Button>
    </Card>
  );
};

export default DemoAuth;
