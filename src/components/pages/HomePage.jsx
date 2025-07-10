import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import BlogCard from "../blog/BlogCard";
import {
  getAllBlogs,
  getFeaturedBlogs,
  getLatestBlogs,
} from "../../utils/blogUtils";
import AIWidget from "../ai/AIWidget";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [evPosts, setEvPosts] = useState([]);
  const [nonEvPosts, setNonEvPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await getAllBlogs();
      setEvPosts(allBlogs.filter((blog) => blog.category === "evs"));
      setNonEvPosts(allBlogs.filter((blog) => blog.category === "non-evs"));
      const featured = await getFeaturedBlogs(3);
      setFeaturedPosts(featured || []);
      const latest = await getLatestBlogs(4);
      setLatestPosts(latest || []);
    };
    fetchBlogs();
  }, []);

  const handleSubscribe = (event) => {
    event.preventDefault();
    console.log("Subscribe:", email);
    setEmail("");
  };

  const PostSection = ({
    title,
    posts,
    showViewMore = false,
    viewMorePath = null,
  }) => (
    <Paper
      elevation={3}
      sx={{
        mb: 6,
        p: 4,
        borderRadius: 3,
        border: "2px solid",
        borderColor: "primary.main",
        backgroundColor: "background.paper",
        "&:hover": {
          boxShadow: (theme) => theme.shadows[8],
          transform: "translateY(-2px)",
        },
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {title}
        </Typography>
        {showViewMore && viewMorePath && (
          <Button
            component={Link}
            to={viewMorePath}
            variant="outlined"
            color="primary"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            View More
          </Button>
        )}
      </Box>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
            <BlogCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  return (
    <Box>
      <AIWidget
        title="EV Expert"
        subtitle="Ask me about electric vehicles and car specs"
        position="bottom-right"
        suggestedQuestions={[
          "Tell me about Tesla Model 3",
          "What are the benefits of EVs?",
          "Show me electric SUVs",
          "How does EV charging work?",
        ]}
      />
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          position: "relative",
          height: "70vh",
          minHeight: 500,
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/1000_F_437936229_k6vbcEJRZm8tUeEJd7UImctIhG1fxCcY.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 3,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              All things EVs and the best of non-EVs
            </Typography>

            {/* Subscription Box */}
            <Paper
              elevation={8}
              sx={{
                p: 4,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: 3,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubscribe}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  Subscribe to our newsletter
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  sx={{ backgroundColor: "white" }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  Get all the latest industry news and stories 100% free
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Become a subscriber
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Featured Posts */}
        <PostSection title="Featured Posts" posts={featuredPosts} />

        {/* Latest Posts */}
        <PostSection
          title="Latest Posts"
          posts={latestPosts}
          showViewMore={false}
        />

        {/* EV Posts Section */}
        <PostSection
          title="Electric Vehicles"
          posts={evPosts.slice(0, 4)}
          showViewMore={true}
          viewMorePath="/category/evs"
        />

        {/* Non-EV Posts Section */}
        <PostSection
          title="Non-Electric Vehicles"
          posts={nonEvPosts.slice(0, 4)}
          showViewMore={true}
          viewMorePath="/category/non-evs"
        />
      </Container>
    </Box>
  );
};

export default HomePage;
