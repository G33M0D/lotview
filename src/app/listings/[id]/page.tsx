'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchListingById } from '@/lib/data';
import ListingDetail from '@/components/ListingDetail';
import type { Listing } from '@/lib/types';

export default function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    fetchListingById(id).then(setListing);
  }, [id]);

  // Loading state
  if (listing === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Not found
  if (listing === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Listing Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The listing you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Back to Browse
        </Link>
      </div>
    );
  }

  return <ListingDetail listing={listing} />;
}
