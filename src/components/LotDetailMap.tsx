'use client';

import { useEffect, useRef } from 'react';
import { useMapContext } from './MapProvider';
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

    // Draw lot polygon
    if (listing.polygon && listing.polygon.length >= 3) {
      new google.maps.Polygon({
        paths: listing.polygon,
        strokeColor: statusColor,
        strokeOpacity: 0.9,
        strokeWeight: 3,
        fillColor: statusColor,
        fillOpacity: 0.2,
        map,
      });
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
  }, [isLoaded, listing, nearbyPlaces]);

  if (!isLoaded) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 text-sm text-gray-500">
        Loading map...
      </div>
    );
  }

  return <div ref={mapRef} className="h-[400px] w-full rounded-lg" />;
}
