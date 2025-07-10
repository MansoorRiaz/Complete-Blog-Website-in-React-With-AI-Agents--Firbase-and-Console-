// External API Service for fetching real-time vehicle data
class ExternalAPIService {
  constructor() {
    // You can add your API keys here for real external services
    this.apiKeys = {
      // Add your API keys here when you have them
      // 'nhtsa': 'your_nhtsa_api_key',
      // 'carquery': 'your_carquery_api_key',
    };
  }

  // Fetch vehicle data from NHTSA API (free, no key required)
  async fetchVehicleData(make, model, year) {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
      );
      const data = await response.json();

      if (data.Results && data.Results.length > 0) {
        const vehicleInfo = data.Results.find((vehicle) =>
          vehicle.Model_Name.toLowerCase().includes(model.toLowerCase())
        );

        if (vehicleInfo) {
          return {
            make: vehicleInfo.Make_Name,
            model: vehicleInfo.Model_Name,
            vehicleType: vehicleInfo.VehicleTypeName || "Unknown",
            source: "NHTSA",
          };
        }
      }

      return null;
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      return null;
    }
  }

  // Fetch vehicle recalls from NHTSA
  async fetchVehicleRecalls(make, model, year) {
    try {
      const response = await fetch(
        `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${year}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results.slice(0, 5); // Return first 5 recalls
      }

      return [];
    } catch (error) {
      console.error("Error fetching recall data:", error);
      return [];
    }
  }

  // Fetch charging station data (using a free API)
  async fetchChargingStations(lat, lng, radius = 50) {
    try {
      // Using OpenChargeMap API (free tier)
      const response = await fetch(
        `https://api.openchargemap.io/v3/poi?key=your_api_key&latitude=${lat}&longitude=${lng}&radius=${radius}&maxresults=10`
      );
      const data = await response.json();

      return data.map((station) => ({
        name: station.AddressInfo.Title,
        address: station.AddressInfo.AddressLine1,
        distance: station.AddressInfo.Distance,
        connectors:
          station.Connections?.map((conn) => conn.ConnectionType?.Title).filter(
            Boolean
          ) || [],
      }));
    } catch (error) {
      console.error("Error fetching charging stations:", error);
      return [];
    }
  }

  // Fetch current EV market data (simulated)
  async fetchMarketData() {
    try {
      // Simulate market data - in real implementation, you'd use a financial API
      const marketData = {
        totalEVsSold: "1.2M",
        marketGrowth: "40%",
        averagePrice: "$55,000",
        topBrands: ["Tesla", "Ford", "Chevrolet", "Nissan", "Volkswagen"],
        marketShare: {
          Tesla: "18%",
          Ford: "7%",
          Chevrolet: "6%",
          Nissan: "5%",
          Others: "64%",
        },
      };

      return marketData;
    } catch (error) {
      console.error("Error fetching market data:", error);
      return null;
    }
  }

  // Fetch news about EVs (using a news API)
  async fetchEVNews() {
    try {
      // Simulate news data - in real implementation, you'd use a news API
      const news = [
        {
          title: "Tesla Announces New Model Updates",
          summary:
            "Tesla has announced significant updates to their Model 3 and Model Y vehicles...",
          source: "EV News",
          date: new Date().toISOString(),
        },
        {
          title: "Ford Expands Electric Vehicle Production",
          summary:
            "Ford Motor Company has announced plans to increase production of electric vehicles...",
          source: "Auto Industry News",
          date: new Date().toISOString(),
        },
        {
          title: "New Charging Infrastructure Investment",
          summary:
            "Major investment announced for expanding EV charging infrastructure across the country...",
          source: "Infrastructure News",
          date: new Date().toISOString(),
        },
      ];

      return news;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  }

  // Fetch weather data for range calculations
  async fetchWeatherData(city) {
    try {
      // Simulate weather data - in real implementation, you'd use a weather API
      const weatherData = {
        temperature: 72,
        condition: "Sunny",
        humidity: 45,
        windSpeed: 8,
        impactOnRange: "Optimal conditions for EV range",
      };

      return weatherData;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  // Calculate EV range based on various factors
  calculateRange(baseRange, factors) {
    let adjustedRange = baseRange;

    // Temperature impact
    if (factors.temperature < 32) {
      adjustedRange *= 0.7; // 30% reduction in cold weather
    } else if (factors.temperature > 90) {
      adjustedRange *= 0.85; // 15% reduction in hot weather
    }

    // Speed impact
    if (factors.speed > 70) {
      adjustedRange *= 0.8; // 20% reduction at high speeds
    }

    // Terrain impact
    if (factors.terrain === "hilly") {
      adjustedRange *= 0.9; // 10% reduction on hilly terrain
    }

    return Math.round(adjustedRange);
  }

  // Get charging time estimates
  getChargingTime(batteryCapacity, chargerPower, currentCharge = 0) {
    const chargeNeeded = batteryCapacity - currentCharge;
    const hours = chargeNeeded / chargerPower;

    return {
      hours: Math.round(hours * 10) / 10,
      minutes: Math.round(hours * 60),
      fastCharging: chargerPower >= 50 ? "Available" : "Not available",
    };
  }

  // Compare vehicles side by side
  compareVehicles(vehicle1, vehicle2) {
    const comparison = {
      range: {
        vehicle1: vehicle1.range,
        vehicle2: vehicle2.range,
        winner: vehicle1.range > vehicle2.range ? "vehicle1" : "vehicle2",
      },
      price: {
        vehicle1: vehicle1.price,
        vehicle2: vehicle2.price,
        winner: vehicle1.price < vehicle2.price ? "vehicle1" : "vehicle2",
      },
      acceleration: {
        vehicle1: vehicle1.acceleration,
        vehicle2: vehicle2.acceleration,
        winner:
          vehicle1.acceleration < vehicle2.acceleration
            ? "vehicle1"
            : "vehicle2",
      },
    };

    return comparison;
  }
}

export default ExternalAPIService;
