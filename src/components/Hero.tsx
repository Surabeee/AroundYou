import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center pt-20', className)}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Mumbai local mural"
          className="w-full h-full object-cover object-center"
        />
        {/* Full-hero dark overlay for readability */}
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.4 }} />
      </div>
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 max-w-4xl relative z-10">
        <div className="text-center relative">
          <FadeIn delay={200}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
              Discover the Extraordinary
              <span className="block text-travel-orange" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
                Around You
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-xl md:text-2xl font-semibold text-white mb-8 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
             Turn the familiar into an adventure.
            </p>
          </FadeIn>
          <FadeIn delay={600}>
            <button
              onClick={() => {
                const el = document.getElementById('start-journey-input');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="mx-auto flex items-center gap-2 px-7 py-2 rounded-full bg-white text-gray-900 font-bold text-base shadow-xl border border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
              style={{ minWidth: 0, zIndex: 2 }}
            >
              <span className="text-sm">Start Your Journey</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
