import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  forceDarkGlass?: boolean;
}

const Header: React.FC<HeaderProps> = ({ className, forceDarkGlass }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const darkGlass = forceDarkGlass || isScrolled;
  return (
    <header className={cn(
      `fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-6xl w-[98vw] backdrop-blur-5xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-between px-6 py-0 transition-all duration-300 overflow-hidden ${darkGlass ? 'bg-black/25' : 'bg-white/15'}`,
      className
    )}>
      {/* Glassy gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{background: darkGlass ? 'linear-gradient(120deg,rgba(0,0,0,0.18) 0%,rgba(80,80,80,0.12) 100%)' : 'linear-gradient(120deg,rgba(255,255,255,0.18) 0%,rgba(120,180,255,0.12) 100%)'}} />
      <div className="flex items-center justify-between w-full relative z-10" style={{ minHeight: '36px' }}>
        <Link to="/" className="group flex items-center space-x-3 relative" style={{ minHeight: '36px' }}>
          <img
            src="/logo.png"
            alt="AroundYou logo"
            className="h-10 w-auto object-contain drop-shadow-md"
            style={{ maxWidth: '140px' }}
          />
          <span className="sr-only">AroundYou</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 ml-auto">
          <Link 
            to="/" 
            className="text-sm font-semibold text-white hover:text-white transition-all duration-200 relative group px-2 py-1 rounded-md hover:bg-white/10"
            style={{ color: '#fff' }}
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/explore" 
            className="text-sm font-semibold text-white hover:text-white transition-all duration-200 relative group px-2 py-1 rounded-md hover:bg-white/10"
            style={{ color: '#fff' }}
          >
            Explore
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
