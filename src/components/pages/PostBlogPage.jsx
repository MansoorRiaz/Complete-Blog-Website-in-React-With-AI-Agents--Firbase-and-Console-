import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Paper,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Save,
  Visibility,
  Publish,
  Add,
  Close,
  CloudUpload,
  Preview,
  Edit,
  TextFields,
  Image,
  Delete,
  DragIndicator,
  Person,
  Work,
  ContentCopy,
  UploadFile,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllBlogs, addBlog, updateBlog } from "../../utils/blogUtils";
import { getDatabase, ref, get } from "firebase/database";
import { styled } from "@mui/material/styles";
import logoSvg from "../../assets/logo.svg";
import reactSvg from "../../assets/react.svg";

const PostBlogPage = () => {
  // All hooks must be at the top, before any return or conditional logic
  const { user, isAuthor, signInAsDemo, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const db = getDatabase();

  // Debug logging
  console.log("PostBlogPage - user:", user);
  console.log("PostBlogPage - isAuthor:", isAuthor);

  // All useState hooks
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorProfession, setAuthorProfession] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [status, setStatus] = useState("draft"); // 'draft' or 'published'
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [showMessage, setShowMessage] = useState(false);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [blockCounter, setBlockCounter] = useState(0);
  const [editBlogId, setEditBlogId] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [showSubscribersDialog, setShowSubscribersDialog] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // All useEffect hooks
  useEffect(() => {
    if (user) {
      setAuthorName(user.displayName || user.email || "Anonymous Author");
    }
  }, [user]);

  useEffect(() => {
    const fetchEditBlog = async () => {
      const params = new URLSearchParams(location.search);
      const editId = params.get("edit");
      if (editId) {
        const allBlogs = await getAllBlogs();
        const blog = allBlogs.find((b) => b.id === editId);
        if (blog && blog.isUserGenerated) {
          setEditBlogId(editId);
          setTitle(blog.title || "");
          setSummary(blog.summary || "");
          setAuthorName(
            typeof blog.author === "object"
              ? blog.author.name || "Anonymous Author"
              : typeof blog.author === "string"
              ? blog.author
              : "Anonymous Author"
          );
          setAuthorProfession(
            typeof blog.author === "object"
              ? blog.author.role || "Blog Author"
              : blog.authorProfession || "Blog Author"
          );
          setTags(blog.tags || []);
          setStatus(blog.status || "draft");
          setContentBlocks(blog.contentBlocks || []);
          setBlockCounter((blog.contentBlocks || []).length);
        }
      }
    };
    fetchEditBlog();
  }, [location.search]);

  useEffect(() => {
    if (!user) {
      setLoginDialogOpen(true);
    } else {
      setLoginDialogOpen(false);
    }
  }, [user]);

  // Predefined categories for EV blog
  const categories = [
    "EV (Electric Vehicles)",
    "Non-EV (Traditional Vehicles)",
  ];

  // Add text block
  const addTextBlock = () => {
    const newBlock = {
      id: `text-${blockCounter}`,
      type: "text",
      content: "",
      order: contentBlocks.length,
    };
    setContentBlocks([...contentBlocks, newBlock]);
    setBlockCounter(blockCounter + 1);
  };

  // Add image block
  const addImageBlock = () => {
    const newBlock = {
      id: `image-${blockCounter}`,
      type: "image",
      content: "",
      imageUrl: "",
      order: contentBlocks.length,
    };
    setContentBlocks([...contentBlocks, newBlock]);
    setBlockCounter(blockCounter + 1);
  };

  // Update block content
  const updateBlockContent = (blockId, content) => {
    setContentBlocks((blocks) =>
      blocks.map((block) =>
        block.id === blockId ? { ...block, content } : block
      )
    );
  };

  // Update block image
  const updateBlockImage = (blockId, imageUrl) => {
    setContentBlocks((blocks) =>
      blocks.map((block) =>
        block.id === blockId ? { ...block, imageUrl } : block
      )
    );
  };

  // Remove block
  const removeBlock = (blockId) => {
    setContentBlocks((blocks) =>
      blocks.filter((block) => block.id !== blockId)
    );
  };

  // Move block up
  const moveBlockUp = (blockId) => {
    setContentBlocks((blocks) => {
      const index = blocks.findIndex((block) => block.id === blockId);
      if (index > 0) {
        const newBlocks = [...blocks];
        [newBlocks[index], newBlocks[index - 1]] = [
          newBlocks[index - 1],
          newBlocks[index],
        ];
        return newBlocks.map((block, i) => ({ ...block, order: i }));
      }
      return blocks;
    });
  };

  // Move block down
  const moveBlockDown = (blockId) => {
    setContentBlocks((blocks) => {
      const index = blocks.findIndex((block) => block.id === blockId);
      if (index < blocks.length - 1) {
        const newBlocks = [...blocks];
        [newBlocks[index], newBlocks[index + 1]] = [
          newBlocks[index + 1],
          newBlocks[index],
        ];
        return newBlocks.map((block, i) => ({ ...block, order: i }));
      }
      return blocks;
    });
  };

  // Upload image to base64
  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle image upload for a specific block
  const handleImageUpload = async (blockId, files) => {
    try {
      const file = files[0];
      if (file) {
        const imageUrl = await uploadImage(file);
        updateBlockImage(blockId, imageUrl);
        setMessage("Image uploaded successfully!");
        setMessageType("success");
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image. Please try again.");
      setMessageType("error");
      setShowMessage(true);
    }
  };

  // Add tag
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Convert content blocks to HTML
  const convertBlocksToHTML = () => {
    return contentBlocks
      .sort((a, b) => a.order - b.order)
      .map((block) => {
        if (block.type === "text") {
          return `<p>${block.content}</p>`;
        } else if (block.type === "image") {
          return `<img src="${block.imageUrl}" alt="Blog image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;" />`;
        }
        return "";
      })
      .join("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || contentBlocks.length === 0) {
      setMessage(
        "Please fill in all required fields (title, summary, and at least one content block)."
      );
      setMessageType("error");
      setShowMessage(true);
      return;
    }
    // Check if a category is selected
    const selectedCategory = tags.find((tag) => categories.includes(tag));
    if (!selectedCategory) {
      setMessage("Please select a category for your blog post.");
      setMessageType("error");
      setShowMessage(true);
      return;
    }
    // Check if all blocks have content
    const emptyBlocks = contentBlocks.filter(
      (block) =>
        (block.type === "text" && !block.content.trim()) ||
        (block.type === "image" && !block.imageUrl)
    );
    if (emptyBlocks.length > 0) {
      setMessage("Please fill in all content blocks or remove empty ones.");
      setMessageType("error");
      setShowMessage(true);
      return;
    }
    try {
      setLoading(true);
      const blogData = {
        title: title.trim(),
        summary: summary.trim(),
        description: summary.trim(),
        content: convertBlocksToHTML(),
        author: {
          name: authorName || "Anonymous Author",
          image: "/@8136031.png",
          role: authorProfession || "Blog Author",
          bio: "Contributing author to our automotive blog.",
        },
        authorName: authorName || "Anonymous Author",
        authorProfession: authorProfession || "Blog Author",
        tags: tags,
        status: status,
        date: editBlogId ? undefined : new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        userId: user?.uid || "anonymous",
        publishedAt: status === "published" ? new Date().toISOString() : null,
        contentBlocks: contentBlocks,
        isUserGenerated: true,
      };
      let successMsg;
      if (editBlogId) {
        // Update existing blog
        await updateBlog(editBlogId, blogData);
        successMsg = "Blog updated successfully!";
      } else {
        // New blog
        await addBlog(blogData);
        successMsg = `Blog ${
          status === "published" ? "published" : "saved as draft"
        } successfully!`;
      }
      setMessage(successMsg);
      setMessageType("success");
      setShowMessage(true);
      // Reset form if published or updated
      setEditBlogId(null);
      if (!editBlogId && status === "published") {
        setTitle("");
        setSummary("");
        setAuthorName("");
        setAuthorProfession("");
        setTags([]);
        setStatus("draft");
        setContentBlocks([]);
        setBlockCounter(0);
      }
      if (editBlogId) {
        // After update, go to manage blogs
        setTimeout(() => navigate("/manage-blogs"), 1000);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      setMessage("Error saving blog. Please try again.");
      setMessageType("error");
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  // Debug info
  console.log("Rendering PostBlogPage - user:", user, "isAuthor:", isAuthor);

  // Add sign out handler
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleShowSubscribers = async () => {
    setShowSubscribersDialog(true);
    setLoadingSubscribers(true);
    try {
      const snapshot = await get(ref(db, "subscribers"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Extract emails from the values (support both old and new format)
        const emails = Object.values(data)
          .map((entry) => (typeof entry === "string" ? entry : entry.email))
          .filter(Boolean);
        setSubscribers(emails);
      } else {
        setSubscribers([]);
      }
    } catch (error) {
      setSubscribers([]);
    }
    setLoadingSubscribers(false);
  };

  const handleCopyEmails = () => {
    if (subscribers.length > 0) {
      const emailString = subscribers.join(", ");
      navigator.clipboard.writeText(emailString).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "background.default", minHeight: "100vh", py: 4 }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Post New Blog
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create and publish your automotive content with our easy-to-use
              content builder.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2, height: 48 }}
              onClick={() => navigate("/manage-blogs")}
            >
              Manage Blogs
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ textTransform: "none", borderRadius: 2, height: 48 }}
              onClick={handleShowSubscribers}
            >
              View Subscribers
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ textTransform: "none", borderRadius: 2, height: 48 }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Main Form */}
          <Grid item xs={12} lg={showPreview ? 6 : 8}>
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <TextField
                  fullWidth
                  label="Blog Title *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ mb: 3 }}
                  required
                  placeholder="Enter your blog title..."
                />

                {/* Article Summary */}
                <TextField
                  fullWidth
                  label="Article Summary *"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  sx={{ mb: 3 }}
                  required
                  multiline
                  rows={3}
                  placeholder="Write a brief summary of your article (this will appear in blog listings)..."
                />

                {/* Author Information */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Author Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Author Name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Author name"
                        InputProps={{
                          startAdornment: (
                            <Person sx={{ mr: 1, color: "text.secondary" }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Author Profession"
                        value={authorProfession}
                        onChange={(e) => setAuthorProfession(e.target.value)}
                        placeholder="e.g., EV Analyst, Automotive Journalist"
                        InputProps={{
                          startAdornment: (
                            <Work sx={{ mr: 1, color: "text.secondary" }} />
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Categories */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Category *
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Select one category for your blog post:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    {categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        onClick={() => {
                          // Remove other category if selected
                          const otherCategory = categories.find(
                            (c) => c !== category
                          );
                          const filteredTags = tags.filter(
                            (tag) => tag !== otherCategory
                          );

                          if (!filteredTags.includes(category)) {
                            setTags([...filteredTags, category]);
                          } else {
                            setTags(
                              filteredTags.filter((tag) => tag !== category)
                            );
                          }
                        }}
                        color={tags.includes(category) ? "primary" : "default"}
                        variant={
                          tags.includes(category) ? "filled" : "outlined"
                        }
                        sx={{
                          cursor: "pointer",
                          minWidth: "150px",
                          justifyContent: "center",
                        }}
                      />
                    ))}
                  </Box>
                  {tags.filter((tag) => categories.includes(tag)).length ===
                    0 && (
                    <Typography variant="body2" color="error">
                      Please select a category for your blog post.
                    </Typography>
                  )}
                </Box>

                {/* Custom Tags */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Additional Tags
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <TextField
                      size="small"
                      label="Add custom tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddTag())
                      }
                      placeholder="Type and press Enter"
                    />
                    <Button
                      variant="outlined"
                      onClick={handleAddTag}
                      startIcon={<Add />}
                      disabled={!newTag.trim()}
                    >
                      Add
                    </Button>
                  </Box>

                  {tags.filter((tag) => !categories.includes(tag)).length >
                    0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Custom tags:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {tags
                          .filter((tag) => !categories.includes(tag))
                          .map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              onDelete={() => handleRemoveTag(tag)}
                              color="primary"
                              size="small"
                            />
                          ))}
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Content Builder */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Blog Content Builder *
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Add text blocks and images in the order you want them to
                    appear in your blog.
                  </Typography>

                  {/* Sticky Add Content Buttons */}
                  <Box
                    sx={{
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      backgroundColor: "background.paper",
                      boxShadow: 1,
                      borderRadius: 2,
                      display: "flex",
                      gap: 2,
                      mb: 3,
                      py: 2,
                      px: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={addTextBlock}
                      startIcon={<TextFields />}
                      sx={{ textTransform: "none" }}
                    >
                      Add Text Block
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={addImageBlock}
                      startIcon={<Image />}
                      sx={{ textTransform: "none" }}
                    >
                      Add Image Block
                    </Button>
                  </Box>

                  {/* Content Blocks */}
                  {contentBlocks.length === 0 ? (
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        border: "2px dashed",
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        Click "Add Text Block" or "Add Image Block" to start
                        building your content
                      </Typography>
                    </Paper>
                  ) : (
                    <List>
                      {contentBlocks
                        .sort((a, b) => a.order - b.order)
                        .map((block, index) => (
                          <ListItem
                            key={block.id}
                            sx={{
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: 2,
                              mb: 2,
                              backgroundColor: "background.paper",
                            }}
                          >
                            <Box sx={{ width: "100%" }}>
                              {/* Block Header */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 2,
                                }}
                              >
                                <DragIndicator
                                  sx={{ mr: 1, color: "text.secondary" }}
                                />
                                <Typography
                                  variant="subtitle2"
                                  sx={{ flexGrow: 1 }}
                                >
                                  {block.type === "text"
                                    ? "Text Block"
                                    : "Image Block"}{" "}
                                  #{index + 1}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <IconButton
                                    size="small"
                                    onClick={() => moveBlockUp(block.id)}
                                    disabled={index === 0}
                                  >
                                    ↑
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={() => moveBlockDown(block.id)}
                                    disabled={
                                      index === contentBlocks.length - 1
                                    }
                                  >
                                    ↓
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => removeBlock(block.id)}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Box>
                              </Box>

                              {/* Block Content */}
                              {block.type === "text" ? (
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={4}
                                  value={block.content}
                                  onChange={(e) =>
                                    updateBlockContent(block.id, e.target.value)
                                  }
                                  placeholder="Write your text content here..."
                                  variant="outlined"
                                />
                              ) : (
                                <Box>
                                  {block.imageUrl ? (
                                    <Box sx={{ position: "relative", mb: 2 }}>
                                      <img
                                        src={block.imageUrl}
                                        alt="Blog content"
                                        style={{
                                          width: "100%",
                                          maxHeight: "300px",
                                          objectFit: "cover",
                                          borderRadius: "8px",
                                        }}
                                      />
                                      <IconButton
                                        size="small"
                                        color="error"
                                        sx={{
                                          position: "absolute",
                                          top: 8,
                                          right: 8,
                                          backgroundColor:
                                            "rgba(255,255,255,0.9)",
                                        }}
                                        onClick={() =>
                                          updateBlockImage(block.id, "")
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </Box>
                                  ) : (
                                    <Box
                                      sx={{
                                        textAlign: "center",
                                        p: 3,
                                        border: "2px dashed",
                                        borderColor: "divider",
                                        borderRadius: 1,
                                      }}
                                    >
                                      <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id={`image-upload-${block.id}`}
                                        type="file"
                                        onChange={(e) =>
                                          handleImageUpload(
                                            block.id,
                                            e.target.files
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={`image-upload-${block.id}`}
                                      >
                                        <Button
                                          variant="outlined"
                                          component="span"
                                          startIcon={<CloudUpload />}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Upload Image
                                        </Button>
                                      </label>
                                    </Box>
                                  )}
                                </Box>
                              )}
                            </Box>
                          </ListItem>
                        ))}
                    </List>
                  )}
                </Box>

                {/* Status and Actions */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={status === "published"}
                        onChange={(e) =>
                          setStatus(e.target.checked ? "published" : "draft")
                        }
                      />
                    }
                    label={`Status: ${
                      status === "published" ? "Publish" : "Draft"
                    }`}
                  />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowPreview(!showPreview)}
                      startIcon={showPreview ? <Edit /> : <Preview />}
                    >
                      {showPreview ? "Hide Preview" : "Show Preview"}
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} />
                        ) : status === "published" ? (
                          <Publish />
                        ) : (
                          <Save />
                        )
                      }
                      sx={{ textTransform: "none" }}
                    >
                      {loading
                        ? "Saving..."
                        : status === "published"
                        ? "Publish Blog"
                        : "Save as Draft"}
                    </Button>
                  </Box>
                </Box>

                {/* Editing Blog Banner */}
                {editBlogId && (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Editing blog post. Changes will update the existing blog.
                  </Alert>
                )}
              </form>
            </Card>
          </Grid>

          {/* Preview Pane */}
          {showPreview && (
            <Grid item xs={12} lg={6}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "fit-content",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Visibility sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Preview
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {title || contentBlocks.length > 0 ? (
                  <Box>
                    {title && (
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                      >
                        {title}
                      </Typography>
                    )}

                    {summary && (
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 2, fontStyle: "italic" }}
                      >
                        {summary}
                      </Typography>
                    )}

                    {authorName && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        By {authorName}
                        {authorProfession && ` • ${authorProfession}`}
                        {` • ${new Date().toLocaleDateString()}`}
                      </Typography>
                    )}

                    {tags.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 3,
                        }}
                      >
                        {tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}

                    {contentBlocks.length > 0 && (
                      <Box
                        sx={{
                          "& img": {
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: 1,
                          },
                          "& h1, & h2, & h3, & h4, & h5, & h6": {
                            fontWeight: "bold",
                            mt: 2,
                            mb: 1,
                          },
                          "& p": { mb: 2, lineHeight: 1.6 },
                          "& ul, & ol": { mb: 2, pl: 2 },
                          "& li": { mb: 1 },
                        }}
                        dangerouslySetInnerHTML={{
                          __html: convertBlocksToHTML(),
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    Start building your content to see the preview...
                  </Typography>
                )}
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Success/Error Messages */}
        <Snackbar
          open={showMessage}
          autoHideDuration={6000}
          onClose={() => setShowMessage(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowMessage(false)}
            severity={messageType}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>

        <Dialog
          open={showSubscribersDialog}
          onClose={() => setShowSubscribersDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Subscribed Users</DialogTitle>
          <DialogContent>
            {loadingSubscribers ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                {subscribers.length === 0 ? (
                  <Typography>No subscribers found.</Typography>
                ) : (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<ContentCopy />}
                        onClick={handleCopyEmails}
                        sx={{ textTransform: "none", borderRadius: 2, mr: 2 }}
                      >
                        Copy All
                      </Button>
                      {copySuccess && (
                        <Typography color="success.main" sx={{ ml: 1 }}>
                          Copied!
                        </Typography>
                      )}
                    </Box>
                    <List>
                      {subscribers.map((email, idx) => (
                        <ListItem
                          key={
                            typeof email === "string"
                              ? email
                              : email?.email || idx
                          }
                        >
                          {typeof email === "string"
                            ? email
                            : email?.email || JSON.stringify(email)}
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSubscribersDialog(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default PostBlogPage;
