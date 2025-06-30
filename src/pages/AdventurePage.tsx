
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AdventureMap from '@/components/AdventureMap';
import AdventureStops from '@/components/AdventureStops';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';

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
      
      // Mock adventure generation - in production, this would call your AI service
      const mockAdventure = {
        title: "Urban Cultural Discovery",
        description: "Explore the vibrant cultural tapestry of your city through carefully curated stops that reveal hidden stories and local character.",
        totalTime: "3-5 hours",
        totalDistance: `${config.radius}km radius`,
        transportMode: config.transport,
        stops: [
          {
            id: 1,
            name: "Historic Art Gallery",
            type: "museum",
            description: "A hidden gem showcasing local artists and the neighborhood's creative evolution over decades.",
            address: "123 Cultural Street",
            coordinates: [0, 0],
            estimatedTime: "45-60 minutes",
            completed: false
          },
          {
            id: 2,
            name: "Artisan Coffee Roastery",
            type: "food",
            description: "Third-generation family roastery where coffee culture meets community gathering space.",
            address: "456 Bean Avenue",
            coordinates: [0.001, 0.001],
            estimatedTime: "30-45 minutes",
            completed: false
          },
          {
            id: 3,
            name: "Secret Garden Park",
            type: "park",
            description: "Urban oasis hidden behind historic buildings, featuring sculptures by local artists.",
            address: "789 Green Lane",
            coordinates: [0.002, 0.002],
            estimatedTime: "30-45 minutes",
            completed: false
          },
          {
            id: 4,
            name: "Heritage Market Square",
            type: "shopping",
            description: "Historic marketplace transformed into modern artisan hub while preserving its authentic character.",
            address: "321 Market Plaza",
            coordinates: [0.003, 0.003],
            estimatedTime: "60-90 minutes",
            completed: false
          }
        ]
      };

      setAdventure(mockAdventure);
    } catch (error) {
      console.error('Error generating adventure:', error);
      // Handle error - could show error message or redirect
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
        <Header />
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

  if (!adventure) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg font-medium mb-4">Unable to generate adventure</p>
            <Button onClick={() => navigate('/')}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
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
