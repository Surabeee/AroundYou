
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center pt-20', className)}>
      {/* Artistic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Urban neighborhood street view"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 max-w-4xl relative z-10">
        <div className="text-center">
          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-tight mb-6 text-white">
              Discover the Extraordinary
              <span className="block text-orangery-300">Around You</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              AI-powered local discovery that transforms familiar places into exciting adventures. 
              Explore your world through curated storylines within your chosen radius.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
