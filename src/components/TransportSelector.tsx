
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
    { value: 'walking', label: '🚶 Walking', description: 'Leisurely pace, detailed exploration' },
    { value: 'public', label: '🚇 Public Transit', description: 'Efficient city coverage' },
    { value: 'car', label: '🚗 Car/Taxi', description: 'Maximum flexibility and speed' }
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-medium">Transportation Mode</h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onTransportChange(option.value)}
            className={cn(
              'p-4 border rounded-lg text-left transition-all',
              transport === option.value
                ? 'border-orangery-500 bg-orangery-50'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="font-medium mb-1">{option.label}</div>
            <div className="text-sm text-muted-foreground">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransportSelector;
