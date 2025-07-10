import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Button,
  Paper,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import {
  RssFeed,
  Download,
  ContentCopy,
  CheckCircle,
  Share,
} from "@mui/icons-material";
import { generateRSSFeed, downloadRSSFeed } from "../../utils/rssGenerator";

const RSSFeedPage = () => {
  const [rssContent, setRssContent] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const content = generateRSSFeed();
    setRssContent(content);
  }, []);

  const handleCopyRSS = async () => {
    try {
      await navigator.clipboard.writeText(rssContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy RSS feed:", err);
    }
  };

  const handleDownloadRSS = () => {
    downloadRSSFeed();
  };

  const handleShareRSS = () => {
    const url = window.location.origin + "/rss.xml";
    if (navigator.share) {
      navigator.share({
        title: "EV Smarts RSS Feed",
        text: "Subscribe to our RSS feed for the latest automotive content",
        url: url,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          py: 6,
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
              "url(https://source.unsplash.com/random/1920x1080/?rss-feed)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <RssFeed sx={{ fontSize: 60, mb: 2 }} />
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
              RSS Feed
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
              Stay updated with our latest automotive content. Subscribe to our
              RSS feed and never miss an article.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {/* RSS Feed Info */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                About Our RSS Feed
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
              >
                Our RSS feed provides you with instant access to all our latest
                articles about electric vehicles, traditional automobiles, and
                the future of mobility. Subscribe to stay informed about the
                latest developments in the automotive industry.
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  What's Included:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    All blog posts from both EV and Non-EV categories
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Article summaries and full content previews
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Author information and publication dates
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    High-quality images for each article
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Automatic updates when new content is published
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Download />}
                  onClick={handleDownloadRSS}
                  sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
                >
                  Download RSS Feed
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={copied ? <CheckCircle /> : <ContentCopy />}
                  onClick={handleCopyRSS}
                  sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
                >
                  {copied ? "Copied!" : "Copy RSS URL"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Share />}
                  onClick={handleShareRSS}
                  sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
                >
                  Share Feed
                </Button>
              </Box>
            </Card>

            {/* RSS Feed Content Preview */}
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                RSS Feed Preview
              </Typography>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  maxHeight: 600,
                  overflow: "auto",
                  border: "1px solid #ddd",
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {rssContent}
                </pre>
              </Paper>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: "sticky", top: 100 }}>
              {/* RSS Feed URL */}
              <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
                >
                  RSS Feed URL
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "#f8f9fa",
                    borderRadius: 2,
                    border: "1px solid #e9ecef",
                    wordBreak: "break-all",
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                  }}
                >
                  {window.location.origin}/rss.xml
                </Paper>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  Copy this URL and add it to your RSS reader
                </Typography>
              </Card>

              {/* Popular RSS Readers */}
              <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
                >
                  Popular RSS Readers
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    href="https://feedly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      justifyContent: "flex-start",
                    }}
                  >
                    Feedly
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    href="https://www.inoreader.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      justifyContent: "flex-start",
                    }}
                  >
                    Inoreader
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    href="https://netnewswire.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      justifyContent: "flex-start",
                    }}
                  >
                    NetNewsWire
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    href="https://www.newsblur.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      justifyContent: "flex-start",
                    }}
                  >
                    NewsBlur
                  </Button>
                </Box>
              </Card>

              {/* RSS Feed Stats */}
              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
                >
                  Feed Statistics
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Total Articles:</Typography>
                    <Chip label="19" size="small" color="primary" />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">EV Articles:</Typography>
                    <Chip label="10" size="small" color="success" />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Non-EV Articles:</Typography>
                    <Chip label="9" size="small" color="info" />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Last Updated:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RSSFeedPage;
