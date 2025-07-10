import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Collapse,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Send,
  SmartToy,
  Close,
  ExpandMore,
  ExpandLess,
  Help,
  DirectionsCar,
  ContactSupport,
  Info,
} from "@mui/icons-material";
import AIService from "./AIService";

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const aiService = new AIService();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage) => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Use the AI service to process the query
    const response = await aiService.processQuery(userMessage);

    setIsLoading(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user", timestamp: new Date() },
    ]);

    // Get AI response
    const aiResponse = await generateAIResponse(userMessage);
    setMessages((prev) => [
      ...prev,
      { text: aiResponse, sender: "ai", timestamp: new Date() },
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = aiService.getSuggestedQuestions();

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="AI Assistant"
        onClick={() => setIsOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <SmartToy />
      </Fab>

      {/* Chat Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            height: "80vh",
            maxHeight: "600px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            color: "white",
          }}
        >
          <SmartToy />
          <Typography variant="h6">EV Smarts AI Assistant</Typography>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{ color: "white", ml: "auto" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
          {/* Messages Area */}
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            {messages.length === 0 && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.main",
                  }}
                >
                  <SmartToy />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Welcome to EV Smarts AI Assistant!
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  I can help you with vehicle information, website details, and
                  contact information.
                </Typography>

                <Collapse in={isExpanded}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Suggested questions:
                    </Typography>
                    {suggestedQuestions.map((question, index) => (
                      <Chip
                        key={index}
                        label={question}
                        onClick={() => setInputValue(question)}
                        sx={{ m: 0.5 }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Collapse>

                <Button
                  startIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
                  onClick={() => setIsExpanded(!isExpanded)}
                  size="small"
                >
                  {isExpanded ? "Hide suggestions" : "Show suggestions"}
                </Button>
              </Box>
            )}

            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: "80%",
                    backgroundColor:
                      message.sender === "user" ? "primary.main" : "grey.100",
                    color: message.sender === "user" ? "white" : "text.primary",
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    {message.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.7, mt: 1, display: "block" }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Paper>
              </Box>
            ))}

            {isLoading && (
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}
              >
                <Paper sx={{ p: 2, backgroundColor: "grey.100" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2">AI is thinking...</Typography>
                  </Box>
                </Paper>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Ask me about vehicles, website info, or contact details..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                size="small"
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                color="primary"
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAgent;
