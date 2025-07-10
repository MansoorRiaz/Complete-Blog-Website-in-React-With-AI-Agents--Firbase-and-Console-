import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Chip,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextareaAutosize,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ThumbUp,
  ThumbDown,
  Feedback,
  Share,
  Bookmark,
  Visibility,
  Favorite,
  Send,
  Close,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  Email,
  Comment,
} from "@mui/icons-material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlogById, getLatestBlogs } from "../../utils/blogUtils";
import { getPostReadTime } from "../../utils/readTimeCalculator";
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  onValue,
  update,
} from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";

const BlurredContent = styled(Box)(({ theme }) => ({
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
    background: "linear-gradient(transparent, white)",
    pointerEvents: "none",
  },
}));

const ShareButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
  height: 50,
  borderRadius: 25,
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: 3,
  },
  transition: "all 0.3s ease",
}));

const BlogPost = () => {
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const db = getDatabase();
  const userEmail = localStorage.getItem("userEmail") || "";
  const { isAuthor } = useAuth();
  const navigate = useNavigate ? useNavigate() : () => {};

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setNotFound(false);
      const blog = await getBlogById(id);
      if (blog) {
        setPost(blog);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (!post?.id) return;
    const commentsRef = ref(db, `comments/${post.id}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const commentsArr = Object.values(data).sort(
        (a, b) => b.timestamp - a.timestamp
      );
      setComments(commentsArr);
    });
    return () => unsubscribe();
  }, [post?.id]);

  useEffect(() => {
    if (!post?.id) return;
    // Listen for like/dislike/share counts
    const likesRef = ref(db, `likes/${post.id}/count`);
    const dislikesRef = ref(db, `dislikes/${post.id}/count`);
    const sharesRef = ref(db, `shares/${post.id}/count`);
    const unsubLikes = onValue(likesRef, (snapshot) => {
      setLikeCount(snapshot.val() || 0);
    });
    const unsubDislikes = onValue(dislikesRef, (snapshot) => {
      setDislikeCount(snapshot.val() || 0);
    });
    const unsubShares = onValue(sharesRef, (snapshot) => {
      setShareCount(snapshot.val() || 0);
    });
    return () => {
      unsubLikes();
      unsubDislikes();
      unsubShares();
    };
  }, [post?.id]);

  useEffect(() => {
    if (!userEmail) return;
    const subsRef = ref(db, `subscribers/${userEmail.replace(/\W/g, "_")}`);
    const unsubscribe = onValue(subsRef, (snapshot) => {
      setIsSubscribed(!!snapshot.val());
    });
    return () => unsubscribe();
  }, [userEmail]);

  useEffect(() => {
    // Fetch latest posts (excluding current post)
    const fetchLatest = async () => {
      const latest = await getLatestBlogs(10);
      setLatestPosts(latest.filter((p) => p.id !== id).slice(0, 3));
    };
    fetchLatest();
    if (post) {
      // Add to recently viewed
      const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updatedViewed = [
        post,
        ...viewed.filter((p) => p.id !== post.id),
      ].slice(0, 5);
      setRecentlyViewed(updatedViewed);
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));
    }
  }, [post, id]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    // Store the original email as a value under the sanitized key
    const sanitizedKey = email.replace(/\W/g, "_");
    const subsRef = ref(db, `subscribers/${sanitizedKey}`);
    await set(subsRef, { email });
    setIsSubscribed(true);
    setShowSubscriptionDialog(false);
  };

  const handleLike = async () => {
    if (!post?.id) return;
    const likesRef = ref(db, `likes/${post.id}/count`);
    await set(likesRef, likeCount + 1);
  };

  const handleDislike = async () => {
    if (!post?.id) return;
    const dislikesRef = ref(db, `dislikes/${post.id}/count`);
    await set(dislikesRef, dislikeCount + 1);
  };

  const handleFeedback = () => {
    if (feedback.trim()) {
      // Store feedback
      const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
      feedbacks.push({
        postId: post.id,
        feedback: feedback,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
      setFeedback("");
      setShowFeedbackDialog(false);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() && userName.trim()) {
      const comment = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userName,
        comment: newComment,
        timestamp: Date.now(),
      };
      const commentsRef = ref(db, `comments/${post.id}/${comment.id}`);
      await set(commentsRef, comment);
      setNewComment("");
    }
  };

  const handleShare = async (platform) => {
    if (!post?.id) return;
    const sharesRef = ref(db, `shares/${post.id}/count`);
    await set(sharesRef, shareCount + 1);
    // Existing share logic
    const url = window.location.href;
    const title = post.title;
    const text = post.description;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      email: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(`${text}\n\nRead more: ${url}`)}`,
    };
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const sharePlatforms = [
    {
      name: "Facebook",
      icon: <Facebook />,
      color: "#1877F2",
      platform: "facebook",
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      color: "#1DA1F2",
      platform: "twitter",
    },
    {
      name: "LinkedIn",
      icon: <LinkedIn />,
      color: "#0077B5",
      platform: "linkedin",
    },
    {
      name: "WhatsApp",
      icon: <WhatsApp />,
      color: "#25D366",
      platform: "whatsapp",
    },
    {
      name: "Email",
      icon: <Email />,
      color: "#EA4335",
      platform: "email",
    },
  ];

  const SidebarPost = ({ post, title }) => (
    <Card sx={{ mb: 2, display: "flex", height: 80 }}>
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80 }}
        image={post.image}
        alt={post.title}
      />
      <CardContent sx={{ flex: 1, p: 1.5 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            lineHeight: 1.2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(post.publishDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (notFound) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" color="error" gutterBottom>
          Blog Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The blog post you are looking for does not exist or was deleted.
        </Typography>
        <Button variant="outlined" sx={{ mt: 3 }} component={Link} to="/">
          Back to Home
        </Button>
      </Container>
    );
  }

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
            backgroundImage: `url(${post.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Chip
              label={
                post.category === "evs"
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
                fontSize: { xs: "2rem", md: "3rem" },
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {post.title}
            </Typography>

            {/* Author and Metadata Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Avatar
                src={
                  typeof post.author === "object" &&
                  typeof post.author.image === "string" &&
                  post.author.image.trim() !== ""
                    ? post.author.image
                    : "/placeholder.svg"
                }
                alt={
                  typeof post.author === "object"
                    ? typeof post.author.name === "string"
                      ? post.author.name
                      : JSON.stringify(post.author.name)
                    : typeof post.author === "string"
                    ? post.author
                    : "Anonymous Author"
                }
                sx={{ width: 48, height: 48 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {typeof post.author === "object"
                    ? typeof post.author.name === "string"
                      ? post.author.name
                      : JSON.stringify(post.author.name)
                    : typeof post.author === "string"
                    ? post.author
                    : "Anonymous Author"}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
                  {typeof post.author === "object"
                    ? (post.author.role &&
                        typeof post.author.role === "string" &&
                        post.author.role.trim()) ||
                      (post.author.profession &&
                        typeof post.author.profession === "string" &&
                        post.author.profession.trim()) ||
                      (post.author.authorProfession &&
                        typeof post.author.authorProfession === "string" &&
                        post.author.authorProfession.trim()) ||
                      "Blog Author"
                    : typeof post.author === "string"
                    ? post.author
                    : "Blog Author"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    📅 Published:{" "}
                    {new Date(post.publishDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    🔄 Updated:{" "}
                    {new Date(post.lastUpdated).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    ⏱️ {getPostReadTime(post)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {/* Blog Info Header - Category, Title, Author Name, Role */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 700, letterSpacing: 1 }}
              >
                {post.category === "evs"
                  ? "Electric Vehicles"
                  : post.category === "non-evs"
                  ? "Traditional Vehicles"
                  : post.category || "Category"}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                {post.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {typeof post.author === "object"
                  ? typeof post.author.name === "string"
                    ? post.author.name
                    : JSON.stringify(post.author.name)
                  : typeof post.author === "string"
                  ? post.author
                  : "Anonymous Author"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {typeof post.author === "object"
                  ? (post.author.role &&
                      typeof post.author.role === "string" &&
                      post.author.role.trim()) ||
                    (post.author.profession &&
                      typeof post.author.profession === "string" &&
                      post.author.profession.trim()) ||
                    (post.author.authorProfession &&
                      typeof post.author.authorProfession === "string" &&
                      post.author.authorProfession.trim()) ||
                    "Blog Author"
                  : "Blog Author"}
              </Typography>
            </Box>
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                Article Summary
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 4 }}
              >
                {post.description}
              </Typography>

              <Divider sx={{ my: 4 }} />

              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                Full Article
              </Typography>

              <Box sx={{ position: "relative" }}>
                {isSubscribed ? (
                  <Box
                    sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                ) : (
                  <>
                    <BlurredContent>
                      <Box
                        sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{
                          __html: post.content.substring(0, 800) + "...",
                        }}
                      />
                    </BlurredContent>

                    {/* Subscription Prompt */}
                    <Card
                      sx={{
                        p: 4,
                        mt: 4,
                        backgroundColor: "primary.main",
                        color: "white",
                        borderRadius: 3,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        🔒 Subscribe to Read Full Article
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                        Get unlimited access to all our premium automotive
                        content. Subscribe for free and never miss an update!
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => setShowSubscriptionDialog(true)}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                        }}
                      >
                        Subscribe Now - It's Free!
                      </Button>
                    </Card>
                  </>
                )}
              </Box>
            </Card>

            {/* Author Section */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                About the Author
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                <Avatar
                  src={
                    typeof post.author === "object" &&
                    typeof post.author.image === "string" &&
                    post.author.image.trim() !== ""
                      ? post.author.image
                      : "/placeholder.svg"
                  }
                  alt={
                    typeof post.author === "object"
                      ? typeof post.author.name === "string"
                        ? post.author.name
                        : JSON.stringify(post.author.name)
                      : typeof post.author === "string"
                      ? post.author
                      : "Author"
                  }
                  sx={{
                    width: 100,
                    height: 100,
                    border: "3px solid",
                    borderColor: "primary.main",
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {typeof post.author === "object"
                      ? typeof post.author.name === "string"
                        ? post.author.name
                        : JSON.stringify(post.author.name)
                      : typeof post.author === "string"
                      ? post.author
                      : "Anonymous Author"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {typeof post.author === "object"
                      ? (post.author.role &&
                          typeof post.author.role === "string" &&
                          post.author.role.trim()) ||
                        (post.author.profession &&
                          typeof post.author.profession === "string" &&
                          post.author.profession.trim()) ||
                        (post.author.authorProfession &&
                          typeof post.author.authorProfession === "string" &&
                          post.author.authorProfession.trim()) ||
                        "Blog Author"
                      : typeof post.author === "string"
                      ? post.author
                      : "Blog Author"}
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    {typeof post.author === "object"
                      ? typeof post.author.bio === "string"
                        ? post.author.bio
                        : JSON.stringify(post.author.bio)
                      : "Contributing author to our automotive blog."}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Share Section */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                Share This Post
              </Typography>
              <Grid container spacing={2}>
                {sharePlatforms.map((platform) => (
                  <Grid item xs={12} sm={6} md={4} key={platform.platform}>
                    <ShareButton
                      variant="contained"
                      startIcon={platform.icon}
                      onClick={() => handleShare(platform.platform)}
                      sx={{
                        backgroundColor: platform.color,
                        "&:hover": {
                          backgroundColor: platform.color,
                          opacity: 0.9,
                        },
                      }}
                      fullWidth
                    >
                      {platform.name}
                    </ShareButton>
                  </Grid>
                ))}
              </Grid>
            </Card>

            {/* Comments Section */}
            <Card sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                Comments ({comments.length})
              </Typography>

              {/* Add Comment Form */}
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Write your comment"
                  multiline
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                  disabled={!userName.trim() || !newComment.trim()}
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  Post Comment
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Comments List */}
              {comments.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Comment
                    sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                  />
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Lucky you! This thread is empty,
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    which means you've got dibs on the first comment.
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Go for it!
                  </Typography>
                </Box>
              ) : (
                <List>
                  {comments.map((comment) => (
                    <ListItem
                      key={comment.id}
                      alignItems="flex-start"
                      sx={{ px: 0 }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          {comment.userName.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {comment.userName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            {comment.comment}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Card>

            {/* Interaction Section */}
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
              >
                Was this article helpful?
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ThumbUp />}
                  onClick={handleLike}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  Like
                  {likeCount > 0 && (
                    <Box
                      component="span"
                      sx={{ ml: 1, fontWeight: 600, color: "primary.main" }}
                    >
                      {likeCount}
                    </Box>
                  )}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<ThumbDown />}
                  onClick={handleDislike}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  Dislike
                  {dislikeCount > 0 && (
                    <Box
                      component="span"
                      sx={{ ml: 1, fontWeight: 600, color: "secondary.main" }}
                    >
                      {dislikeCount}
                    </Box>
                  )}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Feedback />}
                  onClick={() => setShowFeedbackDialog(true)}
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  Send Feedback
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                {sharePlatforms.map((platform) => (
                  <Button
                    key={platform.platform}
                    variant="outlined"
                    startIcon={platform.icon}
                    onClick={() => handleShare(platform.platform)}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      position: "relative",
                    }}
                  >
                    {platform.name}
                    {shareCount > 0 && (
                      <Box
                        component="span"
                        sx={{ ml: 1, fontWeight: 600, color: "primary.main" }}
                      >
                        {shareCount}
                      </Box>
                    )}
                  </Button>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: "sticky", top: 100 }}>
              {/* Latest Posts */}
              <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
                >
                  Latest Posts
                </Typography>
                {latestPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <SidebarPost post={post} />
                  </Link>
                ))}
              </Card>

              {/* Recently Viewed */}
              <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
                >
                  Recently Viewed
                </Typography>
                {recentlyViewed.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <SidebarPost post={post} />
                  </Link>
                ))}
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Subscription Dialog */}
      <Dialog
        open={showSubscriptionDialog}
        onClose={() => setShowSubscriptionDialog(false)}
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
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubscriptionDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubscribe} variant="contained" color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog
        open={showFeedbackDialog}
        onClose={() => setShowFeedbackDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "primary.main" }}>
          Send Feedback
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We'd love to hear your thoughts about this article. Your feedback
            helps us improve our content.
          </Typography>
          <TextField
            fullWidth
            label="Your Feedback"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFeedbackDialog(false)}>Cancel</Button>
          <Button onClick={handleFeedback} variant="contained" color="primary">
            Send Feedback
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showNamePrompt} onClose={() => setShowNamePrompt(false)}>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Please enter your name in the comment form below before liking or
            disliking this post.
          </Typography>
          <TextField
            fullWidth
            label="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowNamePrompt(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNamePrompt(false)}>Cancel</Button>
          <Button onClick={() => setShowNamePrompt(false)} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogPost;
