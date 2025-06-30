
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';

interface RadiusSelectorProps {
  radius: number;
  onRadiusChange: (radius: number) => void;
  className?: string;
}

const RadiusSelector: React.FC<RadiusSelectorProps> = ({ 
  radius, 
  onRadiusChange, 
  className 
}) => {
  const presets = [
    { value: 2, label: '🏠 Local Explorer', description: '2-3km • 2-3 hours' },
    { value: 8, label: '🌆 City Wanderer', description: '8-10km • 3-5 hours' },
    { value: 15, label: '🚇 Metro Explorer', description: '15-20km • 4-6+ hours' }
  ];

  return (
    <div className={cn('space-y-6', className)}>
      <div>
        <h3 className="text-lg font-medium mb-4">Adventure Radius</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onRadiusChange(preset.value)}
              className={cn(
                'p-4 border rounded-lg text-left transition-all',
                radius === preset.value
                  ? 'border-orangery-500 bg-orangery-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="font-medium mb-1">{preset.label}</div>
              <div className="text-sm text-muted-foreground">{preset.description}</div>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Custom Radius: {radius}km</span>
            <span>{radius < 5 ? 'Local' : radius < 12 ? 'City' : 'Extended'}</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={radius}
            onChange={(e) => onRadiusChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1km</span>
            <span>25km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadiusSelector;
