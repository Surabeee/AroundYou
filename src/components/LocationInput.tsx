
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LocationInputProps {
  location: string;
  onLocationChange: (location: string) => void;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  location, 
  onLocationChange, 
  className 
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [manualInput, setManualInput] = useState(location);

  const detectCurrentLocation = () => {
    setIsDetecting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // For demo purposes, we'll use a placeholder location
            // In production, you'd use Mapbox Geocoding API here
            const mockLocation = "Current Location";
            onLocationChange(mockLocation);
            setManualInput(mockLocation);
          } catch (error) {
            console.error('Error getting location name:', error);
            onLocationChange("Current Location");
            setManualInput("Current Location");
          } finally {
            setIsDetecting(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsDetecting(false);
          alert('Could not detect your location. Please enter manually.');
        }
      );
    } else {
      setIsDetecting(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onLocationChange(manualInput.trim());
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">📍</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-800">Starting Location</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={detectCurrentLocation}
          disabled={isDetecting}
          variant="outline"
          className="sm:w-auto border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
        >
          {isDetecting ? (
            <span className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-orange-600/30 border-t-orange-600 rounded-full animate-spin"></div>
              <span>Detecting...</span>
            </span>
          ) : (
            '📍 Use Current Location'
          )}
        </Button>
        
        <div className="flex-1 flex gap-3">
          <Input
            type="text"
            placeholder="Or enter city/address..."
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
            className="flex-1 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg"
          />
          <Button 
            onClick={handleManualSubmit}
            disabled={!manualInput.trim()}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Set
          </Button>
        </div>
      </div>

      {location && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center space-x-3">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <span className="text-gray-700">
            Starting from: <span className="font-semibold text-orange-700">{location}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
