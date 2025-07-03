import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Building, Plane, Globe } from 'lucide-react';

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
    { value: 2, label: 'Local Explorer', description: '2-3km • 2-3 hours', icon: MapPin },
    { value: 8, label: 'City Wanderer', description: '8-10km • 3-5 hours', icon: Building },
    { value: 15, label: 'Metro Explorer', description: '15-20km • 4-6+ hours', icon: Plane }
  ];

  return (
    <div className={cn('space-y-8', className)}>
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 border border-gray-200">
          <Globe className="w-4 h-4 text-gray-500" />
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 border-b-2 border-blue-100 pb-1">Adventure Radius</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {presets.map((preset) => {
          const IconComponent = preset.icon;
          return (
            <button
              key={preset.value}
              onClick={() => onRadiusChange(preset.value)}
              className={cn(
                'p-5 border rounded-lg text-left transition-all duration-200 hover:shadow-md',
                radius === preset.value
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-400 bg-white'
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 border border-gray-200">
                  <IconComponent className="w-4 h-4 text-gray-500" />
                </span>
                <div className="font-medium text-gray-900 text-base">{preset.label}</div>
              </div>
              <div className="text-xs text-gray-500">{preset.description}</div>
            </button>
          );
        })}
      </div>
      <div className="space-y-3 bg-gray-50 rounded-lg p-5 border border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900">Custom Radius: {radius}km</span>
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            radius < 5 ? 'bg-green-100 text-green-700' : 
            radius < 12 ? 'bg-blue-100 text-blue-700' : 
            'bg-purple-100 text-purple-700'
          )}>
            {radius < 5 ? 'Local' : radius < 12 ? 'City' : 'Extended'}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="1"
            max="25"
            value={radius}
            onChange={(e) => onRadiusChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1km</span>
          <span>25km</span>
        </div>
      </div>
    </div>
  );
};

export default RadiusSelector;
