
import React from 'react';
import { cn } from '@/lib/utils';

interface Stop {
  id: number;
  name: string;
  type: string;
  description: string;
  address: string;
  coordinates: [number, number];
  estimatedTime: string;
  completed: boolean;
}

interface AdventureMapProps {
  stops: Stop[];
  currentStop: number;
  className?: string;
}

const AdventureMap: React.FC<AdventureMapProps> = ({
  stops,
  currentStop,
  className
}) => {
  // This is a placeholder for the map component
  // In production, you would integrate with Mapbox here
  
  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-serif font-medium mb-6">Route Map</h2>
      
      <div className="border rounded-lg p-8 bg-gray-50 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="font-medium mb-2">Interactive Map</h3>
          <p className="text-muted-foreground mb-4">
            Map integration requires Mapbox API key
          </p>
          <div className="text-sm space-y-2">
            <div className="font-medium">Route Overview:</div>
            {stops.map((stop, index) => (
              <div
                key={stop.id}
                className={cn(
                  'flex items-center space-x-2',
                  index === currentStop && 'font-medium text-orangery-600',
                  stop.completed && 'text-green-600'
                )}
              >
                <span>{index + 1}.</span>
                <span>{stop.name}</span>
                {stop.completed && <span>✅</span>}
                {index === currentStop && <span>👈 Current</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-gray-50 rounded">
          <div className="font-medium mb-1">Total Stops</div>
          <div className="text-orangery-600">{stops.length}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="font-medium mb-1">Completed</div>
          <div className="text-green-600">{stops.filter(s => s.completed).length}</div>
        </div>
      </div>
    </div>
  );
};

export default AdventureMap;
