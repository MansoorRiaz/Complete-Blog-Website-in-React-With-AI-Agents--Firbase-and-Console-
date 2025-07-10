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
  Security,
  Visibility,
  DataUsage,
  Cookie,
  Email,
  LocationOn,
  Share,
  Delete,
} from "@mui/icons-material";

const PrivacyPolicyPage = () => {
  const policySections = [
    {
      title: "Information We Collect",
      icon: <DataUsage />,
      content: [
        "Personal information (name, email address) when you subscribe to our newsletter",
        "Usage data and analytics to improve our website experience",
        "Cookies and similar technologies to enhance your browsing experience",
        "Information you provide when contacting us or leaving comments",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <Visibility />,
      content: [
        "To provide and maintain our website and services",
        "To send you newsletters and updates about automotive content",
        "To respond to your inquiries and provide customer support",
        "To analyze website usage and improve our content",
        "To comply with legal obligations and protect our rights",
      ],
    },
    {
      title: "Information Sharing",
      icon: <Share />,
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share information with trusted service providers who assist us in operating our website",
        "We may disclose information if required by law or to protect our rights and safety",
        "Aggregated, non-personal information may be shared for analytics purposes",
      ],
    },
    {
      title: "Data Security",
      icon: <Security />,
      content: [
        "We implement appropriate security measures to protect your personal information",
        "Your data is stored securely and accessed only by authorized personnel",
        "We regularly review and update our security practices",
        "However, no method of transmission over the internet is 100% secure",
      ],
    },
    {
      title: "Cookies and Tracking",
      icon: <Cookie />,
      content: [
        "We use cookies to enhance your browsing experience",
        "Essential cookies are necessary for website functionality",
        "Analytics cookies help us understand how visitors use our site",
        "You can control cookie settings through your browser preferences",
      ],
    },
    {
      title: "Your Rights",
      icon: <Email />,
      content: [
        "Access and review your personal information",
        "Request correction of inaccurate information",
        "Request deletion of your personal data",
        "Opt-out of marketing communications",
        "Withdraw consent for data processing",
      ],
    },
    {
      title: "Data Retention",
      icon: <LocationOn />,
      content: [
        "We retain your information for as long as necessary to provide our services",
        "Newsletter subscription data is kept until you unsubscribe",
        "Analytics data is retained for up to 2 years",
        "Contact form submissions are retained for 1 year",
      ],
    },
    {
      title: "Data Deletion",
      icon: <Delete />,
      content: [
        "You can request deletion of your personal information at any time",
        "Contact us at privacy@evsmarts.com to submit deletion requests",
        "We will process your request within 30 days",
        "Some information may be retained for legal or legitimate business purposes",
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
              "url(https://source.unsplash.com/random/1920x1080/?privacy-security)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Security sx={{ fontSize: 60, mb: 2 }} />
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
              Privacy Policy
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
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
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
            At EV Smarts, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website and use our services.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            By using our website, you consent to the collection and use of
            information in accordance with this policy. If you have any
            questions about this Privacy Policy, please contact us at{" "}
            <strong>privacy@evsmarts.com</strong>.
          </Typography>
        </Card>

        {/* Policy Sections */}
        {policySections.map((section, index) => (
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

        {/* Contact Information */}
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
          >
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              <strong>Email:</strong> privacy@evsmarts.com
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
            Updates to This Policy
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date. We encourage you to review
            this Privacy Policy periodically for any changes.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
