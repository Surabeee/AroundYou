
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RadiusSelector from '@/components/RadiusSelector';
import TransportSelector from '@/components/TransportSelector';
import InterestSelector from '@/components/InterestSelector';
import LocationInput from '@/components/LocationInput';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';

const HomePage = () => {
  const navigate = useNavigate();
  const [radius, setRadius] = useState(8);
  const [transport, setTransport] = useState('public');
  const [interests, setInterests] = useState([]);
  const [location, setLocation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAdventure = async () => {
    if (!location) {
      alert('Please select a location first');
      return;
    }

    setIsGenerating(true);
    
    // Store the configuration in localStorage for the adventure page
    localStorage.setItem('adventureConfig', JSON.stringify({
      radius,
      transport,
      interests,
      location
    }));

    // Navigate to adventure page
    navigate('/adventure');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <Hero />
      
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-4">
                Plan Your Adventure
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover extraordinary experiences within your chosen radius
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn delay={100}>
              <LocationInput 
                location={location}
                onLocationChange={setLocation}
              />
            </FadeIn>

            <FadeIn delay={200}>
              <RadiusSelector 
                radius={radius}
                onRadiusChange={setRadius}
              />
            </FadeIn>

            <FadeIn delay={300}>
              <TransportSelector 
                transport={transport}
                onTransportChange={setTransport}
              />
            </FadeIn>

            <FadeIn delay={400}>
              <InterestSelector 
                interests={interests}
                onInterestsChange={setInterests}
              />
            </FadeIn>

            <FadeIn delay={500}>
              <div className="text-center pt-8">
                <Button
                  onClick={handleGenerateAdventure}
                  disabled={isGenerating || !location}
                  size="lg"
                  className="px-8 py-3 text-base"
                >
                  {isGenerating ? 'Generating Adventure...' : 'Generate Adventure'}
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
