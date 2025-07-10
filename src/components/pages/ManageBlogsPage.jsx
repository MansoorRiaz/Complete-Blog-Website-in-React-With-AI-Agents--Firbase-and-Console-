import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { getAllBlogs, formatBlogDate, deleteBlog } from "../../utils/blogUtils";
import { useNavigate } from "react-router-dom";

const ManageBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await getAllBlogs();
      setBlogs(allBlogs);
    };
    fetchBlogs();
  }, []);

  const handleDelete = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        await deleteBlog(blogToDelete.id);
        setSnackbar({
          open: true,
          message: "Blog deleted successfully!",
          severity: "success",
        });
        setDeleteDialogOpen(false);
        setBlogToDelete(null);
        // Refresh list
        const allBlogs = await getAllBlogs();
        setBlogs(allBlogs);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error deleting blog.",
          severity: "error",
        });
      }
    }
  };

  const handleEdit = (blog) => {
    navigate(`/update-blog/${blog.id}`);
  };

  const handleView = (blog) => {
    navigate(`/blog/${blog.id}`);
  };

  useEffect(() => {
    if (!deleteDialogOpen) {
      setBlogToDelete(null);
    }
  }, [deleteDialogOpen]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Manage Blogs
        </Typography>
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
          onClick={() => navigate("/post-blog")}
        >
          Back to Post Blog
        </Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          View, edit, or delete your blog posts. Only user-generated blogs can
          be edited or deleted.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={6} lg={4} key={blog.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {typeof blog.title === "string"
                    ? blog.title
                    : JSON.stringify(blog.title)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {typeof blog.summary === "string"
                    ? blog.summary
                    : typeof blog.description === "string"
                    ? blog.description
                    : JSON.stringify(blog.summary || blog.description)}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Chip
                    label={blog.category === "evs" ? "EV" : "Non-EV"}
                    color={blog.category === "evs" ? "success" : "warning"}
                    size="small"
                  />
                  <Chip
                    label={
                      typeof blog.publishDate === "string" ||
                      typeof blog.publishDate === "number"
                        ? formatBlogDate(blog.publishDate)
                        : "—"
                    }
                    size="small"
                  />
                  {blog.isUserGenerated && (
                    <Chip label="User Blog" color="info" size="small" />
                  )}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => handleView(blog)}
                >
                  View
                </Button>
                {blog.isUserGenerated && (
                  <>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleEdit(blog)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(blog)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Blog</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this blog post?
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 2 }}>
            {typeof blogToDelete?.title === "string"
              ? blogToDelete.title
              : JSON.stringify(blogToDelete?.title)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageBlogsPage;
