import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
  Avatar,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  YouTube,
  Share,
  RssFeed,
  TrendingUp,
  People,
  Article,
  ThumbUp,
} from "@mui/icons-material";

const AboutPage = () => {
  const socialLinks = [
    { icon: <YouTube />, label: "Subscribe on Youtube", url: "#" },
    { icon: <Share />, label: "Follow on TikTok", url: "#" },
    { icon: <Instagram />, label: "Follow on Instagram", url: "#" },
    { icon: <Facebook />, label: "Like our Facebook Page", url: "#" },
    { icon: <RssFeed />, label: "Follow on Flipboard", url: "#" },
  ];

  const stats = [
    { icon: <Article />, number: "500+", label: "Articles Published" },
    { icon: <People />, number: "50K+", label: "Monthly Readers" },
    { icon: <TrendingUp />, number: "95%", label: "Reader Satisfaction" },
    { icon: <ThumbUp />, number: "4.9/5", label: "Average Rating" },
  ];

  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & Editor-in-Chief",
      image: "https://source.unsplash.com/random/200x200/?man-portrait",
      bio: "Automotive enthusiast with 15+ years of experience in EV technology and traditional vehicles.",
    },
    {
      name: "Sarah Chen",
      role: "Senior EV Analyst",
      image: "https://source.unsplash.com/random/200x200/?woman-portrait",
      bio: "Expert in electric vehicle technology and market trends with a focus on Chinese manufacturers.",
    },
    {
      name: "Michael Rodriguez",
      role: "Performance Car Specialist",
      image: "https://source.unsplash.com/random/200x200/?person-portrait",
      bio: "Former racing driver and automotive journalist specializing in high-performance vehicles.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          py: 8,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "url(https://source.unsplash.com/random/1920x1080/?electric-car)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              About EV Smarts
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                maxWidth: 800,
                mx: "auto",
              }}
            >
              Your trusted source for electric vehicle insights and automotive
              excellence
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {/* Mission Statement */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="h5"
                paragraph
                sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}
              >
                Welcome to EV Smarts, where we talk EVs in general and also
                branch out into some broader auto topics. There are some great
                non-EVs too, right?
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
              >
                My introduction to EVs actually came while walking through a
                mall in Asia and seeing a BYD dealership. It was the first I'd
                heard of the brand, but I was immediately interested. Since that
                time, I've become a fan of not just BYD cars, but EVs in
                general.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
              >
                But if you're interested in BYD cars, you're in the right place
                because they are very close to my heart.
              </Typography>
            </Card>

            {/* Personal Story */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                My Journey
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
              >
                You can learn more about me on{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Muckrack
                </a>
                ,{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Wikipedia
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Automated Home
                </a>{" "}
                if you're interested in smart home tech.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                Happy driving and I hope you find exploring this website
                enjoyable. Feel free to connect with us on socials.
              </Typography>
            </Card>

            {/* Statistics Section */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                Our Impact
              </Typography>
              <Grid container spacing={3}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Box sx={{ textAlign: "center", p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 2,
                          color: "primary.main",
                          fontSize: "2rem",
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          color: "primary.main",
                          mb: 1,
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>

            {/* Team Section */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                Meet Our Team
              </Typography>
              <Grid container spacing={4}>
                {teamMembers.map((member, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Box sx={{ textAlign: "center" }}>
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: 120,
                          height: 120,
                          mx: "auto",
                          mb: 2,
                          border: "4px solid",
                          borderColor: "primary.main",
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {member.name}
                      </Typography>
                      <Chip
                        label={member.role}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {member.bio}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>

            {/* Connect Section */}
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                Connect With Us
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {socialLinks.map((social, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Button
                      variant="outlined"
                      startIcon={social.icon}
                      fullWidth
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        py: 1.5,
                        fontSize: "0.9rem",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                          transform: "translateY(-2px)",
                          boxShadow: 2,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {social.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: "sticky", top: 100 }}>
              {/* Profile Card */}
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  mb: 4,
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image="https://source.unsplash.com/random/400x300/?bmw-ix3"
                  alt="Electric Vehicle Innovation"
                  sx={{ objectFit: "cover" }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, textAlign: "center", mb: 2 }}
                  >
                    Driving the Future of Automotive Excellence
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    Experiencing the perfect blend of luxury and electric
                    innovation
                  </Typography>
                </Box>
              </Card>

              {/* Quick Links */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "background.paper",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3 }}
                >
                  EV Smarts
                </Typography>

                <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                  Follow on
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    fullWidth
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      py: 1,
                      fontSize: "0.9rem",
                      justifyContent: "flex-start",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        transform: "translateY(-1px)",
                        boxShadow: 1,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Visit evsmarts TikTok Page
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Facebook />}
                    fullWidth
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      py: 1,
                      fontSize: "0.9rem",
                      justifyContent: "flex-start",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        transform: "translateY(-1px)",
                        boxShadow: 1,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Visit evsmarts Facebook Page
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Instagram />}
                    fullWidth
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      py: 1,
                      fontSize: "0.9rem",
                      justifyContent: "flex-start",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        transform: "translateY(-1px)",
                        boxShadow: 1,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Visit evsmarts Instagram Page
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
