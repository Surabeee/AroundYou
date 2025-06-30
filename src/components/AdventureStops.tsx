
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

interface AdventureStopsProps {
  stops: Stop[];
  currentStop: number;
  onStopComplete: (stopId: number) => void;
  onStopSelect: (index: number) => void;
  className?: string;
}

const AdventureStops: React.FC<AdventureStopsProps> = ({
  stops,
  currentStop,
  onStopComplete,
  onStopSelect,
  className
}) => {
  const getStopIcon = (type: string) => {
    const icons = {
      museum: '🏛️',
      food: '🍽️',
      park: '🌳',
      shopping: '🛍️',
      history: '🏛️',
      entertainment: '🎭',
      default: '📍'
    };
    return icons[type] || icons.default;
  };

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-serif font-medium mb-6">Adventure Stops</h2>
      
      {stops.map((stop, index) => (
        <div
          key={stop.id}
          className={cn(
            'border rounded-lg p-4 transition-all cursor-pointer',
            index === currentStop && 'border-orangery-500 bg-orangery-50',
            stop.completed && 'border-green-500 bg-green-50',
            index !== currentStop && !stop.completed && 'border-gray-200 hover:border-gray-300'
          )}
          onClick={() => onStopSelect(index)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <span className="text-2xl">{getStopIcon(stop.type)}</span>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">{stop.name}</h3>
                <p className="text-muted-foreground mb-2">{stop.description}</p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                  <span>📍 {stop.address}</span>
                  <span>⏱️ {stop.estimatedTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              {stop.completed ? (
                <span className="text-green-600 font-medium">✅ Completed</span>
              ) : index === currentStop ? (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStopComplete(stop.id);
                  }}
                >
                  Mark Complete
                </Button>
              ) : (
                <span className="text-muted-foreground text-sm">Stop {index + 1}</span>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Progress</span>
          <span className="text-muted-foreground">
            {stops.filter(s => s.completed).length}/{stops.length} completed
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orangery-500 h-2 rounded-full transition-all"
            style={{
              width: `${(stops.filter(s => s.completed).length / stops.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdventureStops;
