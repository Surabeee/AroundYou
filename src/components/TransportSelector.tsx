
import React from 'react';
import { cn } from '@/lib/utils';

interface TransportSelectorProps {
  transport: string;
  onTransportChange: (transport: string) => void;
  className?: string;
}

const TransportSelector: React.FC<TransportSelectorProps> = ({ 
  transport, 
  onTransportChange, 
  className 
}) => {
  const options = [
    { 
      value: 'walking', 
      label: 'Walking', 
      icon: '🚶',
      description: 'Leisurely pace, detailed exploration',
      color: 'from-green-400 to-emerald-500'
    },
    { 
      value: 'public', 
      label: 'Public Transit', 
      icon: '🚇',
      description: 'Efficient city coverage',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      value: 'car', 
      label: 'Car/Taxi', 
      icon: '🚗',
      description: 'Maximum flexibility and speed',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">🚊</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-800">Transportation Mode</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onTransportChange(option.value)}
            className={cn(
              'p-6 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-lg transform hover:scale-105 group',
              transport === option.value
                ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-orange-300 bg-white'
            )}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-to-br',
                option.color
              )}>
                {option.icon}
              </div>
              <div className="font-bold text-lg text-gray-800">{option.label}</div>
            </div>
            <div className="text-sm text-gray-600">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransportSelector;
