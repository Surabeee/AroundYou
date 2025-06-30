
import React from 'react';
import { cn } from '@/lib/utils';
import { Building, Utensils, Trees, Clock, ShoppingBag, Moon, Home, MapPin } from 'lucide-react';

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
    { value: 'museums', label: 'Museums & Galleries', icon: Building, category: 'culture', color: 'from-purple-400 to-indigo-500' },
    { value: 'food', label: 'Local Food & Markets', icon: Utensils, category: 'culinary', color: 'from-red-400 to-pink-500' },
    { value: 'parks', label: 'Parks & Nature', icon: Trees, category: 'outdoor', color: 'from-green-400 to-emerald-500' },
    { value: 'history', label: 'Historical Sites', icon: Clock, category: 'culture', color: 'from-amber-400 to-orange-500' },
    { value: 'shopping', label: 'Shopping & Markets', icon: ShoppingBag, category: 'retail', color: 'from-pink-400 to-rose-500' },
    { value: 'nightlife', label: 'Nightlife & Entertainment', icon: Moon, category: 'entertainment', color: 'from-indigo-400 to-purple-500' },
    { value: 'architecture', label: 'Architecture & Design', icon: Building, category: 'culture', color: 'from-gray-400 to-slate-500' },
    { value: 'local', label: 'Local Neighborhoods', icon: Home, category: 'authentic', color: 'from-teal-400 to-cyan-500' }
  ];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      onInterestsChange(interests.filter(i => i !== interest));
    } else {
      onInterestsChange([...interests, interest]);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-800">Interests</h3>
      </div>
      
      <p className="text-gray-600 mb-6">Select what you'd like to discover on your adventure</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.value}
              onClick={() => toggleInterest(option.value)}
              className={cn(
                'p-4 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-lg transform hover:scale-105 group',
                interests.includes(option.value)
                  ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-orange-300 bg-white'
              )}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br',
                  option.color
                )}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{option.label}</div>
                  <div className="text-xs text-gray-500 capitalize">{option.category}</div>
                </div>
                {interests.includes(option.value) && (
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {interests.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center space-x-3">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <span className="text-gray-700">
            Selected: <span className="font-semibold text-orange-700">{interests.length} interest{interests.length !== 1 ? 's' : ''}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default InterestSelector;
