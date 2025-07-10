# AI Agent Integration for EV Blog Website

## Overview

The EV Blog website now includes an intelligent AI agent that can answer visitor queries about electric vehicles, vehicle specifications, website information, and contact details. The AI agent is designed to provide comprehensive, helpful responses while maintaining a conversational and user-friendly interface.

## Features

### 🤖 AI Agent Components

1. **Main AI Agent (`AIAgent.jsx`)**

   - Floating action button that opens a chat dialog
   - Full-featured chat interface with message history
   - Suggested questions for quick interaction
   - Real-time response generation

2. **AI Widget (`AIWidget.jsx`)**

   - Smaller, contextual AI assistant
   - Can be embedded on specific pages
   - Collapsible interface to save space
   - Page-specific suggested questions

3. **AI Service (`AIService.js`)**

   - Core logic for processing user queries
   - Comprehensive vehicle database
   - Website information handling
   - Contact information assistance

4. **External API Service (`ExternalAPIService.js`)**
   - Integration with external vehicle data APIs
   - Market data and news fetching
   - Charging station information
   - Weather and range calculations

### 🚗 Vehicle Information

The AI agent can provide detailed information about:

**Electric Vehicles:**

- Tesla Model 3, Model Y
- Ford Mustang Mach-E
- Chevrolet Bolt
- Nissan Leaf
- Volkswagen ID.4
- Hyundai IONIQ 5
- Kia EV6

**Information Provided:**

- Vehicle type and category
- Range and battery capacity
- Price ranges
- Acceleration performance
- Charging capabilities
- Key features and specifications
- Pros and cons analysis

### 🌐 Website Assistance

The AI agent can help with:

- Website information and features
- Content categories and topics
- Navigation assistance
- General inquiries about EV Smarts

### 📞 Contact Support

The AI agent provides:

- Email, phone, and address information
- Business hours
- Response time expectations
- Contact form guidance

### 🔋 Advanced Features

- **Market Data**: Current EV sales trends and market share
- **News Updates**: Latest EV industry news and developments
- **Charging Information**: Location and types of charging stations
- **Range Calculations**: Factors affecting EV range
- **Vehicle Comparisons**: Side-by-side vehicle analysis

## Usage

### For Visitors

1. **Main AI Agent**: Click the floating robot icon in the bottom-right corner
2. **Page-Specific Widgets**: Use the contextual AI widgets on specific pages
3. **Suggested Questions**: Click on suggested questions for quick answers
4. **Natural Language**: Ask questions in natural language

### Example Queries

```
"Tell me about Tesla Model 3"
"What are the benefits of EVs?"
"How can I contact you?"
"What is this website about?"
"Show me electric SUVs"
"How does EV charging work?"
"Compare EVs vs gas cars"
"Where can I find charging stations?"
"What's the latest EV news?"
```

### For Developers

#### Adding AI Widget to a Page

```jsx
import AIWidget from "../ai/AIWidget";

// In your component
<AIWidget
  title="Custom Title"
  subtitle="Custom subtitle"
  position="bottom-left" // or "bottom-right", "top-left", "top-right"
  suggestedQuestions={["Question 1", "Question 2"]}
/>;
```

#### Extending Vehicle Database

Add new vehicles to the `vehicleDatabase` in `AIService.js`:

```javascript
"new vehicle name": {
  type: "Vehicle Type",
  range: "Range information",
  price: "Price range",
  acceleration: "Performance data",
  charging: "Charging information",
  battery: "Battery capacity",
  features: ["Feature 1", "Feature 2"],
  pros: ["Pro 1", "Pro 2"],
  cons: ["Con 1", "Con 2"]
}
```

#### Adding External API Integration

1. Add API keys to `ExternalAPIService.js`
2. Implement new API methods
3. Update the `handleAdvancedQuery` method in `AIService.js`

## Technical Implementation

### Architecture

```
src/components/ai/
├── AIAgent.jsx          # Main chat interface
├── AIWidget.jsx         # Embedded widget
├── AIService.js         # Core AI logic
└── ExternalAPIService.js # External API integration
```

### Key Technologies

- **React**: Component-based UI
- **Material-UI**: Modern, responsive design
- **Async/Await**: Non-blocking API calls
- **Local Storage**: Message persistence (can be added)
- **External APIs**: Real-time data integration

### Performance Considerations

- Lazy loading of AI components
- Debounced input handling
- Efficient message rendering
- Graceful API failure handling

## Future Enhancements

### Planned Features

1. **Voice Integration**: Speech-to-text and text-to-speech
2. **Image Recognition**: Vehicle identification from photos
3. **Personalization**: User preference learning
4. **Multi-language Support**: International language support
5. **Advanced Analytics**: User interaction tracking
6. **Real-time Updates**: Live vehicle data and pricing

### API Integrations

- **NHTSA API**: Vehicle safety and recall information
- **Weather APIs**: Range impact calculations
- **News APIs**: Real-time industry updates
- **Charging Network APIs**: Live station availability
- **Financial APIs**: Real-time pricing data

## Configuration

### Environment Variables

Add to `.env` file for external API integration:

```env
VITE_NHTSA_API_KEY=your_nhtsa_key
VITE_NEWS_API_KEY=your_news_api_key
VITE_WEATHER_API_KEY=your_weather_api_key
```

### Customization

- Modify the theme colors in `AIAgent.jsx`
- Update vehicle database in `AIService.js`
- Customize suggested questions per page
- Adjust widget positioning and styling

## Support

For technical support or feature requests, contact the development team or create an issue in the project repository.

---

**Note**: The AI agent is designed to provide helpful, accurate information but should not be considered a replacement for professional automotive advice. Always consult with qualified professionals for specific vehicle decisions.
