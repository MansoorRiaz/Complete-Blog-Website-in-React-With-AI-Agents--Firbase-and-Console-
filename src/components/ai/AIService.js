// AI Service for handling vehicle data and external API calls
import ExternalAPIService from "./ExternalAPIService";

class AIService {
  constructor() {
    this.externalAPI = new ExternalAPIService();
    this.vehicleDatabase = {
      // Electric Vehicles
      "tesla model 3": {
        type: "Electric Sedan",
        range: "272-358 miles",
        price: "$38,990 - $45,990",
        acceleration: "0-60 mph in 5.8-3.1 seconds",
        charging: "Supercharger network available",
        battery: "50-82 kWh",
        features: [
          "Autopilot",
          "15-inch touchscreen",
          "Glass roof",
          "Premium audio",
          "Over-the-air updates",
        ],
        pros: [
          "Long range",
          "Fast charging",
          "Advanced tech",
          "High safety ratings",
        ],
        cons: [
          "Premium price",
          "Build quality concerns",
          "Service network limitations",
        ],
      },
      "tesla model y": {
        type: "Electric SUV",
        range: "279-330 miles",
        price: "$43,990 - $52,490",
        acceleration: "0-60 mph in 6.6-3.5 seconds",
        charging: "Supercharger network available",
        battery: "75 kWh",
        features: [
          "7-seat option",
          "Cargo space",
          "Autopilot",
          "Glass roof",
          "Premium audio",
        ],
        pros: [
          "Versatile",
          "Long range",
          "Fast acceleration",
          "Spacious interior",
        ],
        cons: ["Expensive", "Limited service centers", "Build quality issues"],
      },
      "ford mustang mach-e": {
        type: "Electric SUV",
        range: "224-314 miles",
        price: "$42,995 - $59,995",
        acceleration: "0-60 mph in 6.1-3.5 seconds",
        charging: "FordPass Charging Network",
        battery: "68-91 kWh",
        features: [
          "SYNC 4A",
          "BlueCruise",
          "Frunk storage",
          "All-wheel drive",
          "One-pedal driving",
        ],
        pros: [
          "Good range",
          "Ford reliability",
          "Comfortable ride",
          "Good tech",
        ],
        cons: [
          "Limited charging network",
          "Software bugs",
          "Dealer experience varies",
        ],
      },
      "chevrolet bolt": {
        type: "Electric Hatchback",
        range: "259 miles",
        price: "$26,500 - $33,500",
        acceleration: "0-60 mph in 6.5 seconds",
        charging: "DC fast charging",
        battery: "65 kWh",
        features: [
          "One-pedal driving",
          "10.2-inch display",
          "Safety features",
          "Affordable",
          "Spacious interior",
        ],
        pros: ["Affordable", "Good range", "Practical", "Reliable"],
        cons: ["Slow charging", "Limited availability", "Basic interior"],
      },
      "nissan leaf": {
        type: "Electric Hatchback",
        range: "149-226 miles",
        price: "$28,140 - $36,040",
        acceleration: "0-60 mph in 7.4 seconds",
        charging: "CHAdeMO fast charging",
        battery: "40-62 kWh",
        features: [
          "e-Pedal",
          "ProPILOT Assist",
          "Apple CarPlay",
          "Android Auto",
          "Affordable",
        ],
        pros: [
          "Affordable",
          "Proven reliability",
          "Easy to drive",
          "Good for city use",
        ],
        cons: ["Limited range", "Outdated charging standard", "Basic interior"],
      },
      "volkswagen id.4": {
        type: "Electric SUV",
        range: "208-275 miles",
        price: "$38,995 - $48,995",
        acceleration: "0-60 mph in 7.6-5.4 seconds",
        charging: "Electrify America network",
        battery: "77-82 kWh",
        features: [
          "ID.Light",
          "Travel Assist",
          "Massage seats",
          "Panoramic roof",
          "Wireless charging",
        ],
        pros: [
          "Comfortable",
          "Good build quality",
          "Spacious",
          "Good warranty",
        ],
        cons: ["Limited range", "Software issues", "Charging network concerns"],
      },
      "hyundai ioniq 5": {
        type: "Electric Crossover",
        range: "220-303 miles",
        price: "$41,450 - $56,500",
        acceleration: "0-60 mph in 7.4-4.5 seconds",
        charging: "Ultra-fast charging",
        battery: "58-77.4 kWh",
        features: [
          "V2L capability",
          "Highway Driving Assist",
          "Retractable center console",
          "Vision roof",
        ],
        pros: [
          "Fast charging",
          "Unique design",
          "Good range",
          "V2L capability",
        ],
        cons: [
          "Limited availability",
          "Software quirks",
          "Dealer experience varies",
        ],
      },
      "kia ev6": {
        type: "Electric Crossover",
        range: "232-310 miles",
        price: "$42,600 - $61,400",
        acceleration: "0-60 mph in 7.2-3.4 seconds",
        charging: "Ultra-fast charging",
        battery: "58-77.4 kWh",
        features: [
          "V2L capability",
          "Highway Driving Assist",
          "Augmented reality HUD",
          "Meridian audio",
        ],
        pros: [
          "Fast charging",
          "Good performance",
          "Unique design",
          "Good warranty",
        ],
        cons: [
          "Limited availability",
          "Software issues",
          "Dealer experience varies",
        ],
      },
    };

    // Non-EV vehicles for comparison
    this.comparisonVehicles = {
      "toyota camry": {
        type: "Gasoline Sedan",
        mpg: "28-32 city / 39-41 highway",
        price: "$25,395 - $35,945",
        acceleration: "0-60 mph in 7.5-8.0 seconds",
        fuel: "Gasoline",
        features: [
          "Toyota Safety Sense",
          "Apple CarPlay",
          "Android Auto",
          "Hybrid option available",
        ],
        pros: [
          "Reliable",
          "Good fuel economy",
          "Comfortable",
          "Good resale value",
        ],
        cons: ["No electric option", "Higher operating costs", "Emissions"],
      },
      "honda accord": {
        type: "Gasoline Sedan",
        mpg: "30-32 city / 37-38 highway",
        price: "$26,120 - $37,890",
        acceleration: "0-60 mph in 7.2-8.0 seconds",
        fuel: "Gasoline",
        features: [
          "Honda Sensing",
          "Apple CarPlay",
          "Android Auto",
          "Hybrid option available",
        ],
        pros: [
          "Reliable",
          "Good fuel economy",
          "Comfortable",
          "Good safety ratings",
        ],
        cons: ["No electric option", "Higher operating costs", "Emissions"],
      },
    };

    this.websiteInfo = {
      about:
        "EV Smarts is your trusted source for electric vehicle news, reviews, and insights. We provide comprehensive coverage of the latest developments in the EV industry, helping you make informed decisions about your next vehicle purchase.",
      contact: {
        email: "name@evsmarts.com",
        phone: "+1 (555) 123-4567",
        address: "123 Auto Street, Tech City, TC 12345",
        hours: "Mon-Fri: 9AM-6PM EST",
      },
      features: [
        "Latest EV news and updates",
        "Comprehensive vehicle reviews",
        "Charging infrastructure guides",
        "Industry insights and analysis",
        "Expert opinions and comparisons",
        "Buying guides and tips",
      ],
      categories: [
        "Electric Vehicles",
        "Hybrid Vehicles",
        "Charging Infrastructure",
        "Industry News",
        "Technology",
        "Reviews",
      ],
    };
  }

  // Process user query and generate response
  async processQuery(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Vehicle-specific queries
    const vehicleResponse = await this.handleVehicleQuery(lowerMessage);
    if (vehicleResponse) return vehicleResponse;

    // Website information queries
    const websiteResponse = this.handleWebsiteQuery(lowerMessage);
    if (websiteResponse) return websiteResponse;

    // Contact queries
    const contactResponse = this.handleContactQuery(lowerMessage);
    if (contactResponse) return contactResponse;

    // General EV questions
    const evResponse = this.handleEVQuery(lowerMessage);
    if (evResponse) return evResponse;

    // Comparison queries
    const comparisonResponse = this.handleComparisonQuery(lowerMessage);
    if (comparisonResponse) return comparisonResponse;

    // Advanced queries with external APIs
    const advancedResponse = await this.handleAdvancedQuery(lowerMessage);
    if (advancedResponse) return advancedResponse;

    // Default response
    return this.getDefaultResponse();
  }

  async handleVehicleQuery(message) {
    // Check for specific vehicle mentions
    for (const [vehicle, specs] of Object.entries(this.vehicleDatabase)) {
      if (message.includes(vehicle)) {
        let response = this.formatVehicleResponse(vehicle, specs);

        // Try to fetch additional data from external API
        try {
          const externalData = await this.externalAPI.fetchVehicleData(
            "Tesla",
            vehicle.replace("tesla ", ""),
            "2024"
          );
          if (externalData) {
            response += `\n\n📊 Additional Data:\n• Vehicle Type: ${externalData.vehicleType}\n• Source: ${externalData.source}`;
          }
        } catch (error) {
          // Continue without external data if API fails
        }

        return response;
      }
    }

    // Check for general vehicle type queries
    if (message.includes("suv") || message.includes("sport utility")) {
      const suvs = Object.entries(this.vehicleDatabase)
        .filter(([_, specs]) => specs.type.toLowerCase().includes("suv"))
        .map(([name, specs]) => ({ name, specs }));

      return this.formatVehicleListResponse("Electric SUVs", suvs);
    }

    if (message.includes("sedan") || message.includes("car")) {
      const sedans = Object.entries(this.vehicleDatabase)
        .filter(([_, specs]) => specs.type.toLowerCase().includes("sedan"))
        .map(([name, specs]) => ({ name, specs }));

      return this.formatVehicleListResponse("Electric Sedans", sedans);
    }

    return null;
  }

  handleWebsiteQuery(message) {
    if (
      message.includes("website") ||
      message.includes("about") ||
      message.includes("what is")
    ) {
      return (
        `About EV Smarts:\n\n${this.websiteInfo.about}\n\n` +
        `What we offer:\n${this.websiteInfo.features
          .map((f) => `• ${f}`)
          .join("\n")}\n\n` +
        `Categories we cover:\n${this.websiteInfo.categories
          .map((c) => `• ${c}`)
          .join("\n")}`
      );
    }

    if (message.includes("categories") || message.includes("topics")) {
      return (
        `We cover the following categories:\n\n${this.websiteInfo.categories
          .map((c) => `• ${c}`)
          .join("\n")}\n\n` +
        `Each category contains the latest news, reviews, and insights to help you stay informed about the automotive industry.`
      );
    }

    return null;
  }

  handleContactQuery(message) {
    if (
      message.includes("contact") ||
      message.includes("email") ||
      message.includes("phone") ||
      message.includes("address")
    ) {
      return (
        `Here's how you can contact us:\n\n` +
        `📧 Email: ${this.websiteInfo.contact.email}\n` +
        `📞 Phone: ${this.websiteInfo.contact.phone}\n` +
        `📍 Address: ${this.websiteInfo.contact.address}\n` +
        `🕒 Hours: ${this.websiteInfo.contact.hours}\n\n` +
        `You can also visit our Contact page for more details and a contact form. We typically respond within 24 hours during business days.`
      );
    }

    return null;
  }

  handleEVQuery(message) {
    if (
      message.includes("ev") ||
      message.includes("electric vehicle") ||
      message.includes("electric car")
    ) {
      return (
        `Electric vehicles (EVs) are automobiles that use one or more electric motors for propulsion. They're powered by rechargeable battery packs and produce zero tailpipe emissions.\n\n` +
        `Key benefits:\n` +
        `• Zero emissions - Better for the environment\n` +
        `• Lower operating costs - Electricity is cheaper than gas\n` +
        `• Quieter operation - No engine noise\n` +
        `• Instant torque - Quick acceleration\n` +
        `• Reduced maintenance - Fewer moving parts\n` +
        `• Tax incentives - Available in many regions\n\n` +
        `Popular EV brands include Tesla, Ford, Chevrolet, Nissan, Volkswagen, Hyundai, and Kia. Would you like specific information about any particular vehicle?`
      );
    }

    if (message.includes("charging") || message.includes("charge")) {
      return (
        `EV charging comes in three main levels:\n\n` +
        `🔌 Level 1 (120V): Slowest, uses standard household outlet\n` +
        `⚡ Level 2 (240V): Faster, requires dedicated charger\n` +
        `🚀 DC Fast Charging: Fastest, available at public stations\n\n` +
        `Most EVs can charge at home using Level 1 or 2 charging. Public charging networks like Tesla Supercharger, Electrify America, and ChargePoint provide fast charging options for longer trips.`
      );
    }

    if (message.includes("range") || message.includes("battery")) {
      return (
        `EV range varies by model and driving conditions:\n\n` +
        `• Most modern EVs: 200-350+ miles\n` +
        `• Factors affecting range: Speed, temperature, terrain, accessories\n` +
        `• Battery capacity: 40-100+ kWh\n` +
        `• Charging time: 30 minutes to 12+ hours depending on charger\n\n` +
        `For daily commuting, most EVs provide more than enough range. For longer trips, plan charging stops using apps like PlugShare or your vehicle's navigation system.`
      );
    }

    return null;
  }

  handleComparisonQuery(message) {
    if (
      message.includes("compare") ||
      message.includes("vs") ||
      message.includes("difference")
    ) {
      return (
        `Here's a comparison of EVs vs traditional vehicles:\n\n` +
        `🚗 EVs:\n` +
        `• Zero emissions\n` +
        `• Lower fuel costs\n` +
        `• Higher upfront cost\n` +
        `• Limited range (but improving)\n` +
        `• Growing charging network\n\n` +
        `⛽ Gas Vehicles:\n` +
        `• Lower upfront cost\n` +
        `• Unlimited range (with gas stations)\n` +
        `• Higher fuel costs\n` +
        `• Regular maintenance required\n` +
        `• Emissions\n\n` +
        `The choice depends on your driving needs, budget, and environmental priorities.`
      );
    }

    return null;
  }

  formatVehicleResponse(vehicleName, specs) {
    return (
      `Here's what I found about the ${vehicleName.toUpperCase()}:\n\n` +
      `🚗 Type: ${specs.type}\n` +
      `🔋 Range: ${specs.range}\n` +
      `💰 Price: ${specs.price}\n` +
      `⚡ Acceleration: ${specs.acceleration}\n` +
      `🔌 Charging: ${specs.charging}\n` +
      `🔋 Battery: ${specs.battery}\n\n` +
      `✨ Key Features:\n${specs.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n` +
      `✅ Pros:\n${specs.pros.map((p) => `• ${p}`).join("\n")}\n\n` +
      `❌ Cons:\n${specs.cons.map((c) => `• ${c}`).join("\n")}`
    );
  }

  formatVehicleListResponse(category, vehicles) {
    let response = `${category}:\n\n`;
    vehicles.forEach(({ name, specs }) => {
      response +=
        `🚗 ${name.toUpperCase()}\n` +
        `   Range: ${specs.range} | Price: ${specs.price}\n` +
        `   Type: ${specs.type}\n\n`;
    });
    return (
      response + `Ask me about any specific model for detailed information!`
    );
  }

  getDefaultResponse() {
    return (
      `I'm here to help with questions about electric vehicles, vehicle specifications, our website, or contact information. You can ask me about:\n\n` +
      `🚗 Specific vehicle models (Tesla Model 3, Ford Mustang Mach-E, etc.)\n` +
      `⚡ EV technology and benefits\n` +
      `🌐 Our website and services\n` +
      `📞 Contact information and business hours\n` +
      `🔋 Charging and range information\n` +
      `📊 Vehicle comparisons\n\n` +
      `What would you like to know?`
    );
  }

  // Get suggested questions for the chat interface
  getSuggestedQuestions() {
    return [
      "Tell me about Tesla Model 3",
      "What are the benefits of EVs?",
      "How can I contact you?",
      "What is this website about?",
      "Show me electric SUVs",
      "How does EV charging work?",
      "Compare EVs vs gas cars",
    ];
  }

  async handleAdvancedQuery(message) {
    // Market data queries
    if (
      message.includes("market") ||
      message.includes("sales") ||
      message.includes("trends")
    ) {
      try {
        const marketData = await this.externalAPI.fetchMarketData();
        if (marketData) {
          return (
            `📊 Current EV Market Data:\n\n` +
            `🚗 Total EVs Sold: ${marketData.totalEVsSold}\n` +
            `📈 Market Growth: ${marketData.marketGrowth}\n` +
            `💰 Average Price: ${marketData.averagePrice}\n\n` +
            `🏆 Top Brands:\n${marketData.topBrands
              .map((brand) => `• ${brand}`)
              .join("\n")}\n\n` +
            `📊 Market Share:\n${Object.entries(marketData.marketShare)
              .map(([brand, share]) => `• ${brand}: ${share}`)
              .join("\n")}`
          );
        }
      } catch (error) {
        // Continue without market data if API fails
      }
    }

    // News queries
    if (
      message.includes("news") ||
      message.includes("latest") ||
      message.includes("updates")
    ) {
      try {
        const news = await this.externalAPI.fetchEVNews();
        if (news && news.length > 0) {
          let response = `📰 Latest EV News:\n\n`;
          news.forEach((item, index) => {
            response +=
              `${index + 1}. ${item.title}\n` +
              `   ${item.summary}\n` +
              `   Source: ${item.source}\n\n`;
          });
          return response;
        }
      } catch (error) {
        // Continue without news if API fails
      }
    }

    // Charging station queries
    if (
      message.includes("charging station") ||
      message.includes("where to charge")
    ) {
      return (
        `🔌 Finding Charging Stations:\n\n` +
        `To find charging stations near you, you can use:\n\n` +
        `• PlugShare app/website\n` +
        `• Tesla Supercharger network (for Tesla owners)\n` +
        `• Electrify America stations\n` +
        `• ChargePoint network\n` +
        `• Your vehicle's built-in navigation\n\n` +
        `Most public charging stations are located at:\n` +
        `• Shopping centers and malls\n` +
        `• Restaurants and coffee shops\n` +
        `• Hotels and motels\n` +
        `• Highway rest stops\n` +
        `• Workplace parking lots`
      );
    }

    // Range calculation queries
    if (
      message.includes("range") &&
      (message.includes("calculate") || message.includes("estimate"))
    ) {
      return (
        `🔋 EV Range Calculator:\n\n` +
        `Range depends on several factors:\n\n` +
        `🌡️ Temperature:\n` +
        `• Cold weather (below 32°F): -30% range\n` +
        `• Hot weather (above 90°F): -15% range\n\n` +
        `🚗 Speed:\n` +
        `• Highway speeds (70+ mph): -20% range\n` +
        `• City driving: Optimal range\n\n` +
        `🏔️ Terrain:\n` +
        `• Hilly areas: -10% range\n` +
        `• Flat terrain: Optimal range\n\n` +
        `🔧 Other factors:\n` +
        `• Use of climate control\n` +
        `• Cargo weight\n` +
        `• Tire pressure\n` +
        `• Driving style\n\n` +
        `Ask me about a specific vehicle for its base range!`
      );
    }

    return null;
  }
}

export default AIService;
