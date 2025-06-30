
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />
      
      <Hero />
      
      <section className="py-24 md:py-32 bg-gradient-to-br from-white via-orange-50/30 to-yellow-50/30 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-60"></div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                Plan Your Adventure
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover extraordinary experiences within your chosen radius
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400"></div>
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-12 max-w-4xl mx-auto">
            <FadeIn delay={100}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100/50 hover:shadow-2xl transition-all duration-300">
                <LocationInput 
                  location={location}
                  onLocationChange={setLocation}
                />
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100/50 hover:shadow-2xl transition-all duration-300">
                <RadiusSelector 
                  radius={radius}
                  onRadiusChange={setRadius}
                />
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100/50 hover:shadow-2xl transition-all duration-300">
                <TransportSelector 
                  transport={transport}
                  onTransportChange={setTransport}
                />
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100/50 hover:shadow-2xl transition-all duration-300">
                <InterestSelector 
                  interests={interests}
                  onInterestsChange={setInterests}
                />
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="text-center pt-8">
                <Button
                  onClick={handleGenerateAdventure}
                  disabled={isGenerating || !location}
                  size="lg"
                  className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isGenerating ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating Adventure...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>✨ Generate Adventure</span>
                    </span>
                  )}
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
