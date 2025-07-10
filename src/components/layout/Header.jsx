import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RssFeed, Email, Edit } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
// Logo is served from public directory

const categories = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "EVs", path: "/category/evs" },
  { name: "Non EVs", path: "/category/non-evs" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const { isAuthor, login } = useAuth();
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate ? useNavigate() : () => {};

  // Check if user is already subscribed
  React.useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
    if (userEmail && subscribers.includes(userEmail)) {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      // Store subscription in localStorage
      const subscribers = JSON.parse(
        localStorage.getItem("subscribers") || "[]"
      );
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
      }
      localStorage.setItem("userEmail", email);
      setIsSubscribed(true);
      setShowSubscribeDialog(false);
      setShowSuccessMessage(true);
      setEmail("");
    }
  };

  const handleSubscribeClick = () => {
    if (isSubscribed) {
      setShowSuccessMessage(true);
    } else {
      setShowSubscribeDialog(true);
    }
  };

  const handleLogin = () => {
    if (login(loginUsername, loginPassword)) {
      setLoginDialogOpen(false);
      setLoginError("");
      setLoginUsername("");
      setLoginPassword("");
      window.location.href = "/post-blog";
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src="/logo.svg"
              alt="EV Blog Logo"
              style={{ width: 40, height: 40 }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
            {categories.map((category) => (
              <Button
                key={category.name}
                component={Link}
                to={category.path}
                sx={{
                  mx: 2,
                  color: "text.primary",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="RSS Feed">
              <IconButton
                component={Link}
                to="/rss"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                <RssFeed />
              </IconButton>
            </Tooltip>

            {!isAuthor && (
              <>
                <Tooltip title="Admin Login">
                  <IconButton
                    onClick={() => setLoginDialogOpen(true)}
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none", borderRadius: 2, ml: 1 }}
                  onClick={() => setLoginDialogOpen(true)}
                >
                  Login
                </Button>
                <Dialog
                  open={loginDialogOpen}
                  onClose={() => setLoginDialogOpen(false)}
                >
                  <DialogTitle>Admin Login</DialogTitle>
                  <DialogContent>
                    {loginError && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {loginError}
                      </Alert>
                    )}
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Username"
                      type="text"
                      fullWidth
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      autoComplete="username"
                    />
                    <TextField
                      margin="dense"
                      label="Password"
                      type="password"
                      fullWidth
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setLoginDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleLogin} variant="contained">
                      Login
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}

            <Button
              color="primary"
              variant="contained"
              onClick={handleSubscribeClick}
              startIcon={isSubscribed ? <Email /> : null}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
              }}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Subscription Dialog */}
      <Dialog
        open={showSubscribeDialog}
        onClose={() => setShowSubscribeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "primary.main" }}>
          Subscribe to EV Smarts
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Get unlimited access to all our premium automotive content.
            Subscribe for free and never miss an update!
          </Typography>
          <Box component="form" onSubmit={handleSubscribe}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              placeholder="Enter your email address"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubscribeDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubscribe}
            variant="contained"
            color="primary"
            disabled={!email || !email.includes("@")}
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccessMessage(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {isSubscribed
            ? "You're already subscribed! Thanks for being part of our community."
            : "Successfully subscribed! Welcome to EV Smarts!"}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;
