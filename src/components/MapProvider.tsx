'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

interface MapContextType {
  isLoaded: boolean;
  loadError: boolean;
}

const MapContext = createContext<MapContextType>({ isLoaded: false, loadError: false });

export function useMapContext() {
  return useContext(MapContext);
}

export function MapProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setLoadError(true);
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
      importLibrary('places'),
      importLibrary('marker'),
      importLibrary('geometry'),
    ]).then(() => {
      setIsLoaded(true);
    }).catch(() => {
      setLoadError(true);
    });
  }, []);

  return (
    <MapContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </MapContext.Provider>
  );
}
