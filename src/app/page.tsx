'use client';

import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { MapProvider } from '@/components/MapProvider';
import BrowseMap from '@/components/BrowseMap';
import LotCard from '@/components/LotCard';
import FilterPanel, { FilterState, DEFAULT_FILTERS } from '@/components/FilterPanel';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { Listing } from '@/lib/types';

export default function BrowsePage() {
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const listContainerRef = useRef<HTMLDivElement>(null);

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      // Province filter
      if (filters.province && listing.province !== filters.province) {
        return false;
      }

      // Municipality filter
      if (filters.municipality && listing.municipality !== filters.municipality) {
        return false;
      }

      // Barangay filter
      if (filters.barangay && listing.barangay !== filters.barangay) {
        return false;
      }

      // Price range
      if (filters.priceMin && listing.pricePHP < Number(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && listing.pricePHP > Number(filters.priceMax)) {
        return false;
      }

      // Area range
      if (filters.areaMin && listing.areaSqm < Number(filters.areaMin)) {
        return false;
      }
      if (filters.areaMax && listing.areaSqm > Number(filters.areaMax)) {
        return false;
      }

      // Status filter
      if (listing.status === 'available' && !filters.statusAvailable) return false;
      if (listing.status === 'reserved' && !filters.statusReserved) return false;
      if (listing.status === 'sold' && !filters.statusSold) return false;

      return true;
    });
  }, [filters]);

  const handleSelectListing = useCallback((listing: Listing) => {
    setSelectedListingId(listing.id);

    // Scroll to the card in the sidebar
    const card = cardRefs.current[listing.id];
    if (card && listContainerRef.current) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  // Clear selection when filters change and selected listing is no longer visible
  useEffect(() => {
    if (selectedListingId && !filteredListings.find((l) => l.id === selectedListingId)) {
      setSelectedListingId(null);
    }
  }, [filteredListings, selectedListingId]);

  return (
    <MapProvider>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-8 text-center sm:py-10">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex items-center justify-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Find Your Perfect Lot in Panay
            </h1>
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">
            Browse verified land listings across Iloilo, Aklan, Capiz, and Antique.
            Map-first search with boundary overlays, pricing, and document status.
          </p>
        </div>
      </section>

      {/* Main browse layout */}
      <div className="flex flex-col md:flex-row" style={{ height: 'calc(100vh - 12rem)' }}>
        {/* Sidebar: filters + listing cards */}
        <div className="flex h-[40vh] flex-col border-b border-border md:h-full md:w-2/5 md:border-b-0 md:border-r">
          {/* Filter section */}
          <div className="border-b border-border p-4">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Listing count */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Showing{' '}
              <span className="font-semibold text-foreground">{filteredListings.length}</span> of{' '}
              <span className="font-semibold text-foreground">{MOCK_LISTINGS.length}</span> lots
            </span>
          </div>

          {/* Listing cards */}
          <div ref={listContainerRef} className="flex-1 overflow-y-auto p-3">
            {filteredListings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MapPin className="mb-2 h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No lots match your filters. Try adjusting your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    ref={(el) => {
                      cardRefs.current[listing.id] = el;
                    }}
                  >
                    <LotCard
                      listing={listing}
                      selected={listing.id === selectedListingId}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="h-[60vh] flex-1 md:h-full">
          <BrowseMap
            listings={filteredListings}
            onSelectListing={handleSelectListing}
          />
        </div>
      </div>
    </MapProvider>
  );
}
