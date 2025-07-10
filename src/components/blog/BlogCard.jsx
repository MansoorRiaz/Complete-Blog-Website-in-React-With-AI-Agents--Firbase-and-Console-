import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Button,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getPostReadTime } from "../../utils/readTimeCalculator";
import { formatBlogDate } from "../../utils/blogUtils";

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
  // Optionally: check for valid URL pattern
  if (
    !/^https?:\/\//.test(image) &&
    !/^\//.test(image) &&
    !/^data:image\//.test(image)
  ) {
    return PLACEHOLDER_IMAGE;
  }
  return image;
}

const BlogCard = ({ post }) => {
  return (
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
      <CardActionArea component={Link} to={`/blog/${post.id}`}>
        <CardMedia
          component="img"
          height="200"
          image={getValidImage(post.image)}
          alt={typeof post.title === "string" ? post.title : "Blog image"}
          sx={{ objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            {typeof post.title === "string"
              ? post.title
              : JSON.stringify(post.title)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {typeof post.description === "string"
              ? post.description
              : JSON.stringify(post.description)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              src={
                typeof post.author === "object" ? post.author.image : undefined
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
              sx={{ mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                color="text.primary"
                sx={{ fontWeight: 600 }}
              >
                {typeof post.author === "object"
                  ? typeof post.author.name === "string"
                    ? post.author.name
                    : JSON.stringify(post.author.name)
                  : typeof post.author === "string"
                  ? post.author
                  : "Anonymous Author"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {typeof post.author === "object"
                  ? typeof post.author.role === "string"
                    ? post.author.role
                    : JSON.stringify(post.author.role)
                  : "Blog Author"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              📅{" "}
              {typeof post.publishDate === "string" ||
              typeof post.publishDate === "number"
                ? formatBlogDate(post.publishDate)
                : "—"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ⏱️ {typeof post.content === "string" ? getPostReadTime(post) : ""}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{
              mt: "auto",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Read More
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
