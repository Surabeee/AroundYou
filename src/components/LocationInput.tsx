import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

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
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 border border-gray-200">
          <MapPin className="w-4 h-4 text-gray-500" />
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 border-b-2 border-blue-100 pb-1">Starting Location</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={detectCurrentLocation}
          disabled={isDetecting}
          variant="outline"
          className="sm:w-auto border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-400 transition"
        >
          {isDetecting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <span>Detecting...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Use Current Location</span>
            </span>
          )}
        </Button>
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            placeholder="Or enter city/address..."
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
            className="flex-1 border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-md text-sm"
          />
          <Button 
            onClick={handleManualSubmit}
            disabled={!manualInput.trim()}
            variant="outline"
            className="border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition"
          >
            Set
          </Button>
        </div>
      </div>
      {location && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-center gap-2 mt-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-blue-100">
            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
          </span>
          <span className="text-gray-700 text-sm">
            Starting from: <span className="font-medium text-blue-700">{location}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
