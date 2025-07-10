import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Gavel,
  Copyright,
  ContentCopy,
  Report,
  Security,
  AccountCircle,
  Description,
  Warning,
} from "@mui/icons-material";

const TermsOfUsePage = () => {
  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: <Gavel />,
      content: [
        "By accessing and using EV Smarts website, you accept and agree to be bound by these Terms of Use",
        "If you do not agree to these terms, please do not use our website",
        "We reserve the right to modify these terms at any time",
        "Continued use of the website after changes constitutes acceptance of the new terms",
      ],
    },
    {
      title: "Use of Website",
      icon: <AccountCircle />,
      content: [
        "You may use our website for personal, non-commercial purposes",
        "You agree not to use the website for any unlawful purpose",
        "You must not attempt to gain unauthorized access to our systems",
        "You are responsible for maintaining the confidentiality of your account information",
        "You agree to provide accurate and complete information when required",
      ],
    },
    {
      title: "Content and Intellectual Property",
      icon: <Copyright />,
      content: [
        "All content on this website is owned by EV Smarts or its licensors",
        "You may not reproduce, distribute, or create derivative works without permission",
        "You may share our content through social media with proper attribution",
        "Our trademarks and logos are protected and may not be used without permission",
        "User-generated content remains the property of the user",
      ],
    },
    {
      title: "User-Generated Content",
      icon: <ContentCopy />,
      content: [
        "You retain ownership of content you submit to our website",
        "By submitting content, you grant us a license to use and display it",
        "You are responsible for the accuracy and legality of your content",
        "We reserve the right to remove content that violates our policies",
        "You agree not to submit content that is defamatory, obscene, or illegal",
      ],
    },
    {
      title: "Disclaimers",
      icon: <Warning />,
      content: [
        "The information on this website is provided 'as is' without warranties",
        "We do not guarantee the accuracy, completeness, or timeliness of information",
        "Automotive information should not be considered professional advice",
        "We are not responsible for any decisions made based on our content",
        "We do not endorse or guarantee any products or services mentioned",
      ],
    },
    {
      title: "Limitation of Liability",
      icon: <Security />,
      content: [
        "EV Smarts shall not be liable for any indirect, incidental, or consequential damages",
        "Our total liability shall not exceed the amount paid by you, if any, for accessing our services",
        "We are not liable for any damages caused by third-party content or links",
        "Some jurisdictions do not allow liability limitations, so these may not apply to you",
      ],
    },
    {
      title: "Privacy and Data Protection",
      icon: <Description />,
      content: [
        "Your privacy is important to us. Please review our Privacy Policy",
        "We collect and process personal data in accordance with applicable laws",
        "You have rights regarding your personal data as outlined in our Privacy Policy",
        "We implement appropriate security measures to protect your information",
        "We may use cookies and similar technologies as described in our Privacy Policy",
      ],
    },
    {
      title: "Prohibited Activities",
      icon: <Report />,
      content: [
        "Using the website for any illegal or unauthorized purpose",
        "Attempting to interfere with or disrupt our services",
        "Collecting or harvesting personal information without consent",
        "Impersonating another person or entity",
        "Uploading viruses, malware, or other harmful code",
        "Engaging in any activity that could damage our systems or reputation",
      ],
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
              "url(https://source.unsplash.com/random/1920x1080/?legal-documents)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Gavel sx={{ fontSize: 60, mb: 2 }} />
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
              Terms of Use
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
              Please read these terms carefully before using our website and
              services.
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Introduction */}
        <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
          >
            Introduction
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
          >
            Welcome to EV Smarts. These Terms of Use govern your use of our
            website and services. By accessing or using our website, you agree
            to be bound by these terms and all applicable laws and regulations.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            If you do not agree with any of these terms, you are prohibited from
            using or accessing this website. The materials contained in this
            website are protected by applicable copyright and trademark law.
          </Typography>
        </Card>

        {/* Terms Sections */}
        {termsSections.map((section, index) => (
          <Card key={index} sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                  color: "white",
                  mr: 2,
                }}
              >
                {section.icon}
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {section.title}
              </Typography>
            </Box>
            <List>
              {section.content.map((item, itemIndex) => (
                <ListItem key={itemIndex} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "1.1rem",
                        lineHeight: 1.6,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        ))}

        {/* Governing Law */}
        <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
          >
            Governing Law
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
          >
            These Terms of Use shall be governed by and construed in accordance
            with the laws of the jurisdiction in which EV Smarts operates,
            without regard to its conflict of law provisions.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            Any disputes arising from these terms or your use of our website
            shall be resolved in the courts of competent jurisdiction in our
            operating jurisdiction.
          </Typography>
        </Card>

        {/* Contact Information */}
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
          >
            Contact Information
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
          >
            If you have any questions about these Terms of Use, please contact
            us:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              <strong>Email:</strong> legal@evsmarts.com
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              <strong>Address:</strong> 123 Auto Street, Tech City, TC 12345
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              <strong>Phone:</strong> +1 (555) 123-4567
            </Typography>
          </Box>
        </Card>

        {/* Updates Notice */}
        <Paper
          sx={{
            p: 4,
            mt: 4,
            backgroundColor: "grey.50",
            border: "1px solid",
            borderColor: "grey.200",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Changes to Terms
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            We reserve the right to modify these Terms of Use at any time. We
            will notify users of any material changes by posting the new Terms
            of Use on this page and updating the "Last updated" date. Your
            continued use of the website after such modifications constitutes
            acceptance of the updated terms.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfUsePage;
