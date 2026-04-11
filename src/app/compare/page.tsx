'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { formatPrice, formatArea, areaToBasketballCourts, getStatusColor, getStatusLabel } from '@/lib/utils';
import { BASKETBALL_COURT_SQM } from '@/lib/constants';
import type { Listing } from '@/lib/types';
import {
  X,
  Plus,
  MapPin,
  FileText,
  ArrowLeft,
  ChevronDown,
  Scale,
  Trophy,
} from 'lucide-react';

type CompareField = {
  label: string;
  getValue: (lot: Listing) => string | string[];
  bestIndex?: (lots: Listing[]) => number | null;
};

function findBestIndex(lots: Listing[], extractor: (l: Listing) => number, mode: 'min' | 'max'): number | null {
  if (lots.length < 2) return null;
  let bestIdx = 0;
  let bestVal = extractor(lots[0]);
  for (let i = 1; i < lots.length; i++) {
    const val = extractor(lots[i]);
    if (mode === 'min' ? val < bestVal : val > bestVal) {
      bestIdx = i;
      bestVal = val;
    }
  }
  // Only highlight if values actually differ
  const allSame = lots.every((l) => extractor(l) === bestVal);
  return allSame ? null : bestIdx;
}

const COMPARE_FIELDS: CompareField[] = [
  {
    label: 'Price',
    getValue: (lot) => formatPrice(lot.pricePHP),
    bestIndex: (lots) => findBestIndex(lots, (l) => l.pricePHP, 'min'),
  },
  {
    label: 'Area',
    getValue: (lot) => {
      const hectares = lot.areaSqm / 10000;
      const courts = Math.round((lot.areaSqm / BASKETBALL_COURT_SQM) * 10) / 10;
      const parts = [`${lot.areaSqm.toLocaleString()} sqm`];
      if (hectares >= 0.01) parts.push(`${hectares.toFixed(2)} ha`);
      parts.push(`${courts} basketball court${courts !== 1 ? 's' : ''}`);
      return parts.join(' / ');
    },
    bestIndex: (lots) => findBestIndex(lots, (l) => l.areaSqm, 'max'),
  },
  {
    label: 'Price per sqm',
    getValue: (lot) => formatPrice(Math.round(lot.pricePHP / lot.areaSqm)),
    bestIndex: (lots) => findBestIndex(lots, (l) => l.pricePHP / l.areaSqm, 'min'),
  },
  {
    label: 'Municipality',
    getValue: (lot) => lot.municipality,
  },
  {
    label: 'Barangay',
    getValue: (lot) => lot.barangay,
  },
  {
    label: 'Title Type',
    getValue: (lot) => lot.titleType,
  },
  {
    label: 'Zoning',
    getValue: (lot) => lot.zoning,
  },
  {
    label: 'Road Access',
    getValue: (lot) => lot.roadAccess,
  },
  {
    label: 'Utilities',
    getValue: (lot) => lot.utilities,
  },
  {
    label: 'Elevation',
    getValue: (lot) => (lot.elevation != null ? `${lot.elevation}m above sea level` : 'Not specified'),
  },
  {
    label: 'Hazard Flags',
    getValue: (lot) =>
      lot.hazardFlags && lot.hazardFlags.length > 0 ? lot.hazardFlags : 'None',
  },
  {
    label: 'Boundary Confidence',
    getValue: (lot) => lot.boundaryConfidence === 'survey-based' ? 'Survey-based' : 'Approximate',
  },
  {
    label: 'Status',
    getValue: (lot) => getStatusLabel(lot.status),
  },
  {
    label: 'Documents Available',
    getValue: (lot) => {
      const available = lot.documents.filter((d) => d.available).length;
      const total = lot.documents.length;
      return `${available} of ${total}`;
    },
  },
];

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    MOCK_LISTINGS[0].id,
    MOCK_LISTINGS[1].id,
  ]);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedLots = selectedIds
    .map((id) => MOCK_LISTINGS.find((l) => l.id === id))
    .filter((l): l is Listing => l != null);

  const availableToAdd = MOCK_LISTINGS.filter((l) => !selectedIds.includes(l.id));

  function removeLot(id: string) {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  }

  function addLot(id: string) {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
    setSelectorOpen(false);
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Scale className="w-6 h-6 text-emerald-600" />
                <h1 className="text-xl font-bold text-foreground">Compare Lots</h1>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {selectedLots.length} of 3 lots selected
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {selectedLots.length === 0 ? (
          <div className="text-center py-20">
            <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">No lots selected for comparison</p>
            <p className="text-muted-foreground text-sm">Add up to 3 lots to compare them side by side</p>
          </div>
        ) : (
          <>
            {/* Desktop table view */}
            <div className="hidden md:block">
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 bg-muted w-48 text-sm font-semibold text-muted-foreground">
                        Property
                      </th>
                      {selectedLots.map((lot) => (
                        <th key={lot.id} className="p-4 text-left border-l border-border">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/listings/${lot.id}`}
                              className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm leading-tight hover:underline"
                            >
                              {lot.title}
                            </Link>
                            <button
                              onClick={() => removeLot(lot.id)}
                              className="shrink-0 p-1 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Remove from comparison"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {lot.municipality}
                          </div>
                        </th>
                      ))}
                      {selectedLots.length < 3 && (
                        <th className="p-4 border-l border-border w-48">
                          <AddLotButton
                            availableToAdd={availableToAdd}
                            selectorOpen={selectorOpen}
                            setSelectorOpen={setSelectorOpen}
                            onAdd={addLot}
                          />
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_FIELDS.map((field, rowIdx) => {
                      const bestIdx = field.bestIndex?.(selectedLots) ?? null;
                      return (
                        <tr
                          key={field.label}
                          className={rowIdx % 2 === 0 ? 'bg-card' : 'bg-muted/50'}
                        >
                          <td className="p-4 text-sm font-medium text-muted-foreground align-top">
                            {field.label}
                          </td>
                          {selectedLots.map((lot, colIdx) => {
                            const value = field.getValue(lot);
                            const isBest = bestIdx === colIdx;
                            return (
                              <td
                                key={lot.id}
                                className={`p-4 text-sm border-l border-border align-top ${
                                  isBest ? 'bg-emerald-50' : ''
                                }`}
                              >
                                <CellValue value={value} isBest={isBest} field={field} lot={lot} />
                              </td>
                            );
                          })}
                          {selectedLots.length < 3 && (
                            <td className="p-4 border-l border-border" />
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden space-y-4">
              {selectedLots.map((lot, lotIdx) => (
                <div
                  key={lot.id}
                  className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
                >
                  <div className="p-4 bg-emerald-50 border-b border-border">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/listings/${lot.id}`}
                          className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm leading-tight hover:underline"
                        >
                          {lot.title}
                        </Link>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {lot.municipality}, {lot.barangay}
                        </div>
                      </div>
                      <button
                        onClick={() => removeLot(lot.id)}
                        className="shrink-0 p-1.5 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-border">
                    {COMPARE_FIELDS.map((field) => {
                      const value = field.getValue(lot);
                      const bestIdx = field.bestIndex?.(selectedLots) ?? null;
                      const isBest = bestIdx === lotIdx;
                      return (
                        <div
                          key={field.label}
                          className={`px-4 py-3 flex justify-between gap-4 ${
                            isBest ? 'bg-emerald-50' : ''
                          }`}
                        >
                          <span className="text-xs font-medium text-muted-foreground shrink-0">
                            {field.label}
                          </span>
                          <span className="text-sm text-right">
                            <CellValue value={value} isBest={isBest} field={field} lot={lot} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Mobile add button */}
        {selectedLots.length < 3 && (
          <div className="md:hidden mt-4">
            <AddLotButton
              availableToAdd={availableToAdd}
              selectorOpen={selectorOpen}
              setSelectorOpen={setSelectorOpen}
              onAdd={addLot}
            />
          </div>
        )}

        {/* Legend */}
        {selectedLots.length >= 2 && (
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Green highlight = best value in row (cheapest price, largest area, lowest price/sqm)</span>
          </div>
        )}
      </main>
    </div>
  );
}

function CellValue({
  value,
  isBest,
  field,
  lot,
}: {
  value: string | string[];
  isBest: boolean;
  field: CompareField;
  lot: Listing;
}) {
  const textColor = isBest ? 'text-emerald-700 font-semibold' : 'text-foreground';

  if (field.label === 'Status') {
    const color = getStatusColor(lot.status);
    return (
      <span className="inline-flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className={textColor}>{value as string}</span>
      </span>
    );
  }

  if (field.label === 'Documents Available') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${textColor}`}>
        <FileText className="w-3.5 h-3.5 text-muted-foreground" />
        {value as string}
      </span>
    );
  }

  if (field.label === 'Hazard Flags' && Array.isArray(value)) {
    return (
      <ul className="space-y-1">
        {value.map((flag, i) => (
          <li key={i} className="text-amber-700 text-sm">
            {flag}
          </li>
        ))}
      </ul>
    );
  }

  if (Array.isArray(value)) {
    return (
      <ul className={`space-y-1 ${textColor}`}>
        {value.map((item, i) => (
          <li key={i} className="text-sm">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (value === 'None') {
    return <span className="text-muted-foreground text-sm">None</span>;
  }

  return <span className={textColor}>{value}</span>;
}

function AddLotButton({
  availableToAdd,
  selectorOpen,
  setSelectorOpen,
  onAdd,
}: {
  availableToAdd: Listing[];
  selectorOpen: boolean;
  setSelectorOpen: (open: boolean) => void;
  onAdd: (id: string) => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={() => setSelectorOpen(!selectorOpen)}
        disabled={availableToAdd.length === 0}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-emerald-400 hover:text-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Lot
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${selectorOpen ? 'rotate-180' : ''}`} />
      </button>
      {selectorOpen && availableToAdd.length > 0 && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setSelectorOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {availableToAdd.map((lot) => (
              <button
                key={lot.id}
                onClick={() => onAdd(lot.id)}
                className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors border-b border-border last:border-b-0"
              >
                <div className="text-sm font-medium text-foreground leading-tight">
                  {lot.title}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {lot.municipality}
                  </span>
                  <span>{formatPrice(lot.pricePHP)}</span>
                  <span>{lot.areaSqm.toLocaleString()} sqm</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
