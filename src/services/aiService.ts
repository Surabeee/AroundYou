
// AI service for generating adventure narratives
// Note: This requires Google Gemini API key

export interface AdventureRequest {
  location: string;
  radius: number;
  transportMode: string;
  interests: string[];
  places: any[];
}

export interface Adventure {
  title: string;
  description: string;
  theme: string;
  totalTime: string;
  totalDistance: string;
  stops: AdventureStop[];
}

export interface AdventureStop {
  id: number;
  name: string;
  type: string;
  description: string;
  address: string;
  coordinates: [number, number];
  estimatedTime: string;
  narrativeConnection?: string;
  uniqueFeatures: string[];
}

class AIService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor() {
    // In production, this would come from environment variables
    this.apiKey = 'YOUR_GEMINI_API_KEY';
  }

  async generateAdventure(request: AdventureRequest): Promise<Adventure> {
    try {
      // This is a mock implementation
      // In production, you would call Google Gemini API with structured prompts
      
      const mockAdventure: Adventure = {
        title: this.generateTitle(request.interests),
        description: this.generateDescription(request.location, request.interests),
        theme: this.generateTheme(request.interests),
        totalTime: this.estimateTime(request.radius, request.transportMode),
        totalDistance: `${request.radius}km radius`,
        stops: this.generateStops(request.places, request.interests)
      };

      return mockAdventure;
    } catch (error) {
      console.error('Error generating adventure:', error);
      throw new Error('Failed to generate adventure');
    }
  }

  private generateTitle(interests: string[]): string {
    const themes = {
      museums: "Cultural Heritage Trail",
      food: "Culinary Discovery Journey", 
      parks: "Urban Nature Escape",
      history: "Historic Landmarks Tour",
      shopping: "Local Markets Adventure",
      nightlife: "Evening Entertainment Circuit",
      architecture: "Architectural Wonders Walk",
      local: "Authentic Neighborhood Experience"
    };

    const primaryInterest = interests[0];
    return themes[primaryInterest] || "Urban Discovery Adventure";
  }

  private generateDescription(location: string, interests: string[]): string {
    return `Explore the vibrant character of ${location} through carefully curated stops that reveal hidden stories and local culture. This adventure weaves together ${interests.join(', ')} into a cohesive narrative experience.`;
  }

  private generateTheme(interests: string[]): string {
    if (interests.includes('museums') || interests.includes('history')) {
      return "cultural-heritage";
    }
    if (interests.includes('food')) {
      return "culinary-exploration";
    }
    if (interests.includes('parks')) {
      return "nature-urban";
    }
    return "authentic-local";
  }

  private estimateTime(radius: number, transportMode: string): string {
    const baseTime = radius <= 3 ? 2 : radius <= 10 ? 4 : 6;
    const modeMultiplier = transportMode === 'walking' ? 1.5 : transportMode === 'public' ? 1.2 : 1.0;
    const estimatedHours = Math.round(baseTime * modeMultiplier);
    
    return `${estimatedHours-1}-${estimatedHours+1} hours`;
  }

  private generateStops(places: any[], interests: string[]): AdventureStop[] {
    // This would use AI to create rich descriptions and connections
    return places.slice(0, 4).map((place, index) => ({
      id: index + 1,
      name: place.name,
      type: place.category || 'attraction',
      description: this.generateStopDescription(place, interests),
      address: place.address,
      coordinates: place.coordinates,
      estimatedTime: this.estimateStopTime(place.category),
      narrativeConnection: this.generateNarrativeConnection(index, places.length),
      uniqueFeatures: this.generateUniqueFeatures(place)
    }));
  }

  private generateStopDescription(place: any, interests: string[]): string {
    const descriptions = {
      museum: "A cultural treasure showcasing local art and history that connects visitors to the community's creative soul.",
      food: "An authentic culinary experience where local flavors tell the story of the neighborhood's heritage.",
      park: "A green sanctuary in the urban landscape, offering respite and natural beauty amid city life.",
      shopping: "A vibrant marketplace where local commerce and community converge in authentic exchange."
    };

    return descriptions[place.category] || "A unique local destination with its own distinctive character and story.";
  }

  private estimateStopTime(category: string): string {
    const times = {
      museum: "45-60 minutes",
      food: "30-45 minutes", 
      park: "30-45 minutes",
      shopping: "60-90 minutes"
    };

    return times[category] || "30-60 minutes";
  }

  private generateNarrativeConnection(index: number, total: number): string {
    if (index === 0) return "Beginning your journey into local culture and community.";
    if (index === total - 1) return "Concluding your adventure with lasting memories and new perspectives.";
    return "Continuing the narrative thread that connects this area's unique character.";
  }

  private generateUniqueFeatures(place: any): string[] {
    return [
      "Local historical significance",
      "Unique architectural elements", 
      "Community gathering space",
      "Hidden cultural details"
    ];
  }
}

export const aiService = new AIService();
