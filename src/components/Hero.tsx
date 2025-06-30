
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
          src="/lovable-uploads/93052fdb-5b5b-4c9c-93af-b4673eea86ea.png"
          alt="Indian neighborhood with yellow taxi and colonial architecture"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 max-w-4xl relative z-10">
        <div className="text-center">
          <FadeIn delay={200}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight mb-6 text-white">
              Discover the Extraordinary
              <span className="block text-orange-400 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Around You
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={400}>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered local discovery that transforms familiar places into exciting adventures. 
              Explore your world through curated storylines within your chosen radius.
            </p>
          </FadeIn>

          <FadeIn delay={600}>
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-400"></div>
              <span className="text-sm font-medium">Start Your Journey</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-400"></div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
