
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center pt-20', className)}>
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 max-w-4xl">
        <div className="text-center">
          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-tight mb-6">
              Discover the Extraordinary
              <span className="block text-orangery-500">Around You</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
