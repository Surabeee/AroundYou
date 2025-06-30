
import React from 'react';
import { cn } from '@/lib/utils';

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
    { value: 2, label: '🏠 Local Explorer', description: '2-3km • 2-3 hours', color: 'from-green-400 to-emerald-500' },
    { value: 8, label: '🌆 City Wanderer', description: '8-10km • 3-5 hours', color: 'from-blue-400 to-cyan-500' },
    { value: 15, label: '🚇 Metro Explorer', description: '15-20km • 4-6+ hours', color: 'from-purple-400 to-pink-500' }
  ];

  return (
    <div className={cn('space-y-8', className)}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">📍</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-800">Adventure Radius</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onRadiusChange(preset.value)}
            className={cn(
              'p-6 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-lg transform hover:scale-105 group',
              radius === preset.value
                ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-orange-300 bg-white'
            )}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold bg-gradient-to-br',
                preset.color
              )}>
                {preset.label.split(' ')[0]}
              </div>
              <div className="font-bold text-lg text-gray-800">{preset.label.substring(3)}</div>
            </div>
            <div className="text-sm text-gray-600">{preset.description}</div>
          </button>
        ))}
      </div>

      <div className="space-y-4 bg-gray-50 rounded-xl p-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">Custom Radius: {radius}km</span>
          <span className={cn(
            'px-3 py-1 rounded-full text-sm font-medium',
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
            className="w-full h-3 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #fb923c 0%, #fbbf24 ${(radius / 25) * 100}%, #e5e7eb ${(radius / 25) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div 
            className="absolute top-0 w-6 h-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full shadow-lg transform -translate-y-1.5 transition-all duration-200"
            style={{ left: `calc(${(radius / 25) * 100}% - 12px)` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>1km</span>
          <span>25km</span>
        </div>
      </div>
    </div>
  );
};

export default RadiusSelector;
