import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  Paper,
  TextField,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Share,
  Email,
  Phone,
  LocationOn,
  Schedule,
  ExpandMore,
  Send,
  Message,
} from "@mui/icons-material";
import AIWidget from "../ai/AIWidget";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const socialLinks = [
    { icon: <Share />, label: "Visit evsmarts TikTok Page", url: "#" },
    { icon: <Facebook />, label: "Visit evsmarts Facebook Page", url: "#" },
    { icon: <Instagram />, label: "Visit evsmarts Instagram Page", url: "#" },
  ];

  const contactMethods = [
    {
      icon: <Email />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "name@evsmarts.com",
      action: "Send Email",
      color: "#1976d2",
    },
    {
      icon: <Phone />,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      action: "Call Now",
      color: "#4CAF50",
    },
    {
      icon: <LocationOn />,
      title: "Visit Us",
      description: "Our office location",
      value: "123 Auto Street, Tech City, TC 12345",
      action: "Get Directions",
      color: "#FF9800",
    },
    {
      icon: <Schedule />,
      title: "Business Hours",
      description: "When we're available",
      value: "Mon-Fri: 9AM-6PM EST",
      action: "View Schedule",
      color: "#9C27B0",
    },
  ];

  const faqs = [
    {
      question: "How quickly do you respond to emails?",
      answer:
        'We typically respond to all emails within 24 hours during business days. For urgent matters, please include "URGENT" in your subject line.',
    },
    {
      question: "Can I contribute articles to EV Smarts?",
      answer:
        "Yes! We welcome guest contributions from automotive enthusiasts and industry professionals. Please email us with your article proposal.",
    },
    {
      question: "Do you accept advertising or sponsored content?",
      answer:
        "We do work with select automotive brands and companies. Please contact us to discuss partnership opportunities.",
    },
    {
      question: "How can I stay updated with your latest content?",
      answer:
        "Subscribe to our newsletter, follow us on social media, or bookmark our website for the latest automotive news and reviews.",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <AIWidget
        title="Contact Help"
        subtitle="Ask me about our contact info or business hours"
        position="bottom-left"
        suggestedQuestions={[
          "What's your email?",
          "What are your business hours?",
          "Where are you located?",
          "How quickly do you respond?",
        ]}
      />
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
              "url(https://source.unsplash.com/random/1920x1080/?contact)",
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
              Get in Touch
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
              Whether it's praise for something you liked, letting us know that
              something isn't quite right, or to inquire about a potential
              collaboration, we'd love to hear from you.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {/* Contact Methods */}
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
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                {contactMethods.map((method, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ p: 3, textAlign: "center", height: "100%" }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          mx: "auto",
                          mb: 2,
                          backgroundColor: method.color,
                        }}
                      >
                        {method.icon}
                      </Avatar>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {method.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {method.description}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {method.value}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={method.icon}
                        sx={{ textTransform: "none", borderRadius: 2 }}
                      >
                        {method.action}
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>

            {/* Contact Form */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                Send Us a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={4}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<Send />}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        py: 1.5,
                        px: 4,
                        fontWeight: 600,
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>

            {/* FAQ Section */}
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
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
                Frequently Asked Questions
              </Typography>
              {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ mb: 2, borderRadius: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: "sticky", top: 100 }}>
              {/* Response Time Card */}
              <Card
                sx={{
                  p: 4,
                  mb: 4,
                  borderRadius: 3,
                  boxShadow: 3,
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    backgroundColor: "primary.main",
                  }}
                >
                  <Message sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Quick Response
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  We do our best to respond to emails as quickly as possible,
                  typically within 24 hours during business days.
                </Typography>
                <Chip
                  label="24 Hour Response"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Card>

              {/* Social Links */}
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
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      startIcon={social.icon}
                      fullWidth
                      href={social.url}
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
                      {social.label}
                    </Button>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
