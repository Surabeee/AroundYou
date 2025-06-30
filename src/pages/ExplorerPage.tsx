
import React from 'react';
import Header from '@/components/Header';
import FadeIn from '@/components/animations/FadeIn';

const ExplorerPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 md:px-6 py-20">
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-4">
                Explorer Hub
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track your adventures, discover new areas, and see your exploration history.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-medium mb-2">Areas Explored</h3>
                <p className="text-2xl font-bold text-orangery-600">0</p>
                <p className="text-sm text-muted-foreground">Unique locations discovered</p>
              </div>

              <div className="border rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">🗺️</div>
                <h3 className="font-medium mb-2">Adventures</h3>
                <p className="text-2xl font-bold text-orangery-600">0</p>
                <p className="text-sm text-muted-foreground">Stories completed</p>
              </div>

              <div className="border rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">⏱️</div>
                <h3 className="font-medium mb-2">Time Exploring</h3>
                <p className="text-2xl font-bold text-orangery-600">0h</p>
                <p className="text-sm text-muted-foreground">Total adventure time</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-12 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-serif font-medium mb-4">
                Ready for Your First Adventure?
              </h2>
              <p className="text-muted-foreground mb-6">
                Start exploring and building your discovery story
              </p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-orangery-600 text-white rounded-lg hover:bg-orangery-700 transition-colors"
              >
                Generate Adventure
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default ExplorerPage;
