
import React from 'react';
import { cn } from '@/lib/utils';

interface InterestSelectorProps {
  interests: string[];
  onInterestsChange: (interests: string[]) => void;
  className?: string;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({ 
  interests, 
  onInterestsChange, 
  className 
}) => {
  const options = [
    { value: 'museums', label: '🏛️ Museums & Galleries', category: 'culture' },
    { value: 'food', label: '🍽️ Local Food & Markets', category: 'culinary' },
    { value: 'parks', label: '🌳 Parks & Nature', category: 'outdoor' },
    { value: 'history', label: '🏛️ Historical Sites', category: 'culture' },
    { value: 'shopping', label: '🛍️ Shopping & Markets', category: 'retail' },
    { value: 'nightlife', label: '🌙 Nightlife & Entertainment', category: 'entertainment' },
    { value: 'architecture', label: '🏗️ Architecture & Design', category: 'culture' },
    { value: 'local', label: '🏠 Local Neighborhoods', category: 'authentic' }
  ];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      onInterestsChange(interests.filter(i => i !== interest));
    } else {
      onInterestsChange([...interests, interest]);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-medium">Interests</h3>
      <p className="text-sm text-muted-foreground">Select what you'd like to discover</p>
      
      <div className="grid md:grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => toggleInterest(option.value)}
            className={cn(
              'p-3 border rounded-lg text-left transition-all flex items-center space-x-3',
              interests.includes(option.value)
                ? 'border-orangery-500 bg-orangery-50'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <span className="text-lg">{option.label.split(' ')[0]}</span>
            <span className="font-medium">{option.label.substring(3)}</span>
          </button>
        ))}
      </div>

      {interests.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Selected: {interests.length} interest{interests.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default InterestSelector;
