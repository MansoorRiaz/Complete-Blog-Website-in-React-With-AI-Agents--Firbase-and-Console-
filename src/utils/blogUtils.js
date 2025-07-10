import { blogPosts } from "../data/blogPosts";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  update,
  remove,
  child,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_nH2dXoUJG97YAMsAV4Kl267qwr_KPso",
  authDomain: "evblogs-36285.firebaseapp.com",
  databaseURL: "https://evblogs-36285-default-rtdb.firebaseio.com",
  projectId: "evblogs-36285",
  storageBucket: "evblogs-36285.firebasestorage.app",
  messagingSenderId: "660992307858",
  appId: "1:660992307858:web:f1e31c66a71f520fcfec4b",
  measurementId: "G-G44SX1VGFC",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Map user categories to system categories
const categoryMapping = {
  "EV (Electric Vehicles)": "evs",
  "Non-EV (Traditional Vehicles)": "non-evs",
};

// Add this normalization function
function normalizeBlog(blog) {
  // Defensive normalization for all fields
  return {
    ...blog,
    id: typeof blog.id === "string" ? blog.id : String(blog.id),
    title:
      typeof blog.title === "string" ? blog.title : JSON.stringify(blog.title),
    description:
      typeof blog.description === "string"
        ? blog.description
        : JSON.stringify(blog.description),
    image: typeof blog.image === "string" ? blog.image : undefined,
    publishDate:
      typeof blog.publishDate === "string" ||
      typeof blog.publishDate === "number"
        ? blog.publishDate
        : blog.date || "",
    lastUpdated:
      typeof blog.lastUpdated === "string" ||
      typeof blog.lastUpdated === "number"
        ? blog.lastUpdated
        : blog.date || "",
    content: typeof blog.content === "string" ? blog.content : "",
    author:
      typeof blog.author === "object"
        ? blog.author
        : typeof blog.author === "string" && blog.author.trim().startsWith("{")
        ? JSON.parse(blog.author)
        : {
            name: blog.author || blog.authorName || "Anonymous Author",
            image: "/@8136031.png",
            role: blog.authorProfession || "Blog Author",
            bio: "Contributing author to our automotive blog.",
          },
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    status: typeof blog.status === "string" ? blog.status : "draft",
    isUserGenerated: !!blog.isUserGenerated,
  };
}

// Get all blogs (static + user-generated from Firebase)
export const getAllBlogs = async () => {
  try {
    // Get user-generated blogs from Firebase
    const snapshot = await get(ref(db, "blogs"));
    let userBlogs = [];
    if (snapshot.exists()) {
      const data = snapshot.val();
      userBlogs = Object.keys(data).map((key) => ({ ...data[key], id: key }));
    }

    // Transform user blogs to match the system format
    const transformedUserBlogs = userBlogs.map((blog, index) =>
      normalizeBlog({
        id: blog.id,
        category:
          categoryMapping[blog.tags?.find((tag) => tag.includes("EV"))] ||
          "evs",
        title: blog.title,
        description:
          typeof blog.summary === "string"
            ? blog.summary
            : blog.content
            ? blog.content.substring(0, 150) + "..."
            : "",
        image:
          extractFirstImageFromContent(blog.content) ||
          "https://source.unsplash.com/random/800x600/?car",
        author: {
          name:
            typeof blog.authorName === "string"
              ? blog.authorName
              : typeof blog.author === "object" &&
                typeof blog.author.name === "string"
              ? blog.author.name
              : typeof blog.author === "string"
              ? blog.author
              : "Anonymous Author",
          image:
            typeof blog.author === "object" &&
            typeof blog.author.image === "string"
              ? blog.author.image
              : "https://source.unsplash.com/random/100x100/?person",
          role:
            typeof blog.authorProfession === "string"
              ? blog.authorProfession
              : typeof blog.author === "object" &&
                typeof blog.author.role === "string"
              ? blog.author.role
              : "Blog Author",
          bio:
            typeof blog.author === "object" &&
            typeof blog.author.bio === "string"
              ? blog.author.bio
              : "Contributing author to our automotive blog.",
        },
        publishDate: blog.publishedAt || blog.date,
        lastUpdated: blog.date,
        readTime: calculateReadTime(blog.content),
        content: blog.content,
        tags: blog.tags,
        status: blog.status,
        isUserGenerated: true,
      })
    );

    // Normalize static blogs as well
    const normalizedStaticBlogs = blogPosts.map(normalizeBlog);

    // Combine static and user blogs, with user blogs appearing first
    const allBlogs = [...transformedUserBlogs, ...normalizedStaticBlogs];

    // Sort by publish date (newest first)
    return allBlogs.sort((a, b) => {
      const dateA = new Date(a.publishDate || a.date);
      const dateB = new Date(b.publishDate || b.date);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error loading blogs from Firebase:", error);
    // Fallback: normalize static blogs only
    return blogPosts.map(normalizeBlog);
  }
};

// Extract first image from blog content (for description)
const extractFirstImageFromContent = (content) => {
  if (!content) return null;

  // Look for img tags
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) {
    return imgMatch[1];
  }

  // Look for base64 images
  const base64Match = content.match(/data:image\/[^;]+;base64,[^"]+/);
  if (base64Match) {
    return base64Match[0];
  }

  return null;
};

// Calculate read time based on content length
const calculateReadTime = (content) => {
  if (!content) return "1 min read";

  // Remove HTML tags for accurate word count
  const textContent = content.replace(/<[^>]*>/g, "");
  const wordCount = textContent.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / 200); // Average reading speed

  return `${readTimeMinutes} min read`;
};

// Get blogs by category
export const getBlogsByCategory = async (category) => {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter((blog) => blog.category === category);
};

// Get featured blogs (latest published blogs)
export const getFeaturedBlogs = async (count = 3) => {
  const allBlogs = await getAllBlogs();
  return allBlogs
    .filter((blog) => blog.status === "published" || !blog.status)
    .slice(0, count);
};

// Get latest blogs
export const getLatestBlogs = async (count = 4) => {
  const allBlogs = await getAllBlogs();
  return allBlogs
    .filter((blog) => blog.status === "published" || !blog.status)
    .slice(0, count);
};

// Add a new blog to Firebase
export const addBlog = async (blogData) => {
  try {
    const blogRef = push(ref(db, "blogs"));
    await set(blogRef, blogData);
    return blogRef.key;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

// Update an existing blog in Firebase
export const updateBlog = async (id, blogData) => {
  try {
    await update(ref(db, `blogs/${id}`), blogData);
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Delete a blog from Firebase
export const deleteBlog = async (id) => {
  try {
    await remove(ref(db, `blogs/${id}`));
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

// Get a specific blog by ID from Firebase
export const getBlogById = async (id) => {
  try {
    const snapshot = await get(child(ref(db), `blogs/${id}`));
    if (snapshot.exists()) {
      const blog = { ...snapshot.val(), id };
      // Normalize author for user-generated blogs
      return {
        ...blog,
        description: blog.summary || "",
        author: {
          name: blog.authorName || blog.author || "Anonymous Author",
          image: "/placeholder.svg",
          role: blog.authorProfession || "Blog Author",
          bio: "Contributing author to our automotive blog.",
        },
        publishDate: blog.publishedAt || blog.date,
        lastUpdated: blog.lastUpdated || blog.date,
      };
    }
    // If not found in Firebase, search static blogPosts
    const staticBlog = blogPosts.find((b) => b.id === id);
    if (staticBlog) {
      // Normalize author info and dates for static blogs
      const author = staticBlog.author || {};
      const normalized = {
        ...staticBlog,
        publishDate: staticBlog.publishDate || staticBlog.date,
        lastUpdated: staticBlog.lastUpdated || staticBlog.date,
        author: {
          name: author.name || "Anonymous Author",
          image: author.image || "/placeholder.svg",
          role: author.role || "Blog Author",
          bio: author.bio || "Contributing author to our automotive blog.",
        },
      };
      console.log("getBlogById staticBlog:", staticBlog);
      console.log("getBlogById normalized:", normalized);
      return normalized;
    }
    return null;
  } catch (error) {
    console.error("Error getting blog by ID:", error);
    // On error, try static blogs as fallback
    const staticBlog = blogPosts.find((b) => b.id === id);
    if (staticBlog) {
      // Normalize author info and dates for static blogs
      const author = staticBlog.author || {};
      return {
        ...staticBlog,
        publishDate: staticBlog.publishDate || staticBlog.date,
        lastUpdated: staticBlog.lastUpdated || staticBlog.date,
        author: {
          name: author.name || "Anonymous Author",
          image: author.image || "/placeholder.svg",
          role: author.role || "Blog Author",
          bio: author.bio || "Contributing author to our automotive blog.",
        },
      };
    }
    return null;
  }
};

export function formatBlogDate(date) {
  if (!date) return "—";
  const d = new Date(date);
  return isNaN(d) ? "—" : d.toLocaleDateString();
}
