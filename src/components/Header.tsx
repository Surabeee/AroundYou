
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-100' 
        : 'bg-white/90 backdrop-blur-md border-b border-gray-200/20',
      className
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="group flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            AroundYou
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-sm font-medium hover:text-orange-500 transition-all duration-200 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/explore" 
            className="text-sm font-medium hover:text-orange-500 transition-all duration-200 relative group"
          >
            Explore
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
