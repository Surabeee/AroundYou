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
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 border border-gray-200">
          <MapPin className="w-4 h-4 text-gray-500" />
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 border-b-2 border-blue-100 pb-1">Interests</h3>
      </div>
      
      <p className="text-gray-600 mb-6">Select what you'd like to discover on your adventure</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option) => {
          const IconComponent = option.icon;
          const selected = interests.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggleInterest(option.value)}
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
              <div className="flex-1">
                <div className="text-gray-900 font-semibold">{option.label}</div>
                <div className="text-xs text-gray-500 capitalize">{option.category}</div>
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
