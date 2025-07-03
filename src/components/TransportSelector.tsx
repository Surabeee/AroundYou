import React from 'react';
import { cn } from '@/lib/utils';
import { Train, Car, MapPin } from 'lucide-react';

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
      icon: MapPin,
      description: 'Leisurely pace, detailed exploration',
      color: 'from-green-400 to-emerald-500'
    },
    { 
      value: 'public', 
      label: 'Public Transit', 
      icon: Train,
      description: 'Efficient city coverage',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      value: 'car', 
      label: 'Car/Taxi', 
      icon: Car,
      description: 'Maximum flexibility and speed',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 border border-gray-200">
          <Train className="w-4 h-4 text-gray-500" />
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 border-b-2 border-blue-100 pb-1">Transportation Mode</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {options.map((option) => {
          const IconComponent = option.icon;
          const selected = transport === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onTransportChange(option.value)}
              className={cn(
                'flex items-center gap-3 p-4 border-2 rounded-xl shadow-sm transition-all duration-200 w-full text-left',
                selected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              )}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 border border-gray-200">
                <IconComponent className="w-5 h-5 text-gray-500" />
              </span>
              <div>
                <div className="text-gray-900 font-semibold">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TransportSelector;
