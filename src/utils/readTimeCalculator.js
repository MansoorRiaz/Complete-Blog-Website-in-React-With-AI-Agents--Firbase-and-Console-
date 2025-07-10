// Calculate read time based on content length
// Average reading speed is 200-250 words per minute
export const calculateReadTime = (content) => {
  if (!content) return "1 min read";

  // Count words (split by whitespace and filter out empty strings)
  const words = content.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Average reading speed: 225 words per minute
  const averageReadingSpeed = 225;
  const minutes = Math.ceil(wordCount / averageReadingSpeed);

  // Handle edge cases
  if (minutes < 1) return "1 min read";
  if (minutes === 1) return "1 min read";

  return `${minutes} min read`;
};

// Calculate read time for a blog post object
export const getPostReadTime = (post) => {
  if (post.readTime) return post.readTime;
  return calculateReadTime(post.content);
};
