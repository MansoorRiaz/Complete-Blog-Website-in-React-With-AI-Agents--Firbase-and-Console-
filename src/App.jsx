import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./components/pages/HomePage";
import BlogPost from "./components/blog/BlogPost";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import CategoryPage from "./components/pages/CategoryPage";
import RSSFeedPage from "./components/pages/RSSFeedPage";
import PrivacyPolicyPage from "./components/pages/PrivacyPolicyPage";
import TermsOfUsePage from "./components/pages/TermsOfUsePage";
import PostBlogPage from "./components/pages/PostBlogPage";
import BackToTop from "./components/common/BackToTop";
import AIAgent from "./components/ai/AIAgent";
import { AuthProvider } from "./contexts/AuthContext";
import ManageBlogsPage from "./components/pages/ManageBlogsPage";
import UpdateBlogPage from "./components/pages/UpdateBlogPage";

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/rss" element={<RSSFeedPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfUsePage />} />
                <Route path="/post-blog" element={<PostBlogPage />} />
                <Route path="/manage-blogs" element={<ManageBlogsPage />} />
                <Route path="/update-blog/:id" element={<UpdateBlogPage />} />
                {/* Add more routes as needed */}
              </Routes>
            </Box>
            <Footer />
            <BackToTop />
            <AIAgent />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
