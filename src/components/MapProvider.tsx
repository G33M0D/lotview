'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

interface MapContextType {
  isLoaded: boolean;
}

const MapContext = createContext<MapContextType>({ isLoaded: false });

export function useMapContext() {
  return useContext(MapContext);
}

export function MapProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [noKey, setNoKey] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setNoKey(true);
      return;
    }

    setOptions({
      key: apiKey,
      v: 'weekly',
      libraries: ['drawing', 'geometry', 'places'],
    });

    Promise.all([
      importLibrary('maps'),
      importLibrary('drawing'),
    ]).then(() => {
      setIsLoaded(true);
    });
  }, []);

  if (noKey) {
    return (
      <MapContext.Provider value={{ isLoaded: false }}>
        <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
          Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable maps
        </div>
        {children}
      </MapContext.Provider>
    );
  }

  return (
    <MapContext.Provider value={{ isLoaded }}>
      {!isLoaded && (
        <div className="flex items-center justify-center p-8 text-sm text-gray-400">
          Loading maps...
        </div>
      )}
      {children}
    </MapContext.Provider>
  );
}
