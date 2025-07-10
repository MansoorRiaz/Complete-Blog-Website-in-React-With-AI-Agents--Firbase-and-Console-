import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const footerLinks = [
  { title: "Privacy Policy", path: "/privacy-policy" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "RSS Feed", path: "/rss" },
  { title: "Terms of Use", path: "/terms" },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              EV Blog
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your trusted source for electric vehicle news and insights.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              {footerLinks.map((link) => (
                <Box component="li" key={link.title} sx={{ pb: 1 }}>
                  <MuiLink
                    component={Link}
                    to={link.path}
                    color="text.secondary"
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {link.title}
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Subscribe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Subscribe to our newsletter for the latest updates.
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"© "}
            {new Date().getFullYear()}
            {" EV Blog. All rights reserved."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
