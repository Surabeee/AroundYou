import * as React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mapboxService } from '@/services/mapboxService';

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

// Add OpenStreetMap search function
export async function getLocationOpenStreetMap(query: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
  );
  const data = await res.text();
  if (!res.ok) {
    console.error(data);
    throw new Error("Failed to fetch location");
  }
  const parsedData = JSON.parse(data) as {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
    name: string;
    type: string;
  }[];
  console.log(parsedData);
  return parsedData;
}

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
  const mapRef = React.useRef<any>(null);
  // Search bar state
  const [search, setSearch] = React.useState('');
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const [searchMarker, setSearchMarker] = React.useState<{lat: number, lon: number, display_name: string} | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    if (!search.trim()) return;
    setSearchLoading(true);
    try {
      const results = await getLocationOpenStreetMap(search);
      if (results && results.length > 0) {
        const loc = results[0];
        const lat = parseFloat(loc.lat);
        const lon = parseFloat(loc.lon);
        setViewport(v => ({ ...v, longitude: lon, latitude: lat, zoom: 16 }));
        setSearchMarker({ lat, lon, display_name: loc.display_name });
        // If mapRef is available, use flyTo for smooth animation
        if (mapRef.current && mapRef.current.flyTo) {
          mapRef.current.flyTo({ center: [lon, lat], zoom: 16 });
        }
      } else {
        setSearchError('No results found.');
        setSearchMarker(null);
      }
    } catch (err) {
      setSearchError('Error searching location.');
      setSearchMarker(null);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4 max-w-md">
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for a place or address..."
          className="flex-1"
        />
        <Button type="submit" disabled={searchLoading}>
          {searchLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
      {searchError && <div className="text-red-500 text-sm mb-2">{searchError}</div>}
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
          ref={mapRef}
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
          {/* Marker for searched location */}
          {searchMarker && (
            <Marker longitude={Number(searchMarker.lon)} latitude={Number(searchMarker.lat)}>
              <div style={{ background: '#2563eb', borderRadius: '50%', padding: 6, boxShadow: '0 1px 8px rgba(37,99,235,0.15)' }} title={searchMarker.display_name}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#2563eb" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="8" stroke="#fff" strokeWidth="2" fill="#2563eb" />
                </svg>
              </div>
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default AdventureMap;
