'use client';

import { useEffect, useRef, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { useMapContext } from './MapProvider';
import { useAuth } from '@/components/AuthProvider';
import MapWatermark from '@/components/MapWatermark';
import { Listing } from '@/lib/types';
import { STATUS_COLORS, PANAY_CENTER, DEFAULT_ZOOM } from '@/lib/constants';
import { formatPrice, formatArea, getStatusLabel } from '@/lib/utils';

interface BrowseMapProps {
  listings: Listing[];
  onSelectListing?: (listing: Listing) => void;
}

export default function BrowseMap({ listings, onSelectListing }: BrowseMapProps) {
  const { isLoaded } = useMapContext();
  const { user } = useAuth();
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

      if (user) {
        // Logged-in: show exact polygon boundaries
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
              <a href="/listings/${listing.id}" style="display:inline-block;margin-top:8px;font-size:12px;color:#2563eb;text-decoration:underline;">
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
      } else {
        // Anonymous: show circle marker at center, hide exact boundaries
        const circle = new google.maps.Circle({
          center: listing.center,
          radius: 80,
          strokeColor: statusColor,
          strokeOpacity: 0.7,
          strokeWeight: 2,
          fillColor: statusColor,
          fillOpacity: 0.5,
          map,
        });

        circle.addListener('click', () => {
          const content = `
            <div style="min-width:200px;font-family:system-ui,sans-serif;">
              <h3 style="margin:0 0 4px;font-size:14px;font-weight:600;">${listing.title}</h3>
              <p style="margin:0 0 2px;font-size:12px;color:#666;">${listing.municipality}, ${listing.barangay}</p>
              <p style="margin:0 0 2px;font-size:13px;">${formatArea(listing.areaSqm)}</p>
              <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#15803d;">${formatPrice(listing.pricePHP)}</p>
              <hr style="margin:8px 0;border:none;border-top:1px solid #e5e7eb;" />
              <p style="margin:0 0 4px;font-size:12px;color:#6b7280;">
                Exact lot boundaries are hidden.
              </p>
              <a href="/login" style="display:inline-block;padding:4px 12px;border-radius:6px;font-size:12px;font-weight:500;color:#fff;background:#2563eb;text-decoration:none;">
                Sign in to see exact boundaries
              </a>
            </div>
          `;

          infoWindow.setContent(content);
          infoWindow.setPosition(listing.center);
          infoWindow.open(map);

          onSelectListing?.(listing);
        });

        // Store circle in polygons ref for cleanup (setMap(null) works on circles too)
        polygonsRef.current.push(circle as unknown as google.maps.Polygon);
      }
    });

    if (listings.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      listings.forEach((listing) => {
        listing.polygon.forEach((point) => bounds.extend(point));
      });
      map.fitBounds(bounds, 50); // 50px padding
    }

    return () => {
      clearPolygons();
    };
  }, [isLoaded, listings, onSelectListing, clearPolygons, user]);

  if (!isLoaded) {
    return (
      <div className="relative h-full min-h-[300px] w-full">
        <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100">
          <MapPin className="mb-2 h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-500">Google Maps &mdash; Set API key to enable</p>
        </div>
        <MapWatermark />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[300px] w-full">
      <div ref={mapRef} className="h-full min-h-[300px] w-full rounded-lg" />
      <MapWatermark />
    </div>
  );
}
