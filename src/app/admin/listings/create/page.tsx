'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Save,
  CheckCircle,
  MapPin,
  Ruler,
  FileText,
  LocateFixed,
  Search,
  Pencil,
  RectangleHorizontal,
} from 'lucide-react';
import * as turf from '@turf/turf';
import { MapProvider, useMapContext } from '@/components/MapProvider';
import PolygonDrawer from '@/components/PolygonDrawer';
import { useAuth } from '@/components/AuthProvider';
import MapWatermark from '@/components/MapWatermark';
import {
  getProvinces,
  getMunicipalities,
  getBarangays,
} from '@/lib/locations';
import { formatPrice, formatArea } from '@/lib/utils';
import { PANAY_CENTER } from '@/lib/constants';
import type { DocumentInfo } from '@/lib/types';

/* ───── Constants ───── */

const TITLE_TYPES = ['TCT', 'OCT', 'Tax Declaration'] as const;
const UTILITY_OPTIONS = ['Electricity', 'Water', 'Internet', 'Sewage'] as const;
const DOCUMENT_TYPES: { type: DocumentInfo['type']; label: string }[] = [
  { type: 'title', label: 'Transfer Certificate of Title / OCT' },
  { type: 'tax_declaration', label: 'Tax Declaration' },
  { type: 'lot_plan', label: 'Lot Plan / Sketch' },
  { type: 'survey', label: 'Geodetic Survey' },
  { type: 'deed_of_sale', label: 'Deed of Absolute Sale' },
];

const STEPS = [
  { label: 'Location', icon: MapPin },
  { label: 'Lot Size', icon: Ruler },
  { label: 'Details', icon: FileText },
] as const;

// A standard basketball court is ~420 sqm
const BASKETBALL_COURT_SQM = 420;

/* ───── Types ───── */

type SizeMode = 'dimensions' | 'draw';

interface FormData {
  // Step 1 — Location
  pinLocation: google.maps.LatLngLiteral | null;
  province: string;
  municipality: string;
  barangay: string;
  // Step 2 — Lot Size
  sizeMode: SizeMode;
  frontageM: string;
  depthM: string;
  rotationDeg: number;
  polygon: google.maps.LatLngLiteral[];
  // Step 3 — Details
  title: string;
  description: string;
  pricePHP: string;
  titleType: (typeof TITLE_TYPES)[number];
  zoning: string;
  roadAccess: string;
  utilities: string[];
  boundaryConfidence: 'approximate' | 'survey-based';
  status: 'available' | 'reserved' | 'sold';
  documents: Record<DocumentInfo['type'], boolean>;
}

const initialForm: FormData = {
  pinLocation: null,
  province: '',
  municipality: '',
  barangay: '',
  sizeMode: 'dimensions',
  frontageM: '',
  depthM: '',
  rotationDeg: 0,
  polygon: [],
  title: '',
  description: '',
  pricePHP: '',
  titleType: 'TCT',
  zoning: '',
  roadAccess: '',
  utilities: [],
  boundaryConfidence: 'approximate',
  status: 'available',
  documents: {
    title: false,
    tax_declaration: false,
    lot_plan: false,
    survey: false,
    deed_of_sale: false,
  },
};

/* ───── Geometry helpers ───── */

function createRectangle(
  center: google.maps.LatLng,
  frontageM: number,
  depthM: number,
  heading: number,
): google.maps.LatLngLiteral[] {
  const halfFrontage = frontageM / 2;
  const halfDepth = depthM / 2;
  const perpendicular = (heading + 90) % 360;

  const top = google.maps.geometry.spherical.computeOffset(center, halfDepth, heading);
  const bottom = google.maps.geometry.spherical.computeOffset(center, halfDepth, (heading + 180) % 360);

  const topLeft = google.maps.geometry.spherical.computeOffset(top, halfFrontage, (perpendicular + 180) % 360);
  const topRight = google.maps.geometry.spherical.computeOffset(top, halfFrontage, perpendicular);
  const bottomRight = google.maps.geometry.spherical.computeOffset(bottom, halfFrontage, perpendicular);
  const bottomLeft = google.maps.geometry.spherical.computeOffset(bottom, halfFrontage, (perpendicular + 180) % 360);

  return [
    { lat: topLeft.lat(), lng: topLeft.lng() },
    { lat: topRight.lat(), lng: topRight.lng() },
    { lat: bottomRight.lat(), lng: bottomRight.lng() },
    { lat: bottomLeft.lat(), lng: bottomLeft.lng() },
  ];
}

function computeArea(coords: google.maps.LatLngLiteral[]): number {
  if (coords.length < 3) return 0;
  const ring = coords.map((c) => [c.lng, c.lat]);
  ring.push([coords[0].lng, coords[0].lat]);
  const polygon = turf.polygon([ring]);
  return Math.round(turf.area(polygon));
}

function getCentroid(coords: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
  const sumLat = coords.reduce((s, c) => s + c.lat, 0);
  const sumLng = coords.reduce((s, c) => s + c.lng, 0);
  return { lat: sumLat / coords.length, lng: sumLng / coords.length };
}

/* ───── Shared input styles ───── */

const inputClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40';
const selectClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground disabled:opacity-50';
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground';

/* ═══════════════════════════════════════════════════════════════
   STEP 1: LocationStep
   ═══════════════════════════════════════════════════════════════ */

function LocationStep({
  form,
  updateField,
}: {
  form: FormData;
  updateField: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
}) {
  const { isLoaded } = useMapContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const provinces = getProvinces();
  const municipalities = form.province ? getMunicipalities(form.province) : [];
  const barangays = form.province && form.municipality ? getBarangays(form.province, form.municipality) : [];

  // Try to match an address component to known province/municipality
  const extractLocation = useCallback(
    (components: google.maps.GeocoderAddressComponent[]) => {
      const allProvinces = getProvinces();
      for (const comp of components) {
        if (comp.types.includes('administrative_area_level_2')) {
          // Province match
          const match = allProvinces.find(
            (p) => p.toLowerCase() === comp.long_name.toLowerCase(),
          );
          if (match) {
            updateField('province', match);
            // Try municipality
            const munis = getMunicipalities(match);
            for (const c2 of components) {
              if (c2.types.includes('locality') || c2.types.includes('administrative_area_level_3')) {
                const muniMatch = munis.find(
                  (m) => m.toLowerCase() === c2.long_name.toLowerCase(),
                );
                if (muniMatch) {
                  updateField('municipality', muniMatch);
                }
              }
            }
          }
        }
      }
    },
    [updateField],
  );

  const placePin = useCallback(
    (pos: google.maps.LatLngLiteral) => {
      updateField('pinLocation', pos);
      if (markerRef.current) {
        markerRef.current.position = pos;
      }
    },
    [updateField],
  );

  // Init map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    const startCenter = form.pinLocation ?? PANAY_CENTER;
    const startZoom = form.pinLocation ? 17 : 10;

    const map = new google.maps.Map(mapRef.current, {
      center: startCenter,
      zoom: startZoom,
      mapTypeId: 'hybrid',
      mapTypeControl: false,
      streetViewControl: false,
      mapId: 'LOTVIEW_LOCATION',
    });
    mapInstanceRef.current = map;

    // Create draggable pin
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: form.pinLocation ? map : undefined,
      position: form.pinLocation ?? startCenter,
      gmpDraggable: true,
      title: 'Lot location',
    });
    markerRef.current = marker;

    marker.addListener('dragend', () => {
      const p = marker.position;
      if (p) {
        const lat = typeof p.lat === 'function' ? p.lat() : p.lat;
        const lng = typeof p.lng === 'function' ? p.lng() : p.lng;
        updateField('pinLocation', { lat, lng });
      }
    });

    // Click map to place pin
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      marker.position = pos;
      marker.map = map;
      updateField('pinLocation', pos);
    });

    // Places Autocomplete
    if (searchInputRef.current && !autocompleteRef.current) {
      const ac = new google.maps.places.Autocomplete(searchInputRef.current, {
        componentRestrictions: { country: 'ph' },
        fields: ['geometry', 'formatted_address', 'address_components'],
      });
      autocompleteRef.current = ac;
      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        if (place.geometry?.location) {
          const loc = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          map.setCenter(loc);
          map.setZoom(17);
          marker.position = loc;
          marker.map = map;
          updateField('pinLocation', loc);
          // Clear previous location fields before re-extracting
          updateField('province', '');
          updateField('municipality', '');
          updateField('barangay', '');
          if (place.address_components) {
            extractLocation(place.address_components);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const geocodeAndCenter = useCallback((address: string, zoom: number = 14) => {
    if (!isLoaded || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Use the Places Autocomplete Service to search — same engine as Google Maps search bar
    const autocompleteService = new google.maps.places.AutocompleteService();
    const placesService = new google.maps.places.PlacesService(map);

    autocompleteService.getPlacePredictions(
      {
        input: address,
        componentRestrictions: { country: 'ph' },
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions && predictions[0]) {
          // Get details for the first prediction
          placesService.getDetails(
            { placeId: predictions[0].place_id, fields: ['geometry'] },
            (place, detailStatus) => {
              if (detailStatus === google.maps.places.PlacesServiceStatus.OK && place?.geometry) {
                if (place.geometry.viewport) {
                  map.fitBounds(place.geometry.viewport);
                } else if (place.geometry.location) {
                  map.setCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
                  map.setZoom(zoom);
                }
              }
            }
          );
        }
      }
    );
  }, [isLoaded]);

  const handleLocate = () => {
    if (!navigator.geolocation || !mapInstanceRef.current) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        mapInstanceRef.current?.setCenter(loc);
        mapInstanceRef.current?.setZoom(17);
        if (markerRef.current) {
          markerRef.current.position = loc;
          markerRef.current.map = mapInstanceRef.current;
        }
        updateField('pinLocation', loc);
      },
      () => {
        /* ignore error */
      },
    );
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={searchInputRef}
          id="location-search"
          type="text"
          placeholder="Search for a place in the Philippines..."
          className={`${inputClass} pl-9 pr-24`}
        />
        <button
          type="button"
          onClick={handleLocate}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/80"
        >
          <LocateFixed className="h-3.5 w-3.5" />
          My location
        </button>
      </div>

      {/* Map */}
      <div className="relative">
        {!isLoaded ? (
          <div className="flex h-[350px] md:h-[450px] w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted text-sm text-muted-foreground">
            Loading map...
          </div>
        ) : (
          <div ref={mapRef} className="h-[350px] md:h-[450px] w-full rounded-lg" />
        )}
        <MapWatermark />
        {!form.pinLocation && isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-lg bg-background/90 px-4 py-3 text-center shadow-lg">
              <MapPin className="mx-auto mb-1 h-6 w-6 text-primary" />
              <p className="text-sm font-medium text-foreground">Tap the map to place a pin</p>
              <p className="text-xs text-muted-foreground">or search above</p>
            </div>
          </div>
        )}
      </div>

      {/* Location dropdowns */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Province *</label>
          <select
            value={form.province}
            onChange={(e) => {
              updateField('province', e.target.value);
              updateField('municipality', '');
              updateField('barangay', '');
            }}
            className={selectClass}
          >
            <option value="">Select province</option>
            {provinces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Municipality *</label>
          <select
            value={form.municipality}
            onChange={(e) => {
              const muni = e.target.value;
              updateField('municipality', muni);
              updateField('barangay', '');
              if (muni && form.province) {
                geocodeAndCenter(`${muni}, ${form.province}`, 13);
              }
            }}
            disabled={!form.province}
            className={selectClass}
          >
            <option value="">Select municipality</option>
            {municipalities.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Barangay</label>
          <select
            value={form.barangay}
            onChange={(e) => {
              const brgy = e.target.value;
              updateField('barangay', brgy);
              if (brgy && form.municipality && form.province) {
                geocodeAndCenter(`${brgy}, ${form.municipality}, ${form.province}`, 16);
              }
            }}
            disabled={!form.municipality}
            className={selectClass}
          >
            <option value="">Select barangay</option>
            {barangays.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 2: LotSizeStep
   ═══════════════════════════════════════════════════════════════ */

function DimensionsMode({
  form,
  updateField,
}: {
  form: FormData;
  updateField: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
}) {
  const { isLoaded } = useMapContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);

  const frontage = parseFloat(form.frontageM) || 0;
  const depth = parseFloat(form.depthM) || 0;
  const areaSqm = frontage * depth;
  const courts = areaSqm > 0 ? (areaSqm / BASKETBALL_COURT_SQM).toFixed(1) : '0';

  // Compute the rectangle polygon for submission whenever dimensions or rotation change
  const computeRectPolygon = useCallback(() => {
    if (!form.pinLocation || frontage <= 0 || depth <= 0) return [];
    const center = new google.maps.LatLng(form.pinLocation.lat, form.pinLocation.lng);
    return createRectangle(center, frontage, depth, form.rotationDeg);
  }, [form.pinLocation, frontage, depth, form.rotationDeg]);

  // Update parent polygon whenever rect changes
  useEffect(() => {
    const rect = computeRectPolygon();
    updateField('polygon', rect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frontage, depth, form.rotationDeg, form.pinLocation]);

  // Init map and draw rectangle overlay
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !form.pinLocation) return;

    if (!mapInstanceRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: form.pinLocation,
        zoom: 18,
        mapTypeId: 'hybrid',
        mapTypeControl: false,
        streetViewControl: false,
        mapId: 'LOTVIEW_DIMENSIONS',
      });
      mapInstanceRef.current = map;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, form.pinLocation]);

  // Update polygon overlay
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const rect = computeRectPolygon();

    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }

    if (rect.length === 4) {
      const poly = new google.maps.Polygon({
        paths: rect,
        fillColor: '#22c55e',
        fillOpacity: 0.3,
        strokeColor: '#22c55e',
        strokeWeight: 2,
        map,
      });
      polygonRef.current = poly;

      // Fit bounds
      const bounds = new google.maps.LatLngBounds();
      rect.forEach((p) => bounds.extend(p));
      map.fitBounds(bounds, 60);
    }
  }, [computeRectPolygon]);

  return (
    <div className="space-y-4">
      {/* Dimension inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Frontage (m)</label>
          <input
            type="number"
            inputMode="decimal"
            value={form.frontageM}
            onChange={(e) => updateField('frontageM', e.target.value)}
            placeholder="e.g., 25"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Depth (m)</label>
          <input
            type="number"
            inputMode="decimal"
            value={form.depthM}
            onChange={(e) => updateField('depthM', e.target.value)}
            placeholder="e.g., 10"
            className={inputClass}
          />
        </div>
      </div>

      {/* Rotation slider */}
      <div>
        <label className={labelClass}>
          Rotation: {form.rotationDeg}°
        </label>
        <input
          type="range"
          min={0}
          max={360}
          step={1}
          value={form.rotationDeg}
          onChange={(e) => updateField('rotationDeg', parseInt(e.target.value, 10))}
          className="w-full accent-primary"
        />
      </div>

      {/* Area display */}
      {areaSqm > 0 && (
        <div className="rounded-lg bg-muted px-4 py-3">
          <p className="text-lg font-semibold text-foreground">
            {formatArea(Math.round(areaSqm))}
          </p>
          <p className="text-sm text-muted-foreground">
            About {courts} basketball courts
          </p>
        </div>
      )}

      {/* Map preview */}
      <div className="relative">
        {!isLoaded || !form.pinLocation ? (
          <div className="flex h-[300px] md:h-[400px] w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted text-sm text-muted-foreground">
            {!form.pinLocation ? 'Set a pin location first' : 'Loading map...'}
          </div>
        ) : (
          <div ref={mapRef} className="h-[300px] md:h-[400px] w-full rounded-lg" />
        )}
        <MapWatermark />
      </div>
    </div>
  );
}

function DrawMode({
  form,
  updateField,
}: {
  form: FormData;
  updateField: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
}) {
  const areaSqm = computeArea(form.polygon);
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        For irregular lots, draw the exact boundary on the map. Click to add points, then close the shape.
      </p>
      <div className="relative h-[350px] md:h-[450px] overflow-hidden rounded-lg border border-border">
        <PolygonDrawer
          initialPolygon={form.polygon}
          onChange={(coords) => updateField('polygon', coords)}
          center={form.pinLocation ?? undefined}
        />
      </div>
      {areaSqm > 0 && (
        <div className="rounded-lg bg-muted px-4 py-3">
          <p className="text-lg font-semibold text-foreground">
            {formatArea(areaSqm)}
          </p>
          <p className="text-sm text-muted-foreground">
            About {(areaSqm / BASKETBALL_COURT_SQM).toFixed(1)} basketball courts
          </p>
        </div>
      )}
    </div>
  );
}

function LotSizeStep({
  form,
  updateField,
}: {
  form: FormData;
  updateField: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden">
        <button
          type="button"
          onClick={() => updateField('sizeMode', 'dimensions')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            form.sizeMode === 'dimensions'
              ? 'bg-primary text-white'
              : 'bg-background text-foreground hover:bg-muted'
          }`}
        >
          <RectangleHorizontal className="h-4 w-4" />
          Enter Dimensions
        </button>
        <button
          type="button"
          onClick={() => updateField('sizeMode', 'draw')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            form.sizeMode === 'draw'
              ? 'bg-primary text-white'
              : 'bg-background text-foreground hover:bg-muted'
          }`}
        >
          <Pencil className="h-4 w-4" />
          Draw Custom Shape
        </button>
      </div>

      {form.sizeMode === 'dimensions' ? (
        <DimensionsMode form={form} updateField={updateField} />
      ) : (
        <DrawMode form={form} updateField={updateField} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 3: DetailsStep
   ═══════════════════════════════════════════════════════════════ */

function DetailsStep({
  form,
  updateField,
  toggleUtility,
  toggleDocument,
}: {
  form: FormData;
  updateField: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
  toggleUtility: (u: string) => void;
  toggleDocument: (t: DocumentInfo['type']) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className={labelClass}>Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Prime Residential Lot in Jaro"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={4}
          placeholder="Describe the lot, nearby landmarks, and why it's a good investment..."
          className={inputClass}
        />
      </div>

      {/* Price + Title Type + Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Price (PHP) *</label>
          <input
            type="number"
            inputMode="numeric"
            value={form.pricePHP}
            onChange={(e) => updateField('pricePHP', e.target.value)}
            placeholder="e.g., 2500000"
            className={inputClass}
          />
          {form.pricePHP && (
            <p className="mt-1 text-xs text-muted-foreground">
              {formatPrice(parseFloat(form.pricePHP) || 0)}
            </p>
          )}
        </div>
        <div>
          <label className={labelClass}>Title Type</label>
          <div className="mt-1 space-y-2">
            {TITLE_TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm text-foreground min-h-[44px]">
                <input
                  type="radio"
                  name="titleType"
                  checked={form.titleType === t}
                  onChange={() => updateField('titleType', t)}
                  className="border-border"
                />
                {t}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <div className="mt-1 space-y-2">
            {(['available', 'reserved', 'sold'] as const).map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm text-foreground capitalize min-h-[44px]">
                <input
                  type="radio"
                  name="status"
                  checked={form.status === s}
                  onChange={() => updateField('status', s)}
                  className="border-border"
                />
                {s}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Zoning + Road Access */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Zoning</label>
          <input
            type="text"
            value={form.zoning}
            onChange={(e) => updateField('zoning', e.target.value)}
            placeholder="e.g., Residential, Commercial, Agricultural"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Road Access</label>
          <input
            type="text"
            value={form.roadAccess}
            onChange={(e) => updateField('roadAccess', e.target.value)}
            placeholder="e.g., Concrete barangay road, 6m wide"
            className={inputClass}
          />
        </div>
      </div>

      {/* Utilities */}
      <div>
        <label className={`${labelClass} mb-2`}>Utilities</label>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {UTILITY_OPTIONS.map((u) => (
            <label key={u} className="flex items-center gap-2 text-sm text-foreground min-h-[44px]">
              <input
                type="checkbox"
                checked={form.utilities.includes(u)}
                onChange={() => toggleUtility(u)}
                className="rounded border-border h-4 w-4"
              />
              {u}
            </label>
          ))}
        </div>
      </div>

      {/* Boundary Confidence */}
      <div>
        <label className={`${labelClass} mb-2`}>Boundary Confidence</label>
        <div className="flex gap-6">
          {(['approximate', 'survey-based'] as const).map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-foreground min-h-[44px]">
              <input
                type="radio"
                name="boundaryConfidence"
                checked={form.boundaryConfidence === opt}
                onChange={() => updateField('boundaryConfidence', opt)}
                className="border-border"
              />
              {opt === 'approximate' ? 'Approximate' : 'Survey-based'}
            </label>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div>
        <label className={`${labelClass} mb-2`}>Available Documents</label>
        <div className="space-y-2">
          {DOCUMENT_TYPES.map((doc) => (
            <label key={doc.type} className="flex items-center gap-3 text-sm text-foreground min-h-[44px]">
              <input
                type="checkbox"
                checked={form.documents[doc.type]}
                onChange={() => toggleDocument(doc.type)}
                className="rounded border-border h-4 w-4"
              />
              {doc.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRESS BAR
   ═══════════════════════════════════════════════════════════════ */

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      {STEPS.map((step, i) => {
        const StepIcon = step.icon;
        const isActive = i === currentStep;
        const isDone = i < currentStep;
        return (
          <div key={step.label} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-center">
              {i > 0 && (
                <div
                  className={`h-0.5 flex-1 transition-colors ${
                    isDone ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isActive
                    ? 'border-primary bg-primary text-white'
                    : isDone
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground'
                }`}
              >
                {isDone ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <StepIcon className="h-4 w-4" />
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 transition-colors ${
                    isDone ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                isActive ? 'text-primary' : isDone ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function CreateListingWizard() {
  const { supabase, user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleUtility(utility: string) {
    setForm((prev) => ({
      ...prev,
      utilities: prev.utilities.includes(utility)
        ? prev.utilities.filter((u) => u !== utility)
        : [...prev.utilities, utility],
    }));
  }

  function toggleDocument(type: DocumentInfo['type']) {
    setForm((prev) => ({
      ...prev,
      documents: { ...prev.documents, [type]: !prev.documents[type] },
    }));
  }

  /* ── Validation ── */

  function canAdvance(): boolean {
    if (step === 0) {
      return !!form.pinLocation && !!form.province && !!form.municipality;
    }
    if (step === 1) {
      if (form.sizeMode === 'dimensions') {
        const f = parseFloat(form.frontageM) || 0;
        const d = parseFloat(form.depthM) || 0;
        return f > 0 && d > 0;
      }
      return form.polygon.length >= 3;
    }
    if (step === 2) {
      return !!form.title.trim() && (parseFloat(form.pricePHP) || 0) > 0;
    }
    return false;
  }

  function handleNext() {
    if (step < 2) setStep(step + 1);
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  /* ── Submit ── */

  async function handleSubmit() {
    setError(null);
    setSaving(true);

    try {
      const areaSqm = computeArea(form.polygon);
      const center = form.polygon.length >= 3 ? getCentroid(form.polygon) : form.pinLocation!;
      const documents: DocumentInfo[] = DOCUMENT_TYPES.map((d) => ({
        type: d.type,
        available: form.documents[d.type],
        label: d.label,
      }));

      const listing = {
        title: form.title,
        description: form.description,
        province: form.province,
        municipality: form.municipality,
        barangay: form.barangay,
        polygon: form.polygon,
        center,
        area_sqm: areaSqm,
        price_php: parseFloat(form.pricePHP) || 0,
        title_type: form.titleType,
        zoning: form.zoning,
        road_access: form.roadAccess,
        utilities: form.utilities,
        boundary_confidence: form.boundaryConfidence,
        status: form.status,
        photos: [],
        documents,
      };

      const { error: insertError } = await supabase
        .from('listings')
        .insert(listing);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => router.push('/admin/listings'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create listing');
    } finally {
      setSaving(false);
    }
  }

  /* ── Success state ── */

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <CheckCircle className="h-16 w-16 text-primary" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Listing Created
        </h2>
        <p className="mt-1 text-muted-foreground">Redirecting to listings...</p>
      </div>
    );
  }

  /* ── Render ── */

  return (
    <div className="pb-28 md:pb-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/listings"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Create Listing</h1>
        <p className="mt-1 text-muted-foreground">
          Add a new lot listing in three easy steps
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <ProgressBar currentStep={step} />
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-border bg-card p-4 md:p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {STEPS[step].label}
        </h2>

        {step === 0 && <LocationStep form={form} updateField={updateField} />}
        {step === 1 && <LotSizeStep form={form} updateField={updateField} />}
        {step === 2 && (
          <DetailsStep
            form={form}
            updateField={updateField}
            toggleUtility={toggleUtility}
            toggleDocument={toggleDocument}
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Desktop navigation buttons */}
      <div className="mt-6 hidden md:flex justify-between">
        <div>
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>
        <div>
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance()}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || !canAdvance()}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Create Listing'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-border bg-card px-4 py-3 md:hidden">
        <div>
          {step > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <Link
              href="/admin/listings"
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground"
            >
              Cancel
            </Link>
          )}
        </div>
        <div>
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance()}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || !canAdvance()}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Create'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Wrap in MapProvider so all steps share the loaded Google Maps API */
export default function AdminCreateListing() {
  return (
    <MapProvider>
      <CreateListingWizard />
    </MapProvider>
  );
}
