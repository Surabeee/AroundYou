import * as React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '@/lib/utils';

interface Stop {
  id: number;
  name: string;
  type: string;
  description: string;
  address: string;
  coordinates: [number, number];
  estimatedTime: string;
  completed: boolean;
}

interface AdventureMapProps {
  stops: Stop[];
  currentStop: number;
  className?: string;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const AdventureMap: React.FC<AdventureMapProps> = ({
  stops,
  currentStop,
  className
}) => {
  const [viewport, setViewport] = React.useState({
    longitude: stops[currentStop].coordinates[0],
    latitude: stops[currentStop].coordinates[1],
    zoom: 15,
    width: 400,
    height: 300,
  });

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-serif font-medium mb-6">Route Map</h2>
      
      <div className="border rounded-lg p-8 bg-gray-50 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4"></div>
          <h3 className="font-medium mb-2">Interactive Map</h3>
          <p className="text-muted-foreground mb-4">
            Map integration requires Mapbox API key
          </p>
          <div className="text-sm space-y-2">
            <div className="font-medium">Route Overview:</div>
            {stops.map((stop, index) => (
              <div
                key={stop.id}
                className={cn(
                  'flex items-center space-x-2',
                  index === currentStop && 'font-medium text-orangery-600',
                  stop.completed && 'text-green-600'
                )}
              >
                <span>{index + 1}.</span>
                <span>{stop.name}</span>
                {stop.completed && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 4 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
                {index === currentStop && (
                  <span className="ml-1 text-orangery-600 text-xs font-semibold">(Current)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-gray-50 rounded">
          <div className="font-medium mb-1">Total Stops</div>
          <div className="text-orangery-600">{stops.length}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="font-medium mb-1">Completed</div>
          <div className="text-green-600">{stops.filter(s => s.completed).length}</div>
        </div>
      </div>

      <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px 0 rgba(60,60,60,0.08)' }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={setViewport}
        >
          {stops.map((stop, idx) => (
            <Marker longitude={stop.coordinates[0]} latitude={stop.coordinates[1]} key={idx}>
              <div style={{ background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="#f97316" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5" />
                </svg>
              </div>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default AdventureMap;
