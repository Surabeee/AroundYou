
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 py-4 bg-white/90 backdrop-blur-md border-b border-gray-200/20', className)}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-serif font-medium tracking-tight">
          AroundYou
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-orangery-500 transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-sm font-medium hover:text-orangery-500 transition-colors">
            Explore
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
