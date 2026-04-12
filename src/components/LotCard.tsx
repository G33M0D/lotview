'use client';

import Link from 'next/link';
import { MapPin, Ruler, Tag, Shield } from 'lucide-react';
import { Listing } from '@/lib/types';
import { formatPrice, formatArea, getStatusColor, getStatusLabel } from '@/lib/utils';

interface LotCardProps {
  listing: Listing;
  selected?: boolean;
}

export default function LotCard({ listing, selected }: LotCardProps) {
  const statusColor = getStatusColor(listing.status);
  const statusLabel = getStatusLabel(listing.status);

  return (
    <Link
      href={`/listings/${listing.id}`}
      className={`group block rounded-xl border transition-all duration-200 hover:shadow-md ${
        selected
          ? 'border-primary ring-2 ring-primary/30 shadow-md'
          : 'border-border hover:border-primary/40'
      }`}
    >
      {/* Thumbnail placeholder */}
      <div className="relative h-36 w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-primary-light/30 to-primary/40">
        <div className="flex h-full items-center justify-center">
          <MapPin className="h-10 w-10 text-primary/50" />
        </div>
        {/* Status badge */}
        <span
          className="absolute top-2 right-2 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm"
          style={{ backgroundColor: statusColor }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Card body */}
      <div className="p-3.5">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">
            {listing.municipality}, {listing.province}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Ruler className="h-3 w-3 shrink-0" />
            <span>{formatArea(listing.areaSqm)}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Tag className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold text-primary">
              {formatPrice(listing.pricePHP)}
            </span>
          </div>

          <div
            className="flex items-center gap-1 text-xs"
            title={`Boundary: ${listing.boundaryConfidence}`}
          >
            <Shield
              className={`h-3 w-3 ${
                listing.boundaryConfidence === 'survey-based'
                  ? 'text-primary'
                  : 'text-amber-500'
              }`}
            />
            <span
              className={`${
                listing.boundaryConfidence === 'survey-based'
                  ? 'text-primary'
                  : 'text-amber-500'
              }`}
            >
              {listing.boundaryConfidence === 'survey-based' ? 'Surveyed' : 'Approx'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
