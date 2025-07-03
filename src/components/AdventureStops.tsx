import React, { useEffect, useRef, useState } from 'react';
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
  // Pulse animation state
  const [pulseStopId, setPulseStopId] = useState<number | null>(null);
  // Confetti animation state
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCompletedCount = useRef(0);

  // Pulse when a stop is marked complete
  useEffect(() => {
    const completedStops = stops.filter(s => s.completed);
    if (completedStops.length > prevCompletedCount.current) {
      // Find the newly completed stop
      const lastCompleted = completedStops.find(
        s => !stops.find(os => os.id === s.id && !os.completed)
      );
      if (lastCompleted) {
        setPulseStopId(lastCompleted.id);
        setTimeout(() => setPulseStopId(null), 600);
      }
    }
    prevCompletedCount.current = completedStops.length;
  }, [stops]);

  // Confetti when all stops are complete
  useEffect(() => {
    if (stops.length > 0 && stops.every(s => s.completed)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }
  }, [stops]);

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
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-start justify-center">
          {/* Simple SVG confetti burst */}
          <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop: 24}}>
            <g>
              <circle cx="30" cy="30" r="6" fill="#fbbf24"/>
              <circle cx="60" cy="20" r="4" fill="#34d399"/>
              <circle cx="110" cy="18" r="7" fill="#f472b6"/>
              <circle cx="170" cy="30" r="5" fill="#60a5fa"/>
              <circle cx="200" cy="20" r="4" fill="#f87171"/>
              <circle cx="80" cy="40" r="3" fill="#fbbf24"/>
              <circle cx="140" cy="40" r="4" fill="#34d399"/>
              <circle cx="190" cy="50" r="3" fill="#f472b6"/>
              <circle cx="40" cy="60" r="4" fill="#60a5fa"/>
              <circle cx="120" cy="60" r="5" fill="#f87171"/>
              <circle cx="180" cy="80" r="4" fill="#fbbf24"/>
              <circle cx="60" cy="90" r="3" fill="#34d399"/>
              <circle cx="100" cy="100" r="4" fill="#f472b6"/>
              <circle cx="160" cy="100" r="5" fill="#60a5fa"/>
            </g>
          </svg>
        </div>
      )}
      <h2 className="text-2xl font-serif font-medium mb-6">Adventure Stops</h2>
      
      {stops.map((stop, index) => (
        <div
          key={stop.id}
          className={cn(
            'border rounded-lg p-4 transition-all duration-300 cursor-pointer relative',
            index === currentStop && 'border-orangery-500 bg-orangery-50',
            stop.completed && 'border-green-600 bg-[#e6f4ea] border-l-4',
            !stop.completed && index !== currentStop && 'border-gray-200 hover:border-gray-300'
          )}
          style={{
            borderLeftWidth: stop.completed ? 4 : undefined,
            borderLeftColor: stop.completed ? '#16a34a' : undefined,
            transition: 'background 0.3s, border-color 0.3s, border-left-width 0.3s'
          }}
          onClick={() => onStopSelect(index)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">{stop.name}</h3>
                <p className="text-muted-foreground mb-2">{stop.description}</p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                  <span>{stop.address}</span>
                  <span>{stop.estimatedTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              {stop.completed ? (
                <span
                  className={cn(
                    'text-green-600 font-medium',
                    pulseStopId === stop.id && 'animate-pulse-badge'
                  )}
                  style={{
                    display: 'inline-block',
                    transform: 'translateX(0)',
                    transition: 'transform 0.3s',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      transform: 'translateX(0)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ml-1">Completed</span>
                </span>
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
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Progress</span>
          <span className="text-muted-foreground font-medium">
            {Math.round((stops.filter(s => s.completed).length / stops.length) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-orangery-500 h-3 rounded-full transition-all duration-700"
            style={{
              width: `${(stops.filter(s => s.completed).length / stops.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Add pulse animation CSS
// In your global CSS (e.g., index.css or here with a <style jsx> block):
// .animate-pulse-badge {
//   animation: pulse-badge 0.6s cubic-bezier(0.4,0,0.2,1);
// }
// @keyframes pulse-badge {
//   0% { transform: scale(1); filter: brightness(1); }
//   40% { transform: scale(1.15); filter: brightness(1.2); }
//   100% { transform: scale(1); filter: brightness(1); }
// }

export default AdventureStops;
