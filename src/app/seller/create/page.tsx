'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  FileText,
  Camera,
  ClipboardList,
  Upload,
  X,
} from 'lucide-react';
import { MapProvider } from '@/components/MapProvider';
import PolygonDrawer from '@/components/PolygonDrawer';
import { MUNICIPALITIES, PANAY_CENTER } from '@/lib/constants';
import { formatPrice, formatArea } from '@/lib/utils';
import type { DocumentInfo } from '@/lib/types';

const STEPS = [
  { label: 'Location', icon: MapPin },
  { label: 'Details', icon: FileText },
  { label: 'Documents', icon: ClipboardList },
  { label: 'Photos', icon: Camera },
  { label: 'Review', icon: Check },
] as const;

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
  municipality: string;
  barangay: string;
  pricePHP: string;
  titleType: (typeof TITLE_TYPES)[number];
  zoning: string;
  roadAccess: string;
  utilities: string[];
  boundaryConfidence: 'approximate' | 'survey-based';
  documents: Record<DocumentInfo['type'], boolean>;
  photos: File[];
}

const initialForm: FormData = {
  polygon: [],
  title: '',
  description: '',
  municipality: '',
  barangay: '',
  pricePHP: '',
  titleType: 'TCT',
  zoning: '',
  roadAccess: '',
  utilities: [],
  boundaryConfidence: 'approximate',
  documents: {
    title: false,
    tax_declaration: false,
    lot_plan: false,
    survey: false,
    deed_of_sale: false,
  },
  photos: [],
};

export default function CreateListing() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAdvance = useCallback(() => {
    switch (step) {
      case 0:
        return form.polygon.length >= 3;
      case 1:
        return (
          form.title.trim() !== '' &&
          form.municipality !== '' &&
          form.pricePHP.trim() !== ''
        );
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  }, [step, form]);

  function handleNext() {
    if (step < STEPS.length - 1 && canAdvance()) {
      setStep(step + 1);
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function handlePublish() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }

  function handlePolygonChange(coords: google.maps.LatLngLiteral[]) {
    setForm((prev) => ({ ...prev, polygon: coords }));
  }

  function handleUtilityToggle(utility: string) {
    setForm((prev) => {
      const has = prev.utilities.includes(utility);
      return {
        ...prev,
        utilities: has
          ? prev.utilities.filter((u) => u !== utility)
          : [...prev.utilities, utility],
      };
    });
  }

  function handleDocToggle(docType: DocumentInfo['type']) {
    setForm((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: !prev.documents[docType],
      },
    }));
  }

  function handlePhotoAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, ...Array.from(files)],
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handlePhotoRemove(index: number) {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  }

  function computeArea(coords: google.maps.LatLngLiteral[]): string {
    if (coords.length < 3) return '0 sqm';
    // Rough area from polygon — PolygonDrawer computes exact, this is for display
    return formatArea(coords.length >= 3 ? estimateAreaSqm(coords) : 0);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/seller/dashboard"
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Create New Listing
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Step {step + 1} of {STEPS.length}: {STEPS[step].label}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex items-center gap-1">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isComplete = i < step;
          return (
            <div key={s.label} className="flex flex-1 items-center">
              <div className="flex flex-1 flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                    isComplete
                      ? 'border-green-600 bg-green-600 text-white'
                      : isActive
                        ? 'border-green-600 bg-card text-green-600'
                        : 'border-border bg-card text-muted-foreground'
                  }`}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium ${
                    isActive
                      ? 'text-green-700'
                      : isComplete
                        ? 'text-green-600'
                        : 'text-muted-foreground'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-1 mt-[-18px] h-0.5 w-full ${
                    i < step ? 'bg-green-600' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        {/* Step 1: Location */}
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Draw Lot Boundary
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the drawing tool to outline your lot on the map. Click to add
              points, then close the shape.
            </p>
            <div className="mt-4">
              <MapProvider>
                <PolygonDrawer
                  initialPolygon={
                    form.polygon.length >= 3 ? form.polygon : undefined
                  }
                  onChange={handlePolygonChange}
                  center={PANAY_CENTER}
                />
              </MapProvider>
            </div>
            {form.polygon.length >= 3 && (
              <p className="mt-3 text-sm text-muted-foreground">
                Estimated area: {computeArea(form.polygon)}
              </p>
            )}
          </div>
        )}

        {/* Step 2: Details */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-foreground">
              Listing Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g. Prime Residential Lot in Jaro"
                className="mt-1 block w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                placeholder="Describe your lot — nearby landmarks, terrain, what makes it special..."
                className="mt-1 block w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Municipality <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.municipality}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      municipality: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                >
                  <option value="">Select municipality</option>
                  {MUNICIPALITIES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Barangay
                </label>
                <input
                  type="text"
                  value={form.barangay}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, barangay: e.target.value }))
                  }
                  placeholder="e.g. Dungon-A, Jaro"
                  className="mt-1 block w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Price (PHP) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={form.pricePHP}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, pricePHP: e.target.value }))
                  }
                  placeholder="e.g. 2500000"
                  min={0}
                  className="mt-1 block w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Title Type
                </label>
                <select
                  value={form.titleType}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      titleType: e.target.value as (typeof TITLE_TYPES)[number],
                    }))
                  }
                  className="mt-1 block w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                >
                  {TITLE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Zoning
                </label>
                <input
                  type="text"
                  value={form.zoning}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, zoning: e.target.value }))
                  }
                  placeholder="e.g. Residential, Agricultural"
                  className="mt-1 block w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Road Access
                </label>
                <input
                  type="text"
                  value={form.roadAccess}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      roadAccess: e.target.value,
                    }))
                  }
                  placeholder="e.g. Concrete barangay road, 6m wide"
                  className="mt-1 block w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Utilities */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Utilities Available
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {UTILITY_OPTIONS.map((u) => (
                  <label
                    key={u}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={form.utilities.includes(u)}
                      onChange={() => handleUtilityToggle(u)}
                      className="h-4 w-4 rounded border-border text-green-600 focus:ring-green-500"
                    />
                    {u}
                  </label>
                ))}
              </div>
            </div>

            {/* Boundary Confidence */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Boundary Confidence
              </label>
              <div className="mt-2 flex gap-6">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="boundaryConfidence"
                    checked={form.boundaryConfidence === 'approximate'}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        boundaryConfidence: 'approximate',
                      }))
                    }
                    className="h-4 w-4 border-border text-green-600 focus:ring-green-500"
                  />
                  Approximate
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="boundaryConfidence"
                    checked={form.boundaryConfidence === 'survey-based'}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        boundaryConfidence: 'survey-based',
                      }))
                    }
                    className="h-4 w-4 border-border text-green-600 focus:ring-green-500"
                  />
                  Survey-based
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Available Documents
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Check the documents you currently have for this property.
            </p>
            <div className="mt-4 space-y-3">
              {DOCUMENT_TYPES.map((doc) => (
                <label
                  key={doc.type}
                  className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.documents[doc.type]}
                    onChange={() => handleDocToggle(doc.type)}
                    className="h-4 w-4 rounded border-border text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {doc.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Photos */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Upload Photos
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add photos of the lot, surroundings, road access, and any
              structures.
            </p>

            <div
              className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:border-green-400 hover:bg-green-50/50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                Click to upload photos
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoAdd}
                className="hidden"
              />
            </div>

            {form.photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {form.photos.map((file, idx) => (
                  <div
                    key={`${file.name}-${idx}`}
                    className="group relative rounded-lg border border-border bg-muted p-2"
                  >
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate text-xs text-muted-foreground">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePhotoRemove(idx)}
                      className="absolute -top-1.5 -right-1.5 rounded-full bg-red-100 p-0.5 text-red-600 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 5: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground">
              Review Your Listing
            </h2>

            {/* Map Preview */}
            {form.polygon.length >= 3 && (
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  Lot Boundary
                </h3>
                <div className="mt-2">
                  <MapProvider>
                    <PolygonDrawer
                      initialPolygon={form.polygon}
                      onChange={() => {}}
                      center={getCentroid(form.polygon)}
                    />
                  </MapProvider>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Estimated area: {computeArea(form.polygon)}
                </p>
              </div>
            )}

            {/* Details Summary */}
            <div className="rounded-lg border border-border p-4">
              <h3 className="text-sm font-medium text-foreground">Details</h3>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                <ReviewField label="Title" value={form.title} />
                <ReviewField
                  label="Location"
                  value={
                    [form.barangay, form.municipality].filter(Boolean).join(', ') ||
                    'Not specified'
                  }
                />
                <ReviewField
                  label="Price"
                  value={
                    form.pricePHP
                      ? formatPrice(Number(form.pricePHP))
                      : 'Not specified'
                  }
                />
                <ReviewField label="Title Type" value={form.titleType} />
                <ReviewField
                  label="Zoning"
                  value={form.zoning || 'Not specified'}
                />
                <ReviewField
                  label="Road Access"
                  value={form.roadAccess || 'Not specified'}
                />
                <ReviewField
                  label="Utilities"
                  value={
                    form.utilities.length > 0
                      ? form.utilities.join(', ')
                      : 'None'
                  }
                />
                <ReviewField
                  label="Boundary Confidence"
                  value={
                    form.boundaryConfidence === 'survey-based'
                      ? 'Survey-based'
                      : 'Approximate'
                  }
                />
              </dl>
              {form.description && (
                <div className="mt-3 border-t border-border pt-3">
                  <dt className="text-xs font-medium text-muted-foreground">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm text-foreground whitespace-pre-line">
                    {form.description}
                  </dd>
                </div>
              )}
            </div>

            {/* Documents Summary */}
            <div className="rounded-lg border border-border p-4">
              <h3 className="text-sm font-medium text-foreground">Documents</h3>
              <ul className="mt-2 space-y-1">
                {DOCUMENT_TYPES.map((doc) => (
                  <li
                    key={doc.type}
                    className="flex items-center gap-2 text-sm"
                  >
                    {form.documents[doc.type] ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300" />
                    )}
                    <span
                      className={
                        form.documents[doc.type]
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }
                    >
                      {doc.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photos Summary */}
            <div className="rounded-lg border border-border p-4">
              <h3 className="text-sm font-medium text-foreground">Photos</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {form.photos.length > 0
                  ? `${form.photos.length} photo${form.photos.length !== 1 ? 's' : ''} attached`
                  : 'No photos uploaded'}
              </p>
            </div>

            {/* Publish Button */}
            <button
              type="button"
              onClick={handlePublish}
              className="w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition-colors"
            >
              Publish Listing
            </button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance()}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg">
          <Check className="h-5 w-5" />
          Listing published successfully!
        </div>
      )}
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-foreground">{value || 'Not specified'}</dd>
    </div>
  );
}

function getCentroid(
  coords: google.maps.LatLngLiteral[]
): google.maps.LatLngLiteral {
  const sumLat = coords.reduce((sum, c) => sum + c.lat, 0);
  const sumLng = coords.reduce((sum, c) => sum + c.lng, 0);
  return { lat: sumLat / coords.length, lng: sumLng / coords.length };
}

/** Rough area estimate using Shoelace formula with lat/lng to meters approximation */
function estimateAreaSqm(coords: google.maps.LatLngLiteral[]): number {
  if (coords.length < 3) return 0;
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000; // Earth radius in meters

  // Project to approximate meters from first point
  const ref = coords[0];
  const points = coords.map((c) => ({
    x: (c.lng - ref.lng) * toRadians(1) * R * Math.cos(toRadians(ref.lat)),
    y: (c.lat - ref.lat) * toRadians(1) * R,
  }));

  // Shoelace formula
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  return Math.abs(area / 2);
}
