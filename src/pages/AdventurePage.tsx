import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AdventureMap from '@/components/AdventureMap';
import AdventureStops from '@/components/AdventureStops';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MUMBAI_MOCK_ADVENTURE = {
  title: "Mumbai Marvels: A Day of Discovery",
  description: "Experience the vibrant spirit of Mumbai through a curated journey of iconic sights, flavors, and hidden gems. Perfect for first-timers and locals alike!",
  totalTime: "4-5 hours",
  totalDistance: "8km radius",
  transportMode: "public",
  stops: [
    {
      id: 1,
      name: "Gateway of India",
      type: "history",
      description: "Start your adventure at Mumbai's most iconic monument, a symbol of the city's rich colonial past and bustling present.",
      address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
      coordinates: [72.8347, 18.9219],
      estimatedTime: "30-45 minutes",
      completed: false
    },
    {
      id: 2,
      name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
      type: "museum",
      description: "Explore Mumbai's premier museum, home to a vast collection of art, archaeology, and natural history.",
      address: "159-161, Mahatma Gandhi Road, Fort, Mumbai, Maharashtra 400032",
      coordinates: [72.8326, 18.9269],
      estimatedTime: "45-60 minutes",
      completed: false
    },
    {
      id: 3,
      name: "Kala Ghoda Art Precinct",
      type: "art",
      description: "Wander through Mumbai's creative heart, filled with galleries, street art, and quirky boutiques.",
      address: "Kala Ghoda, Fort, Mumbai, Maharashtra 400001",
      coordinates: [72.8305, 18.9281],
      estimatedTime: "30-45 minutes",
      completed: false
    },
    {
      id: 4,
      name: "Leopold Cafe",
      type: "food",
      description: "Refuel at this legendary Irani café, a favorite with locals and travelers for decades.",
      address: "Colaba Causeway, Colaba, Mumbai, Maharashtra 400005",
      coordinates: [72.8322, 18.9216],
      estimatedTime: "30-45 minutes",
      completed: false
    },
    {
      id: 5,
      name: "Marine Drive",
      type: "park",
      description: "End your day with a stroll along the Queen's Necklace, soaking in the sunset and sea breeze.",
      address: "Marine Drive, Mumbai, Maharashtra 400004",
      coordinates: [72.8194, 18.9430],
      estimatedTime: "30-45 minutes",
      completed: false
    }
  ]
};

const AdventurePage = () => {
  const navigate = useNavigate();
  const [adventure, setAdventure] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStop, setCurrentStop] = useState(0);

  useEffect(() => {
    generateAdventure();
  }, []);

  const generateAdventure = async () => {
    setIsLoading(true);
    
    try {
      // Get configuration from localStorage
      const config = JSON.parse(localStorage.getItem('adventureConfig') || '{}');
      
      // 1. Geocode the location string to get lat/lng
      let lng = config.lng;
      let lat = config.lat;
      if (!lng || !lat) {
        // If not already present, geocode the address
        const geoRes = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(config.location)}.json?access_token=${MAPBOX_TOKEN}`);
        const geoData = await geoRes.json();
        if (geoData.features && geoData.features.length > 0) {
          lng = geoData.features[0].center[0];
          lat = geoData.features[0].center[1];
        } else {
          throw new Error('Could not geocode location');
        }
      }

      // 2. Call your backend to get real places
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lng,
          lat,
          interests: config.interests,
          transport: config.transport,
          radius: config.radius * 1000 // convert km to meters if needed
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();

      // 3. Use the returned places to build your adventure object
      const realAdventure = {
        title: "Urban Cultural Discovery",
        description: "Explore the vibrant cultural tapestry of your city through carefully curated stops that reveal hidden stories and local character.",
        totalTime: "3-5 hours",
        totalDistance: `${config.radius}km radius`,
        transportMode: config.transport,
        stops: data.places.map((place, idx) => ({
          id: idx + 1,
          name: place.name,
          type: place.category || 'attraction',
          description: place.description || '',
          address: place.address,
          coordinates: place.geometry.coordinates,
          estimatedTime: "30-60 minutes",
          completed: false
        }))
      };

      setAdventure(realAdventure);
    } catch (error) {
      console.error('Error generating adventure:', error);
      // Fallback to Mumbai mock adventure
      setAdventure(MUMBAI_MOCK_ADVENTURE);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopComplete = (stopId: number) => {
    if (!adventure) return;
    
    setAdventure({
      ...adventure,
      stops: adventure.stops.map(stop =>
        stop.id === stopId ? { ...stop, completed: true } : stop
      )
    });

    // Move to next uncompleted stop
    const nextStopIndex = adventure.stops.findIndex(
      (stop, index) => index > currentStop && !stop.completed
    );
    if (nextStopIndex !== -1) {
      setCurrentStop(nextStopIndex);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header forceDarkGlass={true} />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-orangery-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium">Generating your adventure...</p>
            <p className="text-muted-foreground">Creating personalized storylines</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header forceDarkGlass={true} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <FadeIn>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-4">
                {adventure.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {adventure.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>⏱️ {adventure.totalTime}</span>
                <span>📍 {adventure.totalDistance}</span>
                <span>🚇 {adventure.transportMode}</span>
              </div>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn delay={200}>
              <AdventureStops
                stops={adventure.stops}
                currentStop={currentStop}
                onStopComplete={handleStopComplete}
                onStopSelect={setCurrentStop}
              />
            </FadeIn>

            <FadeIn delay={300}>
              <AdventureMap
                stops={adventure.stops}
                currentStop={currentStop}
              />
            </FadeIn>
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Generate New Adventure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventurePage;
