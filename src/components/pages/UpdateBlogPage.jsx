import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import {
  Add,
  Delete,
  TextFields,
  Image,
  CloudUpload,
  DragIndicator,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { getAllBlogs, getBlogById, updateBlog } from "../../utils/blogUtils";

const UpdateBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);
  const [blockCounter, setBlockCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [showMessage, setShowMessage] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorProfession, setAuthorProfession] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const found = await getBlogById(id);
      if (found && found.isUserGenerated) {
        setBlog(found);
        setTitle(found.title || "");
        setSummary(found.summary || found.description || "");
        setAuthorName(
          typeof found.author === "object"
            ? found.author.name || "Anonymous Author"
            : typeof found.author === "string"
            ? found.author
            : "Anonymous Author"
        );
        setAuthorProfession(
          typeof found.author === "object"
            ? found.author.role || "Blog Author"
            : found.authorProfession || "Blog Author"
        );
        if (found.contentBlocks && found.contentBlocks.length > 0) {
          setContentBlocks(found.contentBlocks);
          setBlockCounter(found.contentBlocks.length);
        } else if (found.content) {
          // Parse HTML into blocks (text and image)
          const html = found.content;
          const parser = new window.DOMParser();
          const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
          const container = doc.body.firstChild;
          let blocks = [];
          let blockIdx = 0;
          container.childNodes.forEach((node) => {
            if (node.nodeType === 1 && node.tagName === "IMG") {
              // Image block
              blocks.push({
                id: `image-${blockIdx}`,
                type: "image",
                imageUrl: node.getAttribute("src"),
                content: "",
                order: blocks.length,
              });
              blockIdx++;
            } else if (
              node.nodeType === 1 &&
              (node.tagName === "P" || node.tagName === "DIV")
            ) {
              // Text block
              const text = node.innerText.trim();
              if (text) {
                blocks.push({
                  id: `text-${blockIdx}`,
                  type: "text",
                  content: text,
                  order: blocks.length,
                });
                blockIdx++;
              }
            } else if (node.nodeType === 3) {
              // Text node
              const text = node.textContent.trim();
              if (text) {
                blocks.push({
                  id: `text-${blockIdx}`,
                  type: "text",
                  content: text,
                  order: blocks.length,
                });
                blockIdx++;
              }
            }
          });
          // Fallback: if no blocks found, treat as single text block
          if (blocks.length === 0 && html) {
            blocks = [
              {
                id: `text-0`,
                type: "text",
                content: html,
                order: 0,
              },
            ];
          }
          setContentBlocks(blocks);
          setBlockCounter(blocks.length);
        } else {
          setContentBlocks([]);
          setBlockCounter(0);
        }
      }
    };
    fetchBlog();
  }, [id]);

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
      setMessage("Error uploading image. Please try again.");
      setMessageType("error");
      setShowMessage(true);
    }
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
    setLoading(true);
    try {
      await updateBlog(id, {
        ...blog,
        title: title.trim(),
        summary: summary.trim(),
        description: summary.trim(),
        content: convertBlocksToHTML(),
        contentBlocks: contentBlocks,
        lastUpdated: new Date().toISOString(),
        author: {
          name: authorName || "Anonymous Author",
          image: (blog.author && blog.author.image) || "/@8136031.png",
          role: authorProfession || "Blog Author",
          bio:
            (blog.author && blog.author.bio) ||
            "Contributing author to our automotive blog.",
        },
        authorName: authorName || "Anonymous Author",
        authorProfession: authorProfession || "Blog Author",
      });
      setMessage("Blog updated successfully!");
      setMessageType("success");
      setShowMessage(true);
      setTimeout(() => navigate("/manage-blogs"), 1000);
    } catch (error) {
      setMessage("Error updating blog. Please try again.");
      setMessageType("error");
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  if (!blog) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Blog not found or not editable.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 3 }}
          onClick={() => navigate("/manage-blogs")}
        >
          Back to Manage Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: "bold",
                px: 3,
                boxShadow: 2,
              }}
              onClick={() => navigate("/manage-blogs")}
            >
              Back to Manage Blogs
            </Button>
          </Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
          >
            Update Blog
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Blog Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
              required
              placeholder="Enter your blog title..."
            />
            <TextField
              fullWidth
              label="Article Summary *"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              sx={{ mb: 3 }}
              required
              multiline
              rows={3}
              placeholder="Write a brief summary of your article..."
            />
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Author Information
              </Typography>
              <TextField
                fullWidth
                label="Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                sx={{ mb: 2 }}
                required
                placeholder="Enter author name..."
              />
              <TextField
                fullWidth
                label="Author Profession"
                value={authorProfession}
                onChange={(e) => setAuthorProfession(e.target.value)}
                sx={{ mb: 2 }}
                required
                placeholder="Enter author profession..."
              />
            </Box>
            {/* Content Builder */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Blog Content Builder *
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Edit text and image blocks in the order you want them to appear
                in your blog.
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
                <Box
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
                </Box>
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
                          flexDirection: "column",
                          alignItems: "stretch",
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
                                disabled={index === contentBlocks.length - 1}
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
                                      backgroundColor: "rgba(255,255,255,0.9)",
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
                                  <label htmlFor={`image-upload-${block.id}`}>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ textTransform: "none", borderRadius: 2, py: 1.5 }}
            >
              {loading ? "Updating..." : "Update Blog"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={showMessage}
        autoHideDuration={4000}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={messageType} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UpdateBlogPage;
