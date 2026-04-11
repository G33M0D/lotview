'use client';

import { MUNICIPALITIES } from '@/lib/constants';

export interface FilterState {
  municipality: string;
  priceMin: string;
  priceMax: string;
  areaMin: string;
  areaMax: string;
  statusAvailable: boolean;
  statusReserved: boolean;
  statusSold: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  municipality: '',
  priceMin: '',
  priceMax: '',
  areaMin: '',
  areaMax: '',
  statusAvailable: true,
  statusReserved: true,
  statusSold: true,
};

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const update = (partial: Partial<FilterState>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const clearFilters = () => {
    onFilterChange({ ...DEFAULT_FILTERS });
  };

  const hasActiveFilters =
    filters.municipality !== '' ||
    filters.priceMin !== '' ||
    filters.priceMax !== '' ||
    filters.areaMin !== '' ||
    filters.areaMax !== '' ||
    !filters.statusAvailable ||
    !filters.statusReserved ||
    !filters.statusSold;

  const inputClasses =
    'w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30';

  return (
    <div className="space-y-4">
      {/* Municipality */}
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Municipality
        </label>
        <select
          value={filters.municipality}
          onChange={(e) => update({ municipality: e.target.value })}
          className={inputClasses}
        >
          <option value="">All Municipalities</option>
          {MUNICIPALITIES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Price Range (PHP)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => update({ priceMin: e.target.value })}
            className={inputClasses}
          />
          <span className="text-xs text-muted-foreground">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => update({ priceMax: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Area Range */}
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Lot Area (sqm)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.areaMin}
            onChange={(e) => update({ areaMin: e.target.value })}
            className={inputClasses}
          />
          <span className="text-xs text-muted-foreground">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.areaMax}
            onChange={(e) => update({ areaMax: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Status Checkboxes */}
      <div>
        <label className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Status
        </label>
        <div className="space-y-2">
          {([
            { key: 'statusAvailable' as const, label: 'Available', color: '#22c55e' },
            { key: 'statusReserved' as const, label: 'Reserved', color: '#f59e0b' },
            { key: 'statusSold' as const, label: 'Sold', color: '#ef4444' },
          ]).map(({ key, label, color }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={(e) => update({ [key]: e.target.checked })}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-foreground">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
