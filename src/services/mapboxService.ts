
// Mapbox integration service
// Note: This requires a Mapbox API key to be added to environment variables

export interface Location {
  name: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  category?: string;
  rating?: number;
}

export interface RouteInfo {
  distance: number; // in kilometers
  duration: number; // in minutes
  steps: string[];
}

class MapboxService {
  private apiKey: string;
  private baseUrl = 'https://api.mapbox.com';

  constructor() {
    // In production, this would come from environment variables
    // For now, we'll use a placeholder
    this.apiKey = 'pk.eyJ1Ijoic3VyYWJoaXRhbWJlIiwiYSI6ImNtY2dzajFhbTBscnEyd3IzYXp4b3hnZHAifQ.Yj_ZbgFGVNufroTIOVsQKg';
  }

  // Search for places within a radius
  async searchPlaces(
    center: [number, number],
    radiusKm: number,
    categories: string[] = [],
    limit: number = 20
  ): Promise<Location[]> {
    try {
      // This is a mock implementation
      // In production, you would use Mapbox Search Box API
      const mockLocations: Location[] = [
        {
          name: "Historic Art Gallery",
          address: "123 Cultural Street",
          coordinates: [center[0] + 0.001, center[1] + 0.001],
          category: "museum",
          rating: 4.5
        },
        {
          name: "Artisan Coffee Roastery",
          address: "456 Bean Avenue", 
          coordinates: [center[0] + 0.002, center[1] + 0.002],
          category: "food",
          rating: 4.7
        },
        {
          name: "Secret Garden Park",
          address: "789 Green Lane",
          coordinates: [center[0] + 0.003, center[1] + 0.003],
          category: "park",
          rating: 4.3
        }
      ];

      return mockLocations.filter(location => 
        categories.length === 0 || categories.includes(location.category || '')
      );
    } catch (error) {
      console.error('Error searching places:', error);
      throw new Error('Failed to search places');
    }
  }

  // Get directions between points
  async getRoute(
    waypoints: [number, number][],
    transportMode: 'walking' | 'driving' | 'cycling' = 'walking'
  ): Promise<RouteInfo> {
    try {
      // This is a mock implementation
      // In production, you would use Mapbox Directions API
      const mockRoute: RouteInfo = {
        distance: waypoints.length * 0.5, // Mock distance
        duration: waypoints.length * 15,   // Mock duration
        steps: [
          "Head north on Main Street",
          "Turn right on Cultural Avenue",
          "Destination will be on your left"
        ]
      };

      return mockRoute;
    } catch (error) {
      console.error('Error getting route:', error);
      throw new Error('Failed to get route');
    }
  }

  // Geocode address to coordinates
  async geocodeAddress(address: string): Promise<[number, number] | null> {
    try {
      // This is a mock implementation
      // In production, you would use Mapbox Geocoding API
      
      // Return mock coordinates (San Francisco downtown as example)
      return [-122.4194, 37.7749];
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }

  // Reverse geocode coordinates to address
  async reverseGeocode(coordinates: [number, number]): Promise<string | null> {
    try {
      // This is a mock implementation
      // In production, you would use Mapbox Geocoding API
      return "Downtown, Sample City";
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return null;
    }
  }
}

export const mapboxService = new MapboxService();
