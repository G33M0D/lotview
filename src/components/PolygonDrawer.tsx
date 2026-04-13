'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Trash2, LocateFixed } from 'lucide-react';
import * as turf from '@turf/turf';
import { useMapContext } from './MapProvider';
import MapWatermark from '@/components/MapWatermark';
import { PANAY_CENTER } from '@/lib/constants';

interface PolygonDrawerProps {
  initialPolygon?: google.maps.LatLngLiteral[];
  onChange: (coords: google.maps.LatLngLiteral[]) => void;
  center?: google.maps.LatLngLiteral;
}

export default function PolygonDrawer({
  initialPolygon,
  onChange,
  center,
}: PolygonDrawerProps) {
  const { isLoaded } = useMapContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const [areaSqm, setAreaSqm] = useState<number | null>(
    initialPolygon ? computeArea(initialPolygon) : null
  );

  const updateArea = useCallback(
    (coords: google.maps.LatLngLiteral[]) => {
      if (coords.length < 3) {
        setAreaSqm(null);
        return;
      }
      const area = computeArea(coords);
      setAreaSqm(area);
      onChange(coords);
    },
    [onChange]
  );

  const clearPolygon = useCallback(() => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    setAreaSqm(null);
    onChange([]);

    // Re-enable drawing mode
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(
        google.maps.drawing.OverlayType.POLYGON
      );
    }
  }, [onChange]);

  const handleLocate = useCallback(() => {
    if (!mapInstanceRef.current) return;
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        mapInstanceRef.current?.setCenter(pos);
        mapInstanceRef.current?.setZoom(18);
      },
      () => {
        // Geolocation failed — stay on current view
      }
    );
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const mapCenter = center ?? PANAY_CENTER;
    const initialZoom = initialPolygon ? 17 : 14;

    const map = new google.maps.Map(mapRef.current, {
      center: initialPolygon
        ? getCentroid(initialPolygon)
        : mapCenter,
      zoom: initialZoom,
      mapTypeId: 'hybrid',
      mapTypeControl: true,
      streetViewControl: false,
    });
    mapInstanceRef.current = map;

    // Set up DrawingManager
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: initialPolygon
        ? null
        : google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        fillColor: '#22c55e',
        fillOpacity: 0.3,
        strokeColor: '#22c55e',
        strokeWeight: 2,
        editable: true,
        draggable: true,
      },
    });
    drawingManager.setMap(map);
    drawingManagerRef.current = drawingManager;

    // If initialPolygon provided, render it
    if (initialPolygon && initialPolygon.length >= 3) {
      const polygon = new google.maps.Polygon({
        paths: initialPolygon,
        fillColor: '#22c55e',
        fillOpacity: 0.3,
        strokeColor: '#22c55e',
        strokeWeight: 2,
        editable: true,
        draggable: true,
        map,
      });
      polygonRef.current = polygon;
      attachPolygonListeners(polygon, updateArea);
    }

    // Listen for new polygon drawn
    drawingManager.addListener(
      'polygoncomplete',
      (polygon: google.maps.Polygon) => {
        // Remove any existing polygon
        if (polygonRef.current) {
          polygonRef.current.setMap(null);
        }
        polygonRef.current = polygon;

        // Disable drawing mode after polygon is complete
        drawingManager.setDrawingMode(null);

        const coords = getPolygonCoords(polygon);
        updateArea(coords);
        attachPolygonListeners(polygon, updateArea);
      }
    );

    return () => {
      drawingManager.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="relative h-full min-h-[300px] w-full">
        <div className="flex h-full min-h-[300px] w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 text-sm text-gray-500">
          Loading map...
        </div>
        <MapWatermark />
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="h-full min-h-[300px] w-full rounded-lg" />
      <MapWatermark />

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          type="button"
          onClick={clearPolygon}
          className="flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
        <button
          type="button"
          onClick={handleLocate}
          className="flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50"
        >
          <LocateFixed className="h-4 w-4" />
          Locate
        </button>
      </div>

      {/* Area display */}
      {areaSqm !== null && (
        <div className="absolute top-4 right-4 rounded-md bg-white px-3 py-2 text-sm font-medium shadow-md">
          Area: {areaSqm.toLocaleString()} sqm
          {areaSqm >= 100 && (
            <span className="ml-1 text-gray-500">
              ({(areaSqm / 10000).toFixed(2)} ha)
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/** Extract coordinates from a google.maps.Polygon */
function getPolygonCoords(
  polygon: google.maps.Polygon
): google.maps.LatLngLiteral[] {
  const path = polygon.getPath();
  const coords: google.maps.LatLngLiteral[] = [];
  for (let i = 0; i < path.getLength(); i++) {
    const point = path.getAt(i);
    coords.push({ lat: point.lat(), lng: point.lng() });
  }
  return coords;
}

/** Compute area in sqm using turf.js */
function computeArea(coords: google.maps.LatLngLiteral[]): number {
  if (coords.length < 3) return 0;
  const ring = coords.map((c) => [c.lng, c.lat]);
  // Close the ring
  ring.push([coords[0].lng, coords[0].lat]);
  const polygon = turf.polygon([ring]);
  return Math.round(turf.area(polygon));
}

/** Get centroid of a set of coordinates */
function getCentroid(
  coords: google.maps.LatLngLiteral[]
): google.maps.LatLngLiteral {
  const sumLat = coords.reduce((sum, c) => sum + c.lat, 0);
  const sumLng = coords.reduce((sum, c) => sum + c.lng, 0);
  return { lat: sumLat / coords.length, lng: sumLng / coords.length };
}

/** Attach edit/drag listeners to update area on polygon changes */
function attachPolygonListeners(
  polygon: google.maps.Polygon,
  onUpdate: (coords: google.maps.LatLngLiteral[]) => void
) {
  const path = polygon.getPath();
  google.maps.event.addListener(path, 'set_at', () => {
    onUpdate(getPolygonCoords(polygon));
  });
  google.maps.event.addListener(path, 'insert_at', () => {
    onUpdate(getPolygonCoords(polygon));
  });
  google.maps.event.addListener(path, 'remove_at', () => {
    onUpdate(getPolygonCoords(polygon));
  });
  polygon.addListener('dragend', () => {
    onUpdate(getPolygonCoords(polygon));
  });
}
