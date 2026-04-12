'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import * as turf from '@turf/turf';
import { MapProvider } from '@/components/MapProvider';
import PolygonDrawer from '@/components/PolygonDrawer';
import { useAuth } from '@/components/AuthProvider';
import {
  getProvinces,
  getMunicipalities,
  getBarangays,
} from '@/lib/locations';
import { formatPrice, formatArea } from '@/lib/utils';
import type { DocumentInfo } from '@/lib/types';

const TITLE_TYPES = ['TCT', 'OCT', 'Tax Declaration'] as const;

const UTILITY_OPTIONS = [
  'Electricity',
  'Water',
  'Internet',
  'Sewage',
] as const;

const DOCUMENT_TYPES: { type: DocumentInfo['type']; label: string }[] = [
  { type: 'title', label: 'Transfer Certificate of Title / OCT' },
  { type: 'tax_declaration', label: 'Tax Declaration' },
  { type: 'lot_plan', label: 'Lot Plan / Sketch' },
  { type: 'survey', label: 'Geodetic Survey' },
  { type: 'deed_of_sale', label: 'Deed of Absolute Sale' },
];

interface FormData {
  polygon: google.maps.LatLngLiteral[];
  title: string;
  description: string;
  province: string;
  municipality: string;
  barangay: string;
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
  polygon: [],
  title: '',
  description: '',
  province: '',
  municipality: '',
  barangay: '',
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

export default function AdminCreateListing() {
  const { supabase, user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const provinces = getProvinces();
  const municipalities = form.province
    ? getMunicipalities(form.province)
    : [];
  const barangays =
    form.province && form.municipality
      ? getBarangays(form.province, form.municipality)
      : [];

  const computedArea = useCallback(() => {
    if (form.polygon.length < 3) return 0;
    const coords = form.polygon.map((p) => [p.lng, p.lat]);
    coords.push(coords[0]); // close the ring
    const polygon = turf.polygon([coords]);
    return Math.round(turf.area(polygon));
  }, [form.polygon]);

  const computedCenter = useCallback(() => {
    if (form.polygon.length === 0)
      return { lat: 0, lng: 0 };
    const sumLat = form.polygon.reduce((s, p) => s + p.lat, 0);
    const sumLng = form.polygon.reduce((s, p) => s + p.lng, 0);
    return {
      lat: sumLat / form.polygon.length,
      lng: sumLng / form.polygon.length,
    };
  }, [form.polygon]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const areaSqm = computedArea();
      const center = computedCenter();
      const documents: DocumentInfo[] = DOCUMENT_TYPES.map((d) => ({
        type: d.type,
        available: form.documents[d.type],
        label: d.label,
      }));

      const listing = {
        seller_id: user?.id,
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
      setError(
        err instanceof Error ? err.message : 'Failed to create listing',
      );
    } finally {
      setSaving(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <CheckCircle className="h-16 w-16 text-primary" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Listing Created
        </h2>
        <p className="mt-1 text-muted-foreground">
          Redirecting to listings...
        </p>
      </div>
    );
  }

  return (
    <div>
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
          Add a new lot listing with location and details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Location section */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Location
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Province
              </label>
              <select
                value={form.province}
                onChange={(e) => {
                  updateField('province', e.target.value);
                  updateField('municipality', '');
                  updateField('barangay', '');
                }}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="">Select province</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Municipality
              </label>
              <select
                value={form.municipality}
                onChange={(e) => {
                  updateField('municipality', e.target.value);
                  updateField('barangay', '');
                }}
                disabled={!form.province}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground disabled:opacity-50"
              >
                <option value="">Select municipality</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Barangay
              </label>
              <select
                value={form.barangay}
                onChange={(e) => updateField('barangay', e.target.value)}
                disabled={!form.municipality}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground disabled:opacity-50"
              >
                <option value="">Select barangay</option>
                {barangays.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Polygon drawing section */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Lot Boundaries
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Click on the map to draw the lot boundary. Minimum 3 points
            required.
          </p>
          <MapProvider>
            <div className="h-[400px] overflow-hidden rounded-lg border border-border">
              <PolygonDrawer
                initialPolygon={form.polygon}
                onChange={(coords) => updateField('polygon', coords)}
              />
            </div>
          </MapProvider>
          {form.polygon.length >= 3 && (
            <p className="mt-2 text-sm text-muted-foreground">
              Computed area: {formatArea(computedArea())}
            </p>
          )}
        </section>

        {/* Details section */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Listing Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g., Prime Residential Lot in Jaro"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
                placeholder="Describe the lot, nearby landmarks, and why it's a good investment..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Price (PHP)
                </label>
                <input
                  type="number"
                  value={form.pricePHP}
                  onChange={(e) => updateField('pricePHP', e.target.value)}
                  placeholder="e.g., 2500000"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
                {form.pricePHP && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatPrice(parseFloat(form.pricePHP) || 0)}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Title Type
                </label>
                <select
                  value={form.titleType}
                  onChange={(e) =>
                    updateField(
                      'titleType',
                      e.target.value as FormData['titleType'],
                    )
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  {TITLE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      'status',
                      e.target.value as FormData['status'],
                    )
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Zoning
                </label>
                <input
                  type="text"
                  value={form.zoning}
                  onChange={(e) => updateField('zoning', e.target.value)}
                  placeholder="e.g., Residential, Commercial, Agricultural"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Road Access
                </label>
                <input
                  type="text"
                  value={form.roadAccess}
                  onChange={(e) => updateField('roadAccess', e.target.value)}
                  placeholder="e.g., Concrete barangay road, 6m wide"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Utilities
              </label>
              <div className="flex flex-wrap gap-3">
                {UTILITY_OPTIONS.map((u) => (
                  <label
                    key={u}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={form.utilities.includes(u)}
                      onChange={() => toggleUtility(u)}
                      className="rounded border-border"
                    />
                    {u}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Boundary Confidence
              </label>
              <div className="flex gap-4">
                {(
                  ['approximate', 'survey-based'] as const
                ).map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <input
                      type="radio"
                      name="boundaryConfidence"
                      checked={form.boundaryConfidence === opt}
                      onChange={() =>
                        updateField('boundaryConfidence', opt)
                      }
                      className="border-border"
                    />
                    {opt === 'approximate' ? 'Approximate' : 'Survey-based'}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents section */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Available Documents
          </h2>
          <div className="space-y-3">
            {DOCUMENT_TYPES.map((doc) => (
              <label
                key={doc.type}
                className="flex items-center gap-3 text-sm text-foreground"
              >
                <input
                  type="checkbox"
                  checked={form.documents[doc.type]}
                  onChange={() => toggleDocument(doc.type)}
                  className="rounded border-border"
                />
                {doc.label}
              </label>
            ))}
          </div>
        </section>

        {/* Submit */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/listings"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || form.polygon.length < 3 || !form.title}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
