'use client';

import { useEffect, useRef } from 'react';
import { useMapContext } from './MapProvider';
import { useAuth } from '@/components/AuthProvider';
import MapWatermark from '@/components/MapWatermark';
import { Listing } from '@/lib/types';
import { STATUS_COLORS, LOT_DETAIL_ZOOM } from '@/lib/constants';

interface NearbyPlace {
  name: string;
  lat: number;
  lng: number;
  type: string;
}

interface LotDetailMapProps {
  listing: Listing;
  nearbyPlaces?: NearbyPlace[];
}

export default function LotDetailMap({ listing, nearbyPlaces }: LotDetailMapProps) {
  const { isLoaded } = useMapContext();
  const { user } = useAuth();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const statusColor = STATUS_COLORS[listing.status] ?? '#9ca3af';

    const map = new google.maps.Map(mapRef.current, {
      center: listing.center,
      zoom: LOT_DETAIL_ZOOM,
      mapTypeId: 'hybrid',
      mapTypeControl: true,
      streetViewControl: false,
    });
    mapInstanceRef.current = map;

    // Draw lot polygon or blurred circle depending on auth state
    if (listing.polygon && listing.polygon.length >= 3) {
      if (user) {
        // Logged-in: show exact polygon
        new google.maps.Polygon({
          paths: listing.polygon,
          strokeColor: statusColor,
          strokeOpacity: 0.9,
          strokeWeight: 3,
          fillColor: statusColor,
          fillOpacity: 0.2,
          map,
        });
      } else {
        // Anonymous: show blurred circle at center
        new google.maps.Circle({
          center: listing.center,
          radius: 100,
          strokeColor: statusColor,
          strokeOpacity: 0.5,
          strokeWeight: 4,
          fillColor: statusColor,
          fillOpacity: 0.5,
          map,
        });
      }
    }

    // Add lot label at center
    new google.maps.Marker({
      position: listing.center,
      map,
      label: {
        text: listing.title,
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: '600',
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 0,
      },
    });

    // Add nearby place markers
    nearbyPlaces?.forEach((place) => {
      const marker = new google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map,
        title: place.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#3b82f6',
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family:system-ui,sans-serif;">
            <strong style="font-size:13px;">${place.name}</strong>
            <p style="margin:2px 0 0;font-size:11px;color:#666;">${place.type}</p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }, [isLoaded, listing, nearbyPlaces, user]);

  if (!isLoaded) {
    return (
      <div className="relative h-[400px] w-full">
        <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 text-sm text-gray-500">
          Loading map...
        </div>
        <MapWatermark />
      </div>
    );
  }

  return (
    <div className="relative h-[400px] w-full">
      <div ref={mapRef} className="h-[400px] w-full rounded-lg" />
      <MapWatermark />
      {!user && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-lg bg-black/70 px-4 py-2 text-center text-sm text-white pointer-events-auto">
          <a href="/login" className="underline font-medium">Sign in</a> to see exact lot boundaries
        </div>
      )}
    </div>
  );
}
