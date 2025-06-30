
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
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-medium">Starting Location</h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={detectCurrentLocation}
          disabled={isDetecting}
          variant="outline"
          className="sm:w-auto"
        >
          {isDetecting ? 'Detecting...' : '📍 Use Current Location'}
        </Button>
        
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            placeholder="Or enter city/address..."
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
            className="flex-1"
          />
          <Button 
            onClick={handleManualSubmit}
            disabled={!manualInput.trim()}
          >
            Set
          </Button>
        </div>
      </div>

      {location && (
        <div className="text-sm text-muted-foreground">
          📍 Starting from: <span className="font-medium">{location}</span>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
