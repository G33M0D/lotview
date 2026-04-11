'use client';

import { useEffect, useRef, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { useMapContext } from './MapProvider';
import { Listing } from '@/lib/types';
import { STATUS_COLORS, PANAY_CENTER, DEFAULT_ZOOM } from '@/lib/constants';
import { formatPrice, formatArea, getStatusLabel } from '@/lib/utils';

interface BrowseMapProps {
  listings: Listing[];
  onSelectListing?: (listing: Listing) => void;
}

export default function BrowseMap({ listings, onSelectListing }: BrowseMapProps) {
  const { isLoaded } = useMapContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const polygonsRef = useRef<google.maps.Polygon[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const clearPolygons = useCallback(() => {
    polygonsRef.current.forEach((p) => p.setMap(null));
    polygonsRef.current = [];
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: PANAY_CENTER,
        zoom: DEFAULT_ZOOM,
        mapTypeId: 'hybrid',
        mapTypeControl: true,
        streetViewControl: false,
      });
      infoWindowRef.current = new google.maps.InfoWindow();
    }

    const map = mapInstanceRef.current;
    const infoWindow = infoWindowRef.current!;

    clearPolygons();

    listings.forEach((listing) => {
      if (!listing.polygon || listing.polygon.length < 3) return;

      const statusColor = STATUS_COLORS[listing.status] ?? '#9ca3af';

      const polygon = new google.maps.Polygon({
        paths: listing.polygon,
        strokeColor: statusColor,
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: statusColor,
        fillOpacity: 0.3,
        map,
      });

      polygon.addListener('click', (e: google.maps.PolyMouseEvent) => {
        const content = `
          <div style="min-width:200px;font-family:system-ui,sans-serif;">
            <h3 style="margin:0 0 4px;font-size:14px;font-weight:600;">${listing.title}</h3>
            <p style="margin:0 0 2px;font-size:12px;color:#666;">${listing.municipality}, ${listing.barangay}</p>
            <p style="margin:0 0 2px;font-size:13px;">${formatArea(listing.areaSqm)}</p>
            <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#15803d;">${formatPrice(listing.pricePHP)}</p>
            <span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;color:#fff;background:${statusColor};">
              ${getStatusLabel(listing.status)}
            </span>
            <br/>
            <a href="/listing/${listing.id}" style="display:inline-block;margin-top:8px;font-size:12px;color:#2563eb;text-decoration:underline;">
              View Details
            </a>
          </div>
        `;

        infoWindow.setContent(content);
        infoWindow.setPosition(e.latLng ?? listing.center);
        infoWindow.open(map);

        onSelectListing?.(listing);
      });

      polygonsRef.current.push(polygon);
    });

    return () => {
      clearPolygons();
    };
  }, [isLoaded, listings, onSelectListing, clearPolygons]);

  if (!isLoaded) {
    return (
      <div className="flex h-[500px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100">
        <MapPin className="mb-2 h-10 w-10 text-gray-400" />
        <p className="text-sm text-gray-500">Google Maps &mdash; Set API key to enable</p>
      </div>
    );
  }

  return <div ref={mapRef} className="h-[500px] w-full rounded-lg" />;
}
