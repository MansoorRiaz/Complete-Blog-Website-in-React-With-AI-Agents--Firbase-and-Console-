import React, { useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  Typography,
  TextField,
  Collapse,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  SmartToy,
  Send,
  ExpandMore,
  ExpandLess,
  Help,
} from "@mui/icons-material";
import AIService from "./AIService";

const AIWidget = ({
  title = "Need Help?",
  subtitle = "Ask me about vehicles, specs, or contact info",
  position = "bottom-right",
  maxWidth = 350,
  suggestedQuestions = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState("");
  const aiService = new AIService();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await aiService.processQuery(userMessage);
      setLastResponse(response);
    } catch (error) {
      setLastResponse("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (question) => {
    setInputValue(question);
  };

  const getPositionStyles = () => {
    switch (position) {
      case "bottom-right":
        return { bottom: 16, right: 16 };
      case "bottom-left":
        return { bottom: 16, left: 16 };
      case "top-right":
        return { top: 16, right: 16 };
      case "top-left":
        return { top: 16, left: 16 };
      default:
        return { bottom: 16, right: 16 };
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        ...getPositionStyles(),
        zIndex: 1000,
        maxWidth: maxWidth,
        width: "100%",
      }}
    >
      {/* Collapsed State */}
      {!isExpanded && (
        <Paper
          elevation={8}
          sx={{
            p: 2,
            borderRadius: 3,
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-2px)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
          onClick={() => setIsExpanded(true)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
              <SmartToy />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {title}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {subtitle}
              </Typography>
            </Box>
            <ExpandMore />
          </Box>
        </Paper>
      )}

      {/* Expanded State */}
      <Collapse in={isExpanded}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            maxHeight: "500px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
              <SmartToy />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                EV Smarts AI Assistant
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Ask me anything about EVs!
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setIsExpanded(false)}
              sx={{ color: "white" }}
            >
              <ExpandLess />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
            {/* Suggested Questions */}
            {suggestedQuestions.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                >
                  Quick questions:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {suggestedQuestions.map((question, index) => (
                    <Chip
                      key={index}
                      label={question}
                      size="small"
                      variant="outlined"
                      onClick={() => handleSuggestionClick(question)}
                      sx={{ cursor: "pointer" }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Last Response */}
            {lastResponse && (
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: "grey.50",
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {lastResponse}
                </Typography>
              </Paper>
            )}

            {/* Loading State */}
            {isLoading && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  AI is thinking...
                </Typography>
              </Box>
            )}
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask about vehicles, specs, or contact info..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                variant="outlined"
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                color="primary"
                size="small"
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default AIWidget;
