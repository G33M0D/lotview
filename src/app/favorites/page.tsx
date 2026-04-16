'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import LotCard from '@/components/LotCard';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { mapDbToListing } from '@/lib/data';
import type { Listing } from '@/lib/types';

export default function FavoritesPage() {
  const { user, supabase, isLoading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    async function fetchFavorites() {
      const { data: favRows } = await supabase
        .from('favorites')
        .select('listing_id')
        .eq('user_id', user!.id);

      if (!favRows || favRows.length === 0) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }

      const favIds = favRows.map((r) => r.listing_id);

      // Try fetching from the listings table first
      const { data: dbListings } = await supabase
        .from('listings')
        .select('*')
        .in('id', favIds);

      const foundListings: Listing[] = (dbListings ?? []).map(mapDbToListing);
      const foundIds = new Set(foundListings.map((l) => l.id));

      // Fill in any missing IDs from mock data
      const mockMatches = MOCK_LISTINGS.filter(
        (m) => favIds.includes(m.id) && !foundIds.has(m.id)
      );

      setFavorites([...foundListings, ...mockMatches]);
      setIsLoading(false);
    }

    fetchFavorites();
  }, [user, supabase, authLoading]);

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">
          Sign in to save your favorite lots
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Create an account or sign in to bookmark lots you are interested in and
          access them anytime.
        </p>
        <Link
          href="/login"
          className="mt-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">No favorites yet</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Browse lots and tap the heart icon to save them.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Browse lots
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-500" />
        <h1 className="text-2xl font-bold text-foreground">My Favorites</h1>
        <span className="ml-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {favorites.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((listing) => (
          <LotCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
