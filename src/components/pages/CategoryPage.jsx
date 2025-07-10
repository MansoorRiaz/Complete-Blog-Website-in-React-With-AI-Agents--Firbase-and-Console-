import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Button,
} from "@mui/material";
import { Search, TrendingUp, Article, People } from "@mui/icons-material";
import BlogCard from "../blog/BlogCard";
import { getAllBlogs, getBlogsByCategory } from "../../utils/blogUtils";
import { formatBlogDate } from "../../utils/blogUtils";

const CategoryPage = () => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const categoryPosts = await getBlogsByCategory(category);
      setFilteredPosts(
        categoryPosts.filter((post) => {
          const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.description || "")
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          return matchesSearch;
        })
      );
    };
    fetchBlogs();
  }, [searchQuery, category]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case "evs":
        return "Electric Vehicles";
      case "non-evs":
        return "Non-Electric Vehicles";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const getCategoryDescription = (category) => {
    switch (category) {
      case "evs":
        return "Explore the latest in electric vehicle technology, reviews, and industry insights.";
      case "non-evs":
        return "Discover traditional combustion engines, hybrid technology, and automotive classics.";
      default:
        return "Browse our latest articles and insights.";
    }
  };

  const getCategoryStats = (category) => {
    const totalPosts = filteredPosts.length;
    const recentPosts = filteredPosts.filter((post) => {
      const postDate = new Date(post.publishDate);
      if (!post.publishDate || isNaN(postDate)) return false;
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return postDate > sevenDaysAgo;
    }).length;

    return [
      { icon: <Article />, number: totalPosts, label: "Total Articles" },
      {
        icon: <TrendingUp />,
        number: recentPosts,
        label: "Recent Posts (7 days)",
      },
      { icon: <People />, number: "95%", label: "Reader Satisfaction" },
    ];
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "evs":
        return "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)";
      case "non-evs":
        return "linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)";
      default:
        return "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)";
    }
  };

  const stats = getCategoryStats(category);

  const PLACEHOLDER_IMAGE = "/placeholder.svg";
  function getValidImage(image) {
    if (
      typeof image !== "string" ||
      !image.trim() ||
      image === "undefined" ||
      image === "null"
    ) {
      return PLACEHOLDER_IMAGE;
    }
    if (
      !/^https?:\/\//.test(image) &&
      !/^\//.test(image) &&
      !/^data:image\//.test(image)
    ) {
      return PLACEHOLDER_IMAGE;
    }
    return image;
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: getCategoryColor(category),
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
              category === "evs"
                ? "url(https://source.unsplash.com/random/1920x1080/?electric-car)"
                : "url(https://source.unsplash.com/random/1920x1080/?sports-car)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Chip
              label={
                category === "evs"
                  ? "Electric Vehicles"
                  : "Traditional Vehicles"
              }
              sx={{
                mb: 3,
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                fontSize: "1rem",
                py: 1,
              }}
            />
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
              {getCategoryTitle(category)}
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
              {getCategoryDescription(category)}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
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
            Category Overview
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
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
                    sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
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

        {/* Search Section */}
        <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Find Your Perfect Read
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Search through our comprehensive collection of{" "}
              {getCategoryTitle(category).toLowerCase()} articles
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={`Search ${getCategoryTitle(
                category
              ).toLowerCase()} articles...`}
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 2, color: "text.secondary" }} />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  fontSize: "1.1rem",
                },
              }}
            />
          </Box>
        </Card>

        {/* Results Section */}
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {filteredPosts.length > 0
                ? `${getCategoryTitle(category)} Articles`
                : "No Articles Found"}
            </Typography>
            <Chip
              label={`${filteredPosts.length} article${
                filteredPosts.length !== 1 ? "s" : ""
              } found`}
              color="primary"
              variant="outlined"
            />
          </Box>

          {filteredPosts.length > 0 ? (
            <Grid container spacing={4}>
              {filteredPosts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) => theme.shadows[4],
                      },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/blog/${post.id}`}
                      sx={{ flexGrow: 1 }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={getValidImage(post.image)}
                        alt={post.title}
                        sx={{ objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: "bold", lineHeight: 1.3 }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {post.description}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            {typeof post.author === "object"
                              ? typeof post.author.name === "string"
                                ? post.author.name
                                : JSON.stringify(post.author.name)
                              : typeof post.author === "string"
                              ? post.author
                              : "Anonymous Author"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {typeof post.date === "string" ||
                            typeof post.date === "number"
                              ? formatBlogDate(post.date)
                              : "—"}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No articles found for "{getCategoryTitle(category)}"
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search terms or browse other categories.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Back to Home
              </Button>
            </Paper>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default CategoryPage;
